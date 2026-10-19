# Identidad por producto · 19 de octubre de 2026

Implementación de la [revisión de marca aprobada](../2026-10-19-brand-audit/README.md),
desde el `main` publicado `9ef3810`. El [diseño](../../design/product-identity.md)
documenta composición, tokens y contratos. El [manifiesto](manifest.json) vincula
los hashes del código evaluado y las 56 capturas nativas de la ronda final `r4`.

## Resultado visible

Analytics usa verde, Agents violeta, Prompt Intelligence azul y Traffic verde
azulado en identificadores, gráficos y controles. La marca y sus acciones
comerciales conservan el amarillo. El sentimiento mantiene su significado y la
propuesta de Agents sigue pendiente de revisión.

Analytics y Agents muestran antes sus demostraciones. Prompt relaciona tres
intenciones con una pregunta y un criterio de investigación, con teclado y
enlaces directos. Traffic mantiene a la vista visitas humanas y solicitudes de
crawlers, sus pasos y sus fuentes. Home conserva una sola muestra de cada
producto. El catálogo ajusta su altura al contenido; Equipo conserva los archivos
originales con tratamiento monocromo y su encuadre específico.

| Vista               | Escritorio                                                                                       | Móvil                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Analytics           | [Apertura](runtime/analytics-opening-1440.png) · [demostración](runtime/analytics-demo-1440.png) | [Apertura](runtime/analytics-opening-390.png) · [demostración](runtime/analytics-demo-320.png) |
| Agents              | [Apertura](runtime/agents-opening-1440.png) · [demostración](runtime/agents-demo-1440.png)       | [Apertura](runtime/agents-opening-390.png) · [demostración](runtime/agents-demo-320.png)       |
| Prompt Intelligence | [Demostración](runtime/prompt-intelligence-demo-1440.png)                                        | [Demostración](runtime/prompt-intelligence-demo-390.png)                                       |
| Traffic             | [Demostración](runtime/traffic-demo-1440.png)                                                    | [Demostración](runtime/traffic-demo-320.png)                                                   |
| Home                | [Analytics](runtime/home-analytics-1440.png) · [Agents](runtime/home-agents-1440.png)            | [Prompt](runtime/home-prompt-intelligence-390.png) · [Traffic](runtime/home-traffic-320.png)   |
| Catálogo            | [1440 px](runtime/catalog-1440.png)                                                              | [320 px](runtime/catalog-320.png)                                                              |
| Equipo              | [1440 px](runtime/es-team-1440.png)                                                              | [320 px](runtime/es-team-320.png)                                                              |

Las capturas proceden de Chromium ejecutando las pruebas del repositorio. Se
capturan las aperturas desde scroll cero y los componentes con el recorte nativo
de una captura de página completa, sin ocultar ni editar elementos. Esto evita
que la navegación fija de otra posición de scroll se superponga al componente.
No se modifican los píxeles después de la captura.

## Rondas y verificaciones

La regresión de selección de intención reprodujo primero la ausencia de tabs.
La primera ronda completa de productos/equipo aprobó 34/35 casos y detectó que
el selector del encabezado Analytics de Home no coincidía con su estructura;
se corrigieron el selector de la prueba y el acento real omitido. Después
aprobaron 14/14 pruebas focalizadas.

La ronda `r3` recibió una revisión independiente de código y de las 52 capturas
de productos/Home/catálogo y cuatro de Equipo. No encontró otro bloqueante. El
coordinador detectó un SVG inexistente, CaretDown, también referenciado por la
versión previa de Agents. Una regresión HTTP reprodujo el 404. Se reemplazó por
CaretRight existente, rotado al abrir, sin agregar assets.

La ejecución completa iniciada antes de ese arreglo fue detenida de forma
voluntaria: 19 aprobadas, dos interrumpidas y 141 sin ejecutar. No se registra
como una suite aprobada. La ronda final `r4` aprueba **15/15** pruebas focalizadas,
incluida la existencia HTTP y el tipo SVG de los iconos de Home y los productos.

El agente independiente `release_code_review`, en sólo lectura, aprobó la ronda
final `r4`: **9,3/10 en usabilidad, 9,2/10 en estilo y 9,4/10 en fidelidad**, cero
bloqueantes y ningún P1/P2. Verificó el arreglo del caret, su prueba HTTP/MIME y
32 capturas finales relevantes, incluidos los cuatro anchos en Home Agents y
Traffic, catálogo y Equipo. Estos puntajes corresponden al delta de identidad
de producto, no a una certificación de todo el sitio. El agente no ejecutó las
suites; sus resultados se registran por separado.

La referencia R05 conserva 51 assets y cinco CSS; Astro revisa 130 archivos sin
diagnósticos y las pruebas de entrega aprueban **46/46**. La ejecución completa de
navegador aprobó **162/163**: el único fallo buscaba los selectores retirados del
plan de Prompt y la nota anterior de Traffic en Home sin JavaScript. Se actualizó
esa regresión para exigir las tres preguntas visibles con sus títulos, ambos
recorridos abiertos, seis pasos y la nota metodológica actual, preservando el
resto de sus comprobaciones. El caso corregido aprueba después **1/1**; el crítico
independiente revisó el delta y confirmó que no debilita la cobertura. No hubo
cambios de interfaz después de las capturas `r4`.

Formato y `git diff --check` aprobados. El resultado integral del SHA final debe
consultarse en el check `verify` del PR y en el workflow `Deploy` de `main`, que
repiten las 163 pruebas y la entrega antes de publicar. No se presenta la primera
ejecución local como 163/163.

## Alcance y límites

Las pruebas nuevas cubren ES/EN/PT-BR, selección de intención, teclado, enlaces
directos, desplegables nativos, ausencia de JavaScript, reducción de movimiento
durante una entrada, cuatro anchos y axe sobre las dos escenas nuevas. No
constituyen una certificación WCAG ni prueban todas las combinaciones de estado,
idioma y dispositivo.

Los textos comerciales usan leyendas funcionales y genéricos. No se agregan
clientes, métricas, proveedores ni conexiones operativas. Los estudios conservan
fuentes, fecha y metodología. No se envían consultas de contacto ni se comprueba
recepción de correo. Esta evidencia local no acredita por sí sola una publicación
HTTPS: ésta requiere el deployment exitoso y la verificación del artifact servido.
