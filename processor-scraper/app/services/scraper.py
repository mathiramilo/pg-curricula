import re
import time
from typing import List

from app.models.grupos import Grupo
from app.models.unidades_curriculares import UnidadCurricular
from app.utils.scraper import init_driver
from bs4 import BeautifulSoup
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait

BASE_URL = "https://bedelias.udelar.edu.uy/"

GROUP_PATTERN = (
    r"^(?P<code>[A-Za-z0-9]+)\s*-\s*(?P<name>.*?)\s*-\s*min:\s*(?P<credits>\d+)"
)
SUBJECT_PATTERN = (
    r"^(?P<code>[A-Za-z0-9]+)\s*-\s*(?P<name>.*?)\s*-\s*créditos:\s*(?P<credits>\d+)"
)

TOTAL_PAGES = 19


def navigate_to_groups_and_subjects(driver):
    nav_element = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "PLANES DE ESTUDIO"))
    )
    nav_element.click()

    nav_link = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "Planes de estudio / Previas"))
    )
    nav_link.click()

    tec_nat_accordion = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "j_idt98:2:j_idt99_header"))
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", tec_nat_accordion)
    tec_nat_accordion.click()

    fing_element = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.XPATH, "//td[text()='FING - FACULTAD DE INGENIERÍA']")
        )
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", fing_element)
    fing_element.click()

    # Go to page 4, where "INGENIERIA EN COMPUTACION" is located
    page_4_link = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "4"))
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", page_4_link)
    page_4_link.click()

    row_toggler = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (
                By.XPATH,
                "//td[text()='INGENIERIA EN COMPUTACION']/preceding-sibling::td[1]/div",
            )
        )
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", row_toggler)
    row_toggler.click()

    info_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.ID, "datos1111:j_idt98:37:j_idt110:0:verComposicionPlan")
        )
    )
    info_button.click()


def navigate_to_previatures(driver):
    navigate_to_groups_and_subjects(driver)

    previatures_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "verSistemaPreviaturaPlan"))
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", previatures_button)
    previatures_button.click()


def go_to_next_page(driver, actual_page: int):
    next_page_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, str(actual_page + 1)))
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", next_page_button)
    next_page_button.click()


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


def get_previatures_tree_html(driver):
    previatures_tree_html = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "arbol"))
    )

    return previatures_tree_html.get_attribute("outerHTML")


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
                print("No match found (Parent Group)")

            child_group_elements = group_element.find_all(
                "li", attrs={"data-nodetype": "Grupo"}
            )

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
                    print("No match found (Child Group)")

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
                                grupo_padre=parent_group_code,
                                grupo_hijo=child_group_code,
                            )
                        )
                    else:
                        print("No match found (Subject)")

        execution_time = time.time() - start_time
        minutes, seconds = divmod(execution_time, 60)
        print(f"Completed in: {int(minutes)} minutes and {seconds:.2f} seconds")

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

        for i in range(1, TOTAL_PAGES):
            print(f"Scraping page {i} of previatures")

            previatures_list_html = get_previatures_list_html(driver)
            subjects = get_list_of_subjects(previatures_list_html)

            for data_ri, code in subjects:
                print(f"Scraping previatures for data_ri: {data_ri}...")
                previatures = get_previatures(driver, data_ri)
                previatures_object[code] = previatures

            go_to_next_page(driver, i)
            time.sleep(1)

        execution_time = time.time() - start_time
        minutes, seconds = divmod(execution_time, 60)
        print(f"Completed in: {int(minutes)} minutes and {seconds:.2f} seconds")

        return previatures_object
    finally:
        driver.quit()


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
            print("Error clicking the toggle:", e)

    expand_tree(driver)


def get_previatures(driver, data_ri):
    link_element = WebDriverWait(driver, 20).until(
        EC.element_to_be_clickable((By.XPATH, f"//tr[@data-ri='{data_ri}']/td[3]/a"))
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", link_element)
    link_element.click()

    expand_tree(driver)
    previatures_tree_html = get_previatures_tree_html(driver)
    soup = BeautifulSoup(previatures_tree_html, "html.parser")

    previatures = {}

    driver.back()

    return previatures


if __name__ == "__main__":
    scrape_previatures()
