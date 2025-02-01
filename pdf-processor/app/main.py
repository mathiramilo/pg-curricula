from fastapi import FastAPI

from app.routers import escolaridades

app = FastAPI(title="API para procesamiento de escolaridades")

app.include_router(escolaridades.router, prefix="/api")
