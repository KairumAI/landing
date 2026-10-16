# Recursos, blog y desarrollo comercial

Fecha: 2026-10-16. Repositorio: `KairumAI/landing`.
Base: `f8d3b9d9854734ed2c525d873a1ba7b2d076b756`.
Rama: `feat/recursos-blog`. Referencia de marca: R05 `477f1e2338d2`.

## Alcance comprobable

Ocho páginas nuevas por idioma: Recursos, blog, guía para medir visibilidad en
IA, menciones/citas/visitas, selección de preguntas, interpretación de
resultados, glosario y metodología. ES, EN y PT-BR tienen contenido completo,
metadatos propios y enlaces equivalentes. Son 24 rutas nuevas: la compilación
genera 66 páginas estáticas, incluidos tres accesos y tres 404; el sitemap
contiene 60 rutas indexables.

El contenido responde preguntas concretas, cita fuentes primarias y explicita
qué se midió, qué sigue siendo una hipótesis y qué no permite concluir una
observación. La firma editorial es KAIRUM, con fecha de revisión y política de
asistencia por IA visibles. Los ejemplos son educativos y están rotulados;
no se presentan como resultados de clientes.

La navegación global y las tarjetas de Recursos de Home llevan a contenido
real. Analytics, AI Report y Agencias suman contexto comercial y títulos
descriptivos. Los IDs y rutas de los productos se conservan. La home mantiene
su composición y sus escenas; la integración declara y revierte sus cambios
editoriales antes del chequeo de referencia.

## Versión y referencia

`source-manifest.json` identifica la versión `320cb003a88b6cce` y los 143 archivos
de `src/`, `scripts/` y `tests/` evaluados. Las capturas se obtienen del build con ese contenido, servido sólo
en `127.0.0.1`. El manifest no incluye esta documentación ni los propios PNG.
No se alteró `source-reference.json`: los 51 assets y cinco CSS originales
conservan sus hashes y las 13 páginas originales restauran su HTML exacto.

## Rondas de revisión

1. Se ejecutó la base antes de implementar: 28 pruebas existentes pasan. La
   configuración local usa el override soportado de Chrome porque el binario
   cacheado de Playwright no estaba instalado. Una ejecución inicial solapada
   produjo errores de archivos de trazas; se repitió en serie y no requirió
   cambiar el producto ni sus expectativas.
2. Los tres tests iniciales de rutas editoriales fallaron con 404; tras la
   implementación las rutas responden 200. La primera suite nueva descubrió
   un selector de test demasiado amplio, porque las lecturas relacionadas
   también usan `<article>`; se acotó al cuerpo de lectura.
3. La primera suite completa pasó 36/36; la suite de entrega pasó 43/43.
   Se capturaron nueve rutas en cuatro anchos, sin desbordamiento.
4. El crítico independiente en sólo lectura revisó composición, contenido,
   SEO, i18n, teclado, NoJS y el gate R05. Encontró un detalle P3: el caption
   accesible de una tabla se veía duplicado porque la utilidad `sr-only` no
   estaba cargada. Se añadió una utilidad acotada al contenido editorial,
   conservando el caption en el árbol accesible. Se recompila y recaptura para
   la ronda final; no se cambia el CSS original.
5. La repetición posterior pasó 35/36: el caso NoJS agotó sus 30 s esperando
   estabilidad del selector de idioma al pie, mientras continuaba el scroll
   nativo a `#fuentes`. El diagnóstico independiente confirmó el destino
   correcto; un diagnóstico aislado registró carga en 97 ms, espera del
   auto-scroll de Playwright y navegación por click en 102 ms una vez
   estabilizado. La activación nativa con foco y Enter navegó en 144 ms.
   El test NoJS ahora verifica ese recorrido por teclado con movimiento por
   defecto, sin forzar clics, dormir, aumentar tiempos o reducir movimiento.
   Conserva las verificaciones de fuentes, lectura, idioma equivalente y
   ancho. Pasó tres repeticiones consecutivas; la conservación del fragmento
   con JavaScript se comprueba en el recorrido compartido de idioma.

La ronda 2 del crítico independiente `landing_editorial_critic`, en sólo
lectura, aprueba las fuentes `320cb003a88b6cce` con cero bloqueantes y cero
hallazgos P1/P2/P3 pendientes:

| Criterio        | Puntaje |
| --------------- | ------- |
| Usabilidad      | 9.2/10  |
| Estilo          | 9.2/10  |
| Fidelidad a R05 | 9.4/10  |

