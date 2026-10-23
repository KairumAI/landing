# Comparativo aprobado V4 · 23 de octubre de 2026

Artículo «KAIRUM vs. Fardo, Cleexs y Tribu GEO: de la pregunta a la acción».
Ruta canónica: `https://kairum.com.ar/blog/kairum-vs-fardo-cleexs-tribu-geo/`.

## Alcance aislado

Base limpia: `main` remoto `a423f864c2a7bcefd0b26b909791092ed3a92842`.
El PR #11 conserva su rama y head `40b60b76925828d64cdfa34d87f6ba38f6f86985`.
Su comparativo previo en tres idiomas y los cambios de metadatos comerciales
quedan fuera de esta entrega. No se aplica su commit completo.

Se incorpora el texto aprobado `KAIRUM-articulo-comparativo-v4.md` y los cuatro
PNG originales V3, sin recodificar. Se excluyen frontmatter de borrador y nota
editorial interna. Los seis párrafos cortos siguen a la matriz y su explicación;
no se duplican las seis secciones extensas de versiones anteriores.

Se reutiliza el registro y la plantilla editorial existentes. La disponibilidad
se limita a ES en rutas, tarjetas, alternates, sitemap y lectores. Las referencias
tipadas de EN/PT apuntan al mismo objeto, como en los artículos aprobados previos;
no generan traducciones, rutas ni tarjetas en esos idiomas.

Las dos figuras emplean `picture` con los PNG móviles hasta 1100 px. La matriz
conserva una tabla HTML equivalente con caption y encabezados de fila/columna,
disponible en el desplegable «Qué comparar». Su región admite desplazamiento
horizontal sin ampliar la página. Los originales pueden abrirse desde las figuras.
Los estilos adicionales están limitados al comparativo; no cambian productos,
dependencias, workflows ni el snapshot de informes.

## Integridad aprobada

Texto visible del Markdown, normalizado únicamente por espacios y sintaxis de
presentación: SHA-256
`6c3e59d141cae14dcbb875e4d9d9fec5ee83e811755e35534e9b07ea77f05a17`.
Se comprueba contra el HTML y los cuatro anchos del runtime.

| Archivo                                 | Dimensiones | SHA-256                                                            |
| --------------------------------------- | ----------- | ------------------------------------------------------------------ |
| `KAIRUM-matriz-valor-v3.png`            | 1600 × 1260 | `06f34adc5fc9bc80b4e5d5d4577451a56ee566f77ca8ba589dd6d68dc420347d` |
| `KAIRUM-matriz-valor-movil-v3.png`      | 780 × 2605  | `6e51d7065f4d0a895ea75389489c721a89bfee8d52301ecd1b2abe0f6ea2e36b` |
| `KAIRUM-pregunta-a-accion-v3.png`       | 1600 × 1175 | `d85579668f7c926c0c65104fefe2c1945bb3d874ffbe48bcd6b936333ca13389` |
| `KAIRUM-pregunta-a-accion-movil-v3.png` | 780 × 2190  | `9fc7dbbf28c83f0a31da1a0cd573b944f5256757a815fa9364e83cd42a88d169` |

Los cuatro PNG también coinciden con los del ZIP editable V3. El body del ZIP
no se utiliza: el texto procede de V4.

## Fuentes y destinos

