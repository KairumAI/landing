# Blog elaborado e ilustrado · 16 de octubre de 2026

Revisión solicitada por Bruno sobre la entrega de Recursos/Blog de PR #4. La
versión evaluada se identifica por `source_version` **ee5edb78987fc8d9** en
[source-manifest.json](source-manifest.json), sobre commit base
`ffee7fa887268a18b1d0a00875f07fa4630afc55`. El manifiesto incluye los 156 archivos
de `src/`, `scripts/`, `tests/` y `public/editorial/`; su versión se calcula con
SHA-256 de `ruta + NUL + hash + LF`, en orden, truncado a 16 caracteres.

## Resultado editorial

Una guía y tres lecturas ampliadas en español, inglés y portugués de Brasil.
Cada una tiene una portada original, tres aprendizajes, índice, figura HTML,
ejercicios construidos y fuentes. El valor está en el caso trabajado y la
aplicación: separar señales, elegir seis preguntas con propósito, documentar una
muestra y entender qué cambia cuando 6/20 pasa a 6/10. Los ejemplos y cálculos no
son resultados de clientes ni mediciones de KAIRUM.

Se produjeron cuatro ilustraciones con el mismo lenguaje de papel, carbón y
amarillo. Los doce derivados locales pesan 1.431.874 bytes en total; las versiones
WebP a 640 px pesan entre 22 y 45 kB y las de 1280 px entre 96 y 157 kB.
[Inventario y dimensiones](media.json), [dirección y prompts](../../design/editorial-illustrations.md).
Open Graph, Twitter y los datos estructurados utilizan la portada de cada
lectura, con alt localizado. Las tarjetas cargan las imágenes de forma diferida.

## Revisión independiente

Ronda 1, versión `4e3bafc016391eed`: contenido y cálculos correctos, con un P2
confirmado de foco invisible en tarjetas. El outline del enlace quedaba fuera de
su padre con `overflow:hidden`: [antes](focus-before.png) y
[prueba que falla antes de la corrección](focus-before.log). Se agregó el indicador
al contenedor `:focus-within` y una prueba en 1440/320 px. La versión actual conserva
este cambio y agrega espera de decodificación/paint a las capturas para que las
imágenes asíncronas formen parte de la evidencia.

La [revisión visual definitiva](review.md) aprueba usabilidad 9.3/10, estilo
9.4/10 y fidelidad a R05 9.4/10, con cero bloqueantes.
Las capturas anteriores a esta revisión conservan su alcance histórico.

## Verificación

- [Referencia R05](reference.log): 51 assets, cinco CSS y 13 páginas originales conservados al revertir los deltas editoriales declarados.
- [Tipos](types.log), [build estático](build.log), [formato](format.log) y `git diff --check`.
- [Pruebas E2E](e2e.log): 38 aprobadas; teclado, enlaces reales, ES/EN/PT-BR, imágenes locales y previews sociales, lectura sin JavaScript, metadatos, rutas y entregas públicas.
- [Entrega](delivery.log): 43 pruebas de preservación, referencia y guardas de publicación.
- [44 observaciones de ruta/viewport](screenshots/viewports.json): 1440, 768, 390 y 320 px. Capturas de aperturas y detalle, figuras en 320 px, foco visible y muestras EN/PT-BR.

Una corrida inicial conservaba el contrato anterior de imagen social genérica y
se actualizó para exigir la portada por artículo. Otra se invalidó por un cierre
SIGTERM del preview local; la corrida definitiva administra el servidor dentro de
Playwright. Ninguna falla de esa corrida interrumpida se usa como evidencia de
un defecto de contenido ni como validación aprobada.

## Límites

Vista previa y preparación de PR. No se publica desde esta rama. Se conservan
66 páginas estáticas, 60 URLs indexables en sitemap y los 26 informes públicos
con sus 2.959 archivos originales y `noindex`. No se agregan dependencias,
proveedores al sitio, CMS ni scripts editoriales. Esta entrega prepara contenido
para descubrimiento y medición; no acredita indexación ni mejora de posiciones,
tráfico, GEO/AEO o ventas.
