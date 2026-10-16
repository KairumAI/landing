# Recursos, blog y claridad comercial de KAIRUM

Fecha: 2026-10-16. Base: landing main f8d3b9d. Alcance autorizado por Bruno en el chat: implementar la propuesta editorial y las modificaciones de landing acordadas.

## Objetivo

Crear un recorrido editorial indexable en el dominio existente y conectar investigación, aprendizaje y consultas comerciales. La implementación ocurre en KairumAI/landing; geo-product y los informes heredados no cambian. La propuesta y el orden de entrega fueron revisados en el chat y Bruno pidió ejecutarlos.

## Composición visual

Recursos: apertura tipográfica clara sobre fondo cálido; guía destacada en composición de dos columnas, con un diagrama editorial de pregunta, respuesta y fuente; accesos al blog, glosario, metodología e informes exploratorios. Blog: portada sobria y tres tarjetas de artículos con categoría, resumen y tiempo estimado de lectura. Artículo: título, resumen directo, autor corporativo KAIRUM, fecha de revisión, índice lateral en escritorio y apilado en móvil, contenido legible y fuentes al final. Cierre con lectura relacionada y CTA al producto pertinente. Privacidad y términos reutilizan la plantilla de lectura. Se preservan Inter, negro, blanco, amarillo, foco, navegación y escenas R05.

## Contenido y navegación

- /recursos/ y /blog/.
- /recursos/como-medir-visibilidad-ia/: guía de medición desde las preguntas hasta la interpretación.
- /blog/menciones-citas-visitas/, /blog/como-elegir-preguntas/, /blog/como-interpretar-resultados/.
- /glosario/ y /metodologia/.
- Privacidad y términos: borradores internos bajo docs/content-drafts/, sin rutas públicas ni enlaces de footer. Bruno confirmó que el responsable y el correo aún no están definidos. No publicar una identidad ficticia ni textos legales incompletos.
- Cada página nueva tiene versiones es/en/pt-br y selector equivalente. Los slugs técnicos permanecen estables.
- Mejoras descriptivas de metadatos y secciones explicativas en Analytics, AI Report y Agencias. Usar AI Report como nombre visible; conservar report y Report100 como IDs técnicos.
- Fuentes primarias enlazadas, ejemplos sintéticos rotulados; ninguna métrica comercial o cliente inventado. Los artículos son editoriales, no nuevos estudios de mercado medidos.

## Arquitectura y alcance

Astro 7.3.5, Bun 1.4.0, TypeScript y renderizado estático. Datos tipados de contenido y copy bajo src/i18n/. Renderer editorial compartido en components/kairum. Extender registro de rutas, metadatos, canonical/hreflang, sitemap y lectores de texto; BlogPosting únicamente para artículos visibles. Sin JS nuevo para el contenido ni búsqueda remota, sin formularios ficticios, newsletter, proveedores o dependencias nuevos. Páginas estáticas sin estados de carga ni permisos; 404 localizada para rutas inexistentes.

## Preservación de referencia

No regenerar fingerprints de R05 ni modificar sus cinco CSS, assets o informes. Registrar como extensión autorizada las modificaciones de navegación, nombre AI Report, sección de Recursos y bloques comerciales. La verificación debe demostrar que al revertir únicamente esas transformaciones explícitas, las trece páginas originales siguen coincidiendo con sus fingerprints; los nuevos contenidos tienen tests de runtime y revisión independiente propios.

## Aceptación

Navegación real desde Home; artículos completos y utilizables sin JS; fuentes, autoría y enlaces relacionados visibles; ES/EN/PT-BR sin fallback; reflow en 1440, 768, 390 y 320 px; teclado, reduced-motion y contraste; sitemap y datos estructurados coherentes con el contenido. Formato, tipos, referencia, build, suite de navegador e integridad de entrega aprobados. Agente crítico independiente en sólo lectura: al menos 9/10 en usabilidad, estilo y fidelidad, cero bloqueantes. Preparar PR revisable sin integrar automáticamente.
