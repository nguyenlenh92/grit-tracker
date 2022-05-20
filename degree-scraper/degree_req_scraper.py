import json
import os
import re
import sys
import threading

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.support.relative_locator import locate_with


def scrape_degree_req():
    service = Service(executable_path=ChromeDriverManager().install())
    options = Options()
    options.page_load_strategy = 'normal'
    options.headless = True
    options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(service=service, options=options)
    umbc_program_page = 'https://catalog.umbc.edu/content.php?catoid=28&navoid=1822'
    
    driver.get(umbc_program_page)
    driver.implicitly_wait(1)
    links_table = driver.find_element(By.XPATH, '/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr/td/table/tbody/tr[3]/td/table[2]')
    program_links_elem = links_table.find_elements(By.TAG_NAME, 'a')


    program_links = [link.get_attribute('href') for link in program_links_elem if (link.get_attribute(
        'href') and re.search("preview_program\.php\?catoid=28&poid=\d{4}$", link.get_attribute('href')))]
    
    # testing only cmsc b.s.
    # program_links = [
    #     'https://catalog.umbc.edu/preview_program.php?catoid=28&poid=5030']
    dirname = os.path.dirname(__file__)
    folder = os.path.join(dirname, 'programs')
    
    if not os.path.exists(folder):
        os.makedirs(folder)
        
    for program in program_links:
        umbc_degree_page = program
        driver.get(umbc_degree_page)
        driver.implicitly_wait(0.01)

        degree = driver.find_element(By.ID, 'acalog-page-title')
        # /html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[1]
        requirements_list = driver.find_elements(By.CLASS_NAME, 'acalog-core')
        # requirements_list = driver.find_elements(
            # By.XPATH, "/html/body/table/tbody/tr[3]/td[2]/table/tbody/tr[2]/td[2]/table/tbody/tr/td/table/tbody/tr[2]/td/div/div[@class='acalog-core']")
        requirements_dict = {}
        for requirement in requirements_list:
            header = requirement.text.split('\n')[0]
            bullets = requirement.find_elements(By.TAG_NAME, 'li')
            description = requirement.find_elements(By.TAG_NAME, 'p')
            if description and bullets:
                requirements_dict[header] = {description[0].text : [bullet.text for bullet in bullets]}
            elif description and not bullets:
                requirements_dict[header] = description[0].text
            elif not description and bullets:
                requirements_dict[header] = [bullet.text for bullet in bullets]

        file = '-'.join((degree.text).split('/'))
        dirname = os.path.dirname("../back-end/programs")

        if not os.path.exists(dirname):
            os.makedirs(dirname)
            
        filename = os.path.join(
            dirname, f'programs/{file}.json')
        with open(filename, 'w') as json_file:
            json.dump(requirements_dict, json_file)
    
    return 0
if __name__ == "__main__":
    scrape_degree_req()
