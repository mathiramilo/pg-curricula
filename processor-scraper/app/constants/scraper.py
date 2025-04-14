BASE_URL = "https://bedelias.udelar.edu.uy/"

GROUP_PATTERN = (
    r"^(?P<code>[A-Za-z0-9]+)\s*-\s*(?P<name>.*?)\s*-\s*min:\s*(?P<credits>\d+)"
)
SUBJECT_PATTERN = (
    r"^(?P<code>[A-Za-z0-9]+)\s*-\s*(?P<name>.*?)\s*-\s*créditos:\s*(?P<credits>\d+)"
)
SOME_RULE_PATTERN = (
    r"^(?P<type>Curso|Examen) de la U\.C\.B:\s*(?P<code>\w+)\s*-\s*(?P<name>.+)$"
)

TOTAL_PAGES = 19


class NODE_TYPE:
    AND = "y"
    OR = "o"
    NOT = "no"
    DEFAULT = "default"


class DEFAULT_NODE_TYPE:
    SOME = "aprobación/es entre"
    UC = "u.c.b aprobada"
    UC_CURSO = "curso aprobado de la u.c.b"
    UC_EXAMEN = "examen aprobado de la u.c.b"
    CREDITOS_GRUPO = "créditos en el grupo"
    CREDITOS_PLAN = "créditos en el plan"
