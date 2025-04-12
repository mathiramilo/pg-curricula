from enum import Enum
from typing import List

from pydantic import BaseModel, Field


class TipoAprobacion(Enum):
    COURSE = "Curso"
    EXAM = "Examen"


class UnidadCurricularAprobada(BaseModel):
    concepto: str
    fecha: str
    creditos: int
    codigo: str
    nombre: str
    tipo_aprobacion: TipoAprobacion
    nombre_grupo_padre: str
    nombre_grupo_hijo: str


class InformacionEstudiante(BaseModel):
    unidades_curriculares_aprobadas: dict[str, UnidadCurricularAprobada] = Field(
        ..., alias="unidadesCurricularesAprobadas"
    )
    creditos_totales: int = Field(..., alias="creditosTotales")
    matematica: int = Field(..., alias="MATEMATICA")
    ciencias_experimentales: int = Field(..., alias="CIENCIAS EXPERIMENTALES")
    programacion: int = Field(..., alias="PROGRAMACION")
    arq_sop_redes_comp: int = Field(..., alias="ARQUIT, S.OP. Y REDES DE COMP.")
    int_artificial_robotica: int = Field(..., alias="INT.ARTIFICIAL Y ROBOTICA")
    b_datos_sist_informacion: int = Field(..., alias="B.DATOS Y SIST. DE INFORMACION")
    calculo_numerico_simbolico: int = Field(..., alias="CALCULO NUMERICO Y SIMBOLICO")
    investigacion_operativa: int = Field(..., alias="INVESTIGACION OPERATIVA")
    ingenieria_software: int = Field(..., alias="INGENIERIA DE SOFTWARE")
    a_integ_talleres_pasant_proy: int = Field(
        ..., alias="A.INTEG,TALLERES,PASANT.Y PROY"
    )
    gestion_organizaciones: int = Field(..., alias="GESTION EN ORGANIZACIONES")
    ciencias_humanas_sociales: int = Field(..., alias="CIENCIAS HUMANAS Y SOCIALES")
    materias_opcionales: int = Field(..., alias="MATERIAS OPCIONALES")
