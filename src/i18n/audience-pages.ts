import type { Locale } from "./locales";
import { translator } from "./marketing";
import { editorialCopy } from "./editorial";

export type AudiencePageId = "marcas" | "agencias" | "nosotros";
interface Point {
  title: string;
  text: string;
}
interface HeroCopy {
  eyebrow: string;
  title: string;
  intro: string;
}
interface AudienceDetails {
  brands: {
    example: {
      label: string;
      question: string;
      answer: string;
      source: string;
      sourcePath: string;
      annotation: string;
      note: string;
    };
    reading: HeroCopy & { items: Point[] };
    products: HeroCopy;
    reportName: string;
  };
  agencies: {
    example: {
      label: string;
      brand: string;
      title: string;
      items: Point[];
      note: string;
    };
    workflow: HeroCopy & { items: Point[] };
    roles: HeroCopy & {
      partners: { title: string; intro: string; items: Point[] }[];
    };
  };
  about: {
    highlight: string;
    convictionLabel: string;
    conviction: string;
    why: HeroCopy & { items: Point[] };
    method: { eyebrow: string; title: string; items: Point[] };
  };
}
export interface AudienceCopy extends AudienceDetails {
  heroes: Record<AudiencePageId, HeroCopy>;
  book: string;
  guideAction: string;
}

