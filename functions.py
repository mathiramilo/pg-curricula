import json
import re

import PyPDF2


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


# Verificar si una linea corresponde a una unidad curricular
def is_subject(line) -> bool:
    regex = r"^(?:\d+|\*\*\*)"
    return re.match(regex, line)


def search_aprobed_subjects(formation_areas, pdf_text) -> str:
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
                if is_subject(line):
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
