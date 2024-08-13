import argparse

from consts import FORMATION_AREAS_INGCOMP
from functions import (
    read_pdf,
    search_aprobed_subjects_final_results,
    search_aprobed_subjects_intermediate_results,
)


def get_student_data(file_path: str, wir: bool) -> dict:
    # Leer archivo PDF
    pdf_text = read_pdf(file_path)

    # Buscar unidades curriculares aprobadas
    student_data = (
        search_aprobed_subjects_intermediate_results(FORMATION_AREAS_INGCOMP, pdf_text)
        if wir
        else search_aprobed_subjects_final_results(FORMATION_AREAS_INGCOMP, pdf_text)
    )

    return student_data


if __name__ == "__main__":
    # Definir los argumentos de la línea de comandos
    parser = argparse.ArgumentParser(
        description="Extract student academic progress from PDF."
    )
    parser.add_argument("file_path", type=str, help="Path del archivo PDF")
    parser.add_argument(
        "--wir",
        action="store_true",
        help="Indica si buscar unidades curriculares intermedias",
    )

    # Parsear los argumentos
    args = parser.parse_args()

    # Extraer las unidades curriculares aprobadas
    student_data = get_student_data(args.file_path, args.wir)
    print(student_data)
