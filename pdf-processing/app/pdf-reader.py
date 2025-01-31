import argparse

from constants import AREAS_FORMACION_INGCOMP
from functions import (
    buscar_ucs_aprobadas_con_resultados_finales,
    buscar_ucs_aprobadas_con_resultados_intermedios,
    es_con_resultados_intermedios,
    leer_pdf,
)


def obtener_informacion_estudiante(ubicacion_archivo: str) -> dict:
    # Leer archivo PDF
    texto_pdf = leer_pdf(ubicacion_archivo)

    cri = es_con_resultados_intermedios(texto_pdf)

    # Buscar unidades curriculares aprobadas
    informacion_estudiante = (
        buscar_ucs_aprobadas_con_resultados_intermedios(
            AREAS_FORMACION_INGCOMP, texto_pdf
        )
        if cri
        else buscar_ucs_aprobadas_con_resultados_finales(
            AREAS_FORMACION_INGCOMP, texto_pdf
        )
    )

    return informacion_estudiante
