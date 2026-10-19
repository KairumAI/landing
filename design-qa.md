# Design QA — Analytics en tres momentos

final result: passed

## Fuente y runtime

- Fuente: `docs/evidence/2026-10-18-analytics-story/source-light-story.png`,
  906 × 1736 px, tres escenas refinadas por Astra en una composición clara.
- Runtime: `http://127.0.0.1:4418/#product-analytics` y
  `http://127.0.0.1:4418/productos/analytics/`.
- Home: viewport CSS 1440/768/390/320 × 1000, densidad 1. Capturas directas
  `round-3-viewport-{ancho}-{presence,sentiment,citations}.png` en la misma
  carpeta de evidencia. Los PNG tienen 15 px menos de ancho por el scrollbar.
- Producto: `round-3-product-{1440,320}-{hero,presence}.png`.
- La comparación conjunta normaliza el ancho conservando la proporción; las
  capturas de viewport finales resuelven los límites del recorte full-page.

## Superficies de fidelidad

- **Tipografía:** Inter local, titulares de escena y datos con jerarquías
  diferentes. La escala de 12–14 px dentro del producto conserva densidad;
  el texto explicativo y las cabeceras son mayores. No se rasteriza texto de UI.
- **Espaciado:** tres capítulos abiertos, paneles amplios y sidebar compartido.
  Móvil convierte la navegación en fila y lleva el ranking bajo la curva.
  Se preserva el encabezado existente R05 y se evitan heros duplicados.
- **Color:** marfil/blanco y amarillo KAIRUM por corrección expresa de Bruno.
  Semántica de sentimiento con verde, gris y rojo; texto y nombres complementan
  el color. No se conserva el fondo negro de la primera referencia.
- **Assets:** logo y Phosphor locales ya aprobados. Canvas Chart.js y medidores
  representan los datos nativos de la demo, no reemplazos de imágenes de marca.
  No se agregan fotografías, proveedores ni iconos dibujados a mano.
- **Contenido:** tres vistas presentes, denominadores y datos sintéticos
  explícitos, marcas genéricas y `.example` no navegable. Las cifras del boceto
  se reemplazan por un ejemplo internamente consistente, con las mismas
  definiciones en sus tres traducciones.

## Historial y hallazgos

Ronda 1: se ajustaron densidad, fieldset oculto y evolución de sentimiento.
Ronda 2: el crítico detectó un summary de 36 px. Ronda 3: mínimo 44 px y test en
los cuatro anchos; JSON y capturas posteriores confirman la corrección.

Los recortes full-page corridos no se consideraron defectos de UI: las capturas
directas confirmaron el contenido. Se corrigió además la captura del hero móvil
de producto tras verificar explícitamente su ancho y scroll inicial.

Dictamen independiente final: usabilidad 9,3; estilo 9,4; fidelidad 9,4.
**Cero P0/P1/P2 y cero bloqueantes pendientes.** Comparación de composición y
revisión enfocada en los paneles, tablas, datos, tipografía, controles y móviles.
Sin P3 que condicione esta entrega.

La verificación funcional cubre filtros, comparación, details, datos accesibles,
pestañas de fuentes con teclado y fragmentos, rutas localizadas, CSP y el camino
sin JavaScript. La revisión no acredita backend ni servicios reales.
