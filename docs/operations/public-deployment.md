# Publicar landing e informes juntos

Destino único: Cloudflare Pages `kairum`, rama de producción `main`, dominio
[kairum.com.ar](https://kairum.com.ar). No crear `kairum-landing`, cambiar DNS ni
cambiar el plan. Se conserva Direct Upload con Wrangler 4.147.0.
Decisión: [ADR-0009](../decisions/0009-single-public-deploy.md).

## Antes del primer release

1. Integrar mediante PR la migración Astro y el paquete público completo.
2. Comprobar que CD de geo-product está deshabilitado y `kairum-production`
   admite sólo la rama inexistente reservada `kairum-publication-paused`.
   No debe haber ejecuciones viejas de publicación en curso.
3. Mantener los dos secretos exclusivamente en el environment `production`
   de `KairumAI/landing`: `CLOUDFLARE_API_TOKEN` y `CLOUDFLARE_ACCOUNT_ID`.
   No poner valores en código, documentos, logs ni secretos de repo generales.
4. No modificar el reviewer Bruno ni la restricción de tags `v*` de `production`.

## Publicar una versión

Crear un release con tag `vMAJOR.MINOR.PATCH` de un commit integrado en `main`.
El tag es inmutable. Para esta migración de estructura corresponde una versión
mayor; revisar los releases existentes para elegir el número disponible.

`Deploy / verify` admite sólo un tag de este repo que pertenezca a `main`.
Ejecuta formato, referencia R05, tipos, tests de entrega y navegador. Build
verifica el snapshot fuente, compila Astro y comprueba los archivos, recursos,
hashes y límites del paquete final. Guarda `dist/` y el manifiesto de sus hashes
como artifact de la misma ejecución.

Bruno aprueba `production` en **Actions → Deploy → Review deployments**.
`Deploy / deploy` descarga y comprueba ese paquete exacto, lo publica en Pages
`kairum` y verifica por HTTPS Home, Analytics, robots, sitemap, biblioteca,
los informes, PDF, lectores representativos y rutas privadas excluidas.
Un merge, un push a una rama o un tag sin pertenecer a `main` no publican el sitio.
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

En **Actions → Deploy → Run workflow**, elegir un tag de una versión completa
de esta migración o posterior y aprobarlo en `production`. La compilación falla
si faltan los informes. Los tags anteriores a la migración no son destinos válidos
para `kairum`; conservar una versión completa conocida para la recuperación.
Después revertir el PR responsable y publicar un nuevo release completo.

## Retiro del circuito anterior

Geo-product conserva CI y la generación de informes, con un PR que elimina
la publicación antigua. El workflow CD permanece deshabilitado y su environment
queda restringido. No borrar secretos ni revocar tokens como parte de este
retiro. Reactivar el circuito anterior requiere otra decisión explícita y
comprobar que ningún otro writer esté publicando en `kairum`.
