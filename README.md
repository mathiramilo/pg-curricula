# PG Curricula

Proyecto de Grado, curricula dinamica para estudiantes de ingenieria.

## Configuracion del entorno de desarrollo

### Crear los archivos `.env`

- Asegurate de tener los archivos `.env` en las carpetas `backend` y `frontend`.
- Puedes copiar los archivos `.env.example` y renombrarlos a `.env`.
- Si te faltan variables de entorno, no dudes en preguntar.

### Correr el entorno de desarrollo con `docker-compose`

Asegúrate de estar en la raíz del proyecto y de que cuentas con Docker y
`docker-compose` instalados. Con los archivos de entorno creados ya puedes
levantar los contenedores:

```bash
docker-compose up -d
```

El backend quedará disponible en `http://localhost:3000` y el frontend en
`http://localhost:5173`.

## Generación de datos

Utilizamos archivos JSON para persistir los datos.

### Comandos

- `pnpm generate:previaturas` Genera las previaturas de las carreras.
- `pnpm generate:ucs-fing` Genera las UCS de la FING.
- `pnpm generate:ucs-grupos` Genera los grupos de las UCS.

### Actualizar los datos mediante web scraping

Para obtener la información más reciente de las unidades curriculares,
previaturas y grupos es necesario ejecutar los scripts de scraping y luego
generar los archivos JSON utilizados por el backend.

1. Con los contenedores levantados ejecuta los scripts de scraping dentro del
   servicio `processor-scraper`:

   ```bash
   docker-compose exec processor-scraper \
     python scripts/scrape_previatures.py

   docker-compose exec processor-scraper \
     python scripts/scrape_groups_and_subjects.py
   ```

   Los datos obtenidos se guardarán en `processor-scraper/data`.

2. Luego genera los archivos JSON del backend ejecutando los comandos:

   ```bash
   docker-compose exec backend pnpm generate:previaturas
   docker-compose exec backend pnpm generate:ucs-fing
   docker-compose exec backend pnpm generate:ucs-grupos
   ```

   Los nuevos archivos se almacenarán en `backend/data`.
