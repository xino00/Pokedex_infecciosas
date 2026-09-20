# PROADEX

Atlas visual de antimicrobianos para repasar espectro, huecos de cobertura y trampas frecuentes de guardia.

## Web publicada

GitHub Pages: <https://xino00.github.io/Pokedex_infecciosas/>

Repositorio: <https://github.com/xino00/Pokedex_infecciosas>

## Que contiene

Es una aplicacion estatica modular, sin framework ni dependencias externas. No descarga codigo de terceros en produccion.

La pagina incluye:

- Atlas bacteriano con fichas por germen o familia.
- Clasificación bacteriana por Gram y morfología, adaptada de la tabla aportada: 4 grupos y 18 ramas, búsqueda por microorganismo/prueba y enlaces a las fichas disponibles. Acceso directo: `#view=classification`.
- Pokedex de antibioticos centrada en espectro, huecos y trampas.
- Mecanismos MDR/XDR como BLEE, AmpC, KPC, OXA-48-like, MBL, DTR, CRAB y Stenotrophomonas.
- Escaner interactivo para comparar de un vistazo cobertura y huecos de cada antibiotico.
- Matriz visual agrupada por familias, con cada farmaco separado y primera columna fija.
- Fluoroquinolonas separadas: ciprofloxacino, levofloxacino y moxifloxacino, con diferencias por foco, AST y precauciones de uso.
- Selector clinico progresivo para adultos con 66 combinaciones y 25 reglas especificas: BLEE, AmpC, Pseudomonas, SARM, SASM, Enterococcus y Listeria.
- Tratamiento, pruebas y seguimiento adaptados al foco; rutas de bacteriemia y endocarditis separadas de piel, respiratorio y SNC.
- Mini casos de guardia para fijar errores frecuentes.
- Seccion de lectura plegada con reglas practicas como LAME y APE.
- Enlaces directos compartibles a secciones, rutas clinicas y fichas.

## Uso local

Se puede abrir `index.html` directamente con doble clic. La pagina usa `app.bundle.js`, un bundle clasico autocontenido, para funcionar tambien bajo `file://`.

Durante el desarrollo tambien puedes servir la carpeta como web estatica:

```bash
python3 -m http.server
```

Y abrir:

```text
http://localhost:8000/
```

No necesita conexion a internet.

Si modificas algun archivo de `src/`, regenera el bundle antes de abrir la pagina:

```bash
npm run build
```

## Verificacion

No es necesario instalar dependencias. Para validar sintaxis, fuentes, IDs, cobertura, todas las combinaciones generales y las rutas expuestas por la interfaz:

```bash
npm run verify
```

Las pruebas comprueban estructura, reglas, enlaces y coherencia entre vistas; no equivalen a una validación clínica completa. `scripts/verify-browser.js` exporta `verifyBrowser(page, baseUrl)` para ejecutarlo con una `Page` de Playwright, tanto por HTTP como por `file://`. Comprueba rutas inválidas, teclado, búsqueda, fichas, compatibilidad de enlaces y cuatro anchos de pantalla. No requiere dependencias de producción.

## Estructura

```text
.
├── index.html               # Estructura semantica; carga el bundle offline
├── app.bundle.js            # Artefacto generado para navegador y file://
├── styles.css               # Presentacion
├── scripts/
│   └── build-bundle.js      # Empaquetador local sin dependencias
├── src/
│   ├── app.js               # Interfaz y eventos
│   ├── catalog.js           # Fichas y contenido docente
│   ├── classification.js    # Morfología y pruebas de identificación; sin reglas terapéuticas
│   ├── clinical-guidance.js # Revisiones compartidas y precauciones de quinolonas
│   ├── coverage.js          # Fuente canonica de la matriz
│   ├── rules.js             # Reglas clinicas declarativas
│   ├── selectors.js         # Busqueda y vistas derivadas
│   ├── navigation.js        # Validación de rutas compartidas y tipos de ficha
│   ├── sources.js           # Metadatos y enlaces de fuentes
│   └── validate.js          # Invariantes del dominio
└── tests/                   # Pruebas de reglas, matriz y validacion
```

El motor conserva orientacion general para validar exhaustivamente las 336 combinaciones posibles, pero la interfaz solo expone 66 escenarios con una regla especifica. Los desplegables de germen, foco y gravedad se derivan en cascada. Cada regla limita expresamente los focos que admite: una regla para pacientes criticos no abre rutas de cistitis baja ni de endocarditis por accidente.

La seleccion actual se codifica en el fragmento `#` de la URL. Esto permite compartir una vista sin backend y sin enviar datos a ningun servidor.

Un enlace con una ruta clínica incompleta o no disponible muestra lo solicitado y oculta las recomendaciones hasta que se elija otra ruta. Las anclas de accesibilidad conservan la selección. El antiguo enlace `scanner=mero-imi` abre la nueva fila de meropenem; la ficha `antibiotic:mero-imi` mantiene la comparación explícita entre ambos fármacos.

