import os
import re
from typing import List

from app.models.grupos import Grupo
from app.models.unidades_curriculares import UnidadCurricular
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
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


def init_driver():
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--user-data-dir=/tmp/chrome-user-data")
    chrome_options.binary_location = os.environ.get("CHROME_BIN")

    service = ChromeService(executable_path=os.environ.get("CHROMEDRIVER_BIN"))

    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver


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


def get_groups_and_subjects_html(driver):
    navigate_to_groups_and_subjects(driver)

    groups_and_subjects_html = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "datosComposicion"))
    )

    return groups_and_subjects_html.get_attribute("outerHTML")


def scrape_groups_and_subjects():
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

        return parent_groups, child_groups, subjects
    finally:
        driver.quit()
