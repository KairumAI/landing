# Feature register de la landing

Este registro describe el sitio público; no acredita disponibilidad del backend
de geo-product, métricas de clientes ni resultados de posicionamiento.
Base Astro: `6489c6794bafb54f94cac6659cb0b79ea0921a26` de `KairumAI/landing`.
Diseño: R05 `477f1e2338d2` aprobado en geo-product.

| ID              | Entrega                      | Alcance y evidencia                                                                                                                                                                               | Estado                                  |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| WEB-ASTRO-01    | Diseño aprobado sobre Astro  | 13 páginas por idioma; 51 assets y 5 CSS originales; HTML español conservado salvo destino absoluto de informes. `bun run check:reference`.                                                       | Verificado local; crítico aprobado      |
| WEB-I18N-01     | ES, EN y PT-BR               | 582 claves tipadas por idioma, metadatos propios, selector hacia el mismo producto y fragmento. Pruebas de las 39 rutas y reflow en 13 anchos.                                                    | Verificado local; crítico aprobado      |
| WEB-SEO-01      | SEO por página               | Canonical, 3 hreflang recíprocos y x-default, OG/Twitter, sitemap de 36 rutas indexables; acceso y 404 noindex. Schema de organización/página/breadcrumbs y FAQ sólo donde se ven esas preguntas. | Verificado local; crítico aprobado      |
| WEB-CRAWL-01    | Robots y texto para lectores | Se conserva robots y Content-Signal; llms se genera desde las páginas actuales en los tres idiomas, sin copy de la landing anterior.                                                              | Verificado local; crítico aprobado      |
| WEB-MOTION-01   | Movimiento y navegación      | GSAP modular, escenas compartidas, movimiento ambiental tras entrada, Chart.js diferido, menú reversible con teclado, reducción de movimiento y contenido NoJS.                                   | Verificado local; crítico aprobado      |
| WEB-DELIVERY-01 | Fundación de entrega         | Bun 1.4.0, licencias, CSP propia, módulos/CSS con hash; CI original más referencia aprobada. El flujo de publicación vigente se registra en WEB-PUBLISH-02.                                       | Verificado: formato, tipos y referencia |

Los checks y la evaluación independiente de esta entrega se registran en
[evidencia de unificación](../evidence/2026-10-04-astro-unification/README.md).
Candidato `7207357b71e1`: 26/26 pruebas, tipos sin errores y crítico final
≥9 por eje, cero bloqueantes. Las pruebas visuales se refieren al diseño R05;
la entrega de producción tiene una validación separada.

## Entrega pública unificada · 2026-10-05

| ID             | Entrega              | Alcance                                                                                                                                                                   | Estado                                   |
| -------------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| WEB-PUBLISH-02 | Un único writer      | Landing publica en Pages `kairum` desde `main`. Paquete verificado antes y después de descargar el artifact; chequeo HTTP posterior. El flujo actual está en WEB-AUTO-03. | Verificado en tests y revisión           |
| WEB-REPORTS-02 | Preservar biblioteca | 26 informes, 2.959 archivos y licencias de la versión ya publicada, hashes y URLs conservados; sin propuestas ni JSON privados.                                           | Verificado: hashes, enlaces y navegación |

[ADR-0009](../decisions/0009-single-public-deploy.md),
[procedimiento](../operations/public-deployment.md) y
[evidencia de esta entrega](../evidence/2026-10-05-single-public-deploy/README.md).

## CD automático · 2026-10-05

| ID          | Entrega                     | Alcance                                                                                                                                                                                                                                 | Estado                                    |
| ----------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| WEB-AUTO-03 | Publicación tras cada merge | PR con CI → main protegido → verificación del SHA y artifact → Pages `kairum` → chequeo HTTPS. Sólo main accede a production; sin aprobación individual ni release. Guard omite ejecuciones desplazadas antes de compilar y del upload. | Implementado; activación por merge a main |

[ADR-0010](../decisions/0010-automatic-main-publication.md) y
[evidencia](../evidence/2026-10-05-automatic-main/README.md).

## Recursos, blog y desarrollo comercial · 2026-10-16

Esta extensión aplica el contenido y la navegación pedidos por Bruno sobre R05.
Las cifras de las entregas anteriores describen sus versiones históricas.

| ID                | Entrega                         | Alcance y evidencia                                                                                                                                                                                     | Estado                             |
| ----------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------- |
| WEB-CONTENT-04    | Recursos y blog                 | Hub, blog, guía, tres artículos, glosario y metodología en ES/EN/PT-BR. Autoría editorial, fecha de revisión, fuentes, ejemplos rotulados y enlaces a productos. Contenido completo sin JavaScript.     | Verificado local; crítico aprobado |
| WEB-SEO-04        | Descubrimiento editorial        | 24 rutas nuevas localizadas; sitemap de 60 rutas indexables, canonical y hreflang recíprocos, Article/BlogPosting coherentes con el texto visible. No acredita indexación ni mejora de posicionamiento. | Verificado local; crítico aprobado |
| WEB-COMMERCIAL-04 | Contexto para evaluar la oferta | AI Report, Analytics y Agencias amplían problemas, alcance, entregables y límites. Títulos descriptivos y conexión a la guía. Nombre visible AI Report con IDs y rutas anteriores conservados.          | Verificado local; crítico aprobado |
| WEB-REFERENCE-04  | Extensión acotada de R05        | Sin regenerar fingerprints: reversión exacta de los deltas editoriales declarados antes de comparar las 13 páginas originales; pruebas rechazan mutaciones ajenas. 51 assets y cinco CSS intactos.      | Verificado local; crítico aprobado |

