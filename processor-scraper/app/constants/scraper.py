BASE_URL = "https://bedelias.udelar.edu.uy/"

GROUP_PATTERN = (
    r"^(?P<code>[A-Za-z0-9]+)\s*-\s*(?P<name>.*?)\s*-\s*min:\s*(?P<credits>\d+)"
)
SUBJECT_PATTERN = (
    r"^(?P<code>[A-Za-z0-9]+)\s*-\s*(?P<name>.*?)\s*-\s*créditos:\s*(?P<credits>\d+)"
)

TOTAL_PAGES = 19


class NODE_TYPE:
    AND = "y"
    OR = "o"
    NOT = "no"
    DEFAULT = "default"
