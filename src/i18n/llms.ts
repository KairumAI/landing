import { getDictionary } from ".";
import { bookingUrl, localeMeta, locales, type Locale } from "./locales";
import type { Dictionary } from "./types";

/** Plain-text versions of the landing for language models (https://llmstxt.org). */

const line = (parts: readonly string[]) =>
  parts.map((part) => part.trim()).join(" ");
const url = (path: string, site: URL) => new URL(path, site).href;
const fullTextPath = (locale: Locale) =>
  `${localeMeta[locale].path}llms-full.txt`;

/** Index at /llms.txt, in Spanish (the primary language), linking every language. */
export function renderLlmsIndex(site: URL): string {
  const es = getDictionary("es");
  const pages = locales.map((locale) => {
    const t = getDictionary(locale);
    return `- [${t.meta.title}](${url(localeMeta[locale].path, site)}): ${t.meta.description}`;
  });
  const fullTexts = locales.map(
    (locale) =>
      `- [${getDictionary(locale).meta.title} (${localeMeta[locale].name})](${url(fullTextPath(locale), site)})`,
  );
  return `# ${es.meta.siteName}

> ${es.meta.description}

${es.hero.intro}

${es.faq.items.map(({ question, answer }) => `- ${question} ${answer}`).join("\n")}

## Páginas

${pages.join("\n")}

## Texto completo

${fullTexts.join("\n")}

## Contacto

- [${es.book.label}](${bookingUrl})
`;
}

function sectionText(t: Dictionary): string[] {
  const { client } = t;
  return [
    `## ${line(t.context.title)}`,
    t.context.intro,
    t.context.questions.map((question) => `- ${question}`).join("\n"),
    `## ${line(t.journey.title)}`,
    line(t.journey.intro),
    t.journey.steps
      .map(
        (step, index) =>
          `${index + 1}. ${step}: ${client.stageCaptions[index]}`,
      )
      .join("\n"),
    `## ${line(t.answers.title)}`,
    t.answers.intro,
    t.answers.apiNote,
    client.providerExamples
      .map(({ name, answer, insight }) => `- ${name}: ${answer} ${insight}`)
      .join("\n"),
    `## ${line(t.patterns.title)}`,
    line(t.patterns.intro),
    Object.values(client.patterns)
      .map(({ question, insight }) => `- ${question} ${insight}`)
      .join("\n"),
    `## ${line(t.sources.title)}`,
    t.sources.intro,
    t.sources.benefits.map((benefit) => `- ${benefit}`).join("\n"),
    `## ${line(t.audience.title)}`,
    line(t.audience.intro),
    Object.entries(client.audienceReadings)
      .map(
        ([key, { question, reading, action }]) =>
          `- ${t.audience.buttons[key as keyof typeof t.audience.buttons].title}: ${question} ${reading} ${action}`,
      )
      .join("\n"),
    `## ${line(t.report.title)}`,
    t.report.intro,
    Object.values(client.modules)
      .map(({ title, copy }) => `- ${title}: ${copy}`)
      .join("\n"),
    `## ${line(t.faq.title)}`,
    t.faq.items
      .map(({ question, answer }) => `### ${question}\n\n${answer}`)
      .join("\n\n"),
    `## ${line(t.contact.title)}`,
    line(t.contact.intro),
    t.contact.agenda
      .map(({ title, detail }) => `- ${title} ${detail}`)
      .join("\n"),
    `[${t.book.label}](${bookingUrl})`,
  ];
}

/** Full page text in one language, at <locale path>/llms-full.txt. */
export function renderLlmsFull(locale: Locale, site: URL): string {
  const t = getDictionary(locale);
  return `# ${t.meta.title}

> ${t.meta.description}

${url(localeMeta[locale].path, site)}

## ${line([t.hero.titleFirst, t.hero.titleSecond, t.hero.titleHighlight])}

${t.hero.intro}

${t.hero.demoNote}

${sectionText(t).join("\n\n")}
`;
}

export const textHeaders = {
  "Content-Type": "text/plain; charset=utf-8",
};
