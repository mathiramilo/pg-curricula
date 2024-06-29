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


# Verificar si una linea corresponde a una unidad curricular (With Intermediate Results)
def is_subject_wir(line) -> bool:
    regex = r"^(Examen|Curso|\*\*\*\*\*\*\*\*\*\*|Resultado Final)"
    return re.match(regex, line)


# Verificar si una linea corresponde a una unidad curricular (Without Intermediate Results)
def is_subject(line) -> bool:
    regex = r"^(?:\d+|\*\*\*)"
    return re.match(regex, line)


def get_letters(text):
    # Expresión regular para encontrar todas las letras
    regex = r"[^a-zA-Z\s]"
    # Encontrar todas las letras
    result = re.sub(regex, "", text)
    return result.strip()


def delete_letters(text):
    # Expresión regular para encontrar todas las letras
    regex = r"[a-zA-Z]"
    # Reemplazar todas las letras con una cadena vacía
    result = re.sub(regex, "", text)
    return result


def skip_line(line) -> bool:
    lines_to_skip = [
        "Código",
        "Verificar",
        "Página",
        "Escala de Notas",
        "Cambio de Plan",
        "Plan",
        "En cursoEstado Ingreso",
        "INGENIERIA EN COMPUTACION",
        "FACULTAD DE INGENIERÍA",
        "CERTIFICADO DE ESCOLARIDAD",
        "Resultados Finales e Intermedios",
        "Normal Tipo de Inscripción: En curso Estado:",
        "Aprobación",
        "Unidad Curricular",
        "Nota  FechaCant.",
        "sin",
        "validezCant.",
        "Reproba",
        "-cionesCred Actividad",
    ]

    for s in lines_to_skip:
        if line.startswith(s):
            return True

    return False


def search_aprobed_subjects_with_intermediate_results(formation_areas, pdf_text) -> str:
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
                if is_subject_wir(line):
                    lines.append(line)
                elif skip_line(line) or line == area.upper() or line == item.upper():
                    continue
                else:
                    break

            print(lines)  # Debug

            # Filtrar los strings que comiencen con 'Resultado Final' y almacenar sus índices
            final_results = [
                (i, line)
                for i, line in enumerate(lines)
                if line.startswith("Resultado Final")
            ]

            print(final_results)  # Debug

            for s in final_results:
                result = s[1]

                # Si el examen de la unidad curricular no fue aprobado se muestra "***" en el resultado final
                # Si el curso de la unidad curricular no fue aprobado se muestra "**********" en el curso
                if result.split(" ")[2].startswith(""):
                    previous_line = lines[s[0] - 1]
                    if previous_line.startswith("*"):  # Curso reprobado
                        print("MATERIA REPROBADA")
                        continue
                    else:  # Curso aprobado
                        date = previous_line.split(" ")[1]
                        print(" ".join(result.split(" ")[2:]))
                        name = " ".join(result.split(" ")[2:])
                        name = name[
                            :-2
                        ]  # TODO: Para materias opcionales esto no funciona bien!

                        aprobed_subjects[area][item].append(
                            {
                                "calification": None,
                                "date": date,
                                "credits": None,
                                "name": name,
                                "status": "Curso",
                            }
                        )

                # Si la unidad curricular fue aprobada se muestra => "[Nota] [Fecha] [Creditos] [Nombre UC]"
                # Se obtiene informacion de la unidad curricular y se almacena en el diccionario aprobed_subjects
                # if area != "Materias Opcionales":
                #     subject_info = s.split(" ")
                #     calification = subject_info[0]
                #     date = subject_info[1][1:]
                #     credits = subject_info[2]
                #     name = " ".join(subject_info[3:])

                #     aprobed_subjects[area][item].append(
                #         {
                #             "calification": calification,
                #             "date": date,
                #             "credits": credits,
                #             "name": name,
                #         }
                #     )
                # else:
                #     subject_info = s.split(" ")
                #     calification = subject_info[-1]
                #     date = subject_info[0]
                #     credits = subject_info[-2]
                #     name = " ".join(subject_info[1 : len(subject_info) - 3])

                #     aprobed_subjects[area][item].append(
                #         {
                #             "calification": calification,
                #             "date": date,
                #             "credits": credits,
                #             "name": name,
                #         }
                #     )

    return json.dumps(aprobed_subjects, indent=4)


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
