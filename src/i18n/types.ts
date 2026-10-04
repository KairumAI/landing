export type PatternState = "mencion" | "comparacion" | "ausente";
export type Intent = "explorar" | "comparar" | "elegir";
export type Audience = "marca" | "contenido" | "agencias";
export type ReportModuleKey = "menciones" | "fuentes" | "prioridades";

/** All visitor-facing copy. Fragment fields correspond to existing markup boundaries. */
export interface Dictionary {
  meta: {
    siteName: string;
    title: string;
    description: string;
    ogImageAlt: string;
  };
  skipLink: string;
  book: { label: string; newTab: string };
  header: {
    brandLabel: string;
    navLabel: string;
    how: string;
    who: string;
    report: string;
    faq: string;
    mobileLabel: string;
  };
  hero: {
    eyebrow: string;
    titleFirst: string;
    titleSecond: string;
    titleHighlight: string;
    intro: string;
    how: string;
    proof: [string, string, string];
    visualLabel: string;
    providerNames: [string, string, string];
    console: string;
    initialStatus: string;
    exampleLabel: string;
    screenReaderAnswer: string;
    sourcesLabel: string;
    sourceDomains: [string, string];
    resultTitle: string;
    resultDetail: string;
    nextStepLabel: string;
    nextStep: string;
    demoNote: string;
    replayLabel: string;
    replay: string;
  };
  context: {
    title: [string, string];
    intro: string;
    questionsLabel: string;
    questions: [string, string, string, string];
  };
  journey: {
    eyebrow: string;
    title: [string, string];
    intro: [string, string];
    navLabel: string;
    steps: [string, string, string, string, string];
    caseLabel: string;
    question: [string, string];
    options: [string, string, string];
    questionNote: string;
    networkQuery: [string, string];
    networkNotes: [string, string, string];
    networkNote: string;
    exampleAnswers: [string, string, string];
    answerSources: [string, string, string];
    answersNote: string;
    responseLabel: string;
    evidenceAnswer: [string, string];
    evidenceSource: string;
    evidenceTitle: string;
    evidenceExcerpt: [string, string, string];
    reviewChip: string;
    evidenceNote: string;
    reportOrbit: [string, string, string];
    exampleLabel: string;
    reportTitle: [string, string];
    foundLabel: string;
    found: string;
    reviewLabel: string;
    review: string;
    reportNote: string;
    scrollHint: string;
    fictionalCase: string;
  };
  answers: {
    eyebrow: string;
    title: [string, string, string];
    intro: string;
    selectLabel: string;
    providerButtons: [string, string, string];
    apiNote: string;
    exampleLabel: string;
    changeLabel: string;
  };
  patterns: {
    eyebrow: string;
    title: [string, string];
    intro: [string, string];
    controlsLabel: string;
    intents: [string, string, string];
    exampleLabel: string;
    focusLabel: string;
    matrixLabel: string;
    conversationLabel: string;
  };
  sources: {
    followLabel: string;
    exampleLabel: string;
    selectLabel: string;
    tabs: [string, string];
    reviewTitle: string;
    eyebrow: string;
    title: [string, string, string];
    intro: string;
    benefits: [string, string, string];
  };
  audience: {
    eyebrow: string;
    title: [string, string];
    intro: [string, string];
    controlsLabel: string;
    buttons: Record<Audience, { title: string; detail: string }>;
    teamLabel: string;
    reportLink: string;
  };
  report: {
    eyebrow: string;
    title: [string, string, string];
    intro: string;
    optionsLabel: string;
    options: Record<ReportModuleKey, string>;
    openLabel: string;
    note: string;
    exampleLabel: string;
    paperTitle: [string, string];
    paperSubtitle: string;
    paperFoot: string;
  };
  reportDialog: {
    title: string;
    closeLabel: string;
    heading: string;
    intro: string;
    questionLabel: string;
    question: string;
    caseLabel: string;
    evidenceSummary: string;
    answerLabel: string;
    answer: string;
    sourceLabel: string;
    source: string;
    review: string;
  };
  faq: {
    eyebrow: string;
    title: [string, string];
    items: { question: string; answer: string }[];
  };
  contact: {
    eyebrow: string;
    title: [string, string];
    intro: [string, string];
    agendaLabel: string;
    agenda: [
      { title: string; detail: string },
      { title: string; detail: string },
      { title: string; detail: string },
    ];
  };
  footer: { brandLabel: string; motto: string; languageLabel: string };
  notFound: {
    title: string;
    brandLabel: string;
    code: string;
    heading: string;
    intro: string;
    navLabel: string;
    homeLabel: string;
  };
  /** Serialized into #i18n-client, for the shared browser bundle. */
  client: {
    heroQuery: string;
    heroAnswer: string;
    heroStatuses: {
      ready: string;
      sources: string;
      reading: string;
      preparing: string;
    };
    stageCaptions: [string, string, string, string, string];
    motion: {
      pauseLabel: string;
      resumeLabel: string;
      pause: string;
      resume: string;
      demoPauseLabel: string;
      demoResumeLabel: string;
      demoPause: string;
      demoResume: string;
    };
    menu: { open: string; close: string };
    providerExamples: {
      name: string;
      logo: "openai" | "gemini" | "claude";
      answer: string;
      insight: string;
    }[];
    patterns: Record<
      Intent,
      {
        question: string;
        insight: string;
        rows: [string, PatternState, PatternState, PatternState][];
      }
    >;
    stateLabels: Record<PatternState, string>;
    sources: {
      url: string;
      title: string;
      excerpt: [string, string, string];
      review: string;
      highlight: string;
      prefix: string;
    }[];
    audienceReadings: Record<
      Audience,
      { lens: string; question: string; reading: string; action: string }
    >;
    modules: Record<
      ReportModuleKey,
      { icon: string; title: string; copy: string }
    >;
  };
}
