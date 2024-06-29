import json
import re

import PyPDF2

from consts import LINES_TO_SKIP, Status


def read_pdf(file_path) -> str:
    pdf_text = ""
    with open(file_path, "rb") as file:
        reader = PyPDF2.PdfReader(file)
        num_pages = len(reader.pages)

        for page in range(num_pages):
            page_obj = reader.pages[page]
            text = page_obj.extract_text()
            pdf_text += text

    return pdf_text


def is_subject(line: str, wir: bool) -> bool:
    """Detecta si una linea corresponde a una unidad curricular.

    Args:
        line (str): Linea de texto a analizar.
        wir (bool): Indica si se analiza con o sin resultados intermedios.

    Returns:
        bool: Retorna True si la linea corresponde a una unidad curricular, False en caso contrario.
    """

    regex = (
        r"^(Examen|Curso|\*\*\*\*\*\*\*\*\*\*|Resultado Final)"
        if wir
        else r"^(?:\d+|\*\*\*)"
    )
    return re.match(regex, line)


def skip_line(line: str) -> bool:
    """Detecta si la linea debe ser omitida. Ya que entre paginas del PDF se repiten ciertas lineas correspondientes a la cabecera y pie de pagina.

    Args:
        line (str): Linea a analizar.

    Returns:
        bool: Retorna True si la linea debe ser omitida, False en caso contrario.
    """

    for s in LINES_TO_SKIP:
        if line.startswith(s):
            return True

    return False


def extract_name(text):
    # Expresión regular para encontrar la fecha al inicio y el primer número después del nombre de la asignatura
    regex = r"\d{2}/\d{2}/\d{4}\s+(\d+|S/N)(\s+\d+)?"
    # Buscar la coincidencia en el texto y eliminarla
    result = re.sub(regex, "", text)
    return result.strip()


def get_calification(text):
    # Expresión regular para encontrar la calificación en el texto
    regex = r"\d+"
    # Buscar la coincidencia en el texto
    result = re.search(regex, text)
    return result.group() if result else None


def get_calification_and_note(text: str) -> tuple:
    """Utilizada en UCs opcionales para obtener la calificación y los créditos.

    Args:
        text (str): Texto a separar. Ejemplo: "1010".

    Returns:
        (int, int): Retorna una tupla con la calificación y los créditos.
    """
    if text[0] == "1":
        return text[:2], text[2:]
    return text[0], text[1:]


# Funcion para escolaridades con resultados intermedios -> Tiene en cuenta UCs con curso aprobado
def search_aprobed_subjects_intermediate_results(formation_areas, pdf_text) -> str:
    # Dicionario de unidades curriculares aprobadas
    aprobed_subjects = {
        "Materias Basicas": {"Matematica": [], "Ciencias Experimentales": []},
        "Basico-Tec,Tecnicas e Integ.": {
            "Programacion": [],
            "Arquit, S.Op. y Redes de Comp.": [],
            "Int.Artificial y Robotica": [],
            "B.Datos y Sist. de Informacion": [],
            "Calculo Numerico y Simbolico": [],
            "Investigacion Operativa": [],
            "Ingenieria de Software": [],
            "A.Integ,Talleres,Pasant.y Proy": [],
            "Gestion en Organizaciones": [],
        },
        "Materias Complementarias": {"Ciencias Humanas y Sociales": []},
        "Materias Opcionales": {"Materias Opcionales": []},
    }

    # Recolectar UCs aprobadas por area de formacion
    for area in formation_areas:
        for item in formation_areas[area]:
            item_idx = pdf_text.find("\n" + item.upper() + "\n")
            item_text = pdf_text[item_idx + len(item) + 2 : len(pdf_text)]
            item_lines = item_text.split("\n")
            lines = []

            for line in item_lines:
                if is_subject(line, wir=True):
                    lines.append(line)
                elif skip_line(line) or line == area.upper() or line == item.upper():
                    continue
                else:
                    break

            # print(lines)  # Debug

            # Filtrar los strings que comiencen con 'Resultado Final' y almacenar sus índices
            final_results = [
                (i, line)
                for i, line in enumerate(lines)
                if line.startswith("Resultado Final")
            ]

            # print(final_results)  # Debug

            for s in final_results:
                result = s[1]

                # Si el examen de la unidad curricular no fue aprobado se muestra "***" en el resultado final
                # Si el curso de la unidad curricular no fue aprobado se muestra "**********" en el curso
                if result.split(" ")[2].startswith("*"):
                    previous_line = lines[s[0] - 1]
                    # Curso reprobado
                    if previous_line.startswith("*"):
                        continue
                    # Curso aprobado
                    else:
                        date = previous_line.split(" ")[1]
                        name = " ".join(result.split(" ")[2:])

                        if area != "Materias Opcionales":
                            name = name[:-2]

                        # String -> "17/12/2022 9ARQUITECTURA DE COMPUTADORAS " | "17/12/2022 1 9ARQUITECTURA DE COMPUTADORAS "
                        name = extract_name(name)

                        aprobed_subjects[area][item].append(
                            {
                                "calification": None,
                                "date": date,
                                "credits": None,
                                "name": name,
                                "status": Status.CURSO.value,
                            }
                        )
                else:
                    # Si la unidad curricular fue aprobada se muestra => "Resultado Final: [Fecha] [Nota][Nombre UC] [Creditos]"
                    # Se obtiene informacion de la unidad curricular y se almacena en el diccionario aprobed_subjects
                    if area != "Materias Opcionales":
                        subject_info = result.split(" ")[2:]
                        date = subject_info[0]
                        calification = get_calification(subject_info[1])
                        credits = subject_info[-1]
                        name = extract_name(" ".join(subject_info[:-1]))

                        aprobed_subjects[area][item].append(
                            {
                                "calification": calification,
                                "date": date,
                                "credits": credits,
                                "name": name,
                                "status": Status.EXAMEN.value,
                            }
                        )
                    else:
                        subject_info = result.split(" ")[2:]
                        # ['26/07/2023', '1010', 'TRATAMIENTO', 'DE', 'IMAGENES', 'POR', 'COMPUTADORA']
                        # TODO: Creditos y Nota estan pegados, ver como podemos separarlo!
                        date = subject_info[0]
                        calification, credits = get_calification_and_note(
                            subject_info[1]
                        )
                        name = " ".join(subject_info[2:])

                        aprobed_subjects[area][item].append(
                            {
                                "calification": calification,
                                "date": date,
                                "credits": credits,
                                "name": name,
                                "status": Status.EXAMEN.value,
                            }
                        )

    # Retornar diccionario de unidades curriculares aprobadas en formato JSON
    return json.dumps(aprobed_subjects, indent=4)


