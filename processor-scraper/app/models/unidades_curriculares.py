from pydantic import BaseModel


class BaseUnidadCurricular(BaseModel):
    codigo: str
    nombre: str


class UnidadCurricular(BaseUnidadCurricular):
    creditos: int
    codigo_grupo_padre: str
    nombre_grupo_padre: str
    codigo_grupo_hijo: str
    nombre_grupo_hijo: str
