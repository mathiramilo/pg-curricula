from consts import FORMATION_AREAS_INGCOMP
from pdf_reader import (
    read_pdf,
    search_aprobed_subjects_final_results,
    search_aprobed_subjects_intermediate_results,
)

# Path del archivo PDF
FILE_PATH = "./escolaridades/esc-ri.pdf"


def extract_subjects_from_pdf(file_path: str, wir: bool) -> dict:
    # Leer archivo PDF
    pdf_text = read_pdf(file_path)

    # Buscar unidades curriculares aprobadas
    aprobed_subjects = (
        search_aprobed_subjects_intermediate_results(FORMATION_AREAS_INGCOMP, pdf_text)
        if wir
        else search_aprobed_subjects_final_results(FORMATION_AREAS_INGCOMP, pdf_text)
    )

    return aprobed_subjects


aprobed_subjects = extract_subjects_from_pdf(FILE_PATH, wir=True)
print(aprobed_subjects)
