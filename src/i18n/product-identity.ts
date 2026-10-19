import type { Locale } from "./locales";

interface Intent {
  key: "discover" | "compare" | "choose";
  label: string;
  question: string;
  reading: string;
}
interface Route {
  label: string;
  title: string;
  steps: [string, string, string];
  source: string;
}
interface ProductIdentityCopy {
  prompt: {
    name: string;
    title: string;
    navigation: string;
    question: string;
    intent: string;
    reading: string;
    intents: Intent[];
  };
  traffic: {
    name: string;
    title: string;
    people: Route;
    crawlers: Route;
    distinction: string;
  };
}

export const productIdentityCopy: Record<Locale, ProductIdentityCopy> = {
  es: {
    prompt: {
      name: "Prompt Intelligence",
      title: "Tu mapa de preguntas",
      navigation: "Explorar preguntas por intención",
      question: "Pregunta de tu audiencia",
      intent: "Intención",
      reading: "Para investigar",
      intents: [
        {
          key: "discover",
          label: "Descubrir",
          question: "¿Cómo mejorar el proceso de diseño de mi equipo?",
          reading:
            "Qué problema necesita resolver y qué información busca antes de conocer una herramienta.",
        },
        {
          key: "compare",
          label: "Comparar",
          question: "¿Qué alternativas hay para coordinar un equipo de diseño?",
          reading:
            "Con qué opciones te compara y qué criterios usa para distinguirlas.",
        },
        {
          key: "choose",
          label: "Elegir",
          question: "¿Qué herramienta se adapta mejor a mi equipo?",
          reading:
            "Qué requisitos y evidencias necesita para tomar una decisión.",
        },
      ],
    },
    traffic: {
      name: "Traffic",
      title: "Dos señales. Dos recorridos.",
      people: {
        label: "Personas",
        title: "Visitas desde IA",
        steps: [
          "Respuesta con un enlace",
          "Una persona abre tu página",
          "Visita en tu sitio",
        ],
        source: "Fuente: analítica web",
      },
      crawlers: {
        label: "Rastreadores",
        title: "Solicitudes de contenido",
        steps: [
          "Un crawler encuentra tu URL",
          "Solicita una página al servidor",
          "Acceso en los logs",
        ],
        source: "Fuente: logs del servidor",
      },
      distinction: "Una solicitud no demuestra una cita ni una visita humana.",
    },
  },
  en: {
    prompt: {
      name: "Prompt Intelligence",
      title: "Your question map",
      navigation: "Explore questions by intent",
      question: "Your audience’s question",
      intent: "Intent",
      reading: "To investigate",
      intents: [
        {
          key: "discover",
          label: "Discover",
          question: "How can I improve my team’s design process?",
          reading:
            "The problem they need to solve and the information they seek before considering a tool.",
        },
        {
          key: "compare",
          label: "Compare",
          question: "What alternatives help coordinate a design team?",
          reading:
            "The options they compare you with and the criteria they use to tell them apart.",
        },
        {
          key: "choose",
          label: "Choose",
          question: "Which tool is the best fit for my team?",
          reading:
            "The requirements and evidence they need to make a decision.",
        },
      ],
    },
    traffic: {
      name: "Traffic",
      title: "Two signals. Two journeys.",
      people: {
        label: "People",
        title: "Visits from AI",
        steps: [
          "An answer contains a link",
          "A person opens your page",
          "A visit to your site",
        ],
        source: "Source: web analytics",
      },
      crawlers: {
        label: "Crawlers",
        title: "Content requests",
        steps: [
          "A crawler finds your URL",
          "Requests a page from the server",
          "Access recorded in logs",
        ],
        source: "Source: server logs",
      },
      distinction: "A request does not prove a citation or a human visit.",
    },
  },
  "pt-br": {
    prompt: {
      name: "Prompt Intelligence",
      title: "Seu mapa de perguntas",
      navigation: "Explorar perguntas por intenção",
      question: "Pergunta do seu público",
      intent: "Intenção",
      reading: "Para investigar",
      intents: [
        {
          key: "discover",
          label: "Descobrir",
          question: "Como melhorar o processo de design da minha equipe?",
          reading:
            "O problema que precisa resolver e as informações que procura antes de conhecer uma ferramenta.",
        },
        {
          key: "compare",
          label: "Comparar",
          question:
            "Quais alternativas ajudam a coordenar uma equipe de design?",
          reading:
            "Com quais opções compara sua marca e quais critérios usa para diferenciá-las.",
        },
        {
          key: "choose",
          label: "Escolher",
          question: "Qual ferramenta se adapta melhor à minha equipe?",
          reading:
            "Os requisitos e as evidências de que precisa para tomar uma decisão.",
        },
      ],
    },
    traffic: {
      name: "Traffic",
      title: "Dois sinais. Dois percursos.",
      people: {
        label: "Pessoas",
        title: "Visitas vindas da IA",
        steps: [
          "Uma resposta contém um link",
          "Uma pessoa abre sua página",
          "Visita ao seu site",
        ],
        source: "Fonte: análise de tráfego web",
      },
      crawlers: {
        label: "Rastreadores",
        title: "Solicitações de conteúdo",
        steps: [
          "Um crawler encontra sua URL",
          "Solicita uma página ao servidor",
          "Acesso registrado nos logs",
        ],
        source: "Fonte: logs do servidor",
      },
      distinction:
        "Uma solicitação não comprova uma citação nem uma visita humana.",
    },
  },
};
