import type { Locale } from "./locales";

export type AnalyticsPreviewTab = "comparison" | "alternatives" | "sources";

export interface AnalyticsPreviewCopy {
  name: string;
  disclosure: string;
  tabsLabel: string;
  tabs: Record<AnalyticsPreviewTab, string>;
  comparisonTitle: string;
  queryLabel: string;
  queryContext: string;
  question: string;
  conditions: string;
  readings: readonly [
    { label: string; text: string },
    { label: string; text: string },
  ];
  changeLabel: string;
  change: string;
  scope: string;
  alternatives: {
    title: string;
    intro: string;
    presenceLabel: string;
    supportLabel: string;
    items: readonly { brand: string; presence: string; support: string }[];
  };
  source: {
    title: string;
    intro: string;
    page: string;
    url: string;
    quote: string;
    supportsLabel: string;
    supports: string;
    limitsLabel: string;
    limits: string;
  };
}

export const analyticsPreviewCopy: Record<Locale, AnalyticsPreviewCopy> = {
  es: {
    name: "Analytics",
    disclosure: "Ejemplo ilustrativo",
    tabsLabel: "Explorar el ejemplo de Analytics",
    tabs: {
      comparison: "Comparación",
      alternatives: "Alternativas",
      sources: "Fuentes",
    },
    comparisonTitle: "Una misma pregunta. Dos lecturas.",
    queryLabel: "Ejemplo de consulta a una IA",
    queryContext:
      "Una persona podría escribir esto en ChatGPT u otro asistente. Las respuestas de abajo son ilustrativas.",
    question: "¿Qué software sirve para coordinar un equipo de diseño?",
    conditions:
      "Misma pregunta y mismas condiciones de consulta para comparar las dos lecturas.",
    readings: [
      {
        label: "Respuesta de ejemplo · inicial",
        text: "Tu marca reúne briefs y comentarios para coordinar el trabajo de diseño.",
      },
      {
        label: "Respuesta de ejemplo · nueva",
        text: "Tu marca reúne briefs, comentarios y revisiones por proyecto.",
      },
    ],
    changeLabel: "Qué cambió",
    change:
      "La nueva lectura incorpora revisiones. La fuente permite comprobar ese detalle.",
    scope:
      "Ejemplo de una vista planificada de Analytics. No muestra resultados medidos ni una integración activa.",
    alternatives: {
      title: "Qué opciones aparecen",
      intro:
        "La presencia y el apoyo de una fuente se leen por separado. El orden de esta lista no indica preferencia ni posición.",
      presenceLabel: "Presencia",
      supportLabel: "Apoyo de fuente",
      items: [
        {
          brand: "Tu marca",
          presence: "Mencionada en ambas lecturas.",
          support:
            "La cita de ejemplo respalda las revisiones por proyecto que agrega la nueva lectura.",
        },
        {
          brand: "Alternativa A",
          presence: "No evaluada en estas dos lecturas.",
          support:
            "El ejemplo no aporta una cita para contrastar esta alternativa.",
        },
        {
          brand: "Alternativa B",
          presence: "No aparece en esta respuesta de ejemplo.",
          support: "Su ausencia no permite concluir que sea menos adecuada.",
        },
      ],
    },
    source: {
      title: "El detalle, en su fuente",
      intro:
        "Esta página y su cita son ficticias. Sirven para mostrar qué se puede contrastar en una lectura.",
      page: "Página de producto · Tu marca",
      url: "tumarca.example/equipo",
      quote: "Briefs, comentarios y revisiones por proyecto en un solo lugar.",
      supportsLabel: "Qué permite comprobar",
      supports:
        "Que la página describe revisiones por proyecto, el detalle que agrega la nueva lectura.",
      limitsLabel: "Qué no permite concluir",
      limits:
        "No demuestra preferencia de una IA, calidad del producto ni una mejora de visibilidad.",
    },
  },
  en: {
    name: "Analytics",
    disclosure: "Illustrative example",
    tabsLabel: "Explore the Analytics example",
    tabs: {
      comparison: "Comparison",
      alternatives: "Alternatives",
      sources: "Sources",
    },
    comparisonTitle: "The same question. Two readings.",
    queryLabel: "Example question for an AI assistant",
    queryContext:
      "Someone could type this into ChatGPT or another assistant. The responses below are illustrative.",
    question: "What software helps coordinate a design team?",
    conditions:
      "The same question and query conditions make the two readings comparable.",
    readings: [
      {
        label: "Example response · initial",
        text: "Your brand brings briefs and comments together to coordinate design work.",
      },
      {
        label: "Example response · new",
        text: "Your brand brings briefs, comments and reviews together for each project.",
      },
    ],
    changeLabel: "What changed",
    change:
      "The new reading adds reviews. The source lets you check that detail.",
    scope:
      "An example of a planned Analytics view. It shows no measured results or active integration.",
    alternatives: {
      title: "Which options appear",
      intro:
        "Presence and source support are read separately. The order of this list indicates neither preference nor position.",
      presenceLabel: "Presence",
      supportLabel: "Source support",
      items: [
        {
          brand: "Your brand",
          presence: "Mentioned in both readings.",
          support:
            "The example quote supports the project reviews added in the new reading.",
        },
        {
          brand: "Alternative A",
          presence: "Not assessed in these two readings.",
          support:
            "The example provides no citation to check this alternative.",
        },
        {
          brand: "Alternative B",
          presence: "Absent from this example response.",
          support: "Its absence does not establish that it is less suitable.",
        },
      ],
    },
    source: {
      title: "The detail, in its source",
      intro:
        "This page and its quote are fictional. They illustrate what can be checked in a reading.",
      page: "Product page · Your brand",
      url: "yourbrand.example/team",
      quote: "Briefs, comments and reviews for each project in one place.",
      supportsLabel: "What it lets you check",
      supports:
        "That the page describes project reviews, the detail added in the new reading.",
      limitsLabel: "What it does not establish",
      limits:
        "It does not demonstrate AI preference, product quality or improved visibility.",
    },
  },
  "pt-br": {
    name: "Analytics",
    disclosure: "Exemplo ilustrativo",
    tabsLabel: "Explorar o exemplo de Analytics",
    tabs: {
      comparison: "Comparação",
      alternatives: "Alternativas",
      sources: "Fontes",
    },
    comparisonTitle: "A mesma pergunta. Duas leituras.",
    queryLabel: "Exemplo de consulta a uma IA",
    queryContext:
      "Uma pessoa poderia escrever isso no ChatGPT ou em outro assistente. As respostas abaixo são ilustrativas.",
    question: "Qual software ajuda a coordenar uma equipe de design?",
    conditions:
      "Mesma pergunta e mesmas condições de consulta para comparar as duas leituras.",
    readings: [
      {
        label: "Resposta de exemplo · inicial",
        text: "Sua marca reúne briefs e comentários para coordenar o trabalho de design.",
      },
      {
        label: "Resposta de exemplo · nova",
        text: "Sua marca reúne briefs, comentários e revisões por projeto.",
      },
    ],
    changeLabel: "O que mudou",
    change:
      "A nova leitura acrescenta revisões. A fonte permite conferir esse detalhe.",
    scope:
      "Exemplo de uma visão planejada do Analytics. Não mostra resultados medidos nem uma integração ativa.",
    alternatives: {
      title: "Quais opções aparecem",
      intro:
        "A presença e o apoio de uma fonte são lidos separadamente. A ordem desta lista não indica preferência nem posição.",
      presenceLabel: "Presença",
      supportLabel: "Apoio de fonte",
      items: [
        {
          brand: "Sua marca",
          presence: "Mencionada nas duas leituras.",
          support:
            "A citação de exemplo sustenta as revisões por projeto acrescentadas na nova leitura.",
        },
        {
          brand: "Alternativa A",
          presence: "Não avaliada nestas duas leituras.",
          support:
            "O exemplo não traz uma citação para conferir esta alternativa.",
        },
        {
          brand: "Alternativa B",
          presence: "Não aparece nesta resposta de exemplo.",
          support: "Sua ausência não permite concluir que seja menos adequada.",
        },
      ],
    },
    source: {
      title: "O detalhe, em sua fonte",
      intro:
        "Esta página e sua citação são fictícias. Servem para mostrar o que pode ser conferido em uma leitura.",
      page: "Página de produto · Sua marca",
      url: "suamarca.example/equipe",
      quote: "Briefs, comentários e revisões por projeto em um só lugar.",
      supportsLabel: "O que permite conferir",
      supports:
        "Que a página descreve revisões por projeto, o detalhe acrescentado na nova leitura.",
      limitsLabel: "O que não permite concluir",
      limits:
        "Não demonstra preferência de uma IA, qualidade do produto nem melhora de visibilidade.",
    },
  },
};
