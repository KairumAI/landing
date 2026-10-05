# Entrega para revisión

Repositorio: `KairumAI/landing`. Base: `6489c6794bafb54f94cac6659cb0b79ea0921a26`.
Rama local: `codex/astro-approved-landing-seo-20261004`.
Diseño aprobado: R05 `477f1e2338d2`. Candidato Astro: `7207357b71e1`.

## Cambio propuesto

La base Astro de Joaquín tenía otra landing y metadatos centrados en Home.
Esta entrega incorpora el diseño aprobado por Bruno, sus escenas y páginas
individuales de producto, y extiende el SEO a cada página y su idioma equivalente.
Conserva Astro estático, español/inglés/portugués, favicons y Open Graph,
robots, CSP y el flujo de release con aprobación de producción.

Hay 13 páginas por idioma: Home, catálogo, seis productos, marcas, agencias,
nosotros, contacto y acceso. Las 39 páginas comparten los componentes KAIRUM;
las cuatro aperturas de producto reutilizan sus escenas de Home. El selector
de idioma mantiene producto y sección. El sitemap incluye 36 rutas indexables;
acceso y 404 quedan fuera. Canonical, hreflang, títulos, descripciones y schema
corresponden a cada página; FAQ schema sólo acompaña preguntas visibles.

GSAP conserva entradas, rotación de logos y movimiento ambiental. Chart.js y
Three tienen carga diferida; Home y las cuatro aperturas no instancian Three.
Los gráficos siguen usando marcas genéricas y valores esquemáticos. La
biblioteca se enlaza en `https://kairum.com.ar/informes/`; no se copian informes
privados ni se cambia el dominio en esta entrega.

## Validación local

- Referencia: 51 assets, cinco CSS y 13 cuerpos españoles coinciden con R05.
- Tipos: 81 archivos, cero errores, avisos e hints.
- Compilación: 39 páginas de marketing y tres páginas de error.
- Navegador: 26/26 pruebas; tres idiomas, menús, teclado, accesibilidad,
  movimiento normal/reducido, NoJS, enlaces, SEO, sitemap y CSP local.
- Comparación nativa: [47 capturas y metadatos](runtime/index.json).
- Dictamen independiente: PASS para `7207357b71e1`; usabilidad 9,2, estilo
  9,3, fidelidad 9,5, claridad 9,2 y movimiento 9,1; cero bloqueantes.
  [Revisión y límites](review.md).

![Home aprobada sobre Astro](runtime/final-home-es-desktop-stable-b.jpg)

## PR preparado

Título: `feat: integra la landing aprobada en astro con seo multilingüe`.

Descripción propuesta:

> Integra la landing cinematográfica R05 y las páginas de producto aprobadas
> en la base Astro de Joaquín. Conserva los tres idiomas y las cabeceras, y
> amplía canonical, hreflang, sitemap y datos estructurados a cada página.
>
> Validación local: referencia R05 idéntica, tipos sin errores y 26 pruebas de
> navegador aprobadas. La evidencia nativa y el dictamen independiente quedan
> en `docs/evidence/2026-10-04-astro-unification/`.

El diff está preparado para un PR a `main`. No se ha hecho push, merge,
release ni despliegue. El cambio de dominio y la preservación de `/informes/` en
el hosting son otra entrega; las pruebas locales no acreditan producción
ni posiciones en buscadores.
