from pydantic import BaseModel


class UnidadCurricular(BaseModel):
    codigo: str
    nombre: str
    creditos: int
    codigo_grupo_padre: str
    nombre_grupo_padre: str
    codigo_grupo_hijo: str
    nombre_grupo_hijo: str
