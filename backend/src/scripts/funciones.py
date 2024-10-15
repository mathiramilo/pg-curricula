import json
import re

import PyPDF2
from constantes import LINEAS_A_SALTEAR, TipoAprobacion


def leer_pdf(ubicacion_archivo: str) -> str:
    texto_pdf = ""
    with open(ubicacion_archivo, "rb") as archivo:
        reader = PyPDF2.PdfReader(archivo)
        numero_paginas = len(reader.pages)

        for pagina in range(numero_paginas):
            pagina_obj = reader.pages[pagina]
            texto = pagina_obj.extract_text()
            texto_pdf += texto

    return texto_pdf


def es_uc(linea: str, conResultadosIntermedios: bool) -> bool:
    """Detecta si una linea corresponde a una unidad curricular.

    Args:
        linea (str): Linea de texto a analizar.
        conResultadosIntermedios (bool): Indica si se analiza con o sin resultados intermedios.

    Returns:
        bool: Retorna True si la linea corresponde a una unidad curricular, False en caso contrario.
    """

    regex = (
        r"^(Examen|Curso|\*\*\*\*\*\*\*\*\*\*|Resultado Final)"
        if conResultadosIntermedios
        else r"^(?:\d+|\*\*\*|S/N)"
    )
    return re.match(regex, linea)


def saltear_linea(linea: str) -> bool:
    """Detecta si la linea debe ser omitida. Ya que entre paginas del PDF se repiten ciertas lineas correspondientes a la cabecera y pie de pagina.

    Args:
        linea (str): Linea a analizar.

    Returns:
        bool: Retorna True si la linea debe ser omitida, False en caso contrario.
    """

    for s in LINEAS_A_SALTEAR:
        if linea.startswith(s):
            return True

    return False


def extraer_nombre(texto: str) -> str:
    # Expresión regular para encontrar la fecha al inicio y el primer número después del nombre de la asignatura
    regex = r"\d{2}/\d{2}/\d{4}\s+(\d+|S/N)(\s+\d+)?"
    # Buscar la coincidencia en el texto y eliminarla
    resultado = re.sub(regex, "", texto)
    return resultado.strip()


def extraer_calificacion(texto: str) -> str:
    # Expresión regular para encontrar la calificación en el texto
    regex = r"\d+"
    # Buscar la coincidencia en el texto
    resultado = re.search(regex, texto)
    return resultado.group() if resultado else None


def extraer_calificacion_y_creditos(texto: str) -> tuple:
    """Utilizada en UCs opcionales para obtener la calificación y los créditos.

    Args:
        texto (str): Texto a separar. Ejemplo: "1010".

    Returns:
        (int, int): Retorna una tupla con la calificación y los créditos.
    """
    if texto[0] == "1":
        return texto[:2], texto[2:]
    return texto[0], texto[1:]


def es_con_resultados_intermedios(texto_pdf: str) -> bool:
    """Devuelve true si una escolaridad es con resultados finales e intermedios. False si es solo con resultados finales.

    Args:
        texto_pdf (str): Texto de la escolaridad a analizar.

    Returns:
        bool: Retorna true si es con resultados intermedio.
    """
    lineas = texto_pdf.split("\n")
    return not lineas[0].startswith("Resultados Finales")


