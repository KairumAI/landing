# Publicación automática de main · 2026-10-05

Base del cambio de CD: `9ecf8d0b3a9af3a1ad344da1b2e0ba18bc5dab8f`.
Autorización: Bruno pidió integrar y publicar la landing automáticamente a medida
que se incorporan cambios. [ADR-0010](../../decisions/0010-automatic-main-publication.md)
sustituye el release y aprobación por deployment de ADR-0009.

## Circuito

PR con `verify` aprobado → squash merge a `main` → **Deploy / verify** sobre el
SHA integrado → artifact con digest → **Deploy / deploy** → comprobación HTTPS.
Sólo `main` accede a los secretos de `production`; se retira el reviewer de
deployment. No se habilita push directo ni bypass del ruleset de PR/CI.

El guard confirma repo, evento, ref, checkout y SHA remoto antes de compilar y
antes del upload. Una ejecución desplazada o reintento histórico se omite.
Las publicaciones se serializan sin cancelar un upload; un nuevo merge ocurrido
durante el upload se publica con la siguiente ejecución.

## Validación local

- 40/40 tests de integridad, rutas, HTTP y contexto de publicación. Incluyen el
  CLI real con un remoto Git temporal: publica el SHA actual, omite uno desplazado
  y deniega ref, checkout o remoto incorrectos.
- Tipos: 89 archivos, cero errores, warnings o hints.
- Actionlint 1.7.12: CI y Deploy correctos.
- Referencia R05: 51 assets, 5 CSS y 13 páginas ES idénticos.
- 28/28 tests de navegador aprobados; build completo verificado, sin cambios en
  los archivos públicos respecto a la entrega anterior. Ver `e2e.log`,
  `delivery.log` y `types.log`.
- [Revisión independiente](review.md) aprobada, sin pendientes. Un P3 sobre el
  orden de activación fue corregido y revalidado antes del cierre.

El código no modifica componentes, estilos, copy ni assets. Se conserva la
[revisión visual de Astro](../2026-10-04-astro-unification/review.md) y la
[integridad del snapshot](../2026-10-05-single-public-deploy/review.md).

## Activación

Mantener CD de geo-product deshabilitado y su environment bloqueado a la rama
reservada inexistente. Integrar su retiro versionado y el PR de landing después
de CI y revisión. Antes del merge de landing, sustituir en `production` la política
de tags por una única política de rama `main` y retirar el reviewer obligatorio,
conservando los dos secretos. No hay deployments de landing pendientes al iniciar.

Esta evidencia registra la preparación; aún no acredita un deployment nuevo.
El resultado de integración/publicación se registra en los PRs y
[Actions → Deploy](https://github.com/KairumAI/landing/actions/workflows/deploy.yml).
Dar por publicada la versión sólo después de upload y comprobación HTTPS exitosos.
