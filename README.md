# PG Curricula

Proyecto de Grado, curricula dinamica para estudiantes de ingenieria.

## Configuración del entorno virtual

### Requisitos

- Asegurate de tener una version de python mayor a la `3.12` instalada en tu sistema.
- Asegurate de tener `pnpm` instalado en tu sistema. Si no lo tienes, puedes instalarlo con el siguiente comando:

```bash
npm install -g pnpm
```

### Ve a la carpeta `core`

```bash
cd core
```

#### Configurar el entorno virtual

Elige el comando correcto dependiendo de tu sistema operativo.

```bash
pnpm venv:setup:unix
```

```bash
pnpm venv:setup:win
```

## Configuracion del entorno de desarrollo

### Crear los archivos `.env`

- Asegurate de tener los archivos `.env` en las carpetas `core` y `frontend`.
- Puedes copiar los archivos `.env.example` y renombrarlos a `.env`.
- Si te faltan variables de entorno, no dudes en preguntar.

### Correr el entorno de desarrollo con `docker-compose`

```bash
docker-compose up -d
```
