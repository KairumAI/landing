import type { Locale } from "../locales";

export const seo = {
  es: {
    products: {
      "prompt-intelligence": {
        title:
          "Investigación de preguntas para IA | Prompt Intelligence — KAIRUM",
        description:
          "Explorá el alcance planificado de Prompt Intelligence: organizar preguntas por intención y contexto para preparar una medición de visibilidad en IA.",
      },
      traffic: {
        title: "Tráfico desde IA y rastreadores | Traffic — KAIRUM",
        description:
          "Conocé el alcance planificado de Traffic: distinguir visitas referidas por IA y solicitudes de rastreadores, con fuentes y límites de atribución claros.",
      },
      consulting: {
        title: "Consultoría GEO y AEO | Consulting — KAIRUM",
        description:
          "Acordá un plan de trabajo para la visibilidad de tu marca en IA: preguntas, evidencia, prioridades y acompañamiento con alcance definido junto a tu equipo.",
      },
    },
    homeTitle: "KAIRUM — Visibilidad de marca en IA",
    homeDescription:
      "Preguntas, visibilidad, contenido y tráfico con contexto. Conocé Prompt Intelligence, Analytics, Agents y Traffic, y los servicios AI Report y Consulting.",
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
    products: {
      "prompt-intelligence": {
        title: "AI Question Research | Prompt Intelligence — KAIRUM",
        description:
          "Explore the planned scope of Prompt Intelligence: organize questions by intent and context to prepare an AI brand visibility measurement.",
      },
      traffic: {
        title: "AI Referral Traffic and Crawlers | Traffic — KAIRUM",
        description:
          "Explore the planned scope of Traffic: distinguish AI-referred visits from crawler requests, with explicit data sources and attribution limits.",
      },
      consulting: {
        title: "GEO and AEO Consulting Services — KAIRUM",
        description:
          "Agree on a plan for your brand visibility in AI: questions, evidence, priorities and support, with a scope defined together with your team.",
      },
    },
    homeTitle: "KAIRUM — AI Brand Visibility",
    homeDescription:
      "Questions, visibility, content and traffic in context. Explore Prompt Intelligence, Analytics, Agents and Traffic, plus AI Report and Consulting services.",
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
    products: {
      "prompt-intelligence": {
        title: "Pesquisa de perguntas para IA | Prompt Intelligence — KAIRUM",
        description:
          "Conheça o escopo planejado do Prompt Intelligence: organizar perguntas por intenção e contexto para preparar uma medição de visibilidade em IA.",
      },
      traffic: {
        title: "Tráfego vindo de IA e rastreadores | Traffic — KAIRUM",
        description:
          "Conheça o escopo planejado do Traffic: diferenciar visitas vindas de IA e solicitações de rastreadores, com fontes e limites de atribuição claros.",
      },
      consulting: {
        title: "Consultoria GEO e AEO | Consulting — KAIRUM",
        description:
          "Defina um plano para a visibilidade da sua marca em IA: perguntas, evidências, prioridades e acompanhamento com escopo acordado com sua equipe.",
      },
    },
    homeTitle: "KAIRUM — Visibilidade de marca em IA",
    homeDescription:
      "Perguntas, visibilidade, conteúdo e tráfego com contexto. Conheça Prompt Intelligence, Analytics, Agents e Traffic, e os serviços AI Report e Consulting.",
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
    products: Record<
      "prompt-intelligence" | "traffic" | "consulting",
      { title: string; description: string }
    >;
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
