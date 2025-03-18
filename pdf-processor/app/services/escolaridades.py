import re
from fastapi import File

from app.constants import escolaridades as escolaridades_constants
from app.models import escolaridades as escolaridades_models
from app.utils import pdf, escolaridades


def get_student_data(file: File) -> dict:
    pdf_text = pdf.read(file)

    with_intermediate_results = escolaridades.has_intermediate_results(pdf_text)

    # Buscar unidades curriculares aprobadas
    student_data = (
        get_student_data_with_intermediate_results(
            escolaridades_constants.INGENIERIA_COMPUTACION_FORMATION_AREAS, pdf_text
        )
        if with_intermediate_results
        else get_student_data_without_intermediate_results(
            escolaridades_constants.INGENIERIA_COMPUTACION_FORMATION_AREAS, pdf_text
        )
    )

    return student_data


# Funcion para escolaridades con resultados intermedios -> Tiene en cuenta UCs con curso aprobado
def get_student_data_with_intermediate_results(
    formation_areas, pdf_text
) -> dict:
    # Dicionario de unidades curriculares aprobadas. TODO: Para que funcione con todas las carreras se debe tener uno de estos por carrera y seleccionarlo dependiendo de la carrera.
    student_data = {
        "unidadesCurricularesAprobadas": {},
        "creditosTotales": 0,
        "MATEMATICA": 0,
        "CIENCIAS EXPERIMENTALES": 0,
        "PROGRAMACION": 0,
        "ARQUIT, S.OP. Y REDES DE COMP.": 0,
        "INT.ARTIFICIAL Y ROBOTICA": 0,
        "B.DATOS Y SIST. DE INFORMACION": 0,
        "CALCULO NUMERICO Y SIMBOLICO": 0,
        "INVESTIGACION OPERATIVA": 0,
        "INGENIERIA DE SOFTWARE": 0,
        "A.INTEG,TALLERES,PASANT.Y PROY": 0,
        "GESTION EN ORGANIZACIONES": 0,
        "CIENCIAS HUMANAS Y SOCIALES": 0,
        "MATERIAS OPCIONALES": 0,
    }

    # Recolectar UCs aprobadas por area de formacion
    for area in formation_areas:
        for group in formation_areas[area]:
            group_idx = pdf_text.find("\n" + group.upper() + "\n")
            group_text = pdf_text[group_idx + len(group) + 2 : len(pdf_text)]
            group_lines = group_text.split("\n")
            lines = []

            for line in group_lines:
                if escolaridades.line_is_unidad_curricular(line, with_intermediate_results=True):
                    lines.append(line)
                elif (
                    escolaridades.skip_line(line)
                    or line == area.upper()
                    or line == group.upper()
                ):
                    continue
                else:
                    break

            # Filtrar los strings que comiencen con 'Resultado Final' y almacenar sus índices
            final_results = [
                (i, line)
                for i, line in enumerate(lines)
                if line.startswith("Resultado Final")
            ]

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
                        fecha = previous_line.split(" ")[1]
                        nombre = " ".join(result.split(" ")[2:])

                        if area != "Materias Opcionales":
                            nombre = nombre[2:-2]

                        # Ej: String -> "17/12/2022 ExcelenteARQUITECTURA DE COMPUTADORAS " | "17/12/2022 1 ExcelenteARQUITECTURA DE COMPUTADORAS "
                        nombre = escolaridades.get_nombre(nombre)

                        if nombre.startswith("*"):
                            continue

                        student_data["unidadesCurricularesAprobadas"][nombre] = {
                            "concepto": None,
                            "fecha": fecha,
                            "creditosUC": None,
                            "codigoEnServicioUC": "",
                            "nombreUC": nombre,
                            "tipoAprobacion": escolaridades_models.ApprobationType.COURSE.value,
                            "nombreGrupoPadre": area,
                            "nombreGrupoHijo": group,
                        }

                else:
                    # Si la unidad curricular fue aprobada se muestra => "Resultado Final: [Fecha] [Nota][Nombre UC] [Creditos]"
                    # Se obtiene informacion de la unidad curricular y se almacena en el diccionario student_data
                    if area != "Materias Opcionales":
                        unidad_curricular_data = result.split(" ")[2:]
                        fecha = unidad_curricular_data[0]
                        creditos = unidad_curricular_data[-1]
                        concepto, nombre = escolaridades.get_concepto_y_nombre(" ".join(unidad_curricular_data[1:-1]))

                        if nombre.startswith("*"):
                            continue

                        student_data["unidadesCurricularesAprobadas"][nombre] = {
                            "concepto": concepto,
                            "fecha": fecha,
                            "creditosUC": int(creditos),
                            "codigoEnServicioUC": "",
                            "nombreUC": nombre,
                            "tipoAprobacion": escolaridades_models.ApprobationType.EXAM.value,
                            "nombreGrupoPadre": area,
                            "nombreGrupoHijo": group,
                        }
                        student_data["creditosTotales"] += int(creditos)
                        student_data[group] += int(creditos)
                    else:
                        unidad_curricular_data = result.split(" ")[2:]
                        # Ej: ['26/07/2023', 'Excelente10', 'TRATAMIENTO', 'DE', 'IMAGENES', 'POR', 'COMPUTADORA']
                        # Concepto y Creditos estan pegados, creamos una funcion para separarlos
                        fecha = unidad_curricular_data[0]

                        conceptoTieneEspacio = not re.search(r'\d', unidad_curricular_data[1])

                        text = unidad_curricular_data[1] if not conceptoTieneEspacio else f"{unidad_curricular_data[1]} {unidad_curricular_data[2]}"

                        concepto, creditos = escolaridades.get_concepto_y_creditos(text)

                        nombre = " ".join(unidad_curricular_data[2:] if not conceptoTieneEspacio else unidad_curricular_data[3:])

                        if nombre.startswith("*"):
                            continue

                        student_data["unidadesCurricularesAprobadas"][nombre] = {
                            "concepto": concepto,
                            "fecha": fecha,
                            "creditosUC": int(creditos),
                            "codigoEnServicioUC": "",
                            "nombreUC": nombre,
                            "tipoAprobacion": escolaridades_models.ApprobationType.EXAM.value,
                            "nombreGrupoPadre": area,
                            "nombreGrupoHijo": group,
                        }
                        student_data["creditosTotales"] += int(creditos)
                        student_data[group] += int(creditos)

    return student_data


