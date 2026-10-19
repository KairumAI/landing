# Equipo en Nosotros — 2026-10-18

El pedido autorizado incorpora a Nosotros las tres personas de la izquierda de
la diapositiva 11 del pitch provisto, en el mismo orden y con sus nombres y
credenciales completos. La cuarta persona de la fuente, Santiago Barron, queda
excluida de la landing.

## Fuente y retratos

Fuente: `Parcial pitch - De Cruz - Barron - Cadeiras.pptx`, diapositiva 11,
«El equipo de KAIRUM». SHA-256 del PPTX intacto:
`350f10cba0cc35b08f7f1e89ccfe3824ed41d8a65acd5d0af34642055fa26689`.

| Orden | Persona          | Experiencia profesional externa | Entrada original del PPTX | Archivo público                           |
| ----- | ---------------- | ------------------------------- | ------------------------- | ----------------------------------------- |
| 1     | Bruno De Cruz    | Data Scientist · Mercado Libre  | `ppt/media/image5.png`    | `public/kairum/team/bruno-de-cruz.png`    |
| 2     | Joaquín Cadeiras | Founder · Alveo                 | `ppt/media/image6.png`    | `public/kairum/team/joaquin-cadeiras.png` |
| 3     | Joaquín Alderete | Lead Engineer · ViewX           | `ppt/media/image7.png`    | `public/kairum/team/joaquin-alderete.png` |

Los tres archivos públicos coinciden en tamaño y SHA-256 con sus entradas
originales del ZIP; los hashes completos están en [source.json](source.json).
El encuadre se realiza con CSS, conservando los bytes y los rostros de las fotos.
No se incorpora el PPTX completo, notas privadas ni el retrato de la cuarta persona
a los archivos públicos.

La lámina activa está rasterizada y sólo referencia
`ppt/media/raster-v25-slide-11-1.png` mediante `rIdRasterV251`, sin recortes
`srcRect`. Los retratos separados permanecen en el paquete sin relaciones activas.

## Implementación local

La sección `.audience-team`, identificada por `data-audience-team`, se ubica
debajo del hero de Nosotros y antes de `.audience-why`. Muestra tres retratos,
nombres y experiencia profesional externa, sin nuevos enlaces ni biografías.
Las credenciales no se convierten en cargos internos, avales, clientes o alianzas
de KAIRUM.

| Idioma | Rótulo        | Título               | Etiqueta de credenciales |
| ------ | ------------- | -------------------- | ------------------------ |
| ES     | Quiénes somos | El equipo de KAIRUM. | Experiencia              |
| EN     | Who we are    | The KAIRUM team.     | Experience               |
| PT-BR  | Quem somos    | A equipe KAIRUM.     | Experiência              |

Los nombres, los cargos externos y las organizaciones conservan el texto de la
fuente en los tres idiomas.

## Validación y autorización

Verificado: inspección de XML/relaciones, lectura visual de la diapositiva y los
originales, integridad del PPTX, tamaño y hashes de los tres archivos públicos,
ubicación de la sección y copy localizado en fuente.

El equipo pasó la revisión independiente de las doce capturas del build:
ES/EN/PT-BR a 1440, 768, 390 y 320 px, sin la toolbar de desarrollo.
Usabilidad **9,3/10**, estilo **9,2/10**, fidelidad **9,4/10**, cero bloqueantes.
Las capturas están en [screenshots/](screenshots/). La primera captura móvil
de dev se descartó como evidencia final porque la toolbar cruzaba las fotos;
se volvió a capturar desde preview, sin modificar el producto para ocultarla.

## Tarjeta Fuente de Home

La entrada imponía `rotationY: 0` y al limpiar estilos recuperaba de golpe la
perspectiva CSS de Fuente. Después, la flotación con delay negativo arrancaba
desde una fase adelantada. El hover sólo seleccionaba el primer objeto de la
escena y dejaba Fuente afuera.

La entrada termina ahora en la perspectiva de cada tarjeta; el drift de Fuente
comienza desde reposo y el puntero conserva/restaura las bases de ambos objetos.
Se mantienen las pausas, reduced motion y la composición. Las cinco hojas
originales de R05 quedan intactas; el delay se ajusta en la hoja aditiva.

| Vista   | Salto de entrada antes / después | Salto de flotación antes / después |
| ------- | -------------------------------- | ---------------------------------- |
| 1440 px | 4,565 / 0,013 px                 | 5,499 / 0,019 px                   |
| 390 px  | 0,013 / 0,015 px                 | 5,431 / 0,016 px                   |

El retorno tardío del puntero tuvo un máximo de 0,069 px entre fotogramas.
[Resumen y cuadros numéricos](motion/summary.json) y capturas en [motion/](motion/).
La revisión independiente recalculó los valores desde los frames y aprobó
usabilidad **9,3**, estilo **9,2**, fidelidad **9,3**, cero bloqueantes.

## Formulario: retiro de la espera de scroll

El usuario rechazó la espera por scroll/idle evaluada en la ronda anterior.
Se retiraron el scheduler, los listeners y sus tres pruebas específicas.
La inserción async del script y el render en onload vuelven al flujo anterior.
Se conserva sólo la corrección de altura del estado, incluida la recuperación
de errores multilínea; el diff del script respecto del HEAD base es de tres líneas.

La corrida integrada anterior al retiro pasó 140/140 E2E y 46/46 controles de
entrega. La corrida del candidato final posterior al retiro se registra abajo.
Las pruebas simulan los servicios externos y no acreditan una recepción real
en Formspark/Gmail ni latencia del verificador de Cloudflare.

| Comprobación final               | Resultado                                                                                 |
| -------------------------------- | ----------------------------------------------------------------------------------------- |
| E2E tras retirar la espera       | **137/137**, `test-results/landing-final-without-scroll-wait`, tres workers, preview 4337 |
| Entrega final                    | **46/46**, `test-results/landing-final-without-scroll-wait-delivery`                      |
| Tipos                            | **119 archivos**, cero errores, warnings o hints                                          |
| Build                            | 66 páginas, 26 informes y sus 2.959 archivos preservados                                  |
| Referencia                       | 51 assets, cinco CSS y 13 HTML originales; 126 variantes de contacto                      |
| Revisión de código independiente | Sin regresiones concretas ni bloqueantes                                                  |

Se intentó conectar el plugin Browser y devolvió `privileged native pipe bridge
is not available; browser-client is not trusted`. Se verificó la UI en IAB mediante
CUA, incluido el cambio real de idioma ES → EN, y se usó el Playwright del repo
con Edge para las pruebas y capturas responsive. No hubo error overlay ni fallas
de scripts en la suite. Las capturas de equipo/movimiento corresponden al mismo
código visual aprobado antes de retirar la espera; la corrida final revalida
ese código y el contrato del formulario tras el retiro.

El [manifest final](candidate.json) vincula el candidato por SHA-256 de fuentes
y evidencia; la revisión Git queda identificada por el commit que contiene
este registro. Las rondas previas conservan sus hashes históricos.

El usuario autorizó commit y push de esta entrega; no autorizó merge. Este registro
no acredita merge ni publicación.
