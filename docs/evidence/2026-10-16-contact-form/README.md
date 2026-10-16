# Formulario de contacto · 2026-10-16

Candidato de `KairumAI/landing`, rama `feat/contact-formspark`, apilado sobre la
[PR #4](https://github.com/KairumAI/landing/pull/4), `feat/recursos-blog`, commit
`ffee7fa887268a18b1d0a00875f07fa4630afc55`. [candidate.json](candidate.json)
registra los SHA-256 de los archivos del cambio, sin incluir este directorio de
evidencia. La base inicial del formulario fue `f8d3b9d`; los resultados siguientes
corresponden al conjunto con recursos y blog.

## Recorrido implementado

Home → «Quiero más información» → `/contacto/#consulta`. Nombre y email son
obligatorios; empresa y mensaje, opcionales. El recorrido tiene traducciones ES,
EN y PT-BR, estados de espera, error y recepción, protección Turnstile y
honeypot. Un error conserva lo escrito; el cliente no reenvía automáticamente ni
confirma recepción ante una respuesta ambigua. No incluye autorespuesta por
email, SMTP ni credenciales de Gmail.

[ADR-0011](../../decisions/0011-contact-form.md) y
[operación/configuración](../../operations/contact-form.md).

## Validación local

| Comprobación                                                             | Resultado                                                                                                          |
| ------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------ |
| Referencia R05                                                           | 51 assets, 5 CSS y 13 HTML ES base conservados; 126 variantes localizadas verifican exactamente los slots añadidos |
| Tipos                                                                    | 104 archivos, cero errores, warnings o hints                                                                       |
| Navegador completo                                                       | 48/48 pruebas, incluidos los 12 casos de contacto                                                                  |
| Contacto con servicios externos interceptados también durante navegación | 12/12; capturas finales de esta ejecución                                                                          |
| Integridad y publicación                                                 | 44/44, incluido rechazo de junction en Windows y la excepción CSP acotada de Turnstile                             |
| Formato                                                                  | Comprobación completa con Prettier                                                                                 |

Entorno: Windows 11 ARM64, Bun 1.4.0 nativo, Playwright 1.63.0 y el ejecutable de
Edge instalado. Los servidores de prueba escucharon sólo en `127.0.0.1`.
La suite completa verifica el candidato apilado con recursos y blog, incluido el
formulario. Los casos de contacto interceptan los servicios externos también
durante navegación para estabilizar las capturas y evitar solicitudes con
configuración productiva.

El test de nombre compuesto sólo por espacios primero falló sobre build/preview;
después de normalizar el valor antes de `reportValidity()`, pasó y comprobó cero
solicitudes al receptor. Las pruebas también cubren 402/403/500, fallo de red,
token ausente/expirado, protección contra doble envío y accesibilidad bajo la CSP
que recibe producción.

La comprobación de formato excluye el alias `CLAUDE.md`: Git lo registra como
symlink de `AGENTS.md`, pero Windows con `core.symlinks=false` lo materializa como
un stub sin salto final. La fuente `AGENTS.md` sigue incluida en Prettier. La
prueba de enlaces usa junction en Windows para ejercer el mismo rechazo sin
privilegios de administrador; conserva symlink de archivo en POSIX.

## Revisión independiente y capturas

Crítico independiente en sólo lectura: `gmail_smtp_research`. Revisó el diff y
las 11 capturas actuales; no editó la implementación ni resolvió su propia
observación. Ronda inicial: 9/10 en usabilidad y estilo, 9,2/10 en fidelidad. Un
P2 sobre nombres de espacios quedó corregido y probado; se aclaró además la
respuesta por email sin reunión en los tres idiomas. Se descartaron capturas
intermedias con estados transitorios del servicio remoto y se generó el set
final con servicios externos sustituidos.

Veredicto final: **aprobado localmente**, cero bloqueantes; usabilidad **9,2/10**,
estilo **9/10** y fidelidad KAIRUM **9,2/10**.

La ronda posterior al rebase sobre #4 revisó otra vez el diff y las 11 capturas
integradas, con los mismos puntajes y cero bloqueantes. La composición conserva
`baselinePageContent` sin slots y aplica renderer, localización y extensión
editorial una vez. La verificación mantiene la reversión editorial de la base y
comprueba los slots de contacto sobre las 21 rutas.

| Vista                         | ES                                   | EN                                   | PT-BR                                      |
| ----------------------------- | ------------------------------------ | ------------------------------------ | ------------------------------------------ |
| Cierre de Home                | [ES](runtime/es-home-contact.png)    | [EN](runtime/en-home-contact.png)    | [PT-BR](runtime/pt-br-home-contact.png)    |
| Contacto, viewport de 1440 px | [ES](runtime/es-contact-desktop.png) | [EN](runtime/en-contact-desktop.png) | [PT-BR](runtime/pt-br-contact-desktop.png) |
| Contacto, viewport de 320 px  | [ES](runtime/es-contact-320.png)     | [EN](runtime/en-contact-320.png)     | [PT-BR](runtime/pt-br-contact-320.png)     |

También se conserva el formulario con configuración sintética en
[escritorio](runtime/configured-contact-desktop.png) y
[320 px](runtime/configured-contact-320.png). Son capturas del HTML, CSS y scripts
reales con Turnstile y Formspark simulados. El espacio reservado al widget
compacto no representa un desafío real renderizado ni una consulta recibida.

## Configuración externa y pendientes

- Formspark creado por el usuario; al inspeccionar su dashboard se observaron
  notificaciones activas para dos destinatarios. No se registran sus direcciones.
- El usuario proporcionó el form ID y sitekey públicos y confirmó que guardó la
  Secret key directamente en Formspark y activó Turnstile. Esa configuración
  secreta no se leyó ni se guardó localmente.
- Se configuraron y releyeron las repository variables `FORMSPARK_FORM_ID` y
  `TURNSTILE_SITE_KEY` de `KairumAI/landing`. El archivo local con los mismos
  identificadores está ignorado. Ninguna de estas acciones dispara un deploy.
- El usuario autorizó subir una PR draft apilada sobre #4. Quedan pendientes el
  merge por el circuito del repositorio, la versión publicada y el smoke real
  del runbook: hostnames/allowed domains, desafío, una consulta sintética,
  Inbox de Formspark y llegada a Gmail.

No se hizo merge, despliegue, compra ni envío real. Los tests no acreditan
recepción en Formspark o Gmail, ni disponibilidad del backend de geo-product.
