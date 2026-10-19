# Analytics en tres momentos

## Dirección elegida

Bruno eligió conservar las tres vistas de los bocetos dirigidos por Astra:
presencia, sentimiento y citas, distribuidas en el recorrido. Su corrección
posterior pide una identidad más liviana que el negro de Profound. La referencia
refinada es [este boceto](../evidence/2026-10-18-analytics-story/source-light-story.png).

- Superficies KAIRUM marfil y blancas, tinta y gris, acento amarillo.
- Inter y los iconos Phosphor locales existentes.
- Una presentación general y tres escenas con título, explicación breve y
  espacio de producto compartido. No se duplican tres encabezados de página.
- El inicio, Prompt Intelligence y las demás escenas aprobadas de R05 conservan
  su contenido. La sustitución de Analytics se declara en la integración reversible.

## Comportamiento

Presencia compara tres series y cinco marcas al cierre. El selector muestra
siete o catorce lecturas; el control de comparación oculta las dos series de
competidores y sus leyendas. La última lectura de Tu marca es 38/100. Una
respuesta puede mencionar varias marcas; no es una distribución de preferencia.

Sentimiento agrupa 100 menciones ficticias en cinco temas. Cada tema permite
abrir una respuesta y su interpretación. Las 56 menciones positivas del cierre
coinciden con el último punto de la curva. Neutro y negativo son categorías
explícitas; la curva representa sólo el porcentaje positivo.

Citas distingue dominios y páginas propias. Las seis filas distribuyen 100 citas
ficticias; las tres páginas distribuyen las 32 citas del dominio propio. Los
dominios `.example` son texto y nunca destinos externos. Los detalles se abren
de forma nativa y las pestañas permiten teclado y enlaces directos.

## Alcance y accesibilidad

Es una demostración pública sin llamadas a un backend ni disponibilidad real
implícita. Cada escena identifica sus datos sintéticos. El gráfico se carga al
acercarse Analytics al viewport, usando Chart.js 4.5.1 ya aprobado. Si no carga
o no hay JavaScript, las tablas conservan las observaciones, las fuentes y los
detalles. Los controles de gráfico aparecen sólo cuando funcionan.

Las tres escenas permanecen en el documento. En móvil la navegación lateral
pasa a una fila y el ranking continúa debajo del gráfico. Los controles tienen
un mínimo de 44 px, foco visible y movimiento reducido. No se agregan paquetes,
proveedores, nuevas rutas ni configuración privada.

Implementación: `src/components/kairum/analytics-story.ts`, contenido en
`src/i18n/analytics-story.ts`, datos fijos en `src/lib/analytics-story-data.ts`,
estilo aislado y mejora progresiva en `src/scripts/cinematic/analytics-story.ts`.

Ver [QA y evidencia](../evidence/2026-10-18-analytics-story/README.md).
