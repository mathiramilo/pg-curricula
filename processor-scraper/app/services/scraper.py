import getpass
import re
import time
from typing import List

from app.constants.scraper import (
    BASE_URL,
    DEFAULT_NODE_TYPE,
    GROUP_PATTERN,
    NODE_TYPE,
    SUBJECT_PATTERN,
)
from app.models.grupos import Grupo
from app.models.previaturas import (
    TIPO_INSTANCIA,
    TIPO_REGLA,
    ReglaAnd,
    ReglaCreditosGrupo,
    ReglaCreditosPlan,
    ReglaNot,
    ReglaOr,
    ReglaPreviaturas,
    ReglaSome,
    ReglaUc,
)
from app.models.unidades_curriculares import BaseUnidadCurricular, UnidadCurricular
from app.utils.print import print_error, print_info, print_success, print_warning
from app.utils.scraper import (
    go_to_next_page,
    init_driver,
    login,
    navigate_to_course_inscriptions,
    navigate_to_groups_and_subjects,
    navigate_to_previatures,
    parse_some_line,
)
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


def get_groups_and_subjects_html(driver):
    navigate_to_groups_and_subjects(driver)

    groups_and_subjects_html = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "datosComposicion"))
    )

    return groups_and_subjects_html.get_attribute("outerHTML")


def get_previatures_list_html(driver):
    previatures_list_html = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "j_idt103_data"))
    )

    return previatures_list_html.get_attribute("outerHTML")


def get_list_of_subjects(html) -> List[tuple]:
    soup = BeautifulSoup(html, "html.parser")
    subjects = []

    rows = soup.find_all("tr")
    for row in rows:
        data_ri = row.get("data-ri")

        columns = row.find_all("td")

        code, _ = columns[0].text.split(" - ", 1)
        code = code.strip()
        type = columns[1].text.strip()

        if type == "Examen":
            continue

        subjects.append((data_ri, code))

    return subjects


def expand_tree(driver):
    collapsed_nodes = driver.find_elements(By.CLASS_NAME, "ui-treenode-collapsed")

    if not collapsed_nodes:
        return

    for node in collapsed_nodes:
        try:
            toggle_div = node.find_element(By.CSS_SELECTOR, "div")
            driver.execute_script("arguments[0].scrollIntoView(true);", toggle_div)
            toggle_div.click()
            time.sleep(1)
        except Exception as e:
            print_error(f"Error clicking the toggle: {e}")

    expand_tree(driver)


def get_previatures_root_node_html(driver):
    previatures_tree_html = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "arbol"))
    )
    previatures_tree_html = previatures_tree_html.find_element(By.CSS_SELECTOR, "tr")

    return previatures_tree_html.get_attribute("outerHTML")


def get_previatures(driver, data_ri):
    link_element = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.XPATH, f"//tr[@data-ri='{data_ri}']/td[3]/a"))
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", link_element)
    link_element.click()

    time.sleep(1)

    expand_tree(driver)
    previatures_root_node_html = get_previatures_root_node_html(driver)

    previatures = generate_previatures_object(previatures_root_node_html)

    driver.back()

    return previatures


