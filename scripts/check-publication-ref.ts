import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { appendFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export type PublicationContext = {
  repository: string;
  event: string;
  ref: string;
  sha: string;
};

export function assertPublicationContext(context: PublicationContext) {
  assert.equal(
    context.repository,
    "KairumAI/landing",
    "Wrong publication repository",
  );
  assert.ok(
    ["push", "workflow_dispatch"].includes(context.event),
    "Not a main publication request",
  );
  assert.equal(context.ref, "refs/heads/main", "Only main can publish");
  assert.match(context.sha, /^[a-f0-9]{40}$/, "Invalid publication SHA");
}

export function parseRemoteMain(output: string) {
  const match = /^([a-f0-9]{40})\trefs\/heads\/main$/.exec(output.trim());
  assert.ok(match, "Cannot identify the remote main SHA");
  return match[1];
}

export function evaluatePublication(
  context: PublicationContext,
  checkoutSha: string,
  remoteMainSha: string,
) {
  assertPublicationContext(context);
  assert.equal(
    checkoutSha,
    context.sha,
    "Checkout does not match the requested SHA",
  );
  assert.match(remoteMainSha, /^[a-f0-9]{40}$/, "Invalid remote main SHA");
  return {
    publish: context.sha === remoteMainSha,
    reason:
      context.sha === remoteMainSha
        ? "Current main verified"
        : "Superseded by a newer main commit",
  };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const context: PublicationContext = {
    repository: process.env.GITHUB_REPOSITORY ?? "",
    event: process.env.GITHUB_EVENT_NAME ?? "",
    ref: process.env.GITHUB_REF ?? "",
    sha: process.env.GITHUB_SHA ?? "",
  };
  assertPublicationContext(context);
  const checkoutSha = execFileSync("git", ["rev-parse", "HEAD"], {
    encoding: "utf8",
  }).trim();
  assert.equal(
    checkoutSha,
    context.sha,
    "Checkout does not match the requested SHA",
  );
  const remoteMainSha = parseRemoteMain(
    execFileSync(
      "git",
      ["ls-remote", "--exit-code", "origin", "refs/heads/main"],
      { encoding: "utf8" },
    ),
  );
  const result = evaluatePublication(context, checkoutSha, remoteMainSha);
  if (process.env.GITHUB_OUTPUT)
    appendFileSync(process.env.GITHUB_OUTPUT, `publish=${result.publish}\n`);
  console.log(JSON.stringify(result));
}
