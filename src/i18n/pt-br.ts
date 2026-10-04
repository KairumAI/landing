import type { Dictionary } from "./types";

export const ptBr: Dictionary = {
  meta: {
    siteName: "KAIRUM",
    title: "KAIRUM · Visibilidade de marca em IA",
    description:
      "Explore a visibilidade de marca em IA: veja respostas, fontes e revisão humana reunidas pela KAIRUM em um relatório para orientar as decisões da sua equipe.",
    ogImageAlt: "KAIRUM. Uma pergunta. Todo um mapa de oportunidades.",
  },
  skipLink: "Ir para o conteúdo",
  book: { label: "Fale conosco", newTab: "(abre em uma nova aba)" },
  header: {
    brandLabel: "KAIRUM, início",
    navLabel: "Principal",
    how: "Como funciona",
    who: "Para quem",
    report: "O relatório",
    faq: "Perguntas frequentes",
    mobileLabel: "Menu móvel",
  },
  hero: {
    eyebrow: "VISIBILIDADE DE MARCA EM IA",
    titleFirst: "Uma pergunta.",
    titleSecond: "Todo um mapa de ",
    titleHighlight: "oportunidades.",
    intro:
      "Entenda como a IA descreve sua marca, quais fontes cita e o que vale revisar. KAIRUM conecta as respostas às decisões da sua equipe.",
    how: "Veja como funciona",
    proof: ["Veja as respostas", "Siga as fontes", "Decida o que vem"],
    visualLabel: "Demonstração animada de uma pergunta e suas respostas",
    providerNames: ["OpenAI API", "Gemini API", "Claude API"],
    console: "Uma pergunta, mais contexto.",
    initialStatus: "Preparando pergunta",
    exampleLabel: "Exemplo ilustrativo",
    screenReaderAnswer:
      "Exemplo fictício: Norte aparece pelo controle de estoque, mas suas integrações ainda precisam ser verificadas.",
    sourcesLabel: "Fontes desta resposta",
    sourceDomains: ["norte.example", "sector.example"],
    resultTitle: "Aparece pelo controle de estoque.",
    resultDetail: "Integrações ainda por verificar.",
    nextStepLabel: "Seu próximo passo",
    nextStep: "Esclarecer as integrações no site",
    demoNote: "Norte · Marca fictícia do exemplo",
    replayLabel: "Repetir demonstração",
    replay: "Repetir",
  },
  context: {
    title: ["A decisão pode começar", "bem antes do seu site."],
    intro:
      "Alguém pergunta. A IA compara, descreve e recomenda. KAIRUM ajuda você a ver o lugar da sua marca nessa conversa.",
    questionsLabel: "Exemplos de perguntas sobre uma categoria",
    questions: [
      "Qual opção escolher?",
      "Qual a diferença?",
      "Que marca você indica?",
      "Onde posso saber mais?",
    ],
  },
  journey: {
    eyebrow: "A JORNADA",
    title: ["Veja o que acontece", "depois da pergunta."],
    intro: [
      "Uma pergunta vira respostas,",
      "fontes e uma análise para decidir.",
    ],
    navLabel: "Etapas da jornada",
    steps: ["Pergunta", "Modelos", "Padrões", "Revisão", "Relatório"],
    caseLabel: "Norte · Software de estoque · Marca fictícia",
    question: ["Qual software de estoque", "é melhor para PMEs?"],
    options: ["Estoque", "PMEs", "Integrações"],
    questionNote: "O contexto da pergunta muda o que podemos aprender.",
    networkQuery: ["Uma pergunta", "Estoque para PMEs."],
    networkNotes: [
      "Analisando uma resposta",
      "Outra perspectiva",
      "Seu próprio jeito de responder",
    ],
    networkNote:
      "Uma pergunta passa por diferentes modelos. Cada resposta pode variar.",
    exampleAnswers: [
      "Para controlar o estoque em tempo real, Norte é uma alternativa. Veja se oferece as integrações de que sua equipe precisa.",
      "Norte apresenta recursos de estoque para pequenas empresas. Não há informação suficiente sobre suas integrações para escolher.",
      "Compare o controle de estoque e as integrações de Norte com sua operação antes de decidir.",
    ],
    answerSources: ["norte.example", "sector.example", "guia.example"],
    answersNote:
      "Um padrão nas respostas: o estoque está claro; as integrações geram dúvidas.",
    responseLabel: "RESPOSTA",
    evidenceAnswer: [
      "“",
      " permite controlar o estoque, mas vale verificar as integrações.”",
    ],
    evidenceSource: "norte.example / producto",
    evidenceTitle: "O que diz a fonte.",
    evidenceExcerpt: [
      "Norte permite ",
      "ver o estoque em tempo real e registrar movimentações",
      " em uma só plataforma.",
    ],
    reviewChip: "Revisão humana: a fonte não confirma integrações.",
    evidenceNote:
      "Ligamos a resposta à fonte e verificamos o que ela realmente sustenta.",
    reportOrbit: ["Padrão detectado", "Fonte revisada", "Próximos passos"],
    exampleLabel: "Exemplo ilustrativo",
    reportTitle: ["Uma análise clara.", "Para a próxima decisão."],
    foundLabel: "O que encontramos",
    found:
      "Norte aparece pelo controle de estoque. As integrações deixam uma dúvida em aberto.",
    reviewLabel: "O que vale revisar",
    review: "Explicar as integrações disponíveis no site.",
    reportNote:
      "A jornada termina em algo que sua equipe pode discutir e usar.",
    scrollHint: "Role a página ou escolha uma etapa",
    fictionalCase: "Caso fictício: Norte",
  },
  answers: {
    eyebrow: "OUTRAS PERSPECTIVAS",
    title: ["Uma só pergunta.", "Diferentes formas", "de falar da sua marca."],
    intro:
      "A menção é só uma parte. Importam as palavras, as alternativas e o contexto em que sua marca aparece.",
    selectLabel: "Selecionar resposta de exemplo",
    providerButtons: ["OpenAI API", "Gemini", "Claude"],
    apiNote: "Respostas ilustrativas de modelos via API.",
    exampleLabel: "Exemplo ilustrativo",
    changeLabel: "O que muda",
  },
  patterns: {
    eyebrow: "O MAPA DAS CONVERSAS",
    title: ["O lugar muda", "com a pergunta."],
    intro: [
      "Explorar uma categoria, comparar alternativas",
      "e escolher uma solução são conversas distintas.",
    ],
    controlsLabel: "Mudar intenção das perguntas",
    intents: ["Explorar", "Comparar", "Escolher"],
    exampleLabel: "Exemplo ilustrativo",
    focusLabel: "A PERGUNTA MUDA O FOCO",
    matrixLabel: "Matriz ilustrativa de conversas por modelo",
    conversationLabel: "Conversa",
  },
  sources: {
    followLabel: "Siga as evidências",
    exampleLabel: "Exemplo ilustrativo",
    selectLabel: "Selecionar fonte de exemplo",
    tabs: ["Site da marca", "Guia da categoria"],
    reviewTitle: "Um segundo olhar.",
    eyebrow: "FONTES + REVISÃO HUMANA",
    title: ["Da resposta", "à fonte.", "Sem perder o fio."],
    intro:
      "Uma citação pode existir, mas dizer outra coisa. Olhamos a resposta em seu contexto e verificamos o que as fontes disponíveis sustentam. Quando falta evidência, a dúvida fica clara.",
    benefits: [
      "A resposta, em seu contexto.",
      "A fonte, à vista.",
      "A análise, revisada.",
    ],
  },
  audience: {
    eyebrow: "PARA QUEM MOVE A MARCA",
    title: ["A mesma evidência.", "Sua próxima decisão."],
    intro: [
      "Marketing, conteúdo e agências.",
      "Perguntas distintas, uma análise compartilhada.",
    ],
    controlsLabel: "Veja como sua equipe pode usar KAIRUM",
    buttons: {
      marca: {
        title: "Marketing e marca",
        detail: "Entender como descrevem você.",
      },
      contenido: { title: "Conteúdo e SEO", detail: "Decidir o que revisar." },
      agencias: { title: "Agências", detail: "Levar evidências à conversa." },
    },
    teamLabel: "PARA SUA EQUIPE",
    reportLink: "Veja como isso vira um relatório",
  },
  report: {
    eyebrow: "A ENTREGA",
    title: ["Um relatório.", "Com evidências.", "E próximos passos."],
    intro:
      "As perguntas definidas, as respostas observadas e as fontes disponíveis. Tudo conectado a uma análise humana para saber o que revisar primeiro.",
    optionsLabel: "Módulos do relatório ilustrativo",
    options: {
      menciones: "Menções",
      fuentes: "Fontes",
      prioridades: "Próximos passos",
    },
    openLabel: "Abra o relatório de exemplo",
    note: "Explore os módulos. O exemplo traz a pergunta, as evidências e os critérios por trás de cada análise.",
    exampleLabel: "Exemplo ilustrativo",
    paperTitle: ["Norte.", "Em contexto."],
    paperSubtitle: "Caso fictício · Software de estoque",
    paperFoot: "PERGUNTAR · ENTENDER · DECIDIR",
  },
  reportDialog: {
    title: "KAIRUM · Relatório ilustrativo",
    closeLabel: "Fechar relatório",
    heading: "Norte, em contexto.",
    intro:
      "Visão ilustrativa do relatório. O conteúdo mostra como uma análise é organizada, sem representar resultados de uma marca real.",
    questionLabel: "A PERGUNTA",
    question: "Qual software de estoque é melhor para PMEs?",
    caseLabel: "Norte · Marca fictícia · Software de estoque",
    evidenceSummary: "Ver a resposta e sua fonte",
    answerLabel: "RESPOSTA ILUSTRATIVA · OPENAI API",
    answer:
      "Para controlar o estoque em tempo real, Norte é uma alternativa. Veja se oferece as integrações de que sua equipe precisa.",
    sourceLabel: "FONTE FICTÍCIA · NORTE.EXAMPLE / PRODUCTO",
    source:
      "Norte permite ver o estoque em tempo real e registrar movimentações em uma só plataforma.",
    review:
      "Análise do exemplo: a fonte descreve o estoque; as integrações seguem sem confirmação.",
  },
  faq: {
    eyebrow: "ANTES DE COMEÇAR",
    title: ["Boas perguntas.", "Respostas claras."],
    items: [
      {
        question: "Isso substitui o SEO?",
        answer:
          "Não, complementa. Aqui vemos como sua marca aparece nas respostas de IA, quais fontes são citadas e em que contexto.",
      },
      {
        question: "Os modelos respondem sempre igual?",
        answer:
          "Não. As respostas podem mudar conforme a pergunta, o contexto, o modelo e o momento. Por isso, vale guardar o que foi observado e analisar as diferenças.",
      },
      {
        question: "O que minha equipe recebe?",
        answer:
          "Um relatório com as perguntas definidas, as respostas observadas, as fontes disponíveis e uma análise revisada. Traz pontos a verificar e próximos passos para sua equipe. Você pode explorar um exemplo na seção do relatório.",
      },
      {
        question: "Do que precisamos para começar?",
        answer:
          "O site da sua marca, sua categoria e uma questão de negócio que você queira entender. Na primeira conversa, alinhamos o contexto e definimos o que faz sentido analisar. O escopo é combinado antes de começar.",
      },
      {
        question: "Isso garante que a IA recomende minha marca?",
        answer:
          "Não. KAIRUM ajuda a entender as respostas observadas e a identificar informações que vale revisar. Os modelos e suas respostas mudam; melhorar seu conteúdo não garante uma recomendação.",
      },
    ],
  },
  contact: {
    eyebrow: "O PRÓXIMO PASSO COMEÇA COM VOCÊ.",
    title: ["Vamos fazer uma boa pergunta.", "Sobre sua marca."],
    intro: [
      "Traga seu site e uma pergunta que importa hoje.",
      "O primeiro passo é entender o que você quer resolver.",
    ],
    agendaLabel: "O que conversamos na primeira chamada",
    agenda: [
      {
        title: "Seu contexto.",
        detail: "A marca, a categoria e a decisão à sua frente.",
      },
      {
        title: "Um foco claro.",
        detail: "As perguntas que vale analisar e o escopo da análise.",
      },
      {
        title: "O próximo passo.",
        detail: "Como organizar uma análise útil para sua equipe.",
      },
    ],
  },
  footer: {
    brandLabel: "KAIRUM, início",
    motto: "Visibilidade. Contexto. Decisões.",
    languageLabel: "Idioma",
  },
  notFound: {
    title: "Página não encontrada · KAIRUM",
    brandLabel: "KAIRUM, voltar ao início",
    code: "ERRO 404",
    heading: "Não encontramos esta página.",
    intro: "O link pode ter mudado. Você pode voltar ao início.",
    navLabel: "Continuar navegando",
    homeLabel: "Voltar ao início",
  },
  client: {
    heroQuery: "Qual software de estoque é melhor para PMEs?",
    heroAnswer:
      "Para controlar o estoque em tempo real, Norte é uma opção a considerar. Antes de escolher, confira as integrações de que sua equipe precisa.",
    heroStatuses: {
      ready: "Análise pronta",
      sources: "Seguindo as fontes",
      reading: "Lendo respostas",
      preparing: "Preparando pergunta",
    },
    stageCaptions: [
      "Definimos uma pergunta relevante.",
      "Consultamos diferentes perspectivas.",
      "Detectamos um padrão: estoque claro, integrações pendentes.",
      "Revisão humana: a fonte não confirma integrações.",
      "Uma prioridade concreta: explicar as integrações no site.",
    ],
    motion: {
      pauseLabel: "Pausar todas as animações",
      resumeLabel: "Ativar animações",
      pause: "Pausar animação",
      resume: "Ativar animação",
      demoPauseLabel: "Pausar demonstração",
      demoResumeLabel: "Retomar demonstração",
      demoPause: "Pausar",
      demoResume: "Retomar",
    },
    menu: { open: "Abrir menu", close: "Fechar menu" },
    providerExamples: [
      {
        name: "OpenAI API",
        logo: "openai",
        answer:
          "“Para controlar o estoque em tempo real, Norte é uma alternativa. Veja se oferece as integrações de que sua equipe precisa.”",
        insight:
          "O estoque se destaca. As integrações ainda precisam ser verificadas.",
      },
      {
        name: "Gemini API",
        logo: "gemini",
        answer:
          "“Norte apresenta recursos de estoque para pequenas empresas. Não há informação suficiente sobre suas integrações para escolher.”",
        insight: "A falta de informação pesa mais perto da decisão.",
      },
      {
        name: "Claude API",
        logo: "claude",
        answer:
          "“Compare o controle de estoque e as integrações de Norte com sua operação antes de decidir.”",
        insight: "A resposta sugere comparar as integrações com sua operação.",
      },
    ],
    patterns: {
      explorar: {
        question: "Qual software de estoque é melhor para PMEs?",
        insight:
          "Neste exemplo fictício, Norte aparece em perguntas sobre controle de estoque. O lugar muda conforme a pergunta.",
        rows: [
          ["Estoque para PMEs", "mencion", "ausente", "mencion"],
          ["Alternativas de estoque", "mencion", "mencion", "ausente"],
          ["Estoque em tempo real", "mencion", "mencion", "mencion"],
          ["Conectar minha loja", "ausente", "mencion", "ausente"],
        ],
      },
      comparar: {
        question: "Como Norte se compara a outras opções?",
        insight:
          "As integrações entram na comparação. Saber que o produto controla o estoque já não basta.",
        rows: [
          ["Controle de estoque", "comparacion", "comparacion", "mencion"],
          ["Integrações", "mencion", "comparacion", "comparacion"],
          ["Informações publicadas", "comparacion", "mencion", "mencion"],
          ["Ideal para PMEs", "ausente", "comparacion", "comparacion"],
        ],
      },
      elegir: {
        question: "O que verificar antes de escolher?",
        insight:
          "Uma dúvida fica em aberto: quais integrações Norte oferece. Isso liga a análise a uma ação no site.",
        rows: [
          ["Recursos de estoque", "mencion", "comparacion", "mencion"],
          ["Integrações a verificar", "comparacion", "mencion", "comparacion"],
          ["Próximos passos", "mencion", "mencion", "ausente"],
          ["Onde saber mais", "mencion", "ausente", "mencion"],
        ],
      },
    },
    stateLabels: {
      mencion: "Menção",
      comparacion: "Comparação",
      ausente: "Sem menção",
    },
    sources: [
      {
        url: "norte.example / producto",
        title: "A fonte por trás da resposta.",
        excerpt: [
          "Norte permite ",
          "ver o estoque em tempo real e registrar movimentações",
          " em uma só plataforma. Uma solução de estoque para pequenas empresas.",
        ],
        review:
          "A fonte descreve o controle de estoque. Não confirma quais integrações estão disponíveis.",
        highlight: "controlar o estoque em tempo real",
        prefix: "Norte permite",
      },
      {
        url: "sector.example / guia",
        title: "Outro contexto. Outra análise.",
        excerpt: [
          "Antes de escolher um software de estoque, vale ",
          "verificar a conexão com sua loja e seu sistema de vendas",
          ". As necessidades variam conforme a operação.",
        ],
        review:
          "O guia dá contexto à categoria; não comprova resultados de uma marca.",
        highlight: "verificar as integrações",
        prefix: "Antes de escolher Norte, vale",
      },
    ],
    audienceReadings: {
      marca: {
        lens: "MENÇÕES + CONTEXTO",
        question: "O que dizem sobre sua marca?",
        reading:
          "Entenda quais atributos aparecem, quais ficam de fora e a que alternativas sua marca é associada.",
        action: "Revisar o posicionamento com respostas concretas.",
      },
      contenido: {
        lens: "FONTES + CONTEÚDO",
        question: "Que informação falta para escolher?",
        reading:
          "Siga as fontes e identifique o que vale esclarecer no seu site ou conteúdo para explicar melhor sua oferta.",
        action: "Priorizar uma revisão de conteúdo com evidências.",
      },
      agencias: {
        lens: "DESCOBERTAS + CONVERSA",
        question: "Como explicar isso ao seu cliente?",
        reading:
          "Troque uma captura isolada por uma análise com perguntas, fontes e próximos passos.",
        action: "Apresentar descobertas e combinar o que revisar primeiro.",
      },
    },
    modules: {
      menciones: {
        icon: "Quotes",
        title: "Como sua marca aparece",
        copy: "Norte aparece pelo controle de estoque para pequenas empresas. As respostas deixam dúvidas sobre integrações.",
      },
      fuentes: {
        icon: "Link",
        title: "O que sustenta cada resposta",
        copy: "O site descreve o estoque e as movimentações. A revisão não encontra integrações confirmadas no exemplo.",
      },
      prioridades: {
        icon: "CursorClick",
        title: "O que vale revisar",
        copy: "Explicar as integrações disponíveis no site e voltar a observar como os modelos respondem.",
      },
    },
  },
};
