import requests
from bs4 import BeautifulSoup
import re
import pandas as pd
import warnings
import time
import json
# from selenium import webdriver
warnings.filterwarnings("ignore")

links = []
ip_addresses = []
filepath = '../data/gsmarena/phoneSpecs.json'
specs = []
headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
    'Referer': 'https://example.com/' 
}



with open(filepath) as file:
     specs = json.load(file)
with open("../data/gsmarena/phoneLinks.txt", "r") as f:
    for line in f:
        links.append(line[:-1])
        # if re.search('oneplus',line[:-1]):
        #     links.append(line[:-1])
with open("../data/gsmarena/ipAddresses.txt", "r") as f:
    for i in range(3):
        ip_addresses.append(f.readline()[0:-1])
proxy = {'http': 'http://' + ip_addresses[0]}


def add_to_specs(html,index):
    soup = BeautifulSoup(html.content,'lxml')
    brandandmodel = soup.find('h1',{'data-spec':'modelname'}).get_text()
    brand = brandandmodel[:brandandmodel.find(" ")]
    model = brandandmodel[brandandmodel.find(" "): len(brandandmodel) ]
    model  = model.replace("Galaxy","").strip() 
    released = soup.find("span", {"data-spec" : "released-hl"})
    released  = released.get_text() if released else ""
    released = released.replace("Released","")
    released = released.replace(",","")
    released = released.strip()

    dimension = soup.find("td", {"data-spec" : "dimensions"}).get_text()
    dimension = dimension[:dimension.find("(")].strip() # removing extra data 123.8 x 58.6 x 7.6 mm (4.87 x 2.31 x 0.30 in)

    weight = soup.find("td", {"data-spec" : "weight"}).get_text()
    weight = weight[:weight.find("(")].strip() 

    displayType = soup.find("td", {"data-spec" : "displaytype"})
    displayType = displayType.get_text() if displayType else ""
    displaySize = soup.find("td", {"data-spec" : "displaysize"})
    displaySize = displaySize.get_text() if displaySize else ""
    displayResolution = soup.find("td", {"data-spec" : "displayresolution"})
    displayResolution = displayResolution.get_text() if displayResolution else ""

    platformOS = soup.find("td", {"data-spec" : "os"})
    platformOS = platformOS.get_text() if platformOS else ""

    platformChipset = soup.find("td", {"data-spec" : "chipset"})
    platformChipset = platformChipset.get_text() if platformChipset else ""

    platformCPU = soup.find("td", {"data-spec" : "cpu"})
    platformCPU = platformCPU.get_text() if platformCPU else ""

    platformGPU = soup.find("td", {"data-spec" : "gpu"})
    platformGPU = platformGPU.get_text() if platformGPU else ""
    memoryInternal = soup.find("td", {"data-spec" : "internalmemory"})
    memoryInternal = memoryInternal.get_text() if memoryInternal else ""
    memoryInternalOptions = memoryInternal.split(",")
    for item in memoryInternalOptions:
        item = item.split()

    mainCamera = soup.find("td", {"data-spec" : "cam1modules"})
    mainCamera = mainCamera.get_text() if mainCamera else ""
    mainCamera = re.findall(r'(\d+\s*MP)', mainCamera)
    mainCamera = ', '.join(mainCamera)

    selfieCamera = soup.find("td", {"data-spec" : "cam2modules"})
    selfieCamera = selfieCamera.get_text() if selfieCamera else ""
    selfieCamera = re.findall(r'(\d+\s*MP)', selfieCamera)
    selfieCamera = ', '.join(selfieCamera)

    colorOptions = soup.find("td", {"data-spec" : "colors"})
    colorOptions = colorOptions.get_text() if colorOptions else ""
    colorOptions = colorOptions.split(",")
    for item in colorOptions:
        item = item.split()

    benchmarks = soup.find("td", {"data-spec" : "tbench"})
    benchmarks = benchmarks.get_text() if benchmarks else ""

    batteryType = soup.find("td", {"data-spec" : "batdescription1"})
    batteryType = batteryType.get_text() if batteryType else ""
   

    spec = {
        "brand" : brand,
        "model" : model,
        "released" : released,
        "dimension" : dimension,
        "weight" : weight,
        "display"  : {
          "type" : displayType,
          "size" : displaySize,
          "resolution" : displayResolution,

        },
        "platform" : {
            "os" : platformOS,
            "chipset" : platformChipset,
            "cpu" : platformCPU,
            "gpu" : platformGPU,
        },
        "battery" : {
            "type" : batteryType,
        },
        "mainCamera" : mainCamera,
        "selfieCamera" : selfieCamera,
        "memoryInternalOptions" : memoryInternalOptions,
        "colorOptions" : colorOptions,

    }
    found = False
    for index, item in enumerate(specs):
        if item['brand'] == spec['brand'] and item['model'] == spec['model']:
            specs[index] = spec  # Update existing spec
            found = True
            break
    if not found:
        specs.append(spec) 
    # text = f"{brand1},{name1},{released1},{dimension1},{weight1}"


for index,link in enumerate(links):
    time.sleep(3)
    try:
        response = requests.get(link, proxies=proxy,headers=headers)
        # if response.status_code == 429:
        #     break
        add_to_specs(response,index)
        print(f"{ (index+1) } links are done")
        with open(filepath,"w") as json_file:
          json.dump(specs,json_file,indent=4)
    except requests.exceptions.RequestException as e:
        print(f"Error occurred while using {ip_addresses[0]}: {e}")
