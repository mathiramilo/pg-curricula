from enum import Enum

# Areas de formacion. Debemos tener un diccionario asi para cada carrera.
FORMATION_AREAS_INGCOMP = {
    "Materias Basicas": ["Matematica", "Ciencias Experimentales"],
    "Basico-Tec,Tecnicas e Integ.": [
        "Programacion",
        "Arquit, S.Op. y Redes de Comp.",
        "Int.Artificial y Robotica",
        "B.Datos y Sist. de Informacion",
        "Calculo Numerico y Simbolico",
        "Investigacion Operativa",
        "Ingenieria de Software",
        "A.Integ,Talleres,Pasant.y Proy",
        "Gestion en Organizaciones",
    ],
    "Materias Complementarias": ["Ciencias Humanas y Sociales"],
    "Materias Opcionales": ["Materias Opcionales"],
}

# Lineas a omitir en el procesado del PDF. Corresponden a lineas de texto de la cabecera y pie de pagina de las paginas.
LINES_TO_SKIP = [
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


# Estados de las UCs.
class Status(Enum):
    CURSO = "Curso"
    EXAMEN = "Examen"
