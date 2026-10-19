import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import {
  baselinePageContent,
  pageContent,
  pages,
  localizeLinks,
  type MarketingPageId,
} from "../src/lib/routes";
import { restoreR05Content } from "../src/lib/editorial-integration";
import { locales } from "../src/i18n/locales";
import { contactConfig } from "../src/lib/contact-config";
import { createContactSlots } from "../src/components/kairum/contact-form";

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
for (const [id, expected] of Object.entries(reference.spanish_html)) {
  if (!pages.some((page) => page.id === id))
    throw new Error(`Missing R05 route: ${id}`);
  const pageId = id as MarketingPageId;
  const baseline = baselinePageContent(pageId, "es").html;
  const restored = restoreR05Content(
    pageContent(pageId, "es").html,
    baseline,
    pageId,
  );
  if (sha(restored) !== expected) failures.push(`HTML: ${id}`);
}
// R05 stays immutable. Contact may add only its exact fragments at the existing
// Home, Contacto and the ten booking closings requested in the visual feedback.
const bookingClosings = new Set([
  "catalog",
  "report",
  "analytics",
  "agents",
  "prompt-intelligence",
  "traffic",
  "consulting",
  "marcas",
  "agencias",
  "nosotros",
]);
let extensions = 0;
for (const locale of locales) {
  for (const config of [
    contactConfig(),
    contactConfig("reference-check", "reference-site-key"),
  ]) {
    const slots = createContactSlots(locale, config);
    for (const page of pages) {
      const base = pageContent(page.id, locale).html;
      const actual = pageContent(page.id, locale, slots).html;
      let expected = base;
      if (
        page.id === "home" ||
        page.id === "contacto" ||
        bookingClosings.has(page.id)
      ) {
        const anchor =
          page.id === "home"
            ? "</div></section>\n    </main>"
            : page.id === "contacto"
              ? '<div class="info-context">'
              : ["marcas", "agencias", "nosotros"].includes(page.id)
                ? "</div></section></div></main>"
                : "</div></section></main>";
        const fragment = localizeLinks(
          page.id === "home"
            ? slots.homeAction + slots.contactPanel
            : slots.contactPanel,
          locale,
        );
        if (!fragment || base.split(anchor).length !== 2) {
          failures.push(`Contact anchor: ${locale}/${page.id}`);
          continue;
        }
        expected = base.replace(anchor, fragment + anchor);
      }
      if (actual !== expected)
        failures.push(`Contact extension: ${locale}/${page.id}`);
      extensions++;
    }
  }
}
if (failures.length) {
  throw new Error(
    `Approved reference ${reference.reference_version} differs: ${failures.join(", ")}. Review and document any new design approval before changing the reference.`,
  );
}
console.log(
  `R05 ${reference.reference_version}: ${Object.keys(reference.assets).length} assets, ${Object.keys(reference.styles).length} base styles and ${Object.keys(reference.spanish_html).length} approved Spanish pages match after reversing the explicit editorial and visual-feedback deltas; ${extensions} localized contact-extension variants preserve every other byte. CSS and behavior require browser validation.`,
);
