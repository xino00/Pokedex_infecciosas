# PROADEX

Atlas visual de antimicrobianos para repasar espectro, huecos de cobertura y trampas frecuentes de guardia.

## Web publicada

GitHub Pages: <https://xino00.github.io/Pokedex_infecciosas/>

Repositorio: <https://github.com/xino00/Pokedex_infecciosas>

## Que contiene

Es una aplicacion estatica modular, sin framework ni dependencias externas. No descarga codigo de terceros en produccion.

La pagina incluye:

- Atlas bacteriano con fichas por germen o familia.
- Pokedex de antibioticos centrada en espectro, huecos y trampas.
- Mecanismos MDR/XDR como BLEE, AmpC, KPC, OXA-48-like, MBL, DTR, CRAB y Stenotrophomonas.
- Escaner interactivo para comparar de un vistazo cobertura y huecos de cada antibiotico.
- Matriz visual agrupada por familias, con cada farmaco separado y primera columna fija.
- Selector clinico progresivo que solo ofrece rutas con una regla especifica auditada.
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

No es necesario instalar dependencias. Para validar sintaxis, fuentes, IDs, cobertura, las 252 combinaciones generales y las rutas expuestas por la interfaz:

```bash
npm run verify
```

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
│   ├── coverage.js          # Fuente canonica de la matriz
│   ├── rules.js             # Reglas clinicas declarativas
│   ├── selectors.js         # Busqueda y vistas derivadas
│   ├── sources.js           # Metadatos y enlaces de fuentes
│   └── validate.js          # Invariantes del dominio
└── tests/                   # Pruebas de reglas, matriz y validacion
```

El motor conserva orientacion general para validar exhaustivamente las 252 combinaciones posibles, pero la interfaz solo expone escenarios con una regla especifica. Los desplegables de germen, foco y gravedad se derivan en cascada de esas rutas auditadas.

La seleccion actual se codifica en el fragmento `#` de la URL. Esto permite compartir una vista sin backend y sin enviar datos a ningun servidor.

## Limites clinicos

Este proyecto es una herramienta visual de razonamiento y repaso. No incluye dosis y no sustituye protocolos locales, antibiograma, foco clinico, alergias, funcion renal, control de foco ni consulta a PROA/Infecciosas cuando corresponda.

Antes de usar una pauta en un paciente real, confirmar siempre con fuentes actualizadas y el protocolo local.
