import { geoComparison } from "./geo-comparison";
import type { EditorialCopy } from "./schema";
import { adobeShopping } from "./adobe-shopping";
import { chatgptAds } from "./chatgpt-ads";

export const es: EditorialCopy = {
  ui: {
    resources: "Recursos",
    blog: "Blog",
    glossary: "Glosario",
    methodology: "Metodología",
    resourcesDescription: "Guías y evidencia para hacer mejores preguntas.",
    blogDescription: "Lecturas prácticas sobre visibilidad de marca en IA.",
    glossaryDescription: "Conceptos claros, con ejemplos y límites.",
    explore: "Explorar",
    featured: "Para empezar",
    guide: "Guía práctica",
    articles: "Últimas lecturas",
    onThisPage: "En esta lectura",
    sources: "Fuentes y referencias",
    related: "Seguí explorando",
    author: "Por KAIRUM",
    reviewed: "Revisado el",
    date: "16 de octubre de 2026",
    minutes: "min de lectura",
    read: "Leer artículo",
    editorialNote: "Criterio editorial",
    editorialPolicy:
      "Textos e ilustraciones preparados con asistencia de IA y revisión de fuentes públicas. Los ejercicios son construcciones educativas identificadas, sin datos de clientes. La metodología y las propuestas de trabajo son de KAIRUM; las referencias documentan el funcionamiento de cada plataforma. No garantizamos posicionamiento.",
    reports: "Informes exploratorios",
    reportsNote:
      "Estudios prospectivos con sus fechas, preguntas y límites originales. Las organizaciones incluidas no son clientes por figurar en la biblioteca.",
    reportsAction: "Explorar la biblioteca",
    back: "Todos los recursos",
    nextStep: "De la lectura al próximo paso",
    ctaTitle: "Una buena pregunta puede abrir tu próximo diagnóstico.",
    ctaText:
      "Con AI Report podemos acordar una muestra, revisar respuestas y fuentes, y documentar qué merece atención.",
    ctaAction: "Conocer AI Report",
    question: "Pregunta",
    answer: "Respuesta",
    source: "Fuente",
    evidence: "Evidencia que podés revisar",
    homeQuestions: "Elegir las preguntas",
    homeSources: "Entender las señales",
    homeFindings: "Interpretar los hallazgos",
    heroTitle: "Entender la búsqueda con IA.\nCon evidencia.",
    heroIntro:
      "Guías, ideas y un método de trabajo para entender cómo aparece tu marca en respuestas de IA y decidir qué investigar después.",
    blogTitle: "La búsqueda cambió.\nAprendamos a leerla.",
    blogIntro:
      "Preguntas que importan, señales que se pueden revisar y decisiones con contexto. Un espacio para pensar la visibilidad en IA más allá del número.",
    guideAction: "Leer la guía",
    browseBlog: "Explorar el blog",
    synthetic: "Esquema educativo · sin mediciones de una empresa",
    takeaways: "Qué te llevás de esta lectura",
    reference: "Para contrastar",
  },
  commercial: {
    report: {
      title: "AI Report: diagnóstico de visibilidad en IA | KAIRUM",
      description:
        "Definí un diagnóstico de visibilidad de marca en IA: preguntas, respuestas, fuentes, hallazgos y prioridades con alcance y límites explícitos.",
      heading: "Un diagnóstico que tu equipo puede revisar.",
      intro:
        "AI Report parte de una pregunta de negocio y un alcance acordado. El entregable conecta cada observación con la evidencia que la sostiene.",
      items: [
        {
          title: "Qué se acuerda",
          text: "La marca, la categoría, las preguntas, la superficie consultada y las condiciones de observación antes de medir.",
        },
        {
          title: "Qué recibe tu equipo",
          text: "Una lectura de respuestas, menciones y fuentes, con hallazgos, límites y prioridades para conversar.",
        },
        {
          title: "Cómo se interpreta",
          text: "Una observación describe esa muestra. La revisión distingue lo comprobado, lo que falta contrastar y el próximo paso.",
        },
      ],
    },
    analytics: {
      title: "Analítica de visibilidad de marca en IA | KAIRUM",
      description:
        "Entendé cómo analizar menciones, fuentes y competencia en respuestas de IA, y qué condiciones hacen comparables dos mediciones de tu marca.",
      heading: "Medir un cambio empieza por conservar el contexto.",
      intro:
        "La analítica de visibilidad reúne señales diferentes. Su valor está en poder volver a la pregunta, la respuesta y la fuente antes de sacar una conclusión.",
      items: [
        {
          title: "Una muestra explícita",
          text: "Documentá preguntas, fechas, idioma, superficie y cobertura. El porcentaje siempre necesita un denominador.",
        },
        {
          title: "Señales separadas",
          text: "Leé menciones y citas en sus respuestas. Las visitas al sitio se contrastan con una fuente de analítica autorizada.",
        },
        {
          title: "Comparaciones útiles",
          text: "Repetí condiciones compatibles y registrá cambios de modelos o preguntas. Una variación no prueba el efecto de una intervención.",
        },
      ],
    },
    agencias: {
      title: "GEO y AEO para agencias de marketing | KAIRUM",
      description:
        "Explorá cómo incorporar un diagnóstico GEO y AEO al trabajo de tu agencia: preguntas del cliente, evidencia consultable y prioridades con alcance acordado.",
      heading: "Una nueva conversación con tus clientes. Un alcance concreto.",
      intro:
        "Una agencia puede empezar con una marca y una pregunta de negocio. El piloto sirve para acordar qué observar, qué evidencia entregar y qué decisiones acompañar.",
      items: [
        {
          title: "Definir el caso",
          text: "Elegí una marca, su categoría y las decisiones que investigan sus potenciales clientes. Acordá las preguntas antes de ejecutar.",
        },
        {
          title: "Entregar una lectura",
          text: "Reuní menciones, respuestas y fuentes en un AI Report que el equipo pueda revisar y compartir, con su fecha y límites.",
        },
        {
          title: "Acordar el siguiente paso",
          text: "Priorizá cambios de contenido o nuevas preguntas. Una medición posterior conserva las condiciones y separa evolución de causalidad.",
        },
      ],
    },
  },
  pages: {
    "geo-comparison": geoComparison,
    "chatgpt-ads": chatgptAds,
    "adobe-shopping": adobeShopping,
    resources: {
      title: "Recursos de GEO, AEO y visibilidad en IA | KAIRUM",
      description:
        "Guías, artículos, glosario y metodología para investigar la presencia de una marca en respuestas de IA con preguntas, fuentes y límites claros.",
      category: "Recursos",
      summary:
        "Una biblioteca para conectar preguntas, evidencia y decisiones.",
      sections: [],
      sources: [],
      related: [],
      product: "report",
    },
    blog: {
      title: "Blog de GEO, AEO y visibilidad de marca en IA | KAIRUM",
      description:
        "Artículos prácticos de KAIRUM para elegir preguntas, distinguir menciones y citas e interpretar mediciones de visibilidad de marca en IA.",
      category: "Blog",
      summary: "Ideas para investigar la búsqueda con IA con criterio.",
      sections: [],
      sources: [],
      related: [],
      product: "report",
    },
    "visibility-guide": {
      title: "Cómo medir la visibilidad de tu marca en respuestas de IA",
      category: "Guía práctica",
      description:
        "Aprendé a definir preguntas, registrar menciones y citas e interpretar una muestra de respuestas de IA con condiciones comparables y límites explícitos.",
      summary:
        "¿Tu marca aparece cuando una persona pregunta por tu categoría? Para investigarlo hace falta algo más que probar su nombre en un chat. Esta guía propone un recorrido: elegir una decisión, observar respuestas y convertir la evidencia en una próxima acción.",
      sections: [
        {
          id: "objetivo",
          title: "1. Definí qué querés entender",
          paragraphs: [
            "Imaginá que tu equipo publica una guía y quiere entender si ayuda a explicar su propuesta en la búsqueda con IA. Una captura aislada puede ser interesante, pero no permite saber qué pasa con otras preguntas, qué fuentes intervienen o cómo se repite la observación.",
            "Empezá por una decisión de negocio: entender qué información encuentra una agencia antes de evaluar un diagnóstico, por ejemplo. Para KAIRUM, ese recorte permite investigar una necesidad concreta sin tratar de representar todas las conversaciones de marketing de internet.",
          ],
          example: {
            label: "Ejemplo de planificación · todavía no es una medición",
            text: "Objetivo: entender cómo se explica la medición de visibilidad de marca en IA. Sitio de referencia: kairum.com.ar. Audiencia e idioma: equipos de marketing que consultan en español.",
          },
        },
        {
          id: "preguntas",
          title: "2. Elegí preguntas que representen decisiones",
          paragraphs: [
            "Armá un conjunto que cubra descubrimiento, comparación y evaluación. Separá las preguntas que nombran la marca de las que no la nombran: responden a objetivos distintos.",
            "Conservá el texto exacto y una etiqueta de intención. Si más adelante cambiás las preguntas, documentá el cambio antes de comparar períodos.",
          ],
          items: [
            "Descubrimiento: ¿cómo puedo medir si una marca aparece en respuestas de IA?",
            "Comparación: ¿qué debería comparar al elegir una herramienta de visibilidad en IA?",
            "Evaluación dirigida: ¿qué información publica KAIRUM sobre su método de diagnóstico?",
          ],
        },
        {
          id: "condiciones",
          title: "3. Registrá dónde y cómo observás",
          paragraphs: [
            "Anotá la fecha, el idioma, la superficie consultada, el modelo cuando esté identificado, la disponibilidad de búsqueda y la cobertura. Una respuesta de una API y una respuesta de una interfaz de consumidor pertenecen a superficies diferentes.",
            "Las mediciones mediante OpenAI API u OpenRouter deben rotularse como API o proxy. No se presentan como capturas de ChatGPT. Los nombres de modelos tampoco prueban una integración comercial.",
          ],
          items: [
            "Pregunta y objetivo del conjunto.",
            "Fecha, idioma y contexto geográfico realmente disponible.",
            "Superficie y modelo identificados, sin completar datos por suposición.",
            "Respuestas completas, fallos y cobertura observada.",
          ],
        },
        {
          id: "senales",
          title: "4. Separá menciones, citas y visitas",
          paragraphs: [
            "Una marca puede aparecer sin que su sitio sea citado. Una página puede ser citada sin que nadie abra el enlace. La visita requiere una observación adicional en analítica web.",
            "Registrá las señales por separado. Cuando una respuesta incluye búsqueda, diferenciá las fuentes recuperadas de las citas que finalmente aparecen en el texto.",
          ],
          table: {
            columns: ["Señal", "Qué permite observar", "Qué no demuestra"],
            rows: [
              [
                "Mención",
                "La marca aparece en la respuesta.",
                "Que la respuesta enlace a su sitio.",
              ],
              [
                "Cita",
                "La respuesta atribuye información a una fuente.",
                "Que una persona haya visitado esa página.",
              ],
              [
                "Visita referida",
                "Una sesión llega desde un enlace identificable.",
                "Que esa visita termine en una consulta o venta.",
              ],
            ],
          },
          figure: {
            title: "Tres preguntas. Tres registros.",
            caption:
              "Esquema de trabajo de KAIRUM. Las señales se revisan por separado y no describen una conversión automática.",
            steps: [
              {
                label: "¿Aparece la marca?",
                detail:
                  "Leer la respuesta completa y el contexto de la mención.",
                value: "01",
              },
              {
                label: "¿Qué página se cita?",
                detail: "Conservar la URL y revisar qué afirmación respalda.",
                value: "02",
              },
              {
                label: "¿Llegó alguien al sitio?",
                detail:
                  "Consultar analítica autorizada y su atribución disponible.",
                value: "03",
              },
            ],
          },
        },
        {
          id: "interpretacion",
          title: "5. Leé el resultado dentro de su muestra",
          paragraphs: [
            "Si calculás presencia, explicá qué respuestas cuentan como válidas y cuál es el denominador. Los errores no desaparecen del informe: se muestran como parte de la cobertura.",
            "Una sola ejecución no representa todas las respuestas posibles. Para leer evolución, repetí condiciones compatibles y buscá patrones antes de atribuir significado a una diferencia aislada.",
            "Si cambiaste contenido y después observaste una mejora, documentá ambas cosas. Esa secuencia por sí sola no prueba que el cambio la haya causado.",
          ],
          example: {
            label: "Ejemplo sintético · no es un resultado de KAIRUM",
            text: "En una muestra hipotética, la marca aparece en 6 de 20 respuestas válidas: 30% de presencia dentro de esa muestra. Si había 25 respuestas previstas, la cobertura es 20 de 25. Ambos datos deben acompañarse.",
          },
        },
        {
          id: "accion",
          title: "6. Convertí la lectura en una próxima pregunta",
          paragraphs: [
            "Relacioná cada prioridad con su evidencia. Puede ser aclarar una capacidad en el sitio, revisar una fuente desactualizada o investigar una pregunta que quedó sin cubrir.",
            "El ciclo útil conserva el objetivo, la medición, la decisión y las condiciones de una siguiente observación. Un diagnóstico abre una conversación; no reemplaza el criterio del equipo.",
          ],
          items: [
            "Qué observamos y en qué respuesta.",
            "Qué fuente o contenido merece revisión.",
            "Qué acción proponemos y quién la revisará.",
            "Qué condiciones conservar para volver a observar.",
          ],
        },
        {
          id: "ficha",
          title: "7. Armá una ficha que otra persona pueda revisar",
          paragraphs: [
            "La diferencia entre una impresión y un diagnóstico útil está en poder volver al material. Conservá una fila por respuesta, con un identificador que conecte el texto exacto de la pregunta, las condiciones, la respuesta completa y las URLs citadas. Un resumen ejecutivo no reemplaza ese archivo de evidencia.",
            "Para un primer ejercicio sobre KAIRUM, elegí una decisión de una agencia y escribí cuatro preguntas abiertas y dos dirigidas. Es una propuesta de inicio, no un tamaño de muestra universal. Revisá si cubren decisiones diferentes antes de invertir en más ejecuciones. La nota sobre elección de preguntas desarrolla ese ejemplo.",
          ],
          table: {
            columns: ["Campo", "Qué conservar"],
            rows: [
              ["Pregunta", "Texto exacto, intención y versión del conjunto."],
              [
                "Observación",
                "Fecha, superficie, idioma, respuesta y estado de ejecución.",
              ],
              ["Señales", "Mención con contexto y cada cita con su URL."],
              [
                "Lectura",
                "Qué observamos, qué falta contrastar y qué decisión abre.",
              ],
            ],
          },
        },
        {
          id: "revisar",
          title: "8. Revisá antes de ampliar",
          paragraphs: [
            "Pedile a otra persona que tome dos filas y trate de reconstruir tu conclusión. Si no encuentra la respuesta, no entiende el denominador o confunde un ejemplo con un resultado, hay que mejorar el registro antes de aumentar la muestra.",
            "Después elegí una acción pequeña: aclarar una definición en una página, documentar mejor el alcance de un producto o investigar una fuente externa. Anotá qué esperás observar y cómo lo revisarías. Google mantiene los fundamentos de SEO para sus funciones de IA: contenido útil, acceso técnico y enlaces internos siguen siendo parte del trabajo.",
            "El entregable final puede ser una página: objetivo, muestra y cobertura; dos hallazgos con evidencia; una limitación que cambie la lectura; y una prioridad con responsable. Un diagnóstico sirve cuando ayuda a elegir el próximo paso y permite discutir por qué.",
          ],
          references: [
            {
              title: "Google Search Central: funciones de IA y tu sitio web",
              url: "https://developers.google.com/search/docs/appearance/ai-features?hl=es",
            },
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: funciones de IA y tu sitio web",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=es",
        },
        {
          title: "OpenAI: rastreadores y agentes de búsqueda",
          url: "https://platform.openai.com/docs/bots",
        },
        {
          title: "Cloudflare Web Analytics: qué mide la analítica web",
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
        alt: "Una cinta amarilla atraviesa tres ventanas de papel: seguir una pregunta hasta su evidencia.",
        caption:
          "Ilustración editorial de KAIRUM · seguir el hilo entre una pregunta y su evidencia.",
      },
      takeaways: [
        "Definir una muestra antes de mirar las respuestas.",
        "Registrar menciones, citas y visitas por separado.",
        "Cerrar el diagnóstico con una decisión que se pueda revisar.",
      ],
    },
    "mentions-citations-visits": {
      title: "Menciones, citas y visitas: aparecer no es lo mismo que atraer",
      category: "Conceptos",
      description:
        "Una mención de marca, una cita a su sitio y una visita referida desde IA describen hechos distintos. Entendé qué medir y qué no concluir de cada señal.",
      summary:
        "Tu marca aparece en una respuesta de IA. Es una observación útil, pero todavía quedan preguntas: qué dice sobre ella, qué fuente respalda la información y si alguien llegó al sitio. Seguir esas pistas cambia la conversación con tu equipo.",
      sections: [
        {
          id: "mencion",
          title: "Qué nos dice una mención",
          paragraphs: [
            "La mención responde una pregunta acotada: ¿el nombre de la marca aparece en esta respuesta? Después podemos revisar el contexto: qué capacidad describe, con qué alternativas la compara o qué información le falta.",
            "La frecuencia sólo tiene sentido con una muestra definida. Que KAIRUM figure en una pregunta que ya incluye su nombre no responde lo mismo que aparecer en una consulta abierta sobre una categoría.",
          ],
          example: {
            label: "Ejemplo esquemático · no es una respuesta medida",
            text: "Una respuesta enumera a KAIRUM entre las alternativas para investigar visibilidad de marca, pero no incluye un enlace a kairum.com.ar. Hay una mención en este ejemplo; no una cita al sitio.",
          },
        },
        {
          id: "cita",
          title: "Qué agrega una cita",
          paragraphs: [
            "La cita vincula una afirmación con una fuente. Puede apuntar al sitio de la marca o a una página externa. Registrar el dominio y la URL ayuda a volver a la evidencia.",
            "Las fuentes que un sistema recuperó durante una búsqueda y las citas visibles en su respuesta son registros distintos. Conviene conservar ambas cuando la superficie permite observarlas y nombrar cada una con precisión.",
            "Una fuente citada no implica que la marca sea recomendada, ni que cada afirmación cercana esté respaldada por esa página. La relación requiere revisión.",
          ],
          references: [
            {
              title: "Google Search Central: funciones de IA y tu sitio web",
              url: "https://developers.google.com/search/docs/appearance/ai-features?hl=es",
            },
          ],
        },
        {
          id: "visita",
          title: "Qué requiere una visita",
          paragraphs: [
            "La visita se observa en el sitio, no en la respuesta. Un referido identificable puede indicar que alguien siguió un enlace desde una herramienta de IA. La atribución depende de los datos que efectivamente llegan a la analítica.",
            "Un crawler que solicita una página no es una visita humana. Sus solicitudes se analizan en registros del servidor y no acreditan por sí solas una cita.",
            "La consulta comercial es otra instancia. Un clic en Agendar, una reserva confirmada y una reunión realizada son eventos diferentes.",
          ],
          references: [
            {
              title: "OpenAI: rastreadores y agentes de búsqueda",
              url: "https://platform.openai.com/docs/bots",
            },
          ],
          figure: {
            title: "Aparecer, respaldar, llegar",
            caption:
              "Diagrama conceptual: estos registros pueden coexistir o faltar. Ninguno demuestra automáticamente el siguiente.",
            steps: [
              {
                label: "Mención",
                detail: "El nombre aparece en una respuesta que conservamos.",
                value: "Texto",
              },
              {
                label: "Cita",
                detail: "Una afirmación tiene una fuente identificable.",
                value: "URL",
              },
              {
                label: "Visita",
                detail: "La analítica registra una llegada al sitio.",
                value: "Sesión",
              },
            ],
          },
        },
        {
          id: "caso",
          title: "Un caso trabajado: qué pasó y qué sigue abierto",
          paragraphs: [
            "Construyamos tres observaciones educativas alrededor de KAIRUM. En la primera, una respuesta enumera a la marca al hablar de diagnósticos y enlaza únicamente una documentación técnica externa. Podemos registrar la mención y la cita externa. No podemos registrar una cita a KAIRUM sólo porque la marca está cerca del enlace.",
            "En la segunda, otra respuesta enlaza la guía de medición de kairum.com.ar para explicar una definición, sin recomendar contratar nada. Hay una cita al sitio. La intención comercial y el tono de la recomendación requieren una lectura distinta: no se deducen del dominio citado.",
            "En la tercera, la analítica del sitio muestra una visita con referido identificable desde un asistente. Eso permite investigar una llegada. Si no tenemos un vínculo entre esa sesión y una respuesta específica, no corresponde asignarla a la pregunta del primer ejemplo.",
          ],
          example: {
            label: "Caso construido · tres observaciones, sin datos medidos",
            text: "Registro A: mención + cita externa. Registro B: cita a la guía. Registro C: visita referida. No sumamos los tres como «tres conversiones» ni asumimos que pertenecen a una misma persona.",
          },
        },
        {
          id: "registro",
          title: "Cómo llevarlas a un mismo registro sin mezclarlas",
          paragraphs: [
            "Usá identificadores que conecten la pregunta con la respuesta y su fecha. Conservá las menciones y citas observables junto a esa evidencia, y revisá el tráfico en su fuente autorizada.",
            "Cuando compares resultados, indicá qué señal cambió y bajo qué condiciones. Evitá sumar menciones, citas y sesiones en un porcentaje único cuya interpretación no esté explicada.",
          ],
          table: {
            columns: ["Pregunta", "Evidencia a revisar"],
            rows: [
              [
                "¿Aparece la marca?",
                "Respuesta completa y texto de la mención.",
              ],
              ["¿Qué página se cita?", "Cita visible y URL de destino."],
              [
                "¿Llegó alguien al sitio?",
                "Sesión y referido en analítica web.",
              ],
              [
                "¿Hubo una consulta?",
                "Contacto o reserva realmente confirmada.",
              ],
            ],
          },
        },
        {
          id: "accion",
          title: "Qué revisar según la señal que falta",
          paragraphs: [
            "La separación sirve para decidir. Si aparece la marca con una descripción desactualizada, revisá la afirmación y la fuente que la sostiene antes de publicar más contenido. Si se cita una página correcta pero difícil de leer, trabajá su claridad y el siguiente paso que ofrece. Si llegan visitas y no hay consultas, revisá la página de destino y comprobá primero que la medición de contactos funcione.",
            "También puede haber una cita útil sin mención de marca, por ejemplo cuando una guía respalda una explicación general. Esa observación merece su propio registro: visibilidad del contenido y reconocimiento de marca pueden evolucionar de maneras diferentes.",
            "Para aplicarlo hoy, tomá tres respuestas completas. Marcá la frase donde aparece la marca, abrí cada fuente y anotá qué respalda. Después consultá la analítica por separado. El resultado es un mapa de evidencia y preguntas pendientes que tu equipo puede discutir, sin convertir cada señal en una promesa comercial.",
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: funciones de IA y tu sitio web",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=es",
        },
        {
          title: "Cloudflare Web Analytics: qué mide la analítica web",
          url: "https://developers.cloudflare.com/web-analytics/about/",
        },
        {
          title: "OpenAI: rastreadores y agentes de búsqueda",
          url: "https://platform.openai.com/docs/bots",
        },
      ],
      related: ["visibility-guide", "interpreting-results"],
      product: "analytics",
      cover: {
        alt: "Una burbuja de conversación, un eslabón y una puerta de papel representan tres señales distintas.",
        caption:
          "Ilustración editorial de KAIRUM · aparecer, ser citado y recibir una visita son hechos distintos.",
      },
      takeaways: [
        "Una mención describe presencia; hay que leer su contexto.",
        "Una cita permite revisar una fuente, aunque nadie abra el enlace.",
        "El tráfico y los contactos requieren registros propios.",
      ],
    },
    "choosing-questions": {
      title: "Antes de medir: cómo elegir preguntas que importan a tu negocio",
      category: "Planificación",
      description:
        "Diseñá un conjunto de preguntas de descubrimiento, comparación y evaluación, separá consultas dirigidas y abiertas y documentá el alcance antes de medir.",
      summary:
        "Una lista de cincuenta versiones de «mejores herramientas» puede dejar afuera lo que tu audiencia necesita resolver. Diseñar preguntas es decidir qué parte de la conversación vas a investigar. Acá trabajamos una muestra inicial para KAIRUM y una forma de revisarla.",
      sections: [
        {
          id: "audiencia",
          title: "Empezá por una decisión de tu audiencia",
          paragraphs: [
            "Una palabra clave puede orientar una investigación, pero una pregunta agrega contexto: quién consulta, qué necesita entender y qué condición importa para elegir.",
            "Para KAIRUM, una agencia que prepara un diagnóstico para un cliente y una marca que investiga sus fuentes pueden formular preguntas diferentes. Documentá esa audiencia sin inventar volúmenes de demanda.",
          ],
          figure: {
            title: "De una necesidad a una pregunta",
            caption:
              "Ejemplo de planificación para KAIRUM. No representa demanda medida ni consultas ejecutadas.",
            steps: [
              {
                label: "Audiencia",
                detail:
                  "Una agencia que prepara un diagnóstico para una marca.",
                value: "Quién",
              },
              {
                label: "Decisión",
                detail: "Qué evidencia pedir antes de acordar un piloto.",
                value: "Para qué",
              },
              {
                label: "Pregunta",
                detail:
                  "¿Qué debería incluir un diagnóstico de visibilidad en IA?",
                value: "Qué preguntar",
              },
            ],
          },
        },
        {
          id: "intencion",
          title: "Cubrí más de un momento de decisión",
          paragraphs: [
            "Agrupá preguntas por intención y revisá qué parte del recorrido representa cada grupo. Las categorías sirven para ordenar la muestra; no son una estimación automática del mercado.",
          ],
          table: {
            columns: ["Intención", "Ejemplo de pregunta"],
            rows: [
              ["Descubrir", "¿Qué significa medir visibilidad de marca en IA?"],
              [
                "Comparar",
                "¿Cómo comparar herramientas de análisis GEO y AEO?",
              ],
              [
                "Evaluar",
                "¿Qué debería incluir un diagnóstico de visibilidad?",
              ],
              [
                "Investigar una marca",
                "¿Qué metodología explica KAIRUM en su sitio?",
              ],
            ],
          },
        },
        {
          id: "abiertas",
          title: "Separá preguntas abiertas y dirigidas",
          paragraphs: [
            "Una consulta abierta no incluye el nombre de la marca. Ayuda a observar qué alternativas aparecen dentro de esa formulación. Una consulta dirigida sí la nombra y permite revisar cómo se describe su propuesta.",
            "Las dos pueden ser útiles. Si mezclás sus resultados sin identificar el tipo de pregunta, una mayor presencia puede reflejar sólo que escribiste el nombre dentro del conjunto.",
          ],
          example: {
            label: "Ejemplos de diseño · no son consultas ejecutadas",
            text: "Abierta: ¿cómo organizar un diagnóstico de visibilidad en IA para una agencia? Dirigida: ¿cómo plantea KAIRUM un diagnóstico para agencias?",
          },
        },
        {
          id: "muestra",
          title: "Una muestra de seis preguntas, con un propósito por fila",
          paragraphs: [
            "Para una primera revisión editorial de KAIRUM, proponemos las siguientes preguntas. Las primeras cuatro exploran la categoría sin nombrar la marca; las dos últimas examinan cómo se describe KAIRUM. Las mantenemos en grupos separados. No son consultas reales de clientes ni una estimación de su frecuencia.",
            "El valor está en que cada pregunta cambia la decisión que investigamos. Una definición ayuda a descubrir el problema; un criterio de comparación ayuda a evaluar alternativas. Repetir la misma pregunta con diez sinónimos daría menos cobertura de esas decisiones.",
          ],
          table: {
            columns: ["Pregunta propuesta", "Para qué incluirla"],
            rows: [
              [
                "¿Cómo saber si una marca aparece en respuestas de IA?",
                "Descubrir el problema. Abierta.",
              ],
              [
                "¿Qué diferencia hay entre una mención y una cita?",
                "Entender una señal. Abierta.",
              ],
              [
                "¿Cómo comparar diagnósticos de visibilidad de marca en IA?",
                "Explorar criterios. Abierta.",
              ],
              [
                "¿Qué evidencia pedir antes de contratar un diagnóstico?",
                "Evaluar un entregable. Abierta.",
              ],
              [
                "¿Qué metodología publica KAIRUM?",
                "Revisar la explicación de marca. Dirigida.",
              ],
              [
                "¿Qué información de KAIRUM falta para evaluar un piloto?",
                "Detectar vacíos de información. Dirigida.",
              ],
            ],
          },
        },
        {
          id: "prioridad",
          title: "Elegí cobertura antes que variaciones repetidas",
          paragraphs: [
            "Revisá si varias preguntas preguntan esencialmente lo mismo. Una lista larga de reformulaciones no garantiza que cubra diferentes decisiones o necesidades.",
            "Priorizá preguntas que el equipo pueda relacionar con una decisión y una posible revisión de contenido. Si faltan datos de consultas reales, tratá el conjunto como una hipótesis editorial que se puede mejorar.",
          ],
        },
        {
          id: "version",
          title: "Guardá una versión antes de medir",
          paragraphs: [
            "Conservá el texto exacto, intención, idioma y motivo de inclusión. Registrá qué queda fuera y con qué superficie se hará la observación.",
            "Cuando cambies el conjunto, abrí una nueva versión. Para comparar períodos, usá condiciones compatibles y explicá el efecto de las preguntas agregadas o retiradas.",
          ],
          items: [
            "Objetivo y audiencia definidos.",
            "Texto, idioma e intención por pregunta.",
            "Consultas abiertas y dirigidas identificadas.",
            "Versión del conjunto, alcance y fecha.",
            "Superficie, repeticiones previstas y criterio de cobertura.",
          ],
        },
        {
          id: "editar",
          title: "Cómo mejorar una pregunta antes de ejecutarla",
          paragraphs: [
            "Leé cada fila en voz alta. «¿Por qué KAIRUM es la mejor opción?» ya introduce una conclusión. «¿Qué información publica KAIRUM sobre su método?» permite investigar algo comprobable. La diferencia importa: una pregunta sesgada puede producir una respuesta atractiva y aportar poco al diagnóstico.",
            "Si la formulación es demasiado amplia, agregá una condición que la audiencia realmente usaría: idioma, tipo de equipo o necesidad. No agregues el nombre de la marca para conseguir que aparezca. Tampoco combines precio, integraciones, metodología y soporte en una sola pregunta si después no vas a poder atribuir el hallazgo a una necesidad concreta.",
            "Antes de ampliar, pedí a una persona del equipo que explique qué decisión podría cambiar con cada respuesta. Si dos filas tienen el mismo propósito, elegí una como núcleo y guardá la otra para explorar variación. Al incorporar evidencia de conversaciones o consultas reales, registrá el origen y evitá incluir información privada en los textos de prueba.",
            "Para repetir la medición, conservá ese núcleo y sus condiciones. Las preguntas nuevas pueden entrar en un bloque exploratorio. Así podés aprender sin presentar un cambio de composición como una mejora de presencia.",
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: funciones de IA y tu sitio web",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=es",
        },
        {
          title: "Google Search Central: cómo funciona la Búsqueda",
          url: "https://developers.google.com/search/docs/fundamentals/how-search-works?hl=es",
        },
      ],
      related: ["visibility-guide", "interpreting-results"],
      product: "prompt-intelligence",
      cover: {
        alt: "Una cinta amarilla elige un recorrido entre tarjetas y caminos de tinta.",
        caption:
          "Ilustración editorial de KAIRUM · elegir preguntas también es decidir qué dejar fuera.",
      },
      takeaways: [
        "Partir de una decisión de la audiencia, con lenguaje concreto.",
        "Separar el descubrimiento abierto de la evaluación de una marca.",
        "Mantener un núcleo de preguntas estable para poder comparar.",
      ],
    },
    "interpreting-results": {
      title:
        "Visibilidad en IA: cómo leer un resultado sin engañarte con el porcentaje",
      category: "Medición",
      description:
        "Leé presencia, cobertura y cambios dentro de una muestra de respuestas de IA. Aprendé a distinguir una observación, una hipótesis y una conclusión causal.",
      summary:
        "Un 60 % puede contar una historia menos sólida que un 30 %. La diferencia puede estar en las respuestas que faltan. Con un caso numérico construido, veamos qué mirar antes de celebrar una mejora o convertirla en una prioridad.",
      sections: [
        {
          id: "alcance",
          title: "Leé el alcance antes que el porcentaje",
          paragraphs: [
            "Antes de preguntar si un número es alto o bajo, revisá qué preguntas lo produjeron, qué superficie se consultó, cuándo y con qué cobertura.",
            "Un diagnóstico no es una estimación de todas las conversaciones que ocurren en una herramienta. Tampoco describe por sí solo el comportamiento de otra interfaz o modelo.",
          ],
        },
        {
          id: "denominador",
          title: "Hacé visible el denominador",
          paragraphs: [
            "Un porcentaje de presencia necesita una definición de respuesta válida y una cantidad explícita de observaciones. Los fallos de ejecución o respuestas incompletas deben acompañar el resultado como cobertura.",
            "Cambiar el denominador puede modificar el porcentaje aunque la cantidad de menciones sea la misma. Documentá siempre ambos valores.",
          ],
          figure: {
            title: "El doble de porcentaje. Las mismas seis menciones.",
            caption:
              "Ejercicio sintético, no resultados de KAIRUM. La cobertura cae de 20 a 10 respuestas válidas sobre 25 previstas; los fallos no se cuentan como ausencia de marca.",
            steps: [
              {
                label: "Observación A",
                detail:
                  "6 menciones en 20 respuestas válidas. Cobertura: 20/25.",
                value: "30 %",
              },
              {
                label: "Observación B",
                detail:
                  "6 menciones en 10 respuestas válidas. Cobertura: 10/25.",
                value: "60 %",
              },
            ],
          },
        },
        {
          id: "caso",
          title: "El caso: 30 % y 60 % pueden describir el mismo recuento",
          paragraphs: [
            "En el ejercicio de la figura se planifican 25 observaciones en cada período. En A se obtienen 20 respuestas válidas y la marca aparece en 6: 6 ÷ 20 = 30 %. En B se obtienen sólo 10 válidas y también hay 6 menciones: 6 ÷ 10 = 60 %. El porcentaje se duplicó; el recuento de menciones se mantuvo.",
            "La cobertura pasó del 80 % al 40 %. No sabemos qué habrían dicho las respuestas faltantes. Contarlas como respuestas sin mención escondería el fallo; descartarlas sin mostrar cobertura escondería otra parte del problema. Antes de interpretar el cambio, hay que investigar los errores y el conjunto de preguntas que sí respondió.",
            "El siguiente paso es volver a las filas: ¿fallaron las mismas intenciones?, ¿se conservó la superficie?, ¿qué preguntas tienen respuesta en ambos períodos? Un subconjunto común puede ayudar a comparar, siempre que se muestre su tamaño y qué quedó fuera.",
          ],
          example: {
            label: "Cálculo educativo · no describe una medición real",
            text: "Presencia A: 6/20 = 30 %. Cobertura A: 20/25 = 80 %. Presencia B: 6/10 = 60 %. Cobertura B: 10/25 = 40 %. Cada porcentaje responde una pregunta distinta.",
          },
        },
        {
          id: "comparabilidad",
          title: "Compará condiciones compatibles",
          paragraphs: [
            "Dos capturas pueden usar preguntas, idiomas, modelos o modos de búsqueda diferentes. Una diferencia entre ellas puede reflejar esas condiciones además de cualquier cambio de contenido.",
            "Mantené una versión común de preguntas, identificá las superficies y registrá las fechas. Si una condición cambia, explicá por qué la comparación requiere otra lectura.",
          ],
          items: [
            "Mismo objetivo y conjunto comparable de preguntas.",
            "Idioma y contexto conservados o cambios documentados.",
            "Superficie y modelo identificados cuando sea posible.",
            "Cobertura, errores y reglas de cálculo visibles.",
            "Respuestas y fuentes consultables para revisar el resumen.",
          ],
          references: [
            {
              title: "Google Search Central: funciones de IA y tu sitio web",
              url: "https://developers.google.com/search/docs/appearance/ai-features?hl=es",
            },
          ],
        },
        {
          id: "cambio",
          title: "Cuando la comparación sí conserva la muestra",
          paragraphs: [
            "Supongamos ahora otro ejercicio con condiciones compatibles y 20 respuestas válidas en ambos períodos: la marca pasa de aparecer en 6 a aparecer en 9. La presencia va del 30 % al 45 %. Son 15 puntos porcentuales de diferencia, o un aumento relativo del 50 %. Ambas expresiones son aritméticamente correctas, pero necesitan el recuento al lado para interpretarse.",
            "Tampoco esa diferencia demuestra por sí sola el efecto de una intervención. Las respuestas pueden variar entre ejecuciones. Registrá las repeticiones previstas y evitá tratar reformulaciones similares como si representaran personas independientes. Esta muestra no mide cuota de mercado ni la frecuencia de todas las conversaciones.",
          ],
        },
        {
          id: "causalidad",
          title: "Distinguí observación, hipótesis y efecto",
          paragraphs: [
            "Observación: la marca apareció en más respuestas de la muestra. Hipótesis: una mejora de contenido pudo contribuir. Conclusión causal: esa intervención produjo el cambio. La tercera exige un diseño que permita evaluar otras explicaciones.",
            "Una comparación antes y después es útil para seguir la evolución, pero también pueden cambiar el modelo, las fuentes disponibles y las respuestas entre ejecuciones. Evitá atribuir automáticamente el movimiento a una acción.",
          ],
        },
        {
          id: "prioridades",
          title: "Documentá una decisión revisable",
          paragraphs: [
            "Una prioridad útil explica qué respuesta la motiva, qué fuente revisar y cuál sería el próximo paso. Si la evidencia no alcanza, la acción puede ser investigar más.",
            "Separá los resultados de visibilidad de las visitas y de los contactos comerciales. La cadena completa merece observaciones diferentes y no se da por demostrada con una mención.",
          ],
        },
        {
          id: "nota",
          title: "Una nota de decisión que se pueda discutir",
          paragraphs: [
            "Probá escribir cuatro líneas: qué observamos, con qué evidencia, qué explicación estamos considerando y qué vamos a revisar. Por ejemplo: «En la muestra comparable hay tres respuestas adicionales con mención. Revisaremos sus fuentes y la descripción de la marca antes de proponer cambios». Esa nota admite revisión y evita convertir una asociación en una causa.",
            "Si la pregunta es si llegaron visitas o contactos, abrí ese análisis en sus fuentes correspondientes. Google explica que el tráfico de sus funciones de IA se incluye en el rendimiento general de búsqueda Web en Search Console. Ese informe y un registro de respuestas observadas describen poblaciones distintas; no hay que presentar uno como validación automática del otro.",
          ],
          references: [
            {
              title: "Google Search Central: funciones de IA y tu sitio web",
              url: "https://developers.google.com/search/docs/appearance/ai-features?hl=es",
            },
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: funciones de IA y tu sitio web",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=es",
        },
        {
          title: "Google Search Central: cómo funciona la Búsqueda",
          url: "https://developers.google.com/search/docs/fundamentals/how-search-works?hl=es",
        },
        {
          title: "OpenAI: rastreadores y agentes de búsqueda",
          url: "https://platform.openai.com/docs/bots",
        },
      ],
      related: ["visibility-guide", "mentions-citations-visits"],
      product: "analytics",
      cover: {
        alt: "Dos discos amarillos iguales dentro de marcos negros de diferente tamaño.",
        caption:
          "Ilustración editorial de KAIRUM · la misma observación cambia de sentido cuando cambia el marco.",
      },
      takeaways: [
        "Leer el recuento y la cobertura junto con el porcentaje.",
        "Comparar condiciones y preguntas compatibles.",
        "Convertir cada hallazgo en una hipótesis y un próximo paso.",
      ],
    },
    glossary: {
      title: "Glosario de GEO, AEO y visibilidad de marca en IA",
      category: "Referencia",
      description:
        "Definiciones de GEO, AEO, menciones, citas, presencia, cobertura y superficies API, con ejemplos y límites para interpretar la búsqueda con IA.",
      summary:
        "Un vocabulario compartido ayuda a preguntar y medir con precisión. Estos términos explican cómo usamos los conceptos en KAIRUM; las definiciones y las métricas pueden variar entre proveedores.",
      sections: [
        {
          id: "geo-aeo",
          title: "GEO y AEO",
          paragraphs: [
            "GEO (Generative Engine Optimization) suele describir el trabajo sobre la presencia de contenidos y marcas en respuestas generativas. AEO (Answer Engine Optimization) se usa para el trabajo orientado a respuestas de sistemas de búsqueda y asistentes. Sus usos se superponen; no constituyen por sí solos dos métricas universales.",
            "En Google, las funciones de IA mantienen los fundamentos de SEO. Google no exige un archivo especial para IA ni un schema específico para aparecer en AI Overviews o AI Mode.",
          ],
        },
        {
          id: "mencion-cita",
          title: "Mención y cita",
          paragraphs: [
            "Mención: aparición del nombre de una marca en una respuesta. Cita: atribución de información a una fuente identificable, habitualmente mediante un enlace. Una no implica la otra.",
          ],
        },
        {
          id: "presencia",
          title: "Presencia dentro de una muestra",
          paragraphs: [
            "Proporción de respuestas válidas de un conjunto en las que se observa una marca, según una regla de identificación explícita. No representa todas las conversaciones ni garantiza que la marca sea recomendada.",
          ],
        },
        {
          id: "cobertura",
          title: "Cobertura",
          paragraphs: [
            "Relación entre las observaciones válidas y las previstas en el alcance. Permite ver errores, omisiones y límites que un porcentaje resumido podría ocultar.",
          ],
        },
        {
          id: "superficie",
          title: "Superficie API e interfaz de consumidor",
          paragraphs: [
            "Una superficie es el entorno concreto en el que se observa una respuesta. OpenAI API u OpenRouter son superficies API o proxy. Una medición allí no equivale a una captura de la interfaz de ChatGPT.",
          ],
        },
        {
          id: "visita-rastreo",
          title: "Visita referida y rastreo",
          paragraphs: [
            "Una visita referida es una sesión cuyo origen puede identificarse en analítica. Un rastreo es una solicitud de un agente al servidor. La solicitud no demuestra una visita humana ni una cita.",
          ],
        },
        {
          id: "prompt",
          title: "Pregunta o prompt",
          paragraphs: [
            "La entrada concreta que se envía a una superficie. Para medir, conserva su texto, idioma, intención y versión. Incluir el nombre de la marca define una pregunta dirigida; omitirlo permite una consulta abierta.",
          ],
        },
        {
          id: "comparabilidad",
          title: "Comparabilidad",
          paragraphs: [
            "Grado en que dos mediciones conservan condiciones que permiten leer sus diferencias. Cambiar preguntas, modelos, idioma o cobertura exige documentar esas variaciones antes de comparar.",
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: funciones de IA y tu sitio web",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=es",
        },
        {
          title: "OpenAI: rastreadores y agentes de búsqueda",
          url: "https://platform.openai.com/docs/bots",
        },
        {
          title: "Cloudflare Web Analytics: qué mide la analítica web",
          url: "https://developers.cloudflare.com/web-analytics/about/",
        },
      ],
      related: ["visibility-guide", "mentions-citations-visits"],
      product: "report",
    },
    methodology: {
      title: "Metodología y criterio editorial de KAIRUM",
      category: "Método",
      description:
        "Cómo plantea KAIRUM una observación de visibilidad en IA: alcance, preguntas, evidencia, cobertura, revisión y límites de las conclusiones.",
      summary:
        "Nuestro punto de partida es una pregunta concreta. Definimos qué observar, conservamos la evidencia y distinguimos lo que una muestra permite concluir de lo que todavía necesita investigación.",
      sections: [
        {
          id: "alcance",
          title: "Un alcance antes de una ejecución",
          paragraphs: [
            "Cada diagnóstico acuerda una marca, categoría, conjunto de preguntas y condiciones de observación. Las consultas abiertas y dirigidas se identifican para no mezclar sus objetivos.",
            "La planificación no es una medición. Un ejemplo de interfaz o una gráfica esquemática tampoco acredita resultados reales.",
          ],
        },
        {
          id: "evidencia",
          title: "De la respuesta al hallazgo",
          paragraphs: [
            "La revisión debe poder volver a la pregunta, la respuesta, la fecha y la superficie. Se distinguen las menciones, las citas visibles y las fuentes de búsqueda cuando están disponibles.",
            "Se registra la cobertura y se explican fallos o exclusiones. Un resumen cuantitativo incluye la regla y el denominador que lo producen.",
          ],
        },
        {
          id: "superficies",
          title: "Nombrar la superficie observada",
          paragraphs: [
            "Las superficies API, como OpenAI API u OpenRouter, se rotulan como API o proxy. No se presentan como la interfaz de ChatGPT. Una observación de un entorno no se generaliza automáticamente a los demás.",
          ],
        },
        {
          id: "limites",
          title: "Qué permite concluir un estudio exploratorio",
          paragraphs: [
            "Un estudio prospectivo describe preguntas y respuestas observadas en una fecha y bajo condiciones explícitas. No convierte a las organizaciones incluidas en clientes ni acredita su aprobación.",
            "Las muestras con preguntas, fechas o superficies diferentes no constituyen un ranking homogéneo entre empresas. Una variación temporal tampoco prueba impacto comercial ni causalidad.",
          ],
        },
        {
          id: "editorial",
          title: "Cómo preparamos estas lecturas",
          paragraphs: [
            "Las guías y artículos se preparan con asistencia de IA y contraste de fuentes públicas. La autoría corporativa es KAIRUM; cada lectura muestra sus referencias y fecha de revisión.",
            "Los ejemplos inventados se rotulan como sintéticos o esquemáticos. Se utilizan para explicar un cálculo o una decisión y no se presentan como métricas del producto o de clientes.",
            "Las fuentes oficiales se enlazan donde permiten contrastar una afirmación. Las propuestas metodológicas propias se explican como criterios de trabajo, sin atribuirles una validación que no se ha realizado.",
          ],
        },
        {
          id: "actualizacion",
          title: "Un criterio que se puede revisar",
          paragraphs: [
            "Las superficies y sus funciones cambian. Cuando una fuente o condición deja de ser vigente, corresponde revisar el contenido y registrar su fecha de actualización.",
            "Para plantear una corrección o acordar el alcance de un diagnóstico, podés usar la página de contacto de KAIRUM.",
          ],
        },
      ],
      sources: [
        {
          title: "Google Search Central: funciones de IA y tu sitio web",
          url: "https://developers.google.com/search/docs/appearance/ai-features?hl=es",
        },
        {
          title: "OpenAI: rastreadores y agentes de búsqueda",
          url: "https://platform.openai.com/docs/bots",
        },
        {
          title: "Cloudflare Web Analytics: qué mide la analítica web",
          url: "https://developers.cloudflare.com/web-analytics/about/",
        },
      ],
      related: ["visibility-guide", "interpreting-results"],
      product: "report",
    },
  },
};
