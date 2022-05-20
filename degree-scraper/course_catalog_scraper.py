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

def clean(array):
    for i in range(len(array) - 1, -1, -1):
        if not array[i]:
            array.pop(i)

    return array


def scrape_course_content(begin, end):
    service = Service(executable_path=ChromeDriverManager().install())
    options = Options()
    options.page_load_strategy = 'normal'
    options.headless = True
    options.add_experimental_option("detach", True)
    driver = webdriver.Chrome(service=service, options=options)
    
    

    for i in range(begin, end + 1):
        courses_json = []
        umbc_course_catalog_link = f'https://catalog.umbc.edu/content.php?catoid=28&catoid=28&navoid=1811&filter%5Bitem_type%5D=3&filter%5Bonly_active%5D=1&filter%5B3%5D=1&filter%5Bcpage%5D={i}'
        driver.get(umbc_course_catalog_link)
        driver.implicitly_wait(3)

        elements = driver.find_elements(By.CLASS_NAME, 'width')

        for element in elements:
            a_href = element.find_element(By.TAG_NAME, 'a')
            a_href.click()

            box = element.find_element(By.CLASS_NAME, 'coursepadding')
            course = box.text

            contents = clean(course.split('\n'))
            title_parsed = clean(re.split(
                "((?<=[0-9]{3}\w)|(?<=[0-9]{3}))\s-\s|\s(?=\([0-9].*\)$)", contents[0]))
            course_code = title_parsed[0]
            title = title_parsed[1]
            credits = re.findall("[0-9]", title_parsed[-1])[0]
            additional_information = {}

            if re.search('^\w{1,15}:\s', contents[1]):
                contents.insert(1, "")

            for information in contents[2:]:
                if information.strip():
                    information = information.split(": ")
                    if len(information) == 1:
                        additional_information["additional"] = information[0]
                    elif len(information) == 2:
                        key = information[0]
                        value = information[1]
                        additional_information[key] = value

            course_json = {
                "Course": course_code,
                "Name": title,
                "Credits": credits,
                "Description": contents[1],
            }

            course_json = {**course_json, **additional_information}
            courses_json.append(course_json)

        dirname = os.path.dirname("../back-end/course_catalog")
        if not os.path.exists(dirname):
            os.makedirs(dirname)
            
        filename = os.path.join(dirname, f'courses_page_{i}.json')

        with open(filename, 'w') as json_file:
            json.dump(courses_json, json_file)


class WebScraperThread(threading.Thread):
   def __init__(self, threadID, begin, end):
      threading.Thread.__init__(self)
      self.threadID = threadID
      self.begin = begin
      self.end = end

   def run(self):
      print("Starting " + self.name)
      scrape_course_content(self.begin, self.end)
      print("Exiting " + self.name)
      
      
      
if __name__ == "__main__":
    
    # SINGLE-THREADED AND TAKES IN COMMAND LINE ARGUMENTS
    # beginning_page = sys.argv[1]
    # ending_page = sys.argv[2]

    # if not re.search('^\d+$', beginning_page) or not re.search('^\d+$', ending_page):
    #     print("Invalid arguments: your arguments contain characters, enter digits only.")
    #     exit(-1)

    # beginning_page = int(beginning_page)
    # ending_page = int(ending_page)

    # if beginning_page > ending_page:
    #     print("Invalid arguments: your beginning page is greater than your ending page.")
    #     exit(-1)
    # test_driver_manager_chrome(beginning_page, ending_page)
    
    
    # MULTI-THREADING IMPLEMENTATION
    threads = []
    thread1 = WebScraperThread(1, 1, 6)
    thread2 = WebScraperThread(2, 7, 12)
    thread3 = WebScraperThread(3, 13, 17)
    thread4 = WebScraperThread(4, 18, 24)
    thread5 = WebScraperThread(5, 25, 28)
    
    threads.append(thread1)
    threads.append(thread2)
    threads.append(thread3)
    threads.append(thread4)
    threads.append(thread5)
    
    thread1.start()
    thread2.start()
    thread3.start()
    thread4.start()
    thread5.start()

    for t in threads:
        t.join()

    print("Course catalog scraped. Exiting.")


