import type { Locale } from "../locales";
import type { EditorialPage } from "./schema";

const sources = [
  { title: "Fardo — Plans", url: "https://www.heyfardo.com/en/planes" },
  { title: "Cleexs", url: "https://cleexs.net/" },
  {
    title: "Tribu GEO — SEO para IA",
    url: "https://tribugeo.com/servicios/posicionamiento-en-chatgpt/",
  },
  {
    title: "Tribu GEO — Agentes IA",
    url: "https://tribugeo.com/servicios/agentes-ia/",
  },
];
const common = {
  reviewedDate: "2026-10-22",
  related: ["visibility-guide", "choosing-questions", "interpreting-results"],
  product: "report",
} as const;

export const geoComparison = {
  es: {
    ...common,
    related: [...common.related],
    title: "KAIRUM vs. Fardo, Cleexs y Tribu GEO: qué comparar",
    description:
      "Compará cuatro propuestas de visibilidad en IA: alcance, evidencia, contenido y acompañamiento. Criterios para elegir una solución GEO para tu equipo.",
    category: "Guía de compra / GEO",
    summary:
      "Elegir una solución de visibilidad en IA empieza por una decisión: ¿necesitás un diagnóstico, seguimiento periódico o ayuda para ejecutar cambios? Estas cuatro propuestas permiten explorar recorridos distintos.",
    reviewedLabel: "22 de octubre de 2026",
    takeaways: [
      "Compará entregables, fuentes de datos y trabajo incluido antes que puntajes.",
      "Una plataforma y un servicio de implementación resuelven necesidades distintas.",
      "Pedí una demo del alcance que vas a contratar, incluida la intervención humana.",
    ],
    sections: [
      {
        id: "alcance",
        title: "Cómo hicimos esta comparación",
        paragraphs: [
          "Esta guía está escrita por KAIRUM, una de las propuestas comparadas. Revisamos las páginas oficiales enlazadas el 22 de octubre de 2026. Es una comparación documental de ofertas publicadas; no probamos cuentas pagas ni medimos su eficacia. Las recomendaciones de elección son nuestro criterio editorial.",
          "KAIRUM está desarrollando su plataforma. Distinguimos ese alcance de la propuesta de diagnóstico AI Report. Que una función no esté documentada en las fuentes consultadas no demuestra que un proveedor no la tenga. La disponibilidad, los límites y el precio deben confirmarse en cada propuesta comercial.",
        ],
      },
      {
        id: "comparacion",
        title: "Qué propone cada opción",
        paragraphs: [
          "La tabla resume el punto de entrada y una pregunta útil para evaluar cada propuesta. No asigna posiciones ni equipara productos en desarrollo con servicios contratables.",
        ],
        table: {
          columns: [
            "Opción",
            "Propuesta publicada",
            "Qué confirmar en una demo",
          ],
          rows: [
            [
              "Fardo",
              "Plataforma con auditoría y seguimiento. Growth anuncia comparación competitiva, estrategia de contenido y conexión con GA4.",
              "Qué mediciones, frecuencia e implementación incluye el plan elegido.",
            ],
            [
              "Cleexs",
              "Diagnóstico inicial desde la URL, score y comparación con competidores. Anuncia monitoreo y alertas en su oferta paga.",
              "Cómo se construye el score y qué evidencia acompaña cada recomendación.",
            ],
            [
              "Tribu GEO",
              "Servicios de visibilidad en IA, optimización de contenido y seguimiento. También publica servicios de agentes de marketing.",
              "Quién ejecuta los cambios, en qué sistemas y con qué revisión.",
            ],
            [
              "KAIRUM",
              "AI Report propone un diagnóstico con preguntas, respuestas y fuentes. La plataforma que conecta investigación, análisis y acciones está en desarrollo.",
              "Qué entregable puede acordarse hoy y qué funciones siguen previstas.",
            ],
          ],
        },
        references: sources,
      },
      {
        id: "criterios",
        title: "Seis criterios para comparar herramientas GEO",
        paragraphs: [
          "Una lista de funciones ayuda cuando sabés qué vas a hacer con el resultado. Usá estos criterios con todos los proveedores, incluido KAIRUM.",
        ],
        items: [
          "Preguntas: cómo se eligen, qué intención cubren y si parten de consultas reales o de una muestra diseñada.",
          "Medición: qué superficie, país, idioma y período se observan. Una respuesta vía API no equivale a una interacción en ChatGPT UI.",
          "Evidencia: si podés revisar la respuesta, la fecha, la cita visible y las condiciones de la observación.",
          "Acciones: si recibís recomendaciones, borradores o cambios implementados; quién los aprueba y quién los publica.",
          "Tráfico: cómo se distinguen solicitudes de bots, visitas humanas referidas por IA y conversiones atribuibles.",
          "Operación: usuarios, marcas, límites de consumo, exportación, soporte y trabajo humano incluido en el presupuesto.",
        ],
        references: [
          {
            title: "Cómo medir la visibilidad en IA",
            url: "/recursos/como-medir-visibilidad-ia/",
          },
          {
            title: "Menciones, citas y visitas: señales diferentes",
            url: "/blog/menciones-citas-visitas/",
          },
        ],
      },
      {
        id: "elegir",
        title: "Qué opción explorar según tu necesidad",
        paragraphs: [
          "Nuestra lectura de las ofertas: Cleexs es una opción para explorar un diagnóstico inicial desde tu sitio; Fardo, para evaluar una plataforma por planes; Tribu GEO, para conversar sobre ejecución como servicio. Con KAIRUM podés explorar un diagnóstico AI Report con alcance acordado. La elección depende del recorrido demostrado y del trabajo que tu equipo pueda asumir.",
        ],
        references: [
          { title: "Alcance de AI Report", url: "/productos/report/" },
        ],
      },
      {
        id: "prueba",
        title: "Llevá una decisión real a la demo",
        paragraphs: [
          "Elegí una categoría, un país y una pregunta comercial que importe para tu negocio. Por ejemplo, una consulta de comparación de proveedores. Pedí ver el recorrido completo: pregunta, respuesta, fuente, hallazgo y propuesta de cambio. Ese ejercicio permite evaluar la trazabilidad sin confundir una demostración con un resultado conseguido.",
          "Si el próximo paso es mejorar una página, acordá el texto a revisar, quién lo implementa y cuándo se repite la medición. Conservá las condiciones de comparación y documentá también los resultados sin mejora. Un aumento de menciones, por sí solo, no demuestra más ventas ni que el cambio haya sido su causa.",
        ],
        items: [
          "¿Podemos exportar la evidencia?",
          "¿Qué parte del recorrido funciona hoy y cuál requiere integración?",
          "¿Qué recibe nuestro equipo al terminar el primer trabajo?",
        ],
        references: [
          {
            title: "Cómo elegir preguntas para una medición",
            url: "/blog/como-elegir-preguntas/",
          },
        ],
      },
      {
        id: "kairum",
        title: "Por dónde empezar con KAIRUM",
        paragraphs: [
          "AI Report es nuestra propuesta para acordar una muestra, revisar respuestas y fuentes y priorizar hallazgos. Consulting permite conversar sobre acompañamiento y próximos pasos. El alcance se define antes de iniciar el trabajo.",
          "Prompt Intelligence, Analytics, Agents y Traffic describen el recorrido de producto que estamos desarrollando. La recolección automática desde canales de atención y la edición de un sitio o CMS por agentes no se presentan aquí como capacidades operativas. Pedí una demostración del alcance disponible para tu caso.",
        ],
        references: [
          {
            title: "AI Report: diagnóstico de visibilidad en IA",
            url: "/productos/report/",
          },
          {
            title: "Consulting: acompañamiento GEO y AEO",
            url: "/productos/consulting/",
          },
          {
            title: "Analytics: lectura de respuestas y fuentes",
            url: "/productos/analytics/",
          },
          { title: "Metodología y límites", url: "/metodologia/" },
        ],
      },
    ],
    sources: [
      ...sources,
      {
        title: "KAIRUM — Metodología",
        url: "https://kairum.com.ar/metodologia/",
      },
    ],
  },
  en: {
    ...common,
    related: [...common.related],
    title: "KAIRUM vs. Fardo, Cleexs and Tribu GEO: what to compare",
    description:
      "Compare four AI visibility approaches: scope, evidence, content and support. Practical criteria for choosing a GEO solution for your team.",
    category: "Buying guide / GEO",
    summary:
      "Choosing an AI visibility solution starts with a decision: do you need a diagnosis, recurring monitoring or help implementing changes? These four offerings provide different paths to explore.",
    reviewedLabel: "October 22, 2026",
    takeaways: [
      "Compare deliverables, data sources and included work before scores.",
      "A platform and an implementation service address different needs.",
      "Ask for a demo of the scope you would buy, including human involvement.",
    ],
    sections: [
      {
        id: "alcance",
        title: "How we prepared this comparison",
        paragraphs: [
          "This guide is written by KAIRUM, one of the offerings compared. We reviewed the linked official pages on October 22, 2026. This is a documentary comparison of published offerings; we did not test paid accounts or measure effectiveness. The selection advice is our editorial judgment.",
          "KAIRUM is developing its platform. We distinguish that scope from the AI Report diagnostic proposal. A feature missing from the sources reviewed does not prove a provider lacks it. Availability, limits and pricing should be confirmed in each commercial proposal.",
        ],
      },
      {
        id: "comparacion",
        title: "What each option proposes",
        paragraphs: [
          "This table summarizes an entry point and a useful question for evaluating each offering. It does not rank providers or equate products in development with services available to purchase.",
        ],
        table: {
          columns: [
            "Option",
            "Published offering",
            "What to confirm in a demo",
          ],
          rows: [
            [
              "Fardo",
              "A platform with auditing and monitoring. Growth lists competitive comparison, content strategy and a GA4 connection.",
              "Which measurements, frequency and implementation work the chosen plan includes.",
            ],
            [
              "Cleexs",
              "An initial URL-based diagnosis, score and competitor comparison. Its paid offering advertises monitoring and alerts.",
              "How the score is calculated and what evidence supports each recommendation.",
            ],
            [
              "Tribu GEO",
              "AI visibility, content optimization and monitoring services. It also publishes marketing agent services.",
              "Who implements changes, in which systems and with what review.",
            ],
            [
              "KAIRUM",
              "AI Report proposes a diagnosis with questions, answers and sources. The platform connecting research, analysis and actions is in development.",
              "Which deliverable can be agreed today and which features remain planned.",
            ],
          ],
        },
        references: sources,
      },
      {
        id: "criterios",
        title: "Six criteria for comparing GEO tools",
        paragraphs: [
          "A feature list becomes useful when you know how you will use the result. Apply these criteria to every provider, including KAIRUM.",
        ],
        items: [
          "Questions: how they are selected, which intents they cover and whether they come from actual queries or a designed sample.",
          "Measurement: which surface, country, language and period are observed. An API response is not equivalent to a ChatGPT UI interaction.",
          "Evidence: whether you can inspect the response, date, visible citation and observation conditions.",
          "Actions: whether you receive recommendations, drafts or implemented changes; who approves and publishes them.",
          "Traffic: how bot requests, human visits referred by AI and attributable conversions are distinguished.",
          "Operations: users, brands, usage limits, exports, support and human work included in the quote.",
        ],
        references: [
          {
            title: "How to measure AI visibility",
            url: "/recursos/como-medir-visibilidad-ia/",
          },
          {
            title: "Mentions, citations and visits are different signals",
            url: "/blog/menciones-citas-visitas/",
          },
        ],
      },
      {
        id: "elegir",
        title: "Which option to explore for your needs",
        paragraphs: [
          "Our reading of the offerings: Cleexs is an option to explore an initial website diagnosis; Fardo, to evaluate a platform through its plans; Tribu GEO, to discuss implementation as a service. With KAIRUM, you can explore an AI Report diagnosis with an agreed scope. Your choice depends on the demonstrated workflow and the work your team can take on.",
        ],
        references: [{ title: "AI Report scope", url: "/productos/report/" }],
      },
      {
        id: "prueba",
        title: "Bring a real decision to the demo",
        paragraphs: [
          "Choose a category, country and commercial question that matter to your business, such as a provider comparison. Ask to see the full process: question, response, source, finding and proposed change. This exercise helps evaluate traceability without confusing a demonstration with an achieved result.",
          "If the next step is improving a page, agree on the copy to review, who implements it and when measurement will be repeated. Keep comparison conditions consistent and document outcomes without improvement too. More mentions alone do not demonstrate more sales or establish that the change caused them.",
        ],
        items: [
          "Can we export the evidence?",
          "Which parts work today and which require integration?",
          "What will our team receive when the first engagement ends?",
        ],
        references: [
          {
            title: "How to choose questions for measurement",
            url: "/blog/como-elegir-preguntas/",
          },
        ],
      },
      {
        id: "kairum",
        title: "Where to start with KAIRUM",
        paragraphs: [
          "AI Report is our proposal for agreeing on a sample, reviewing answers and sources, and prioritizing findings. Consulting opens a conversation about support and next steps. Scope is defined before work begins.",
          "Prompt Intelligence, Analytics, Agents and Traffic describe the product workflow we are developing. Automatic collection from customer service channels and agent-driven website or CMS editing are not presented here as operational capabilities. Ask for a demonstration of the scope available for your case.",
        ],
        references: [
          {
            title: "AI Report: an AI visibility diagnosis",
            url: "/productos/report/",
          },
          {
            title: "Consulting: GEO and AEO support",
            url: "/productos/consulting/",
          },
          {
            title: "Analytics: reviewing answers and sources",
            url: "/productos/analytics/",
          },
          { title: "Methodology and limitations", url: "/metodologia/" },
        ],
      },
    ],
    sources: [
      ...sources,
      {
        title: "KAIRUM — Methodology",
        url: "https://kairum.com.ar/en/metodologia/",
      },
    ],
  },
  "pt-br": {
    ...common,
    related: [...common.related],
    title: "KAIRUM vs. Fardo, Cleexs e Tribu GEO: o que comparar",
    description:
      "Compare quatro propostas de visibilidade em IA: escopo, evidências, conteúdo e acompanhamento. Critérios para escolher uma solução GEO para sua equipe.",
    category: "Guia de compra / GEO",
    summary:
      "Escolher uma solução de visibilidade em IA começa com uma decisão: você precisa de um diagnóstico, monitoramento periódico ou ajuda para implementar mudanças? Estas quatro propostas permitem explorar caminhos diferentes.",
    reviewedLabel: "22 de outubro de 2026",
    takeaways: [
      "Compare entregáveis, fontes de dados e trabalho incluído antes das pontuações.",
      "Uma plataforma e um serviço de implementação atendem a necessidades diferentes.",
      "Peça uma demonstração do escopo que pretende contratar, incluindo a participação humana.",
    ],
    sections: [
      {
        id: "alcance",
        title: "Como preparamos esta comparação",
        paragraphs: [
          "Este guia foi escrito pela KAIRUM, uma das propostas comparadas. Revisamos as páginas oficiais vinculadas em 22 de outubro de 2026. É uma comparação documental de ofertas publicadas; não testamos contas pagas nem medimos sua eficácia. As recomendações de escolha refletem nosso critério editorial.",
          "A KAIRUM está desenvolvendo sua plataforma. Diferenciamos esse escopo da proposta de diagnóstico AI Report. Uma função não documentada nas fontes consultadas não comprova que um fornecedor não a tenha. Disponibilidade, limites e preço devem ser confirmados em cada proposta comercial.",
        ],
      },
      {
        id: "comparacion",
        title: "O que cada opção propõe",
        paragraphs: [
          "A tabela resume o ponto de entrada e uma pergunta útil para avaliar cada proposta. Não classifica fornecedores nem equipara produtos em desenvolvimento a serviços disponíveis para contratação.",
        ],
        table: {
          columns: [
            "Opção",
            "Proposta publicada",
            "O que confirmar na demonstração",
          ],
          rows: [
            [
              "Fardo",
              "Plataforma com auditoria e monitoramento. Growth anuncia comparação competitiva, estratégia de conteúdo e conexão com GA4.",
              "Quais medições, frequência e atividades de implementação o plano escolhido inclui.",
            ],
            [
              "Cleexs",
              "Diagnóstico inicial pela URL, pontuação e comparação com concorrentes. Anuncia monitoramento e alertas na oferta paga.",
              "Como a pontuação é calculada e quais evidências acompanham cada recomendação.",
            ],
            [
              "Tribu GEO",
              "Serviços de visibilidade em IA, otimização de conteúdo e monitoramento. Também publica serviços de agentes de marketing.",
              "Quem implementa as mudanças, em quais sistemas e com qual revisão.",
            ],
            [
              "KAIRUM",
              "AI Report propõe um diagnóstico com perguntas, respostas e fontes. A plataforma que conecta pesquisa, análise e ações está em desenvolvimento.",
              "Qual entregável pode ser acordado hoje e quais funções continuam previstas.",
            ],
          ],
        },
        references: sources,
      },
      {
        id: "criterios",
        title: "Seis critérios para comparar ferramentas GEO",
        paragraphs: [
          "Uma lista de funções ajuda quando você sabe como usará o resultado. Aplique estes critérios a todos os fornecedores, incluindo a KAIRUM.",
        ],
        items: [
          "Perguntas: como são escolhidas, quais intenções cobrem e se vêm de consultas reais ou de uma amostra planejada.",
          "Medição: qual superfície, país, idioma e período são observados. Uma resposta via API não equivale a uma interação na interface do ChatGPT.",
          "Evidência: se é possível revisar a resposta, a data, a citação visível e as condições da observação.",
          "Ações: se você recebe recomendações, rascunhos ou mudanças implementadas; quem aprova e quem publica.",
          "Tráfego: como são diferenciadas solicitações de bots, visitas humanas vindas de IA e conversões atribuíveis.",
          "Operação: usuários, marcas, limites de consumo, exportação, suporte e trabalho humano incluído no orçamento.",
        ],
        references: [
          {
            title: "Como medir a visibilidade em IA",
            url: "/recursos/como-medir-visibilidad-ia/",
          },
          {
            title: "Menções, citações e visitas: sinais diferentes",
            url: "/blog/menciones-citas-visitas/",
          },
        ],
      },
      {
        id: "elegir",
        title: "Qual opção explorar conforme sua necessidade",
        paragraphs: [
          "Nossa leitura das ofertas: Cleexs é uma opção para explorar um diagnóstico inicial do site; Fardo, para avaliar uma plataforma por planos; Tribu GEO, para conversar sobre implementação como serviço. Com a KAIRUM, você pode explorar um diagnóstico AI Report com escopo acordado. A escolha depende do fluxo demonstrado e do trabalho que sua equipe pode assumir.",
        ],
        references: [
          { title: "Escopo do AI Report", url: "/productos/report/" },
        ],
      },
      {
        id: "prueba",
        title: "Leve uma decisão real para a demonstração",
        paragraphs: [
          "Escolha uma categoria, um país e uma pergunta comercial importante para seu negócio, como uma comparação de fornecedores. Peça para ver o percurso completo: pergunta, resposta, fonte, descoberta e mudança proposta. Esse exercício ajuda a avaliar a rastreabilidade sem confundir uma demonstração com um resultado obtido.",
          "Se o próximo passo for melhorar uma página, combine o texto a revisar, quem o implementará e quando a medição será repetida. Mantenha as condições de comparação e documente também resultados sem melhoria. Mais menções, por si só, não demonstram mais vendas nem comprovam que a mudança foi sua causa.",
        ],
        items: [
          "Podemos exportar as evidências?",
          "O que funciona hoje e o que exige integração?",
          "O que nossa equipe receberá ao terminar o primeiro trabalho?",
        ],
        references: [
          {
            title: "Como escolher perguntas para uma medição",
            url: "/blog/como-elegir-preguntas/",
          },
        ],
      },
      {
        id: "kairum",
        title: "Por onde começar com a KAIRUM",
        paragraphs: [
          "AI Report é nossa proposta para definir uma amostra, revisar respostas e fontes e priorizar descobertas. Consulting permite conversar sobre acompanhamento e próximos passos. O escopo é definido antes de iniciar o trabalho.",
          "Prompt Intelligence, Analytics, Agents e Traffic descrevem o percurso de produto que estamos desenvolvendo. A coleta automática de canais de atendimento e a edição de sites ou CMS por agentes não são apresentadas aqui como capacidades operacionais. Peça uma demonstração do escopo disponível para seu caso.",
        ],
        references: [
          {
            title: "AI Report: diagnóstico de visibilidade em IA",
            url: "/productos/report/",
          },
          {
            title: "Consulting: acompanhamento GEO e AEO",
            url: "/productos/consulting/",
          },
          {
            title: "Analytics: leitura de respostas e fontes",
            url: "/productos/analytics/",
          },
          { title: "Metodologia e limites", url: "/metodologia/" },
        ],
      },
    ],
    sources: [
      ...sources,
      {
        title: "KAIRUM — Metodologia",
        url: "https://kairum.com.ar/pt-br/metodologia/",
      },
    ],
  },
} satisfies Record<Locale, EditorialPage>;
