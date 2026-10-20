# Artículo de Adobe · 20 de octubre de 2026

Publicación del artículo aprobado «Tu próximo cliente puede llegar desde una IA.
¿Tu marca está preparada?» dentro del blog Astro existente. Destino canónico:
`https://kairum.com.ar/blog/compras-desde-ia-adobe/`.

## Alcance

Base: `2b669d8`, `KairumAI/landing`. Antes de incorporar el artículo se comprobaron
el índice público, el sitemap, el repositorio y los PRs: sin duplicados. La ruta
de destino devolvía HTTP 404. El flujo vigente es PR a `main`, check `verify`,
squash merge y Deploy automático a Cloudflare Pages `kairum`.

Se conserva únicamente el cuerpo editorial aprobado, hasta la declaración de
fuentes públicas de Adobe y Google. La edición aprobada es la original española:
el registro editorial limita su ruta, tarjetas, alternates, sitemap y lectores a
ES. Los otros artículos conservan sus tres idiomas. Se mantiene la plantilla,
los componentes y el despliegue existentes, sin nuevas dependencias.

La extensión opcional de texto enriquecido permite conservar enlaces en su
posición, la lista numerada y el nivel del último encabezado, sin insertar la
política editorial adicional de la plantilla dentro del cuerpo aprobado. La
fecha individual no altera la revisión de los artículos anteriores.

## Integridad editorial y de imágenes

El título, la introducción y el cuerpo visible, normalizados solo por espacios y
sin sintaxis Markdown, coinciden con el original aprobado. SHA-256:
`9617c3eb4f515becf51e47d5a000293bc9bd99f5fae1d86e23f881179de0eafe`.

Los dos PNG se inspeccionaron visualmente y se copiaron sin recodificar. Sus
hashes coinciden con los entregables originales:

| Archivo                                        | Dimensiones | Bytes  | SHA-256                                                            |
| ---------------------------------------------- | ----------- | ------ | ------------------------------------------------------------------ |
| `KAIRUM-blog-compras-IA-portada.png`           | 1920 × 1080 | 82689  | `9560c28327883a9acc42bac372f563e38d692c1241a12d867462040fb7f06008` |
| `KAIRUM-Adobe-conversion-relativa-grafico.png` | 1600 × 1200 | 139918 | `f4bc0783b394cc7b8d756a1b5b2fcb6bf10a390940ad94ef63f2c72e85d765e9` |

Se conservan los cuatro enlaces editoriales: Adobe, Google Search Central,
Calendly y el informe original. Las fuentes de Adobe se abrieron y su contenido
fue comprobado; Google y Calendly respondieron HTTP 200. El texto mantiene el
60% como comparación relativa observada de tasas IA/no IA, retail estadounidense,
julio de 2026; sin causalidad ni atribución exclusiva a ChatGPT.

## Validación local

Bun 1.4.0, dependencias del lockfile, Astro 7.3.5 y Chrome instalado mediante la
opción existente `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. La caché local no incluía
la revisión de Chromium solicitada por Playwright; no se cambiaron dependencias
ni configuración del proyecto. Browser plugin not available; se utilizó
Playwright conforme al flujo del repositorio.

- Formato aprobado.
- Astro: 0 errores, 0 advertencias, 0 sugerencias.
- Referencia R05: 51 assets, 5 hojas base, 13 páginas y 132 variantes de contacto
  conservados.
- Entrega: 46/46 pruebas aprobadas.
- Navegador: 152/154 en la suite completa. Hubo un timeout de Agents ES y una
  muestra insuficiente de frames en source-motion, ambos archivos existentes sin
  cambios. Repetición aislada de esos dos archivos con un worker: 12/12
  aprobadas, sin modificar código, tests ni timeouts. El CI obligatorio debe
  aprobar el commit del PR antes del merge.
- Regresión específica: fidelidad del editorial por hash, cuatro enlaces en
  orden, bytes de ambos PNG, fecha propia, descubrimiento desde el blog,
  disponibilidad solo ES y lectura/navegación sin JavaScript.

`runtime.json` registra la captura de la versión actual en 1440, 768, 390 y
320 px: sin overflow ni errores de consola; ambas imágenes cargadas con sus
dimensiones originales y el mismo hash del editorial en los cuatro anchos.

## Ronda visual independiente

Revisión en solo lectura del diff, original aprobado, hashes y capturas del
runtime actual: **aprobada, cero bloqueantes**. Usabilidad 9,2/10, estilo 9,4/10
y fidelidad 9,8/10. El crítico comprobó texto exacto, PNG originales, cuatro
anchos, índice con sus cuatro tarjetas y alcance limitado al artículo.

Observación menor: los rótulos del gráfico quedan compactos en 320 px; el texto
equivalente, el alt y el zoom mantienen accesible la información. Se conserva el
PNG aprobado.

- [Artículo en 1440 px](article-1440.png), [768 px](article-768.png),
  [390 px](article-390.png) y [320 px](article-320.png).
- [Apertura de escritorio](article-top-1440.png) y
  [apertura móvil](article-top-390.png).
- [Gráfico de escritorio](article-graph-1440.png) y
  [gráfico móvil](article-graph-390.png).
- [Índice del blog](blog-1440.png).

Las capturas acreditan el runtime local. La publicación se confirma por separado
con el commit integrado, los checks/Deploy y la página pública con sus dos PNG.
