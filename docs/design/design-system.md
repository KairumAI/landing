# Sistema KAIRUM en Astro

La referencia de esta entrega es la landing cinematográfica R05 aprobada por
Bruno, versión `477f1e2338d2`, del proyecto `KairumAI/geo-product`.
Su composición, copy en español, 51 assets nativos y cinco hojas de estilo se
preservan en la migración. Los enlaces a informes apuntan a la biblioteca
publicada. [ADR-0008](../decisions/0008-approved-cinematic-home.md) registra la
integración con la base Astro de Joaquín.

## Fuentes de verdad

| Parte                                        | Fuente                                                             |
| -------------------------------------------- | ------------------------------------------------------------------ |
| Tokens, Inter, color, espaciado y foco       | `src/styles/kairum-tokens.css`                                     |
| Composición y navegación compartida          | `src/components/kairum/marketing-html.ts`                          |
| Seis escenas de Home y aperturas de producto | `src/components/kairum/home-scenes.ts`                             |
| Catálogo, capacidades y preguntas            | `src/components/kairum/products.ts`                                |
| Copy ES/EN/PT-BR con la misma interfaz       | `src/i18n/marketing/`                                              |
| Páginas e idiomas equivalentes               | `src/lib/routes.ts`                                                |
| Documento y metadatos                        | `src/layouts/Base.astro`, `src/lib/metadata.ts`                    |
| Movimiento, menús y gráficos                 | `src/scripts/cinematic/`                                           |
| Referencia reproducible                      | `docs/evidence/2026-10-04-astro-unification/source-reference.json` |

## Composición y movimiento

Home presenta logos desde el inicio, rotor de modelos, respuesta y fuente sobre
un escenario oscuro; continúa con Prompt Intelligence, Analytics, Agents,
Traffic, Brand Hub, servicios, recursos y cierre. Las composiciones alternan
posición y ancho según su contenido. R05 originalmente usaba un dashboard de
Analytics con curvas y barras esquemáticas; la revisión aprobada del 17 de
octubre lo reemplaza por lecturas comparables y tabs reales (ver abajo).
Traffic separa visitas humanas
de solicitudes de crawlers; una solicitud no demuestra una cita ni una visita.
Brand Hub es el contexto compartido de los cuatro productos, no una quinta
herramienta independiente.

Prompt Intelligence y Traffic reutilizan sus escenas de Home. Agents conserva su
muestra en Home y amplía el recorrido en una presentación de producto específica
([dirección vigente](agents-editorial.md)); Analytics comparte el ejemplo de
lectura y amplía sus tres vistas en producto. El movimiento
ambiental continúa después de la entrada y se pausa fuera del viewport o cuando
la pestaña está oculta. `prefers-reduced-motion` desactiva entradas y movimiento
continuo. Sin JavaScript siguen visibles texto, imágenes y las vistas de Analytics,
enlaces y FAQ nativas. No añadir hilos decorativos ni controles de pausa que
Bruno retiró del diseño aprobado.

## Contrato para cambios

- Conservar IDs, ARIA y `data-*` usados por navegación y pruebas.
- Traducir cada copy en los tres diccionarios; las marcas y nombres propios se
  conservan. No usar fallbacks silenciosos de idioma.
- Mantener foco visible, menú con teclado/Escape/retorno, targets de 44 px y
  reflow a 320 px. Revisar textos largos en los tres idiomas.
- No convertir el dashboard esquemático en resultados medidos ni atribuir una
  respuesta API a una interfaz de ChatGPT. No afirmar backend operativo a partir
  de una página de marketing.
- Una modificación visual necesita capturas actuales y crítico independiente
  en sólo lectura, al menos 9/10 en usabilidad, estilo y fidelidad, cero
  bloqueantes, y actualización del feature register.
- `bun run check:reference` comprueba la referencia aprobada. Un cambio legítimo
  del diseño requiere nueva aprobación y evidencia; actualizar el fingerprint
  por sí solo no constituye aprobación.

## Extensión editorial · 2026-10-16

