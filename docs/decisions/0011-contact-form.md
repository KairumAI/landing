# 0011 · Recibir consultas con Formspark Free y Turnstile

Fecha: 2026-10-16. Estado: aceptada para implementación y validación local.
El usuario configura Formspark y Turnstile en paralelo. La preparación local no
acredita la entrega real de correo ni autoriza publicar.

## Contexto

La Home necesita recibir consultas en su cierre «Hablemos de tu marca», además
de conservar la entrada secundaria «Quiero más información» y el formulario de
`/contacto/`, en español, inglés y portugués (Brasil). La landing sigue siendo
estática: alojar un backend propio, guardar
credenciales de Gmail o contratar un servicio amplía innecesariamente este alcance.

## Decisión

- Usar Formspark Free como receptor en `https://submit-form.com/<form-id>`.
  Su endpoint admite el formulario propio sin SDK ni dependencia npm; se conserva
  la UI KAIRUM. Turnstile aporta el desafío antispam y Formspark valida el token
  en su servicio mediante `cf-turnstile-response`. Ver la
  [integración oficial](https://documentation.formspark.io/setup/spam-protection.html#turnstile).
- Pedir nombre y email; empresa y mensaje son opcionales. Por pedido del usuario
  se retira la nota de procesamiento del formulario en los tres idiomas. No
  incorporar una suscripción de marketing ni adjuntos.
- Mostrar ejemplos traducidos como placeholders en los cuatro campos, manteniendo
  sus etiquetas visibles. Son pistas de formato, no valores precargados ni datos
  que se envíen al receptor.
- Reutilizar el mismo panel y contrato de envío en Home y Contacto, con un solo
  formulario por página. En Home se añade debajo del cierre existente, conservando
  título, agenda y enlace de información. Su variante oscura aprovecha dos
  columnas de campos en escritorio: nombre/email a la izquierda y empresa/mensaje
  al centro. Una tercera columna sitúa desafío y envío al costado derecho de esos
  campos. Si falta ancho,
  desafío y envío pasan debajo; en móvil se apilan. Contacto conserva su panel
  claro. Cargar Turnstile cuando el formulario
  se acerque al viewport (margen de 300 px); el timeout comienza entonces. Si el
  navegador no ofrece `IntersectionObserver`, cargarlo directamente.
- Formspark conserva el historial; puede exportarse como CSV o JSON desde su
  dashboard. Gmail es sólo el buzón receptor de notificaciones: no se integra
  con la API de Gmail ni necesita contraseñas, OAuth o credenciales del buzón
  en la landing. Ver [exportación](https://documentation.formspark.io/dashboard/exporting-submissions.html)
  y [destinatarios de notificaciones](https://documentation.formspark.io/dashboard/email-notification-settings.html).
- Free incluye **250 envíos totales por workspace**, compartidos entre sus
  formularios; no se renuevan mensualmente. Una ampliación es una compra única
  y requiere otra autorización. La cuota restante debe comprobarse en la cuenta;
  no se asume que haya 250 disponibles. Ver [planes y consumo](https://formspark.io/pricing/).
  Free no incluye [autorespuesta por email](https://documentation.formspark.io/dashboard/autoresponder.html):
  la confirmación dentro de la página no promete un correo al visitante.

## Excepción acotada de CSP y dependencias

Se modifica la decisión de servir todos los scripts desde el sitio de
[ADR-0008](0008-approved-cinematic-home.md) sólo para el script oficial
`https://challenges.cloudflare.com/turnstile/v0/api.js`. Se carga desde su origen
oficial, sin copiarlo ni servirlo mediante proxy. No se agregan paquetes,
wrappers, CDNs de librerías ni `unsafe-eval`. Ver
[renderizado oficial](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/).

La CSP permite `https://challenges.cloudflare.com` en `script-src` y `frame-src`,
según la [guía de Cloudflare](https://developers.cloudflare.com/turnstile/reference/content-security-policy/),
y `https://submit-form.com` en `connect-src` y `form-action` para el receptor.
Se conservan las demás restricciones. La dependencia externa añade solicitudes
y disponibilidad de terceros al recorrido; no se afirma un peso fijo del script
remoto ni una mejora medida de conversión.

## Configuración y comportamiento

`PUBLIC_FORMSPARK_FORM_ID` y `PUBLIC_TURNSTILE_SITE_KEY` son identificadores
públicos incorporados al HTML durante el build. Localmente se leen de `.env.local`
ignorado; CI los recibe de las repository variables `FORMSPARK_FORM_ID` y
`TURNSTILE_SITE_KEY`. El secreto Turnstile se pega únicamente en Formspark,
**Settings → Spam protection → Challenge → Turnstile**. No pasa por repositorio,
variables de build, logs ni chat. Ver el [runbook](../operations/contact-form.md).

Si falta cualquiera de los dos valores, el formulario queda indisponible y no
envía ni aparenta aceptación. Sin token válido, ante un desafío fallido o ante
un error del receptor tampoco muestra éxito. Una respuesta de aceptación de
Formspark acredita recepción por el proveedor; la llegada a Gmail se verifica
por separado.

La Home R05 `477f1e2338d2` se preserva mediante slots aditivos del renderer y CSS
nuevo. El checker debe comprobar los hashes base originales y que el HTML de
runtime sea exactamente la base más los bloques nuevos esperados, sin otras
diferencias. No se regeneran fingerprints para aceptar otro diseño. Todo copy
vive en `src/i18n/` con sus tres idiomas.

## Validación y límites

Los tests de navegador interceptan únicamente las APIs externas; prueban los
estados del formulario propio, validación, errores y confirmación. Los fixtures
no prueban el desafío real, el historial remoto ni entrega de correo. Se verifica
la referencia R05, tipos, formato, build y pruebas aplicables; la revisión visual
independiente requiere al menos 9/10 en cada eje y cero bloqueantes.

La prueba real con una consulta sintética controlada queda pendiente de owner,
configuración, permisos y publicación separados. Este ADR no acredita alta de
cuentas, activación, envíos, compras, push, merge ni despliegue.
