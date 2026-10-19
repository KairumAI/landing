# Analytics: desarrollo comercial y referencia Profound

Base `13b2ff73e3706e9d2abdb3fda3dbfce2424673c4`, rama `feat/analytics-visual-story`.
Repositorio público Astro; vista previa local, sin publicación ni cambios del panel.

## Referencia y adaptación

Fuente pública observada: [Answer Engine Insights de Profound](https://www.tryprofound.com/features/answer-engine-insights).
Se capturaron escritorio, estados del selector y móvil. Las imágenes `profound-*`
son referencia interna y no se incorporan al sitio publicado.

La composición reproduce apertura comercial, controles por beneficio, panel
central, matriz de capacidades y metodología. KAIRUM conserva marca, Inter,
iconos locales y paleta clara. Tres vistas corresponden a su alcance; no se
trasladan FactCheck, clientes, certificaciones, datasets masivos, corridas diarias
ni captura desde interfaces de consumidor. Los textos comerciales se redactaron
para KAIRUM y se reflejan en ES/EN/PT-BR.

Una nota al pie de la vista identifica cifras, marcas y fuentes ilustrativas.
Se retiraron avisos repetidos dentro de cada panel y etiquetas que dificultaban
leer la demostración como una presentación de producto. No se atribuyen a KAIRUM
métricas ni resultados de Profound.

## Evidencia visual vigente

- `kairum-desktop-{top,presence,sentiment,citations,benefits,workflow}.jpg`:
  jerarquía de la página y sus secciones en escritorio.
- `kairum-768-{top,presence,sentiment,citations,benefits}.jpg`:
  presentación y vistas de tablet.
- `kairum-390-{top,sentiment,citations,benefits}.jpg`: móvil.
- `kairum-320-top.jpg` y `final-320-{presence,sentiment,citations}-{upper,lower}.jpg`:
  paneles móviles recorridos por teclado y desplazamiento nativo. Las partes
  superior e inferior son capturas separadas de la misma vista, no un montaje.
- `mobile-panel-checks.json`: ID del panel activo y ausencia de desborde global.
- `final-home-{1440,320}.jpg`: una sola muestra en Home y una sola nota.

Los anchos CSS evaluados son 1440, 768, 390 y 320. Las imágenes de viewport
pueden excluir el scrollbar y el borde del navegador. Se descartaron capturas
intermedias en blanco, con menú abierto, estado equivocado o recortes desfasados;
no sustentan el dictamen. Los archivos del navegador son JPEG con su extensión
correspondiente, conservados sin editar sus píxeles.

## Verificación funcional

- 36/36 pruebas de Analytics y landing: tres idiomas, navegación, responsive,
  teclado, fragmentos, pestañas anidadas, datos, CSP, SEO y axe.
- Tras unificar las últimas traducciones se repitieron las 10 pruebas de Analytics:
  10/10. Incluyen selección efectiva de cada pestaña en los cuatro anchos.
- Tipos: 124 archivos, cero errores, advertencias o hints.
- Compilación: 66 páginas y paquete público verificado.
- Referencia R05 conservada por integración reversible.
- Sin nuevas dependencias ni cambios de infraestructura.

Se corrigió un fallo real de contraste en el texto de la barra del panel:
un selector decorativo para los puntos también afectaba a la nueva etiqueta.
La regla ahora se limita a los elementos decorativos; axe volvió a pasar.

Revisión independiente final: 9,2 en usabilidad, 9,4 en estilo y 9,3 en fidelidad,
cero bloqueantes y cero P0/P1/P2. Dictamen en `design-qa.md`. El scroll horizontal
contenido de la tabla por temas en 320 px queda como pulido opcional; sus cuatro
columnas y datos completos siguen accesibles. No hay desborde global.