Bruno pidió incorporar Recursos y blog y desarrollar las páginas comerciales
de Analytics, AI Report y Agencias. La [especificación](../superpowers/specs/2026-10-16-resources-blog-design.md)
registra ese alcance. La composición utiliza Inter, los tokens KAIRUM, el
contraste negro/amarillo, superficies cálidas y la navegación compartida de R05.

Recursos abre con una pregunta editorial y una guía destacada, seguida por tres
lecturas prácticas y accesos al glosario, metodología e informes. Los artículos
usan título y resumen, autoría KAIRUM, revisión fechada y tiempo estimado de
lectura; el cuerpo limita el ancho de línea y acompaña el texto con un índice
lateral en escritorio. En móvil, el índice precede al contenido y las tablas
mantienen encabezados y caption accesible. Fuentes y lecturas relacionadas
cierran el recorrido antes del CTA de AI Report.

| Parte                               | Fuente                                              |
| ----------------------------------- | --------------------------------------------------- |
| Modelo, copy y política editorial   | `src/i18n/editorial/`                               |
| Composición HTML estática           | `src/components/kairum/editorial-html.ts`           |
| Estilos acotados al nuevo contenido | `src/styles/kairum-editorial.css`                   |
| Integración explícita sobre R05     | `src/lib/editorial-integration.ts`                  |
| Capturas y revisión independiente   | `docs/evidence/2026-10-16-resources-blog/README.md` |

Los cinco CSS y assets de R05 se conservan. El gate de referencia revierte
únicamente el renombre visible AI Report, los enlaces editoriales de menú,
footer y tarjetas existentes de Home y los tres bloques comerciales añadidos.
Después compara el HTML restaurado con los fingerprints originales inmutables.
Los tests de entrega verifican que una mutación de escena o de navegación
fuera de esos deltas siga fallando. Esta excepción no habilita cambios de
composición, animación, métricas ni rutas históricas.

Las nuevas páginas son legibles sin scripts; reutilizan el menú y el selector
de idioma existentes. La [evidencia actual](../evidence/2026-10-16-resources-blog/README.md)
identifica la versión evaluada, las rondas y el dictamen, sin extender los
puntajes de la entrega original al trabajo nuevo.

## Calidad editorial e ilustraciones · 2026-10-16

La revisión incorpora una serie propia de papel, tinta y amarillo, con una
portada distinta para la guía y cada artículo. El índice de Blog usa una apertura
más compacta en dos columnas en escritorio y un destacado con imagen; las
lecturas incluyen portada, tres aprendizajes, índice, caso desarrollado, figura
HTML y referencias junto al contenido pertinente. Se conserva el ritmo R05 de
Inter, tamaños grandes, espacio, fondo cálido y acentos amarillos.

`src/lib/editorial-media.ts` conecta los doce derivados locales con sus rutas.
Las miniaturas usan carga diferida y las portadas tienen dimensiones y `srcset`;
Open Graph, Twitter y Article/BlogPosting apuntan a la imagen de cada lectura.
No se suman scripts editoriales ni se rasterizan las etiquetas de los diagramas.
[Dirección y prompts](editorial-illustrations.md) y
[evidencia de la revisión](../evidence/2026-10-16-editorial-quality/README.md).

## Ajustes solicitados en revisión visual · 2026-10-17

El usuario pidió corregir el retorno del hover y las entradas repetidas al
navegar entre páginas, retirar la anotación decorativa de la respuesta y
desvanecer apenas los bordes de las ilustraciones de fondo claro. La máscara
aditiva ocupa sólo los 4–12 px exteriores; el centro conserva su opacidad y los
assets originales no se editan.

Los cierres existentes del catálogo y los seis productos reutilizan el mismo
formulario de Home, manteniendo títulos, agenda y fondo amarillo. Turnstile usa
su tamaño horizontal oficial, sin transformaciones ni recortes. El selector de
idioma pasa a la derecha de la fila inferior del footer, con reflow móvil.

Estos cambios quedan registrados en la
[evidencia de los comentarios](../evidence/2026-10-17-landing-feedback/README.md).
Las cinco hojas originales y los fingerprints de R05 permanecen intactos; el
gate permite las inserciones exactas del formulario en los siete cierres
adicionales. Después el usuario aprobó implementar la propuesta de Analytics y
la diferenciación de Marcas, Agencias y Nosotros, y abrir una PR.

