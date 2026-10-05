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
5. El merge a `main` dispara **Deploy**, que verifica el SHA integrado y publica automáticamente (ver [Publicar](#publicar)).

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

## Publicar

Cada merge a `main` dispara **Deploy**. El workflow verifica formato, referencia, tipos, pruebas e integridad del paquete completo. Después comprueba el artifact descargado, confirma que el SHA sigue siendo el actual de `main`, publica en Pages `kairum` y verifica por HTTPS landing e informes. No hace falta crear un release ni aprobar cada deploy.

`production` sólo admite `main` y conserva sus secretos. Las ejecuciones se serializan sin cancelar un upload en curso. Si otro merge desplazó una ejecución antes de publicar, ésta se omite. **Actions → Deploy → Run workflow → main** permite reintentar la versión actual, sin publicar un SHA antiguo.

El destino es el proyecto existente Pages `kairum`, con landing e informes en el mismo paquete. Seguir [el procedimiento de publicación](docs/operations/public-deployment.md) antes de activar este flujo; el CD de geo-product debe permanecer retirado.

Los releases son registros opcionales sobre `main`; no disparan publicación. Se puede usar `vMAJOR.MINOR.PATCH` para identificar hitos, sin cambiar `package.json`:

- `PATCH` (`v0.1.1`): solo `fix`, `perf` o cambios menores de texto.
- `MINOR` (`v0.2.0`): algún `feat`, por ejemplo una sección o contenido nuevo.
- `MAJOR` (`v1.0.0`): rediseño o cambio de estructura de la landing.

## Volver atrás

Revertir por PR el cambio que causó el problema. El nuevo `main` publica la corrección automáticamente. Ante una incidencia, Bruno también puede restaurar un deployment de producción completo desde Pages según [el procedimiento](docs/operations/public-deployment.md#volver-atrás), sin reactivar geo-product. No reintentar una ejecución histórica para sobrescribir el `main` actual.
