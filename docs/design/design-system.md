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
posición y ancho según su contenido. Analytics mantiene el dashboard, una curva
de menciones y barras comparativas esquemáticas. Traffic separa visitas humanas
de solicitudes de crawlers; una solicitud no demuestra una cita ni una visita.
Brand Hub es el contexto compartido de los cuatro productos, no una quinta
herramienta independiente.

Las cuatro aperturas de producto reutilizan estas mismas escenas. El movimiento
ambiental continúa después de la entrada y se pausa fuera del viewport o cuando
la pestaña está oculta. `prefers-reduced-motion` desactiva entradas y movimiento
continuo. Sin JavaScript siguen visibles texto, imágenes, fallback del gráfico,
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