Fuentes públicas consultadas el 23/10/2026: [planes de Fardo](https://www.heyfardo.com/en/planes),
[Prompt Lens](https://chromewebstore.google.com/detail/fardo-be-the-answer/edgjbdfgllebaldjejnhjmmagniekgpm),
[oferta de Cleexs](https://cleexs.net/),
[guía de Teo](https://cleexs.net/articulos/guia-pro-visibilidad-en-motores-de-ia-para-pymes/),
[visibilidad de Tribu GEO](https://tribugeo.com/servicios/posicionamiento-en-chatgpt/)
y [agentes de Tribu GEO](https://tribugeo.com/servicios/agentes-ia/).
La comparación conserva las distinciones de V4 entre oferta pública, evidencia
afín y sin verificar. Las capacidades de KAIRUM proceden de la confirmación de
su equipo. No se presenta auditoría independiente, exclusividad ni eficacia
superior demostrada; el recorrido es un ejemplo hipotético.

Antes de incorporar el artículo, AI Report y Consulting respondieron HTTP 200
en sus destinos originales; el slug del artículo devolvía 404. Las rutas locales
y las referencias del índice se validan en las pruebas. Se conservan los enlaces
editoriales aprobados, en su orden, sin destinos sociales nuevos.

## Validación local

Equipo: BrunoHP. Bun 1.4.0 y dependencias del lockfile sin cambios.
Browser plugin not available; se usa el Chrome instalado mediante la opción
existente `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`, contra `127.0.0.1:4322`.

- Formato aprobado; R05 conservado: 51 assets, 5 hojas base, 13 páginas y
  144 variantes de contacto.
- Astro check: 133 archivos, cero errores, advertencias o sugerencias.
- Build canónico: 69 páginas; 26 informes, 2959 archivos del snapshot,
  3135 archivos públicos y 34541 enlaces de informes comprobados.
- Entrega: 46/46 pruebas aprobadas.
- Comparativo: 4/4 pruebas aprobadas, incluidos texto/PNG por hash, enlaces,
  fecha, ES exclusivo, canonical, sitemap de 63 URLs, navegación sin JS,
  variantes móviles, tabla semántica y accesibilidad WCAG mediante axe.
- Suite completa: **161/161 pruebas aprobadas** con dos workers, en 4,7 minutos.

El primer intento del build y los workers dentro del sandbox sufrieron
restricciones de IPC. El mismo build canónico y las pruebas se ejecutaron con
permisos concedidos en BrunoHP. La descarga inicial de `@volar/typescript`
falló por integridad; se comprobó el SHA-512 oficial contra el lockfile y se
repitió la instalación congelada con integridad activa, que finalizó correctamente.

## Capturas y revisión

El runtime se comprueba en 1440, 768, 390 y 320 px: imágenes cargadas, mismo
hash editorial, página sin desbordamiento y consola sin errores ni advertencias.
Se prueba el desplegable de la tabla y la navegación por teclado a Fuentes.
Las capturas de página completa empiezan en scroll 0; las vistas de pantalla
conservan el header fijo real y evitan artefactos de capturas de elementos largos.

Ronda independiente en solo lectura aprobada: **cero bloqueantes**, usabilidad
**9,1/10**, estilo **9,3/10** y fidelidad **9,8/10**. Verificó texto visible
exacto, PNG originales, cuatro anchos, alcance del diff, enlaces/fragmentos y
disponibilidad ES. Comprobó la tabla con foco real y desplazamiento por teclado
con y sin JavaScript: `scrollLeft` de 0 a 240 px, región de 288 px y contenido
de 960 px. El valor inicial 0 de `runtime.json` se registró inmediatamente tras
la tecla y no representa un fallo de desplazamiento.

Observación menor: los rótulos de las imágenes son compactos en 320 px. Se
conservan los PNG aprobados; la tabla equivalente y los enlaces a los originales
permiten consultar el detalle. No quedan bloqueantes visuales ni editoriales.

- [Artículo en 1440](article-1440.png), [768](article-768.png),
  [390](article-390.png) y [320 px](article-320.png).
- [Apertura de escritorio](article-top-1440.png) y
  [móvil](article-top-390.png).
- [Matriz de escritorio](matrix-viewport-top-1440.png),
  [móvil superior](matrix-viewport-top-390.png) e
  [inferior](matrix-viewport-bottom-390.png).
- [Recorrido de escritorio](flow-viewport-top-1440.png) y
  [móvil](flow-viewport-top-390.png).
- [Seis párrafos, inicio](six-paragraphs-viewport-top-390.png) y
  [cierre](six-paragraphs-viewport-bottom-390.png).
- [Tabla en 320 px](table-320.png), [blog](blog-1440.png) y
  [comprobación del runtime](runtime.json).

La evidencia local no acredita publicación. Se requiere CI del head del PR,
squash merge verificado, Deploy y comprobación HTTP del artículo, canonical,
sitemap y los cuatro PNG originales.
