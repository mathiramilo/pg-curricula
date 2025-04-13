from typing import List, Literal, Optional, Union

from pydantic import BaseModel


class TIPO_INSTANCIA:
    CURSO = "C"
    EXAMEN = "E"


class TipoInstancia(BaseModel):
    tipo: Literal["C", "E"]


class TIPO_REGLA:
    AND = "AND"
    OR = "OR"
    NOT = "NOT"
    SOME = "SOME"
    UC = "UC"
    CREDITOS_GRUPO = "CREDITOS_GRUPO"
    CREDITOS_PLAN = "CREDITOS_PLAN"


class ReglaAnd(BaseModel):
    regla: Literal["AND"]
    previas: List["ReglaPreviaturas"]


class ReglaOr(BaseModel):
    regla: Literal["OR"]
    previas: List["ReglaPreviaturas"]


class ReglaNot(BaseModel):
    regla: Literal["NOT"]
    previas: "ReglaPreviaturas"


class ReglaSome(BaseModel):
    regla: Literal["SOME"]
    cantidad: Optional[int]
    previas: List["ReglaPreviaturas"]


class ReglaUc(BaseModel):
    regla: Literal["UC"]
    codigo: Optional[str]
    nombre: Optional[str]
    tipoInstancia: Optional[TipoInstancia]


class ReglaCreditosGrupo(BaseModel):
    regla: Literal["CREDITOS_GRUPO"]
    codigo: Optional[int]
    nombre: Optional[str]
    cantidad: Optional[int]


class ReglaCreditosPlan(BaseModel):
    regla: Literal["CREDITOS_PLAN"]
    cantidad: Optional[int]


ReglaPreviaturas = Union[
    ReglaAnd,
    ReglaOr,
    ReglaNot,
    ReglaSome,
    ReglaUc,
    ReglaCreditosGrupo,
    ReglaCreditosPlan,
    None,
]

ReglaAnd.model_rebuild()
ReglaOr.model_rebuild()
ReglaNot.model_rebuild()
ReglaSome.model_rebuild()
