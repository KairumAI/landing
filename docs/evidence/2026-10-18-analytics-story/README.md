# Analytics: tres escenas claras

Base: PR #6, `5e91ac631a5fbedfbce11fb4743b7af0ca2a1a40`.
Rama de trabajo: `feat/analytics-visual-story`. Alcance: Home y apertura de
`/productos/analytics/` en ES/EN/PT-BR. Sin publicación ni cambios del panel.

## Referencia y composición

[Boceto claro dirigido por Astra](source-light-story.png), refinado después de
que Bruno eligiera las tres vistas y pidiera una identidad más liviana.
[Contrato de diseño y datos](../../design/analytics-visual-story.md).

Las capturas directas `round-3-viewport-{1440,768,390,320}-*.png` son la evidencia
autoritativa de Home. `round-3-product-{1440,320}-{hero,presence}.png` cubre la
apertura y el contenedor de producto. Sus rutas, anchos y estados se verificaron
en el navegador integrado, no sólo por HTTP o compilación.

Los JSON `round-3-{ancho}.json` registran ambos controles de datos a 44 px y
ausencia de desborde. El scrollbar ocupa 15 px: un viewport CSS de 320 produce
una imagen de 305 px de contenido. No se estiran las imágenes para compensarlo.

## Revisión independiente

Agente crítico `landing_editorial_critic`, sólo lectura, ronda 3:

| Criterio                                  | Nota   |
| ----------------------------------------- | ------ |
| Usabilidad                                | 9,3/10 |
| Estilo                                    | 9,4/10 |
| Fidelidad a KAIRUM y a la dirección clara | 9,4/10 |

Cero bloqueantes y cero P0/P1/P2 pendientes. El crítico abrió la referencia,
la comparación conjunta y capturas de Home en los cuatro anchos; también
apertura y contenedor de producto a 1440/320. Su dictamen cubre esta demostración
de landing y no acredita proveedores, mediciones ni backend.

Historial: ronda 1 ajustó densidad, la curva de sentimiento y una etiqueta de
fieldset que debía estar oculta visualmente. Ronda 2 encontró un summary de
datos de 36 px tras cargar Chart.js. Ronda 3 conserva 44 px y agrega una
aserción en los cuatro anchos. Los crops derivados de full-page con coordenadas
previas se descartaron: el backend recompone al ocultar el scrollbar; los
viewport directos y su confirmación reemplazan esos recortes.

## Verificación

- Bun 1.4.0 y lockfile conservado; sin nuevas dependencias.
- Tipos: 122 archivos, cero errores, advertencias o hints.
- Build: 66 páginas, paquete y biblioteca de informes verificados.
- Gate R05: 51 assets, cinco estilos originales, 13 páginas españolas y 126
  extensiones localizadas de contacto conservadas al revertir la sustitución exacta.
- Entrega: 46/46 pruebas.
- E2E: 137/137 pruebas, ejecutadas en tres grupos completos de 40, 75 y 22,
  con directorios de resultados separados para conservar las trazas.
- Formato y diff comprobados; revisión visual independiente aprobada.

Las pruebas específicas verifican las tres vistas simultáneas, filtros,
comparación, datos subyacentes, details, pestañas, fragmentos, teclado, cuatro
anchos y axe en ES/EN/PT-BR; el caso sin JavaScript usa teclado y movimiento
reducido. Las pruebas históricas de Analytics se actualizaron para el nuevo
recorrido. La prueba de estabilidad de contacto ahora usa el mismo renderer
con IDs públicos ficticios y servicios interceptados, sin depender de variables
de producción ni enviar consultas.

Los estados de cuenta vacía, permisos y respuestas de API no aplican a estas
escenas locales. Un fallo de Chart.js conserva la tabla; no se simula un estado
de éxito de proveedor. El preview local no carga configuración privada del
formulario. El warning previo de chunks mayores a 500 kB se conserva; no se
modifican Three, GSAP, el empaquetado ni el deployment.
