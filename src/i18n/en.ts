import type { Dictionary } from "./types";

export const en: Dictionary = {
  meta: {
    siteName: "KAIRUM",
    title: "KAIRUM · AI Brand Visibility",
    description:
      "Understand AI brand visibility with KAIRUM. See what assistants say, which sources they cite and what a human-reviewed report helps you examine next.",
    ogImageAlt: "KAIRUM. One question. A whole map of opportunities.",
  },
  skipLink: "Skip to content",
  book: { label: "Book a call", newTab: "(opens in a new tab)" },
  header: {
    brandLabel: "KAIRUM, home",
    navLabel: "Main",
    how: "How it works",
    who: "For teams",
    report: "The report",
    faq: "FAQs",
    mobileLabel: "Mobile menu",
  },
  hero: {
    eyebrow: "AI BRAND VISIBILITY",
    titleFirst: "One question.",
    titleSecond: "A whole map of ",
    titleHighlight: "opportunities.",
    intro:
      "See how AI describes your brand, which sources it cites and what information needs a closer look. KAIRUM connects answers to decisions for your team.",
    how: "See how it works",
    proof: ["See the answers", "Trace the sources", "Decide next"],
    visualLabel: "Animated demo of a question and its answers",
    providerNames: ["OpenAI API", "Gemini API", "Claude API"],
    console: "One question, more context.",
    initialStatus: "Preparing question",
    exampleLabel: "Illustrative case",
    screenReaderAnswer:
      "Fictional example: Norte appears for stock control, but its integrations still need checking.",
    sourcesLabel: "Sources for this answer",
    sourceDomains: ["norte.example", "sector.example"],
    resultTitle: "Appears for stock control.",
    resultDetail: "Integrations need checking.",
    nextStepLabel: "Your next step",
    nextStep: "Clarify integrations on your site",
    demoNote: "Norte · Fictional example brand",
    replayLabel: "Replay demo",
    replay: "Replay",
  },
  context: {
    title: ["The decision may start", "long before your site."],
    intro:
      "Someone asks. AI compares, describes and recommends. KAIRUM helps you see where your brand fits in that conversation.",
    questionsLabel: "Example questions about a category",
    questions: [
      "Which one fits?",
      "How do they differ?",
      "Which brand should I pick?",
      "Where can I learn more?",
    ],
  },
  journey: {
    eyebrow: "THE JOURNEY",
    title: ["See what happens", "after the question."],
    intro: [
      "One question becomes answers,",
      "sources and insight to guide a decision.",
    ],
    navLabel: "Journey stages",
    steps: ["Question", "Models", "Patterns", "Review", "Report"],
    caseLabel: "Norte · Inventory software · Fictional brand",
    question: ["Which inventory software", "works for a small business?"],
    options: ["Inventory", "SMBs", "Integrations"],
    questionNote: "The question's context changes what we can learn.",
    networkQuery: ["One question", "Inventory for SMBs."],
    networkNotes: [
      "Exploring one answer",
      "Another perspective",
      "Its own way of answering",
    ],
    networkNote:
      "One question goes to different models. Each answer may differ.",
    exampleAnswers: [
      "For real-time stock control, Norte is one option. Check whether it has the integrations your team needs.",
      "Norte offers inventory features for small businesses. There isn't enough information about its integrations to decide.",
      "Compare Norte's stock control and integrations with your needs before deciding.",
    ],
    answerSources: ["norte.example", "sector.example", "guia.example"],
    answersNote:
      "A pattern in the answers: stock control is clear; integrations raise questions.",
    responseLabel: "ANSWER",
    evidenceAnswer: [
      "“",
      " offers stock control, but its integrations need checking.”",
    ],
    evidenceSource: "norte.example / producto",
    evidenceTitle: "What the source says.",
    evidenceExcerpt: [
      "Norte lets you ",
      "view stock in real time and record movements",
      " on one platform.",
    ],
    reviewChip: "Human review: the source doesn't confirm integrations.",
    evidenceNote:
      "We connect the answer to its source and review what it actually supports.",
    reportOrbit: ["Pattern found", "Source reviewed", "Next steps"],
    exampleLabel: "Illustrative case",
    reportTitle: ["A clear picture.", "For your next decision."],
    foundLabel: "What we found",
    found:
      "Norte appears for stock control. Its integrations remain an open question.",
    reviewLabel: "What to review",
    review: "Explain the available integrations on your site.",
    reportNote:
      "The journey ends with something your team can discuss and use.",
    scrollHint: "Scroll or choose a stage",
    fictionalCase: "Fictional case: Norte",
  },
  answers: {
    eyebrow: "DIFFERENT PERSPECTIVES",
    title: ["The same question.", "Different ways", "to describe your brand."],
    intro:
      "A mention is only part of the picture. The words, alternatives and context in which you appear matter too.",
    selectLabel: "Choose an example answer",
    providerButtons: ["OpenAI API", "Gemini", "Claude"],
    apiNote: "Illustrative answers from models via API.",
    exampleLabel: "Illustrative case",
    changeLabel: "What changes",
  },
  patterns: {
    eyebrow: "THE CONVERSATION MAP",
    title: ["Your place changes", "with the question."],
    intro: [
      "Exploring a category, comparing options",
      "and choosing a solution are different conversations.",
    ],
    controlsLabel: "Change question intent",
    intents: ["Explore", "Compare", "Choose"],
    exampleLabel: "Illustrative case",
    focusLabel: "THE QUESTION SHIFTS FOCUS",
    matrixLabel: "Illustrative matrix of conversations by model",
    conversationLabel: "Conversation",
  },
  sources: {
    followLabel: "Trace the evidence",
    exampleLabel: "Illustrative case",
    selectLabel: "Choose an example source",
    tabs: ["Brand site", "Category guide"],
    reviewTitle: "A second look.",
    eyebrow: "SOURCES + HUMAN REVIEW",
    title: ["From the answer", "to the source.", "Follow the thread."],
    intro:
      "A citation can be present yet say something else. We read each answer in context and check what the available sources support. When evidence is missing, the gap stays visible.",
    benefits: [
      "The answer, in context.",
      "The source, in view.",
      "The interpretation, reviewed.",
    ],
  },
  audience: {
    eyebrow: "FOR TEAMS BEHIND YOUR BRAND",
    title: ["The same evidence.", "Your next decision."],
    intro: [
      "Marketing, content and agencies.",
      "Different questions, one shared view.",
    ],
    controlsLabel: "Explore how your team can use KAIRUM",
    buttons: {
      marca: {
        title: "Brand & marketing",
        detail: "See how you're described.",
      },
      contenido: { title: "Content & SEO", detail: "Decide what to review." },
      agencias: { title: "Agencies", detail: "Bring evidence to the table." },
    },
    teamLabel: "FOR YOUR TEAM",
    reportLink: "See how it becomes a report",
  },
  report: {
    eyebrow: "THE DELIVERABLE",
    title: ["A report.", "With evidence.", "And next steps."],
    intro:
      "The agreed questions, observed answers and available sources. All connected by human review to show you what to examine first.",
    optionsLabel: "Illustrative report sections",
    options: {
      menciones: "Mentions",
      fuentes: "Sources",
      prioridades: "Next steps",
    },
    openLabel: "Open the example report",
    note: "Explore the sections. The example includes the question, evidence and reasoning behind each finding.",
    exampleLabel: "Illustrative case",
    paperTitle: ["Norte.", "In context."],
    paperSubtitle: "Fictional case · Inventory software",
    paperFoot: "ASK · UNDERSTAND · DECIDE",
  },
  reportDialog: {
    title: "KAIRUM · Illustrative report",
    closeLabel: "Close report",
    heading: "Norte, in context.",
    intro:
      "An illustrative report view. It shows how findings are organized, not results from a real brand.",
    questionLabel: "THE QUESTION",
    question: "Which inventory software works for a small business?",
    caseLabel: "Norte · Fictional brand · Inventory software",
    evidenceSummary: "See the answer and its source",
    answerLabel: "ILLUSTRATIVE ANSWER · OpenAI API",
    answer:
      "For real-time stock control, Norte is one option. Check whether it has the integrations your team needs.",
    sourceLabel: "FICTIONAL SOURCE · NORTE.EXAMPLE / PRODUCTO",
    source:
      "Norte lets you view stock in real time and record movements on one platform.",
    review:
      "Example finding: the source describes stock control; integrations remain unconfirmed.",
  },
  faq: {
    eyebrow: "BEFORE YOU START",
    title: ["Good questions.", "Clear answers."],
    items: [
      {
        question: "Does this replace SEO?",
        answer:
          "No, it complements SEO. We look at how your brand appears in AI answers, which sources are cited and the context around each mention.",
      },
      {
        question: "Do models always give the same answer?",
        answer:
          "No. Answers can change with the question, context, model and time. That's why we keep what we observed and review the differences.",
      },
      {
        question: "What does my team receive?",
        answer:
          "A report with the agreed questions, observed answers, available sources and human-reviewed analysis. It includes points to verify and next steps for your team. You can explore an example in the report section.",
      },
      {
        question: "What do we need to get started?",
        answer:
          "Your brand's site, your category and a business question you want to understand. On our first call, we'll discuss your context and define what makes sense to examine. We agree on the scope before we begin.",
      },
      {
        question: "Does this guarantee AI will recommend my brand?",
        answer:
          "No. KAIRUM helps you understand observed answers and spot information worth reviewing. Models and their answers change; improving your content does not guarantee a recommendation.",
      },
    ],
  },
  contact: {
    eyebrow: "YOUR NEXT STEP STARTS WITH YOU.",
    title: ["Let's ask a good question.", "About your brand."],
    intro: [
      "Bring your site and a question that matters today.",
      "First, let's understand what you need to solve.",
    ],
    agendaLabel: "What we discuss on the first call",
    agenda: [
      {
        title: "Your context.",
        detail: "Your brand, category and the decision ahead.",
      },
      {
        title: "A clear focus.",
        detail: "Questions worth asking and the scope of the analysis.",
      },
      {
        title: "The next step.",
        detail: "How to shape findings your team can use.",
      },
    ],
  },
  footer: {
    brandLabel: "KAIRUM, home",
    motto: "Visibility. Context. Decisions.",
    languageLabel: "Language",
  },
  notFound: {
    title: "Page not found · KAIRUM",
    brandLabel: "KAIRUM, back to home",
    code: "ERROR 404",
    heading: "We couldn't find this page.",
    intro: "The link may have changed. You can go back to the home page.",
    navLabel: "Continue browsing",
    homeLabel: "Back to home",
  },
  client: {
    heroQuery: "Which inventory software works for a small business?",
    heroAnswer:
      "For real-time stock control, Norte is an option to consider. Before choosing, check the integrations your team needs.",
    heroStatuses: {
      ready: "Analysis ready",
      sources: "Tracing sources",
      reading: "Reading answers",
      preparing: "Preparing question",
    },
    stageCaptions: [
      "We define a relevant question.",
      "We ask different models.",
      "We spot a pattern: clear stock control, unclear integrations.",
      "Human review: the source doesn't confirm integrations.",
      "One clear priority: explain integrations on your site.",
    ],
    motion: {
      pauseLabel: "Pause all animations",
      resumeLabel: "Resume animations",
      pause: "Pause motion",
      resume: "Resume motion",
      demoPauseLabel: "Pause demo",
      demoResumeLabel: "Resume demo",
      demoPause: "Pause",
      demoResume: "Resume",
    },
    menu: { open: "Open menu", close: "Close menu" },
    providerExamples: [
      {
        name: "OpenAI API",
        logo: "openai",
        answer:
          "“For real-time stock control, Norte is one option. Check whether it has the integrations your team needs.”",
        insight: "Stock control stands out. Integrations need checking.",
      },
      {
        name: "Gemini API",
        logo: "gemini",
        answer:
          "“Norte offers inventory features for small businesses. There isn't enough information about its integrations to decide.”",
        insight: "Missing details matter more as the decision gets closer.",
      },
      {
        name: "Claude API",
        logo: "claude",
        answer:
          "“Compare Norte's stock control and integrations with your needs before deciding.”",
        insight: "The answer calls for comparing integrations with your needs.",
      },
    ],
    patterns: {
      explorar: {
        question: "Which inventory software works for a small business?",
        insight:
          "In this fictional example, Norte appears in questions about stock control. Its place changes with the question.",
        rows: [
          ["Inventory for SMBs", "mencion", "ausente", "mencion"],
          ["Stock alternatives", "mencion", "mencion", "ausente"],
          ["Real-time stock", "mencion", "mencion", "mencion"],
          ["Connect my store", "ausente", "mencion", "ausente"],
        ],
      },
      comparar: {
        question: "How does Norte compare with other options?",
        insight:
          "Integrations enter the comparison. Knowing it controls stock is no longer enough.",
        rows: [
          ["Stock control", "comparacion", "comparacion", "mencion"],
          ["Integrations", "mencion", "comparacion", "comparacion"],
          ["Published details", "comparacion", "mencion", "mencion"],
          ["Fit for my business", "ausente", "comparacion", "comparacion"],
        ],
      },
      elegir: {
        question: "What should I check before choosing?",
        insight:
          "An open question emerges: which integrations does Norte have? That gap points to something to clarify on your site.",
        rows: [
          ["Stock features", "mencion", "comparacion", "mencion"],
          ["Integrations to check", "comparacion", "mencion", "comparacion"],
          ["Next steps", "mencion", "mencion", "ausente"],
          ["Learn more", "mencion", "ausente", "mencion"],
        ],
      },
    },
    stateLabels: {
      mencion: "Mention",
      comparacion: "Comparison",
      ausente: "No mention",
    },
    sources: [
      {
        url: "norte.example / producto",
        title: "The source behind the answer.",
        excerpt: [
          "Norte lets you ",
          "view stock in real time and record movements",
          " on one platform. Inventory software for small businesses.",
        ],
        review:
          "The source describes stock control. It doesn't confirm which integrations are available.",
        highlight: "view stock in real time",
        prefix: "Norte lets you",
      },
      {
        url: "sector.example / guia",
        title: "Another context. Another view.",
        excerpt: [
          "Before choosing inventory software, ",
          "check how it connects to your store and sales system",
          ". Needs vary by business.",
        ],
        review:
          "The guide gives category context; it doesn't prove results for any brand.",
        highlight: "check integrations",
        prefix: "Before choosing Norte,",
      },
    ],
    audienceReadings: {
      marca: {
        lens: "MENTIONS + CONTEXT",
        question: "What do answers say about your brand?",
        reading:
          "See which attributes appear, which are left out and which alternatives your brand is compared with.",
        action: "Review your position against observed answers.",
      },
      contenido: {
        lens: "SOURCES + CONTENT",
        question: "What details are missing to choose?",
        reading:
          "Trace the sources and spot topics worth clarifying on your site or in your content to explain your offering.",
        action: "Prioritize content changes with evidence.",
      },
      agencias: {
        lens: "FINDINGS + DISCUSSION",
        question: "How do you explain this to your client?",
        reading:
          "Move beyond a single screenshot to a view grounded in questions, sources and next steps.",
        action: "Share findings and agree on what to review first.",
      },
    },
    modules: {
      menciones: {
        icon: "Quotes",
        title: "How your brand appears",
        copy: "Norte appears for stock control for small businesses. The answers leave questions about integrations.",
      },
      fuentes: {
        icon: "Link",
        title: "What each answer is based on",
        copy: "The site describes inventory and stock movements. In this example, the review finds no confirmed integrations.",
      },
      prioridades: {
        icon: "CursorClick",
        title: "What to review next",
        copy: "Explain the available integrations on your site, then observe how the models answer again.",
      },
    },
  },
};
