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


if __name__ == "__main__":
    # Definir los argumentos de la línea de comandos
    parser = argparse.ArgumentParser(
        description="Extraer avance academico de un estudiante a partir de su escolaridad en formato PDF."
    )
    parser.add_argument("ubicacion_archivo", type=str, help="Ubicacion del archivo PDF")

    # Parsear los argumentos
    args = parser.parse_args()

    # Extraer las unidades curriculares aprobadas
    informacion_estudiante = obtener_informacion_estudiante(args.ubicacion_archivo)
    print(informacion_estudiante)
