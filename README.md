# KAIRUM

Landing pública de KAIRUM, implementada en Astro como sitio estático. Su diseño y comportamiento deben conservar la versión aprobada por Bruno.

## Requisitos y comandos

Bun 1.4.0 (`packageManager` en `package.json`) como gestor de paquetes y runtime. `bunfig.toml` hace que `bun run` ejecute Astro, Prettier y Playwright sobre Bun en vez de Node, así que no hace falta tener Node instalado.

```sh
bun install --frozen-lockfile
bun dev             # http://127.0.0.1:4321
bun format:check
bun check
bun run build
bun run test
```

`bun preview` sirve la compilación localmente en `127.0.0.1`; los tests compilan y abren esa vista previa en Chromium. `build` y `test` van con `bun run` porque `bun build` y `bun test` son comandos propios de Bun (bundler y test runner). `bun run test` necesita el navegador de Playwright instalado (`bunx playwright install --with-deps chromium`).

## Estructura

- `src/pages/`: rutas por idioma (`/`, `/en/`, `/pt-br/`) con su 404, más `robots.txt`, `sitemap.xml` (con `hreflang`), `llms.txt` y un `llms-full.txt` por idioma, generados con `site` de `astro.config.mjs`.
- `src/i18n/`: todo el texto visible. `es.ts` es la fuente aprobada; `en.ts` y `pt-br.ts` siguen la misma interfaz `Dictionary` (`types.ts`), así que un texto faltante no compila. `locales.ts` define idiomas, rutas, `hreflang` e imagen Open Graph de cada uno.
- `src/layouts/`: documento, metadatos SEO, `hreflang` y Open Graph.
- `src/components/Landing.astro` y `NotFound.astro`: páginas compartidas por los tres idiomas; `sections/` tiene las secciones.
- `src/components/icons.ts`: íconos Phosphor de `src/assets/icons/`, servidos como sprite SVG en línea.
- `src/scripts/`: interacciones del cliente, sin dependencias. Un solo bundle para los tres idiomas: los textos llegan en `#i18n-client` (JSON). Las animaciones usan la Web Animations API (`anim.ts`).
- `src/styles/`: estilos y tokens.
- `src/assets/`: imágenes y la fuente Inter; se publican con hash en `/_astro/`.
- `public/`: favicons, imágenes Open Graph por idioma (`og.jpg`, `og-en.jpg`, `og-pt-br.jpg`), logos de proveedores, licencias, `_headers` y `_redirects`.
- `tests/e2e/`: pruebas de navegador.

## Idiomas

Cada cambio de texto se hace en los tres diccionarios. Los textos cortos (botones, navegación, chips) no deberían superar el largo del español: el test de la landing recorre los tres idiomas en 13 anchos y falla si algo desborda. El CTA de Calendly entra en el header móvil con hasta unos 12 caracteres ("Hablemos", "Book a call", "Fale conosco").

## Contenido y licencias

Norte es una marca ficticia. Las respuestas y fuentes ilustrativas deben rotularse como **API**, nunca como ChatGPT. No se atribuyen métricas, resultados ni clientes inventados. Inter se distribuye bajo SIL OFL 1.1 y Phosphor bajo MIT; conservar los avisos y licencias de los recursos distribuidos. Los logos de terceros identifican sus productos, sin implicar asociación ni aval.

## Cabeceras

`public/_headers` define la política de seguridad (CSP sin scripts de terceros), caché inmutable para `/_astro/*` y `noindex` en `*.pages.dev`. Si se agrega un script o servicio externo (por ejemplo, analítica), hay que sumarlo a la CSP.

## Publicación

Cloudflare Pages sirve la salida estática `dist/` en el proyecto `kairum-landing` (`kairum-landing.pages.dev`). El dominio `kairum.com.ar` sigue en el proyecto `kairum`, que publica `geo-product` con los informes; moverlo es una decisión aparte.

El flujo de trabajo y las convenciones están en [CONTRIBUTING.md](CONTRIBUTING.md).

- **CI** (`.github/workflows/ci.yml`): corre en cada PR. Verifica formato, tipos y compilación, y corre los tests en el Chrome que trae el runner. Es el check `verify` que exige el ruleset de `main`.
- **Deploy** (`.github/workflows/deploy.yml`): cada merge a `main` propone publicar ese commit exacto. El environment `production` lo retiene hasta que Bruno lo aprueba en **Actions → Deploy → Review deployments**, y solo admite `main`. Un merge nuevo reemplaza al que seguía esperando. **Run workflow** vuelve a publicar el `main` actual, con la misma aprobación.

### Activación (una sola vez)

El workflow queda listo, pero falla en el paso de publicación hasta completar esto con la cuenta de Cloudflare dueña de `kairum`:

1. Crear el proyecto: `bunx wrangler@4.147.0 pages project create kairum-landing --production-branch main`.
2. Crear un API token con el permiso **Account → Cloudflare Pages → Edit**, limitado a esa cuenta.
3. Cargar los secretos en el environment, no en el repo:

   ```sh
   gh secret set CLOUDFLARE_API_TOKEN --env production --repo KairumAI/landing
   gh secret set CLOUDFLARE_ACCOUNT_ID --env production --repo KairumAI/landing
   ```

4. **Actions → Deploy → Run workflow** sobre `main` y aprobar.