def generate_previatures_object(node_html) -> ReglaPreviaturas:
    soup = BeautifulSoup(node_html, "html.parser")

    node_type_element = soup.find("td", attrs={"data-nodetype": True})
    node_type = node_type_element["data-nodetype"]

    match node_type:
        case NODE_TYPE.AND:
            children_element = soup.find("div", class_="ui-treenode-children")
            table_elements = children_element.find_all("table", recursive=False)
            tr_elements = [table.find("tr") for table in table_elements]

            return ReglaAnd(
                regla=TIPO_REGLA.AND,
                previas=[
                    generate_previatures_object(str(tr_element))
                    for tr_element in tr_elements
                ],
            )

        case NODE_TYPE.OR:
            children_element = soup.find("div", class_="ui-treenode-children")
            table_elements = children_element.find_all("table", recursive=False)
            tr_elements = [table.find("tr") for table in table_elements]

            return ReglaOr(
                regla=TIPO_REGLA.OR,
                previas=[
                    generate_previatures_object(str(tr_element))
                    for tr_element in tr_elements
                ],
            )

        case NODE_TYPE.NOT:
            children_element = soup.find("div", class_="ui-treenode-children")
            tr_element = children_element.find("tr")

            return ReglaNot(
                regla=TIPO_REGLA.NOT,
                previas=generate_previatures_object(str(tr_element)),
            )

        case NODE_TYPE.GROUP_CREDITS:
            label_element = node_type_element.find("span", class_="ui-treenode-label")
            rule_element = label_element.find("span")
            rule_text = rule_element.get_text(strip=True)
            content_text = rule_element.next_sibling.get_text(strip=True)

            credits = rule_text.split(" ")[0]
            code, name = content_text.split(" - ", 1)
            return ReglaCreditosGrupo(
                regla=TIPO_REGLA.CREDITOS_GRUPO,
                cantidad=credits,
                codigo=code,
                nombre=name,
            )

        case NODE_TYPE.DEFAULT:
            label_element = node_type_element.find("span", class_="ui-treenode-label")
            rule_element = label_element.find("span")
            rule_text = rule_element.get_text(strip=True)
            content_text = rule_element.next_sibling.get_text(strip=True)

            if (
                DEFAULT_NODE_TYPE.SOME in rule_text.lower()
                or DEFAULT_NODE_TYPE.SOME_ACTIVITIES in rule_text.lower()
            ):
                amount = rule_text.strip().split(" ")[0]
                subjects = content_text.split("\n")

                previas = []
                for subject in subjects:
                    parsed = parse_some_line(subject)

                    if not parsed:
                        continue

                    previas.append(
                        ReglaUc(
                            regla=TIPO_REGLA.UC,
                            codigo=parsed["code"],
                            nombre=parsed["name"],
                            tipoInstancia=(
                                TIPO_INSTANCIA.EXAMEN
                                if parsed["type"] == "Examen"
                                else TIPO_INSTANCIA.CURSO
                            ),
                        )
                    )

                return ReglaSome(
                    regla=TIPO_REGLA.SOME,
                    cantidad=amount,
                    previas=previas,
                )

            elif (
                DEFAULT_NODE_TYPE.UC in rule_text.lower()
                or DEFAULT_NODE_TYPE.UC_EXAMEN in rule_text.lower()
            ):
                code, name = content_text.split(" - ", 1)
                return ReglaUc(
                    regla=TIPO_REGLA.UC,
                    codigo=code,
                    nombre=name,
                    tipoInstancia=TIPO_INSTANCIA.EXAMEN,
                )

            elif (
                DEFAULT_NODE_TYPE.UC_CURSO in rule_text.lower()
                or DEFAULT_NODE_TYPE.UC_INSCRIPTION in rule_text.lower()
                or DEFAULT_NODE_TYPE.ACTIVITY in rule_text.lower()
            ):
                code, name = content_text.split(" - ", 1)
                return ReglaUc(
                    regla=TIPO_REGLA.UC,
                    codigo=code,
                    nombre=name,
                    tipoInstancia=TIPO_INSTANCIA.CURSO,
                )

            elif DEFAULT_NODE_TYPE.CREDITOS_PLAN in rule_text.lower():
                credits = rule_text.split(" ")[0]
                return ReglaCreditosPlan(
                    regla=TIPO_REGLA.CREDITOS_PLAN,
                    cantidad=credits,
                )

            else:
                print_warning(f"Default node type not recognized: {rule_text}")
                return None

        case _:
            print_warning(f"Rule not recognized: {node_type}")
            return None


def get_current_subjects_list_html(driver):
    previatures_list_html = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "j_idt163_data"))
    )

    return previatures_list_html.get_attribute("outerHTML")


def get_list_of_current_subjects(html) -> List[tuple]:
    soup = BeautifulSoup(html, "html.parser")
    subjects = []

    rows = soup.find_all("tr")
    for row in rows:
        columns = row.find_all("td")

        _, code = columns[0].text.split(" - ", 1)
        code = code.strip()

        name = columns[1].text.strip()

        subjects.append(BaseUnidadCurricular(codigo=code, nombre=name))

    return subjects


