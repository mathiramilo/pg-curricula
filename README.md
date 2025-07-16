<h1 align="center">
  <img alt="logo" src="./frontend/public/fing.svg" width="96px" style="padding: 30px"/><br/>
  Curricula+
</h1>

<p align="center">
Este proyecto busca ayudar a los estudiantes de ingeniería a planificar su avance académico de manera efectiva. Proporciona una herramienta web para gestionar las unidades curriculares, las previaturas y los grupos, y permite generar planes de estudio personalizados y actualizados automáticamente.
</p>

## Acerca de este README

En este archivo encontrarás:

- **Configuración del entorno de desarrollo**: instrucciones para crear los archivos de configuración y ejecutar el proyecto en un entorno local utilizando Docker.
- **Generación de datos**: cómo generar y actualizar los archivos JSON necesarios mediante web scraping y comandos específicos.
- **Scripts de scraping**: cómo ejecutar los scripts de scraping para obtener la información más reciente de las unidades curriculares, previaturas y grupos.
- **Comandos útiles**: listado de comandos disponibles para el procesamiento de datos.

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
- `pnpm generate:ucs-primer-semestre` Genera las unidades curriculares que se dictan el primer semestre.
- `pnpm generate:ucs-segundo-semestre` Genera las unidades curriculares que se dictan el segundo semestre.
- `pnpm generate:unidades-curriculares` Genera las UCS de la FING.
- `pnpm generate:ucs-grupos` Genera los grupos de las UCS.
- `pnpm generate:ucs-grupos-actuales` Genera las UCs de los grupos actuales.

### Actualizar los datos mediante web scraping

Para obtener la información más reciente de las unidades curriculares,
previaturas y grupos es necesario ejecutar los scripts de scraping y luego
generar los archivos JSON utilizados por el backend.

1. Con los contenedores levantados ejecuta los scripts de scraping dentro del
   servicio `processor-scraper`:

   ```bash
   docker-compose exec processor-scraper \
     python -m scripts.scrape_previatures

   docker-compose exec processor-scraper \
     python -m scripts.scrape_groups_and_subjects

   docker-compose exec processor-scraper \
     python -m scripts.scrape_first_semester_subjects

   docker-compose exec processor-scraper \
     python -m scripts.scrape_second_semester_subjects
   ```

   Los datos obtenidos se guardarán en `processor-scraper/data`.

2. Luego genera los archivos JSON del backend ejecutando los comandos:

   ```bash
   docker-compose exec backend pnpm generate:previaturas
   docker-compose exec backend pnpm generate:ucs-primer-semestre
   docker-compose exec backend pnpm generate:ucs-segundo-semestre
   docker-compose exec backend pnpm generate:unidades-curriculares
   docker-compose exec backend pnpm generate:ucs-grupos
   docker-compose exec backend pnpm generate:ucs-grupos-actuales
   ```

   Los nuevos archivos se almacenarán en `backend/data`.
