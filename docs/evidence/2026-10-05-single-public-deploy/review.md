# Revisión independiente de la entrega pública

Fecha: 2026-10-05. Revisor: `/root/review_single_public_deploy`, sólo lectura.
No editó los checkouts, accedió a secretos, publicó ni aprobó deployments.

## Alcance

- Landing: `34864d7146b0f172d54b109c039d4c2368867a17` →
  `b08a7af6ebec83b862d7782633b23467ff0ea142`.
- Geo-product: `32093714116cfcd5cf44927dfe95e1cae289f58b` →
  `2126fbfff6dd97283723bea39275e792e30dcf67`.
- Revalidación de los cambios finales de ADR-0009, procedimiento, feature
  register y atributos que preservan bytes y espacios del snapshot histórico.

## Comprobaciones independientes

- Los 2.959 hashes del manifiesto original coinciden en los blobs commiteados,
  `public/` y `dist/`. La selección contiene únicamente informes públicos y OFL.
- Los 3.086 archivos finales suman 58.884.125 bytes; las 34.541 referencias
  internas resuelven. Los informes no dependen de scripts externos, scripts
  ejecutables inline ni handlers inline bloqueados por la CSP.
- Los 29 tests de entrega pasan. Actionlint pasa en los cuatro workflows.
- El CLI del deploy acepta una copia completa intacta del artifact y rechaza
  la alteración deliberada de `informes/megaresearch/index.html`.
- El deploy verifica el artifact descargado antes de publicar en `kairum`.
  El workflow anterior es informativo y el guard deniega la publicación.
- La recuperación del primer release permite restaurar el deployment anterior
  de Pages, sin reactivar el writer retirado, conforme al
  [procedimiento oficial](https://developers.cloudflare.com/pages/configuration/rollbacks/).

## Dictamen y resolución

**Listo para PR. Cero hallazgos críticos, importantes o menores pendientes.**

Durante la revisión se aclaró la recuperación inicial: reintentar el mismo tag
resuelve un fallo transitorio del upload, pero no revierte un paquete defectuoso.
El procedimiento y ADR-0009 incorporan el rollback desde Pages; el revisor
comprobó esa corrección antes de emitir su dictamen final.

## Límites

La UI no cambia en este rango. La evaluación visual de Astro frente a R05 está
registrada en la [unificación](../2026-10-04-astro-unification/review.md).
Esta revisión no valida el valor de los secretos ni un deployment nuevo.
El estado remoto de GitHub corresponde a la comprobación separada del ejecutor.
La preservación de informes no evalúa sus afirmaciones médicas o comerciales
ni acredita resultados de producto. No se auditó la elusión por administradores.
