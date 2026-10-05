# KAIRUM

Sitio público de KAIRUM sobre Astro estático. Integra la landing cinematográfica
R05 aprobada por Bruno con la base multilingüe y de SEO de Joaquín. La decisión
y el alcance están en [ADR-0008](docs/decisions/0008-approved-cinematic-home.md).

## Requisitos y comandos

Bun 1.4.0 (`packageManager` en `package.json`) como gestor de paquetes y runtime. `bunfig.toml` hace que `bun run` ejecute Astro, Prettier y Playwright sobre Bun en vez de Node, así que no hace falta tener Node instalado.

```sh
bun install --frozen-lockfile
bun dev             # http://127.0.0.1:4321
bun format:check
bun run check:reference
bun check
bun run build
bun run test
```

`bun preview` sirve la compilación localmente en `127.0.0.1`; los tests compilan y abren esa vista previa en Chromium. `build` y `test` van con `bun run` porque `bun build` y `bun test` son comandos propios de Bun (bundler y test runner). `bun run test` necesita el navegador de Playwright instalado (`bunx playwright install --with-deps chromium`).

## Estructura

- `src/pages/`: Home, catálogo, seis productos, marcas, agencias, nosotros, contacto y acceso en `/`, `/en/` y `/pt-br/`; tres 404, robots, sitemap y textos llms.
- `src/lib/routes.ts`: inventario de 13 páginas por idioma y enlaces equivalentes. `metadata.ts` genera SEO y schema a partir de su contenido real.
- `src/i18n/marketing/`: las 582 claves del diseño aprobado, tipadas y completas en ES/EN/PT-BR, más copy SEO. `locales.ts` conserva idiomas, `hreflang` y las imágenes Open Graph de Joaquín. Los diccionarios anteriores siguen sirviendo el contenido de las 404.
- `src/components/MarketingPage.astro`: composición Astro, datos SEO y selector de idioma. `src/components/kairum/` contiene el renderer, catálogo y escenas compartidas por Home y productos. `NotFound.astro` conserva las páginas de error localizadas.
- `src/scripts/cinematic/`: bundle cliente activo, menús con teclado, GSAP, gráficos Chart.js diferidos y escenas de contexto Three diferidas. Los textos dinámicos llegan en `#i18n-client`. Home y las cuatro aperturas de producto no instancian Three. Los componentes, scripts y CSS de la landing previa siguen en el historial de transición, pero no se importan en las páginas nuevas.
- `src/styles/kairum-*.css`: las cinco hojas canónicas aprobadas; no se mezclan con estilos de la landing previa.
- `public/kairum/`: assets nativos R05, Inter, logos y licencias. `public/` conserva favicons, Open Graph por idioma, `_headers` y `_redirects`.
- `scripts/verify-approved-reference.ts`: contrasta assets, CSS y HTML español con los fingerprints obtenidos de R05.
- `tests/e2e/`: pruebas de navegador.
- `docs/`: sistema de diseño, decisiones, feature register y evidencia de revisión.

## Idiomas

Cada cambio de texto se hace en los tres diccionarios de marketing. Los tests
recorren los tres idiomas en 13 anchos y verifican las 39 rutas. El selector
mantiene el producto y su fragmento; no envía siempre a Home. Las rutas de
producto conservan los mismos slugs bajo cada prefijo de idioma.

## SEO

Hay metadatos propios, canonical, tres `hreflang` recíprocos y `x-default` para
cada página indexable, Open Graph/Twitter y schema de organización, sitio,
página y breadcrumbs. FAQ schema sólo se genera en las páginas de producto que
realmente muestran esas preguntas. El sitemap incluye 36 páginas; acceso y
404 llevan `noindex`. Robots y Content-Signal se conservan, y los textos llms
se generan desde el contenido actual. Estas medidas no garantizan posiciones
en buscadores ni resultados comerciales.

## Contenido y licencias

