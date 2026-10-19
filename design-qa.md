# Design QA — Agents con referencia Profound

final result: passed

## Versión y objetivo

Base `03227bd9`, rama `feat/analytics-visual-story`. Bruno pidió aplicar a Agents
la presentación comercial desarrollada para Analytics: una muestra en Home y el
recorrido completo en producto, con el nivel de desarrollo de Profound y paleta
clara KAIRUM. Fuente: https://www.tryprofound.com/features/agents.

La evaluación anterior de Analytics se conserva en
`docs/evidence/2026-10-18-analytics-editorial/design-qa.md`.

## Comparación y evidencia

Fuente visual: `docs/evidence/2026-10-18-agents-editorial/profound-*.jpg`.
Implementación: `docs/evidence/2026-10-18-agents-editorial/kairum-*.jpg`.
Runtime: http://127.0.0.1:4418/productos/agents/.

Se abrieron fuente e implementación conjuntamente para comparar hero, escala
de producto, beneficios, capítulos y editor. La revisión enfocada incluyó las
tres opciones de contenido, fuentes, Original/Propuesta, diferencias desplegadas
y muestra de Home. Las áreas de producto se revisaron a tamaño legible, además
de la apertura completa. Los dos JPEG del diff móvil son vistas separadas.

Viewports: 1440 × 1000, 768 × 1000, 390 × 844 y 320 × 844. JPEG nativo KAIRUM:
1425 × 990, 753 × 980, 375 × 812 y 305 × 804. Fuente: 1430 × 993 y 380 × 822
en escritorio y móvil. El backend excluye borde/scrollbar y devuelve pequeñas
diferencias de área; no se reescalaron ni retocaron las capturas. La comparación
considera esa diferencia de captura y los anchos reales se verifican por DOM.
No se interpreta una diferencia de bordes como deriva visual.

## Superficies de fidelidad

| Superficie              | Evaluación                                                                                                                                                  |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tipografía              | Inter local, títulos amplios y copy legible. Jerarquía de producto y documento diferenciada; el texto se recompone a 320 px.                                |
| Composición y espaciado | Apertura centrada y demo amplia, cuatro beneficios y tres capítulos. En tablet los selectores se colocan arriba; en móvil flujo y documento se apilan.      |
| Color y tokens          | Blanco, marfil, gris, tinta y amarillo KAIRUM. Texto pequeño dorado usa warning para contraste; iconos conservan Phosphor/currentColor.                     |
| Imágenes y assets       | Se conservan marca, Inter y Phosphor propios. Las demostraciones son HTML semántico interactivo; no se rasteriza texto ni se usan assets de Profound.       |
| Copy y alcance          | ES/EN/PT-BR, ejemplo con KAIRUM y fuentes públicas. Contexto, borrador, diferencias y revisión humana; no se afirma CMS ni ejecución/publicación operativa. |

La paleta, copy, documentación y acciones son una adaptación explícita al producto
KAIRUM. El constructor y los resultados comerciales de Profound no forman parte
del alcance aprobado y no se reproducen como capacidades disponibles.

## Rondas y correcciones

1. La primera verificación detectó contraste insuficiente del acento dorado en
   eyebrow y números de capítulo (4,06–4,25 frente a 4,5 requerido para ese texto).
   Se reemplazó por `--kairum-warning`. Capturas posteriores: apertura y capítulos;
   axe de los tres idiomas aprobado en la repetición.
2. Se eliminó un fondo que aclaraba el icono enmascarado de Brand Hub. La captura
   final `kairum-desktop-context.jpg` confirma el color y forma Phosphor.
3. Crítico independiente comparó código, copy y capturas de escritorio, tablet y
   móvil. No encontró P0/P1/P2 ni bloqueantes; no requirió otra reparación visual.

## Dictamen independiente

Agente `landing_editorial_critic`, sólo lectura. Conjunto de diez archivos:
SHA-256 `67c50d6e1ee89d180d2d42143caff5d94250b1ba631e35350cbe1950f947800b`.

| Criterio                                       | Nota   |
| ---------------------------------------------- | ------ |
| Usabilidad                                     | 9,2/10 |
| Estilo                                         | 9,3/10 |
| Fidelidad a KAIRUM y al objetivo de referencia | 9,4/10 |

Cero bloqueantes, cero P0/P1/P2. El crítico revisó archivos y capturas; la
ejecución de pruebas corresponde al implementador.

## Verificación funcional

Los ocho casos de Agents aprobaron: cambio de recorrido y contenido, cuatro
anchos, tres idiomas, teclado, fragmentos, fuentes, Original/Propuesta, diferencias,
criterios de revisión, FAQ/schema, axe y camino sin JavaScript. Home conserva una
muestra. En la primera ronda otras 34 pruebas aprobaron; la repetición final
10/10 cubrió los ocho casos de Agents y dos casos de Analytics PT que habían
encontrado `dist` en reconstrucción. Los 44 casos únicos están satisfechos.

Tipos: 127 archivos sin diagnósticos. Build: 66 páginas e informes verificados.
Formato y R05 aprobados, sin regenerar fingerprints. No se detectaron errores de
página en los recorridos comprobados. No acredita una auditoría global WCAG.

## Refinamiento opcional y límites

P3: el recorrido «Mejorar una página» y el editor usan un título común para dos
fragmentos de propuesta. Unificar el extracto ayudaría a la continuidad narrativa.
Ambos conservan el mismo alcance de producto; no impide revisar las diferencias.

No quedan reparaciones P0/P1/P2 pendientes. Se mantienen el backend y los
destinos comerciales existentes. Entrega local, sin publicar.
