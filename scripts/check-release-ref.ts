import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

export function assertReleaseContext(context: {
  repository: string;
  event: string;
  ref: string;
}) {
  assert.equal(
    context.repository,
    "KairumAI/landing",
    "Wrong release repository",
  );
  assert.ok(
    ["release", "workflow_dispatch"].includes(context.event),
    "Not a release request",
  );
  assert.match(
    context.ref,
    /^refs\/tags\/v\d+\.\d+\.\d+$/,
    "Select a vMAJOR.MINOR.PATCH tag; branches cannot deploy",
  );
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  assertReleaseContext({
    repository: process.env.GITHUB_REPOSITORY ?? "",
    event: process.env.GITHUB_EVENT_NAME ?? "",
    ref: process.env.GITHUB_REF ?? "",
  });
  execFileSync("git", ["merge-base", "--is-ancestor", "HEAD", "origin/main"], {
    stdio: "inherit",
  });
  console.log("The requested release tag belongs to main.");
}
