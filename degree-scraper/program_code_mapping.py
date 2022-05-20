from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
import json
import re
import sys
import os
import threading


def fix_date(programs_fullnames, programs_prefixes):

    programs_prefixes = [prefix.strip() for prefix in programs_prefixes]
    programs_fullnames = [fullname.strip() for fullname in programs_fullnames]
    programs_prefixes = programs_prefixes[1:len(programs_prefixes) - 1]
    programs_fullnames = programs_fullnames[1:len(programs_fullnames) - 1]
    programs_fullnames.remove('Management of Aging Services')
    programs_fullnames.insert(1, 'Management of Aging Services')
    programs_fullnames.insert(15, 'Computer Science')
    programs_fullnames.insert(18, 'Accounting')
    programs_fullnames.remove('Emergency Health Services')
    programs_fullnames.insert(21, 'Emergency Health Services')
    programs_fullnames.remove('Chemical Engineering')
    programs_fullnames.insert(23, 'Chemical Engineering')
    programs_fullnames.remove('Mechanical Engineering')
    programs_fullnames.insert(27, 'Mechanical Engineering')
    programs_fullnames.insert(29, 'Finance')
    programs_fullnames.remove('Grand Challenge Scholars Program')
    programs_fullnames.insert(32, 'Grand Challenge Scholars Program')
    programs_fullnames.remove("Gender and Women's Studies")
    programs_fullnames.insert(37, "Gender and Women's Studies")
    programs_fullnames.remove("Human Context Science & Technology")
    programs_fullnames.insert(39, "Human Context Science & Technology")
    programs_fullnames[33], programs_fullnames[34] = programs_fullnames[34], programs_fullnames[33]
    programs_fullnames[45], programs_fullnames[46] = programs_fullnames[46], programs_fullnames[45]
    programs_fullnames[47], programs_fullnames[48] = programs_fullnames[48], programs_fullnames[47]
    programs_fullnames[50], programs_fullnames[51] = programs_fullnames[51], programs_fullnames[50]
    programs_fullnames[53], programs_fullnames[55] = programs_fullnames[55], programs_fullnames[53]
    programs_fullnames[55], programs_fullnames[56] = programs_fullnames[56], programs_fullnames[55]
    programs_fullnames[59], programs_fullnames[60] = programs_fullnames[60], programs_fullnames[59]
    programs_fullnames[61], programs_fullnames[62] = programs_fullnames[62], programs_fullnames[61]
    programs_fullnames[71], programs_fullnames[72] = programs_fullnames[72], programs_fullnames[71]
    programs_fullnames[15] = "Computation"
    return programs_fullnames, programs_prefixes

def map_program_codes():


    service = Service(executable_path=ChromeDriverManager().install())
    options = Options()
    options.page_load_strategy = 'normal'
    options.headless = True
    options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(service=service, options=options)
    
    umbc_course_catalog_link = f'https://catalog.umbc.edu/content.php?catoid=28&catoid=28&navoid=1811&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&filter%5Bcpage%5D={1}'
    programs_json = []
    
    driver.get(umbc_course_catalog_link)
    driver.implicitly_wait(0.2)

    prefixes = driver.find_element(By.ID, 'courseprefix')
    fullnames = driver.find_element(By.ID, 'coursetype')
    programs_prefixes = prefixes.text.split("\n")
    programs_fullnames = fullnames.text.split("\n")
    
    programs_fullnames, programs_prefixes = fix_date(programs_fullnames, programs_prefixes)
    
    for i in range(len(programs_prefixes)):
        if i < len(programs_fullnames):
            new_object = {
                programs_prefixes[i]: programs_fullnames[i]
            }
        else:
            new_object = {
                programs_prefixes[i]: 'undefined'
            }
        programs_json.append(new_object)
        
    # dirname = os.path.dirname(__file__)
    # program_code_mapping = os.path.join(dirname, 'programs_mapping')
    if not os.path.exists("../back-end/degree_list"):
        os.makedirs("../back-end/degree_list")

    filename = os.path.join(
        "../back-end/degree_list", f'programs_prefixes_mapping.json')

    with open(filename, 'w') as json_file:
        json.dump(programs_json, json_file)
        
if __name__ == "__main__":
    map_program_codes()
