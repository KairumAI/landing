import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  digest,
  validateReportsManifest,
  verifyDelivery,
  type DeliveryManifest,
} from "./verify-public-delivery";

const root = fileURLToPath(new URL("..", import.meta.url));
const artifact = process.argv[2];
assert.ok(artifact, "Specify the downloaded artifact directory");
assert.match(process.env.EXPECTED_MANIFEST_SHA ?? "", /^[a-f0-9]{64}$/);
assert.match(process.env.GITHUB_SHA ?? "", /^[a-f0-9]{40}$/);
const bytes = await readFile(
  join(artifact, "build/public-delivery-manifest.json"),
);
assert.equal(
  digest(bytes),
  process.env.EXPECTED_MANIFEST_SHA,
  "Downloaded manifest changed",
);
const expected: DeliveryManifest = JSON.parse(bytes.toString());
assert.equal(expected.schema_version, 1);
assert.equal(
  expected.commit,
  process.env.GITHUB_SHA,
  "Wrong publication artifact",
);
const reports = validateReportsManifest(
  JSON.parse(
    await readFile(join(root, "publishing/reports-manifest.json"), "utf8"),
  ),
);
const { files, stats } = await verifyDelivery(join(artifact, "dist"), reports);
assert.deepEqual(files, expected.files, "Downloaded public files changed");
console.log(JSON.stringify(stats));