El revisor comprobó las 24 rutas editoriales, H1, canonical, cuatro alternates,
Article/BlogPosting, sitemap, 143 hashes del manifest y gate R05 con mutaciones
rechazadas. Revisó composición y lectura en los cuatro anchos, Enter/Tab/Escape
en el menú, fuentes sin scripts y cambio de idioma nativo. Con JavaScript
confirmó en 320 px que `#fuentes` se conserva al pasar a EN, con foco en la
sección, título traducido y lectura sin overflow. Su
[registro de teclado y 768](critic/observations.json),
[caption final](critic/final-observations.json),
[contraste del scroll](critic/final-nojs-default-motion.json) y
[contraste JS/fragmento](critic/final-js-fragment.json) quedan preservados con
[captura del foco](critic/resources-menu-focus-1440.png),
[fuentes NoJS](critic/final-nojs-sources-320.png) y
[fuentes en inglés](critic/final-js-fragment-320.png).

## Verificación final

Todas las comprobaciones locales pasan sobre las fuentes registradas:

| Comando                            | Resultado                                            | Evidencia                   |
| ---------------------------------- | ---------------------------------------------------- | --------------------------- |
| `bun run check:reference`          | 51 assets, cinco CSS y 13 páginas R05                | [Referencia](reference.log) |
| `bun run format:check`             | Sin diferencias de formato                           | [Formato](format.log)       |
| `bun run check`                    | 99 archivos; cero errores, warnings e hints          | [Tipos](check.log)          |
| `bun run build`                    | 66 páginas; 26 informes y 2.959 archivos conservados | [Build](build.log)          |
| `bun run test --workers=2`         | 36/36; 1.8 min                                       | [E2E](e2e.log)              |
| `bun run test:delivery`            | 43/43; 3.3 s                                         | [Entrega](delivery.log)     |
| NoJS focalizado, tres repeticiones | 3/3; 9.5 s                                           | [NoJS](nojs.log)            |

Runtime: Bun 1.4.0 y Chrome disponible mediante el override ya soportado
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/opt/google/chrome/chrome`; no se altera
la configuración del proyecto. La suite de navegador usa `PORT=4391` y el
preview local del build actual. Se evita ejecutar dos instancias de Playwright
CLI contra el mismo directorio de resultados. El [registro de capturas](capture.log)
completa la evidencia visual.
Los logs conservan los resultados; sólo se normalizan secuencias ANSI y
espacios finales para versionarlos.

## Capturas del runtime

`viewports.json` registra 36 observaciones de HTTP y ancho del documento:
Recursos, blog, guía, un artículo, glosario, metodología, Agencias, Analytics y
AI Report, a 1440, 768, 390 y 320 px. No se observaron desbordamientos.

- Recursos: [1440](resources-1440.png), [768](resources-768.png),
  [390](resources-390.png), [320](resources-320.png) y
  [página completa](resources-full-1440.png).
- Blog: [1440](blog-1440.png), [768](blog-768.png), [390](blog-390.png),
  [320](blog-320.png).
- Guía: [1440](guide-1440.png), [768](guide-768.png), [390](guide-390.png),
  [320](guide-320.png) y [cuerpo de lectura](guide-reading-1440.png).
- Artículo: [1440](article-1440.png), [768](article-768.png),
  [390](article-390.png), [320](article-320.png) y
  [tabla a 320](article-table-320.png).
- Agencias: [1440](agencies-1440.png), [768](agencies-768.png),
  [390](agencies-390.png), [320](agencies-320.png) y
  [bloque comercial](agencies-scope-1440.png).

Las comprobaciones de axe y teclado forman parte de la verificación de este
alcance; no constituyen una certificación de conformidad WCAG.

## Límites y pendientes externos

No se acreditan indexación, citas por asistentes, posiciones, visitas ni
conversiones. Para medirlas habrá que observar Search Console y las señales
reales después de publicar. No se añade un CMS, proveedor, dependencia o
formulario; el sitio sigue siendo estático.

Los 26 informes y sus 2.959 archivos conservan bytes, enlaces y `noindex`.
No se habilita indexación de la biblioteca ni se publica información privada.
Los cambios pertenecen a landing; geo-product y su trabajo local se preservan.

Privacidad y términos se guardan en [borradores internos](../../content-drafts/legal-site.md)
porque faltan datos del responsable. Bruno eligió `contacto@kairum.com.ar`;
falta el destino privado y verificar el reenvío antes de mostrarlo como activo.
Los [tres borradores para LinkedIn](../../content-drafts/linkedin-distribution.md)
apuntan a las futuras URLs canónicas con UTM; todavía no están publicados.

Esta evidencia corresponde a una preparación para PR. Un merge posterior a
`main` se publicará por el flujo vigente de ADR-0010; esta entrega no ejecuta
un merge ni un despliegue desde la rama de trabajo.
