import type { Locale } from "./locales";

interface Item {
  title: string;
  text: string;
}
interface AgentFlow {
  name: string;
  title: string;
  brief: string;
  source: string;
  output: string;
  documentTitle: string;
  lead: string;
  heading: string;
  body: string;
}
interface AgentsProductCopy {
  title: string;
  description: string;
  metaTitle: string;
  workspace: string;
  preview: string;
  paths: string;
  process: string;
  draft: string;
  pending: string;
  publicationAnswer: string;
  disclosure: string;
  stepNames: readonly [string, string, string, string];
  stepDetails: readonly [string, string, string, string];
  flows: readonly [AgentFlow, AgentFlow, AgentFlow];
  benefitsTitle: string;
  benefits: readonly Item[];
  chapters: readonly [Item, Item, Item];
  chapterLabels: readonly [string, string, string];
  templates: readonly Item[];
  explore: string;
  context: {
    title: string;
    label: string;
    voice: string;
    voiceText: string;
    facts: string;
    factsText: string;
    boundaries: string;
    boundariesText: string;
    sources: string;
    sourceNames: readonly [string, string, string];
    sourceDescriptions: readonly [string, string, string];
  };
  review: {
    title: string;
    proposed: string;
    original: string;
    before: string;
    after: string;
    changes: string;
    changesText: string;
    criteria: string;
    checks: readonly Item[];
    footnote: string;
    scopeTitle: string;
    scopeText: string;
  };
}

