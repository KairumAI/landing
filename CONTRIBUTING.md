# Cómo trabajar en la landing

## Flujo

1. Crear una rama desde `main` actualizado: `git switch -c tipo/descripcion-corta`.
2. Trabajar y verificar en local antes de abrir el PR:

   ```sh
   bun format        # corrige el formato
   bun check
   bun run test
   ```

3. Abrir un PR contra `main`. El CI corre `format:check`, `check` y los tests de Playwright.
4. Con el CI en verde, integrar con **Squash and merge**. Se puede activar auto-merge para que entre solo cuando el CI pase.
5. El merge propone un deploy de ese commit. Bruno lo aprueba en **Actions → Deploy** y recién ahí se publica (ver [Publicación](README.md#publicación)).

`main` está protegida con el ruleset `main`: solo admite PRs con el check `verify` en verde, sin push directo, sin force-push y con historial lineal. Las ramas se borran solas al integrarse.

Las ramas duran poco: un cambio por PR, integrado en horas o pocos días. Si `main` avanzó, actualizar la rama con **Update branch** o `git rebase origin/main`.

## Nombres

Ramas y títulos de PR usan los tipos de [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/):

| Tipo       | Uso                                                      |
| ---------- | -------------------------------------------------------- |
| `feat`     | Sección, contenido o comportamiento nuevo                |
| `fix`      | Corrige algo que se ve o funciona mal, incluido un texto |
| `perf`     | Peso, carga o rendimiento                                |
| `refactor` | Reorganiza código sin cambiar lo que se ve               |
| `test`     | Solo tests                                               |
| `docs`     | Solo documentación                                       |
| `ci`       | Workflows de GitHub Actions                              |
| `chore`    | Dependencias y configuración                             |

- Rama: `tipo/descripcion-corta`, en minúsculas y con guiones. Ejemplo: `fix/cta-header-movil`.
- Título del PR: `tipo: descripción` en español, en minúscula y presente. Ejemplo: `fix: el cta del header no entra en 360 px`.

El título del PR es el mensaje del commit en `main`, porque el squash lo usa como título y la descripción del PR como cuerpo. Los commits dentro de la rama no tienen formato obligatorio.

## Qué revisar en un PR

- Texto cambiado en los tres diccionarios de `src/i18n/`.
- Cambios visuales comparados con la versión aprobada, en escritorio y móvil.
- Un script o servicio externo nuevo sumado a la CSP de `public/_headers`.

## Volver atrás

Revertir el PR desde GitHub (**Revert**), integrar el revert y aprobar su deploy. En una urgencia, Cloudflare permite volver a un deploy anterior desde **Workers & Pages → kairum-landing → Deployments**; después hay que revertir también en `main` para que el próximo deploy no traiga el error de vuelta.
