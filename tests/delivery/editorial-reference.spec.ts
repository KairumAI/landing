import { expect, test } from "@playwright/test";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import {
  baselinePageContent,
  pageContent,
  type MarketingPageId,
} from "../../src/lib/routes";
import { restoreR05Content } from "../../src/lib/editorial-integration";

const reference = JSON.parse(
  readFileSync(
    "docs/evidence/2026-10-04-astro-unification/source-reference.json",
    "utf8",
  ),
);
const sha = (value: string) => createHash("sha256").update(value).digest("hex");

test("only the declared editorial integration can be reversed to the immutable R05 fingerprints", () => {
  for (const [key, expected] of Object.entries(reference.spanish_html)) {
    const id = key as MarketingPageId;
    const baseline = baselinePageContent(id, "es").html;
    const rendered = pageContent(id, "es").html;
    expect(sha(restoreR05Content(rendered, baseline, id))).toBe(expected);
  }
});

test("an unrelated change in a preserved scene still fails the R05 comparison", () => {
  const baseline = baselinePageContent("home", "es").html;
  const rendered = pageContent("home", "es").html.replace(
    'class="model-ecosystem"',
    'class="unexpected-scene-change"',
  );
  expect(sha(restoreR05Content(rendered, baseline, "home"))).not.toBe(
    reference.spanish_html.home,
  );
});

test("an undeclared navigation change is rejected rather than stripped from the comparison", () => {
  const baseline = baselinePageContent("home", "es").html;
  const rendered = pageContent("home", "es").html.replace(
    'href="/blog/"',
    'href="/unknown/"',
  );
  expect(() => restoreR05Content(rendered, baseline, "home")).toThrow(
    /Editorial delta/,
  );
});
