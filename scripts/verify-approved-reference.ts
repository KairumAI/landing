import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { pageContent, pages } from "../src/lib/routes";

// These fingerprints come from the approved R05 source, not this renderer.
const root = new URL("../", import.meta.url);
const reference = JSON.parse(
  readFileSync(
    new URL(
      "docs/evidence/2026-10-04-astro-unification/source-reference.json",
      root,
    ),
    "utf8",
  ),
) as {
  reference_version: string;
  assets: Record<string, string>;
  styles: Record<string, string>;
  spanish_html: Record<string, string>;
};
const sha = (value: string | Buffer) =>
  createHash("sha256").update(value).digest("hex");
const failures: string[] = [];
for (const [path, expected] of Object.entries({
  ...reference.assets,
  ...reference.styles,
})) {
  const actual = sha(readFileSync(fileURLToPath(new URL(path, root))));
  if (actual !== expected) failures.push(path);
}
for (const page of pages) {
  if (sha(pageContent(page.id, "es").html) !== reference.spanish_html[page.id])
    failures.push(`HTML: ${page.id}`);
}
if (failures.length) {
  throw new Error(
    `Approved reference ${reference.reference_version} differs: ${failures.join(", ")}. Review and document any new design approval before changing the reference.`,
  );
}
console.log(
  `R05 ${reference.reference_version}: ${Object.keys(reference.assets).length} assets, ${Object.keys(reference.styles).length} styles and ${pages.length} approved Spanish pages match.`,
);
