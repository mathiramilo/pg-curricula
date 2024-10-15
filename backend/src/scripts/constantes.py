from enum import Enum

# Areas de formacion. TODO: Debemos tener un diccionario asi para cada carrera.
AREAS_FORMACION_INGCOMP = {
    "Materias Basicas": ["MATEMATICA", "CIENCIAS EXPERIMENTALES"],
    "Basico-Tec,Tecnicas e Integ.": [
        "PROGRAMACION",
        "ARQUIT, S.OP. Y REDES DE COMP.",
        "INT.ARTIFICIAL Y ROBOTICA",
        "B.DATOS Y SIST. DE INFORMACION",
        "CALCULO NUMERICO Y SIMBOLICO",
        "INVESTIGACION OPERATIVA",
        "INGENIERIA DE SOFTWARE",
        "A.INTEG,TALLERES,PASANT.Y PROY",
        "GESTION EN ORGANIZACIONES",
    ],
    "Materias Complementarias": ["CIENCIAS HUMANAS Y SOCIALES"],
    "Materias Opcionales": ["MATERIAS OPCIONALES"],
}

# Lineas a omitir en el procesado del PDF. Corresponden a lineas de texto de la cabecera y pie de pagina de las paginas.
LINEAS_A_SALTEAR = [
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
    "Curso",
    "*",
]


# Tipo de aprobacion de las UCs.
class TipoAprobacion(Enum):
    CURSO = "Curso"
    EXAMEN = "Examen"
