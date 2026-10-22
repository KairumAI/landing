import { locales, type Locale } from "../locales";

export const editorialEntries = [
  { id: "resources", path: "/recursos/", kind: "hub" },
  { id: "blog", path: "/blog/", kind: "blog" },
  {
    id: "chatgpt-ads",
    path: "/blog/chatgpt-ads-argentina/",
    kind: "article",
    locales: ["es"],
  },
  {
    id: "adobe-shopping",
    path: "/blog/compras-desde-ia-adobe/",
    kind: "article",
    locales: ["es"],
  },
  {
    id: "visibility-guide",
    path: "/recursos/como-medir-visibilidad-ia/",
    kind: "guide",
  },
  {
    id: "mentions-citations-visits",
    path: "/blog/menciones-citas-visitas/",
    kind: "article",
  },
  {
    id: "choosing-questions",
    path: "/blog/como-elegir-preguntas/",
    kind: "article",
  },
  {
    id: "interpreting-results",
    path: "/blog/como-interpretar-resultados/",
    kind: "article",
  },
  { id: "glossary", path: "/glosario/", kind: "reference" },
  { id: "methodology", path: "/metodologia/", kind: "reference" },
] as const;
export type EditorialPageId = (typeof editorialEntries)[number]["id"];
export function editorialLocales(id: EditorialPageId): readonly Locale[] {
  const entry = editorialEntries.find((entry) => entry.id === id)!;
  return "locales" in entry ? entry.locales : locales;
}
export type Section = {
  id: string;
  title: string;
  paragraphs: string[];
  items?: string[];
  table?: { columns: string[]; rows: string[][] };
  example?: { label: string; text: string };
  figure?: {
    title: string;
    caption: string;
    steps: { label: string; detail: string; value?: string }[];
  };
  references?: Source[];
};
export type Source = { title: string; url: string };
export type EditorialPage = {
  title: string;
  seoTitle?: string;
  description: string;
  category: string;
  summary: string;
  // Static reviewed rich text uses the same article shell without adding copy.
  bodyHtml?: string;
  reviewedDate?: string;
  reviewedLabel?: string;
  sections: Section[];
  sources: Source[];
  related: EditorialPageId[];
  product: "report" | "analytics" | "prompt-intelligence";
  cover?: { alt: string; caption: string };
  takeaways?: string[];
};
export type EditorialCopy = {
  ui: {
    resources: string;
    blog: string;
    glossary: string;
    methodology: string;
    resourcesDescription: string;
    blogDescription: string;
    glossaryDescription: string;
    explore: string;
    featured: string;
    guide: string;
    articles: string;
    onThisPage: string;
    sources: string;
    related: string;
    author: string;
    reviewed: string;
    date: string;
    minutes: string;
    read: string;
    editorialNote: string;
    editorialPolicy: string;
    reports: string;
    reportsNote: string;
    reportsAction: string;
    back: string;
    nextStep: string;
    ctaTitle: string;
    ctaText: string;
    ctaAction: string;
    question: string;
    answer: string;
    source: string;
    evidence: string;
    homeQuestions: string;
    homeSources: string;
    homeFindings: string;
    heroTitle: string;
    heroIntro: string;
    blogTitle: string;
    blogIntro: string;
    guideAction: string;
    browseBlog: string;
    synthetic: string;
    takeaways: string;
    reference: string;
  };
  commercial: Record<
    "report" | "analytics" | "agencias",
    {
      title: string;
      description: string;
      heading: string;
      intro: string;
      items: { title: string; text: string }[];
    }
  >;
  pages: Record<EditorialPageId, EditorialPage>;
};
export const reviewedDate = "2026-10-16";
