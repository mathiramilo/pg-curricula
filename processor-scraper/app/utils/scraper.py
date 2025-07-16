import os

from app.constants.scraper import SOME_RULE_PATTERN
from selenium import webdriver
from selenium.common.exceptions import TimeoutException
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


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


def login(driver, ci, password):
    login_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "Menu:button_cuenta_preLogin"))
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", login_button)
    login_button.click()

    username_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "username"))
    )
    username_input.send_keys(ci)

    password_input = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.ID, "password"))
    )
    password_input.send_keys(password)

    submit_button = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.NAME, "_eventId_proceed"))
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", submit_button)
    submit_button.click()

    try:
        error_message = WebDriverWait(driver, 3).until(
            EC.presence_of_element_located((By.CLASS_NAME, "form-error"))
        )
        if error_message.is_displayed():
            raise ValueError("Login failed. Please check your credentials.")
    except TimeoutException:
        pass


def navigate_to_course_inscriptions(driver):
    nav_element = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "INSCRIPCIONES"))
    )
    nav_element.click()

    nav_link = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.LINK_TEXT, "Inscripción"))
    )
    nav_link.click()

    fing_accordion = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable((By.ID, "datos1111:0:servSelec1111_header"))
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", fing_accordion)
    fing_accordion.click()

    courses_anchor = WebDriverWait(driver, 10).until(
        EC.element_to_be_clickable(
            (By.ID, "datos1111:0:datos1111:j_idt100:0:verCalendarioE")
        )
    )
    driver.execute_script("arguments[0].scrollIntoView(true);", courses_anchor)
    courses_anchor.click()


def parse_some_line(line: str):
    m = SOME_RULE_PATTERN.match(line)
    if not m:
        return None

    tipo = m.group("type")

    if tipo is None:
        tipo = "Curso"

    return {
        "type": tipo,
        "code": m.group("code"),
        "name": m.group("name").strip(),
    }
