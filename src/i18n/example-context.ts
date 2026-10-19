import type { Locale } from "./locales";

interface ExampleContextCopy {
  homeQueryLabel: string;
  promptQuestionLabel: string;
  reportQueryContext: string;
  analyticsComparisonContext: string;
}

const copy: Record<Locale, ExampleContextCopy> = {
  es: {
    homeQueryLabel: "Pregunta a la IA",
    promptQuestionLabel: "Pregunta de tu audiencia",
    reportQueryContext: "Pregunta de negocio · Respuesta · Evidencia",
    analyticsComparisonContext:
      "Una misma pregunta. Respuestas y fuentes para contrastar.",
  },
  en: {
    homeQueryLabel: "Question for AI",
    promptQuestionLabel: "Your audience’s question",
    reportQueryContext: "Business question · Answer · Evidence",
    analyticsComparisonContext: "One question. Answers and sources to compare.",
  },
  "pt-br": {
    homeQueryLabel: "Pergunta para a IA",
    promptQuestionLabel: "Pergunta do seu público",
    reportQueryContext: "Pergunta de negócio · Resposta · Evidência",
    analyticsComparisonContext:
      "Uma mesma pergunta. Respostas e fontes para comparar.",
  },
};

export const exampleContextCopy = (locale: Locale): ExampleContextCopy =>
  copy[locale];
