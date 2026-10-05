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