def scrape_groups_and_subjects():
    start_time = time.time()

    driver = init_driver()
    driver.get(BASE_URL)

    try:
        groups_and_subjects_html = get_groups_and_subjects_html(driver)

        soup = BeautifulSoup(groups_and_subjects_html, "html.parser")

        parent_groups: List[Grupo] = []
        child_groups: List[Grupo] = []
        subjects: List[UnidadCurricular] = []

        all_group_elements = soup.find_all("li", attrs={"data-nodetype": "Grupo"})

        parent_group_elements = [
            li
            for li in all_group_elements
            if li.find_parent("li", attrs={"data-nodetype": "Grupo"}) is None
        ]

        for group_element in parent_group_elements:
            content = group_element.find("div", class_="ui-treenode-content")
            group_data = content.find("span", class_="ui-treenode-label").text.strip()

            match = re.search(GROUP_PATTERN, group_data, re.IGNORECASE)
            if match:
                parent_group_code = match.group("code")
                parent_group_name = match.group("name")
                min_credits = match.group("credits")

                parent_groups.append(
                    Grupo(
                        codigo=parent_group_code,
                        nombre=parent_group_name,
                        min_creditos=min_credits,
                    )
                )
            else:
                print_warning("No match found (Parent Group)")

            child_group_elements = group_element.find_all(
                "li", attrs={"data-nodetype": "Grupo"}
            )

            # If there are no child groups, we assume this is "Materias Opcionales" group
            if not child_group_elements:
                subject_elements = group_element.find_all(
                    "li", attrs={"data-nodetype": "Materia"}
                )

                for subject_element in subject_elements:
                    subject_content = subject_element.find(
                        "div", class_="ui-treenode-content"
                    )
                    subject_data = subject_content.find(
                        "span", class_="ui-treenode-label"
                    ).text.strip()

                    match = re.search(SUBJECT_PATTERN, subject_data, re.IGNORECASE)
                    if match:
                        subject_code = match.group("code")
                        subject_name = match.group("name")
                        credits = match.group("credits")

                        subjects.append(
                            UnidadCurricular(
                                codigo=subject_code,
                                nombre=subject_name,
                                creditos=credits,
                                codigo_grupo_padre=parent_group_code,
                                nombre_grupo_padre=parent_group_name,
                                codigo_grupo_hijo=parent_group_code,
                                nombre_grupo_hijo=parent_group_name,
                            )
                        )
                    else:
                        print_warning("No match found (Subject)")

            for child_group_element in child_group_elements:
                child_content = child_group_element.find(
                    "div", class_="ui-treenode-content"
                )
                child_group_data = child_content.find(
                    "span", class_="ui-treenode-label"
                ).text.strip()

                match = re.search(GROUP_PATTERN, child_group_data, re.IGNORECASE)
                if match:
                    child_group_code = match.group("code")
                    child_group_name = match.group("name")
                    min_credits = match.group("credits")

                    child_groups.append(
                        Grupo(
                            codigo=child_group_code,
                            nombre=child_group_name,
                            min_creditos=min_credits,
                        )
                    )
                else:
                    print_warning("No match found (Child Group)")

                subject_elements = child_group_element.find_all(
                    "li", attrs={"data-nodetype": "Materia"}
                )

                for subject_element in subject_elements:
                    subject_content = subject_element.find(
                        "div", class_="ui-treenode-content"
                    )
                    subject_data = subject_content.find(
                        "span", class_="ui-treenode-label"
                    ).text.strip()

                    match = re.search(SUBJECT_PATTERN, subject_data, re.IGNORECASE)
                    if match:
                        subject_code = match.group("code")
                        subject_name = match.group("name")
                        credits = match.group("credits")

                        subjects.append(
                            UnidadCurricular(
                                codigo=subject_code,
                                nombre=subject_name,
                                creditos=credits,
                                codigo_grupo_padre=parent_group_code,
                                nombre_grupo_padre=parent_group_name,
                                codigo_grupo_hijo=child_group_code,
                                nombre_grupo_hijo=child_group_name,
                            )
                        )
                    else:
                        print_warning("No match found (Subject)")

        execution_time = time.time() - start_time
        minutes, seconds = divmod(execution_time, 60)
        print_success(f"Completed in: {int(minutes)} minutes and {seconds:.2f} seconds")

        return parent_groups, child_groups, subjects
    finally:
        driver.quit()


def scrape_previatures():
    start_time = time.time()

    driver = init_driver()
    driver.get(BASE_URL)

    previatures_object = {}

    try:
        navigate_to_previatures(driver)

        i = 1
        while True:
            print_info(f"Scraping page {i} of previatures")

            previatures_list_html = get_previatures_list_html(driver)
            subjects = get_list_of_subjects(previatures_list_html)

            for data_ri, code in subjects:
                print(f"Scraping previatures for data_ri: {data_ri}...")
                previatures = get_previatures(driver, data_ri)
                previatures_object[code] = previatures

            try:
                go_to_next_page(driver, i)
            except:
                print_info(f"Final page reached: {i}")
                break

            i += 1
            time.sleep(1)

        execution_time = time.time() - start_time
        minutes, seconds = divmod(execution_time, 60)
        print_success(f"Completed in: {int(minutes)} minutes and {seconds:.2f} seconds")

        return previatures_object
    finally:
        driver.quit()


def scrape_current_subjects():
    start_time = time.time()

    ci = input("Enter your CI: ")
    password = getpass.getpass("Enter your password: ")

    if not ci or not password:
        raise ValueError("CI and password must be provided.")

    print_info("Starting scraping current subjects...")

    driver = init_driver()
    driver.get(BASE_URL)

    current_subjects = []

    try:
        login(driver, ci, password)
        navigate_to_course_inscriptions(driver)

        i = 1
        while True:
            print(f"Scraping page {i} of current subjects")

            current_subjects_list_html = get_current_subjects_list_html(driver)
            page_current_subjects = get_list_of_current_subjects(
                current_subjects_list_html
            )

            current_subjects.extend(page_current_subjects)

            try:
                go_to_next_page(driver, i)
            except:
                print_info(f"Final page reached: {i}")
                break

            i += 1
            time.sleep(1)

        execution_time = time.time() - start_time
        minutes, seconds = divmod(execution_time, 60)
        print_success(f"Completed in: {int(minutes)} minutes and {seconds:.2f} seconds")

        return current_subjects
    except ValueError as e:
        print_error(e)
        driver.quit()
    finally:
        driver.quit()
