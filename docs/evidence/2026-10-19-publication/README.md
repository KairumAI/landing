# Revisión previa a publicación · 19 de octubre de 2026

Candidato visual aprobado: `d20a90fc36e8bc178183ed519d73bd4c4bf0b7a4`.
PR [#6](https://github.com/KairumAI/landing/pull/6), con los aportes del equipo y
las presentaciones de Analytics y Agents. Se preserva el paquete público, R05 y
los 26 informes. La publicación corresponde únicamente a landing/informes.

## Verificaciones de integración

El candidato inicial aprobó 148/148 pruebas de navegador y 46/46 controles de
entrega locales. CI [39258021492](https://github.com/KairumAI/landing/actions/runs/39258021492)
aprobó ese mismo SHA. El environment production sólo admite main y el writer
antiguo de geo-product sigue deshabilitado. La versión anterior publicada es
`be9383149d79f6ae9991ea75af02f747875a4b30`.

## Revisión independiente y corrección

El agente `release_code_review`, sólo lectura, revisó el rango desde main y el
delta de runtime desde `5e91ac6`. Encontró un P2 en el ciclo de vida de Chart.js:
`pagehide` destruía los gráficos sólo una vez. En el segundo retorno persistido,
el canvas conservaba una instancia y Chart.js pasaba la vista a fallback.

Se reprodujo antes de corregir en Chromium: los tres casos ES/EN/PT-BR fallaron
en el segundo ciclo de Home con `data-chart-ready=fallback`. Los tests envían
pares de eventos nativos PageTransitionEvent con persisted=true; no se presenta
esta simulación del ciclo de eventos como un recorrido manual real de BFCache.

La corrección conserva el listener de pagehide, destruye ambos gráficos y limpia
sus referencias en cada salida. No cambia composición, copy, datos ni controles.
Después: 13/13 pruebas de Analytics aprobadas, con dos ciclos en Home y producto,
los tres idiomas, controles y gráfico de sentimiento. Tipos: 127 archivos sin
diagnósticos; build de 66 páginas, informes, formato y referencia aprobados.

El crítico comprobó cuatro ciclos aislados del módulo: cero instancias al salir,
dos al volver y ningún gráfico oculto. Dictamen final: **Ready to merge: Yes**,
P2 cerrado, sin nuevos hallazgos. Su revisión no ejecutó las suites E2E completas.

## Revisión comercial

Se comprobaron propuesta, beneficios, entregables y siguiente paso en Home,
Analytics, Agents y Consulting. Las páginas mantienen el alcance de KAIRUM y la
revisión humana de contenido. La agenda pública responde por HTTPS; Home y
Contacto publicados tienen receptor y site key públicos configurados. No se
envió una consulta real ni se acredita recepción en Formspark/Gmail.

Se conserva el diseño que Bruno aprobó. El P3 editorial sobre dos extractos con
un título común permanece como refinamiento opcional de continuidad.

## Alcance del cierre

Esta evidencia es previa al merge y al upload. El nuevo SHA debe completar CI;
la publicación en Cloudflare y sus bytes se confirman con la ejecución Deploy y
la verificación pública del paquete correspondiente. No se publica desde la rama.