La [evidencia de esta versión](../evidence/2026-10-16-resources-blog/README.md)
registra la composición, las capturas a 1440/768/390/320 px y los resultados.
Los 26 informes conservan sus bytes y `noindex`; no se convierten en estudios
editoriales indexables por esta entrega. Privacidad y términos quedan como
borradores internos porque faltan datos del responsable. El alias público de
contacto se configuró por separado en Cloudflare; esa operación no agrega un
servicio de envío saliente ni integra el formulario de esta landing.

## Calidad del blog e imágenes · 2026-10-16

| ID               | Entrega                          | Alcance y evidencia                                                                                                                                                                                                                                                                                                                        | Estado                             |
| ---------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| WEB-EDITORIAL-05 | Lecturas elaboradas e ilustradas | Una guía y tres artículos ampliados con casos, preguntas reutilizables, cálculos explícitos, tres aprendizajes y una figura HTML por lectura. Cuatro portadas originales, doce derivados locales y previews sociales por artículo. ES/EN/PT-BR, sin JavaScript editorial. [Evidencia](../evidence/2026-10-16-editorial-quality/README.md). | Verificado local; crítico aprobado |

La evaluación de WEB-CONTENT-04 corresponde a su versión anterior. Esta revisión
cuenta con evidencia propia y aprobación independiente sobre `ee5edb78987fc8d9`
(usabilidad 9.3, estilo 9.4, fidelidad 9.4; cero bloqueantes). No acredita indexación,
tracción o mejora de SEO/GEO/AEO; prepara contenido y descubrimiento para medirlos.

## Contacto sin reunión · 2026-10-16

| ID             | Entrega                  | Alcance y evidencia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Estado                                                             |
| -------------- | ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| WEB-CONTACT-04 | Consultas por formulario | Formulario horizontal oscuro en Home y panel claro en Contacto, ES/EN/PT-BR; título, agenda y enlace originales conservados. Envío y Turnstile en una tercera columna al costado de los campos en escritorio; móvil en una columna. Placeholders localizados en los cuatro campos; nota de procesamiento retirada por pedido del usuario. Formspark Free + Turnstile, sin SMTP; desafío cargado al acercarse al formulario. Configuración pública de build preparada; candidato sincronizado con el blog: 53/53 E2E (15 de contacto) y 44/44 de entrega; crítico 9,3/9,3/9,3, cero bloqueantes. | Verificado local; pendiente de merge, publicación y recepción real |

[ADR-0011](../decisions/0011-contact-form.md),
[runbook](../operations/contact-form.md) y
[evidencia inicial](../evidence/2026-10-16-contact-form/README.md) y
[formulario en Home: capturas, revisión y límites](../evidence/2026-10-16-home-contact-form/README.md).
El usuario confirmó la activación de Turnstile en Formspark; los mocks locales
no prueban entrega a Gmail. No se realizó envío real ni publicación.

## Revisión de interacción y cierres · 2026-10-17

| ID        | Entrega                               | Alcance y evidencia                                                                                                                                                                                                                                                                                                                                                         | Estado                                           |
| --------- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| WEB-UX-06 | Ajustes por comentarios de navegación | Continuidad del hover y entradas, máscara mínima de bordes claros, anotación decorativa retirada, formularios en los siete cierres adicionales, Turnstile horizontal y selector de idioma en el footer. 85/85 E2E, 44/44 entrega, tipos sin diagnósticos y crítico 9,3/9,2/9,3, cero bloqueantes. [Evidencia y límites](../evidence/2026-10-17-landing-feedback/README.md). | Verificado local; crítico aprobado; sin publicar |

WEB-UX-06 registra la primera ronda, antes de aprobar los rediseños.

## Analytics y páginas por audiencia · 2026-10-17

| ID        | Entrega                                  | Alcance y evidencia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Estado                                            |
| --------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| WEB-UX-07 | Analytics legible y recorridos distintos | Home compara dos lecturas; Analytics tiene tabs locales de comparación, alternativas y fuentes, sin pedestal. Marcas abre con respuesta anotada; Agencias con entregable y responsabilidades; Nosotros con propósito y método. ES/EN/PT-BR, sin datos personales del equipo por decisión del usuario. Formulario compartido en los tres cierres nuevos. Crítico independiente 9,3/9,2/9,3, cero bloqueantes. [Capturas, límites y verificación](../evidence/2026-10-17-landing-feedback/README.md). | Verificado local; crítico aprobado; listo para PR |

El hero y las pestañas de AI Report se conservan. Los ejemplos son ilustrativos
y los estados de producto siguen el catálogo. Esta entrega no acredita merge,
publicación ni recepción real en Formspark o Gmail.
