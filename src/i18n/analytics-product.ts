import type { Locale } from "./locales";

interface AnalyticsProductCopy {
  title: string;
  description: string;
  benefitsTitle: string;
  benefitsIntro: string;
  benefits: readonly { title: string; text: string }[];
  workflowTitle: string;
  workflowIntro: string;
  workflow: readonly { title: string; text: string }[];
  topicTitle: string;
  responses: string;
}

export const analyticsProductCopy: Record<Locale, AnalyticsProductCopy> = {
  es: {
    title: "Entendé cómo la IA habla de tu marca.",
    description:
      "Medí dónde aparecés, con quién te comparan y qué fuentes influyen en las respuestas. Analytics conecta presencia, narrativas y citas para orientar el trabajo de tu equipo.",
    benefitsTitle: "Una mirada completa a tu presencia en IA.",
    benefitsIntro:
      "Una respuesta puede recomendar una marca, compararla con otras o describirla sin enlazar su web. Para entender tu posición necesitás conocer la pregunta, el contexto de la mención y sus fuentes. Analytics organiza esas señales para decidir qué revisar y qué contenido trabajar.",
    benefits: [
      {
        title: "Presencia en las respuestas",
        text: "Identificá en qué respuestas aparece tu marca y leé su proporción dentro del conjunto analizado. Relacioná esa lectura con las preguntas y categorías que importan para tu negocio.",
      },
      {
        title: "Narrativas y sentimiento",
        text: "Revisá qué atributos se asocian a tu marca y cómo cambia el tono entre temas. Volvé a la respuesta para distinguir una recomendación, una descripción y una reserva.",
      },
      {
        title: "Dominios y páginas citadas",
        text: "Reconocé las fuentes utilizadas como referencia. Separá tu contenido de los medios, comparadores y comunidades para entender dónde se construye la conversación sobre tu categoría.",
      },
      {
        title: "Comparación con otras marcas",
        text: "Contrastá tu presencia con las alternativas configuradas en el mismo conjunto de preguntas. Ubicá los temas en los que aparecés y aquellos donde otras marcas concentran las menciones.",
      },
      {
        title: "Evolución con contexto",
        text: "Compará lecturas que conservan preguntas y condiciones compatibles. El contexto de cada medición permite reconocer cambios que merecen atención y revisar qué podría haberlos producido.",
      },
      {
        title: "Evidencia para tu equipo",
        text: "Conectá cada hallazgo con su pregunta, respuesta y fuente. Compartí el diagnóstico con marketing, contenido y dirección para acordar qué investigar y cuál será el siguiente paso.",
      },
    ],
    workflowTitle: "De las preguntas a las decisiones sobre tu marca.",
    workflowIntro:
      "Un porcentaje es el comienzo de una lectura. El valor aparece cuando podés explicar qué hay detrás y traducirlo en una prioridad para tu equipo. Definí el alcance con KAIRUM y recorré la evidencia con ese objetivo.",
    workflow: [
      {
        title: "Elegí las preguntas que importan",
        text: "Partí de tu categoría, tus productos y las decisiones que toma tu audiencia. Organizá preguntas de descubrimiento, comparación y elección para leer tu presencia en situaciones concretas.",
      },
      {
        title: "Leé las respuestas en su contexto",
        text: "Revisá la marca mencionada, las alternativas y las fuentes disponibles. Conservá fecha, superficie y cobertura para comprender qué representa cada observación y qué permite comparar.",
      },
      {
        title: "Encontrá qué merece atención",
        text: "Buscá temas con poca presencia, descripciones incompletas o fuentes que convenga revisar. Volvé al texto que sostiene cada hallazgo antes de convertirlo en una conclusión.",
      },
      {
        title: "Definí el próximo contenido",
        text: "Llevá las prioridades a tu estrategia editorial. Conectá el diagnóstico con AI Report, el trabajo de Consulting o la preparación de borradores en Agents, con revisión de tu equipo.",
      },
    ],
    topicTitle: "Presencia por tema",
    responses: "Respuestas",
  },
  en: {
    title: "Understand how AI talks about your brand.",
    description:
      "Measure where you appear, which brands you are compared with and which sources shape the answers. Analytics connects presence, narratives and citations to guide your team’s work.",
    benefitsTitle: "A complete view of your presence in AI.",
    benefitsIntro:
      "An answer can recommend a brand, compare it with others or describe it without linking to its website. Understanding your position requires the question, the context of the mention and its sources. Analytics organizes these signals to help you decide what to review and which content to work on.",
    benefits: [
      {
        title: "Presence in answers",
        text: "Identify the answers that mention your brand and its share of the analyzed set. Connect that reading with the questions and categories that matter to your business.",
      },
      {
        title: "Narratives and sentiment",
        text: "Review the attributes associated with your brand and how tone changes across topics. Return to the answer to distinguish a recommendation, a description and a reservation.",
      },
      {
        title: "Cited domains and pages",
        text: "Recognize the sources used as references. Separate your own content from publishers, comparison sites and communities to understand where conversations about your category take shape.",
      },
      {
        title: "Comparison with other brands",
        text: "Compare your presence with the alternatives configured for the same set of questions. Find the topics where you appear and those where other brands receive more mentions.",
      },
      {
        title: "Change with context",
        text: "Compare readings that preserve compatible questions and conditions. The context of each measurement helps identify changes worth reviewing and investigate what might have caused them.",
      },
      {
        title: "Evidence for your team",
        text: "Connect each finding to its question, answer and source. Share the diagnosis with marketing, content and leadership to agree on what to investigate and what to do next.",
      },
    ],
    workflowTitle: "From questions to decisions about your brand.",
    workflowIntro:
      "A percentage is the beginning of a reading. Its value comes from explaining what lies behind it and turning that understanding into a priority for your team. Define the scope with KAIRUM and review the evidence with that goal in mind.",
    workflow: [
      {
        title: "Choose the questions that matter",
        text: "Start with your category, your products and the decisions your audience makes. Organize discovery, comparison and choice questions to examine your presence in specific situations.",
      },
      {
        title: "Read answers in context",
        text: "Review the brand mentioned, its alternatives and the available sources. Keep the date, surface and coverage to understand what each observation represents and which comparisons it supports.",
      },
      {
        title: "Find what deserves attention",
        text: "Look for topics with limited presence, incomplete descriptions or sources worth reviewing. Return to the text supporting each finding before drawing a conclusion.",
      },
      {
        title: "Define your next content priority",
        text: "Bring priorities into your editorial strategy. Connect the diagnosis to AI Report, Consulting or draft preparation in Agents, with your team’s review.",
      },
    ],
    topicTitle: "Presence by topic",
    responses: "Answers",
  },
  "pt-br": {
    title: "Entenda como a IA fala sobre sua marca.",
    description:
      "Meça onde sua marca aparece, com quais alternativas é comparada e quais fontes influenciam as respostas. Analytics conecta presença, narrativas e citações para orientar o trabalho da sua equipe.",
    benefitsTitle: "Uma visão completa da sua presença na IA.",
    benefitsIntro:
      "Uma resposta pode recomendar uma marca, compará-la com outras ou descrevê-la sem incluir um link para seu site. Entender sua posição exige conhecer a pergunta, o contexto da menção e suas fontes. Analytics organiza esses sinais para decidir o que revisar e qual conteúdo trabalhar.",
    benefits: [
      {
        title: "Presença nas respostas",
        text: "Identifique as respostas que mencionam sua marca e sua proporção no conjunto analisado. Relacione essa leitura às perguntas e categorias importantes para seu negócio.",
      },
      {
        title: "Narrativas e sentimento",
        text: "Revise os atributos associados à sua marca e como o tom muda entre temas. Volte à resposta para distinguir uma recomendação, uma descrição e uma ressalva.",
      },
      {
        title: "Domínios e páginas citadas",
        text: "Reconheça as fontes utilizadas como referência. Separe seu conteúdo de publicações, comparadores e comunidades para entender onde se constrói a conversa sobre sua categoria.",
      },
      {
        title: "Comparação com outras marcas",
        text: "Compare sua presença com as alternativas configuradas no mesmo conjunto de perguntas. Localize os temas em que aparece e aqueles em que outras marcas concentram as menções.",
      },
      {
        title: "Evolução com contexto",
        text: "Compare leituras com perguntas e condições compatíveis. O contexto de cada medição ajuda a reconhecer mudanças que merecem atenção e investigar o que pode tê-las causado.",
      },
      {
        title: "Evidências para sua equipe",
        text: "Conecte cada descoberta à pergunta, resposta e fonte. Compartilhe o diagnóstico com marketing, conteúdo e liderança para definir o que investigar e qual será o próximo passo.",
      },
    ],
    workflowTitle: "Das perguntas às decisões sobre sua marca.",
    workflowIntro:
      "Uma porcentagem é o início de uma leitura. Seu valor aparece quando é possível explicar o que há por trás e transformar isso em uma prioridade para a equipe. Defina o escopo com KAIRUM e percorra as evidências com esse objetivo.",
    workflow: [
      {
        title: "Escolha as perguntas importantes",
        text: "Comece pela categoria, seus produtos e as decisões da audiência. Organize perguntas de descoberta, comparação e escolha para examinar sua presença em situações concretas.",
      },
      {
        title: "Leia as respostas em contexto",
        text: "Revise a marca mencionada, as alternativas e as fontes disponíveis. Preserve data, superfície e cobertura para compreender o que cada observação representa e o que permite comparar.",
      },
      {
        title: "Encontre o que merece atenção",
        text: "Busque temas com pouca presença, descrições incompletas ou fontes que mereçam revisão. Volte ao texto que sustenta cada descoberta antes de chegar a uma conclusão.",
      },
      {
        title: "Defina o próximo conteúdo",
        text: "Leve as prioridades à estratégia editorial. Conecte o diagnóstico ao AI Report, ao trabalho de Consulting ou à preparação de rascunhos no Agents, com revisão da sua equipe.",
      },
    ],
    topicTitle: "Presença por tema",
    responses: "Respostas",
  },
};
