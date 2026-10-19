# Ajustes de bordes, selección y contexto · 2026-10-18

Revisión local solicitada por cuatro comentarios del navegador. Base de la
rama `feat/landing-visual-feedback`: `23c33cfa4802c3794419f4a7755ffc80e1c2b3f7`.
El manifest de esta carpeta identifica las fuentes y capturas de esta revisión;
la evidencia del 17 de octubre conserva su alcance histórico.

## Cambios

- Las imágenes de AI Report y Consulting en «Cómo empezar» conservan su tamaño
  y centro visual. Su caja sigue ahora el bitmap 3:2, para aplicar la máscara
  existente a los bordes reales. La transparencia ocupa sólo los 4–12 px
  exteriores. Los archivos de imagen y el centro permanecen intactos.
- La selección nativa conserva `#fff5c9` y `#181818`. Los encabezados con
  interlineado estrecho pasan a `calc(1.22em + 1px)`. En Nosotros, a 88 px, el salto entre
  líneas era 93,28 px y el rectángulo seleccionable medía 106 px: la siguiente
  selección tapaba 12,72 px de la línea anterior. Ahora el salto es 108,36 px.
  El píxel adicional evita que el redondeo de métricas a 36 px vuelva a
  producir un solapamiento de 0,09 px en móvil.
  Las reglas específicas de párrafos y encabezados con mayor interlineado
  se conservan. No se agrega JavaScript de selección.
- Los enlaces de Productos tienen 16 px de padding en escritorio y 12 px en
  móvil. Los iconos no se comprimen; la flecha conserva su animación y margen.
- Analytics identifica la consulta como un ejemplo de lo que alguien podría
  escribir en ChatGPT u otro asistente, y rotula las dos respuestas como
  ilustrativas. Home, Prompt Intelligence, AI Report, Marcas y la comparación
  secundaria de Analytics añaden contexto equivalente. Copy ES/EN/PT-BR.

Los deltas HTML se declaran en `editorial-integration.ts` y se revierten antes
de verificar R05. Se conservan los cinco CSS originales, 51 assets y los
fingerprints aprobados. Las ilustraciones no acreditan resultados medidos ni
una integración con la interfaz de ChatGPT.

## Verificación

La nueva prueba `visual-polish.spec.ts` comprueba rectángulos reales de texto
sin solapamientos, colores de selección, márgenes de iconos tras hover y foco,
navegación por teclado y encuadre/máscara de las dos imágenes. Las capturas
seleccionadas incluyen escritorio y móvil; no se envían formularios reales.

La primera ronda detectó un solapamiento de 0,09 px en móvil; se corrigió con
el píxel adicional. También se corrigió el test de reentrada del puntero tras
Escape para salir realmente del área cerrada antes de volver a entrar.
Una ejecución posterior superó el límite de 120 segundos del helper que
construye y arranca el servidor; no llegó a ejecutar pruebas. El build se
verificó por separado y la corrida final reutilizó su preview en 4337.

| Comprobación          | Resultado final                                                                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| E2E completo          | **122/122**, tres workers, `test-results/landing-polish-final-preview-20261018`.                          |
| Entrega               | **46/46**, `test-results/landing-polish-delivery-20261018`.                                               |
| Tipos                 | **115 archivos**, cero errores, warnings o hints.                                                         |
| Referencia            | **51 assets, cinco CSS y 13 páginas**, con **126 variantes** de contacto.                                 |
| Build                 | **66 páginas**, paquete completo de **26 informes / 2.959 archivos**, sin modificar los bytes originales. |
| Formato               | Prettier completo y whitespace verificados.                                                               |
| Crítico independiente | **9,3 usabilidad / 9,2 estilo / 9,3 fidelidad**, cero bloqueantes.                                        |

La revisión final independiente inspeccionó seis capturas de selección,
ocho de tarjetas a 1440/768/390/320 px, cuatro de menú con hover/foco, doce de
Analytics y seis de audiencias. Esta carpeta conserva una selección de 22
capturas de esa corrida, identificadas junto a las fuentes en `candidate.json`.
El único ajuste de código posterior al E2E fue una aserción de tipo TypeScript
en la prueba del atributo `inert`, sin efecto sobre su JavaScript ni la página.

Esta entrega local no acredita push, merge, publicación ni recepción de correo.
