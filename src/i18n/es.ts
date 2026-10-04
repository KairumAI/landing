import type { Dictionary } from "./types";

export const es: Dictionary = {
  meta: {
    siteName: "KAIRUM",
    title: "KAIRUM · Visibilidad de marca en IA",
    description:
      "Entendé cómo aparece tu marca en respuestas de IA. KAIRUM conecta consultas, fuentes y revisión humana en un informe para orientar las decisiones de tu equipo.",
    ogImageAlt: "KAIRUM. Una pregunta. Todo un mapa de oportunidades.",
  },
  skipLink: "Ir al contenido",
  book: {
    label: "Hablemos",
    newTab: "(se abre en una pestaña nueva)",
  },
  header: {
    brandLabel: "KAIRUM, inicio",
    navLabel: "Principal",
    how: "Cómo funciona",
    who: "Para quién",
    report: "El informe",
    faq: "Preguntas frecuentes",
    mobileLabel: "Menú móvil",
  },
  hero: {
    eyebrow: "VISIBILIDAD DE MARCA EN IA",
    titleFirst: "Una pregunta.",
    titleSecond: "Todo un mapa de ",
    titleHighlight: "oportunidades.",
    intro:
      "Entendé cómo la IA describe tu marca, qué fuentes cita y qué información conviene revisar. KAIRUM conecta las respuestas con decisiones para tu equipo.",
    how: "Mirá cómo funciona",
    proof: ["Mirá las respuestas", "Seguí las fuentes", "Decidí qué sigue"],
    visualLabel: "Demostración animada de una consulta y sus respuestas",
    providerNames: ["OpenAI API", "Gemini API", "Claude API"],
    console: "Una consulta, más contexto.",
    initialStatus: "Preparando consulta",
    exampleLabel: "Ejemplo ilustrativo",
    screenReaderAnswer:
      "Ejemplo ficticio: Norte aparece por su control de stock, pero sus integraciones quedan por verificar.",
    sourcesLabel: "Fuentes de esta respuesta",
    sourceDomains: ["norte.example", "sector.example"],
    resultTitle: "Aparece por su control de stock.",
    resultDetail: "Las integraciones quedan por verificar.",
    nextStepLabel: "Tu próximo paso",
    nextStep: "Aclarar las integraciones en la web",
    demoNote: "Norte · Marca ficticia del ejemplo",
    replayLabel: "Repetir demostración",
    replay: "Repetir",
  },
  context: {
    title: ["La decisión puede empezar", "mucho antes de tu web."],
    intro:
      "Alguien pregunta. La IA compara, describe y recomienda. KAIRUM te ayuda a ver qué lugar ocupa tu marca en esa conversación.",
    questionsLabel: "Ejemplos de preguntas sobre una categoría",
    questions: [
      "¿Qué opción me conviene?",
      "¿En qué se diferencian?",
      "¿Qué marca recomendarías?",
      "¿Dónde puedo saber más?",
    ],
  },
  journey: {
    eyebrow: "EL RECORRIDO",
    title: ["Mirá lo que pasa", "después de preguntar."],
    intro: [
      "Una consulta se convierte en respuestas,",
      "fuentes y una lectura para decidir.",
    ],
    navLabel: "Etapas del recorrido",
    steps: ["Pregunta", "Modelos", "Patrones", "Revisión", "Informe"],
    caseLabel: "Norte · Software de inventario · Marca ficticia",
    question: ["¿Qué software de inventario", "conviene a una pyme?"],
    options: ["Inventario", "Pymes", "Integraciones"],
    questionNote: "El contexto de la pregunta cambia lo que podemos aprender.",
    networkQuery: ["Una consulta", "Inventario para pymes."],
    networkNotes: [
      "Explorando una respuesta",
      "Otra perspectiva",
      "Su propia forma de responder",
    ],
    networkNote:
      "Una pregunta viaja por distintos modelos. Cada respuesta puede ser diferente.",
    exampleAnswers: [
      "Para controlar stock en tiempo real, Norte es una alternativa. Revisá si incluye las integraciones que necesita tu equipo.",
      "Norte presenta funciones de inventario para pymes. La información sobre sus integraciones no es suficiente para elegir.",
      "Compará el control de stock y las integraciones de Norte con tu operación antes de decidir.",
    ],
    answerSources: ["norte.example", "sector.example", "guia.example"],
    answersNote:
      "Un patrón en las respuestas: el stock se entiende; las integraciones dejan dudas.",
    responseLabel: "RESPUESTA",
    evidenceAnswer: [
      "“",
      " permite controlar stock, pero conviene revisar las integraciones.”",
    ],
    evidenceSource: "norte.example / producto",
    evidenceTitle: "Qué dice la fuente.",
    evidenceExcerpt: [
      "Norte permite ",
      "ver el stock en tiempo real y registrar movimientos",
      " en una sola plataforma.",
    ],
    reviewChip: "Revisión humana: la fuente no confirma integraciones.",
    evidenceNote:
      "Conectamos la respuesta con la fuente y revisamos qué sostiene realmente.",
    reportOrbit: ["Patrón detectado", "Fuente revisada", "Próximos pasos"],
    exampleLabel: "Ejemplo ilustrativo",
    reportTitle: ["Una lectura clara.", "Para la próxima decisión."],
    foundLabel: "Lo que encontramos",
    found:
      "Norte aparece por su control de stock. Las integraciones dejan una pregunta abierta.",
    reviewLabel: "Lo que conviene revisar",
    review: "Explicar las integraciones disponibles en la web.",
    reportNote:
      "El recorrido termina en algo que tu equipo puede conversar y usar.",
    scrollHint: "Avanzá con scroll o elegí una etapa",
    fictionalCase: "Caso ficticio: Norte",
  },
  answers: {
    eyebrow: "DISTINTAS PERSPECTIVAS",
    title: ["Una misma pregunta.", "Distintas maneras", "de contar tu marca."],
    intro:
      "La mención es solo una parte. Importan las palabras, las alternativas y el contexto en el que aparecés.",
    selectLabel: "Elegir respuesta de ejemplo",
    providerButtons: ["OpenAI API", "Gemini", "Claude"],
    apiNote: "Respuestas ilustrativas de modelos vía API.",
    exampleLabel: "Ejemplo ilustrativo",
    changeLabel: "Lo que cambia",
  },
  patterns: {
    eyebrow: "EL MAPA DE CONVERSACIONES",
    title: ["El lugar cambia", "con la pregunta."],
    intro: [
      "Explorar una categoría, comparar alternativas",
      "y elegir una solución son conversaciones distintas.",
    ],
    controlsLabel: "Cambiar intención de las preguntas",
    intents: ["Explorar", "Comparar", "Elegir"],
    exampleLabel: "Ejemplo ilustrativo",
    focusLabel: "LA PREGUNTA CAMBIA EL FOCO",
    matrixLabel: "Matriz ilustrativa de conversaciones por modelo",
    conversationLabel: "Conversación",
  },
  sources: {
    followLabel: "Seguí la evidencia",
    exampleLabel: "Ejemplo ilustrativo",
    selectLabel: "Elegir fuente de ejemplo",
    tabs: ["Sitio de la marca", "Guía de la categoría"],
    reviewTitle: "Una segunda mirada.",
    eyebrow: "FUENTES + REVISIÓN HUMANA",
    title: ["De la respuesta", "a la fuente.", "Sin perder el hilo."],
    intro:
      "Una cita puede estar, pero decir otra cosa. Miramos la respuesta en su contexto y comprobamos qué respaldan las fuentes disponibles. Cuando falta evidencia, la duda queda a la vista.",
    benefits: [
      "La respuesta, en su contexto.",
      "La fuente, a la vista.",
      "La interpretación, revisada.",
    ],
  },
  audience: {
    eyebrow: "PARA QUIENES MUEVEN LA MARCA",
    title: ["La misma evidencia.", "Tu próxima decisión."],
    intro: [
      "Marketing, contenido y agencias.",
      "Distintas preguntas, una lectura compartida.",
    ],
    controlsLabel: "Explorar cómo puede usar KAIRUM tu equipo",
    buttons: {
      marca: {
        title: "Marketing y marca",
        detail: "Entender cómo te describen.",
      },
      contenido: {
        title: "Contenido y SEO",
        detail: "Decidir qué información revisar.",
      },
      agencias: {
        title: "Agencias",
        detail: "Llevar evidencia a la conversación.",
      },
    },
    teamLabel: "PARA TU EQUIPO",
    reportLink: "Mirá cómo se convierte en un informe",
  },
  report: {
    eyebrow: "EL ENTREGABLE",
    title: ["Un informe.", "Con evidencia.", "Y próximos pasos."],
    intro:
      "Las consultas acordadas, las respuestas observadas y las fuentes disponibles. Todo conectado con una lectura humana para saber qué revisar primero.",
    optionsLabel: "Módulos del informe ilustrativo",
    options: {
      menciones: "Menciones",
      fuentes: "Fuentes",
      prioridades: "Próximos pasos",
    },
    openLabel: "Abrí el informe de ejemplo",
    note: "Probá los módulos. El ejemplo incluye la consulta, la evidencia y el criterio detrás de cada lectura.",
    exampleLabel: "Ejemplo ilustrativo",
    paperTitle: ["Norte.", "En contexto."],
    paperSubtitle: "Caso ficticio · Software de inventario",
    paperFoot: "PREGUNTAR · ENTENDER · DECIDIR",
  },
  reportDialog: {
    title: "KAIRUM · Informe ilustrativo",
    closeLabel: "Cerrar informe",
    heading: "Norte, en contexto.",
    intro:
      "Vista ilustrativa del informe. El contenido muestra cómo se organiza una lectura, sin representar resultados de una marca real.",
    questionLabel: "LA CONSULTA",
    question: "¿Qué software de inventario conviene a una pyme?",
    caseLabel: "Norte · Marca ficticia · Software de inventario",
    evidenceSummary: "Ver la respuesta y su fuente",
    answerLabel: "RESPUESTA ILUSTRATIVA · OPENAI API",
    answer:
      "Para controlar stock en tiempo real, Norte es una alternativa. Revisá si incluye las integraciones que necesita tu equipo.",
    sourceLabel: "FUENTE FICTICIA · NORTE.EXAMPLE / PRODUCTO",
    source:
      "Norte permite ver el stock en tiempo real y registrar movimientos en una sola plataforma.",
    review:
      "Lectura del ejemplo: la fuente describe el stock; las integraciones quedan sin confirmar.",
  },
  faq: {
    eyebrow: "ANTES DE EMPEZAR",
    title: ["Buenas preguntas.", "Respuestas claras."],
    items: [
      {
        question: "¿Esto reemplaza al SEO?",
        answer:
          "Lo complementa. Acá miramos cómo aparece tu marca en respuestas de IA, qué fuentes se citan y en qué contexto.",
      },
      {
        question: "¿Los modelos responden siempre igual?",
        answer:
          "No. Las respuestas pueden cambiar según la consulta, el contexto, el modelo y el momento. Por eso importa conservar lo observado y revisar las diferencias.",
      },
      {
        question: "¿Qué recibe mi equipo?",
        answer:
          "Un informe con las consultas acordadas, las respuestas observadas, las fuentes disponibles y una lectura revisada. Incluye puntos a verificar y próximos pasos para tu equipo. Podés explorar un ejemplo en la sección del informe.",
      },
      {
        question: "¿Qué necesitamos para empezar?",
        answer:
          "El sitio de tu marca, tu categoría y una pregunta de negocio que quieras entender. En la primera conversación ponemos en común el contexto y definimos qué tiene sentido analizar. El alcance se acuerda antes de empezar.",
      },
      {
        question: "¿Esto garantiza que la IA recomiende mi marca?",
        answer:
          "No. KAIRUM ayuda a entender las respuestas observadas y a detectar información que conviene revisar. Los modelos y sus respuestas cambian; una mejora en tu contenido no garantiza una recomendación.",
      },
    ],
  },
  contact: {
    eyebrow: "EL PRÓXIMO PASO EMPIEZA CON VOS.",
    title: ["Hagamos una buena pregunta.", "Sobre tu marca."],
    intro: [
      "Traé tu sitio y una pregunta que hoy te importe.",
      "El primer paso es entender qué querés resolver.",
    ],
    agendaLabel: "Qué conversamos en la primera llamada",
    agenda: [
      {
        title: "Tu contexto.",
        detail: "La marca, la categoría y la decisión que tenés por delante.",
      },
      {
        title: "Un foco claro.",
        detail:
          "Las preguntas que vale la pena mirar y el alcance del análisis.",
      },
      {
        title: "El próximo paso.",
        detail: "Cómo organizar una lectura que tu equipo pueda usar.",
      },
    ],
  },
  footer: {
    brandLabel: "KAIRUM, inicio",
    motto: "Visibilidad. Contexto. Decisiones.",
    languageLabel: "Idioma",
  },
  notFound: {
    title: "Página no encontrada · KAIRUM",
    brandLabel: "KAIRUM, volver al inicio",
    code: "ERROR 404",
    heading: "No encontramos esta página.",
    intro: "El enlace puede haber cambiado. Podés volver al inicio.",
    navLabel: "Continuar navegando",
    homeLabel: "Volver al inicio",
  },
  client: {
    heroQuery: "¿Qué software de inventario conviene a una pyme?",
    heroAnswer:
      "Para controlar stock en tiempo real, Norte es una opción a evaluar. Antes de elegir, conviene revisar las integraciones que necesita tu equipo.",
    heroStatuses: {
      ready: "Análisis listo",
      sources: "Siguiendo las fuentes",
      reading: "Leyendo respuestas",
      preparing: "Preparando consulta",
    },
    stageCaptions: [
      "Definimos una pregunta relevante.",
      "Consultamos distintas perspectivas.",
      "Detectamos un patrón: stock claro, integraciones pendientes.",
      "Revisión humana: la fuente no confirma integraciones.",
      "Una prioridad concreta: explicar las integraciones en la web.",
    ],
    motion: {
      pauseLabel: "Pausar todas las animaciones",
      resumeLabel: "Activar animaciones",
      pause: "Pausar movimiento",
      resume: "Activar movimiento",
      demoPauseLabel: "Pausar demostración",
      demoResumeLabel: "Reanudar demostración",
      demoPause: "Pausar",
      demoResume: "Reanudar",
    },
    menu: { open: "Abrir menú", close: "Cerrar menú" },
    providerExamples: [
      {
        name: "OpenAI API",
        logo: "openai",
        answer:
          "“Para controlar stock en tiempo real, Norte es una alternativa. Revisá si incluye las integraciones que necesita tu equipo.”",
        insight: "El stock se destaca. Las integraciones quedan por verificar.",
      },
      {
        name: "Gemini API",
        logo: "gemini",
        answer:
          "“Norte presenta funciones de inventario para pymes. La información sobre sus integraciones no es suficiente para elegir.”",
        insight: "La falta de información pesa más cerca de la decisión.",
      },
      {
        name: "Claude API",
        logo: "claude",
        answer:
          "“Compará el control de stock y las integraciones de Norte con tu operación antes de decidir.”",
        insight:
          "La respuesta invita a comparar las integraciones con tu operación.",
      },
    ],
    patterns: {
      explorar: {
        question: "¿Qué software de inventario conviene a una pyme?",
        insight:
          "En este ejemplo ficticio, Norte aparece cuando se pregunta por control de stock. El lugar cambia según la consulta.",
        rows: [
          ["Inventario para pymes", "mencion", "ausente", "mencion"],
          ["Alternativas de stock", "mencion", "mencion", "ausente"],
          ["Stock en tiempo real", "mencion", "mencion", "mencion"],
          ["Conectar mi tienda", "ausente", "mencion", "ausente"],
        ],
      },
      comparar: {
        question: "¿Cómo se compara Norte con otras opciones?",
        insight:
          "Las integraciones entran en la comparación. Ya no alcanza con saber que el producto controla stock.",
        rows: [
          ["Control de stock", "comparacion", "comparacion", "mencion"],
          ["Integraciones", "mencion", "comparacion", "comparacion"],
          ["Información publicada", "comparacion", "mencion", "mencion"],
          ["Ajuste para mi pyme", "ausente", "comparacion", "comparacion"],
        ],
      },
      elegir: {
        question: "¿Qué tendría que revisar antes de elegir?",
        insight:
          "Aparece una pregunta pendiente: qué integraciones tiene Norte. Esa duda conecta la lectura con una acción sobre la web.",
        rows: [
          ["Funciones de stock", "mencion", "comparacion", "mencion"],
          ["Integraciones a revisar", "comparacion", "mencion", "comparacion"],
          ["Próximos pasos", "mencion", "mencion", "ausente"],
          ["Dónde conocer más", "mencion", "ausente", "mencion"],
        ],
      },
    },
    stateLabels: {
      mencion: "Mención",
      comparacion: "Comparación",
      ausente: "Sin mención",
    },
    sources: [
      {
        url: "norte.example / producto",
        title: "La fuente detrás de la respuesta.",
        excerpt: [
          "Norte permite ",
          "ver el stock en tiempo real y registrar movimientos",
          " en una sola plataforma. Una solución de inventario para pequeñas empresas.",
        ],
        review:
          "La fuente describe el control de stock. No confirma qué integraciones están disponibles.",
        highlight: "controlar stock en tiempo real",
        prefix: "Norte permite",
      },
      {
        url: "sector.example / guia",
        title: "Otro contexto. Otra lectura.",
        excerpt: [
          "Antes de elegir un software de inventario, conviene ",
          "revisar la conexión con tu tienda y tu sistema de ventas",
          ". Las necesidades cambian según la operación.",
        ],
        review:
          "La guía aporta contexto de la categoría; no prueba resultados de una marca.",
        highlight: "revisar las integraciones",
        prefix: "Antes de elegir Norte, conviene",
      },
    ],
    audienceReadings: {
      marca: {
        lens: "MENCIONES + CONTEXTO",
        question: "¿Qué historia cuentan de tu marca?",
        reading:
          "Entendé qué atributos aparecen, cuáles quedan fuera y con qué alternativas se relaciona tu marca.",
        action: "Revisar el posicionamiento con respuestas concretas.",
      },
      contenido: {
        lens: "FUENTES + CONTENIDO",
        question: "¿Qué información falta para elegir?",
        reading:
          "Seguí las fuentes y detectá temas que conviene aclarar en tu sitio o contenido para explicar mejor tu propuesta.",
        action: "Priorizar una revisión de contenidos con evidencia.",
      },
      agencias: {
        lens: "HALLAZGOS + CONVERSACIÓN",
        question: "¿Cómo se lo explicás a tu cliente?",
        reading:
          "Llevá la conversación de una captura aislada a una lectura con preguntas, fuentes y próximos pasos.",
        action: "Presentar hallazgos y acordar qué revisar primero.",
      },
    },
    modules: {
      menciones: {
        icon: "Quotes",
        title: "Cómo aparece tu marca",
        copy: "Norte aparece por su control de stock para pymes. Las respuestas dejan una duda sobre integraciones.",
      },
      fuentes: {
        icon: "Link",
        title: "Qué sostiene cada respuesta",
        copy: "El sitio describe el inventario y los movimientos. La revisión no encuentra integraciones confirmadas en el ejemplo.",
      },
      prioridades: {
        icon: "CursorClick",
        title: "Qué conviene revisar",
        copy: "Explicar las integraciones disponibles en la web y volver a observar cómo responden los modelos.",
      },
    },
  },
};