# Funcion para escolaridades con resultados intermedios -> Tiene en cuenta UCs con curso aprobado
def buscar_ucs_aprobadas_con_resultados_intermedios(
    areas_de_formacion, texto_pdf
) -> str:
    # Dicionario de unidades curriculares aprobadas. TODO: Para que funcione con todas las carreras se debe tener uno de estos por carrera y seleccionarlo dependiendo de la carrera.
    informacion_estudiante = {
        "UCs Aprobadas": {},
        "Creditos Totales": 0,
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
    for area in areas_de_formacion:
        for grupo in areas_de_formacion[area]:
            grupo_idx = texto_pdf.find("\n" + grupo.upper() + "\n")
            grupo_texto = texto_pdf[grupo_idx + len(grupo) + 2 : len(texto_pdf)]
            grupo_lineas = grupo_texto.split("\n")
            lineas = []

            for linea in grupo_lineas:
                if es_uc(linea, conResultadosIntermedios=True):
                    lineas.append(linea)
                elif (
                    saltear_linea(linea)
                    or linea == area.upper()
                    or linea == grupo.upper()
                ):
                    continue
                else:
                    break

            # print(lineas)  # Debug

            # Filtrar los strings que comiencen con 'Resultado Final' y almacenar sus índices
            resultados_finales = [
                (i, linea)
                for i, linea in enumerate(lineas)
                if linea.startswith("Resultado Final")
            ]

            # print(resultados_finales)  # Debug

            for s in resultados_finales:
                resultado = s[1]

                # Si el examen de la unidad curricular no fue aprobado se muestra "***" en el resultado final
                # Si el curso de la unidad curricular no fue aprobado se muestra "**********" en el curso
                if resultado.split(" ")[2].startswith("*"):
                    linea_anterior = lineas[s[0] - 1]
                    # Curso reprobado
                    if linea_anterior.startswith("*"):
                        continue
                    # Curso aprobado
                    else:
                        fecha = linea_anterior.split(" ")[1]
                        nombre = " ".join(resultado.split(" ")[2:])

                        if area != "Materias Opcionales":
                            nombre = nombre[:-2]

                        # String -> "17/12/2022 9ARQUITECTURA DE COMPUTADORAS " | "17/12/2022 1 9ARQUITECTURA DE COMPUTADORAS "
                        nombre = extraer_nombre(nombre)

                        if nombre.startswith("*"):
                            continue

                        informacion_estudiante["UCs Aprobadas"][nombre] = {
                            "calificacion": None,
                            "fecha": fecha,
                            "creditos": None,
                            "nombre": nombre,
                            "tipoAprobacion": TipoAprobacion.CURSO.value,
                            "area": area,
                            "grupo": grupo,
                        }

                else:
                    # Si la unidad curricular fue aprobada se muestra => "Resultado Final: [Fecha] [Nota][Nombre UC] [Creditos]"
                    # Se obtiene informacion de la unidad curricular y se almacena en el diccionario informacion_estudiante
                    if area != "Materias Opcionales":
                        informacion_uc = resultado.split(" ")[2:]
                        fecha = informacion_uc[0]
                        calificacion = extraer_calificacion(informacion_uc[1])
                        creditos = informacion_uc[-1]
                        nombre = extraer_nombre(" ".join(informacion_uc[:-1]))

                        if nombre.startswith("*"):
                            continue

                        informacion_estudiante["UCs Aprobadas"][nombre] = {
                            "calificacion": calificacion,
                            "fecha": fecha,
                            "creditos": int(creditos),
                            "nombre": nombre,
                            "tipoAprobacion": TipoAprobacion.EXAMEN.value,
                            "area": area,
                            "grupo": grupo,
                        }
                        informacion_estudiante["Creditos Totales"] += int(creditos)
                        informacion_estudiante[grupo] += int(creditos)
                    else:
                        informacion_uc = resultado.split(" ")[2:]
                        # ['26/07/2023', '1010', 'TRATAMIENTO', 'DE', 'IMAGENES', 'POR', 'COMPUTADORA']
                        # Creditos y Nota estan pegados, creamos una funcion para separarlos
                        fecha = informacion_uc[0]
                        calificacion, creditos = extraer_calificacion_y_creditos(
                            informacion_uc[1]
                        )
                        nombre = " ".join(informacion_uc[2:])

                        if nombre.startswith("*"):
                            continue

                        informacion_estudiante["UCs Aprobadas"][nombre] = {
                            "calificacion": calificacion,
                            "fecha": fecha,
                            "creditos": int(creditos),
                            "nombre": nombre,
                            "tipoAprobacion": TipoAprobacion.EXAMEN.value,
                            "area": area,
                            "grupo": grupo,
                        }
                        informacion_estudiante["Creditos Totales"] += int(creditos)
                        informacion_estudiante[grupo] += int(creditos)

    # Retornar diccionario de unidades curriculares aprobadas en formato JSON
    return json.dumps(informacion_estudiante, indent=4)


# Funcion para escolaridades con resultados finales -> No tiene en cuenta UCs con curso aprobado
def buscar_ucs_aprobadas_con_resultados_finales(areas_de_formacion, texto_pdf) -> str:
    # Dicionario de unidades curriculares aprobadas
    informacion_estudiante = {
        "UCs Aprobadas": {},
        "Creditos Totales": 0,
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
    for area in areas_de_formacion:
        for grupo in areas_de_formacion[area]:
            grupo_idx = texto_pdf.find("\n" + grupo.upper() + "\n")
            grupo_texto = texto_pdf[grupo_idx + len(grupo) + 2 : len(texto_pdf)]
            grupo_lineas = grupo_texto.split("\n")
            lineas = []

            for linea in grupo_lineas:
                if es_uc(linea, conResultadosIntermedios=False):
                    lineas.append(linea)
                elif (
                    saltear_linea(linea)
                    or linea == area.upper()
                    or linea == grupo.upper()
                ):
                    continue
                else:
                    break

            # print(lineas)  # Debug

            for s in lineas:
                # Si la unidad curricular no fue aprobada se muestra "***" en la escolaridad
                if s[0] == "*":
                    continue

                # Si la unidad curricular fue aprobada se muestra => "[Nota] [Fecha] [Creditos] [Nombre UC]"
                # Se obtiene informacion de la unidad curricular y se almacena en el diccionario aprobed_subjects
                if area != "Materias Opcionales":
                    informacion_uc = s.split(" ")
                    calificacion = informacion_uc[0]
                    fecha = informacion_uc[1][1:]
                    creditos = informacion_uc[2]
                    nombre = " ".join(informacion_uc[3:])

                    if nombre.startswith("*"):
                        continue

                    informacion_estudiante["UCs Aprobadas"][nombre] = {
                        "calificacion": calificacion,
                        "fecha": fecha,
                        "creditos": int(creditos),
                        "nombre": nombre,
                        "tipoAprobacion": TipoAprobacion.EXAMEN.value,
                        "area": area,
                        "grupo": grupo,
                    }
                    informacion_estudiante["Creditos Totales"] += int(creditos)
                    informacion_estudiante[grupo] += int(creditos)
                else:
                    informacion_uc = s.split(" ")
                    calificacion = informacion_uc[-1]
                    fecha = informacion_uc[0]
                    creditos = informacion_uc[-2]
                    nombre = " ".join(informacion_uc[1 : len(informacion_uc) - 3])

                    if nombre.startswith("*"):
                        continue

                    informacion_estudiante["UCs Aprobadas"][nombre] = {
                        "calificacion": calificacion,
                        "fecha": fecha,
                        "creditos": int(creditos),
                        "nombre": nombre,
                        "tipoAprobacion": TipoAprobacion.EXAMEN.value,
                        "area": area,
                        "grupo": grupo,
                    }
                    informacion_estudiante["Creditos Totales"] += int(creditos)
                    informacion_estudiante[grupo] += int(creditos)

    return json.dumps(informacion_estudiante, indent=4)
