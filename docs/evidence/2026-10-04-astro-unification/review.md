# Revisión independiente de la integración

Fecha local: 2026-10-04. Revisor: `/root/scene_semantics_critic`, sólo lectura,
sin editar código ni controlar el navegador. Referencia: R05 `477f1e2338d2`.
Candidato final: **`7207357b71e1`**.

## Dictamen

**PASS local**, P3 editorial corregido, cero P0/P1/P2 y ningún pendiente de
esta revisión. No se heredó el puntaje de R05: hubo revisión completa del
candidato Astro `596cdb6215c7` y revalidación del delta final.

| Eje                  | Puntaje final |
| -------------------- | ------------: |
| Usabilidad           |        9,2/10 |
| Estilo               |        9,3/10 |
| Fidelidad a R05      |        9,5/10 |
| Claridad y semántica |        9,2/10 |
| Movimiento           |        9,1/10 |

El revisor comparó fuente, assets y capturas del runtime. Comprobó materiales,
tipografía, jerarquía, escenas y navegación; los cuatro menús y las aperturas
de los cuatro productos; ES/EN/PT-BR en escritorio y móvil, con 320 px y
anchos intermedios de Prompt; teclado en FAQ/idiomas y anclas equivalentes.
PI mantiene pregunta, intención y mapa; Analytics muestra línea y barras;
Agents termina en revisión humana; Traffic distingue visita y solicitud.

El movimiento tras la entrada tiene evidencia de nuevos frames desktop y
pruebas temporales del runtime. El par móvil PT muestra sólo 84 ms de separación
y cambio subpíxel, por lo que **no se usa solo como prueba perceptual**.
Reduced motion conserva la composición y NoJS mantiene el contenido con
fallback textual en Analytics. Las capturas de apertura muestran el pliegue
inicial, y las capturas `scene` muestran las escenas de producto completas.

El revisor leyó los resultados de los comandos; no los ejecutó. Verificó
39 páginas de marketing, tres 404, 36 indexables y sitemap coherente,
canonical/hreflang por página equivalente, seis rutas noindex y FAQ schema
limitado al contenido visible de productos.

## Delta editorial final

El único P3 era «A little more of context.» en EN. Se cambia `de_contexto` a
`context.`; la [captura nueva](runtime/final-product-prompt-faq-en-copy-corrected.jpg)
confirma el resultado. El crítico comprobó que reintroducir «of» reproduce
los hashes anteriores del diccionario, los seis productos EN y su texto llms.
Bundle, CSS y documentos ES/PT permanecen idénticos. Revalidó los hashes,
el nuevo frame y los nuevos logs: 26/26 pruebas, tipos sin errores, 42 páginas
y referencia 51 assets/cinco CSS/13 páginas ES. Mantuvo los puntajes anteriores
para las superficies sin cambios y aprobó el candidato final.

Los [metadatos nativos](runtime/index.json) identifican el candidato de captura:
46 frames de la revisión completa y un frame del delta final. Se conservan
los bytes del proveedor, codificación JPEG y dimensiones reales; no se
afirma correspondencia 1:1 con el viewport CSS ni se adjudican frames
antiguos a un source posterior.

## Comprobaciones del flujo

La integración se validó sobre la compilación estática en `127.0.0.1:4328`,
con el navegador integrado de Codex para acciones/capturas nativas y la suite
Playwright del repositorio en Chromium 1234. El plugin Browser específico no
está disponible en esta sesión; CUA proporciona la inspección nativa y los
tests existentes proporcionan la regresión automatizada. No se montó otro
controlador para interactuar con el navegador integrado.

| Comprobación         | Resultado y evidencia                                                                                      |
| -------------------- | ---------------------------------------------------------------------------------------------------------- |
| Identidad de página  | URL/título de Home y rutas de producto corresponden a cada idioma.                                         |
| Contenido visible    | HTML estático completo, 39 rutas y contenido NoJS.                                                         |
| Errores de framework | No se observa overlay de error en las capturas finales.                                                    |
| Consola              | Suite sin errores relevantes de aplicación; Analytics pinta dos canvas en los tres idiomas.                |
| Capturas             | 47 originales nativas, con fingerprints de imágenes, CSS y módulo cargado.                                 |
| Interacción          | Menú por teclado → producto → FAQ con Enter → ancla real → idioma equivalente; estados y foco comprobados. |

Comandos: `bun run check:reference`, `bun run check`, `bun run build`,
`bun run test --workers=2`, `bun run format:check`. Para la inspección nativa:
`getAXState`, locators de controles, `getScreenshot` y lectura de consola;
emulación temporal de viewport/movimiento/NoJS, restablecida al terminar.

## Límites

El dictamen acredita la integración local. No certifica deployment, cabeceras
efectivas de Cloudflare, posiciones en buscadores, métricas de clientes, FPS,
WCAG completa ni BFCache. La verificación automatizada de accesibilidad cubre
la Home; las capturas/teclado adicionales no equivalen a una auditoría WCAG
completa de las 39 páginas. Los procesos de preview se detienen al terminar.
