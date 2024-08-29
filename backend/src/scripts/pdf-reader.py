import argparse

from constantes import AREAS_FORMACION_INGCOMP
from funciones import (
    buscar_ucs_aprobadas_con_resultados_finales,
    buscar_ucs_aprobadas_con_resultados_intermedios,
    leer_pdf,
)


def obtener_informacion_estudiante(
    ubicacion_archivo: str, conResultadosIntermedios: bool
) -> dict:
    # Leer archivo PDF
    texto_pdf = leer_pdf(ubicacion_archivo)

    # Buscar unidades curriculares aprobadas
    informacion_estudiante = (
        buscar_ucs_aprobadas_con_resultados_intermedios(
            AREAS_FORMACION_INGCOMP, texto_pdf
        )
        if conResultadosIntermedios
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
    parser.add_argument(
        "--cri",
        action="store_true",
        help="Indica si buscar unidades curriculares intermedias",
    )

    # Parsear los argumentos
    args = parser.parse_args()

    # Extraer las unidades curriculares aprobadas
    informacion_estudiante = obtener_informacion_estudiante(
        args.ubicacion_archivo, args.cri
    )
    print(informacion_estudiante)
