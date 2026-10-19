# Agents: evidencia de la presentación comercial

Trabajo iniciado el 18 y completado el 19 de octubre de 2026. Base `03227bd9`,
rama `feat/analytics-visual-story`, repositorio `KairumAI/landing`.
Vista local: http://127.0.0.1:4418/productos/agents/.

## Fuente y alcance

Se capturó la página pública [Agents de Profound](https://www.tryprofound.com/features/agents)
antes de implementar: apertura, producto principal, beneficios, formatos,
constructor, editor y móvil. La adaptación conserva su jerarquía comercial con
la identidad y el alcance KAIRUM. Las capturas de Profound son documentación
interna; sus imágenes, clientes y afirmaciones no se incorporan al sitio.

El caso utiliza contenido público de KAIRUM. La presentación ilustra brief,
fuentes, propuesta y revisión; no ejecuta agentes ni publica. La nota de alcance
está concentrada debajo de la demostración. Home mantiene su única muestra.

## Capturas del runtime

- `kairum-desktop-*`: apertura, tres recorridos, beneficios, formatos, contexto,
  editor, original y diferencias. Viewport 1440 × 1000.
- `kairum-tablet-768-*`: creación y mejora, con selectores sobre el panel.
- `kairum-mobile-390-*`: apertura, flujo, contenido y editor; las partes superior
  e inferior de las diferencias son capturas separadas con scroll nativo.
- `kairum-mobile-320-*`: tres opciones, respuesta completa, original, propuesta
  y muestra de Home.

Son JPEG nativos, sin recortar, redimensionar ni reconstruir. El backend devuelve
1425 × 990 para KAIRUM y 1430 × 993 para Profound con viewport 1440 × 1000;
375 × 812 y 380 × 822 respectivamente en 390 × 844. La captura no incluye todo
el borde/scrollbar del viewport. Se comparan jerarquía y contenido dentro de esa
área, sin interpretar estos bordes como una diferencia de diseño o de densidad.
La verificación de reflow usa además las dimensiones reales del DOM en los cuatro
anchos. Los fragmentos, el foco o el scroll pueden dejar parte de una sección
fuera del viewport; cada imagen acredita únicamente el área visible.

## Pruebas y correcciones

Primera ronda: 39/44 casos aprobaron. Tres fallos de contraste en las nuevas
etiquetas y números detectaron el acento dorado demasiado claro para texto pequeño.
Se sustituyó por el token warning (#755600). Dos 404 de Analytics PT ocurrieron
al reconstruir `dist` mientras las pruebas lo leían; no se cambió Analytics.

Repetición con la compilación estable: 10/10 aprobadas, que incluyen las ocho
pruebas completas de Agents y las dos de Analytics PT anteriores. Junto con las
otras 34 pruebas previas, los 44 casos únicos están satisfechos. No se reconstruyó
durante la repetición. Se comprobaron controles, fuentes, teclado, fragmentos,
los tres idiomas, cuatro anchos, axe, modo sin JavaScript, FAQ/schema y ausencia
de errores de página. No equivale a una certificación de accesibilidad global.

Tipos: 127 archivos sin errores, advertencias ni hints. Build: 66 páginas,
paquete público e informes verificados. Formato y referencia R05 aprobados,
sin regenerar fingerprints. Se corrigió además el fondo del icono enmascarado
de Brand Hub para conservar el color de Phosphor.

Dictamen independiente: usabilidad 9,2/10, estilo 9,3/10 y fidelidad 9,4/10; cero bloqueantes y cero P0/P1/P2. La revisión se registra en `design-qa.md` de esta carpeta y en la raíz del proyecto. Un P3 opcional propone unificar el extracto del recorrido de mejora con el del editor.
Los hashes de archivos y capturas se registran en `manifest.json`.

## Límite de la entrega

Vista de marketing local. No hay cambios de backend, nuevas dependencias,
push, merge ni despliegue como parte de esta iteración.
