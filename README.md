# PROADEX

Atlas visual de antimicrobianos para repasar espectro, huecos de cobertura y trampas frecuentes de guardia.

## Web publicada

GitHub Pages: <https://xino00.github.io/Pokedex_infecciosas/>

Repositorio: <https://github.com/xino00/Pokedex_infecciosas>

## Que contiene

Es una aplicacion estatica modular, sin framework ni compilacion. No descarga codigo de terceros en produccion.

La pagina incluye:

- Atlas bacteriano con fichas por germen o familia.
- Pokedex de antibioticos centrada en espectro, huecos y trampas.
- Mecanismos MDR/XDR como BLEE, AmpC, KPC, OXA-48-like, MBL, DTR, CRAB y Stenotrophomonas.
- Matriz visual de cobertura antimicrobiana.
- Selector clinico simple por foco, germen o mecanismo y gravedad.
- Mini casos de guardia para fijar errores frecuentes.
- Seccion de lectura plegada con reglas practicas como LAME y APE.

## Uso local

Sirve la carpeta como web estatica:

```bash
python3 -m http.server
```

Y abrir:

```text
http://localhost:8000/
```

No necesita conexion a internet. Se recomienda el servidor local porque los navegadores restringen los modulos JavaScript cuando se abre un archivo directamente con `file://`.

## Verificacion

No es necesario instalar dependencias. Para validar fuentes, IDs, cobertura y las 252 combinaciones del selector:

```bash
npm test
```

## Estructura

```text
.
├── index.html               # Estructura semantica
├── styles.css               # Presentacion
├── src/
│   ├── app.js               # Interfaz y eventos
│   ├── catalog.js           # Fichas y contenido docente
│   ├── coverage.js          # Fuente canonica de la matriz
│   ├── rules.js             # Reglas clinicas declarativas
│   ├── selectors.js         # Busqueda y vistas derivadas
│   ├── sources.js           # Metadatos y enlaces de fuentes
│   └── validate.js          # Invariantes del dominio
└── tests/                   # Pruebas de reglas, matriz y validacion
```

El selector diferencia entre una regla especifica de foco/gravedad y una orientacion general por germen. Esta ultima queda marcada en pantalla para no aparentar una precision que no esta modelada.

## Limites clinicos

Este proyecto es una herramienta visual de razonamiento y repaso. No incluye dosis y no sustituye protocolos locales, antibiograma, foco clinico, alergias, funcion renal, control de foco ni consulta a PROA/Infecciosas cuando corresponda.

Antes de usar una pauta en un paciente real, confirmar siempre con fuentes actualizadas y el protocolo local.
