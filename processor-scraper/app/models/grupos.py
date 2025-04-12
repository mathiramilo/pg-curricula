from pydantic import BaseModel


class Grupo(BaseModel):
    codigo: str
    nombre: str
    min_creditos: int