# Funcion para escolaridades con resultados finales -> No tiene en cuenta UCs con curso aprobado
def search_aprobed_subjects_final_results(formation_areas, pdf_text) -> str:
    # Dicionario de unidades curriculares aprobadas
    aprobed_subjects = {
        "Materias Basicas": {"Matematica": [], "Ciencias Experimentales": []},
        "Basico-Tec, Tecnicas e Integ.": {
            "Programacion": [],
            "Arquit, S.Op. y Redes de Comp.": [],
            "Int.Artificial y Robotica": [],
            "B.Datos y Sist. de Informacion": [],
            "Calculo Numerico y Simbolico": [],
            "Investigacion Operativa": [],
            "Ingenieria de Software": [],
            "A.Integ,Talleres,Pasant.y Proy": [],
            "Gestion en Organizaciones": [],
        },
        "Materias Complementarias": {"Ciencias Humanas y Sociales": []},
        "Materias Opcionales": {"Materias Opcionales": []},
    }

    # Recolectar UCs aprobadas por area de formacion
    for area in formation_areas:
        for item in formation_areas[area]:
            item_idx = pdf_text.find("\n" + item.upper() + "\n")
            item_text = pdf_text[item_idx + len(item) + 2 : len(pdf_text)]
            item_lines = item_text.split("\n")
            lines = []

            for line in item_lines:
                if is_subject(line, wir=False):
                    lines.append(line)
                else:
                    break

            # print(lines) # Debug

            for s in lines:
                # Si la unidad curricular no fue aprobada se muestra "***" en la escolaridad
                if s[0] == "*":
                    continue

                # Si la unidad curricular fue aprobada se muestra => "[Nota] [Fecha] [Creditos] [Nombre UC]"
                # Se obtiene informacion de la unidad curricular y se almacena en el diccionario aprobed_subjects
                if area != "Materias Opcionales":
                    subject_info = s.split(" ")
                    calification = subject_info[0]
                    date = subject_info[1][1:]
                    credits = subject_info[2]
                    name = " ".join(subject_info[3:])

                    aprobed_subjects[area][item].append(
                        {
                            "calification": calification,
                            "date": date,
                            "credits": credits,
                            "name": name,
                        }
                    )
                else:
                    subject_info = s.split(" ")
                    calification = subject_info[-1]
                    date = subject_info[0]
                    credits = subject_info[-2]
                    name = " ".join(subject_info[1 : len(subject_info) - 3])

                    aprobed_subjects[area][item].append(
                        {
                            "calification": calification,
                            "date": date,
                            "credits": credits,
                            "name": name,
                        }
                    )

    return json.dumps(aprobed_subjects, indent=4)
