# 0008 · Unificar la landing aprobada con Astro y SEO

Fecha: 2026-10-04. Estado: aceptada para implementación y validación local.

## Contexto

Bruno aprobó la Home cinematográfica R05, revisión `477f1e2338d2`, y pidió
conservarla al unificarla con el trabajo de Joaquín en `KairumAI/landing`.
La base de integración es `6489c6794bafb54f94cac6659cb0b79ea0921a26`.
El worktree original y sus cambios pendientes permanecen intactos.

## Decisión

- Astro genera HTML estático para Home, catálogo, seis productos, soluciones,
  empresa, contacto y acceso. Se reutilizan los componentes HTML KAIRUM,
  sus IDs, atributos ARIA, tokens, assets y composición aprobados.
- El texto visible se centraliza en `src/i18n/`, con diccionarios completos en
  español, inglés y portugués. Los enlaces y el selector de idioma conservan
  la página equivalente, incluidos los fragmentos.
- Se conservan los favicons, Open Graph, canonical, robots, `llms.txt`, las
  cabeceras de seguridad y los workflows de Joaquín. Sitemap y hreflang se
  amplían para cada ruta equivalente; 404 y acceso no se indexan.
- Se reutilizan GSAP 3.15.0, Chart.js 4.5.1 y Three.js 0.186.1 de la versión
  aprobada. GSAP conserva entradas y rotor; Chart.js se carga al entrar en
  una escena Analytics. Three queda limitado a las escenas de contexto que
  lo requieren, y no se instancia en Home ni en las cuatro aperturas de producto.
  No se incorpora React ni se consulta ningún proveedor.
- Todo JavaScript y fuente se sirve desde el propio sitio. La CSP mantiene
  `script-src 'self'`; no se agregan CDNs, trackers ni `unsafe-eval`.
  Astro empaqueta módulos/CSS con hash para su caché inmutable. Los assets
  nativos conservan los bytes y reciben caché revalidable.
- La biblioteca pública de informes sigue siendo la superficie ya publicada
  en `https://kairum.com.ar/informes/`; no se copian respuestas, propuestas ni
  datos del repositorio privado a este repositorio público. Mover el dominio
  o los informes requiere una entrega separada y comprobada.

## Coste y validación

Las librerías aumentan el JavaScript respecto de la Home anterior de Joaquín:
se eligen para conservar el comportamiento aprobado. La evidencia de esta
entrega registrará tamaños brutos/gzip, carga diferida, ausencia de errores,
movimiento reducido, NoJS, enlaces, SEO por ruta y pruebas de navegador.
No se atribuyen rankings, resultados de clientes ni mejoras de posicionamiento
al cambio de framework.

Medición de la compilación estática candidata `7207357b71e1`:

| Recurso                             | Bytes brutos | Bytes gzip (nivel 9) | Cuándo se carga                                 |
| ----------------------------------- | -----------: | -------------------: | ----------------------------------------------- |
| Entrada de marketing, incluido GSAP |       137338 |                52454 | Cliente de la página                            |
| CSS canónico                        |       114033 |                20926 | Documento                                       |
| Chart.js auto                       |       202209 |                68368 | Al acercarse a Analytics                        |
| Three                               |       538323 |               131627 | Contexto que contiene el canvas correspondiente |

El aviso del bundler sobre un chunk mayor a 500 kB corresponde a Three, que ya
está separado por import dinámico; no se instancia en Home ni en las cuatro
aperturas. Los tamaños gzip son una medición local, no una afirmación sobre la
compresión o latencia del hosting. Los PNG aprobados se mantienen idénticos en
esta entrega; cualquier optimización de formato debe conservar el aspecto y
pasar nuevamente por comparación y revisión.

Toda aprobación visual será nueva e independiente, con al menos 9/10 en
usabilidad, estilo y fidelidad y cero bloqueantes. Preparar y revisar localmente
no publica un release, no mueve el dominio ni aprueba el environment production.
