# Entrega pública unificada · 2026-10-05

Base de código: Astro aprobado `34864d7146b0f172d54b109c039d4c2368867a17`.
Base del repo: `6489c6794bafb54f94cac6659cb0b79ea0921a26`.
Diseño: R05 `477f1e2338d2`, sin cambios en componentes, estilos, copy o assets.
Rama: `codex/astro-approved-landing-seo-20261004`.

## Paquete

- 26 informes ya publicados. Se conservan 2.959 archivos y licencias,
  39.129.879 bytes, con los hashes del último artifact público aprobado.
- Procedencia: geo-product `32093714116cfcd5cf44927dfe95e1cae289f58b`, ejecución
  `37248157603`, artifact `11319144792`; ZIP SHA-256 registrado por GitHub:
  `656c24a7415505707bcf8085e5180996500fb155f4fecd3d88e935e800390e7f`.
- El manifiesto del paquete de origen tiene SHA-256
  `2ad64297f8a0b84e3cbda75bd6c2a9dfc765b403a7a66a5f465c59d47fc0ab72`.
  No se copia su información de fuentes privadas al repo público.
- Salida combinada: 3.086 archivos, 58.884.125 bytes; 34.541 referencias internas
  de los informes comprobadas. Debajo de 20.000 archivos y 25 MiB por asset.
- No contiene Functions, respuestas JSON privadas, propuestas ni archivos de
  entorno. El manifiesto final se mantiene fuera del contenido público.

## Validación

- 29 tests de entrega: archivos cambiados, faltantes, extras, symlinks, rutas
  privadas, tamaño, enlaces, tags, hashes HTTP, noindex y propuestas.
- Referencia aprobada: 51 assets, cinco CSS y 13 páginas españolas coinciden.
- Astro check: 88 archivos; cero errores, warnings e hints. Ver `types.log`.
- Formato correcto, ver `format.log`. Actionlint 1.7.12 sin errores en CI y Deploy.
- Build completo aprobado. La navegación, búsqueda y acceso a PDF/lectores se
  ejercitan en el navegador con la CSP de la landing.
- La ronda final de navegador aprobó las 28 pruebas; ver `e2e-final.log`.
- La primera ronda de navegador pasó 27 tests y falló una expectativa nueva que
  suponía un meta robots en todos los informes. El circuito heredado usa la
  cabecera noindex de Pages. Se corrigió la expectativa sin cambiar los informes;
  se conserva `e2e.log` como evidencia histórica de esa ronda.
- Roundtrip del artifact completo por el mismo CLI del deploy aprobado; una
  alteración de un informe es rechazada. Los 2.959 blobs commiteados conservan
  los hashes fuente. Ver `artifact-roundtrip-result.json`.
- `public-snapshot.json` registra cuatro recursos públicos de producción con
  status 200, noindex y hashes idénticos al artifact fuente.

## Publicación y límites

Writer nuevo: `KairumAI/landing`, proyecto Pages `kairum`, dominio `kairum.com.ar`.
Release de tag `vMAJOR.MINOR.PATCH` perteneciente a main, verificación antes del
artifact y gate personal de Bruno en production. No se recompila después de su
aprobación; se comprueba el artifact descargado antes de subirlo.

Writer antiguo comprobado en GitHub: `disabled_manually`, environment limitado
únicamente a `kairum-publication-paused`, sin ejecuciones antiguas pendientes.
Reviewer y tags del environment nuevo permanecen intactos.

Deployment Pages anterior identificado en una consulta de sólo lectura:
`783b90f8-e7b1-44e4-81a9-984c4fe708c5`, origen `3209371`. El procedimiento
conserva ese destino para la recuperación inicial; no se ejecutó un rollback.

[Revisión independiente](review.md): lista para PR, sin hallazgos pendientes.
Esta entrega todavía no fue integrada ni publicada. Las comprobaciones locales
no validan el valor secreto ni las cabeceras de un deploy que todavía no existe.
