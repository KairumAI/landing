# SEO comercial y comparación GEO · 2026-10-22

Preparación de PR sobre `main` remoto
`8edc4ace7701b616eaa1d3e79546a9d988e489bd`. No publica el sitio.

## Alcance

- Nueva lectura ES/EN/PT-BR en `/blog/kairum-vs-fardo-cleexs-tribu-geo/`,
  incorporada al blog, Recursos, rutas, alternates, sitemap y lectores de texto
  mediante el registro editorial existente. Sitemap: 61 → 64 URLs.
- Títulos y descripciones de Prompt Intelligence, Traffic y Consulting que
  explican intención y alcance. Los dos productos planificados conservan esa
  condición en la descripción. AI Report, Analytics y Agents conservan sus metadatos.
- Enlaces contextuales desde la comparación a AI Report, Analytics, Consulting,
  metodología y lecturas prácticas. Sin nuevas dependencias, estilos ni despliegues.
- Se mantienen los bytes de los informes públicos y el artículo aprobado de Adobe.

## Criterio y fuentes

La diapositiva 9 de la presentación KAIRUM Pitch v26 inspiró los proveedores y
los ejes de comparación. Su matriz distingue oferta publicada, evidencia parcial
y alcance previsto de KAIRUM. No se trasladan sus indicadores a un ranking ni
se publican la presentación, sus imágenes o información comercial interna.

Las afirmaciones del artículo se basan en la nueva revisión de estas fuentes
públicas del 22 de octubre de 2026:

| Fuente                                                                               | Observación usada                                                                 |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------- |
| [Fardo: planes](https://www.heyfardo.com/en/planes)                                  | Auditoría y seguimiento; Growth publica competencia, contenido y conexión GA4.    |
| [Cleexs](https://cleexs.net/)                                                        | Diagnóstico por URL, score, competencia y oferta paga con monitoreo/alertas.      |
| [Tribu GEO: visibilidad](https://tribugeo.com/servicios/posicionamiento-en-chatgpt/) | Oferta de optimización de contenido y seguimiento.                                |
| [Tribu GEO: agentes](https://tribugeo.com/servicios/agentes-ia/)                     | Servicios de agentes de marketing.                                                |
| [KAIRUM: metodología](https://kairum.com.ar/metodologia/)                            | Alcance y límites; contrastado con el código de la landing en la base de esta PR. |

La página de planes de Cleexs no pudo consultarse; no se extrapolan precios ni
límites a partir de ella. La comparación declara autoría de KAIRUM, revisión
documental, ausencia de prueba de cuentas pagas y plataforma propia en desarrollo.
Las sugerencias de elección se identifican como criterio editorial. No se
atribuyen resultados, ventajas exclusivas o capacidades ausentes a terceros.

## Validación local

- Formato: aprobado.
- Astro check: 131 archivos, cero errores, advertencias o sugerencias.
- Referencia R05: aprobada; no se regeneraron fingerprints.
- Compilación de Astro 7.3.5 usando Node 22.22.1: 70 páginas generadas.
- Verificador de entrega sobre `dist`: 26 informes, 2959 archivos del snapshot,
  3131 archivos públicos y 34541 enlaces de informes verificados.
- HTML generado de los tres idiomas: un H1, canonical propio, cuatro alternates,
  indexabilidad y BlogPosting con fecha 2026-10-22 comprobados. Sitemap: 64 URLs.

El entorno local dispone de Bun 1.4.2. El script canónico de compilación falla
por `EPERM` al escribir al proceso de esbuild. El servidor local también es
rechazado por el sandbox (`listen EPERM 127.0.0.1:4322`). Por eso las pruebas de
navegador y las capturas responsive no se presentan como aprobadas localmente.
La configuración de Bun 1.4.0 y los gates existentes de CI permanecen intactos.

Se agregan seis pruebas de comparación/metadatos para CI: descubrimiento,
fuentes, enlaces localizados, schema, reflow, navegación sin JS, accesibilidad y
errores de ejecución. Los conteos existentes del sitemap se actualizan a 64.

## Revisión y cierre

Revisión independiente de código y contenido completada en solo lectura: cero
hallazgos P0/P1/P2 confirmados. Se inspeccionaron 77 enlaces por idioma, sin
destinos internos ni fragmentos inexistentes. El revisor deja pendiente la
legibilidad de la tabla a 320 px y no emite aprobación visual.
La PR permanece en borrador hasta registrar CI y la revisión visual del runtime
en 1440, 768, 390 y 320 px con los criterios de AGENTS.md. No se asigna una
puntuación visual sin capturas. Este registro no acredita publicación, nueva
indexación ni mejora de posicionamiento.
