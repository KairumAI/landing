# 0010 · Publicar automáticamente los cambios integrados en main

Fecha: 2026-10-05. Estado: autorizada por Bruno para implementación y activación.
Sustituye el release y la aprobación por deployment de ADR-0009; conserva su
snapshot público, verificación de integridad, proyecto y retiro del writer viejo.

## Contexto

Bruno pidió integrar la landing y publicar automáticamente a medida que se
incorporan cambios. La autorización de esta entrega incluye integrar los PRs
revisados y reemplazar el gate manual de `production` por publicación desde
`main`, después de CI y la verificación completa del paquete.

## Decisión

- Cada cambio entra por PR. El ruleset de `main` sigue exigiendo `verify`, PR,
  historial lineal y ausencia de force-push. No se habilita push directo.
- `Deploy` se ejecuta por push a `main` o solicitud manual sobre `main`.
  Crear un release queda como registro opcional y no dispara otra publicación.
- `production` conserva sus secretos y admite exclusivamente la rama `main`.
  Se retira el reviewer obligatorio de deploy, según esta autorización. No se
  cambia el dominio, el plan ni WAF/Access; no se copian secretos al repo.
- Antes de compilar, el guard exige el repo correcto, evento permitido, ref
  `refs/heads/main` y checkout igual a `GITHUB_SHA`. Consulta el SHA actual de
  `main` en el remoto. Una ejecución desplazada por otro merge se omite.
- Se verifica el SHA integrado con formato, referencia R05, tipos, pruebas,
  hashes, rutas y límites. El artifact queda vinculado al SHA y a su digest.
- El paso de deploy verifica el artifact descargado y vuelve a consultar `main`
  antes del upload. Una ejecución antigua o un reintento desplazado no publica.
  Las publicaciones se serializan sin interrumpir un upload en curso; el siguiente
  merge puede ocurrir durante ese upload y quedará publicado por el próximo job.
- Se comprueba el sitio por HTTPS después del upload. Un fallo se registra en
  Actions y requiere una corrección; no se afirma éxito ni se hace rollback ciego.
- Para recuperar una versión: revertir por PR y publicar el nuevo `main`, o Bruno
  puede restaurar un deployment de producción anterior desde Pages ante una
  incidencia. Una nueva ejecución sobre `main` reintenta únicamente su SHA actual.
  Geo-product continúa retirado; no se usa como writer de recuperación.

## Validación

Tests de contexto, checkout, SHA remoto, ejecuciones desplazadas y CLI real contra
un remoto Git temporal. Conservar las pruebas de integridad y navegador de
ADR-0009. Revisión independiente antes de integrar. Verificar en GitHub las
políticas, la ausencia de otros writers y el resultado del primer deploy; comprobar
por HTTPS la landing, biblioteca, PDFs y lectores antes de darlo por publicado.

Fuentes: [Direct Upload en CI](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/),
[environment de GitHub](https://docs.github.com/en/rest/deployments/environments),
[políticas de publicación](https://docs.github.com/en/rest/deployments/branch-policies).
