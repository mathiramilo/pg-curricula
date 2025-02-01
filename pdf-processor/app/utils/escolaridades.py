import re

from app.constants import escolaridades


def has_intermediate_results(pdf_text: str) -> bool:
    """Devuelve true si una escolaridad es con resultados finales e intermedios. False si es solo con resultados finales.

    Args:
        pdf_text (str): Texto de la escolaridad a analizar.

    Returns:
        bool: Retorna true si es con resultados intermedio.
    """
     
    lines = pdf_text.split("\n")
    return not lines[0].startswith("Resultados Finales")


def line_is_unidad_curricular(line: str, with_intermediate_results: bool) -> bool:
    """Detecta si una linea corresponde a una unidad curricular.

    Args:
        line (str): Linea de texto a analizar.
        with_intermediate_results (bool): Indica si se analiza con o sin resultados intermedios.

    Returns:
        bool: Retorna True si la linea corresponde a una unidad curricular, False en caso contrario.
    """

    regex = (
        r"^(Examen|Curso|\*\*\*\*\*\*\*\*\*\*|Resultado Final)"
        if with_intermediate_results
        else r"^(?:\d+|\*\*\*|S/N)"
    )
    return re.match(regex, line)


def skip_line(line: str) -> bool:
    """Detecta si la linea debe ser omitida. Ya que entre paginas del PDF se repiten ciertas lineas correspondientes a la cabecera y pie de pagina.

    Args:
        line (str): Linea a analizar.

    Returns:
        bool: Retorna True si la linea debe ser omitida, False en caso contrario.
    """
  
    for s in escolaridades.LINES_TO_SKIP:
        if line.startswith(s):
            return True

    return False


def get_nombre(text: str) -> str:
    """Expresión regular para encontrar el nombre de una unidad curricular en el texto.

		Args:
				text (str): El texto en el cual buscar el nombre de la unidad curricular.

		Returns:
				str: El nombre de la unidad curricular encontrado en el texto.
		"""
    
    regex = r"\d{2}/\d{2}/\d{4}\s+(\d+|S/N)(\s+\d+)?"
    nombre = re.sub(regex, "", text)
    return nombre.strip()


def get_calificacion(text: str) -> str:
    """Expresion regular para encontrar la calificación en el texto.

		Args:
				text (str): El texto en el cual buscar la calificación.

		Returns:
				str: La calificación encontrada en el texto.
    """
    
    regex = r"\d+"
    calificacion = re.search(regex, text)
    return calificacion.group() if calificacion else None


def get_calificacion_y_creditos(text: str) -> tuple:
    """Utilizada en UCs opcionales para obtener la calificación y los créditos.

    Args:
        text (str): Texto a separar. Ejemplo: "1010".

    Returns:
        (int, int): Retorna una tupla con la calificación y los créditos.
    """
    
    if text[0] == "1":
        return text[:2], text[2:]
    return text[0], text[1:]
