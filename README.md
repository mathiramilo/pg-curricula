# PG Curricula

Proyecto de Grado, curricula dinamica para estudiantes de ingenieria.

## Configuracion del entorno de desarrollo

### Crear los archivos `.env`

- Asegurate de tener los archivos `.env` en las carpetas `core` y `frontend`.
- Puedes copiar los archivos `.env.example` y renombrarlos a `.env`.
- Si te faltan variables de entorno, no dudes en preguntar.

### Correr el entorno de desarrollo con `docker-compose`

Asegurate de estar en la raiz del proyecto.

```bash
docker-compose up -d
```

## Generación de datos

Utilizamos archivos JSON para persistir los datos.

### Comandos

- `pnpm generate:previaturas` Genera las previaturas de las carreras.
- `pnpm generate:ucs-fing` Genera las UCS de la FING.
- `pnpm generate:ucs-grupos` Genera los grupos de las UCS.
