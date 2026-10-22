import type { EditorialCopy } from "./schema";
import { adobeShopping } from "./adobe-shopping";
import { geoComparison } from "./geo-comparison";

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
      "Text and illustrations prepared with AI assistance and a review of public sources. Exercises are clearly identified educational constructions without client data. The methodology and working proposals are KAIRUM’s; references document how each platform works. We do not guarantee rankings.",
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
    blogTitle: "Search has changed.\nLet’s learn to read it.",
    blogIntro:
      "Questions that matter, signals you can inspect and decisions with context. A place to think about AI visibility beyond the headline number.",
    guideAction: "Read the guide",
    browseBlog: "Explore the blog",
    synthetic: "Educational diagram · no company measurements",
    takeaways: "What you will take away",
    reference: "Check the source",
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
    "geo-comparison": geoComparison.en,
    "adobe-shopping": adobeShopping,
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
        "Does your brand appear when someone asks about your category? Investigating that takes more than typing its name into a chat. This guide proposes a sequence: choose a decision, observe answers and turn evidence into a next action.",
      sections: [
        {
          id: "objetivo",
          title: "1. Define what you want to understand",
          paragraphs: [
            "Imagine your team publishes a guide and wants to understand whether it helps explain its offering in AI search. An isolated screenshot may be interesting, but it cannot tell you what happens with other questions, which sources matter or whether the observation repeats.",
            "Start with a business decision: understanding what information an agency encounters before evaluating a diagnosis, for instance. For KAIRUM, that scope makes a specific need researchable without claiming to represent every marketing conversation on the internet.",
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
          figure: {
            title: "Three questions. Three records.",
            caption:
              "KAIRUM working diagram. Signals are inspected separately and do not describe an automatic conversion.",
            steps: [
              {
                label: "Does the brand appear?",
                detail:
                  "Read the complete answer and the context of the mention.",
                value: "01",
              },
              {
                label: "Which page is cited?",
                detail: "Keep the URL and check which statement it supports.",
                value: "02",
              },
              {
                label: "Did anyone reach the site?",
                detail:
                  "Consult authorised analytics and the attribution it actually provides.",
                value: "03",
              },
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
        {
          id: "ficha",
          title: "7. Build a record someone else can review",
          paragraphs: [
            "The difference between an impression and a useful diagnosis is the ability to return to the material. Keep one row per answer, with an identifier connecting the exact question, conditions, complete answer and cited URLs. An executive summary does not replace that evidence archive.",
            "For a first exercise about KAIRUM, choose an agency decision and write four open questions and two directed ones. This is a starting proposal, not a universal sample size. Check whether they cover different decisions before investing in more runs. The question selection article develops this example.",
          ],
          table: {
            columns: ["Field", "What to preserve"],
            rows: [
              ["Question", "Exact wording, intent and question-set version."],
              [
                "Observation",
                "Date, surface, language, answer and execution status.",
              ],
              [
                "Signals",
                "Mention with context and each citation with its URL.",
              ],
              [
                "Interpretation",
                "What we observed, what needs checking and the decision it opens.",
              ],
            ],
          },
        },
        {
          id: "revisar",
          title: "8. Review before expanding",
          paragraphs: [
            "Ask another person to take two rows and reconstruct your conclusion. If they cannot find the answer, understand the denominator or tell an example from a result, improve the record before increasing the sample.",
            "Then choose a small action: clarify a definition on a page, better document a product’s scope or investigate an external source. Record what you expect to observe and how you would review it. Google retains SEO fundamentals for its AI features: useful content, technical accessibility and internal links remain part of the work.",
            "The final deliverable can be one page: objective, sample and coverage; two findings with evidence; one limitation that changes the interpretation; and one priority with an owner. A diagnosis is useful when it helps choose the next step and allows a discussion of why.",
          ],
          references: [
            {
              title: "Google Search Central: AI features and your website",
              url: "https://developers.google.com/search/docs/appearance/ai-features",
            },
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: AI features and your website",
          url: "https://developers.google.com/search/docs/appearance/ai-features",
        },
        {
          title: "OpenAI: crawlers and search agents",
          url: "https://platform.openai.com/docs/bots",
        },
        {
          title: "Cloudflare Web Analytics: what web analytics measures",
          url: "https://developers.cloudflare.com/web-analytics/about/",
        },
      ],
      related: [
        "mentions-citations-visits",
        "choosing-questions",
        "interpreting-results",
      ],
      product: "report",
      cover: {
        alt: "A yellow ribbon passes through three paper windows, following a question to its evidence.",
        caption:
          "KAIRUM editorial illustration · following the thread from a question to its evidence.",
      },
      takeaways: [
        "Define a sample before looking at the answers.",
        "Record mentions, citations and visits separately.",
        "Close the diagnosis with a decision someone else can review.",
      ],
    },
    "mentions-citations-visits": {
      title:
        "Mentions, citations and visits: appearing is not the same as attracting",
      category: "Concepts",
      description:
        "A brand mention, a citation of its website and an AI referral visit describe different events. Understand what to measure and what each signal cannot establish.",
      summary:
        "Your brand appears in an AI answer. That is a useful observation, but questions remain: what does it say about the brand, which source supports it and did anyone reach the site? Following those clues changes the conversation with your team.",
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
          references: [
            {
              title: "Google Search Central: AI features and your website",
              url: "https://developers.google.com/search/docs/appearance/ai-features",
            },
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
          references: [
            {
              title: "OpenAI: crawlers and search agents",
              url: "https://platform.openai.com/docs/bots",
            },
          ],
          figure: {
            title: "Appearing, supporting, arriving",
            caption:
              "Conceptual diagram: these records may coexist or be absent. None automatically proves the next.",
            steps: [
              {
                label: "Mention",
                detail: "The name appears in an answer we have preserved.",
                value: "Text",
              },
              {
                label: "Citation",
                detail: "A statement has an identifiable source.",
                value: "URL",
              },
              {
                label: "Visit",
                detail: "Analytics records an arrival at the site.",
                value: "Session",
              },
            ],
          },
        },
        {
          id: "caso",
          title: "A worked case: what happened and what remains open",
          paragraphs: [
            "Let’s construct three educational observations around KAIRUM. In the first, an answer lists the brand when discussing diagnoses and links only to external technical documentation. We can record the mention and the external citation. We cannot record a KAIRUM citation simply because its name is near the link.",
            "In the second, another answer links to the measurement guide on kairum.com.ar to explain a definition, without recommending a purchase. There is a citation to the site. Commercial intent and the tone of a recommendation require a different reading: they do not follow from the cited domain.",
            "In the third, site analytics shows a visit with an identifiable assistant referral. That supports investigating an arrival. Unless we can connect that session to a specific answer, we should not attribute it to the question in the first example.",
          ],
          example: {
            label: "Constructed case · three observations, no measured data",
            text: "Record A: mention + external citation. Record B: citation to the guide. Record C: referred visit. We do not count them as “three conversions” or assume they belong to the same person.",
          },
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
        {
          id: "accion",
          title: "What to inspect when a signal is missing",
          paragraphs: [
            "Keeping signals separate helps you decide. If the brand appears with an outdated description, inspect the statement and its source before publishing more content. If an accurate but difficult page gets cited, work on its clarity and the next step it offers. If visits arrive without enquiries, inspect the destination page and first check whether contact measurement actually works.",
            "A useful citation can also appear without a brand mention, for instance when a guide supports a general explanation. That observation deserves its own record: content visibility and brand recognition can evolve differently.",
            "To apply this today, take three complete answers. Mark the phrase mentioning the brand, open every source and note what each one supports. Then consult analytics separately. You get a map of evidence and open questions your team can discuss, without turning each signal into a commercial promise.",
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: AI features and your website",
          url: "https://developers.google.com/search/docs/appearance/ai-features",
        },
        {
          title: "Cloudflare Web Analytics: what web analytics measures",
          url: "https://developers.cloudflare.com/web-analytics/about/",
        },
        {
          title: "OpenAI: crawlers and search agents",
          url: "https://platform.openai.com/docs/bots",
        },
      ],
      related: ["visibility-guide", "interpreting-results"],
      product: "analytics",
      cover: {
        alt: "A paper speech bubble, chain link and doorway represent three distinct signals.",
        caption:
          "KAIRUM editorial illustration · appearing, being cited and receiving a visit are different events.",
      },
      takeaways: [
        "A mention describes presence; its context still needs reading.",
        "A citation lets you inspect a source, even if nobody opens it.",
        "Traffic and enquiries need their own records.",
      ],
    },
    "choosing-questions": {
      title: "Before measuring: choose questions that matter to your business",
      category: "Planning",
      description:
        "Design discovery, comparison and evaluation questions, distinguish open and brand-specific queries, and document the scope before measuring.",
      summary:
        "Fifty variations of “best tools” can still miss what your audience needs to resolve. Designing questions means deciding which part of the conversation to investigate. Here is an initial sample for KAIRUM and a way to refine it.",
      sections: [
        {
          id: "audiencia",
          title: "Start with an audience decision",
          paragraphs: [
            "A keyword can guide research, but a question adds context: who is asking, what they need to understand and which condition matters to their choice.",
            "For KAIRUM, an agency preparing a client diagnosis and a brand investigating its sources may ask different questions. Document the audience without inventing demand volumes.",
          ],
          figure: {
            title: "From a need to a question",
            caption:
              "Planning example for KAIRUM. It represents neither measured demand nor executed queries.",
            steps: [
              {
                label: "Audience",
                detail: "An agency preparing a diagnosis for a brand.",
                value: "Who",
              },
              {
                label: "Decision",
                detail: "What evidence to request before agreeing on a pilot.",
                value: "Why",
              },
              {
                label: "Question",
                detail: "What should an AI visibility diagnosis include?",
                value: "What to ask",
              },
            ],
          },
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
          id: "muestra",
          title: "Six questions, with a purpose for each row",
          paragraphs: [
            "For a first editorial review of KAIRUM, we propose the questions below. The first four explore the category without naming the brand; the last two examine how KAIRUM is described. Keep them in separate groups. These are neither real customer queries nor estimates of their frequency.",
            "Their value is that each question changes the decision being investigated. A definition helps someone discover the problem; a comparison criterion helps evaluate alternatives. Repeating the same question with ten synonyms would cover fewer of those decisions.",
          ],
          table: {
            columns: ["Proposed question", "Why include it"],
            rows: [
              [
                "How can I tell whether a brand appears in AI answers?",
                "Discover the problem. Open.",
              ],
              [
                "What is the difference between a mention and a citation?",
                "Understand a signal. Open.",
              ],
              [
                "How should I compare brand visibility diagnoses for AI?",
                "Explore criteria. Open.",
              ],
              [
                "What evidence should I request before buying a diagnosis?",
                "Evaluate a deliverable. Open.",
              ],
              [
                "What methodology does KAIRUM publish?",
                "Review the brand explanation. Directed.",
              ],
              [
                "What information about KAIRUM is missing to evaluate a pilot?",
                "Identify information gaps. Directed.",
              ],
            ],
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
        {
          id: "editar",
          title: "How to improve a question before running it",
          paragraphs: [
            "Read every row aloud. “Why is KAIRUM the best option?” already introduces a conclusion. “What does KAIRUM publish about its method?” lets you investigate something verifiable. A biased question can produce an appealing answer while contributing little to the diagnosis.",
            "If the wording is too broad, add a condition the audience would actually use: language, team type or need. Do not add the brand name to make it appear. Avoid combining price, integrations, methodology and support in one question if you will not be able to connect the finding to a specific need.",
            "Before expanding, ask someone on the team to explain which decision each answer could change. If two rows have the same purpose, choose one for the core and keep the other to explore variation. When you incorporate evidence from real conversations or queries, record its origin and avoid putting private information into test questions.",
            "For a repeat measurement, preserve that core and its conditions. New questions can enter an exploratory block. This lets you learn without presenting a change in sample composition as improved presence.",
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: AI features and your website",
          url: "https://developers.google.com/search/docs/appearance/ai-features",
        },
        {
          title: "Google Search Central: how Search works",
          url: "https://developers.google.com/search/docs/fundamentals/how-search-works",
        },
      ],
      related: ["visibility-guide", "interpreting-results"],
      product: "prompt-intelligence",
      cover: {
        alt: "A yellow ribbon chooses a route between paper cards and ink paths.",
        caption:
          "KAIRUM editorial illustration · choosing questions also means deciding what to leave out.",
      },
      takeaways: [
        "Start with an audience decision, using concrete language.",
        "Separate open discovery from an evaluation of a named brand.",
        "Keep a stable core of questions so comparisons remain useful.",
      ],
    },
    "interpreting-results": {
      title:
        "AI visibility: how to read a result without being misled by the percentage",
      category: "Measurement",
      description:
        "Read presence, coverage and change within a sample of AI answers. Distinguish an observation, a hypothesis and a causal conclusion.",
      summary:
        "A 60% result can tell a less robust story than a 30% result. The difference may lie in the answers that are missing. A constructed numerical case shows what to inspect before celebrating an improvement or making it a priority.",
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
          figure: {
            title: "Twice the percentage. The same six mentions.",
            caption:
              "Synthetic exercise, not KAIRUM results. Coverage falls from 20 to 10 valid answers out of 25 planned; failures are not counted as brand absence.",
            steps: [
              {
                label: "Observation A",
                detail: "6 mentions in 20 valid answers. Coverage: 20/25.",
                value: "30%",
              },
              {
                label: "Observation B",
                detail: "6 mentions in 10 valid answers. Coverage: 10/25.",
                value: "60%",
              },
            ],
          },
        },
        {
          id: "caso",
          title: "The case: 30% and 60% can describe the same count",
          paragraphs: [
            "In the figure’s exercise, 25 observations are planned for each period. A produces 20 valid answers and the brand appears in 6: 6 ÷ 20 = 30%. B produces only 10 valid answers, also with 6 mentions: 6 ÷ 10 = 60%. The percentage doubled; the mention count stayed the same.",
            "Coverage dropped from 80% to 40%. We do not know what the missing answers would have said. Counting them as answers without a mention would hide the failure; dropping them without showing coverage would hide another part of the problem. Before interpreting the change, investigate the errors and the questions that actually received answers.",
            "Return to the rows: did the same intents fail, was the surface preserved and which questions have an answer in both periods? A common subset may help the comparison, provided its size and exclusions are visible.",
          ],
          example: {
            label: "Educational calculation · not a real measurement",
            text: "Presence A: 6/20 = 30%. Coverage A: 20/25 = 80%. Presence B: 6/10 = 60%. Coverage B: 10/25 = 40%. Each percentage answers a different question.",
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
          references: [
            {
              title: "Google Search Central: AI features and your website",
              url: "https://developers.google.com/search/docs/appearance/ai-features",
            },
          ],
        },
        {
          id: "cambio",
          title: "When the comparison does preserve the sample",
          paragraphs: [
            "Now suppose another exercise with compatible conditions and 20 valid answers in both periods: the brand goes from appearing in 6 to appearing in 9. Presence moves from 30% to 45%. That is a difference of 15 percentage points, or a relative increase of 50%. Both are arithmetically correct, but need the count beside them to be interpretable.",
            "Even that difference does not prove an intervention caused it. Answers can vary between runs. Record the planned repetitions and avoid treating similar rewordings as independent people. This sample measures neither market share nor the frequency of all conversations.",
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
        {
          id: "nota",
          title: "A decision note your team can discuss",
          paragraphs: [
            "Try four lines: what we observed, the evidence, the explanation we are considering and what we will inspect. For example: “In the comparable sample, three additional answers mention the brand. We will review their sources and brand descriptions before proposing changes.” That note can be challenged and avoids turning an association into a cause.",
            "If the question is whether visits or enquiries arrived, open that analysis in its corresponding sources. Google explains that traffic from its AI features is included in overall Web search performance in Search Console. That report and a record of observed answers describe different populations; one does not automatically validate the other.",
          ],
          references: [
            {
              title: "Google Search Central: AI features and your website",
              url: "https://developers.google.com/search/docs/appearance/ai-features",
            },
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: AI features and your website",
          url: "https://developers.google.com/search/docs/appearance/ai-features",
        },
        {
          title: "Google Search Central: how Search works",
          url: "https://developers.google.com/search/docs/fundamentals/how-search-works",
        },
        {
          title: "OpenAI: crawlers and search agents",
          url: "https://platform.openai.com/docs/bots",
        },
      ],
      related: ["visibility-guide", "mentions-citations-visits"],
      product: "analytics",
      cover: {
        alt: "Two equally sized yellow disks sit inside black frames of different sizes.",
        caption:
          "KAIRUM editorial illustration · the same observation changes meaning when its frame changes.",
      },
      takeaways: [
        "Read counts and coverage alongside the percentage.",
        "Compare compatible conditions and questions.",
        "Turn each finding into a hypothesis and a next step.",
      ],
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
      sources: [
        {
          title: "Google Search Central: AI features and your website",
          url: "https://developers.google.com/search/docs/appearance/ai-features",
        },
        {
          title: "OpenAI: crawlers and search agents",
          url: "https://platform.openai.com/docs/bots",
        },
        {
          title: "Cloudflare Web Analytics: what web analytics measures",
          url: "https://developers.cloudflare.com/web-analytics/about/",
        },
      ],
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
      sources: [
        {
          title: "Google Search Central: AI features and your website",
          url: "https://developers.google.com/search/docs/appearance/ai-features",
        },
        {
          title: "OpenAI: crawlers and search agents",
          url: "https://platform.openai.com/docs/bots",
        },
        {
          title: "Cloudflare Web Analytics: what web analytics measures",
          url: "https://developers.cloudflare.com/web-analytics/about/",
        },
      ],
      related: ["visibility-guide", "interpreting-results"],
      product: "report",
    },
  },
};
