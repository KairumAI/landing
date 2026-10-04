# Reglas para agentes

- Usar Bun 1.4.0 como gestor de paquetes y runtime; no hace falta Node. Usar `bun run build` y `bun run test`, no `bun build` ni `bun test`: esos son el bundler y el test runner de Bun, no los scripts del proyecto.
- Todo cambio entra por PR a `main` siguiendo [CONTRIBUTING.md](CONTRIBUTING.md): rama `tipo/descripcion`, título de PR en Conventional Commits y squash merge. Nunca aprobar un deploy: la aprobación del environment `production` es de Bruno.
- Astro detecta agentes y manda `dev`/`preview` a segundo plano. Para un servidor en primer plano usar `--ignore-lock`; si quedó uno en segundo plano, detenerlo con `astro dev stop` o `astro preview stop`.
- Conservar el diseño y comportamiento de la landing aprobada, así como los textos, IDs y atributos ARIA y `data-*` que usan los tests.
- Comparar cada cambio visual con la versión aprobada en escritorio y móvil. Requiere revisión independiente y al menos 9/10 en usabilidad, estilo y fidelidad antes de publicar.
- Norte es ficticia; respuestas y fuentes ilustrativas rotuladas como API, nunca como ChatGPT. No inventar métricas, resultados ni clientes.
- Textos solo en `src/i18n/`. Todo cambio de copy se refleja en español, inglés y portugués (Brasil); nada de texto visible en componentes ni scripts.
- Conservar licencias de Inter (SIL OFL 1.1) y Phosphor (MIT). Los logos de terceros no implican aval.
- Sin dependencias de runtime: las animaciones usan la Web Animations API (`src/scripts/anim.ts`). Antes de sumar una librería o script externo, justificar el peso y actualizar la CSP de `public/_headers`.
- Servidores locales solo en `127.0.0.1`, nunca en `0.0.0.0`; detener los procesos abiertos al terminar.
- Documentación de Astro: https://docs.astro.build.
