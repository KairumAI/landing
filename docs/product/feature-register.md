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
