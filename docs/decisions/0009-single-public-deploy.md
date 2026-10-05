# 0009 · Una sola publicación para landing e informes

Fecha: 2026-10-05. Estado: autorizada por Bruno para implementación y validación.
Amplía ADR-0008 en el alcance de la entrega pública y sustituye la propuesta
de crear `kairum-landing`.

## Contexto

Bruno pidió dejar desarrollado el circuito de publicación del sitio Astro,
conservar `/informes/` y evitar que geo-product sobrescriba la nueva landing.
El proyecto Pages existente `kairum` ya sirve `kairum.com.ar`. No hace falta
mover DNS, crear otro proyecto, cambiar de plan ni incorporar Functions.

## Decisión

- `KairumAI/landing` publica su `dist/` en Pages `kairum`, rama de producción
  `main`. El release `v*` y la aprobación de Bruno en `production` se conservan.
  Preparar un PR no publica un release ni aprueba un deployment.
- Los 26 informes se conservan como una copia de los archivos públicos del
  último paquete publicado: geo-product `32093714116cfcd5cf44927dfe95e1cae289f58b`,
  ejecución `37248157603`, artifact `11319144792`. Se admiten únicamente
  `informes/` y sus licencias; no se importa el repositorio privado ni su
  manifiesto de fuentes. No se copian JSON de respuestas, propuestas, contactos,
  notas, archivos de entorno ni otros archivos privados.
- `publishing/reports-manifest.json` fija los hashes y procedencia de los
  archivos públicos. La compilación verifica tanto su copia fuente como `dist/`;
  rechaza archivos extra, faltantes, modificados, symlinks, rutas privadas,
  Functions y archivos que superen los límites actuales del plan gratuito.
  El manifiesto se mantiene fuera del directorio publicado.
- Los informes conservan sus bytes, navegación y URLs. Se preservan sus
  licencias y `X-Robots-Tag: noindex, nofollow`. La CSP de la landing admite sus
  scripts propios; el paquete heredado no usa scripts ejecutables inline ni
  código o fuentes externos. `noindex` no restringe el acceso a un informe.
- El deploy genera un manifiesto de la salida comprobada y hace un chequeo HTTP
  posterior de las páginas de marketing, biblioteca, informes, PDF y lectores
  representativos. Un fallo posterior no efectúa rollback automático.
- El writer anterior se retira: CD de geo-product se deshabilita en GitHub y
  su environment se restringe a la rama reservada inexistente
  `kairum-publication-paused`. Un PR elimina sus llamadas a Pages y conserva CI
  en los pushes a `main`. No se borran secretos, tokens ni deployments viejos.

## Actualizaciones y recuperación

Un informe nuevo o cambiado requiere un paquete público validado de geo-product,
revisión de su alcance público y actualización explícita del snapshot y sus
hashes en un PR de landing. No se descargan informes desde una fuente mutable
durante el deploy y no hacen falta credenciales GitHub adicionales entre repos.

Para volver atrás, publicar desde Actions un tag anterior que incluya el paquete
completo y aprobarlo en `production`. Los tags previos a esta migración no
incluyen informes y no deben publicarse sobre `kairum`. Mantener el writer anterior
retirado incluso durante un rollback. No reactivar el viejo CD como recuperación.

## Validación y límites

Se comprobarán hashes de los 2.959 archivos conservados, enlaces y recursos,
rechazo de archivos privados y errores de empaquetado, admisión de tags,
chequeo HTTP, formato, tipos, build, navegador y referencia R05. La migración
de entrega no modifica la UI; la evaluación visual independiente R05 sigue
documentada en la unificación. La revisión de código de esta entrega es separada.

La restricción de environment y el estado disabled detienen los workflows
anteriores normales y sus reintentos; no revocan acceso de administradores ni
la capacidad de publicar directamente desde Cloudflare. Comprobar y cancelar
jobs anteriores que ya estén en curso antes de activar el nuevo writer.

Fuentes: [Direct Upload en CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/),
[límites de Pages](https://developers.cloudflare.com/pages/platform/limits/),
[cabeceras](https://developers.cloudflare.com/pages/configuration/headers/).
