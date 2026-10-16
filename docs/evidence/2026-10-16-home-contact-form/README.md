# Formulario en el cierre de Home · 2026-10-16

Candidato integrado de `feat/contact-formspark`,
[PR #5](https://github.com/KairumAI/landing/pull/5), apilada sobre la
[PR #4](https://github.com/KairumAI/landing/pull/4). La revisión de Home publicada
en `c75547938c992e0138057e144e716ba6e0d3c8e7` se sincronizó con
`feat/recursos-blog` en `1a4afb328011f90aa0dec7681f77b6ef68c4f38e`.
[candidate.json](candidate.json) identifica los archivos de esta revisión y sus
capturas mediante SHA-256 para la actualización autorizada de la PR #5.

## Comportamiento

El cierre «Hablemos de tu marca / La próxima conversación puede empezar acá»
conserva título, botón de agenda y enlace de información. Debajo se añade el mismo
formulario de Contacto, con una variante oscura de hasta 1100 px que se integra
al fondo de Home, sin tarjeta blanca ni sombra. Nombre/email se apilan a la
izquierda y empresa/mensaje al centro. Una tercera columna coloca Turnstile
compacto y el botón de envío al costado derecho de los campos. En tablet el desafío y envío pasan debajo
cuando falta ancho; en móvil, todo sigue una columna.

Se mantienen el tamaño de los controles, la altura y el redimensionamiento del
mensaje, y el orden del DOM para teclado y lectores de pantalla. El widget usa
tema oscuro sólo en Home. El wrapper del cierre usa `display: contents` fuera de
Home, conservando la disposición y el tema claro de Contacto. Se reutilizan los
campos, traducciones ES/EN/PT-BR, estados y contrato de envío; hay un solo
formulario por página. No se añaden proveedores ni dependencias.

Por pedido del usuario se retiró la nota de procesamiento de Home y Contacto en
los tres idiomas, junto con su copy y CSS sin uso. `aria-describedby` conserva
únicamente la introducción existente, sin apuntar a un elemento eliminado.

Los cuatro campos muestran placeholders traducidos, conservando las etiquetas:
«Tu nombre», «nombre@empresa.com», «Tu empresa o sitio web» y «Contanos qué tenés
en mente» en español. El estilo mantiene contraste sobre Home oscura y Contacto
claro. Los ejemplos no son valores precargados ni se envían con la consulta.

Turnstile se solicita cuando el formulario se acerca al viewport, con margen de
300 px. La carga comienza una sola vez y el timeout se cuenta desde esa solicitud.
Sin `IntersectionObserver` se carga directamente. Se conserva la indisponibilidad
si falta configuración y el requisito de un token antes de enviar.

Ver [ADR-0011](../../decisions/0011-contact-form.md),
[configuración y prueba real](../../operations/contact-form.md) y
[evidencia de la versión anterior](../2026-10-16-contact-form/README.md).

## Validación

| Comprobación                           | Resultado                                                                 |
| -------------------------------------- | ------------------------------------------------------------------------- |
| Navegador completo sobre build/preview | 53/53, incluidos 15 casos de contacto                                     |
| Integridad y publicación               | 44/44                                                                     |
| Tipos                                  | 105 archivos; cero errores, warnings o hints                              |
| Referencia R05                         | 51 assets, 5 CSS y 13 HTML ES base conservados; 126 variantes verificadas |
| Build                                  | Paquete público y salida `dist` verificados                               |
| Formato                                | Prettier completo y `git diff --check`                                    |

Entorno: Windows 11 ARM64, Bun 1.4.0 nativo y Playwright con Edge instalado.
Los servidores escucharon únicamente en `127.0.0.1`. La suite final utilizó
`test-results/contact-stack-integrated-final`; entrega utilizó un directorio distinto,
`test-results/contact-stack-integrated-delivery`. La suite de navegador reutilizó la preview
local actualizada tras el build, sin crear un segundo servidor.

Antes de implementar, las tres variantes de idioma fallaron por ausencia del
formulario en Home. La nueva prueba de carga diferida falló porque Turnstile se
solicitaba antes de acercarse al formulario; pasó después del cambio. También se
comprueban aceptación del envío desde ambas páginas, protección contra doble
envío y accesibilidad del cierre de Home.

La prueba previa de Home prohibía cualquier solicitud externa incluso después de
recorrer todas sus secciones. Ahora permite y sustituye solamente la URL exacta
del script oficial de Turnstile; las demás solicitudes externas siguen fallando.
Formspark también se intercepta en los tests. Ninguna simulación se incorpora al
código publicado.

La retirada de la nota afecta a ambas páginas; se conserva la distribución en
tres columnas de Home y el panel claro de Contacto, con los mismos controles.

## Revisión visual independiente

Crítico en sólo lectura: `gmail_smtp_research`, sin autoría de la implementación.
La revisión inicial señaló la herencia de estilos del cierre en el título, botón
y posición del panel. Se ajustaron esas reglas y se volvió a revisar el runtime.
Las capturas intermedias con la cabecera fija superpuesta por el recorte se
reemplazaron: las finales se toman desde scroll cero, con recorte de página
completa y sin ocultar elementos ni inyectar CSS.

Tras la primera aprobación local, el usuario pidió menor altura, dos columnas y
fondo oscuro; luego aclaró que botón y Cloudflare debían quedar al costado de
empresa/mensaje en una tercera columna. La ronda actual revisa esa composición.
La alineación centrada del botón conserva sus 48 px de alto y evita su
estiramiento dentro del grid.

La última revisión incorpora la retirada de la nota solicitada por el usuario,
sin dejar referencias ARIA ni áreas vacías del grid, y los placeholders de los
cuatro campos en los tres idiomas.

Veredicto final sobre el candidato sincronizado y sus 14 capturas automatizadas actuales: **aprobado localmente, cero
bloqueantes**. Usabilidad **9,3/10**, estilo **9,3/10** y fidelidad KAIRUM **9,3/10**.
Se comprobaron la conservación de los elementos originales, la ausencia de
desbordamientos a 320 px y la integración en los tres idiomas.

| Vista                         | ES                                    | EN                                    | PT-BR                                       |
| ----------------------------- | ------------------------------------- | ------------------------------------- | ------------------------------------------- |
| Home, viewport de 1440 px     | [ES](runtime/es-home-contact.png)     | [EN](runtime/en-home-contact.png)     | [PT-BR](runtime/pt-br-home-contact.png)     |
| Home, viewport de 320 px      | [ES](runtime/es-home-contact-320.png) | [EN](runtime/en-home-contact-320.png) | [PT-BR](runtime/pt-br-home-contact-320.png) |
| Contacto, viewport de 1440 px | [ES](runtime/es-contact-desktop.png)  | [EN](runtime/en-contact-desktop.png)  | [PT-BR](runtime/pt-br-contact-desktop.png)  |
| Contacto, viewport de 320 px  | [ES](runtime/es-contact-320.png)      | [EN](runtime/en-contact-320.png)      | [PT-BR](runtime/pt-br-contact-320.png)      |

También se conserva el formulario configurado en
[escritorio](runtime/configured-contact-desktop.png) y
[320 px](runtime/configured-contact-320.png). Son capturas del HTML, CSS y scripts
reales con servicios externos simulados. El espacio reservado al widget no
acredita un desafío remoto real.

Como comprobación adicional anterior a la sincronización, sobre `c755479`, se abrió la Home en Chrome: el widget real con tema
oscuro apareció en la columna lateral, sobre el botón, sin recortes ni
superposición con los campos. Completó la verificación y habilitó el botón; se
conserva una [captura adicional del widget real](runtime/es-home-contact-real.png).
El código del formulario permanece idéntico en el candidato sincronizado.
No se interactuó con el desafío ni se envió el formulario. Esta observación no
acredita recepción por Formspark o Gmail.

## Sincronización del stack

Se integró el avance de la rama base sin reescribir los commits publicados. El
único conflicto estaba en el registro de funcionalidades: se conservaron tanto
WEB-EDITORIAL-05 como WEB-CONTACT-04. La prueba de Home combina las expectativas
editoriales actuales con la excepción exacta para Turnstile. No hubo cambios en
el código del formulario durante esta sincronización. Las comprobaciones y las
14 capturas automatizadas de esta revisión corresponden al conjunto integrado.

## Estado y pendientes

La Home está disponible en la preview local de esta rama para la prueba manual
solicitada por el usuario. La aceptación por Formspark y la llegada a Gmail
siguen pendientes de una consulta real y su comprobación por separado.

El usuario autorizó el commit y push, y luego la sincronización y el merge de
la PR #5 a `feat/recursos-blog`, el 2026-10-16. Esta evidencia registra el candidato
validado antes de ese merge. La PR #4 hacia `main`, la publicación y la recepción
real siguen pendientes. No se envió ninguna consulta real ni se realizó una compra.