# Funcion para escolaridades con resultados finales -> No tiene en cuenta UCs con curso aprobado
def get_student_data_without_intermediate_results(formation_areas, pdf_text) -> dict:
    # Dicionario de unidades curriculares aprobadas
    student_data = {
        "unidadesCurricularesAprobadas": {},
        "creditosTotales": 0,
        "MATEMATICA": 0,
        "CIENCIAS EXPERIMENTALES": 0,
        "PROGRAMACION": 0,
        "ARQUIT, S.OP. Y REDES DE COMP.": 0,
        "INT.ARTIFICIAL Y ROBOTICA": 0,
        "B.DATOS Y SIST. DE INFORMACION": 0,
        "CALCULO NUMERICO Y SIMBOLICO": 0,
        "INVESTIGACION OPERATIVA": 0,
        "INGENIERIA DE SOFTWARE": 0,
        "A.INTEG,TALLERES,PASANT.Y PROY": 0,
        "GESTION EN ORGANIZACIONES": 0,
        "CIENCIAS HUMANAS Y SOCIALES": 0,
        "MATERIAS OPCIONALES": 0,
    }

    # Recolectar UCs aprobadas por area de formacion
    for area in formation_areas:
        for group in formation_areas[area]:
            group_idx = pdf_text.find("\n" + group.upper() + "\n")
            group_text = pdf_text[group_idx + len(group) + 2 : len(pdf_text)]
            group_lines = group_text.split("\n")
            lines = []

            for line in group_lines:
                if escolaridades.line_is_unidad_curricular(line, with_intermediate_results=False):
                    lines.append(line)
                elif (
                    escolaridades.skip_line(line)
                    or line == area.upper()
                    or line == group.upper()
                ):
                    continue
                else:
                    break

            for s in lines:
                # Si la unidad curricular no fue aprobada se muestra "***" en la escolaridad
                if s[0] == "*":
                    continue

                # Si la unidad curricular fue aprobada se muestra => "[Nota] [Fecha] [Creditos] [Nombre UC]"
                # Se obtiene informacion de la unidad curricular y se almacena en el diccionario aprobed_subjects
                if area != "Materias Opcionales":
                    unidad_curricular_data = s.split(" ")
                    concepto = unidad_curricular_data[0]
                    fecha = unidad_curricular_data[1][1:]
                    creditos = unidad_curricular_data[2]
                    nombre = " ".join(unidad_curricular_data[3:])

                    if nombre.startswith("*"):
                        continue

                    student_data["unidadesCurricularesAprobadas"][nombre] = {
                        "concepto": concepto,
                        "fecha": fecha,
                        "creditosUC": int(creditos),
                        "codigoEnServicioUC": "",
                        "nombreUC": nombre,
                        "tipoAprobacion": escolaridades_models.ApprobationType.EXAM.value,
                        "nombreGrupoPadre": area,
                        "nombreGrupoHijo": group,
                    }
                    student_data["creditosTotales"] += int(creditos)
                    student_data[group] += int(creditos)
                else:
                    unidad_curricular_data = s.split(" ")
                    concepto = unidad_curricular_data[-1]
                    fecha = unidad_curricular_data[0]
                    creditos = unidad_curricular_data[-2]
                    nombre = " ".join(unidad_curricular_data[1 : len(unidad_curricular_data) - 3])

                    if nombre.startswith("*"):
                        continue

                    student_data["unidadesCurricularesAprobadas"][nombre] = {
                        "concepto": concepto,
                        "fecha": fecha,
                        "creditosUC": int(creditos),
                        "codigoEnServicioUC": "",
                        "nombreUC": nombre,
                        "tipoAprobacion": escolaridades_models.ApprobationType.EXAM.value,
                        "nombreGrupoPadre": area,
                        "nombreGrupoHijo": group,
                    }
                    student_data["creditosTotales"] += int(creditos)
                    student_data[group] += int(creditos)

    return student_data
