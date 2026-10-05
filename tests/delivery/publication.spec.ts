import { expect, test } from "@playwright/test";
import { execFileSync } from "node:child_process";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  assertPublicationContext,
  evaluatePublication,
  parseRemoteMain,
} from "../../scripts/check-publication-ref";

const current = {
  repository: "KairumAI/landing",
  event: "push",
  ref: "refs/heads/main",
  sha: "a".repeat(40),
};

for (const event of ["push", "workflow_dispatch"]) {
  test(`admits the current main commit for ${event}`, () => {
    expect(
      evaluatePublication({ ...current, event }, current.sha, current.sha)
        .publish,
    ).toBe(true);
  });
}

for (const change of [
  { event: "pull_request" },
  { event: "pull_request_target" },
  { event: "release" },
  { ref: "refs/heads/develop" },
  { ref: "refs/heads/main-other" },
  { ref: "refs/tags/v1.0.0" },
  { ref: "refs/pull/3/merge" },
  { repository: "another-owner/landing" },
  { sha: "a".repeat(39) },
]) {
  test(`denies an ineligible publication: ${JSON.stringify(change)}`, () => {
    expect(() => assertPublicationContext({ ...current, ...change })).toThrow();
  });
}

test("denies a checkout that differs from the workflow SHA", () => {
  expect(() =>
    evaluatePublication(current, "b".repeat(40), current.sha),
  ).toThrow("Checkout does not match");
});

test("skips a superseded main commit or historical retry", () => {
  const result = evaluatePublication(current, current.sha, "b".repeat(40));
  expect(result.publish).toBe(false);
  expect(result.reason).toContain("Superseded");
});

test("fails closed if the remote main SHA cannot be identified", () => {
  expect(() => evaluatePublication(current, current.sha, "")).toThrow(
    "Invalid remote main SHA",
  );
  expect(parseRemoteMain(`${current.sha}\trefs/heads/main\n`)).toBe(
    current.sha,
  );
  for (const output of [
    "",
    `${current.sha}\trefs/tags/main`,
    `${current.sha}\trefs/heads/main\n${current.sha}\trefs/heads/main`,
  ]) {
    expect(() => parseRemoteMain(output)).toThrow("Cannot identify");
  }
});

async function gitFixture() {
  const root = await mkdtemp(join(tmpdir(), "kairum-publication-test-"));
  const checkout = join(root, "checkout");
  const remote = join(root, "origin.git");
  const output = join(root, "github-output.txt");
  await mkdir(checkout);
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: checkout,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  git("init", "--bare", remote);
  git("init", "--initial-branch=main");
  git("config", "user.name", "Publication fixture");
  git("config", "user.email", "fixture@example.test");
  await writeFile(join(checkout, "content.txt"), "First complete package");
  git("add", "content.txt");
  git("commit", "-m", "first package");
  git("remote", "add", "origin", remote);
  git("push", "origin", "main");
  const sha = git("rev-parse", "HEAD");
  const run = (requestSha = sha, ref = current.ref) =>
    execFileSync(
      "bun",
      [
        fileURLToPath(
          new URL("../../scripts/check-publication-ref.ts", import.meta.url),
        ),
      ],
      {
        cwd: checkout,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
        env: {
          ...process.env,
          GITHUB_REPOSITORY: current.repository,
          GITHUB_EVENT_NAME: current.event,
          GITHUB_REF: ref,
          GITHUB_SHA: requestSha,
          GITHUB_OUTPUT: output,
        },
      },
    );
  return {
    root,
    checkout,
    output,
    git,
    sha,
    run,
    dispose: () => rm(root, { recursive: true, force: true }),
  };
}

test("the real CLI publishes only the checkout matching current remote main", async () => {
  const item = await gitFixture();
  try {
    expect(JSON.parse(item.run()).publish).toBe(true);
    expect(await readFile(item.output, "utf8")).toBe("publish=true\n");
  } finally {
    await item.dispose();
  }
});

test("the real CLI skips a historical attempt after main advances", async () => {
  const item = await gitFixture();
  try {
    await writeFile(
      join(item.checkout, "content.txt"),
      "Newer complete package",
    );
    item.git("add", "content.txt");
    item.git("commit", "-m", "newer package");
    item.git("push", "origin", "main");
    item.git("checkout", "--detach", item.sha);
    expect(JSON.parse(item.run()).publish).toBe(false);
    expect(await readFile(item.output, "utf8")).toBe("publish=false\n");
  } finally {
    await item.dispose();
  }
});

for (const scenario of [
  "wrong checkout",
  "wrong ref",
  "missing remote",
] as const) {
  test(`the real CLI fails without publication output for ${scenario}`, async () => {
    const item = await gitFixture();
    try {
      if (scenario === "missing remote") item.git("remote", "remove", "origin");
      expect(() =>
        item.run(
          scenario === "wrong checkout" ? "b".repeat(40) : item.sha,
          scenario === "wrong ref" ? "refs/tags/v1.0.0" : current.ref,
        ),
      ).toThrow();
      await expect(readFile(item.output)).rejects.toThrow();
    } finally {
      await item.dispose();
    }
  });
}
