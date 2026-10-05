# Unificación Astro y landing R05

Fecha: 2026-10-04. Base: `KairumAI/landing` main
`6489c6794bafb54f94cac6659cb0b79ea0921a26`.
Rama local: `codex/astro-approved-landing-seo-20261004`.
Referencia aprobada: R05 `477f1e2338d2` de `KairumAI/geo-product`.

## Referencia y alcance

`source-reference.json` registra hashes obtenidos del código original aprobado:
51 assets, cinco CSS y los 13 cuerpos de página en español. La única
normalización del HTML es el destino absoluto de los enlaces `/informes/`
hacia la biblioteca ya publicada. `bun run check:reference` verifica estos
fingerprints sin depender del checkout anterior.

Astro añade el documento SEO y el selector de idioma, y genera 39 páginas de
marketing más tres 404. El sitemap contiene 36 páginas indexables; los tres
accesos y las 404 no se indexan. No se copian informes privados ni se migra el
dominio. No hay push, merge ni deploy en esta validación local.

## Rondas

1. Preflight independiente en sólo lectura: se identificaron hreflang/sitemap
   limitados a Home, FAQ schema que no corresponde a la Home R05, texto llms
   anterior, bootstrap que exigía nodos antiguos y posible colisión de CSS.
   Se adaptaron a las páginas actuales antes de evaluar el runtime.
2. Primera suite completa: 20/22 pruebas pasaron. Una prueba usaba un selector
   de menú inexistente; se corrigió a `.menu-toggle`. El segundo fallo descubrió
   que `home-motion.ts` aún declaraba GSAP global; se sustituyó por import de
   runtime. La escena quedaba completa pero su movimiento ambiental detenido.
   No se modificó la expectativa de movimiento para ocultar el fallo.
3. Verificación focalizada: selector de idioma/menú y movimiento real tras la
   entrada pasan. Una captura Analytics posterior cayó al fallback al terminar
   el servidor de preview con SIGTERM 143; el caso no se reprodujo con preview
   activo. Se añadió diagnóstico de fallback y prueba full motion en los tres
   idiomas, que comprueba canvas pintados, señal en movimiento y máscaras del
   menú servidas con HTTP 200. No se modificó el plugin por una hipótesis no
   confirmada. Las capturas de esa sesión quedan en `historical/`, excluidas del
   gate final.
4. El crítico detectó un alias de ancla que podía ocultar el ID real de una
   sección de producto. Se prioriza el ID existente y la nueva prueba confirma
   entrada directa en `#como-funciona`, foco con teclado y recarga en esa sección.
5. Suite final sobre la compilación actual: **26/26 pruebas pasan (57.9 s)**.
   Tipos: **81 archivos, cero errores, avisos e hints**. Build: **42 páginas**.
   Los resultados originales están en `e2e.log`, `check.log` y `build.log`.
   Candidato **`596cdb6215c7`**, hashes y tamaños conservados en
   `candidate-596cdb6215c7.json`.
   La revisión visual final usa las capturas móviles y multilingües actuales.
6. El crítico aprobó `596cdb6215c7` con usabilidad 9,2, estilo 9,3, fidelidad
   9,5, claridad 9,2 y movimiento 9,1; cero P0/P1/P2. Marcó un P3 editorial
   en el título inglés de FAQ: se corrige a «A little more context.». El
   candidato final es **`7207357b71e1`**: sólo cambian el diccionario EN,
   seis documentos de producto EN y `en/llms-full.txt`. CSS, JavaScript,
   assets y todos los documentos ES/PT siguen idénticos. Se vuelve a
   compilar y verificar: **26/26 pruebas (53.5 s)** y tipos sin errores.
   El log de la suite anterior se conserva en `e2e-candidate-596cdb6215c7.log`.
   La FAQ EN tiene una nueva captura nativa. El crítico revalidó el delta:
   **PASS final para `7207357b71e1`**, mismos puntajes por eje, P3 resuelto,
   cero P0/P1/P2 y ningún pendiente de la revisión. El dictamen y sus límites
   están en [review.md](review.md).

Las 47 capturas de `runtime/` son bytes nativos del navegador local, con JSON de
URL, tamaño, idioma, módulo/CSS cargados, estados de animación y geometría.
Su índice es [runtime/index.json](runtime/index.json). El proveedor devuelve
JPEG: se usa extensión `.jpg`, sin reencodificar ni alterar los bytes. Cada
registro distingue dimensiones reales de la imagen y viewport CSS; el
proveedor puede omitir píxeles de la barra de scroll o variar el alto, por lo
que no se presupone correspondencia 1:1. Los frames de apertura muestran la
jerarquía de página; los frames `scene` muestran la escena completa del producto.
No se reconstruyen screenshots a partir de imágenes ni se transfieren puntajes
de la implementación anterior. La revisión final requiere ≥9/10 por eje y
cero bloqueantes.

El manifest identifica el candidato de cada captura: 46 pertenecen a
`596cdb6215c7` y acreditan superficies que no cambió la corrección editorial;
la nueva FAQ EN pertenece a `7207357b71e1`. `candidate.json` compara los
fingerprints de ambos candidatos; no se adjudican capturas antiguas a un
runtime distinto.

La cobertura nativa incluye Home y cinco logos, los cuatro menús, cada escena
principal, los libros, cuatro aperturas de producto con escenas completas,
FAQ con teclado, ancla real y equivalente de idioma, selector a 320 px,
Analytics con canvas y fallback NoJS. PI se compara en ES a 651/320, EN a
1024/320 y PT-BR a 1201/320. Las capturas `reduced` sólo acreditan composición;
los pares `playing` y las pruebas full motion acreditan movimiento. El par
PI PT-BR a 320 tiene entrada completa y desplazamiento nativo de la lente
entre frames, con la pregunta de tres líneas separada del mapa.

## Límites de la evidencia

Los logs conservan los mensajes y resultados; sólo se normalizan espacios al
final de línea para el diff. El SVG de Claude se conserva byte por byte:
`.gitattributes` exceptúa sus dos espacios originales del chequeo de whitespace,
y `check:reference` sigue comprobando su hash completo.

La aplicación se prueba en `127.0.0.1`, sobre la compilación estática Astro.
La prueba CSP aplica una política local equivalente; no demuestra que
Cloudflare la esté enviando en producción. Ninguna prueba local demuestra
rankings, tráfico real, resultados comerciales ni aprobación de deployment.
`llms.txt` es una representación del contenido público, no una garantía de
indexación por modelos.
