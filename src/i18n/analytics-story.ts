import type { Locale } from "./locales";

export interface AnalyticsStoryCopy {
  name: string;
  disclosure: string;
  scope: string;
  navigation: string;
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
    disclosure: "Ejemplo ilustrativo · datos sintéticos",
    scope:
      "Estas vistas ilustran el recorrido de Analytics. Los datos, las respuestas y las fuentes son ficticios; no representan resultados de clientes ni una integración activa.",
    navigation: "Explorar las tres vistas de Analytics",
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
    sample: "100 respuestas por lectura, en este ejemplo.",
    readings: "Lecturas del ejemplo",
    reading: "Lectura",
    periods: ["7 lecturas", "14 lecturas"],
    comparison: "Comparar marcas",
    chart: "Evolución ilustrativa de presencia de Tu marca y sus competidores",
    data: "Ver los datos del ejemplo",
    visibility: "Presencia al cierre",
    ranking: "Comparación al cierre",
    closing:
      "38 de 100 respuestas mencionan Tu marca en la última lectura de ejemplo.",
    overlap: "Una respuesta puede mencionar más de una marca.",
    sentimentTitle: "Las narrativas, en detalle",
    sentimentTrend: "Cómo evoluciona el tono",
    sentimentTrendContext:
      "Porcentaje de menciones positivas en siete lecturas ilustrativas de Tu marca.",
    sentimentSample: "100 menciones ficticias, agrupadas en cinco temas.",
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
          "La respuesta valora la simplicidad. Es una lectura de ejemplo, no una evaluación de calidad del producto.",
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
          "La página de producto describe las funciones de Tu marca, sin aportar en este ejemplo una evaluación independiente.",
        interpretation:
          "La existencia de una fuente no demuestra por sí misma confianza ni preferencia.",
      },
    ],
    response: "Respuesta ilustrativa",
    interpretation: "Cómo leerla",
    source: "Fuente de ejemplo",
    sourcesTitle: "Las fuentes citadas",
    sourcesSample:
      "100 citas ficticias. Abrí un dominio para explorar su contexto.",
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
          "Página de producto ficticia: describe briefs, comentarios y revisiones por proyecto.",
      },
      {
        domain: "medio-a.example",
        description:
          "Artículo editorial ficticio sobre herramientas de coordinación de equipos.",
      },
      {
        domain: "comparador.example",
        description:
          "Comparativa ficticia de alternativas. Una cita no implica recomendación.",
      },
      {
        domain: "comunidad.example",
        description:
          "Conversación ficticia sobre el trabajo de diseño en equipo.",
      },
      {
        domain: "medio-b.example",
        description:
          "Guía ficticia sobre el seguimiento de revisiones y entregables.",
      },
      {
        domain: "competidor-a.example",
        description:
          "Página ficticia de otra marca que aparece en las respuestas del ejemplo.",
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
    pageSample: "Distribución de las 32 citas ficticias al dominio propio.",
  },
  en: {
    name: "Analytics",
    disclosure: "Illustrative example · synthetic data",
    scope:
      "These views illustrate the Analytics journey. All data, responses and sources are fictional; they represent neither client results nor an active integration.",
    navigation: "Explore the three Analytics views",
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
    sample: "100 responses per reading in this example.",
    readings: "Example readings",
    reading: "Reading",
    periods: ["7 readings", "14 readings"],
    comparison: "Compare brands",
    chart: "Illustrative presence trends for Your brand and its competitors",
    data: "View the example data",
    visibility: "Presence at close",
    ranking: "Comparison at close",
    closing:
      "38 of 100 responses mention Your brand in the last example reading.",
    overlap: "An answer can mention more than one brand.",
    sentimentTitle: "Narratives in detail",
    sentimentTrend: "How the tone evolves",
    sentimentTrendContext:
      "Share of positive mentions in seven illustrative readings of Your brand.",
    sentimentSample: "100 fictional mentions, grouped into five topics.",
    topic: "Topic",
    mentions: "Mentions",
    tone: "Tone distribution",
    tones: ["Positive", "Neutral", "Negative"],
    topics: [
      {
        name: "Ease of use",
        response:
          "Your brand brings briefs, comments and reviews together with straightforward navigation.",
        interpretation:
          "The response values simplicity. This is an example reading, not a product-quality assessment.",
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
          "The product page describes Your brand's features without an independent assessment in this example.",
        interpretation:
          "A source's existence alone does not establish trust or preference.",
      },
    ],
    response: "Illustrative response",
    interpretation: "How to read it",
    source: "Example source",
    sourcesTitle: "Cited sources",
    sourcesSample:
      "100 fictional citations. Open a domain to explore its context.",
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
          "Fictional product page describing briefs, comments and project reviews.",
      },
      {
        domain: "media-a.example",
        description: "Fictional editorial article on team coordination tools.",
      },
      {
        domain: "comparison.example",
        description:
          "Fictional comparison of alternatives. A citation does not imply endorsement.",
      },
      {
        domain: "community.example",
        description: "Fictional discussion of collaborative design work.",
      },
      {
        domain: "media-b.example",
        description: "Fictional guide to tracking reviews and deliverables.",
      },
      {
        domain: "competitor-a.example",
        description:
          "Fictional page from another brand appearing in the example responses.",
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
    pageSample:
      "Distribution of the 32 fictional citations to the owned domain.",
  },
  "pt-br": {
    name: "Analytics",
    disclosure: "Exemplo ilustrativo · dados sintéticos",
    scope:
      "Estas telas ilustram o percurso do Analytics. Os dados, as respostas e as fontes são fictícios; não representam resultados de clientes nem uma integração ativa.",
    navigation: "Explorar as três visões do Analytics",
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
    sample: "100 respostas por leitura, neste exemplo.",
    readings: "Leituras do exemplo",
    reading: "Leitura",
    periods: ["7 leituras", "14 leituras"],
    comparison: "Comparar marcas",
    chart: "Evolução ilustrativa da presença de Sua marca e seus concorrentes",
    data: "Ver os dados do exemplo",
    visibility: "Presença ao final",
    ranking: "Comparação ao final",
    closing:
      "38 de 100 respostas mencionam Sua marca na última leitura do exemplo.",
    overlap: "Uma resposta pode mencionar mais de uma marca.",
    sentimentTitle: "As narrativas em detalhe",
    sentimentTrend: "Como o tom evolui",
    sentimentTrendContext:
      "Percentual de menções positivas em sete leituras ilustrativas de Sua marca.",
    sentimentSample: "100 menções fictícias, agrupadas em cinco temas.",
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
          "A resposta valoriza a simplicidade. É uma leitura de exemplo, não uma avaliação de qualidade do produto.",
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
          "A página do produto descreve as funções de Sua marca, sem uma avaliação independente neste exemplo.",
        interpretation:
          "A existência de uma fonte, por si só, não demonstra confiança nem preferência.",
      },
    ],
    response: "Resposta ilustrativa",
    interpretation: "Como interpretar",
    source: "Fonte do exemplo",
    sourcesTitle: "As fontes citadas",
    sourcesSample:
      "100 citações fictícias. Abra um domínio para explorar seu contexto.",
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
          "Página fictícia do produto: descreve briefs, comentários e revisões por projeto.",
      },
      {
        domain: "midia-a.example",
        description:
          "Artigo editorial fictício sobre ferramentas de coordenação de equipes.",
      },
      {
        domain: "comparador.example",
        description:
          "Comparação fictícia de alternativas. Uma citação não implica recomendação.",
      },
      {
        domain: "comunidade.example",
        description: "Conversa fictícia sobre o trabalho de design em equipe.",
      },
      {
        domain: "midia-b.example",
        description:
          "Guia fictício sobre o acompanhamento de revisões e entregas.",
      },
      {
        domain: "concorrente-a.example",
        description:
          "Página fictícia de outra marca que aparece nas respostas do exemplo.",
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
    pageSample: "Distribuição das 32 citações fictícias ao domínio próprio.",
  },
};
