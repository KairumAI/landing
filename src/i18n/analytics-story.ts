import type { Locale } from "./locales";

export interface AnalyticsStoryCopy {
  name: string;
  scope: string;
  navigation: string;
  preview: string;
  actions: readonly [string, string, string];
  views: readonly [string, string, string];
  headings: readonly [string, string, string];
  descriptions: readonly [string, string, string];
  brand: string;
  competitor: string;
  sample: string;
  readings: string;
  reading: string;
  periods: readonly [string, string];
  comparison: string;
  chart: string;
  data: string;
  visibility: string;
  ranking: string;
  closing: string;
  overlap: string;
  sentimentTitle: string;
  sentimentTrend: string;
  sentimentTrendContext: string;
  sentimentSample: string;
  topic: string;
  mentions: string;
  tone: string;
  tones: readonly [string, string, string];
  topics: readonly { name: string; response: string; interpretation: string }[];
  response: string;
  interpretation: string;
  source: string;
  sourcesTitle: string;
  sourcesSample: string;
  sourceViews: readonly [string, string];
  domain: string;
  page: string;
  kind: string;
  citations: string;
  share: string;
  own: string;
  editorial: string;
  comparisonKind: string;
  community: string;
  sources: readonly { domain: string; description: string }[];
  pages: readonly { path: string; description: string }[];
  pageSample: string;
}

