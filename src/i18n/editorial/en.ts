import type { EditorialCopy } from "./schema";
const google = {
  title: "Google Search Central: AI features and your website",
  url: "https://developers.google.com/search/docs/appearance/ai-features",
};
const search = {
  title: "Google Search Central: how Search works",
  url: "https://developers.google.com/search/docs/fundamentals/how-search-works",
};
const bots = {
  title: "OpenAI: crawlers and search agents",
  url: "https://platform.openai.com/docs/bots",
};
const analytics = {
  title: "Cloudflare Web Analytics: what web analytics measures",
  url: "https://developers.cloudflare.com/web-analytics/about/",
};
export const en: EditorialCopy = {
  ui: {
    resources: "Resources",
    blog: "Blog",
    glossary: "Glossary",
    methodology: "Methodology",
    resourcesDescription: "Guides and evidence for better questions.",
    blogDescription: "Practical reading on AI brand visibility.",
    glossaryDescription: "Clear concepts, examples and limits.",
    explore: "Explore",
    featured: "Start here",
    guide: "Practical guide",
    articles: "Latest reading",
    onThisPage: "On this page",
    sources: "Sources and references",
    related: "Keep exploring",
    author: "By KAIRUM",
    reviewed: "Reviewed on",
    date: "October 16, 2026",
    minutes: "min read",
    read: "Read article",
    editorialNote: "Editorial approach",
    editorialPolicy:
      "Content prepared with AI assistance and checks against public sources. Schematic examples are identified. These guides explain a working method; they do not establish client results or guarantee rankings.",
    reports: "Exploratory reports",
    reportsNote:
      "Prospective studies retain their original dates, questions and limitations. Organizations do not become clients by appearing in the library.",
    reportsAction: "Explore the library",
    back: "All resources",
    nextStep: "From reading to your next step",
    ctaTitle: "A good question can start your next diagnosis.",
    ctaText:
      "With AI Report, we can agree on a sample, review answers and sources, and document what deserves attention.",
    ctaAction: "Explore AI Report",
    question: "Question",
    answer: "Answer",
    source: "Source",
    evidence: "Evidence you can review",
    homeQuestions: "Choosing questions",
    homeSources: "Understanding signals",
    homeFindings: "Interpreting findings",
    heroTitle: "Understand AI search.\nWith evidence.",
    heroIntro:
      "Guides, ideas and a working method to understand how your brand appears in AI answers and decide what to investigate next.",
    blogTitle: "Ideas for better questions.\nAnd informed decisions.",
    blogIntro:
      "Practical reading on questions, mentions, sources and measurement. One topic at a time, with examples and references.",
    guideAction: "Read the guide",
    browseBlog: "Explore the blog",
    synthetic: "Educational diagram · no company measurements",
  },
  commercial: {
    report: {
      title: "AI Report: AI brand visibility diagnosis | KAIRUM",
      description:
        "Define an AI brand visibility diagnosis: questions, answers, sources, findings and priorities with explicit scope and limitations.",
      heading: "A diagnosis your team can review.",
      intro:
        "AI Report starts with a business question and an agreed scope. Each observation connects to the evidence behind it.",
      items: [
        {
          title: "What we agree on",
          text: "The brand, category, questions, observed environment and conditions before measurement begins.",
        },
        {
          title: "What your team receives",
          text: "A reading of answers, mentions and sources, with findings, limitations and priorities to discuss.",
        },
        {
          title: "How to interpret it",
          text: "An observation describes its sample. Review distinguishes verified evidence, open questions and a next step.",
        },
      ],
    },
    analytics: {
      title: "AI brand visibility analytics | KAIRUM",
      description:
        "Understand how to analyze mentions, sources and competitors in AI answers, and which conditions make two brand measurements comparable.",
      heading: "Measuring change starts with preserving context.",
      intro:
        "Visibility analytics brings different signals together. Its value lies in returning to the question, answer and source before drawing a conclusion.",
      items: [
        {
          title: "An explicit sample",
          text: "Document questions, dates, language, observed environment and coverage. Every percentage needs a denominator.",
        },
        {
          title: "Separate signals",
          text: "Read mentions and citations in their answers. Website visits need a separate authorized analytics source.",
        },
        {
          title: "Useful comparisons",
          text: "Repeat compatible conditions and record changes in models or questions. A difference alone does not prove an intervention worked.",
        },
      ],
    },
    agencias: {
      title: "GEO and AEO for marketing agencies | KAIRUM",
      description:
        "Explore how an AI visibility diagnosis can fit your agency's work: client questions, reviewable evidence and priorities within an agreed pilot scope.",
      heading: "A new conversation with your clients. A concrete scope.",
      intro:
        "An agency can start with one brand and a business question. A pilot defines what to observe, which evidence to deliver and which decisions to support.",
      items: [
        {
          title: "Define the case",
          text: "Choose a brand, its category and the decisions its potential customers investigate. Agree on the questions before execution.",
        },
        {
          title: "Deliver a reading",
          text: "Bring mentions, answers and sources into an AI Report the team can review and share, with dates and limitations.",
        },
        {
          title: "Agree on the next step",
          text: "Prioritize content changes or new questions. A later measurement preserves conditions and separates change from causality.",
        },
      ],
    },
  },
  pages: {
    resources: {
      title: "GEO, AEO and AI visibility resources | KAIRUM",
      description:
        "Guides, articles, a glossary and methodology for investigating a brand's presence in AI answers, with clear questions, sources and limitations.",
      category: "Resources",
      summary: "A library connecting questions, evidence and decisions.",
      sections: [],
      sources: [],
      related: [],
      product: "report",
    },
    blog: {
      title: "GEO, AEO and AI brand visibility blog | KAIRUM",
      description:
        "Practical KAIRUM articles on choosing questions, distinguishing mentions from citations and interpreting AI brand visibility measurements.",
      category: "Blog",
      summary: "Ideas for investigating AI search with care.",
      sections: [],
      sources: [],
      related: [],
      product: "report",
    },
    "visibility-guide": {
      title: "How to measure your brand's visibility in AI answers",
      category: "Practical guide",
      description:
        "Learn to define questions, record mentions and citations, and interpret a sample of AI answers with comparable conditions and explicit limitations.",
      summary:
        "Measuring visibility means observing a defined sample of answers, recording how a brand appears, and retaining enough context to review the findings. Start by deciding which business question you want to answer.",
      sections: [
        {
          id: "objetivo",
          title: "1. Define what you want to understand",
          paragraphs: [
            "A brand may want to know whether it appears when someone discovers a category, compares alternatives or evaluates a capability. These are different decisions: define a specific objective before collecting questions.",
            "KAIRUM could investigate which sources are cited when explaining how to measure AI visibility. That objective does not estimate every marketing conversation happening online.",
          ],
          example: {
            label: "Planning example · not a measurement",
            text: "Objective: understand how AI brand visibility measurement is explained. Reference website: kairum.com.ar. Audience and language: marketing teams asking in English.",
          },
        },
        {
          id: "preguntas",
          title: "2. Choose questions that represent decisions",
          paragraphs: [
            "Cover discovery, comparison and evaluation. Separate questions that name the brand from those that do not: they serve different objectives.",
            "Keep the exact wording and an intent label. If you later change the questions, record that change before comparing periods.",
          ],
          items: [
            "Discovery: how can I measure whether a brand appears in AI answers?",
            "Comparison: what should I compare when choosing an AI visibility tool?",
            "Brand evaluation: what does KAIRUM publish about its diagnostic method?",
          ],
        },
        {
          id: "condiciones",
          title: "3. Record where and how you observe",
          paragraphs: [
            "Record the date, language, environment, identified model, search availability and coverage. An API answer and an answer from a consumer interface come from different environments.",
            "Measurements using OpenAI API or OpenRouter must be labeled as API or proxy observations. They are not ChatGPT interface captures. Model names do not establish a commercial integration.",
          ],
          items: [
            "Question and objective of the set.",
            "Date, language and geographic context actually available.",
            "Identified environment and model, without filling gaps by assumption.",
            "Complete answers, failures and observed coverage.",
          ],
        },
        {
          id: "senales",
          title: "4. Separate mentions, citations and visits",
          paragraphs: [
            "A brand can appear without its website being cited. A page can be cited without anyone opening the link. A visit needs a separate observation in web analytics.",
            "Record signals separately. Where an answer includes search, distinguish retrieved sources from citations visible in the final text.",
          ],
          table: {
            columns: ["Signal", "What it shows", "What it does not establish"],
            rows: [
              [
                "Mention",
                "The brand appears in the answer.",
                "That the answer links to its website.",
              ],
              [
                "Citation",
                "The answer attributes information to a source.",
                "That a person visited the page.",
              ],
              [
                "Referral visit",
                "A session arrives through an identifiable link.",
                "That it becomes an inquiry or sale.",
              ],
            ],
          },
        },
        {
          id: "interpretacion",
          title: "5. Read the result within its sample",
          paragraphs: [
            "If you calculate presence, explain which answers count as valid and show the denominator. Errors stay visible as part of coverage.",
            "One run does not represent every possible answer. To read change, repeat compatible conditions and look for patterns before interpreting an isolated difference.",
            "If you changed content and later observed improvement, document both. Their sequence alone does not prove that the content caused it.",
          ],
          example: {
            label: "Synthetic example · not a KAIRUM result",
            text: "In a hypothetical sample, a brand appears in 6 of 20 valid answers: 30% presence in that sample. If 25 answers were planned, coverage is 20 of 25. Show both numbers together.",
          },
        },
        {
          id: "accion",
          title: "6. Turn the reading into a next question",
          paragraphs: [
            "Connect each priority to its evidence. It may mean clarifying a capability, reviewing an outdated source or investigating a question that remains uncovered.",
            "A useful cycle retains its objective, measurement, decision and conditions for another observation. A diagnosis opens a conversation; the team's judgment still matters.",
          ],
          items: [
            "What we observed and in which answer.",
            "Which source or content deserves review.",
            "Which action is proposed and who will review it.",
            "Which conditions to retain for the next observation.",
          ],
        },
      ],
      sources: [google, bots, analytics],
      related: [
        "mentions-citations-visits",
        "choosing-questions",
        "interpreting-results",
      ],
      product: "report",
    },
    "mentions-citations-visits": {
      title: "Mentions, citations and visits: three different signals",
      category: "Concepts",
      description:
        "A brand mention, a citation of its website and an AI referral visit describe different events. Understand what to measure and what each signal cannot establish.",
      summary:
        "A mention indicates that your brand appears. A citation identifies a source used in the answer. A visit happens when someone reaches your website. Separating them prevents treating one as proof of the others.",
      sections: [
        {
          id: "mencion",
          title: "What a mention tells us",
          paragraphs: [
            "A mention answers a narrow question: does the brand name appear in this answer? Then we can review context: the capability described, alternatives compared or missing information.",
            "Frequency only makes sense within a defined sample. KAIRUM appearing in a question that already names it is different from appearing in an open category question.",
          ],
          example: {
            label: "Schematic example · not a measured answer",
            text: "An answer lists KAIRUM among alternatives for researching brand visibility, without linking to kairum.com.ar. This example contains a mention, not a citation of the website.",
          },
        },
        {
          id: "cita",
          title: "What a citation adds",
          paragraphs: [
            "A citation connects a claim to a source. It may point to the brand's website or an external page. Record both domain and URL so you can return to the evidence.",
            "Sources retrieved during search and citations visible in the answer are different records. Retain both when observable and label them precisely.",
            "A cited source does not mean the brand is recommended or that every nearby claim is supported by the page. Review the relationship.",
          ],
        },
        {
          id: "visita",
          title: "What a visit requires",
          paragraphs: [
            "A visit is observed on the website, not in the answer. An identifiable referral may show that someone followed a link from an AI tool. Attribution depends on the data that actually reaches analytics.",
            "A crawler request is not a human visit. Server logs describe those requests; they do not by themselves establish a citation.",
            "A commercial inquiry is another step. Clicking Schedule, completing a booking and attending a meeting are different events.",
          ],
        },
        {
          id: "registro",
          title: "Connect the records while keeping signals distinct",
          paragraphs: [
            "Use identifiers connecting a question with its answer and date. Keep observable mentions and citations alongside that evidence, and review traffic in its authorized source.",
            "When comparing results, name the signal that changed and its conditions. Avoid combining mentions, citations and sessions into a single unexplained percentage.",
          ],
          table: {
            columns: ["Question", "Evidence to review"],
            rows: [
              ["Does the brand appear?", "Complete answer and mention text."],
              ["Which page is cited?", "Visible citation and destination URL."],
              ["Did someone visit?", "Session and referrer in web analytics."],
              [
                "Was there an inquiry?",
                "An actually confirmed contact or booking.",
              ],
            ],
          },
        },
      ],
      sources: [google, analytics, bots],
      related: ["visibility-guide", "interpreting-results"],
      product: "analytics",
    },
    "choosing-questions": {
      title: "How to choose questions for AI visibility measurement",
      category: "Planning",
      description:
        "Design discovery, comparison and evaluation questions, distinguish open and brand-specific queries, and document the scope before measuring.",
      summary:
        "A useful question set starts with an audience's decisions and a business objective. Cover different intents, separate open and brand-specific queries, and fix the scope before observing answers.",
      sections: [
        {
          id: "audiencia",
          title: "Start with an audience decision",
          paragraphs: [
            "A keyword can guide research, but a question adds context: who is asking, what they need to understand and which condition matters to their choice.",
            "For KAIRUM, an agency preparing a client diagnosis and a brand investigating its sources may ask different questions. Document the audience without inventing demand volumes.",
          ],
        },
        {
          id: "intencion",
          title: "Cover more than one decision stage",
          paragraphs: [
            "Group questions by intent and review which part of the journey each group represents. These categories organize a sample; they do not automatically estimate a market.",
          ],
          table: {
            columns: ["Intent", "Example question"],
            rows: [
              ["Discover", "What does AI brand visibility measurement mean?"],
              ["Compare", "How should I compare GEO and AEO analytics tools?"],
              ["Evaluate", "What should a visibility diagnosis include?"],
              [
                "Research a brand",
                "Which methodology does KAIRUM explain on its website?",
              ],
            ],
          },
        },
        {
          id: "abiertas",
          title: "Separate open and brand-specific questions",
          paragraphs: [
            "An open query does not include the brand name. It helps observe which alternatives appear for that wording. A brand-specific query names it and helps review how its offer is described.",
            "Both can be useful. If you mix their results without labels, higher presence may simply reflect writing the name into more questions.",
          ],
          example: {
            label: "Design examples · not executed queries",
            text: "Open: how should an agency organize an AI visibility diagnosis? Brand-specific: how does KAIRUM approach a diagnosis for agencies?",
          },
        },
        {
          id: "prioridad",
          title: "Choose coverage over repeated variations",
          paragraphs: [
            "Check whether several questions essentially ask the same thing. A long list of paraphrases does not guarantee coverage of different decisions or needs.",
            "Prioritize questions the team can connect to a decision and a possible content review. Without real query data, treat the set as an editorial hypothesis to improve.",
          ],
        },
        {
          id: "version",
          title: "Save a version before measuring",
          paragraphs: [
            "Retain exact wording, intent, language and reason for inclusion. Record exclusions and the environment to be observed.",
            "When the set changes, create a new version. Compare periods under compatible conditions and explain added or removed questions.",
          ],
          items: [
            "Defined objective and audience.",
            "Wording, language and intent per question.",
            "Labeled open and brand-specific queries.",
            "Set version, scope and date.",
            "Environment, planned repetitions and coverage criteria.",
          ],
        },
      ],
      sources: [google, search],
      related: ["visibility-guide", "interpreting-results"],
      product: "prompt-intelligence",
    },
    "interpreting-results": {
      title: "How to interpret an AI visibility measurement",
      category: "Measurement",
      description:
        "Read presence, coverage and change within a sample of AI answers. Distinguish an observation, a hypothesis and a causal conclusion.",
      summary:
        "A result describes observations made under certain conditions. Interpret it by reviewing the sample, coverage, answers and comparability. A difference alone does not establish an action's effect.",
      sections: [
        {
          id: "alcance",
          title: "Read the scope before the percentage",
          paragraphs: [
            "Before asking whether a number is high or low, review the questions, environment, date and coverage behind it.",
            "A diagnosis does not estimate every conversation occurring in a tool. It does not describe the behavior of another interface or model by itself.",
          ],
        },
        {
          id: "denominador",
          title: "Make the denominator visible",
          paragraphs: [
            "A presence percentage needs a definition of valid answers and an explicit observation count. Execution failures and incomplete answers belong in the coverage record.",
            "Changing a denominator can change the percentage even if mention counts stay the same. Document both values.",
          ],
          example: {
            label: "Synthetic example · not a company measurement",
            text: "A brand appears in 8 of 20 valid answers: 40% presence in that sample. If 24 queries were planned, 20 of 24 had valid answers. The other four remain visible.",
          },
        },
        {
          id: "comparabilidad",
          title: "Compare compatible conditions",
          paragraphs: [
            "Two captures may use different questions, languages, models or search modes. Their difference may reflect those conditions as well as any content change.",
            "Keep a common question version, identify environments and record dates. Explain any changed condition before interpreting the comparison.",
          ],
          items: [
            "Same objective and comparable question set.",
            "Preserved language and context, or documented changes.",
            "Identified environment and model where possible.",
            "Visible coverage, errors and calculation rules.",
            "Reviewable answers and sources behind the summary.",
          ],
        },
        {
          id: "causalidad",
          title: "Distinguish observation, hypothesis and effect",
          paragraphs: [
            "Observation: the brand appeared in more sample answers. Hypothesis: a content improvement may have contributed. Causal conclusion: that intervention produced the change. The third requires a design that evaluates other explanations.",
            "A before-and-after comparison helps follow change, but the model, available sources and answers may also change between runs. Avoid automatically attributing movement to an action.",
          ],
        },
        {
          id: "prioridades",
          title: "Document a reviewable decision",
          paragraphs: [
            "A useful priority names its supporting answer, the source to review and a proposed next step. Where evidence is insufficient, investigate further.",
            "Keep visibility outcomes separate from visits and commercial inquiries. The full chain needs different observations and is not established by a mention.",
          ],
        },
      ],
      sources: [google, search, bots],
      related: ["visibility-guide", "mentions-citations-visits"],
      product: "analytics",
    },
    glossary: {
      title: "GEO, AEO and AI brand visibility glossary",
      category: "Reference",
      description:
        "Definitions of GEO, AEO, mentions, citations, presence, coverage and API environments, with examples and limits for interpreting AI search.",
      summary:
        "Shared vocabulary helps us ask and measure precisely. These terms explain KAIRUM's usage; definitions and metrics may differ between providers.",
      sections: [
        {
          id: "geo-aeo",
          title: "GEO and AEO",
          paragraphs: [
            "GEO (Generative Engine Optimization) usually describes work on content and brand presence in generative answers. AEO (Answer Engine Optimization) describes work focused on answers from search systems and assistants. Their uses overlap; they are not two universal metrics.",
            "Google's AI features retain SEO fundamentals. Google requires no special AI file or specific schema for appearing in AI Overviews or AI Mode.",
          ],
        },
        {
          id: "mencion-cita",
          title: "Mention and citation",
          paragraphs: [
            "Mention: a brand name appears in an answer. Citation: information is attributed to an identifiable source, usually through a link. One does not imply the other.",
          ],
        },
        {
          id: "presencia",
          title: "Presence within a sample",
          paragraphs: [
            "The proportion of valid answers in a set where a brand is observed under an explicit identification rule. It does not represent all conversations or guarantee a recommendation.",
          ],
        },
        {
          id: "cobertura",
          title: "Coverage",
          paragraphs: [
            "The relationship between valid observations and those planned in the scope. It shows errors, omissions and limits a summary percentage could hide.",
          ],
        },
        {
          id: "superficie",
          title: "API environment and consumer interface",
          paragraphs: [
            "An environment is the specific setting where an answer is observed. OpenAI API and OpenRouter are API or proxy environments. Their measurements are not ChatGPT interface captures.",
          ],
        },
        {
          id: "visita-rastreo",
          title: "Referral visit and crawl",
          paragraphs: [
            "A referral visit is a session whose source can be identified in analytics. A crawl is an agent's request to a server. That request does not establish a human visit or citation.",
          ],
        },
        {
          id: "prompt",
          title: "Question or prompt",
          paragraphs: [
            "The specific input sent to an environment. Retain its wording, language, intent and version for measurement. Including a brand name makes it brand-specific; omitting it allows an open query.",
          ],
        },
        {
          id: "comparabilidad",
          title: "Comparability",
          paragraphs: [
            "How far two measurements preserve the conditions needed to interpret differences. Changes to questions, models, language or coverage must be documented before comparison.",
          ],
        },
      ],
      sources: [google, bots, analytics],
      related: ["visibility-guide", "mentions-citations-visits"],
      product: "report",
    },
    methodology: {
      title: "KAIRUM methodology and editorial approach",
      category: "Method",
      description:
        "How KAIRUM frames AI visibility observation: scope, questions, evidence, coverage, review and the limits of conclusions.",
      summary:
        "We start with a specific question. We define what to observe, retain the evidence and distinguish what a sample supports from what still needs investigation.",
      sections: [
        {
          id: "alcance",
          title: "Scope before execution",
          paragraphs: [
            "A diagnosis agrees on a brand, category, question set and observation conditions. Open and brand-specific queries are labeled to keep their objectives distinct.",
            "Planning is not measurement. An interface example or schematic chart does not establish real results either.",
          ],
        },
        {
          id: "evidencia",
          title: "From answer to finding",
          paragraphs: [
            "Review should return to the question, answer, date and environment. Mentions, visible citations and available search sources remain distinct.",
            "Record coverage and explain failures or exclusions. A quantitative summary includes its calculation rule and denominator.",
          ],
        },
        {
          id: "superficies",
          title: "Name the observed environment",
          paragraphs: [
            "OpenAI API and OpenRouter observations are labeled API or proxy. They are not presented as the ChatGPT interface. Observations from one environment do not automatically generalize to others.",
          ],
        },
        {
          id: "limites",
          title: "What an exploratory study supports",
          paragraphs: [
            "A prospective study describes questions and answers observed on a date under explicit conditions. Included organizations do not become clients and their approval is not implied.",
            "Samples with different questions, dates or environments are not a consistent cross-company ranking. A time-based difference does not establish commercial impact or causality.",
          ],
        },
        {
          id: "editorial",
          title: "How we prepare these readings",
          paragraphs: [
            "Guides and articles are prepared with AI assistance and checks against public sources. Corporate authorship is KAIRUM; each reading shows references and a review date.",
            "Invented examples are labeled synthetic or schematic. They explain calculations or decisions and are not product or client metrics.",
            "Official sources are linked where they support a claim. Our methodological proposals are explained as working criteria without claiming validation that has not occurred.",
          ],
        },
        {
          id: "actualizacion",
          title: "An approach open to review",
          paragraphs: [
            "Environments and features change. When a source or condition becomes outdated, review the content and record its update date.",
            "Use KAIRUM's contact page to suggest a correction or discuss the scope of a diagnosis.",
          ],
        },
      ],
      sources: [google, bots, analytics],
      related: ["visibility-guide", "interpreting-results"],
      product: "report",
    },
  },
};
