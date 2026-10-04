# Reglas para agentes

- Usar Node 26.10.0 (`.nvmrc`) y pnpm 12.9.1. Si el Node del PATH es otro, anteponer el gestor de versiones (por ejemplo `fnm exec --using 26.10.0 -- pnpm <comando>`).
- Astro detecta agentes y manda `dev`/`preview` a segundo plano. Para un servidor en primer plano usar `--ignore-lock`; si quedó uno en segundo plano, detenerlo con `astro dev stop` o `astro preview stop`.
- Conservar el diseño y comportamiento de la landing aprobada, así como los textos, IDs y atributos ARIA y `data-*` que usan los tests.
- Comparar cada cambio visual con la versión aprobada en escritorio y móvil. Requiere revisión independiente y al menos 9/10 en usabilidad, estilo y fidelidad antes de publicar.
- Norte es ficticia; respuestas y fuentes ilustrativas rotuladas como API, nunca como ChatGPT. No inventar métricas, resultados ni clientes.
- Conservar licencias de Inter (SIL OFL 1.1), Phosphor (MIT) y GSAP (licencia estándar). Los logos de terceros no implican aval.
- Servidores locales solo en `127.0.0.1`, nunca en `0.0.0.0`; detener los procesos abiertos al terminar.
- Documentación de Astro: https://docs.astro.build.
