# Restauración de la versión anterior · 2026-10-19

Por pedido de Bruno se revierte [PR #8](https://github.com/KairumAI/landing/pull/8)
(`858d53765baef396e743b7af89f1bcb73cc5744d`) y se recupera la versión inmediatamente
anterior, `9ef3810e3fd509a366bb064933910deab1b2c1c0`
([PR #7](https://github.com/KairumAI/landing/pull/7)).
La restauración conserva las páginas desarrolladas de Analytics y Agents, las
leyendas funcionales, Recursos, el blog y los formularios. La prueba oscura quedó
en su rama local y no forma parte de esta entrega.

## Identidad de la restauración

Antes de agregar este registro y sus capturas, el índice completo coincidió con
el árbol de `9ef3810e3fd509a366bb064933910deab1b2c1c0`:
`e971af434e3e803f7f557a195709786dc309b2b3`.
La evidencia y la nueva entrada del feature register son los únicos agregados a
esa versión. No se modifican el paquete público de informes ni los controles de
publicación.

Cloudflare confirmó la restauración de producción al deployment
`b5a2d8cf-0ba7-4087-8fe9-8eda6dbcd67b`, correspondiente a PR #7.
La comprobación de los bytes servidos utilizó el manifiesto del
[Deploy original](https://github.com/KairumAI/landing/actions/runs/39270827192):
101 archivos comprobados y 32 rutas excluidas verificadas, con resultado aprobado.
La captura del dashboard se conserva fuera del repositorio por contener datos de
la cuenta. Las capturas públicas de esta carpeta se tomaron después de esa
restauración.

## Verificación funcional

- Suite completa: **151/151 pruebas aprobadas**, 6,5 minutos, en una ejecución
  completa posterior a una primera ejecución interrumpida.
- Entrega pública: **46/46 pruebas aprobadas**.
- Astro: 127 archivos, cero errores, advertencias o sugerencias.
- Referencia R05 `477f1e2338d2`: comprobación aprobada, sin regenerar fingerprints.
- Formato: comprobación aprobada sobre la reversión; los documentos de evidencia
  se formatean antes del commit.

Las pruebas no acreditan recepción de correo, resultados comerciales ni una
auditoría general de accesibilidad. La integración requiere CI del SHA de la
reversión; el workflow de producción vuelve a comprobar el paquete publicado.

## Revisión visual independiente

Las 20 capturas y sus hashes están en [manifest.json](manifest.json). Incluyen
Home, Analytics y Agents en 1440, 768, 390 y 320 px, las demostraciones de Analytics
y Agents en 1440 y 320 px y las escenas de Prompt Intelligence y Traffic de Home
en esos dos anchos.

- **Ronda 1:** el crítico independiente comprobó la igualdad con la versión
  anterior y la conservación de los capítulos de producto. Revisó 20 capturas;
  16 servían como evidencia final y cuatro escenas de Prompt/Traffic estaban a
  mitad de su entrada. No identificó un defecto de código de la restauración.
- **Ronda 2:** se sustituyeron esas cuatro tomas usando el comportamiento real de
  `prefers-reduced-motion: reduce`. El título queda visible, la opacidad del texto
  es 1 y el estado de la escena es `complete`. No se editaron las imágenes ni se
  modificó el código para obtenerlas. El manifiesto identifica esas cuatro
  capturas como movimiento reducido.

El crítico independiente cerró la ronda 2 y aprobó la restauración: **usabilidad
9,2/10, estilo 9,3/10 y fidelidad a la versión previa 9,6/10**, con cero
bloqueantes y cero hallazgos P0/P1/P2. Volvió a comprobar los 20 hashes y tamaños
sin discrepancias y la identidad del código con `9ef3810`. Su revisión fue de
sólo lectura; las pruebas funcionales corresponden a la verificación separada
descrita arriba. El dictamen se limita a las rutas y escenas capturadas y no
extiende la evaluación a envíos de formularios, backend o estados no recorridos.
