# Recursos y blog KAIRUM Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Entregar Recursos, blog y contenido inicial conectado con la oferta comercial existente.

**Architecture:** Contenido tipado bajo src/i18n/editorial y renderer HTML semántico compartido. Registro único de rutas para las tres lenguas y SEO. Transformaciones explícitas y reversibles sobre las superficies R05 existentes.

**Tech Stack:** Bun 1.4.0, Astro 7.3.5, TypeScript, Playwright y axe existentes.

**Spec:** docs/superpowers/specs/2026-10-16-resources-blog-design.md

## Global Constraints

- KairumAI/landing; sin cambios en geo-product, informes ni hashes R05.
- Copy en src/i18n; español, inglés y portugués de Brasil.
- Sin dependencias, proveedores, CMS, formularios ni promesas de resultados nuevos.
- AI Report visible; IDs report y Report100 conservados.
- PR contra main; no merge/publicación automática como parte de preparar el cambio.

## Review Focus

- Enlaces localizados y cambio de idioma conservan el artículo y el fragmento.
- Ningún contenido editorial ni fuente depende de JavaScript.
- Ruta desconocida devuelve 404; no inventar contenido ni estados de acceso.
- No desbordamiento o índice lateral que impida leer a 320 px.
- Las excepciones de referencia se limitan al alcance autorizado y no ocultan cambios ajenos.

### Task 1: Modelo editorial y contrato de navegación

**Files:** tests/e2e/editorial.spec.ts; src/i18n/editorial/{schema,es,en,pt-br,index}.ts; src/lib/routes.ts; src/lib/metadata.ts.
**Interfaces:** produce EditorialPageId, editorialEntries y contenido tipado por locale; pages sigue siendo el registro compartido.

- [x] Añadir tests de recorridos, metadatos, fuentes visibles y navegación de idioma; comprobar fallo por rutas ausentes.
- [x] Implementar datos editoriales en tres idiomas y registro de rutas, Article y breadcrumbs coherentes.
- [x] Verificar rutas y salida estática sin llamadas externas nuevas.

### Task 2: Composición, contenidos y conexión comercial

**Files:** src/components/kairum/editorial-html.ts; src/styles/kairum-editorial.css; src/components/MarketingPage.astro; src/lib/editorial-integration.ts; src/i18n/editorial/; scripts/verify-approved-reference.ts.
**Interfaces:** consume datos de Task 1; produce renderEditorialPage y transformaciones reversibles de integración.

- [x] Implementar Recursos, blog, guía, tres artículos, glosario y metodología; privacidad y términos quedan como borradores internos por datos pendientes confirmados por Bruno.
- [x] Integrar navegación global y Home; bloques explicativos de AI Report, Analytics y Agencias; títulos descriptivos; nombre visible AI Report.
- [x] Conservar fingerprints y verificar reversión exacta del alcance editorial sobre las 13 páginas R05.
- [x] Ejecutar tipos, formato, build y pruebas de rutas, enlaces, NoJS y referencia.

### Task 3: Evidencia y entrega

**Files:** tests/e2e/editorial.spec.ts; docs/evidence/2026-10-16-resources-blog/; docs/product/feature-register.md; docs/design/design-system.md.
**Interfaces:** consume versión renderizada; produce capturas, review independiente, checks y PR revisable.

- [x] Capturar 1440, 768, 390 y 320 px; comprobar teclado, reduced-motion, 404 y accesibilidad automatizada.
- [x] Pedir crítica independiente de sólo lectura, corregir hallazgos y registrar rondas con SHA/diff.
- [x] Ejecutar check:reference, format:check, check, build, test, test:delivery.
- [x] Actualizar evidencia y feature register, commit y PR; enlazar PR al chat.

## Ejecución

Bruno pidió ejecutar las modificaciones acordadas en este chat. Ejecución local continua en worktree de landing; revisión independiente al final exigida por AGENTS.md. No se vuelve a pedir autorización para el mismo alcance.