export const analyticsStoryCopy: Record<Locale, AnalyticsStoryCopy> = {
  es: {
    name: "Analytics",
    scope: "Vista de producto con cifras, marcas y fuentes ilustrativas.",
    navigation: "Explorar las tres vistas de Analytics",
    preview: "Vista previa de Analytics",
    actions: [
      "Medí tu presencia",
      "Analizá las narrativas",
      "Explorá las citas",
    ],
    views: ["Presencia", "Sentimiento", "Citas"],
    headings: [
      "Conocé tu lugar en las respuestas.",
      "Entendé las narrativas sobre tu marca.",
      "Descubrí las fuentes detrás de cada respuesta.",
    ],
    descriptions: [
      "Compará tu presencia con otras marcas y seguí cómo cambia entre lecturas.",
      "Explorá los temas que se repiten y el tono con el que la IA te describe.",
      "Conectá las menciones con los dominios y las páginas que aparecen como referencia.",
    ],
    brand: "Tu marca",
    competitor: "Competidor",
    sample: "100 respuestas por lectura.",
    readings: "Período de análisis",
    reading: "Lectura",
    periods: ["7 lecturas", "14 lecturas"],
    comparison: "Comparar marcas",
    chart: "Evolución ilustrativa de presencia de Tu marca y sus competidores",
    data: "Ver los datos",
    visibility: "Presencia al cierre",
    ranking: "Comparación al cierre",
    closing: "38 de 100 respuestas mencionan Tu marca en la última lectura.",
    overlap: "Una respuesta puede mencionar más de una marca.",
    sentimentTitle: "Las narrativas, en detalle",
    sentimentTrend: "Cómo evoluciona el tono",
    sentimentTrendContext: "Evolución de las menciones positivas de Tu marca.",
    sentimentSample: "Distribución de 100 menciones en cinco temas.",
    topic: "Tema",
    mentions: "Menciones",
    tone: "Distribución del tono",
    tones: ["Positivo", "Neutral", "Negativo"],
    topics: [
      {
        name: "Facilidad de uso",
        response:
          "Tu marca reúne briefs, comentarios y revisiones en un mismo lugar, con una navegación sencilla.",
        interpretation:
          "La respuesta valora la simplicidad y la organización del trabajo.",
      },
      {
        name: "Configuración inicial",
        response:
          "Tu marca permite organizar proyectos, aunque la configuración de permisos puede requerir acompañamiento.",
        interpretation:
          "Conviven una descripción funcional y una reserva sobre la puesta en marcha.",
      },
      {
        name: "Soporte al cliente",
        response:
          "La documentación de Tu marca orienta los primeros pasos. La respuesta no especifica tiempos de atención.",
        interpretation:
          "La descripción aporta contexto, pero no permite concluir cómo responde el equipo de soporte.",
      },
      {
        name: "Relación precio-valor",
        response:
          "Tu marca puede ser una opción para equipos que necesitan centralizar revisiones. Conviene contrastar el alcance de cada plan.",
        interpretation:
          "La recomendación es condicional: no establece una ventaja de precio frente a otras marcas.",
      },
      {
        name: "Confianza",
        response:
          "La página de producto describe las funciones de Tu marca sin aportar una evaluación independiente.",
        interpretation:
          "La existencia de una fuente no demuestra por sí misma confianza ni preferencia.",
      },
    ],
    response: "Respuesta analizada",
    interpretation: "Cómo leerla",
    source: "Explorar las fuentes",
    sourcesTitle: "Las fuentes citadas",
    sourcesSample: "Dominios utilizados como referencia en 100 citas.",
    sourceViews: ["Dominios", "Páginas propias"],
    domain: "Dominio",
    page: "Página",
    kind: "Tipo",
    citations: "Citas",
    share: "Participación",
    own: "Propio",
    editorial: "Editorial",
    comparisonKind: "Comparador",
    community: "Comunidad",
    sources: [
      {
        domain: "tumarca.example",
        description:
          "Página de producto: describe briefs, comentarios y revisiones por proyecto.",
      },
      {
        domain: "medio-a.example",
        description:
          "Artículo editorial sobre herramientas de coordinación de equipos.",
      },
      {
        domain: "comparador.example",
        description:
          "Comparativa de alternativas. Una cita no implica recomendación.",
      },
      {
        domain: "comunidad.example",
        description: "Conversación sobre el trabajo de diseño en equipo.",
      },
      {
        domain: "medio-b.example",
        description: "Guía sobre el seguimiento de revisiones y entregables.",
      },
      {
        domain: "competidor-a.example",
        description: "Página de otra marca citada en las respuestas.",
      },
    ],
    pages: [
      { path: "/producto", description: "Funciones y alcance del producto." },
      {
        path: "/guia-de-revisiones",
        description: "Cómo organizar revisiones por proyecto.",
      },
      {
        path: "/preguntas-frecuentes",
        description: "Preguntas habituales sobre la herramienta.",
      },
    ],
    pageSample: "Distribución de las 32 citas al dominio propio.",
  },
  en: {
    name: "Analytics",
    scope: "Product view with illustrative figures, brands and sources.",
    navigation: "Explore the three Analytics views",
    preview: "Analytics preview",
    actions: [
      "Measure your presence",
      "Analyze the narratives",
      "Explore the citations",
    ],
    views: ["Presence", "Sentiment", "Citations"],
    headings: [
      "See your place in AI answers.",
      "Understand the narratives about your brand.",
      "Discover the sources behind each answer.",
    ],
    descriptions: [
      "Compare your presence with other brands and follow how it changes between readings.",
      "Explore recurring topics and the tone AI uses to describe your brand.",
      "Connect mentions with the domains and pages cited as references.",
    ],
    brand: "Your brand",
    competitor: "Competitor",
    sample: "100 answers per reading.",
    readings: "Analysis period",
    reading: "Reading",
    periods: ["7 readings", "14 readings"],
    comparison: "Compare brands",
    chart: "Illustrative presence trends for Your brand and its competitors",
    data: "View the data",
    visibility: "Presence at close",
    ranking: "Comparison at close",
    closing: "38 of 100 answers mention Your brand in the latest reading.",
    overlap: "An answer can mention more than one brand.",
    sentimentTitle: "Narratives in detail",
    sentimentTrend: "How the tone evolves",
    sentimentTrendContext: "How positive mentions of Your brand evolve.",
    sentimentSample: "Distribution of 100 mentions across five topics.",
    topic: "Topic",
    mentions: "Mentions",
    tone: "Tone distribution",
    tones: ["Positive", "Neutral", "Negative"],
    topics: [
      {
        name: "Ease of use",
        response:
          "Your brand brings briefs, comments and reviews together with straightforward navigation.",
        interpretation: "The response values simplicity and work organization.",
      },
      {
        name: "Initial setup",
        response:
          "Your brand helps organize projects, although setting up permissions may require guidance.",
        interpretation:
          "A functional description appears alongside a reservation about getting started.",
      },
      {
        name: "Customer support",
        response:
          "Your brand's documentation guides the first steps. The response does not specify support response times.",
        interpretation:
          "The description provides context without establishing how the support team performs.",
      },
      {
        name: "Value for money",
        response:
          "Your brand may suit teams that need to centralize reviews. Each plan's scope should be checked.",
        interpretation:
          "The recommendation is conditional and does not establish a price advantage over other brands.",
      },
      {
        name: "Trust",
        response:
          "The product page describes Your brand's features without an independent assessment.",
        interpretation:
          "A source's existence alone does not establish trust or preference.",
      },
    ],
    response: "Analyzed answer",
    interpretation: "How to read it",
    source: "Explore the sources",
    sourcesTitle: "Cited sources",
    sourcesSample: "Domains referenced across 100 citations.",
    sourceViews: ["Domains", "Own pages"],
    domain: "Domain",
    page: "Page",
    kind: "Type",
    citations: "Citations",
    share: "Share",
    own: "Own",
    editorial: "Editorial",
    comparisonKind: "Comparison",
    community: "Community",
    sources: [
      {
        domain: "yourbrand.example",
        description:
          "Product page describing briefs, comments and project reviews.",
      },
      {
        domain: "media-a.example",
        description: "Editorial article on team coordination tools.",
      },
      {
        domain: "comparison.example",
        description:
          "Comparison of alternatives. A citation does not imply endorsement.",
      },
      {
        domain: "community.example",
        description: "Discussion of collaborative design work.",
      },
      {
        domain: "media-b.example",
        description: "Guide to tracking reviews and deliverables.",
      },
      {
        domain: "competitor-a.example",
        description:
          "Page from another brand appearing in the analyzed answers.",
      },
    ],
    pages: [
      { path: "/product", description: "Product features and scope." },
      { path: "/review-guide", description: "Organizing project reviews." },
      {
        path: "/frequently-asked-questions",
        description: "Common questions about the tool.",
      },
    ],
    pageSample: "Distribution of the 32 citations to the owned domain.",
  },
  "pt-br": {
    name: "Analytics",
    scope: "Visão do produto com números, marcas e fontes ilustrativos.",
    navigation: "Explorar as três visões do Analytics",
    preview: "Prévia do Analytics",
    actions: [
      "Meça sua presença",
      "Analise as narrativas",
      "Explore as citações",
    ],
    views: ["Presença", "Sentimento", "Citações"],
    headings: [
      "Conheça seu lugar nas respostas.",
      "Entenda as narrativas sobre sua marca.",
      "Descubra as fontes por trás de cada resposta.",
    ],
    descriptions: [
      "Compare sua presença com outras marcas e acompanhe as mudanças entre leituras.",
      "Explore os temas recorrentes e o tom com que a IA descreve sua marca.",
      "Conecte as menções aos domínios e às páginas citados como referência.",
    ],
    brand: "Sua marca",
    competitor: "Concorrente",
    sample: "100 respostas por leitura.",
    readings: "Período de análise",
    reading: "Leitura",
    periods: ["7 leituras", "14 leituras"],
    comparison: "Comparar marcas",
    chart: "Evolução ilustrativa da presença de Sua marca e seus concorrentes",
    data: "Ver os dados",
    visibility: "Presença ao final",
    ranking: "Comparação ao final",
    closing: "38 de 100 respostas mencionam Sua marca na última leitura.",
    overlap: "Uma resposta pode mencionar mais de uma marca.",
    sentimentTitle: "As narrativas em detalhe",
    sentimentTrend: "Como o tom evolui",
    sentimentTrendContext: "Evolução das menções positivas à Sua marca.",
    sentimentSample: "Distribuição de 100 menções em cinco temas.",
    topic: "Tema",
    mentions: "Menções",
    tone: "Distribuição do tom",
    tones: ["Positivo", "Neutro", "Negativo"],
    topics: [
      {
        name: "Facilidade de uso",
        response:
          "Sua marca reúne briefs, comentários e revisões no mesmo lugar, com navegação simples.",
        interpretation:
          "A resposta valoriza a simplicidade e a organização do trabalho.",
      },
      {
        name: "Configuração inicial",
        response:
          "Sua marca permite organizar projetos, embora configurar permissões possa exigir orientação.",
        interpretation:
          "Uma descrição funcional aparece junto de uma ressalva sobre a configuração.",
      },
      {
        name: "Atendimento ao cliente",
        response:
          "A documentação de Sua marca orienta os primeiros passos. A resposta não especifica prazos de atendimento.",
        interpretation:
          "A descrição traz contexto, mas não permite concluir como a equipe de atendimento responde.",
      },
      {
        name: "Relação custo-benefício",
        response:
          "Sua marca pode servir a equipes que precisam centralizar revisões. Convém conferir o escopo de cada plano.",
        interpretation:
          "A recomendação é condicional e não estabelece vantagem de preço sobre outras marcas.",
      },
      {
        name: "Confiança",
        response:
          "A página do produto descreve as funções de Sua marca, sem uma avaliação independente.",
        interpretation:
          "A existência de uma fonte, por si só, não demonstra confiança nem preferência.",
      },
    ],
    response: "Resposta analisada",
    interpretation: "Como interpretar",
    source: "Explorar as fontes",
    sourcesTitle: "As fontes citadas",
    sourcesSample: "Domínios utilizados como referência em 100 citações.",
    sourceViews: ["Domínios", "Páginas próprias"],
    domain: "Domínio",
    page: "Página",
    kind: "Tipo",
    citations: "Citações",
    share: "Participação",
    own: "Próprio",
    editorial: "Editorial",
    comparisonKind: "Comparador",
    community: "Comunidade",
    sources: [
      {
        domain: "suamarca.example",
        description:
          "Página do produto: descreve briefs, comentários e revisões por projeto.",
      },
      {
        domain: "midia-a.example",
        description:
          "Artigo editorial sobre ferramentas de coordenação de equipes.",
      },
      {
        domain: "comparador.example",
        description:
          "Comparação de alternativas. Uma citação não implica recomendação.",
      },
      {
        domain: "comunidade.example",
        description: "Conversa sobre o trabalho de design em equipe.",
      },
      {
        domain: "midia-b.example",
        description: "Guia sobre o acompanhamento de revisões e entregas.",
      },
      {
        domain: "concorrente-a.example",
        description:
          "Página de outra marca que aparece nas respostas analisadas.",
      },
    ],
    pages: [
      { path: "/produto", description: "Funções e escopo do produto." },
      {
        path: "/guia-de-revisoes",
        description: "Como organizar revisões por projeto.",
      },
      {
        path: "/perguntas-frequentes",
        description: "Perguntas comuns sobre a ferramenta.",
      },
    ],
    pageSample: "Distribuição das 32 citações ao domínio próprio.",
  },
};
