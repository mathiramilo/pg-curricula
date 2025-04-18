import re

BASE_URL = "https://bedelias.udelar.edu.uy/"

GROUP_PATTERN = (
    r"^(?P<code>[A-Za-z0-9]+)\s*-\s*(?P<name>.*?)\s*-\s*min:\s*(?P<credits>\d+)"
)
SUBJECT_PATTERN = (
    r"^(?P<code>[A-Za-z0-9]+)\s*-\s*(?P<name>.*?)\s*-\s*créditos:\s*(?P<credits>\d+)"
)
SOME_RULE_PATTERN = re.compile(
    r"""
    ^                            
    (?:
       (?P<type>Curso|Examen)\s+ 
       de\ la\ U\.C\.B:           
     |
       U\.C\.B\ aprobada:         
    )
    \s*(?P<code>\w+)\s*-\s*     
    (?P<name>.+)                  
    $
""",
    re.VERBOSE,
)

TOTAL_PAGES = 19


class NODE_TYPE:
    AND = "y"
    OR = "o"
    NOT = "no"
    GROUP_CREDITS = "cag"
    DEFAULT = "default"


class DEFAULT_NODE_TYPE:
    SOME = "aprobación/es entre"
    SOME_ACTIVITIES = "actividad/es entre"
    UC = "u.c.b aprobada"
    UC_CURSO = "curso aprobado de la u.c.b"
    UC_EXAMEN = "examen aprobado de la u.c.b"
    UC_INSCRIPTION = "inscripción a curso de la u.c.b"
    ACTIVITY = "actividad examen aprobada/reprobada en la u.c.b"
    CREDITOS_PLAN = "créditos en el plan"
