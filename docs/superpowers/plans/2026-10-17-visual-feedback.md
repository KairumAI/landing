# Revisión visual de la landing

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Resolver los comentarios visuales y aplicar la propuesta de Analytics y páginas por audiencia autorizada por el usuario; entregar una PR contra main.

**Architecture:** Astro conserva el renderer R05 como referencia inmutable. Los reemplazos aprobados se declaran y revierten exactamente en editorial-integration, con componentes y estilos aditivos para las superficies nuevas. Se reutilizan tabs accesibles y formulario existentes.

**Tech Stack:** Astro, TypeScript estricto, Bun 1.4, GSAP existente y Playwright.

**Spec:** Propuesta aprobada en la conversación y conceptos en docs/evidence/2026-10-17-landing-feedback/concepts/. La imagen es referencia de composición; prevalecen copy verificado, navegación, tokens y formularios del sitio.

## Global Constraints

- ES/EN/PT-BR; copy únicamente en src/i18n.
- Sin métricas, clientes, nombres, biografías ni disponibilidad inventados.
- Sin dependencias nuevas ni cambios en los cinco CSS, assets y fingerprints originales de R05.
- Preservar AI Report y todas las correcciones previas de formulario, movimiento, idiomas y bordes.
- PR autorizada; merge y despliegue quedan fuera de esta entrega.

## Review Focus

- Los tabs cambian contenido local sin navegar; teclado, foco y aria-selected coherentes.
- Sin JS se leen las tres vistas y los enlaces siguen siendo útiles.
- A 320 px no hay overflow ni texto/controles recortados, en los tres idiomas.
- Un único formulario en cada cierre; conserva tema y tamaño oficial de Turnstile.
- R05 sigue detectando cambios fuera de los reemplazos explícitos.

## Tareas

- [x] Analytics: renderAnalyticsPreview(locale, mode), copia tipada, CSS acotado, comparación Home y tres tabs de producto; probar interacción, fallback e idiomas.
- [x] Audiencias: renderAudienceBody(id, locale, closingHtml), composición propia para Marcas, Agencias y Nosotros; probar identidad, enlaces, accesibilidad y reflow.
- [x] Integración: reemplazos exactos, export de closing compartido, imports y gate reversible. Actualizar pruebas históricas de gráficas al comportamiento aprobado.
- [x] Evidencia: capturas actuales escritorio/móvil, comparación con conceptos y original, crítico independiente >=9 en usabilidad/estilo/fidelidad y cero bloqueantes.
- [x] Cierre local: referencia, formato, tipos, build, E2E y delivery; manifest y feature register; preparar commit, push y PR. El resultado de la publicación y CI se consulta en la PR.

## Desviaciones intencionales de las imágenes

Los conceptos no sustituyen el header/footer real ni el copy comercial aprobado. Se descartan la cita de Kantar y promesas de resultado introducidas por el generador. El formulario compartido amplía los cierres para cumplir la revisión. Nosotros publica propósito y método; nombres/roles requieren datos del usuario.
