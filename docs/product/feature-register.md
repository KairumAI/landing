# Feature register de la landing

Este registro describe el sitio público; no acredita disponibilidad del backend
de geo-product, métricas de clientes ni resultados de posicionamiento.
Base Astro: `6489c6794bafb54f94cac6659cb0b79ea0921a26` de `KairumAI/landing`.
Diseño: R05 `477f1e2338d2` aprobado en geo-product.

| ID              | Entrega                      | Alcance y evidencia                                                                                                                                                                               | Estado                                     |
| --------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| WEB-ASTRO-01    | Diseño aprobado sobre Astro  | 13 páginas por idioma; 51 assets y 5 CSS originales; HTML español conservado salvo destino absoluto de informes. `bun run check:reference`.                                                       | Verificado local; crítico aprobado         |
| WEB-I18N-01     | ES, EN y PT-BR               | 582 claves tipadas por idioma, metadatos propios, selector hacia el mismo producto y fragmento. Pruebas de las 39 rutas y reflow en 13 anchos.                                                    | Verificado local; crítico aprobado         |
| WEB-SEO-01      | SEO por página               | Canonical, 3 hreflang recíprocos y x-default, OG/Twitter, sitemap de 36 rutas indexables; acceso y 404 noindex. Schema de organización/página/breadcrumbs y FAQ sólo donde se ven esas preguntas. | Verificado local; crítico aprobado         |
| WEB-CRAWL-01    | Robots y texto para lectores | Se conserva robots y Content-Signal; llms se genera desde las páginas actuales en los tres idiomas, sin copy de la landing anterior.                                                              | Verificado local; crítico aprobado         |
| WEB-MOTION-01   | Movimiento y navegación      | GSAP modular, escenas compartidas, movimiento ambiental tras entrada, Chart.js diferido, menú reversible con teclado, reducción de movimiento y contenido NoJS.                                   | Verificado local; crítico aprobado         |
| WEB-DELIVERY-01 | Fundación de entrega         | Bun 1.4.0, licencias, CSP propia, módulos/CSS con hash; CI original más referencia aprobada. Deploy por release y aprobación de Bruno sin cambios.                                                | Preparado local; sin push, merge ni deploy |

Los checks y la evaluación independiente de esta entrega se registran en
[evidencia de unificación](../evidence/2026-10-04-astro-unification/README.md).
Candidato `7207357b71e1`: 26/26 pruebas, tipos sin errores y crítico final
≥9 por eje, cero bloqueantes. Publicar el
sitio, mover `kairum.com.ar` y migrar los informes son pasos separados.
