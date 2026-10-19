# Design QA — Analytics con referencia Profound

final result: passed

## Versión y dirección

Base `13b2ff7`, rama `feat/analytics-visual-story`. Fuente pública capturada:
https://www.tryprofound.com/features/answer-engine-insights.
La corrección explícita de Bruno pide la misma organización comercial, con
identidad clara KAIRUM. Home tiene una sola muestra; producto concentra el detalle.

Se compararon en el mismo pase las capturas de la referencia y del runtime:
hero a la izquierda, descripción y CTA, selectores por beneficio, demo central,
seis capacidades, metodología y continuidad de contacto. KAIRUM conserva Inter,
Phosphor, marfil/blanco/gris y amarillo. No se incorporan assets de Profound al sitio.

## Dictamen independiente

Agente `landing_editorial_critic`, sólo lectura:

| Criterio                                       | Nota   |
| ---------------------------------------------- | ------ |
| Usabilidad                                     | 9,2/10 |
| Estilo                                         | 9,4/10 |
| Fidelidad a KAIRUM y al objetivo de referencia | 9,3/10 |

Cero bloqueantes y cero P0/P1/P2. Hash independiente del conjunto de 13 archivos
revisados: `332441794f488e9a441278ec9b5cd76b6ce10fc78666abf4ae03e4e4fda5733f`.
La revisión cubre código, copy y capturas de runtime; no acredita proveedores,
resultados comerciales ni mediciones reales.

## Evidencia

Carpeta `docs/evidence/2026-10-18-analytics-editorial/`:

- Referencia `profound-desktop-*` y `profound-mobile-*`.
- `kairum-desktop-{top,presence,sentiment,citations,benefits,workflow}.jpg`.
- Tablet/móvil en 768, 390 y 320 px. Presencia768 se capturó después de confirmar
  `data-chart-ready=true`; no se usa como prueba de curva un estado de carga.
- `final-320-{presence,sentiment,citations}-{upper,lower}.jpg` son capturas
  directas de las tres vistas, completadas con desplazamiento nativo. El ID
  seleccionado se registró en `mobile-panel-checks.json`.
- `final-home-{1440,320}.jpg` muestra una sola escena de Analytics.

Las capturas intermedias en blanco, con menú abierto, estado incorrecto o recorte
corrido fueron descartadas. Los JPEG conservan sus píxeles originales. Las partes
superior e inferior son vistas separadas del recorrido y no una composición única.

## Pruebas y límites

36/36 pruebas de Analytics y landing. Después de la última unificación de copy,
10/10 pruebas repetidas de Analytics: cuatro anchos en ES/EN/PT-BR, selección real
de pestañas, filtros, tablas, fuentes anidadas, enlaces, teclado, axe, fragmentos y
camino sin JavaScript. Se corrigió la regla de contraste de la etiqueta de ventana;
la regla decorativa ahora sólo afecta a los puntos sin texto.

P3 opcional: una pista de desplazamiento horizontal en «Presencia por tema» a
320 px haría más evidente la cuarta columna. El contenedor conserva todos los
datos y admite scroll; no hay desborde global. No condiciona esta entrega.
