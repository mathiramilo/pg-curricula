import os

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service as ChromeService


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
