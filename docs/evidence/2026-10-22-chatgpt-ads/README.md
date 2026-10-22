# ChatGPT Ads en Argentina · 22 de octubre de 2026

Incorporación del artículo y diseño aprobados en una vista previa real del blog
Astro. Destino canónico: `https://kairum.com.ar/blog/chatgpt-ads-argentina/`.

## Alcance

Base de publicación y de la vista previa: `8edc4ace7701b616eaa1d3e79546a9d988e489bd`.
La incorporación usa una copia y rama aisladas. PR #11 y su trabajo SEO quedan
fuera del cambio. El código de main y los PRs no contenían otro artículo de
ChatGPT Ads antes de esta incorporación. Chrome confirmó HTTP 200 del blog y
del sitemap sin esta pieza, y HTTP 404 de la ruta nueva.

Se conserva exactamente el cuerpo bajo «Artículo», sin notas editoriales o de
implementación. La bajada se presenta como introducción, sin su rótulo Markdown.
El cierre incluye el enlace recíproco al post real de LinkedIn solicitado.
Solo está aprobada la edición española: la disponibilidad ES sigue el registro
editorial existente, como el artículo de Adobe. No se crean traducciones.

La plantilla, navegación, CTA y artículos anteriores se conservan. La
entrada en blog/recursos, sitemap y lectores de texto usa el mecanismo existente.
El selector existente que conserva la portada completa de Adobe en su tarjeta
también se aplica al PNG nuevo; solo evita recortar texto del nuevo artículo.
`seoTitle` opcional permite conservar el título SEO aprobado solo en metadata,
sin cambiar los títulos visibles ni la metadata de las otras páginas.

## Integridad

El título, la bajada, los encabezados, párrafos y el cierre de LinkedIn tienen el
mismo SHA-256 visible, normalizado por espacios, que el original y la vista
previa aprobada:
`5df5f672271f4016c659f1af864b07de911905a0cac80df025d2c112b9e77b60`.

La portada original inspeccionada visualmente se copia sin recodificar:
`chatgpt-ads-argentina-portada.png`, 1600 × 900, 1.231.121 bytes. SHA-256:
`ff5cab5af454ff22ac2d6cdfe4fb187403719cdb2066a777e77de82e77b72220`.

Se conservan los seis enlaces en orden, incluidas las dos fuentes oficiales de
OpenAI, el CTA a Kairum y el permalink de LinkedIn:
`https://www.linkedin.com/feed/update/urn:li:share:7519082123975139328/?actorCompanyId=145284611`.
La publicación no modifica LinkedIn.

La relectura automatizada de las dos fuentes oficiales recibió HTTP 403 con
desafío de Cloudflare; se detuvo esa dependencia sin sortear el desafío. Los
enlaces permanecen exactos respecto al texto aprobado. Esta limitación externa
no equivale a una confirmación de lectura nueva de las fuentes.

## Validación

El main limpio pasó referencia R05 y 46/46 pruebas de entrega con Bun 1.4.0.
La validación final comprende formato, tipos, referencia, entrega, suite E2E,
integridad del texto/PNG, metadata, disponibilidad ES, navegación sin JS y
capturas de escritorio y móvil del runtime final.

La ronda final de revisión independiente del diff y runtime está aprobada:
usabilidad 9,3/10, estilo 9,3/10 y fidelidad 10/10, sin bloqueantes de código o
diseño. Las aperturas de 1440 y 390 px coinciden píxel por píxel con la vista
previa aprobada. Se corrigieron el recorte de la tarjeta nueva y dos expectativas
de sitemap que pasan de 61 a 62 URLs.

Capturas del runtime final con todas las imágenes cargadas:

- [Apertura 1440 px](article-top-1440.png) y [390 px](article-top-390.png).
- [Artículo 1440 px](article-1440.png), [768 px](article-768.png),
  [390 px](article-390.png) y [320 px](article-320.png).
- [Cuerpo móvil](article-body-390.png) e [índice del blog](blog-1440.png).
- [Registro de integridad, reflow y accesibilidad](runtime.json).

Chrome mediante Playwright, sin nuevas dependencias. Cero errores de consola,
recursos fallidos, desbordes o violaciones axe WCAG A/AA en 1440 y 390 px.

La publicación se verifica por separado: CI del commit exacto del PR, squash
merge a main, Deploy automático y comprobación de la URL pública, canonical,
texto, portada, fuentes y enlace recíproco. Un push o PR por sí solo no acredita
la publicación.
