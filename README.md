# PROADEX

Atlas visual de antimicrobianos para repasar espectro, huecos de cobertura y trampas frecuentes de guardia.

## Web publicada

GitHub Pages: <https://xino00.github.io/Pokedex_infecciosas/>

Repositorio: <https://github.com/xino00/Pokedex_infecciosas>

## Que contiene

`POKEDEX.html` es una aplicacion React autocontenida en un unico archivo HTML. No necesita compilacion ni instalacion local.

La pagina incluye:

- Atlas bacteriano con fichas por germen o familia.
- Pokedex de antibioticos centrada en espectro, huecos y trampas.
- Mecanismos MDR/XDR como BLEE, AmpC, KPC, OXA-48-like, MBL, DTR, CRAB y Stenotrophomonas.
- Matriz visual de cobertura antimicrobiana.
- Selector clinico simple por foco, germen o mecanismo y gravedad.
- Mini casos de guardia para fijar errores frecuentes.
- Seccion de lectura plegada con reglas practicas como LAME y APE.

## Uso local

Abre `POKEDEX.html` en el navegador.

La aplicacion carga React 18 desde CDN:

- <https://unpkg.com/react@18/umd/react.development.js>
- <https://unpkg.com/react-dom@18/umd/react-dom.development.js>

Por eso necesita conexion a internet si se abre directamente como archivo local. Si React no carga, la pagina muestra un aviso inicial.

Tambien puede servirse como web estatica:

```bash
python3 -m http.server
```

Y abrir:

```text
http://localhost:8000/POKEDEX.html
```

## Estructura

```text
.
├── POKEDEX.html
└── README.md
```

## Limites clinicos

Este proyecto es una herramienta visual de razonamiento y repaso. No incluye dosis y no sustituye protocolos locales, antibiograma, foco clinico, alergias, funcion renal, control de foco ni consulta a PROA/Infecciosas cuando corresponda.

Antes de usar una pauta en un paciente real, confirmar siempre con fuentes actualizadas y el protocolo local.
