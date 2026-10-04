# KAIRUM

Landing pública de KAIRUM, implementada en Astro como sitio estático. Su diseño y comportamiento deben conservar la versión aprobada por Bruno.

## Requisitos y comandos

Node 26.10.0 (`.nvmrc`) y pnpm 12.9.1 (`packageManager` en `package.json`). Desde la raíz del proyecto:

```sh
fnm exec --using 26.10.0 -- pnpm install --frozen-lockfile
fnm exec --using 26.10.0 -- pnpm dev
fnm exec --using 26.10.0 -- pnpm format:check
fnm exec --using 26.10.0 -- pnpm check
fnm exec --using 26.10.0 -- pnpm build
fnm exec --using 26.10.0 -- pnpm test
```

`pnpm preview` sirve la compilación localmente en `127.0.0.1`; los tests compilan y abren esa vista previa en Chromium. `pnpm test` necesita el navegador de Playwright instalado (`pnpm exec playwright install --with-deps chromium`).

## Estructura

- `src/pages/`: rutas `/` y error 404.
- `src/layouts/`: documento y estructura compartida.
- `src/components/sections/`: secciones de la landing.
- `src/data/`: contenido estructurado.
- `src/scripts/`: interacciones del cliente.
- `src/styles/`: estilos y tokens.
- `public/`: imágenes, fuentes y otros archivos estáticos.
- `tests/e2e/`: pruebas de navegador.

## Contenido y licencias

Norte es una marca ficticia. Las respuestas y fuentes ilustrativas deben rotularse como **API**, nunca como ChatGPT. No se atribuyen métricas, resultados ni clientes inventados. Inter se distribuye bajo SIL OFL 1.1, Phosphor bajo MIT y GSAP bajo su [licencia estándar](https://gsap.com/standard-license); conservar los avisos y licencias de los recursos distribuidos. Los logos de terceros identifican sus productos, sin implicar asociación ni aval.

## Publicación

Cloudflare Pages sirve la salida estática `dist/`. La publicación es manual, por commit y únicamente después de la aprobación de Bruno. CI verifica formato, tipos, compilación y pruebas; no publica automáticamente.
