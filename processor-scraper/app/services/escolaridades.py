import re

from app.constants.escolaridades import INGENIERIA_COMPUTACION_FORMATION_AREAS
from app.models.escolaridades import (
    InformacionEstudiante,
    TipoAprobacion,
    UnidadCurricularAprobada,
)
from app.utils import escolaridades, pdf
from fastapi import File


def get_student_data(file: File) -> InformacionEstudiante:
    pdf_text = pdf.read(file)

    with_intermediate_results = escolaridades.has_intermediate_results(pdf_text)

    student_data = (
        get_student_data_with_intermediate_results(
            INGENIERIA_COMPUTACION_FORMATION_AREAS, pdf_text
        )
        if with_intermediate_results
        else get_student_data_without_intermediate_results(
            INGENIERIA_COMPUTACION_FORMATION_AREAS, pdf_text
        )
    )

    return student_data


def get_student_data_with_intermediate_results(
    formation_areas, pdf_text
) -> InformacionEstudiante:
    student_data = {
        "unidadesCurricularesAprobadas": {},
        "creditosTotales": 0,
        "modulosTaller": 0,
        "modulosExtension": 0,
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

    for area in formation_areas:
        for group in formation_areas[area]:
            group_idx = pdf_text.find("\n" + group.upper() + "\n")
            group_text = pdf_text[group_idx + len(group) + 2 : len(pdf_text)]
            group_lines = group_text.split("\n")
            lines = []

            for line in group_lines:
                if escolaridades.line_is_unidad_curricular(
                    line, with_intermediate_results=True
                ):
                    lines.append(line)
                elif (
                    escolaridades.skip_line(line)
                    or line == area.upper()
                    or line == group.upper()
                ):
                    continue
                else:
                    break

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

                        student_data["unidadesCurricularesAprobadas"][nombre] = (
                            UnidadCurricularAprobada(
                                concepto=None,
                                fecha=fecha,
                                creditos=None,
                                codigo="",
                                nombre=nombre,
                                tipoAprobacion=TipoAprobacion.COURSE.value,
                                nombreGrupoPadre=area,
                                nombreGrupoHijo=group,
                            )
                        )
                else:
                    # Si la unidad curricular fue aprobada se muestra => "Resultado Final: [Fecha] [Nota][Nombre UC] [Creditos]"
                    if area != "Materias Opcionales":
                        unidad_curricular_data = result.split(" ")[2:]
                        fecha = unidad_curricular_data[0]
                        creditos = unidad_curricular_data[-1]
                        concepto, nombre = escolaridades.get_concepto_y_nombre(
                            " ".join(unidad_curricular_data[1:-1])
                        )

                        if nombre.startswith("*"):
                            continue

                        student_data["unidadesCurricularesAprobadas"][nombre] = (
                            UnidadCurricularAprobada(
                                concepto=concepto,
                                fecha=fecha,
                                creditos=int(creditos),
                                codigo="",
                                nombre=nombre,
                                tipoAprobacion=TipoAprobacion.EXAM.value,
                                nombreGrupoPadre=area,
                                nombreGrupoHijo=group,
                            )
                        )
                        student_data["creditosTotales"] += int(creditos)
                        student_data["modulosTaller"] += (
                            int(creditos) if "MODULO DE TALLER" in nombre else 0
                        )
                        student_data["modulosExtension"] += (
                            int(creditos) if "MODULO DE EXTENSION" in nombre else 0
                        )
                        student_data[group] += int(creditos)
                    else:
                        unidad_curricular_data = result.split(" ")[2:]
                        # Ej: ['26/07/2023', 'Excelente10', 'TRATAMIENTO', 'DE', 'IMAGENES', 'POR', 'COMPUTADORA']
                        fecha = unidad_curricular_data[0]

                        conceptoTieneEspacio = not re.search(
                            r"\d", unidad_curricular_data[1]
                        )

                        text = (
                            unidad_curricular_data[1]
                            if not conceptoTieneEspacio
                            else f"{unidad_curricular_data[1]} {unidad_curricular_data[2]}"
                        )

                        concepto, creditos = escolaridades.get_concepto_y_creditos(text)

                        nombre = " ".join(
                            unidad_curricular_data[2:]
                            if not conceptoTieneEspacio
                            else unidad_curricular_data[3:]
                        )

                        if nombre.startswith("*"):
                            continue

                        student_data["unidadesCurricularesAprobadas"][nombre] = (
                            UnidadCurricularAprobada(
                                concepto=concepto,
                                fecha=fecha,
                                creditos=int(creditos),
                                codigo="",
                                nombre=nombre,
                                tipoAprobacion=TipoAprobacion.EXAM.value,
                                nombreGrupoPadre=area,
                                nombreGrupoHijo=group,
                            )
                        )
                        student_data["creditosTotales"] += int(creditos)
                        student_data[group] += int(creditos)

    return student_data


# Funcion para escolaridades con resultados finales -> No tiene en cuenta UCs con curso aprobado
def get_student_data_without_intermediate_results(
    formation_areas, pdf_text
) -> InformacionEstudiante:
    student_data = {
        "unidadesCurricularesAprobadas": {},
        "creditosTotales": 0,
        "modulosTaller": 0,
        "modulosExtension": 0,
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

    for area in formation_areas:
        for group in formation_areas[area]:
            group_idx = pdf_text.find("\n" + group.upper() + "\n")
            group_text = pdf_text[group_idx + len(group) + 2 : len(pdf_text)]
            group_lines = group_text.split("\n")
            lines = []

            for line in group_lines:
                if escolaridades.line_is_unidad_curricular(
                    line, with_intermediate_results=False
                ):
                    lines.append(line)
                elif (
                    escolaridades.skip_line(line)
                    or line == area.upper()
                    or line == group.upper()
                ):
                    continue
                else:
                    print(line)
                    break

            for s in lines:
                # Si la unidad curricular no fue aprobada se muestra "***" en la escolaridad
                if s[0] == "*":
                    continue

                # Si la unidad curricular fue aprobada se muestra => "[Cant. Reprobaciones][Fecha] [Creditos] [Nombre UC] [Concepto]"
                if area != "Materias Opcionales":
                    unidad_curricular_data = s.split(" ")
                    fecha = unidad_curricular_data[0][1:]
                    creditos = unidad_curricular_data[1]
                    nombre, concepto = escolaridades.get_nombre_y_concepto(
                        " ".join(unidad_curricular_data[2:])
                    )

                    if nombre.startswith("*"):
                        continue

                    student_data["unidadesCurricularesAprobadas"][nombre] = (
                        UnidadCurricularAprobada(
                            concepto=concepto,
                            fecha=fecha,
                            creditos=int(creditos),
                            codigo="",
                            nombre=nombre,
                            tipoAprobacion=TipoAprobacion.EXAM.value,
                            nombreGrupoPadre=area,
                            nombreGrupoHijo=group,
                        )
                    )
                    student_data["creditosTotales"] += int(creditos)
                    student_data["modulosTaller"] += (
                        int(creditos) if "MODULO DE TALLER" in nombre else 0
                    )
                    student_data["modulosExtension"] += (
                        int(creditos) if "MODULO DE EXTENSION" in nombre else 0
                    )
                    student_data[group] += int(creditos)
                else:
                    # Unidades curriculares del area Materias Opcionales se muestran diferente => "[Fecha] [Nombre UC] [Cant. Reprobaciones] [Creditos] [Concepto]"
                    unidad_curricular_data = s.split(" ")
                    fecha = unidad_curricular_data[0]
                    creditos = unidad_curricular_data[-2]
                    nombre, creditos, concepto = (
                        escolaridades.get_nombre_creditos_y_concepto(
                            " ".join(unidad_curricular_data[1:])
                        )
                    )

                    if nombre.startswith("*"):
                        continue

                    student_data["unidadesCurricularesAprobadas"][nombre] = (
                        UnidadCurricularAprobada(
                            concepto=concepto,
                            fecha=fecha,
                            creditos=int(creditos),
                            codigo="",
                            nombre=nombre,
                            tipoAprobacion=TipoAprobacion.EXAM.value,
                            nombreGrupoPadre=area,
                            nombreGrupoHijo=group,
                        )
                    )
                    student_data["creditosTotales"] += int(creditos)
                    student_data[group] += int(creditos)

    return student_data
