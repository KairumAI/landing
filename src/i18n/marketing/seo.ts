import type { Locale } from "../locales";

export const seo = {
  es: {
    homeTitle: "KAIRUM — Visibilidad de marca en IA",
    homeDescription:
      "Preguntas, visibilidad, contenido y tráfico con contexto. Conocé Prompt Intelligence, Analytics, Agents y Traffic, y los servicios Report y Consulting.",
    catalogTitle: "Productos GEO y AEO — KAIRUM",
    catalogDescription:
      "De las preguntas a la evidencia, el contenido y las señales de tu web. Explorá los productos y servicios de KAIRUM para trabajar la presencia de tu marca en IA.",
    menuClose: "Cerrar menú",
    language: "Idioma",
    pages: "Páginas",
    fullText: "Texto completo",
    contact: "Contacto",
    breadcrumbsHome: "Inicio",
  },
  en: {
    homeTitle: "KAIRUM — AI Brand Visibility",
    homeDescription:
      "Questions, visibility, content and traffic in context. Explore Prompt Intelligence, Analytics, Agents and Traffic, plus Report and Consulting services.",
    catalogTitle: "GEO and AEO Products — KAIRUM",
    catalogDescription:
      "From questions to evidence, content and signals from your website. Explore KAIRUM products and services to work on your brand presence in AI.",
    menuClose: "Close menu",
    language: "Language",
    pages: "Pages",
    fullText: "Full text",
    contact: "Contact",
    breadcrumbsHome: "Home",
  },
  "pt-br": {
    homeTitle: "KAIRUM — Visibilidade de marca em IA",
    homeDescription:
      "Perguntas, visibilidade, conteúdo e tráfego com contexto. Conheça Prompt Intelligence, Analytics, Agents e Traffic, e os serviços Report e Consulting.",
    catalogTitle: "Produtos GEO e AEO — KAIRUM",
    catalogDescription:
      "Das perguntas às evidências, ao conteúdo e aos sinais do seu site. Conheça os produtos e serviços KAIRUM para trabalhar a presença da sua marca em IA.",
    menuClose: "Fechar menu",
    language: "Idioma",
    pages: "Páginas",
    fullText: "Texto completo",
    contact: "Contato",
    breadcrumbsHome: "Início",
  },
} satisfies Record<
  Locale,
  {
    homeTitle: string;
    homeDescription: string;
    catalogTitle: string;
    catalogDescription: string;
    menuClose: string;
    language: string;
    pages: string;
    fullText: string;
    contact: string;
    breadcrumbsHome: string;
  }
>;