Los enlaces anteriores con `germ=enterolisteria&focus=snc` conservan su significado y abren Listeria. Esa equivalencia no se aplica a otros focos ni a parámetros duplicados. La interfaz muestra el escenario clínico y sus fuentes, sin presentar la existencia de una regla de software como certificación clínica.

## Limites clinicos

Este proyecto es una herramienta visual de razonamiento y repaso. No incluye dosis y no sustituye protocolos locales, antibiograma, foco clinico, alergias, funcion renal, control de foco ni consulta a PROA/Infecciosas cuando corresponda.

Antes de usar una pauta en un paciente real, confirmar siempre con fuentes actualizadas y el protocolo local.

Revisión dirigida del 19-09-2026: Stenotrophomonas invasiva, NDM y el papel de ciprofloxacino/levofloxacino en BLEE se han contrastado con IDSA 2026; el resto conserva sus fuentes y no se declara actualizado íntegramente a esa edición. La guía estadounidense requiere adaptación a disponibilidad y PROA local. Las filas separadas de meropenem e imipenem incluyen los matices de CIMA y la actividad in vitro de imipenem frente a Listeria descrita en DailyMed. Cefepime-zidebactam se ha retirado de las opciones al no disponer de respaldo terapéutico específico en las fuentes asignadas.

La ampliación de quinolonas incorpora tres fichas, tres filas de matriz/escáner y dos casos. Se han cotejado los diez objetivos de cada fila con las fichas CIMA 67095, 75614 y 74573, EUCAST 16.1 y el papel de ciprofloxacino/levofloxacino en IDSA. Las precauciones comunes remiten a AEMPS MUH (FV), 07/2023. Los enlaces y el alcance de cada fuente están en `src/sources.js` y en las fichas de la web.

Los símbolos resumen cobertura orientativa, no las categorías S/I/R del laboratorio: `±` exige leer los matices; `?` señala cobertura clínica no establecida y siempre lleva una nota. Se usa `?` para levofloxacino/Listeria (sin respaldo suficiente en las fuentes revisadas) y moxifloxacino/Listeria (EUCAST: evidencia insuficiente en meningitis). No se infiere resistencia a partir de falta de evidencia. Las menciones a quinolonas en las rutas urinarias BLEE nombran ciprofloxacino/levofloxacino; moxifloxacino no se presenta como alternativa urinaria. No se han añadido dosis.

Ampliación del selector del 20-09-2026: 19 combinaciones BLEE, 15 AmpC, 8 Pseudomonas, 10 SARM, 7 SASM, 4 Enterococcus y 3 Listeria. La ampliación incorpora el foco de endocarditis y seguimiento por escenario. IDSA 2026 respalda las nuevas rutas de AmpC y la selección dirigida en Pseudomonas; ATS/IDSA 2016 respalda las distinciones respiratorias y IDSA 2014 las de piel. La selección terapéutica de endocarditis se ha contrastado con los apartados 7.6–7.8 del PDF original ESC 2023. El consenso IDSA/ESCMID de septiembre de 2026 se utiliza para evaluación y seguimiento de bacteriemia por S. aureus en adultos, no para atribuirle una selección antibiótica que esa parte aún no aborda. Las fuentes conservan su fecha y ámbito en cada salida.

El caso 05 se titula «BLEE: el tratamiento depende del foco» y diferencia cistitis, pielonefritis/infección urinaria complicada y bacteriemia con frases completas. Todos los casos permiten desplegar sus fuentes. Las pruebas técnicas no sustituyen una revisión clínica independiente ni la adaptación al protocolo local.

Clasificación del 20-09-2026: la imagen original se conserva en `assets/clasificacion-bacteriana-original.png`, sin atribuirle una edición no identificada. La adaptación contrasta morfología y pruebas con UK SMI ID 1, 4, 7, 16 y 17; resistencia esperada con EUCAST 1.2; AmpC por especie con el apartado 2.1 de IDSA 2026; y la virulencia de S. lugdunensis con el Manual del 12 de Octubre 2022 (p. 970, tabla 7, nota 1). Las fuentes conservan su propia fecha: no se presenta toda la bibliografía como publicada en 2026.

Se explicitan hemólisis variable del grupo S. anginosus, grupos C/G de S. dysgalactiae, límites de lactosa/oxidasa y ausencia de sensibilidad antibiótica garantizada por especie. Se corrige la generalización de AmpC a Proteus. El 10–15 % de E. coli fermentadores lentos no se ha corroborado y no se traslada al esquema consultable. Las ramas conservan todos los nombres de la imagen, con correcciones ortográficas y algunos nombres actuales adicionales; no se crean recomendaciones terapéuticas para los microorganismos nuevos. La búsqueda muestra ramas completas para mantener su contexto.
