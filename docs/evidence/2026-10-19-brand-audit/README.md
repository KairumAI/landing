# Revisión de marca y leyendas · 19 de octubre de 2026

La landing tiene una identidad reconocible en su apertura, tipografía y cierre
amarillo. La oportunidad principal es hacer que cada producto se reconozca y
muestre su tarea con la misma claridad. Analytics y Agents ya tienen desarrollo
editorial; sus demostraciones pueden ganar presencia en la apertura. Prompt
Intelligence y Traffic necesitan conectar mejor sus objetos visuales con lo que
la persona puede entender o decidir.

## Versión y alcance

Se revisaron en navegador las 21 páginas de contenido en español y las secciones
de Home, sobre la publicación `622871833153e281cdff8ab8a79f61532202ff65`
([PR #6](https://github.com/KairumAI/landing/pull/6),
[Deploy aprobado](https://github.com/KairumAI/landing/actions/runs/39261913485)).
La rama `fix/landing-functional-legends` introduce únicamente el ajuste de
leyendas en ES/EN/PT-BR y su documentación. La paleta, composición y movimiento
descritos abajo son propuestas, todavía sin implementar.

Las 41 capturas son nativas del navegador y de esta revisión. El
[manifiesto](manifest.json) registra URL, fecha, dimensiones de imagen y SHA-256;
las capturas locales también registran viewport CSS, ausencia de desborde y
leyendas leídas en el DOM. Se preservan los archivos originales, sin retoque.
Las capturas 01–37 muestran la versión publicada; 38–41, el ajuste local.

## Hallazgos y prioridades

| Prioridad              | Hallazgo                                                                                                                         | Cambio propuesto                                                                                                                                         | Evidencia                                                                                                                                                                                                                    |
| ---------------------- | -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P2                     | Analytics, Agents y los demás módulos repiten el acento amarillo y se parecen entre sí.                                          | Reservar el amarillo para la firma y la conversión global; identificar cada módulo con un acento estable en nombre, iconos, selección y visualizaciones. | [Home Analytics](runtime/04-home-analytics-1440.jpg), [Home Agents](runtime/07-home-agents-1440.jpg), [referencia verde](runtime/02-profound-analytics-1440.jpg), [referencia violeta](runtime/11-profound-agents-1440.jpg). |
| P2                     | En la apertura de Analytics y Agents se alcanza a ver el comienzo de la demostración; la tarea queda más abajo.                  | Reducir espacio previo y acercar una vista legible a la promesa. Mantener una muestra breve en Home y el recorrido completo en producto.                 | [Analytics](runtime/06-analytics-product-1440.jpg), [Agents](runtime/20-agents-product-1440.jpg).                                                                                                                            |
| P2                     | Las escenas materiales de Prompt y Traffic tienen peso visual, pero explican menos el uso que las interfaces editoriales nuevas. | Conservar el material de marca y añadir una capa funcional: pregunta → intención; visita humana y solicitud de crawler como recorridos distintos.        | [Prompt](runtime/17-prompt-product-1440.jpg), [Traffic](runtime/18-traffic-product-1440.jpg).                                                                                                                                |
| P2 resuelto en la rama | Las aclaraciones comerciales largas desvían la atención de la tarea.                                                             | Sustituirlas por leyendas junto a la lectura, como Pregunta / Respuesta / Fuente o Contexto / Propuesta / Revisión.                                      | [Marcas antes](runtime/21-marcas-1440.jpg), [Marcas después](runtime/38-leyendas-marcas-1440.jpg), [Agencias después](runtime/39-leyendas-agencias-768.jpg).                                                                 |
| P3                     | El catálogo y las tarjetas de servicios tienen vacíos que diluyen la continuidad.                                                | Ajustar alturas y alinear imagen, argumento y acción según el contenido de cada tarjeta.                                                                 | [Catálogo](runtime/15-catalogo-1440.jpg), [servicios](runtime/12-home-servicios-1440.jpg).                                                                                                                                   |
| P3                     | Las tres fotos del equipo tienen tratamientos y escalas diferentes.                                                              | Unificar encuadre y escala por CSS, preservando los originales y las credenciales autorizadas.                                                           | [Equipo](runtime/34-equipo-1440.jpg).                                                                                                                                                                                        |

Estas prioridades son de diseño y comunicación. No son fallos de seguridad ni
una afirmación de incumplimiento de accesibilidad.

## Referencia de Profound y adaptación KAIRUM

Se capturaron las páginas actuales de
[Answer Engine Insights](https://www.tryprofound.com/features/answer-engine-insights)
y [Agents](https://www.tryprofound.com/features/agents). La primera identifica el
módulo con verde; la segunda, con violeta. Los estados seleccionados y las
demostraciones aportan una lectura de producto más allá del color. La captura
[del panel de citas](runtime/05-profound-panel-1440.jpg) muestra categorías
diferenciadas junto a sus nombres.

La propuesta mantiene la paleta clara de KAIRUM, su tipografía y la convergencia
del logo. Los acentos identifican productos, sin convertir las páginas completas
en superficies de color ni alterar el significado del sentimiento de Analytics.

| Rol                                       | Acento propuesto             | Aplicación                                                                             |
| ----------------------------------------- | ---------------------------- | -------------------------------------------------------------------------------------- |
| KAIRUM, AI Report, Consulting y editorial | Amarillo existente `#FFC400` | Firma, agenda y cierre comercial.                                                      |
| Analytics                                 | Verde `#087F5B`              | Identificador del módulo, vista seleccionada y serie principal de presencia.           |
| Agents                                    | Violeta `#6F55C7`            | Identificador, paso activo, diferencias y revisión.                                    |
| Prompt Intelligence                       | Azul `#2D63C8`               | Pregunta, intención y agrupación seleccionada.                                         |
| Traffic                                   | Verde azulado `#087F8C`      | Identificador y recorrido activo; visitantes y crawlers conservan etiquetas distintas. |

Cada significado necesita texto o forma además de color. El verde de Analytics
no debe aplicarse a todos los estados de sentimiento; la selección de módulo y
el significado de una señal son contratos distintos. Los textos esenciales se
mantienen en los neutros de marca y los contrastes se verifican sobre cada
superficie real al implementar.

## Movimiento que explica

El sitio ya conserva GSAP, interacción con puntero, pausas fuera de vista y
`prefers-reduced-motion`. La revisión no añade una librería ni reescribe esas
animaciones. Las imágenes estáticas no acreditan ritmo o continuidad temporal.

La siguiente iteración debería especificar una secuencia breve por producto:

1. Prompt: una pregunta se relaciona con su intención y un grupo de preguntas.
2. Analytics: una lectura cambia y se destaca la señal que merece atención.
3. Agents: brief y fuentes pasan a propuesta; el equipo revisa las diferencias.
4. Traffic: una visita y una solicitud de crawler recorren caminos distinguibles.

Las secuencias deben conservar un estado final legible sin movimiento. Los
elementos que flotan o aparecen deben apoyar esa tarea. El blog mantiene un
ritmo de lectura más tranquilo y sus portadas originales.

## Recorrido de las 21 páginas

| Página                      | Lectura y siguiente mejora                                                                                                    | Captura                                                                                                                                                                                                                                                                                                                                                              |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Home                        | Apertura y cierre reconocibles. Diferenciar los módulos, mantener una sola muestra por producto y conectar sus transiciones.  | [01](runtime/01-home-1440.jpg), [03](runtime/03-home-prompt-1440.jpg), [04](runtime/04-home-analytics-1440.jpg), [07](runtime/07-home-agents-1440.jpg), [08](runtime/08-home-traffic-1440.jpg), [10](runtime/10-home-brandhub-1440.jpg), [12](runtime/12-home-servicios-1440.jpg), [13](runtime/13-home-recursos-1440.jpg), [14](runtime/14-home-contacto-1440.jpg). |
| Productos                   | Clarificar la comparación entre productos reduciendo alturas vacías.                                                          | [15](runtime/15-catalogo-1440.jpg).                                                                                                                                                                                                                                                                                                                                  |
| AI Report                   | La lectura pregunta/respuesta/evidencia funciona. Se ajustó su leyenda; conservar el enfoque de diagnóstico.                  | [16](runtime/16-ai-report-1440.jpg), [40](runtime/40-leyendas-report-390.jpg).                                                                                                                                                                                                                                                                                       |
| Prompt Intelligence         | Conectar la escena de lupa y preguntas con intención y selección.                                                             | [17](runtime/17-prompt-product-1440.jpg).                                                                                                                                                                                                                                                                                                                            |
| Analytics                   | Tres vistas comprensibles. Acercar la demostración al título y aplicar verde de módulo.                                       | [06](runtime/06-analytics-product-1440.jpg), [36](runtime/36-analytics-768.jpg), [41](runtime/41-leyendas-analytics-320.jpg).                                                                                                                                                                                                                                        |
| Agents                      | Mantener creación, contexto y revisión. Dar más presencia inicial a la propuesta y diferenciar el módulo con violeta.         | [20](runtime/20-agents-product-1440.jpg), [09](runtime/09-agents-product-desktop.jpg).                                                                                                                                                                                                                                                                               |
| Traffic                     | Distinguir visualmente visita humana, crawler y fuente de tráfico.                                                            | [18](runtime/18-traffic-product-1440.jpg).                                                                                                                                                                                                                                                                                                                           |
| Consulting                  | Conservar la presentación editorial y conectar mejor diagnóstico, intervención y siguiente paso.                              | [19](runtime/19-consulting-1440.jpg).                                                                                                                                                                                                                                                                                                                                |
| Marcas                      | La respuesta anotada explica una decisión. Nueva leyenda breve junto al documento.                                            | [21 antes](runtime/21-marcas-1440.jpg), [38 después](runtime/38-leyendas-marcas-1440.jpg).                                                                                                                                                                                                                                                                           |
| Agencias                    | El entregable y el reparto de trabajo explican el uso. Se simplificó el contexto visual.                                      | [22 antes](runtime/22-agencias-1440.jpg), [39 después](runtime/39-leyendas-agencias-768.jpg).                                                                                                                                                                                                                                                                        |
| Nosotros                    | Mantener propósito, método y personas. Homogeneizar encuadres del equipo.                                                     | [23](runtime/23-nosotros-1440.jpg), [34](runtime/34-equipo-1440.jpg).                                                                                                                                                                                                                                                                                                |
| Contacto                    | Cierre y formulario coherentes. Se observó la verificación automática; no se envió una consulta.                              | [32](runtime/32-contacto-1440.jpg).                                                                                                                                                                                                                                                                                                                                  |
| Acceso                      | Mantener el puente hacia la plataforma sin trasladar al sitio público funciones del panel.                                    | [33](runtime/33-acceso-1440.jpg).                                                                                                                                                                                                                                                                                                                                    |
| Recursos                    | Mantener guía, artículos, glosario y método como puertas distintas.                                                           | [25](runtime/25-recursos-1440.jpg).                                                                                                                                                                                                                                                                                                                                  |
| Blog                        | Preservar portadas y jerarquía editorial; las próximas mejoras son consistencia con los acentos y calidad de nuevas lecturas. | [24](runtime/24-blog-1440.jpg).                                                                                                                                                                                                                                                                                                                                      |
| Guía de visibilidad         | Conservar desarrollo, fuentes y figuras que ayudan a la lectura.                                                              | [26](runtime/26-guia-1440.jpg).                                                                                                                                                                                                                                                                                                                                      |
| Cómo elegir preguntas       | Mantener el foco práctico y los enlaces al recorrido de producto.                                                             | [27](runtime/27-articulo-preguntas-1440.jpg).                                                                                                                                                                                                                                                                                                                        |
| Menciones, citas y visitas  | La distinción de señales debe seguir siendo explícita al aplicar color y movimiento.                                          | [28](runtime/28-articulo-senales-1440.jpg).                                                                                                                                                                                                                                                                                                                          |
| Cómo interpretar resultados | Conservar criterios y límites de interpretación, sin convertir señales en promesas comerciales.                               | [29](runtime/29-articulo-resultados-1440.jpg).                                                                                                                                                                                                                                                                                                                       |
| Glosario                    | Mantener consulta rápida y enlaces a desarrollos completos.                                                                   | [30](runtime/30-glosario-1440.jpg).                                                                                                                                                                                                                                                                                                                                  |
| Metodología                 | Conservar fuentes, fechas y límites; este cambio de leyendas comerciales no cambia el contenido metodológico.                 | [31](runtime/31-metodologia-1440.jpg).                                                                                                                                                                                                                                                                                                                               |

## Ajuste implementado: leyendas funcionales

Los cambios están en `src/i18n/` para los tres idiomas. Home y Prompt identifican
la pregunta; AI Report presenta Pregunta de negocio / Respuesta / Evidencia;
Analytics, Presencia / Narrativas / Fuentes; Agents explica el paso del brief a
la propuesta con revisión del equipo. Marcas y Agencias acortan la anotación
para facilitar la lectura.

Se conservaron «Tu marca», alternativas genéricas y dominios reservados
`.example`. No se añadieron clientes, mediciones atribuidas a KAIRUM,
integraciones o publicación automática. No se alteraron datos de gráficos,
interacciones, fotos ni informes publicados. Los identificadores técnicos de
los renderers R05 permanecen para que la integración siga siendo reversible.

La búsqueda de los rótulos retirados en el texto HTML comercial generado no
encontró coincidencias. El material educativo conserva sus ejemplos didácticos;
los estudios mantienen evidencia y metodología.

## Revisión independiente y verificación

El agente `release_code_review`, en sólo lectura, revisó los seis archivos del
ajuste y las capturas 38–41. También corroboró las leyendas inferiores en el HTML
generado ES/EN/PT-BR. Dictamen: **aprobado**, usabilidad **9,3/10**, estilo
**9,2/10**, fidelidad **9,6/10**, cero bloqueantes y ningún P1/P2 del cambio.
Estos puntajes corresponden sólo al ajuste textual. Las oportunidades de marca
anteriores siguen pendientes de diseño e implementación.

Verificación local del contenido de la rama:

- Referencia R05: `477f1e2338d2`, 51 assets, cinco hojas originales y 126
  extensiones localizadas conservadas.
- Astro: 127 archivos, cero errores, advertencias o indicaciones.
- Compilación de 66 páginas y comprobación del snapshot de informes aprobadas.
- Entrega: **46/46** pruebas aprobadas.
- Navegador: **150/151** en la ejecución completa con dos workers. El único fallo
  fue la muestra temporal de Source: reunió dos frames donde exigía más de dos.
  El archivo completo de movimiento, sin cambios de código ni tests, aprobó
  después **4/4** con un worker. No se presenta la ejecución inicial como
  151/151. Una primera ejecución de seis workers fue interrumpida con SIGTERM.
- Capturas locales: 1440, 768, 390 y 320 px CSS sin desborde horizontal. Las de
  AI Report y Analytics muestran apertura y reflujo; sus leyendas quedan bajo
  el primer pliegue y se corroboraron en el DOM.

La revisión de escritorio abarca las 21 páginas, con muestras móviles específicas
y las pruebas existentes. No acredita todas las combinaciones de página, estado,
idioma y dispositivo ni una certificación WCAG. El formulario local no tiene
variables públicas configuradas; esa condición no se atribuye a producción.
No se enviaron formularios ni se comprobó recepción de correo.

La integración debe completar el CI del nuevo SHA y la verificación HTTPS del
deployment correspondiente. Los colores y la reestructuración amplia no están
incluidos en este ajuste.
