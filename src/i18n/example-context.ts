import type { Locale } from "./locales";

interface ExampleContextCopy {
  homeQueryLabel: string;
  promptQuestionLabel: string;
  reportQueryContext: string;
  analyticsComparisonContext: string;
}

const copy: Record<Locale, ExampleContextCopy> = {
  es: {
    homeQueryLabel: "Ejemplo de consulta a una IA",
    promptQuestionLabel: "Ejemplo de pregunta para IA",
    reportQueryContext:
      "Consulta de ejemplo a una IA. Vista ilustrativa del diagnóstico.",
    analyticsComparisonContext:
      "Comparación ilustrativa de respuestas a una misma consulta a una IA.",
  },
  en: {
    homeQueryLabel: "Example query to an AI assistant",
    promptQuestionLabel: "Example question for AI",
    reportQueryContext:
      "Example query to an AI assistant. Illustrative diagnosis view.",
    analyticsComparisonContext:
      "Illustrative comparison of responses to the same AI query.",
  },
  "pt-br": {
    homeQueryLabel: "Exemplo de consulta a uma IA",
    promptQuestionLabel: "Exemplo de pergunta para IA",
    reportQueryContext:
      "Consulta de exemplo a uma IA. Visão ilustrativa do diagnóstico.",
    analyticsComparisonContext:
      "Comparação ilustrativa de respostas à mesma consulta a uma IA.",
  },
};

export const exampleContextCopy = (locale: Locale): ExampleContextCopy =>
  copy[locale];
