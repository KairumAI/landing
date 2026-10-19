# Ajustes de la landing a partir de comentarios · 2026-10-17

Candidato en `feat/landing-visual-feedback`, sobre main
`be9383149d79f6ae9991ea75af02f747875a4b30` (merge de PR #4). Su árbol base es
idéntico al `96134894a2b37f6a939c767ada123bf73e8b8207` de la primera ronda.
Los comentarios iniciales pedían correcciones y propuestas; después el usuario
aprobó implementar ambos rediseños y abrir una PR.

| Comentarios  | Alcance autorizado                                                                                                   |
| ------------ | -------------------------------------------------------------------------------------------------------------------- |
| 1, 5, 15     | Corregir los saltos al entrar y salir del hover en respuesta, archivo y Agents.                                      |
| 2            | Retirar visualmente la anotación redundante «Pregunta → respuesta → fuente».                                         |
| 3, 6, 16, 18 | Desvanecer muy suavemente el borde de las ilustraciones claras, conservando el centro opaco.                         |
| 7, 11        | Repetir el formulario en los cierres existentes del catálogo y los seis productos, conservando su fondo y la agenda. |
| 8, 19        | Usar la presentación horizontal oficial de Turnstile, sin escalar ni recortar el iframe.                             |
| 9            | Integrar el selector de idioma en el extremo derecho del footer, con reflow móvil.                                   |
| 10           | Evitar las entradas repetidas al navegar por hipervínculos entre páginas.                                            |
| 4, 12, 13    | Rediseño aprobado después: comparación breve en Home, tres tabs reales en producto y retirada del pedestal.          |
| 14           | Conservar el hero y las pestañas funcionales de AI Report.                                                           |
| 17           | Diferenciación aprobada después: respuesta anotada, entregable/proceso y apertura editorial, respectivamente.        |

## Tratamiento visual

Las ilustraciones claras usan dos máscaras intersectadas: únicamente los últimos
4–12 px de cada borde pierden opacidad, hasta transparencia total en el límite.
No se oscurecen ni regeneran imágenes. Logos, iconos, escenas oscuras y el
pedestal de Analytics quedan fuera de esa máscara. La regla vive en una hoja
aditiva: los 51 assets y las cinco hojas de R05 conservan sus bytes.

En una corrección posterior solicitada por el usuario, la imagen oscura
`home-reports.webp` de «Cómo funciona» queda explícitamente excluida del
desvanecido. No se modifica el archivo ni el tratamiento de las imágenes claras.

La anotación de la escena de respuesta ya era decorativa y `aria-hidden`.
Se oculta sin alterar el contenido semántico ni los fingerprints de R05.

El formulario conserva los cuatro campos, placeholders traducidos, estados de
error, protección frente a envíos duplicados y el contrato Formspark/Turnstile.
El cierre amarillo integra los campos directamente sobre su fondo, y Home
mantiene el cierre oscuro. Hay un solo formulario en cada página.

## Rediseños aprobados e implementados

Analytics ofrece una pregunta, dos lecturas y qué cambió. En producto,
Comparación, Alternativas y Fuentes cambian el contenido dentro del panel,
reutilizando los tabs y su contrato de teclado. Se retira el pedestal decorativo.
Los ejemplos están rotulados como ilustrativos; Analytics permanece planificado,
sin métricas ni resultados medidos. Sin scripts las tres vistas quedan legibles
y los tabs son enlaces nativos al contenido.

Marcas abre con una respuesta anotada y conecta preguntas, evidencia y
prioridades; los enlaces muestran el estado real del catálogo. Agencias muestra
un entregable ilustrativo, cuatro pasos y responsabilidades separadas. Nosotros
usa propósito y método, sin escena de producto ni grilla comercial. El usuario
decidió dejar nombres y roles del equipo para después de hablar con sus compañeros.
Las tres páginas reutilizan el cierre amarillo con agenda y formulario.

Los [conceptos y sus límites](concepts/README.md) y el
[plan](../../superpowers/plans/2026-10-17-visual-feedback.md) registran la dirección.
No se cambia la estructura del hero ni los tabs de AI Report.

## Primera ronda: validación de interacción y formularios

| Comprobación              | Resultado                                                                                                                    |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| E2E sobre build y preview | 85/85; incluye 24 recorridos de los ocho cierres en ES/EN/PT-BR, tres recorridos de idioma y cinco regresiones de movimiento |
| Entrega                   | 44/44                                                                                                                        |
| Tipos                     | 106 archivos; cero errores, warnings o hints                                                                                 |
| Referencia                | 51 assets, cinco CSS y 13 HTML originales; 126 variantes de extensión verificadas                                            |
| Formato                   | Prettier completo y diff sin errores de whitespace                                                                           |
| Build                     | Compilación y verificación del paquete público ejecutadas por el servidor de la suite integrada                              |

Entorno: Windows 11 ARM64, Bun 1.4.0 y Edge instalado. La suite utilizó
`127.0.0.1:4337`, tres workers y `test-results/feedback-integrated`; entrega usó
un directorio separado, `test-results/feedback-delivery`. El candidato de
desarrollo queda disponible en `127.0.0.1:4334`. No se abrió ninguna interfaz a
la red local.

### Movimiento: reproducción y resultado

El hover mezclaba la transformación que anima GSAP con la postura CSS y el
desplazamiento ambiental. Al terminar el retorno, `clearProps` restauraba de
golpe los ángulos originales. Ahora GSAP interpola un estado de inclinación
numérico compuesto sobre la postura original, dejando el desplazamiento CSS
independiente. Un retorno creado después de ocultar el documento también hereda
la pausa.

En la navegación fría, el HTML podía pintarse antes del módulo; después, el
reveal lo ocultaba otra vez. Se conservan visibles los elementos ya presentes
en el viewport al iniciar y se preparan únicamente los reveals fuera de vista.
No se atribuye el problema a importaciones o inicializaciones duplicadas.

Máximo desplazamiento de un frame, medido después de los primeros 500 ms del
retorno de 700 ms en 1440 × 1000:

| Escena    | Antes      | Candidato integrado |
| --------- | ---------- | ------------------- |
| Respuesta | 10,1773 px | 0,0503 px           |
| Archivo   | 5,2485 px  | 0,0643 px           |
| Agents    | 7,4655 px  | 0,0840 px           |

La navegación por un hipervínculo con una demora de módulo controlada de 250 ms
pasó de 23 muestras ocultas posteriores al primer pintado opaco a cero. El
quinto caso verifica pausa, movimiento reducido y límites de restauración con
eventos controlados; no acredita la elegibilidad real de BFCache en otros
navegadores. Se conservan [baseline](motion/baseline.json),
[resumen](motion/summary.json) y los cuatro archivos de frames en `motion/`.

### Capturas y servicios

`runtime/` conserva 30 capturas del build en ES/EN/PT-BR, a 1440 y 320 px:
Home, catálogo, cierre de AI Report, Contacto y footer. Los otros cierres
comparten el mismo renderer y están cubiertos por los recorridos funcionales.
Las capturas de tests rotulan el iframe como «Turnstile — offline fixture»;
Formspark y Turnstile están simulados y no se realiza ningún envío remoto.

También se conservan seis capturas actuales del navegador con servicios reales:
Contacto horizontal, cierre amarillo listo, footer y desvanecido de Prompt,
Recursos y Traffic. En Contacto y AI Report el widget terminó la verificación y
habilitó el botón, con estado de formulario vacío; no se rellenó ni se envió.
Esto no acredita recepción por Formspark o Gmail.

Turnstile utiliza su [tamaño normal oficial de 300 × 65 px](https://developers.cloudflare.com/turnstile/get-started/client-side-rendering/widget-configurations/).
La revisión del navegador se hizo por la conexión CUA disponible: el bootstrap
del plugin Browser falló con `browser-client is not trusted`. Las regresiones y
capturas de la suite se verificaron con Edge/Playwright. Las capturas móviles
de Contacto recortan el contenedor de 288 px; ese caso comprueba el ancho total
del documento a 320 px. Los casos de los ocho cierres comprueban además los
límites izquierdo y derecho del iframe de 300 px dentro de ese viewport.

### Revisión independiente

Crítico en sólo lectura: `gmail_smtp_research`, sin autoría de los cambios.
Revisó las 30 capturas automatizadas representativas, Contacto real listo,
Prompt con máscara, diff y métricas finales. Dictamen: **aprobado localmente,
cero bloqueantes**; usabilidad **9,3/10**, estilo **9,2/10** y fidelidad
**9,3/10**. La ronda inicial de escritorio señaló que las capturas de Cloudflare
estaban aún en preparación; se añadió la captura estable con envío habilitado.
También se precisó el alcance distinto de las aserciones móviles de Contacto y
los cierres, sin atribuir al primero pruebas que no ejecuta.

Esta primera ronda no incluyó publicación ni envío real de un formulario.

[candidate.json](candidate.json) identifica fuentes, capturas y métricas por
SHA-256 para vincular la evidencia al candidato revisado.

## Segunda ronda: Analytics y páginas por audiencia

El usuario aprobó aplicar la propuesta y abrir una PR contra main. El equipo
personal de Nosotros queda pospuesto por su decisión, sin datos inventados.
Se mantienen el hero y tabs de AI Report, todos los metadatos y las rutas.

### Comparación visual

Se inspeccionaron los cuatro conceptos con `view_image` y las capturas actuales
del build. La referencia de paleta y componentes sigue siendo el sistema del
repositorio: fondo cálido/canvas, amarillo `#ffc400`, carbón e Inter. Los
conceptos no autorizan reemplazar la navegación ni inventar claims.

| Punto        | Concepto y resultado verificado                                                                                                                                                       |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Analytics    | Panel claro, pregunta, dos lecturas y franja de cambio; sin sidebar, gráficas ni pedestal. Home conserva su sección y acceso al producto.                                             |
| Interacción  | Tres tabs reales con selección local, teclado y foco; enlaces nativos y contenido completo sin scripts. Repetir la selección activa no reinicia la entrada al resolver fuente/load.   |
| Densidad     | Alternativas aprovecha dos columnas de definición en escritorio: la captura ES baja de 825 a 670 px. En móvil conserva una columna, sin imponer altura vacía al resto de los paneles. |
| Marcas       | Respuesta resaltada, fuente y anotación en flujo; tres decisiones y enlaces simples con estado canónico del producto.                                                                 |
| Agencias     | Documento HTML legible, inclinación sólo en escritorio; cuatro pasos oscuros y dos responsables. La guía conserva un destino real.                                                    |
| Nosotros     | Manifiesto, convicción de menor escala, propósito y método en filas. Sin escena de producto ni grilla comercial.                                                                      |
| Copy         | H1 e introducciones existentes en ES/EN/PT-BR; nueva copia tipada sólo en i18n. Se descartan textos/citas inventados por Image Gen.                                                   |
| Iconos y CTA | Phosphor local, header/footer existentes y formulario compartido en cierre amarillo. No se agregan dependencias ni servicios.                                                         |
| Reflow       | 320, 390, 768 y 1440 px en Analytics; 320 y 1440 en las tres audiencias y equivalentes. Se conservan cuatro capturas adicionales a 2244 × 1290, el tamaño de la revisión del usuario. |

`runtime/analytics/` conserva 24 capturas (Home y tres estados por idioma en
1440/320); `runtime/audiences/`, 18 páginas completas (tres páginas por idioma
en 1440/320); `runtime/wide/`, cuatro aperturas a 2244 × 1290. Se agregan seis
capturas ES de los nuevos cierres con fixture horizontal listo. Los screenshots
completos de audiencias abortan el servicio externo y muestran el estado de
preparación; los cierres dedicados verifican su estado listo mediante un fixture,
sin enviar consultas reales.

La recaptura móvil amplía sólo la altura del viewport para mostrar el panel
completo bajo la subnav fija; mantiene el ancho de 320 px. No oculta ni altera
elementos de la página para producir las imágenes.

La conexión CUA dejó de responder al retomar la página local (timeouts de CDP).
Se continuó con Edge/Playwright, después de haber intentado Browser e IAB.
Un intento de tests contra dev encontró `504 Outdated Optimize Dep` al compartir
la caché con `astro check`; se detuvo dev y se repitió contra build/preview
aislado. Ese intento no se contabiliza como validación aprobada.

### Revisión final y regresión de carga lenta

El crítico independiente `gmail_smtp_research` revisó las 18 capturas de
audiencias, las 24 finales de Analytics, cuatro aperturas anchas y tres cierres
listos. Dictamen final: **cero bloqueantes; usabilidad 9,3/10, estilo 9,2/10 y
fidelidad KAIRUM 9,3/10**. La segunda ronda corrigió la densidad de Alternativas
y el encuadre de la captura móvil; no quedan hallazgos visuales accionables.

La revisión de código independiente comprobó 63 variantes de rutas, sin doble
localización y con un único formulario en cada una de las 12 rutas de contacto
por idioma. Las 13 restauraciones R05 coinciden con el hash original.

También reprodujo un caso P2: entrar directo a Fuentes, elegir Comparación
antes de cargar Inter y terminar de resolver fuente/load devolvía el panel a
Fuentes. La selección activa ya era idempotente; ahora `pointerdown`, al igual
que teclado y scroll, cancela la restauración inicial pendiente. La prueba
retiene y libera la fuente real y verifica que se conserve la decisión manual.

Durante esa reproducción, una ejecución paralela sin output aislado limpió
trazas de la suite en curso y provocó tres fallos ENOENT de infraestructura;
esa corrida (109/112) se descarta y se repite en serie, con fuentes congeladas
y directorios de salida separados. No se oculta ni se cuenta como aprobada.

### Resultado final

| Comprobación          | Resultado del candidato final                                                                                                                                          |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| E2E completo          | **113/113**, build y preview aislado en 4337, tres workers, `test-results/feedback-release-final`; incluye la nueva regresión de selección manual con fuente demorada. |
| Entrega               | **46/46**, `test-results/feedback-delivery-release`.                                                                                                                   |
| Tipos                 | **112 archivos**, cero errores, warnings o hints.                                                                                                                      |
| Referencia            | **51 assets, cinco CSS y 13 páginas**, con **126 variantes** de contacto verificadas. Fingerprints originales sin cambios.                                             |
| Formato y diff        | Prettier completo y whitespace verificados.                                                                                                                            |
| Paquete público       | Validado antes y después del build por el script de la suite. Informes preservados.                                                                                    |
| Crítica independiente | **9,3 / 9,2 / 9,3**, cero bloqueantes.                                                                                                                                 |

El manifest identifica las fuentes verificadas, 89 capturas de runtime, cuatro
conceptos y seis registros de movimiento por SHA-256. La PR contiene este
candidato; su CI y su SHA remoto se verifican por separado. No se realizó merge,
publicación del sitio ni envío real a Formspark/Gmail en esta entrega.