Los ejemplos actuales usan «Tu marca» y competidores genéricos. Los gráficos
son esquemas sin métricas medidas; no prueban resultados de clientes. Una
superficie OpenRouter/OpenAI API no es ChatGPT UI. Inter se distribuye bajo
SIL OFL 1.1 y Phosphor, Chart.js y Three bajo sus licencias MIT; GSAP conserva
su aviso y enlace a la licencia estándar. Los logos de terceros identifican
productos y no implican integración, asociación ni aval. No se copian informes,
respuestas privadas ni secretos de geo-product a este repositorio público.
ADR-0009 incorpora únicamente los archivos de los 26 informes ya públicos,
con sus hashes y licencias. No se importan los documentos de trabajo.

## Cabeceras

`public/_headers` conserva la CSP propia (`script-src 'self'`), caché inmutable
para módulos/CSS con hash en `/_astro/*` y `noindex` en `*.pages.dev`. Los assets
nativos `/kairum/*` revalidan para no servir imágenes antiguas con los mismos
nombres. Cualquier dependencia o proveedor nuevo requiere ADR y revisión de
la CSP. La prueba local de CSP no acredita cabeceras de producción.

## Revisión del diseño

Usar [el sistema KAIRUM](docs/design/design-system.md). Toda modificación visual
requiere crítico independiente en sólo lectura, ≥9/10 en usabilidad, estilo y
fidelidad, y cero bloqueantes. Registrar capturas del runtime actual, ronda y
feature en [la evidencia](docs/evidence/2026-10-04-astro-unification/README.md)
y [el feature register](docs/product/feature-register.md). El check de referencia
verifica el diseño aprobado; una aprobación anterior no acredita un runtime
nuevo por sí sola.

## Publicación

Cloudflare Pages sirve el paquete completo `dist/` en el proyecto existente
`kairum` y el dominio `kairum.com.ar`. Landing es el único writer; geo-product
conserva la generación y validación de informes, con su CD público retirado.
La decisión y los pasos de publicación y rollback están en
[ADR-0009](docs/decisions/0009-single-public-deploy.md) y
[el procedimiento](docs/operations/public-deployment.md).

El flujo de trabajo y las convenciones están en [CONTRIBUTING.md](CONTRIBUTING.md).

- **CI** (`.github/workflows/ci.yml`): corre en cada PR. Verifica formato, tipos y compilación, y corre los tests en el Chrome que trae el runner. Es el check `verify` que exige el ruleset de `main`.
- **Deploy** (`.github/workflows/deploy.yml`): corre solo al publicar un release con tag `v*` sobre `main`; un merge no publica nada. El environment `production` solo admite tags `v*` y retiene el deploy hasta que Bruno lo aprueba en **Actions → Deploy → Review deployments**. **Run workflow** sobre un tag existente lo vuelve a publicar, por ejemplo para volver atrás. Los tags `v*` no se pueden mover ni borrar.

### Activación y biblioteca

Los secretos se configuran en `KairumAI/landing → production`. El reviewer Bruno
y la restricción de tags `v*` se conservan. No crear otro proyecto ni mover el
dominio. Un release inicia validación; la publicación exige aprobación de Bruno.

```sh
gh secret set CLOUDFLARE_API_TOKEN --env production --repo KairumAI/landing
gh secret set CLOUDFLARE_ACCOUNT_ID --env production --repo KairumAI/landing
```

`public/informes/` conserva la biblioteca publicada y sus licencias. Build
comprueba cada archivo contra `publishing/reports-manifest.json`, rechaza extras,
valida sus enlaces y crea `build/public-delivery-manifest.json` fuera de `dist/`.
`bun run test:delivery` ejercita errores de empaquetado, tags y entrega HTTP.
El deploy publica el artifact comprobado; no recompila después de la aprobación.

Antes de activar este writer, mantener CD de geo-product deshabilitado y su
environment `kairum-production` restringido a la rama reservada inexistente.
Los tags previos a esta migración no sirven para volver atrás porque no contienen
el paquete completo de informes. Para nuevos informes, revisar e incorporar
otro snapshot público mediante PR, sin copiar carpetas del repo privado.
