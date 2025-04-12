from app.routers import escolaridades, scraper
from fastapi import FastAPI

app = FastAPI(title="API para procesamiento de escolaridades")

app.include_router(escolaridades.router, prefix="/api")
app.include_router(scraper.router, prefix="/api/scraping")
