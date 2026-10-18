# Menú y verificador durante el scroll · 2026-10-18

Continuación local de la revisión, sobre la rama
`feat/landing-visual-feedback` y HEAD base
`23c33cfa4802c3794419f4a7755ffc80e1c2b3f7`. Se conservan los cambios locales
anteriores. Esta evidencia amplía, sin reemplazar, la del ajuste de bordes y
selección.

**Actualización posterior:** el usuario pidió retirar la espera por scroll/idle.
El candidato final vuelve a cargar Turnstile con async y a renderizar en onload,
sin scheduler ni listeners de scroll propios del formulario. Se conserva la
corrección de altura. Las trazas, hashes y resultados de este directorio registran
la ronda previa; la verificación del código finalmente entregado está en
[la evidencia integrada posterior](../2026-10-18-about-team/README.md).

## Diagnóstico

- **Barra del menú:** el bloque lateral llena toda la altura del grid. Su
  desplazamiento inicial de 6 px ampliaba transitoriamente `scrollHeight`
  aunque el contenido final entraba completo. La prueba por fotogramas lo
  reprodujo a 1440 y 2244 px: overflow inicial de 6 px y final de 0 px.
  La intro conserva su fade; el panel conserva movimiento/escala y los
  enlaces conservan su stagger. No se elimina el scroll real en ventanas bajas.
- **Carga de Turnstile:** las trazas locales con el proveedor real muestran
  que se añadía `api.js` unos 2–3 ms después del último evento de scroll.
  El trabajo propio de `onload` tomó 5–7 ms; una función del iframe de
  Cloudflare llegó a 356 ms en escritorio y 58 ms en móvil, dentro de un
  proceso distinto al de la página. No se observó long task de la página
  durante esa verificación. El `load` inicial y `ScrollTrigger.refresh()`
  precedieron a la carga del widget; no explican ese caso.
- **Salto de layout:** al pasar de «Preparando el formulario…» a listo, el
  estado vacío retiraba margen, padding, borde y línea de texto. En 1440 y
  390 px desaparecían 65 px de alto; estando al final, `scrollY` también
  retrocedía 65 px. Es una causa propia y reproducible de tirón percibido.

Las trazas reales terminaron en error del desafío en el navegador automatizado;
no se interactuó con el CAPTCHA ni se envió una consulta. Esos datos no prueban
la duración de una verificación exitosa en el navegador del usuario. Las trazas
crudas quedan fuera del repo; sólo se conserva evidencia sanitizada.

Cloudflare permite controlar el momento de creación con
[renderizado explícito](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/).
El iframe y su costo interno siguen siendo del proveedor. La mitigación local
no representa un worker propio ni una garantía de latencia del servicio.

## Correcciones

Se evaluó esperar 200 ms sin scroll y un turno ocioso antes de la descarga y el
render. Esa mitigación y sus pruebas específicas se retiraron a pedido del usuario.
El flujo final conserva async, los callbacks, el token requerido, los errores y
el envío habituales.

La fila de estado conserva el espacio de su mensaje inicial cuando queda vacía:
fondo y borde pasan a transparentes. Las pruebas comprobaron primero el salto
de 65 px en rojo y luego altura y scroll estables en verde, a 1440 y 390 px.
Esto deja una fila de aire al final del formulario y evita que la página se
acorte al quedar listo. Si un error ocupó más líneas, su altura se conserva
al recuperarse mediante una única medición en ese callback; no se mide durante
el scroll. La regresión móvil detectó primero un residual de 44 px en rojo.

## Validación

En esta ronda previa, las pruebas comprobaron overflow por fotograma con animación activa,
scroll real en escritorio bajo y móvil, estabilidad de altura/posición al
recibir el callback, y planificación de carga/render frente a scroll continuo.
La revisión independiente aprobó navegación y contacto con **9,3 en
usabilidad, 9,2 en estilo y 9,3 en fidelidad**, cero bloqueantes. Inspeccionó
las dos vistas del menú y cuatro de contacto con sus registros de geometría;
el espacio reservado se considera una desviación intencional por estabilidad.

La corrida previa de contratos contra el servidor de desarrollo pasó 49/51: los
casos ES y EN «footer language links share the existing footer and retain the
current anchor» fallaron porque la toolbar de Astro interceptó sus clicks.
No se forzaron clicks ni se modificó la toolbar. Ambos casos pasaron en la
corrida final contra el build/preview, sin esa interfaz de desarrollo.

| Comprobación     | Resultado final                                                                                                                     |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| E2E integrado    | **133/133**, `test-results/navigation-performance-final`, tres workers, preview en 4337.                                            |
| Entrega          | **46/46**, `test-results/navigation-performance-delivery-final`.                                                                    |
| Capturas finales | **4/4** regresiones de layout tras corregir sólo el encuadre, `test-results/contact-layout-final-evidence`.                         |
| Geometría        | Cero overflow transitorio a 1440/2244; scroll real a 1440x400 y 320x640; altura/scroll estables en cuatro transiciones de contacto. |
| Tipos            | **118 archivos**, cero errores, warnings o hints.                                                                                   |
| Referencia       | 51 assets, cinco CSS y 13 páginas, 126 variantes de contacto; fingerprints intactos.                                                |
| Build            | 66 páginas y paquete íntegro de 26 informes/2.959 archivos.                                                                         |
| Formato          | Prettier completo y whitespace verificados.                                                                                         |

Las capturas de contacto se volvieron a encuadrar desde scroll inicial para que la
navbar sticky no tapara el título del cierre. Sólo cambia el helper de captura
de ese test; las cuatro aserciones de geometría se verifican antes de encuadrar.
El manifest vincula las fuentes, capturas, fotogramas y observación sanitizada.

Alcance de la ronda registrada: local, antes del commit y push; sin merge,
publicación ni envío real del formulario. La espera por scroll no forma parte
de la entrega final.