Analytics reemplaza el dashboard y pedestal por una pregunta, dos lecturas y
un cambio explicado. Home ofrece la muestra breve; producto reutiliza el
contrato de tabs accesibles para comparación, alternativas y fuentes, con
contenido legible sin JS. Marcas abre con una respuesta anotada; Agencias,
con un entregable y el reparto de responsabilidades; Nosotros, con propósito
y método editorial. La información personal del equipo queda para después
por decisión del usuario. Las tres páginas comparten el cierre y formulario
amarillo existente, sin reemplazar la navegación ni el hero de AI Report.

Los [conceptos](../evidence/2026-10-17-landing-feedback/concepts/README.md)
registran la composición y sus desviaciones intencionales. Los reemplazos
exactos se declaran en editorial-integration y se revierten antes de comprobar
R05; no se regeneran fingerprints ni se modifican sus cinco hojas originales.

## Bordes y selección nativa · 2026-10-18

Las tarjetas de AI Report y Consulting ajustan la caja de imagen al bitmap
3:2 para que la máscara exterior existente actúe sobre sus bordes reales.
Los encabezados estrechos usan interlineado `calc(1.22em + 1px)`: el fondo de selección nativo
ya no invade los descendentes de la línea anterior, conservando exactamente
los colores originales. Los enlaces de Productos tienen padding interior
también durante hover y foco.

Las consultas de las escenas se rotulan como ejemplos dirigidos a una IA;
Analytics explica que alguien podría escribirlas en ChatGPT u otro asistente
y que las respuestas son ilustrativas. El contexto se localiza en ES/EN/PT-BR,
sin acreditar mediciones ni integraciones. Ver la
[evidencia de estos ajustes](../evidence/2026-10-18-landing-polish/README.md).

## Equipo y continuidad de la escena · 2026-10-18

El usuario aportó después la diapositiva 11 de su pitch para incorporar el
equipo a Nosotros. La sección usa sólo a las tres personas de la izquierda,
en su orden original: Bruno De Cruz, Joaquín Cadeiras y Joaquín Alderete.
Sus fotos se extraen intactas del archivo y se encuadran con CSS; los nombres,
roles y organizaciones conservan el contenido de la diapositiva. La etiqueta
«Experiencia» distingue esas credenciales de cargos internos en KAIRUM.
No se añaden biografías, perfiles, logos de empresas ni una cuarta persona.

La composición mantiene el hero editorial y coloca el equipo antes de propósito
y método: tres columnas en escritorio y una en móvil, con copy ES/EN/PT-BR.
La [evidencia de fuente y runtime](../evidence/2026-10-18-about-team/README.md)
registra los assets y la revisión independiente.

La tarjeta Fuente de Home entra hacia su perspectiva CSS y empieza la flotación
desde su pose de reposo. Ambas tarjetas de la escena responden al puntero y
regresan a sus respectivas perspectivas, manteniendo reduced motion y las
pausas por visibilidad. La corrección es aditiva y conserva los CSS de R05.

## Leyendas funcionales y revisión de marca · 2026-10-19

Por indicación de Bruno, las escenas comerciales usan leyendas que explican
la tarea: Pregunta, Respuesta, Fuente, Contexto, Propuesta y Revisión. Esto
reemplaza el criterio de rótulos ilustrativos del apartado histórico del
2026-10-18. Home, productos, Marcas y Agencias comparten el ajuste en ES/EN/PT-BR.
Se conservan «Tu marca», alternativas genéricas y dominios reservados, sin
atribuir las escenas a mediciones de KAIRUM ni a resultados de clientes.
Las fuentes, fechas y metodología de estudios publicados siguen vigentes.

La [revisión general de marca](../evidence/2026-10-19-brand-audit/README.md)
registra las 21 páginas y capturas actuales de Profound. Propone mantener el
amarillo de KAIRUM y diferenciar Analytics con verde, Agents con violeta,
Prompt con azul y Traffic con verde azulado. Esos acentos y las propuestas de
composición y movimiento aún no están implementados. La aprobación independiente
9,3/9,2/9,6 corresponde únicamente al cambio de leyendas.
