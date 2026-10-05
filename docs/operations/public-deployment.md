# Publicar landing e informes juntos

Destino único: Cloudflare Pages `kairum`, rama de producción `main`, dominio
[kairum.com.ar](https://kairum.com.ar). No crear `kairum-landing`, cambiar DNS ni
cambiar el plan. Se conserva Direct Upload con Wrangler 4.147.0.
Decisiones: [ADR-0009](../decisions/0009-single-public-deploy.md) para el paquete
y [ADR-0010](../decisions/0010-automatic-main-publication.md) para el CD automático.

## Antes de activar la publicación automática

1. Preparar y revisar el PR de migración Astro y el paquete público completo.
   Esperar a configurar `production` antes de integrarlo: el merge dispara CD.
2. Comprobar que CD de geo-product está deshabilitado y `kairum-production`
   admite sólo la rama inexistente reservada `kairum-publication-paused`.
   No debe haber ejecuciones viejas de publicación en curso.
3. Mantener los dos secretos exclusivamente en el environment `production`
   de `KairumAI/landing`: `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`.
   No poner valores en código, documentos, logs ni secretos de repo generales.
4. Configurar `production` con una única política de rama `main`, sin reviewer
   obligatorio ni espera. Bruno autorizó reemplazar la política anterior de tags
   y aprobación por deployment. Conservar el ruleset de PR y CI en `main`.
5. En Pages `kairum` → **Deployments**, identificar y registrar el deployment de
   producción exitoso que sirve la versión anterior con los 26 informes. Su
   commit de origen es `32093714116cfcd5cf44927dfe95e1cae289f58b`. Conservarlo
   como destino de recuperación inicial; no borrar ese deployment.
6. Con CI en verde y la política de rama `main` comprobada, integrar mediante
   squash merge. Si el primer push había quedado rechazado por la política vieja,
   completar la configuración y ejecutar **Deploy → Run workflow → main**.

La consulta de sólo lectura del 2026-10-05 identificó el deployment de producción
`783b90f8-e7b1-44e4-81a9-984c4fe708c5`, origen `3209371`, en el proyecto existente.
Antes de publicar, confirmar que ese destino sigue disponible y conserva los
informes; esta preparación no ejecuta un rollback.

## Publicar cambios

Abrir un PR, aprobar la revisión y comprobar el check `verify` en verde.
Integrar con squash merge. El push resultante a `main` inicia **Deploy** y publica
automáticamente; no hace falta un release ni una aprobación de deployment.

`Deploy / verify` admite sólo push o solicitud manual sobre `main` de este repo.
Exige checkout igual al SHA de la ejecución y consulta el SHA remoto de `main`.
Si otra versión lo desplazó, omite la publicación.
Ejecuta formato, referencia R05, tipos, tests de entrega y navegador. Build
verifica el snapshot fuente, compila Astro y comprueba los archivos, recursos,
hashes y límites del paquete final. Guarda `dist/` y el manifiesto de sus hashes
como artifact de la misma ejecución.

`Deploy / deploy` descarga y comprueba ese paquete exacto, lo publica en Pages
`kairum` y verifica por HTTPS Home, Analytics, robots, sitemap, biblioteca,
los informes, PDF, lectores representativos y rutas privadas excluidas.
Antes del upload vuelve a consultar `main`: un reintento antiguo no sobrescribe
una versión nueva. Un push a una rama de trabajo, un tag o un release no publican.
Las publicaciones se serializan sin cancelar uploads en curso. Un merge ocurrido
durante un upload se publica mediante la siguiente ejecución.
La verificación HTTP reintenta seis veces con diez segundos entre intentos.

Un fallo después de subir no deshace la publicación. Revisar el historial Pages
y recuperar una versión completa, sin reactivar el writer de geo-product.

## Comprobar localmente

```sh
bun format:check
bun run check:reference
bun check
bun run test:delivery
bun run test
```

`bun run build` genera el paquete en `dist/` y su manifiesto fuera del contenido
público, en `build/public-delivery-manifest.json`. Los tests de navegador compilan
ese mismo paquete. Los checks locales no prueban las cabeceras ni los secretos
de producción. `bun run check:delivery:live` se usa sólo después de publicar la
versión que corresponde a ese manifiesto.

## Biblioteca preservada

Se conservan los 26 informes y sus 2.959 archivos y licencias tal como fueron
publicados por la ejecución
[37248157603](https://github.com/KairumAI/geo-product/actions/runs/37248157603).
`publishing/reports-manifest.json` contiene hashes de archivos públicos y
procedencia; no copia el manifiesto privado de fuentes ni los JSON de trabajo.
Los archivos están en `public/informes/` y sus licencias en `public/licenses/`.
Prettier los excluye para mantener sus bytes.

Las cabeceras `noindex, nofollow` se conservan; no son un control de acceso.
Las propuestas permanecen fuera del paquete. Las reglas WAF y Access existentes
en Cloudflare no se modifican como parte de esta migración.

Para actualizar informes: generar un paquete público aprobado en geo-product,
comprobar el artifact y su manifiesto, copiar únicamente sus archivos públicos
y licencias, actualizar los hashes y procedencia, y abrir un PR en landing.
Nunca copiar directamente carpetas de investigación ni bajar una fuente mutable
en el paso de despliegue. Cada actualización requiere revisión del alcance público.

## Volver atrás

Si la primera publicación introduce un problema, Bruno puede restaurar el deployment de producción exitoso
registrado antes de publicar: **Pages `kairum` → Deployments → All deployments →
menú del deployment anterior → Rollback to this deployment**, y confirmar la
restauración. Esto recupera la landing anterior y sus informes en el mismo
proyecto, sin ejecutar el workflow retirado. Las previews no son destinos válidos.
Comprobar después la Home, `/informes/`, un PDF y un lector, y conservar el CD
de geo-product deshabilitado. Ver el
[procedimiento oficial de Cloudflare](https://developers.cloudflare.com/pages/configuration/rollbacks/).

Un fallo transitorio del upload puede resolverse en **Actions → Deploy → Run
workflow → main**. Reintenta únicamente el SHA actual; una ejecución histórica
desplazada se omite. Ese reintento no revierte un defecto del paquete: para un
defecto, restaurar un deployment completo y revertir el cambio responsable por PR.
El nuevo `main` publica la corrección automáticamente. No publicar tags antiguos
ni reactivar el writer anterior para recuperar la landing.

## Retiro del circuito anterior

Geo-product conserva CI y la generación de informes, con un PR que elimina
la publicación antigua. El workflow CD permanece deshabilitado y su environment
queda restringido. No borrar secretos ni revocar tokens como parte de este
retiro. Reactivar el circuito anterior requiere otra decisión explícita y
comprobar que ningún otro writer esté publicando en `kairum`.
