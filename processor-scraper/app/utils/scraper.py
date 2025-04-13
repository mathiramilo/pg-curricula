import os

from selenium import webdriver
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
