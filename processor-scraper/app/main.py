from app.routers import escolaridades, grupos, previaturas, unidades_curriculares
from fastapi import FastAPI

app = FastAPI(
    title="API para procesamiento de escolaridades y scraping de grupos, unidades curriculares y previaturas"
)

app.include_router(escolaridades.router, prefix="/api")
app.include_router(unidades_curriculares.router, prefix="/api/unidades-curriculares")
app.include_router(grupos.router, prefix="/api/grupos")
app.include_router(previaturas.router, prefix="/api/previaturas")
