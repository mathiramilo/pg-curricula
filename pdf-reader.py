from functions import read_pdf, search_aprobed_subjects

# Areas de formacion
FORMATION_AREAS = {
    "Materias Basicas": ["Matematica", "Ciencias Experimentales"],
    "Basico-Tec, Tecnicas e Integ.": [
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


# Path del archivo PDF
file_path = "escolaridades/escolaridad-mathi.pdf"

# Leer archivo PDF
pdf_text = read_pdf(file_path)

# Buscar unidades curriculares aprobadas
aprobed_subjects = search_aprobed_subjects(FORMATION_AREAS, pdf_text)

# Mostrar unidades curriculares aprobadas formato JSON
print(aprobed_subjects)