const dictionaries: Record<Locale, AudienceDetails> = {
  es: {
    brands: {
      example: {
        label: "Ejemplo ilustrativo",
        question: "¿Qué software sirve para coordinar un equipo de diseño?",
        answer:
          "Tu marca reúne briefs y comentarios para coordinar el trabajo de diseño.",
        source:
          "Briefs, comentarios y revisiones por proyecto, en un solo lugar.",
        sourcePath: "tu-marca.example/equipo",
        annotation:
          "La fuente habla de revisiones. La respuesta del ejemplo no las menciona.",
        note: "Esquema ilustrativo: no es una medición ni una respuesta real de un proveedor.",
      },
      reading: {
        eyebrow: "Del análisis a la acción",
        title: "De una respuesta a una decisión.",
        intro:
          "Una mención abre preguntas. Volver a la respuesta y a sus fuentes ayuda a decidir qué merece atención.",
        items: [
          {
            title: "Qué preguntan",
            text: "Partimos de tu categoría, las decisiones que querés entender y las preguntas que vale la pena investigar.",
          },
          {
            title: "Qué aparece",
            text: "Leemos cómo se menciona la marca, qué información se incluye y qué fuentes acompañan la respuesta.",
          },
          {
            title: "Qué priorizar",
            text: "Conectamos cada observación con su evidencia y acordamos qué revisar, sin confundir una muestra con una conclusión general.",
          },
        ],
      },
      products: {
        eyebrow: "Soluciones KAIRUM",
        title: "Elegí el alcance de la lectura.",
        intro:
          "Distintas formas de pasar de una pregunta al próximo paso, con el alcance de cada producto a la vista.",
      },
      reportName: "AI Report",
    },
    agencies: {
      example: {
        label: "Entregable ilustrativo",
        brand: "KAIRUM",
        title: "Una lectura\npara compartir.",
        items: [
          {
            title: "Pregunta",
            text: "¿Cómo se explica el trabajo de diseño de la marca?",
          },
          {
            title: "Evidencia",
            text: "La página del ejemplo habla de briefs, comentarios y revisiones por proyecto.",
          },
          {
            title: "Prioridad para revisar",
            text: "Contrastar cómo se presenta esa capacidad y acordar qué preguntas investigar.",
          },
        ],
        note: "Ejemplo de un proyecto de diseño. El alcance y los entregables se acuerdan con cada cliente; no representa un resultado medido.",
      },
      workflow: {
        eyebrow: "Proceso",
        title: "Del brief a la entrega.",
        intro:
          "Un recorrido para acordar qué observar, revisar la evidencia y preparar la siguiente conversación con tu cliente.",
        items: [
          {
            title: "Brief",
            text: "Una marca, su categoría y una pregunta de negocio. El alcance se define antes de observar.",
          },
          {
            title: "Diagnóstico",
            text: "Una lectura de respuestas y fuentes dentro de las condiciones acordadas.",
          },
          {
            title: "Revisión",
            text: "Hallazgos, límites y preguntas pendientes se contrastan con tu agencia.",
          },
          {
            title: "Entrega",
            text: "Una lectura para compartir con el cliente y conversar sobre el siguiente paso.",
          },
        ],
      },
      roles: {
        eyebrow: "Roles",
        title: "El criterio sigue en tu equipo.",
        intro:
          "KAIRUM aporta una lectura documentada. Tu agencia aporta el contexto del cliente y la dirección del trabajo.",
        partners: [
          {
            title: "KAIRUM",
            intro: "La base para una conversación con evidencia.",
            items: [
              {
                title: "Preguntas",
                text: "Organizar las preguntas y las condiciones que delimitan la observación.",
              },
              {
                title: "Evidencia",
                text: "Reunir respuestas y fuentes para que cada observación pueda revisarse.",
              },
              {
                title: "Diagnóstico",
                text: "Preparar una lectura de hallazgos, límites y prioridades para conversar.",
              },
            ],
          },
          {
            title: "Tu agencia",
            intro: "El criterio para convertir la lectura en un plan.",
            items: [
              {
                title: "Estrategia",
                text: "Definir qué decisiones importan para la marca y su categoría.",
              },
              {
                title: "Contexto del cliente",
                text: "Aportar el conocimiento del negocio, sus audiencias y sus objetivos.",
              },
              {
                title: "Revisión",
                text: "Interpretar los hallazgos junto al cliente y acordar qué merece atención.",
              },
              {
                title: "Siguientes pasos",
                text: "Decidir el alcance del trabajo posterior y la forma de acompañarlo.",
              },
            ],
          },
        ],
      },
    },
    about: {
      highlight: "evidencia.",
      convictionLabel: "Nuestra convicción",
      conviction:
        "Una respuesta no alcanza. Hay que poder leer de dónde viene.",
      why: {
        eyebrow: "Por qué existe KAIRUM",
        title: "Una mirada que se pueda revisar.",
        intro:
          "Queremos que la conversación sobre la presencia de una marca en IA empiece por preguntas claras. Que cada observación conserve su fuente y que los próximos pasos respondan al contexto del equipo.",
        items: [
          {
            title: "Preguntas más claras.",
            text: "Relacionar lo que investigamos con la categoría, las audiencias y una decisión concreta.",
          },
          {
            title: "Fuentes inspectables.",
            text: "Conservar la respuesta y su contexto para poder volver a la evidencia antes de concluir.",
          },
          {
            title: "Revisión humana.",
            text: "Interpretar matices, hacer explícitos los límites y acordar qué vale la pena revisar.",
          },
        ],
      },
      method: {
        eyebrow: "Cómo trabajamos",
        title: "Un método para conversar con claridad.",
        items: [
          {
            title: "Hacer una buena pregunta.",
            text: "Partir de los objetivos y del contexto de la marca para definir qué observar y bajo qué condiciones.",
          },
          {
            title: "Conservar la evidencia.",
            text: "Leer las respuestas junto a sus fuentes y distinguir lo observado de lo que todavía falta contrastar.",
          },
          {
            title: "Decidir con tu equipo.",
            text: "Convertir la lectura en prioridades compartidas y dejar explícitos el alcance y el siguiente paso.",
          },
        ],
      },
    },
  },
  en: {
    brands: {
      example: {
        label: "Illustrative example",
        question: "What software helps coordinate a design team?",
        answer:
          "Your brand brings briefs and feedback together to coordinate design work.",
        source: "Briefs, feedback and reviews per project, in one place.",
        sourcePath: "your-brand.example/team",
        annotation:
          "The source mentions reviews. The example answer leaves them out.",
        note: "Illustrative diagram: this is neither a measurement nor a real provider response.",
      },
      reading: {
        eyebrow: "From analysis to action",
        title: "From an answer to a decision.",
        intro:
          "A mention raises questions. Returning to the answer and its sources helps decide what deserves attention.",
        items: [
          {
            title: "What people ask",
            text: "We start with your category, the decisions you want to understand and the questions worth investigating.",
          },
          {
            title: "What appears",
            text: "We read how the brand is mentioned, what information is included and which sources accompany the answer.",
          },
          {
            title: "What to prioritize",
            text: "We connect each observation to its evidence and agree on what to review, keeping a sample separate from a general conclusion.",
          },
        ],
      },
      products: {
        eyebrow: "KAIRUM solutions",
        title: "Choose the scope of the reading.",
        intro:
          "Different ways to move from a question to a next step, with each product's scope in view.",
      },
      reportName: "AI Report",
    },
    agencies: {
      example: {
        label: "Illustrative deliverable",
        brand: "KAIRUM",
        title: "A reading\nto share.",
        items: [
          {
            title: "Question",
            text: "How is the brand's design work explained?",
          },
          {
            title: "Evidence",
            text: "The example page describes briefs, feedback and reviews per project.",
          },
          {
            title: "Priority to review",
            text: "Check how that capability is presented and agree on which questions to investigate.",
          },
        ],
        note: "An example design project. Scope and deliverables are agreed with each client; this does not represent a measured result.",
      },
      workflow: {
        eyebrow: "Process",
        title: "From brief to delivery.",
        intro:
          "A path to agree on what to observe, review the evidence and prepare the next conversation with your client.",
        items: [
          {
            title: "Brief",
            text: "A brand, its category and a business question. Scope is defined before observation.",
          },
          {
            title: "Diagnosis",
            text: "A reading of answers and sources within the agreed conditions.",
          },
          {
            title: "Review",
            text: "Findings, limits and open questions are discussed with your agency.",
          },
          {
            title: "Delivery",
            text: "A reading to share with the client and discuss the next step.",
          },
        ],
      },
      roles: {
        eyebrow: "Roles",
        title: "The judgment stays with your team.",
        intro:
          "KAIRUM contributes a documented reading. Your agency contributes client context and the direction of the work.",
        partners: [
          {
            title: "KAIRUM",
            intro: "The foundation for a conversation with evidence.",
            items: [
              {
                title: "Questions",
                text: "Organize the questions and conditions that define the observation.",
              },
              {
                title: "Evidence",
                text: "Bring answers and sources together so each observation can be reviewed.",
              },
              {
                title: "Diagnosis",
                text: "Prepare a reading of findings, limits and priorities for discussion.",
              },
            ],
          },
          {
            title: "Your agency",
            intro: "The judgment to turn a reading into a plan.",
            items: [
              {
                title: "Strategy",
                text: "Define which decisions matter for the brand and its category.",
              },
              {
                title: "Client context",
                text: "Contribute knowledge of the business, its audiences and its goals.",
              },
              {
                title: "Review",
                text: "Interpret findings with the client and agree on what deserves attention.",
              },
              {
                title: "Next steps",
                text: "Decide the scope of further work and how to support it.",
              },
            ],
          },
        ],
      },
    },
    about: {
      highlight: "evidence.",
      convictionLabel: "Our conviction",
      conviction:
        "An answer isn't enough. You need to be able to see where it comes from.",
      why: {
        eyebrow: "Why KAIRUM exists",
        title: "A perspective you can review.",
        intro:
          "We want the conversation about a brand's AI presence to start with clear questions. Each observation should retain its source, and next steps should respond to the team's context.",
        items: [
          {
            title: "Clearer questions.",
            text: "Connect what we investigate with the category, its audiences and a concrete decision.",
          },
          {
            title: "Inspectable sources.",
            text: "Keep the answer and its context so we can return to the evidence before drawing a conclusion.",
          },
          {
            title: "Human review.",
            text: "Interpret nuance, make limits explicit and agree on what is worth reviewing.",
          },
        ],
      },
      method: {
        eyebrow: "How we work",
        title: "A method for clearer conversations.",
        items: [
          {
            title: "Ask a good question.",
            text: "Start with the brand's goals and context to define what to observe and under which conditions.",
          },
          {
            title: "Keep the evidence.",
            text: "Read answers alongside their sources and distinguish observations from what still needs checking.",
          },
          {
            title: "Decide with your team.",
            text: "Turn the reading into shared priorities and make the scope and next step explicit.",
          },
        ],
      },
    },
  },
  "pt-br": {
    brands: {
      example: {
        label: "Exemplo ilustrativo",
        question: "Qual software ajuda a coordenar uma equipe de design?",
        answer:
          "Sua marca reúne briefs e comentários para coordenar o trabalho de design.",
        source: "Briefs, comentários e revisões por projeto, em um só lugar.",
        sourcePath: "sua-marca.example/equipe",
        annotation:
          "A fonte menciona revisões. A resposta do exemplo não fala delas.",
        note: "Esquema ilustrativo: não é uma medição nem uma resposta real de um provedor.",
      },
      reading: {
        eyebrow: "Da análise à ação",
        title: "De uma resposta a uma decisão.",
        intro:
          "Uma menção abre perguntas. Voltar à resposta e às suas fontes ajuda a decidir o que merece atenção.",
        items: [
          {
            title: "O que perguntam",
            text: "Partimos da sua categoria, das decisões que você quer entender e das perguntas que vale a pena investigar.",
          },
          {
            title: "O que aparece",
            text: "Lemos como a marca é mencionada, quais informações são incluídas e quais fontes acompanham a resposta.",
          },
          {
            title: "O que priorizar",
            text: "Conectamos cada observação à sua evidência e combinamos o que revisar, sem confundir uma amostra com uma conclusão geral.",
          },
        ],
      },
      products: {
        eyebrow: "Soluções KAIRUM",
        title: "Escolha o escopo da leitura.",
        intro:
          "Diferentes formas de passar de uma pergunta ao próximo passo, com o escopo de cada produto à vista.",
      },
      reportName: "AI Report",
    },
    agencies: {
      example: {
        label: "Entrega ilustrativa",
        brand: "KAIRUM",
        title: "Uma leitura\npara compartilhar.",
        items: [
          {
            title: "Pergunta",
            text: "Como o trabalho de design da marca é explicado?",
          },
          {
            title: "Evidência",
            text: "A página do exemplo fala de briefs, comentários e revisões por projeto.",
          },
          {
            title: "Prioridade para revisar",
            text: "Conferir como essa capacidade é apresentada e combinar quais perguntas investigar.",
          },
        ],
        note: "Exemplo de um projeto de design. O escopo e as entregas são combinados com cada cliente; não representa um resultado medido.",
      },
      workflow: {
        eyebrow: "Processo",
        title: "Do brief à entrega.",
        intro:
          "Um percurso para combinar o que observar, revisar as evidências e preparar a próxima conversa com seu cliente.",
        items: [
          {
            title: "Brief",
            text: "Uma marca, sua categoria e uma pergunta de negócio. O escopo é definido antes da observação.",
          },
          {
            title: "Diagnóstico",
            text: "Uma leitura de respostas e fontes dentro das condições combinadas.",
          },
          {
            title: "Revisão",
            text: "Os achados, os limites e as perguntas em aberto são discutidos com sua agência.",
          },
          {
            title: "Entrega",
            text: "Uma leitura para compartilhar com o cliente e conversar sobre o próximo passo.",
          },
        ],
      },
      roles: {
        eyebrow: "Papéis",
        title: "O critério continua com sua equipe.",
        intro:
          "A KAIRUM contribui com uma leitura documentada. Sua agência traz o contexto do cliente e a direção do trabalho.",
        partners: [
          {
            title: "KAIRUM",
            intro: "A base para uma conversa com evidências.",
            items: [
              {
                title: "Perguntas",
                text: "Organizar as perguntas e as condições que delimitam a observação.",
              },
              {
                title: "Evidências",
                text: "Reunir respostas e fontes para que cada observação possa ser revisada.",
              },
              {
                title: "Diagnóstico",
                text: "Preparar uma leitura de achados, limites e prioridades para conversar.",
              },
            ],
          },
          {
            title: "Sua agência",
            intro: "O critério para transformar a leitura em um plano.",
            items: [
              {
                title: "Estratégia",
                text: "Definir quais decisões importam para a marca e sua categoria.",
              },
              {
                title: "Contexto do cliente",
                text: "Contribuir com o conhecimento do negócio, dos públicos e dos objetivos.",
              },
              {
                title: "Revisão",
                text: "Interpretar os achados com o cliente e combinar o que merece atenção.",
              },
              {
                title: "Próximos passos",
                text: "Decidir o escopo do trabalho posterior e a forma de acompanhá-lo.",
              },
            ],
          },
        ],
      },
    },
    about: {
      highlight: "evidências.",
      convictionLabel: "Nossa convicção",
      conviction:
        "Uma resposta não basta. É preciso poder ver de onde ela vem.",
      why: {
        eyebrow: "Por que a KAIRUM existe",
        title: "Uma perspectiva que possa ser revisada.",
        intro:
          "Queremos que a conversa sobre a presença de uma marca na IA comece com perguntas claras. Que cada observação mantenha sua fonte e que os próximos passos respondam ao contexto da equipe.",
        items: [
          {
            title: "Perguntas mais claras.",
            text: "Relacionar o que investigamos à categoria, aos públicos e a uma decisão concreta.",
          },
          {
            title: "Fontes que podem ser inspecionadas.",
            text: "Manter a resposta e seu contexto para voltar às evidências antes de concluir.",
          },
          {
            title: "Revisão humana.",
            text: "Interpretar nuances, explicitar os limites e combinar o que vale a pena revisar.",
          },
        ],
      },
      method: {
        eyebrow: "Como trabalhamos",
        title: "Um método para conversar com clareza.",
        items: [
          {
            title: "Fazer uma boa pergunta.",
            text: "Partir dos objetivos e do contexto da marca para definir o que observar e sob quais condições.",
          },
          {
            title: "Manter as evidências.",
            text: "Ler as respostas com suas fontes e distinguir o observado do que ainda precisa ser conferido.",
          },
          {
            title: "Decidir com sua equipe.",
            text: "Transformar a leitura em prioridades compartilhadas e explicitar o escopo e o próximo passo.",
          },
        ],
      },
    },
  },
};

export function audienceCopy(locale: Locale): AudienceCopy {
  const t = translator(locale);
  return {
    ...dictionaries[locale],
    book: t("agendar_una_conversacion"),
    guideAction: editorialCopy(locale).ui.guideAction,
    heroes: {
      marcas: {
        eyebrow: t("para_marcas"),
        title: t("tu_marca_cambia_las_respuestas_tambien"),
        intro: t("un_punto_de_partida_para_entender_como_aparece_tu_marca"),
      },
      agencias: {
        eyebrow: t("para_agencias"),
        title: t("una_mejor_conversacion_con_cada_marca"),
        intro: t("preguntas_claras_evidencia_a_mano_y_un_alcance_de_trabajo"),
      },
      nosotros: {
        eyebrow: t("sobre_kairum"),
        title: t("preguntar_mejor_decidir_con_evidencia"),
        intro: t(
          "construimos_una_forma_de_entender_la_presencia_de_las_marcas",
        ),
      },
    },
  };
}
