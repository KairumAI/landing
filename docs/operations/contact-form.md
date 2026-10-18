# Operar el formulario de contacto

Estado al 2026-10-16: preparación local; activación y entrega real pendientes.
Decisión: [ADR-0011](../decisions/0011-contact-form.md). El usuario configura las
cuentas durante la preparación; la publicación sigue el circuito del repositorio.

## Owner y alta del servicio

Quien administra Formspark y Turnstile conserva el acceso y confirma el buzón
receptor. Registrar owner, workspace, formulario, widget y responsable de atender
consultas en un registro operativo privado, sin secretos ni datos de visitantes
en este repositorio. El owner conserva el acceso y revisa cuota y notificaciones.

Con autorización para configurar las cuentas, el owner debe:

1. Iniciar sesión o crear la cuenta en [Formspark](https://dashboard.formspark.io/),
   completar la verificación que solicite y usar el workspace Free elegido.
   Crear un formulario de contacto KAIRUM y copiar sólo su form ID público.
   Revisar el saldo: el alta inicial otorga 250 envíos totales al workspace;
   otro workspace creado después no recibe otra cuota gratis. Ver
   [planes](https://formspark.io/pricing/).
2. En el formulario, abrir **Settings → Emails → Notifications**. Habilitar el
   destinatario correspondiente o añadir el Gmail como guest. Abrir en Gmail
   el correo de confirmación, aceptarlo y comprobar que deja de estar pendiente.
   No basta con escribir la dirección. Mantener la plantilla predeterminada;
   no configurar autorespuesta, que no está incluida en Free. Ver
   [notificaciones](https://documentation.formspark.io/dashboard/email-notification-settings.html)
   y [autorespuesta](https://documentation.formspark.io/dashboard/autoresponder.html).
3. En la cuenta Cloudflare de KAIRUM, abrir **Turnstile → Add widget**. Darle un
   nombre reconocible, elegir **Managed** y autorizar los hostnames
   `kairum.com.ar` y `www.kairum.com.ar`, sin protocolo, puerto ni ruta. No añadir
   dominios locales al widget de producción. Copiar el sitekey público y conservar
   el secret en el proveedor. Ver [alta del widget](https://developers.cloudflare.com/turnstile/get-started/widget-management/dashboard/)
   y [hostnames](https://developers.cloudflare.com/turnstile/additional-configuration/hostname-management/).
4. Volver a Formspark → formulario → **Settings → Spam protection → Challenge**.
   Seleccionar **Turnstile** y pegar el secret en **Turnstile secret key**.
   En **Allowed domains**, añadir `kairum.com.ar`; esta regla cubre `www` y los
   demás subdominios. Conservar el filtrado automático activado. Comprobar que
   Challenge no quede en `None`. Ver
   [protección oficial](https://documentation.formspark.io/setup/spam-protection.html).

El secret Turnstile sólo se introduce en ese campo de Formspark. Nunca se pide
por chat ni se guarda en código, `.env.local`, GitHub, capturas o logs. Gmail
sólo recibe correo; la landing no necesita credenciales Gmail ni un token API
de Formspark.

## Build local y artifact de producción

Crear manualmente `.env.local` en la raíz del checkout con los dos valores
públicos. El archivo está ignorado por Git; no copiar archivos de entorno de
geo-product ni commitear valores reales. Sin configuración, conservarlo ausente
o con valores vacíos:

```dotenv
PUBLIC_FORMSPARK_FORM_ID=
PUBLIC_TURNSTILE_SITE_KEY=
```

Para producción, configurar en **KairumAI/landing → Settings → Secrets and
variables → Actions → Variables → Repository variables**:

| Variable de GitHub   | Valor público                         | Variable que recibe el build |
| -------------------- | ------------------------------------- | ---------------------------- |
| `FORMSPARK_FORM_ID`  | Form ID del formulario de producción  | `PUBLIC_FORMSPARK_FORM_ID`   |
| `TURNSTILE_SITE_KEY` | Sitekey del widget Managed productivo | `PUBLIC_TURNSTILE_SITE_KEY`  |

El job que compila el paquete debe mapearlas antes de `bun run build` y de las
pruebas que construyen el artifact:

```yaml
env:
  PUBLIC_FORMSPARK_FORM_ID: ${{ vars.FORMSPARK_FORM_ID }}
  PUBLIC_TURNSTILE_SITE_KEY: ${{ vars.TURNSTILE_SITE_KEY }}
```

Astro incorpora ambos valores durante la compilación estática. Configurarlos
sólo en el dashboard de Pages no cambia el artifact que construye GitHub Actions.
Después de cambiar un ID o sitekey hace falta compilar y publicar otro paquete
por el [circuito vigente](public-deployment.md). El job de upload reutiliza el
artifact verificado; no recompila ni incorpora secretos.

## Validación local sin enviar consultas

Usar Bun 1.4.0. Ejecutar formato, `bun run check:reference`, `bun check`,
`bun run build`, `bun run test:delivery` y las pruebas de navegador aplicables
con `bun run test`. Los servidores locales escuchan sólo en `127.0.0.1`.

Las pruebas deben interceptar sólo Formspark y Turnstile, conservando HTML,
scripts, estilos y navegación propios. Verificar Home y `/contacto/` en ES, EN
y PT-BR: campos requeridos y opcionales, teclado, errores, desafío expirado,
reintento y éxito simulado. Probar ambos valores ausentes y cada uno ausente por
separado: no debe haber envío ni confirmación aparente. Los mocks no prueban
recepción externa. La referencia debe aceptar únicamente los slots aditivos
exactos sobre los hashes originales R05, y la revisión visual debe registrar
capturas actuales y aprobación independiente ≥9/10 por eje, sin bloqueantes.

Para inspeccionar el widget real localmente, usar el sitekey de test oficial
`1x00000000000000000000AA`. Ese sitekey requiere su secret de test correspondiente
para validar tokens: sólo un formulario Formspark **sandbox separado** puede
configurarse con ese secret y permitir `127.0.0.1`. Obtener el par de la
[tabla oficial de testing](https://developers.cloudflare.com/turnstile/troubleshooting/testing/).
No sustituir el secret del formulario productivo por uno de test ni publicar
sitekeys de test. Inspeccionar el widget sin enviar no acredita el recorrido;
un envío a sandbox también necesita autorización y consume cuota si se acepta.

## Prueba real posterior a publicación

Pendiente hasta contar con configuración, permiso de envío y publicación de la
versión aprobada por el circuito de `main`. El owner verifica antes el receptor
confirmado, Challenge Turnstile, allowed domains, keys de producción y saldo.

1. Abrir el sitio publicado por HTTPS y comprobar la versión desplegada, la
   carga del widget y la ausencia de bloqueos CSP. Revisar las tres traducciones
   sin enviar tres consultas.
2. Enviar **una** consulta sintética claramente rotulada como prueba, con un
   email controlado por KAIRUM y sin PII de terceros. Resolver Turnstile real y
   comprobar la confirmación dentro de la página.
3. Verificar la misma consulta en Formspark **Submissions → Inbox** y la
   notificación en Gmail, incluida la carpeta Spam. La aceptación HTTP por sí
   sola no demuestra entrega a Gmail. No esperar un email de autorespuesta al
   visitante en Free.
4. Registrar commit, deployment, fecha, host y resultados de recepción/historial/
   Gmail sin copiar el contenido ni datos personales al repo. Si falta alguno,
   dejarlo pendiente o fallido, revisar configuración y evitar reenvíos repetidos.

## Seguimiento e incidencias

Revisar el saldo del workspace antes de campañas y periódicamente. Los 250
envíos son un total compartido. Una compra adicional requiere autorización
expresa; no activar pagos como respuesta automática a una cuota agotada.

Si aparece un error, comprobar configuración de build, CSP, token y dominios;
ante rechazo revisar **Submissions → Spam** y, ante falta de cuota, **Overflow**.
No desactivar Turnstile para diagnosticar en producción. El proveedor describe
el comportamiento de cuota en [límites y planes](https://documentation.formspark.io/troubleshooting/limits-and-plans.html).

El historial queda en Formspark. Para una copia autorizada, abrir **Submissions**,
seleccionar registros y usar **Export → CSV/JSON**, o **Exports** para un período.
Guardar la copia en un destino privado aprobado, nunca en el repo; los exports
de Inbox no incluyen spam ni registros eliminados. Ver
[exportación](https://documentation.formspark.io/dashboard/exporting-submissions.html).

## Carga durante el desplazamiento · 2026-10-18

Al acercarse al formulario se carga el script async de Turnstile y se renderiza
en su callback de carga. El usuario pidió retirar la espera por scroll/idle
evaluada durante el diagnóstico. El desafío sigue siendo obligatorio; no se
habilita el envío hasta recibir el token.

Al quedar listo, se conserva el espacio de la fila de estado para evitar un
salto de la página. En un diagnóstico, distinguir tareas del documento,
trabajo del iframe de Cloudflare y cambios de altura/scroll; un mock sólo prueba
nuestro contrato, no la latencia de una verificación real. Ver
[la evidencia local](../evidence/2026-10-18-navigation-performance/README.md).
