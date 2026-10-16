import { escapeHtml as e } from "./escape";
import { editorialCopy } from "../i18n/editorial";
import { translator } from "../i18n/marketing";
import { localeMeta, type Locale } from "../i18n/locales";

type Edit = { from: string; to: string };
function editorialEdits(baseline: string, id: string, locale: Locale) {
  let html = baseline;
  const edits: Edit[] = [];
  const ui = editorialCopy(locale).ui;
  const l = (path: string) => `${localeMeta[locale].path}${path.slice(1)}`;
  const edit = (from: string, to: string) => {
    if (!from || !html.includes(from))
      throw new Error(`Missing editorial integration anchor: ${id}`);
    if (from === to) return;
    edits.push({ from, to });
    html = html.replaceAll(from, to);
  };
  // Only text nodes change names: report IDs, routes, attributes and Report100 remain intact.
  const textNodes = new Set(
    [...baseline.matchAll(/>([^<>]*\bReport\b[^<>]*)</g)].map(
      (match) => match[0],
    ),
  );
  for (const node of textNodes)
    edit(node, node.replace(/(?<!AI )\bReport\b/g, "AI Report"));
  const oldMenu = html.match(
    /<details class="nav-menu nav-compact"><summary aria-controls="menu-resources">[\s\S]*?<\/details>/,
  )?.[0];
  if (!oldMenu) throw new Error(`Missing resource navigation: ${id}`);
  const summary = oldMenu.slice(
    0,
    oldMenu.indexOf("</summary>") + "</summary>".length,
  );
  const items = [
    [ui.resources, ui.resourcesDescription, l("/recursos/"), "Stack"],
    [ui.blog, ui.blogDescription, l("/blog/"), "FileText"],
    [ui.glossary, ui.glossaryDescription, l("/glosario/"), "MagnifyingGlass"],
    [ui.methodology, ui.evidence, l("/metodologia/"), "Eye"],
  ];
  const icon = (name: string) =>
    `<i data-icon="${name}" aria-hidden="true" style="--icon:url('/kairum/assets/icons/${name}.svg')"></i>`;
  edit(
    oldMenu,
    `${summary}<div class="nav-popover compact-menu" id="menu-resources">${items.map(([name, detail, href, glyph]) => `<a class="menu-item" href="${href}">${icon(glyph)}<span><strong>${e(name)}</strong><small>${e(detail)}</small></span>${icon("ArrowUpRight")}</a>`).join("")}</div></details>`,
  );
  const t = translator(locale);
  // The historical library remains linked from the hub; the global resources entry now leads to it.
  const label = e(t("biblioteca_de_recursos")).replace(
    /\bReport\b/g,
    "AI Report",
  );
  const oldFooterLink = `<a href="https://kairum.com.ar/informes/">${label}</a>`;
  edit(
    oldFooterLink,
    `<a href="${l("/recursos/")}">${label}</a><a href="${l("/blog/")}">${e(ui.blog)}</a><a href="${l("/glosario/")}">${e(ui.glossary)}</a><a href="${l("/metodologia/")}">${e(ui.methodology)}</a>`,
  );
  if (id === "home") {
    const oldSection = html.match(
      /<section class="home-resources\b[\s\S]*?<\/section>/,
    )?.[0];
    if (!oldSection) throw new Error("Missing Home resources section");
    let updated = oldSection.replace(
      'href="https://kairum.com.ar/informes/"',
      `href="${l("/recursos/")}"`,
    );
    for (const [from, to] of [
      [
        "/productos/prompt-intelligence/#capacidades",
        "/blog/como-elegir-preguntas/",
      ],
      ["/productos/analytics/#capacidades", "/blog/menciones-citas-visitas/"],
      [
        "/productos/report/#como-funciona",
        "/blog/como-interpretar-resultados/",
      ],
    ])
      updated = updated.replace(`href="${l(from)}"`, `href="${l(to)}"`);
    edit(oldSection, updated);
  }
  if (id === "report" || id === "analytics" || id === "agencias") {
    const c = editorialCopy(locale).commercial[id];
    const block = `<section class="wrap editorial-commercial" data-editorial-commercial><div class="editorial-commercial-heading"><span class="eyebrow">${e(id === "report" ? "AI Report" : id === "analytics" ? "Analytics" : t("para_agencias"))}</span><h2>${e(c.heading)}</h2><p>${e(c.intro)}</p></div><div class="editorial-commercial-grid">${c.items.map((item) => `<div><h3>${e(item.title)}</h3><p>${e(item.text)}</p></div>`).join("")}</div><a class="text-link" href="${l("/recursos/como-medir-visibilidad-ia/")}">${e(ui.guideAction)}${icon("ArrowUpRight")}</a></section>`;
    const anchor =
      id === "agencias"
        ? "</main>"
        : html.match(/<section class="faq-section[^>]*>/)?.[0];
    if (!anchor) throw new Error(`Missing commercial section anchor: ${id}`);
    edit(anchor, `${block}${anchor}`);
  }
  return { html, edits };
}
export const integrateEditorialContent = (
  html: string,
  id: string,
  locale: Locale,
) => editorialEdits(html, id, locale).html;

/** Undo only the explicit user-approved editorial deltas; all remaining bytes must still match R05. */
export function restoreR05Content(
  rendered: string,
  baseline: string,
  id: string,
) {
  let result = rendered;
  for (const { from, to } of editorialEdits(
    baseline,
    id,
    "es",
  ).edits.reverse()) {
    if (!result.includes(to))
      throw new Error(
        `Editorial delta missing or changed outside the declared integration: ${id}`,
      );
    result = result.replaceAll(to, from);
  }
  return result;
}
