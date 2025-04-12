from pydantic import BaseModel


class UnidadCurricular(BaseModel):
    codigo: str
    nombre: str
    creditos: int
    grupo_padre: str
    grupo_hijo: str