export const agentsProductCopy: Record<Locale, AgentsProductCopy> = {
  es: {
    title: "Tu equipo de contenido, con más capacidad.",
    description:
      "Convertí una oportunidad en un brief, un borrador o una mejora concreta. Agents conecta las preguntas de tu audiencia con el contexto de tu marca para que tu equipo pueda crear, revisar y decidir con claridad.",
    metaTitle: "Agents: creación y mejora de contenido con revisión | KAIRUM",
    workspace: "KAIRUM / Agents",
    preview: "Recorré el trabajo de Agents",
    paths: "Qué querés preparar",
    process: "Del contexto al borrador",
    draft: "Vista del contenido",
    pending: "Pendiente de revisión",
    publicationAnswer:
      "Cada propuesta requiere que tu equipo revise una versión concreta. El canal, el destino y los permisos se acuerdan antes de publicar; cuando ese paso no está definido, se entrega el borrador para revisión.",
    disclosure:
      "Vista ilustrativa del producto con contenido de KAIRUM. El alcance y la entrega se acuerdan con cada equipo.",
    stepNames: [
      "Definir el brief",
      "Reunir el contexto",
      "Preparar la propuesta",
      "Revisar la versión",
    ],
    stepDetails: [
      "Una pregunta concreta, una audiencia y un objetivo editorial. El brief define qué debe resolver el contenido.",
      "Las fuentes y los hechos aprobados de la marca sostienen el trabajo. Cada afirmación debe poder revisarse.",
      "El contenido toma forma como artículo, mejora o respuesta. La propuesta conserva el objetivo y las referencias.",
      "Tu equipo revisa el texto y sus cambios antes de decidir el siguiente paso. La publicación requiere un destino y permisos acordados.",
    ],
    flows: [
      {
        name: "Crear un artículo",
        title: "Guía de visibilidad en IA",
        brief:
          "Explicar cómo empezar a medir la presencia de una marca en respuestas de IA.",
        source: "Metodología y guía de KAIRUM",
        output: "Artículo con introducción, criterios y próximos pasos",
        documentTitle: "Cómo medir la visibilidad de tu marca en IA",
        lead: "El punto de partida es una pregunta que tu audiencia realmente podría hacer. La lectura combina las respuestas, las marcas mencionadas y las fuentes disponibles.",
        heading: "Definí qué querés observar",
        body: "Elegí una categoría y un conjunto de preguntas. Conservá el contexto de la observación y volvé a las respuestas antes de interpretar un cambio.",
      },
      {
        name: "Mejorar una página",
        title: "Página de Analytics",
        brief:
          "Explicar qué permite observar Analytics y para qué le sirve al equipo.",
        source: "Página pública de Analytics y metodología",
        output: "Propuesta de texto y diferencias para revisar",
        documentTitle: "Una descripción más clara de Analytics",
        lead: "Entendé dónde aparece tu marca, con qué alternativas se la compara y qué fuentes se citan en las respuestas analizadas.",
        heading: "De la señal a la decisión",
        body: "Relacioná cada lectura con su pregunta y su evidencia. Tu equipo puede revisar los temas que necesitan más contexto y decidir qué contenido trabajar.",
      },
      {
        name: "Preparar preguntas frecuentes",
        title: "Menciones, citas y visitas",
        brief:
          "Responder las dudas que aparecen al interpretar una lectura de visibilidad en IA.",
        source: "Guía de señales y metodología de KAIRUM",
        output: "Preguntas y respuestas con sus referencias",
        documentTitle: "¿Una mención es lo mismo que una visita?",
        lead: "Una mención indica que una marca aparece en una respuesta. Una cita señala una fuente enlazada. Una visita requiere que una persona llegue al sitio.",
        heading: "¿Qué conviene revisar primero?",
        body: "Leé la pregunta, la respuesta y los enlaces disponibles. Separar las señales ayuda a explicar qué se observó y qué falta medir.",
      },
    ],
    benefitsTitle: "Más contexto para crear. Más claridad para revisar.",
    benefits: [
      {
        title: "Una oportunidad concreta",
        text: "Partí de una pregunta, un hallazgo o una página que necesita más claridad. El contenido tiene un propósito antes de que empiece la escritura.",
      },
      {
        title: "El contexto de tu marca",
        text: "Hechos, fuentes y criterios de voz orientan la propuesta. Tu equipo tiene una referencia compartida para evaluar qué dice y cómo lo dice.",
      },
      {
        title: "Cambios a la vista",
        text: "Compará el texto actual con la propuesta y entendé qué se agregó o reformuló. Revisar una mejora resulta más claro cuando podés ver su alcance.",
      },
      {
        title: "Tu equipo decide",
        text: "El borrador llega a revisión con sus referencias. La versión, el destino y los permisos se acuerdan antes de avanzar con una publicación.",
      },
    ],
    chapterLabels: ["Elegí el trabajo", "Sumá contexto", "Revisá la propuesta"],
    chapters: [
      {
        title: "Un punto de partida para cada contenido.",
        text: "Una idea nueva, una página que necesita más desarrollo o una duda recurrente requieren trabajos distintos. Definí qué querés preparar y para quién. El brief organiza el enfoque, las fuentes necesarias y el resultado que tu equipo espera revisar.",
      },
      {
        title: "Tu marca tiene una voz. Y hechos que la sostienen.",
        text: "Una propuesta útil necesita conocer tu producto, tu audiencia y los límites de lo que podés afirmar. Brand Hub reúne el contexto que orienta el trabajo: documentos, mensajes y hechos aprobados para que cada borrador tenga una base compartida.",
      },
      {
        title: "Entendé cada cambio antes de avanzar.",
        text: "La propuesta es el comienzo de una revisión. Leé el original, contrastá la nueva versión y volvé a las fuentes. Tu equipo conserva el criterio sobre la precisión, la voz y el destino del contenido que representa a tu marca.",
      },
    ],
    templates: [
      {
        title: "Contenido nuevo",
        text: "Desarrollá un tema con una pregunta central, una estructura y fuentes que tu equipo pueda revisar.",
      },
      {
        title: "Mejora de contenido",
        text: "Trabajá sobre una página existente, aclarando su propuesta y haciendo visibles las diferencias entre versiones.",
      },
      {
        title: "Preguntas frecuentes",
        text: "Prepará respuestas directas a las dudas de tu audiencia, con el contexto necesario para sostener cada explicación.",
      },
    ],
    explore: "Ver recorrido",
    context: {
      title: "Contexto de KAIRUM",
      label: "Brand Hub",
      voice: "Voz y audiencia",
      voiceText:
        "Lenguaje claro para equipos de marketing y contenido. Explicar qué se observa y cómo se interpreta.",
      facts: "Hechos del producto",
      factsText:
        "Presencia, narrativas y fuentes son señales distintas. Cada lectura necesita su pregunta y su contexto.",
      boundaries: "Criterios editoriales",
      boundariesText:
        "Sostener las afirmaciones con evidencia y distinguir una observación de un resultado comercial.",
      sources: "Fuentes para este contenido",
      sourceNames: [
        "Metodología de KAIRUM",
        "Guía de visibilidad en IA",
        "Menciones, citas y visitas",
      ],
      sourceDescriptions: [
        "Alcance, condiciones de lectura y límites.",
        "Preguntas, evidencia y primeras decisiones.",
        "Qué representa cada señal y cómo leerla.",
      ],
    },
    review: {
      title: "Descripción de Analytics",
      proposed: "Propuesta",
      original: "Original",
      before:
        "Analytics ayuda a entender la presencia de tu marca en las respuestas de IA.",
      after:
        "Analytics conecta presencia, narrativas y fuentes para entender cómo aparece tu marca en las respuestas de IA. Revisá las preguntas, las alternativas mencionadas y las citas que sostienen cada lectura.",
      changes: "Qué cambia y por qué",
      changesText:
        "La propuesta especifica qué señales se observan y qué puede revisar el equipo. Sustituye una descripción general por una explicación del trabajo, sin prometer una mejora de posición.",
      criteria: "Criterios de revisión",
      checks: [
        {
          title: "Precisión",
          text: "¿El texto describe lo que el producto permite observar y conserva sus límites?",
        },
        {
          title: "Voz de marca",
          text: "¿Una persona de marketing puede entender la propuesta y explicar su valor?",
        },
        {
          title: "Fuentes y destino",
          text: "¿Las afirmaciones tienen respaldo y está acordado dónde se usará esta versión?",
        },
      ],
      footnote: "Una versión concreta para revisar con tu equipo.",
      scopeTitle: "De la revisión al siguiente paso.",
      scopeText:
        "Acordá el objetivo, las fuentes y quién revisa el contenido. La entrega se define según el canal y los permisos disponibles; el equipo aprueba la versión antes de una publicación.",
    },
  },
  en: {
    title: "Give your content team more capacity.",
    description:
      "Turn an opportunity into a brief, a draft or a specific improvement. Agents connects your audience’s questions with your brand context so your team can create, review and decide with clarity.",
    metaTitle: "Agents: content creation and improvement with review | KAIRUM",
    workspace: "KAIRUM / Agents",
    preview: "Explore the Agents workflow",
    paths: "What you want to prepare",
    process: "From context to draft",
    draft: "Content preview",
    pending: "Awaiting review",
    publicationAnswer:
      "Every proposal requires your team to review a specific version. The channel, destination and permissions are agreed before publishing; when that step is not defined, the draft is delivered for review.",
    disclosure:
      "Illustrative product view using KAIRUM content. Scope and delivery are agreed with each team.",
    stepNames: [
      "Define the brief",
      "Gather context",
      "Prepare the proposal",
      "Review the version",
    ],
    stepDetails: [
      "A specific question, an audience and an editorial goal. The brief defines what the content needs to answer.",
      "Approved sources and brand facts support the work. Every claim should be open to review.",
      "The content takes shape as an article, an improvement or an answer. The proposal preserves its goal and references.",
      "Your team reviews the text and changes before deciding what comes next. Publishing requires an agreed destination and permissions.",
    ],
    flows: [
      {
        name: "Create an article",
        title: "AI visibility guide",
        brief:
          "Explain how to start measuring a brand’s presence in AI responses.",
        source: "KAIRUM methodology and guide",
        output: "Article with an introduction, criteria and next steps",
        documentTitle: "How to measure your brand’s visibility in AI",
        lead: "Start with a question your audience might actually ask. The analysis combines responses, brand mentions and available sources.",
        heading: "Define what you want to observe",
        body: "Choose a category and a set of questions. Preserve the observation’s context and return to the responses before interpreting a change.",
      },
      {
        name: "Improve a page",
        title: "Analytics product page",
        brief:
          "Explain what Analytics helps observe and why it matters to the team.",
        source: "Public Analytics page and methodology",
        output: "Proposed copy and differences to review",
        documentTitle: "A clearer description of Analytics",
        lead: "Understand where your brand appears, which alternatives it is compared with and which sources are cited in the analyzed responses.",
        heading: "From signal to decision",
        body: "Connect each reading to its question and evidence. Your team can review topics that need more context and decide which content to work on.",
      },
      {
        name: "Prepare FAQs",
        title: "Mentions, citations and visits",
        brief: "Answer recurring questions about interpreting AI visibility.",
        source: "KAIRUM signal guide and methodology",
        output: "Questions and answers with references",
        documentTitle: "Is a mention the same as a visit?",
        lead: "A mention means a brand appears in a response. A citation points to a linked source. A visit requires a person to reach the website.",
        heading: "What should you review first?",
        body: "Read the question, response and available links. Separating these signals helps explain what was observed and what still needs to be measured.",
      },
    ],
    benefitsTitle: "More context to create. More clarity to review.",
    benefits: [
      {
        title: "A specific opportunity",
        text: "Start from a question, a finding or a page that needs more clarity. The content has a purpose before the writing begins.",
      },
      {
        title: "Your brand context",
        text: "Facts, sources and voice guidelines inform the proposal. Your team has a shared reference for assessing what it says and how it says it.",
      },
      {
        title: "Visible changes",
        text: "Compare the current text with the proposal and understand what was added or rephrased. Reviewing an improvement is clearer when its scope is visible.",
      },
      {
        title: "Your team decides",
        text: "The draft arrives for review with its references. The version, destination and permissions are agreed before moving ahead with publication.",
      },
    ],
    chapterLabels: ["Choose the work", "Add context", "Review the proposal"],
    chapters: [
      {
        title: "A starting point for every piece of content.",
        text: "A new idea, a page that needs more depth and a recurring question call for different work. Define what you want to prepare and for whom. The brief organizes the approach, required sources and the result your team expects to review.",
      },
      {
        title: "Your brand has a voice. And facts behind it.",
        text: "A useful proposal needs to understand your product, your audience and the limits of what you can claim. Brand Hub brings together the context that guides the work: approved documents, messages and facts that give each draft a shared foundation.",
      },
      {
        title: "Understand each change before moving ahead.",
        text: "The proposal starts a review. Read the original, compare the new version and return to the sources. Your team retains judgment over the accuracy, voice and destination of the content that represents your brand.",
      },
    ],
    templates: [
      {
        title: "New content",
        text: "Develop a topic around a central question, a structure and sources your team can review.",
      },
      {
        title: "Content improvement",
        text: "Work on an existing page, clarifying its purpose and making the differences between versions visible.",
      },
      {
        title: "Frequently asked questions",
        text: "Prepare direct answers to your audience’s questions, with enough context to support each explanation.",
      },
    ],
    explore: "Explore workflow",
    context: {
      title: "KAIRUM context",
      label: "Brand Hub",
      voice: "Voice and audience",
      voiceText:
        "Clear language for marketing and content teams. Explain what is observed and how to interpret it.",
      facts: "Product facts",
      factsText:
        "Presence, narratives and sources are different signals. Each reading needs its question and context.",
      boundaries: "Editorial criteria",
      boundariesText:
        "Support claims with evidence and distinguish an observation from a business result.",
      sources: "Sources for this content",
      sourceNames: [
        "KAIRUM methodology",
        "AI visibility guide",
        "Mentions, citations and visits",
      ],
      sourceDescriptions: [
        "Scope, reading conditions and limits.",
        "Questions, evidence and first decisions.",
        "What each signal represents and how to read it.",
      ],
    },
    review: {
      title: "Analytics description",
      proposed: "Proposal",
      original: "Original",
      before:
        "Analytics helps you understand your brand’s presence in AI responses.",
      after:
        "Analytics connects presence, narratives and sources to understand how your brand appears in AI responses. Review the questions, mentioned alternatives and citations behind each reading.",
      changes: "What changes and why",
      changesText:
        "The proposal names the signals being observed and what the team can review. It replaces a general description with an explanation of the work, without promising an improved position.",
      criteria: "Review criteria",
      checks: [
        {
          title: "Accuracy",
          text: "Does the text describe what the product helps observe and preserve its limits?",
        },
        {
          title: "Brand voice",
          text: "Can a marketer understand the proposal and explain its value?",
        },
        {
          title: "Sources and destination",
          text: "Are the claims supported and is the destination for this version agreed?",
        },
      ],
      footnote: "A specific version to review with your team.",
      scopeTitle: "From review to the next step.",
      scopeText:
        "Agree on the goal, sources and who reviews the content. Delivery depends on the channel and available permissions; the team approves the version before publication.",
    },
  },
  "pt-br": {
    title: "Mais capacidade para sua equipe de conteúdo.",
    description:
      "Transforme uma oportunidade em um briefing, um rascunho ou uma melhoria concreta. Agents conecta as perguntas do seu público ao contexto da sua marca para sua equipe criar, revisar e decidir com clareza.",
    metaTitle: "Agents: criação e melhoria de conteúdo com revisão | KAIRUM",
    workspace: "KAIRUM / Agents",
    preview: "Explore o trabalho de Agents",
    paths: "O que você quer preparar",
    process: "Do contexto ao rascunho",
    draft: "Prévia do conteúdo",
    pending: "Aguardando revisão",
    publicationAnswer:
      "Cada proposta exige que sua equipe revise uma versão concreta. O canal, o destino e as permissões são combinados antes de publicar; quando essa etapa não está definida, o rascunho é entregue para revisão.",
    disclosure:
      "Visão ilustrativa do produto com conteúdo da KAIRUM. O escopo e a entrega são combinados com cada equipe.",
    stepNames: [
      "Definir o briefing",
      "Reunir o contexto",
      "Preparar a proposta",
      "Revisar a versão",
    ],
    stepDetails: [
      "Uma pergunta concreta, um público e um objetivo editorial. O briefing define o que o conteúdo precisa responder.",
      "Fontes e fatos aprovados da marca sustentam o trabalho. Cada afirmação deve poder ser revisada.",
      "O conteúdo ganha forma como artigo, melhoria ou resposta. A proposta preserva seu objetivo e suas referências.",
      "Sua equipe revisa o texto e as mudanças antes de decidir o próximo passo. A publicação exige um destino e permissões combinados.",
    ],
    flows: [
      {
        name: "Criar um artigo",
        title: "Guia de visibilidade em IA",
        brief:
          "Explicar como começar a medir a presença de uma marca nas respostas de IA.",
        source: "Metodologia e guia da KAIRUM",
        output: "Artigo com introdução, critérios e próximos passos",
        documentTitle: "Como medir a visibilidade da sua marca na IA",
        lead: "O ponto de partida é uma pergunta que seu público realmente poderia fazer. A análise reúne as respostas, as marcas mencionadas e as fontes disponíveis.",
        heading: "Defina o que você quer observar",
        body: "Escolha uma categoria e um conjunto de perguntas. Preserve o contexto da observação e volte às respostas antes de interpretar uma mudança.",
      },
      {
        name: "Melhorar uma página",
        title: "Página de Analytics",
        brief:
          "Explicar o que Analytics permite observar e como ajuda a equipe.",
        source: "Página pública de Analytics e metodologia",
        output: "Proposta de texto e diferenças para revisar",
        documentTitle: "Uma descrição mais clara de Analytics",
        lead: "Entenda onde sua marca aparece, com quais alternativas é comparada e quais fontes são citadas nas respostas analisadas.",
        heading: "Do sinal à decisão",
        body: "Relacione cada leitura à sua pergunta e evidência. Sua equipe pode revisar os temas que precisam de mais contexto e decidir em qual conteúdo trabalhar.",
      },
      {
        name: "Preparar perguntas frequentes",
        title: "Menções, citações e visitas",
        brief:
          "Responder às dúvidas recorrentes ao interpretar a visibilidade em IA.",
        source: "Guia de sinais e metodologia da KAIRUM",
        output: "Perguntas e respostas com referências",
        documentTitle: "Uma menção é o mesmo que uma visita?",
        lead: "Uma menção indica que uma marca aparece em uma resposta. Uma citação aponta para uma fonte com link. Uma visita exige que uma pessoa chegue ao site.",
        heading: "O que revisar primeiro?",
        body: "Leia a pergunta, a resposta e os links disponíveis. Separar os sinais ajuda a explicar o que foi observado e o que ainda precisa ser medido.",
      },
    ],
    benefitsTitle: "Mais contexto para criar. Mais clareza para revisar.",
    benefits: [
      {
        title: "Uma oportunidade concreta",
        text: "Comece com uma pergunta, uma descoberta ou uma página que precisa de mais clareza. O conteúdo tem um propósito antes de a escrita começar.",
      },
      {
        title: "O contexto da sua marca",
        text: "Fatos, fontes e critérios de voz orientam a proposta. Sua equipe tem uma referência compartilhada para avaliar o que ela diz e como diz.",
      },
      {
        title: "Mudanças à vista",
        text: "Compare o texto atual com a proposta e entenda o que foi acrescentado ou reformulado. Revisar uma melhoria fica mais claro quando seu escopo está visível.",
      },
      {
        title: "Sua equipe decide",
        text: "O rascunho chega à revisão com suas referências. A versão, o destino e as permissões são combinados antes de avançar para uma publicação.",
      },
    ],
    chapterLabels: [
      "Escolha o trabalho",
      "Adicione contexto",
      "Revise a proposta",
    ],
    chapters: [
      {
        title: "Um ponto de partida para cada conteúdo.",
        text: "Uma ideia nova, uma página que precisa de mais profundidade e uma dúvida recorrente exigem trabalhos diferentes. Defina o que quer preparar e para quem. O briefing organiza a abordagem, as fontes necessárias e o resultado que sua equipe espera revisar.",
      },
      {
        title: "Sua marca tem uma voz. E fatos que a sustentam.",
        text: "Uma proposta útil precisa conhecer seu produto, seu público e os limites do que você pode afirmar. Brand Hub reúne o contexto que orienta o trabalho: documentos, mensagens e fatos aprovados que dão uma base compartilhada a cada rascunho.",
      },
      {
        title: "Entenda cada mudança antes de avançar.",
        text: "A proposta é o começo de uma revisão. Leia o original, compare a nova versão e volte às fontes. Sua equipe mantém o critério sobre a precisão, a voz e o destino do conteúdo que representa sua marca.",
      },
    ],
    templates: [
      {
        title: "Conteúdo novo",
        text: "Desenvolva um tema com uma pergunta central, uma estrutura e fontes que sua equipe possa revisar.",
      },
      {
        title: "Melhoria de conteúdo",
        text: "Trabalhe sobre uma página existente, esclarecendo sua proposta e tornando visíveis as diferenças entre versões.",
      },
      {
        title: "Perguntas frequentes",
        text: "Prepare respostas diretas às dúvidas do seu público, com o contexto necessário para sustentar cada explicação.",
      },
    ],
    explore: "Ver o percurso",
    context: {
      title: "Contexto da KAIRUM",
      label: "Brand Hub",
      voice: "Voz e público",
      voiceText:
        "Linguagem clara para equipes de marketing e conteúdo. Explicar o que é observado e como interpretar.",
      facts: "Fatos do produto",
      factsText:
        "Presença, narrativas e fontes são sinais diferentes. Cada leitura precisa de sua pergunta e contexto.",
      boundaries: "Critérios editoriais",
      boundariesText:
        "Sustentar afirmações com evidências e distinguir uma observação de um resultado comercial.",
      sources: "Fontes para este conteúdo",
      sourceNames: [
        "Metodologia da KAIRUM",
        "Guia de visibilidade em IA",
        "Menções, citações e visitas",
      ],
      sourceDescriptions: [
        "Escopo, condições de leitura e limites.",
        "Perguntas, evidências e primeiras decisões.",
        "O que cada sinal representa e como interpretá-lo.",
      ],
    },
    review: {
      title: "Descrição de Analytics",
      proposed: "Proposta",
      original: "Original",
      before:
        "Analytics ajuda a entender a presença da sua marca nas respostas de IA.",
      after:
        "Analytics conecta presença, narrativas e fontes para entender como sua marca aparece nas respostas de IA. Revise as perguntas, as alternativas mencionadas e as citações que sustentam cada leitura.",
      changes: "O que muda e por quê",
      changesText:
        "A proposta especifica quais sinais são observados e o que a equipe pode revisar. Substitui uma descrição geral por uma explicação do trabalho, sem prometer uma melhoria de posição.",
      criteria: "Critérios de revisão",
      checks: [
        {
          title: "Precisão",
          text: "O texto descreve o que o produto permite observar e preserva seus limites?",
        },
        {
          title: "Voz da marca",
          text: "Uma pessoa de marketing consegue entender a proposta e explicar seu valor?",
        },
        {
          title: "Fontes e destino",
          text: "As afirmações têm respaldo e está combinado onde esta versão será usada?",
        },
      ],
      footnote: "Uma versão concreta para revisar com sua equipe.",
      scopeTitle: "Da revisão ao próximo passo.",
      scopeText:
        "Combine o objetivo, as fontes e quem revisa o conteúdo. A entrega depende do canal e das permissões disponíveis; a equipe aprova a versão antes de uma publicação.",
    },
  },
};
