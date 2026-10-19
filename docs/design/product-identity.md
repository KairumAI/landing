# Identidad de producto · 19 de octubre de 2026

Bruno aprobó aplicar la paleta y las prioridades de la
[revisión de marca](../evidence/2026-10-19-brand-audit/README.md).
La implementación parte del `main` publicado `9ef3810` y conserva la apertura
de Home, el contenido editorial y el cierre comercial de KAIRUM.

## Color y tipografía

La base mantiene Inter, tinta `#181818`, papel `#FAFAF7` y el amarillo
`#FFC400` del logo y las acciones comerciales. Los acentos de módulo se
definen en `src/styles/product-identity.css`:

| Producto            | Acento    | Superficie de selección |
| ------------------- | --------- | ----------------------- |
| Analytics           | `#087F5B` | `#EDF6F1`               |
| Agents              | `#6F55C7` | `#F3EFFB`               |
| Prompt Intelligence | `#2D63C8` | `#EEF3FC`               |
| Traffic             | `#087F8C` | `#EDF6F7`               |

El color identifica el módulo en encabezados, iconos y controles. Las acciones
de agenda mantienen el amarillo. Brand Hub conserva su tratamiento oscuro y
sus textos claros: los nuevos tonos no se aplican a texto pequeño sobre esa
superficie ni sobre los CTA amarillos. Los estados de sentimiento y el estado
«Pendiente de revisión» conservan significados independientes.

La serie principal de Analytics toma el acento del CSS que también usa su
leyenda. Sus datos no cambian. La propuesta de Agents usa violeta, en lugar de
presentarse como un resultado aprobado con el color de éxito.

## Composición

Analytics y Agents reducen el espacio previo a sus demostraciones. Los
selectores de Analytics se compactan conservando sus explicaciones; en móvil
la explicación del selector activo queda a la vista. Sin JavaScript se muestran
todas las explicaciones y las tablas nativas.

Prompt Intelligence relaciona pregunta, intención y criterio para investigar.
Tres selecciones accesibles, Descubrir / Comparar / Elegir, cambian la lectura.
La lente original ocupa un lugar secundario en escritorio. Home y producto
comparten el componente con IDs propios y enlaces directos por intención.

Traffic muestra simultáneamente dos recorridos: una persona abre un enlace y
visita el sitio; un crawler solicita una página y deja un acceso en los logs.
Cada recorrido tiene nombre, iconos, forma de nodos y fuente. Sus desplegables
son nativos y funcionan también sin JavaScript. La representación no acredita
una conexión operativa a fuentes del cliente.

El catálogo usa alturas mínimas menores y permite crecer al contenido de cada
idioma. Los retratos del equipo comparten tamaño y tratamiento monocromo por
CSS; se conservan los archivos originales y el recorte específico de Alderete.

## Movimiento y lectura

Las escenas funcionales tienen una entrada finita de pasos, de hasta 1,1 s,
gestionada por el ciclo de visibilidad existente. El cambio de intención utiliza
el contrato de tabs y su transición breve. Los paneles funcionales permanecen
estables frente al puntero para facilitar su lectura.

La reducción de movimiento durante una entrada cancela la secuencia y limpia
opacidad y transformaciones de todos sus pasos. Las escenas anteriores conservan
su movimiento y sus pausas por visibilidad. No se incorporan dependencias,
contadores de actividad, métricas nuevas ni publicaciones automáticas.

## Contratos preservados

Los textos nuevos viven en `src/i18n/product-identity.ts` para ES/EN/PT-BR.
Las leyendas comerciales explican la tarea. Se mantienen los genéricos y las
fuentes y metodología de los estudios. Las sustituciones de Prompt y Traffic
se declaran en `editorial-integration.ts` y se revierten antes de comprobar
R05. Sus 51 assets y cinco hojas originales no se regeneran ni se modifican.

La aceptación combina navegación, enlaces directos, teclado, ausencia de JS,
reducción de movimiento y capturas a 1440, 768, 390 y 320 px. La crítica visual
independiente y los resultados de integración se registran en la
[evidencia de esta entrega](../evidence/2026-10-19-product-identity/README.md)
antes de publicar.
