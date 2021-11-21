import requests
from bs4 import BeautifulSoup

import json
import os
import urllib
import urllib3


import base64
from selenium import webdriver
from phantomjs import Phantom


def decrypt_url(data: str, key: str) -> str:
    if data.startswith('#'):
        data = data[1:]

    for x in key[::-1]:
        data = x.join(reversed(data.split(x)))
    
    return base64.b64decode(data).decode('utf-8')



links = []
names = []
dictp = []
l = 0
for isa in range(10):
    vgm_url = 'https://aldebaran.ru/knigi/pagenum-'+ str(isa) +"/"
    headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
    #html_text = requests.get(vgm_url, headers=headers).content

    browser = webdriver.PhantomJS(executable_path='C:/Users/HP 14 G8/Desktop/Login_v2/phantomjs/bin/phantomjs.exe')
    browser.get(vgm_url)
    html = browser.page_source
    soup = BeautifulSoup(html, 'html.parser')
    attrs = {
            'class': "img"
        }

    attrs1 = {
            'class': "booktitle"
        }    

    
    print(soup)

    for link in soup.find_all('div',  attrs=attrs):
        all_data = link.find_all("a")
        for t in all_data:

        
            print(str(t.get("href"))+"download.a6.pdf")
            urlp  = "https://aldebaran.ru"+t.get("href") + "download.a6.pdf"
            links.append(urlp)
            dictp.append({
               "url": urlp

               })
    for link_r in soup.find_all('p',  attrs=attrs1):
        

        
        print(str(link_r.text))
         #print(link.text)
        
        dictp[l].update({"name":(link_r.text)})
        l+=1
        names.append(link_r.text)
    browser.quit()


print(dictp)
        #urlp  = "https://dl1.i-tsmusic.com/192/"+t.get("data-mp3_id") +".mp3"
        #links.append(urlp)
        #dictp.append({
        #   "url": urlp

        #   })


"""
for link in soup.find_all('div',  attrs=attrs):
    all_data = link.find_all("div", attrs={"class":"b_likes"})
    for t in all_data:

    
        print(t.get("data-mp3_id"))
        urlp  = "https://dl1.i-tsmusic.com/192/"+t.get("data-mp3_id") +".mp3"
        links.append(urlp)
        dictp.append({
           "url": urlp

           })


for link_t in soup.find_all('div',  attrs=attrs):
    all_data_t = link_t.find_all("div", attrs={"class":"title"})
    for k  in all_data_t:
        print(k.text)
    
        dictp[l].update({"name":str(k.text)})
        l+=1
        names.append(k.text)

    
       
    #for data in data_all:
        #data_url_first = data.get("data-url")
        #data_key = data.get("data-key")
        #urlp = decrypt_url(data_url_first, data_key)
        #print(urlp)


        #print(data.get("data-url"), data_key, )
    
        #links.append(urlp)
        #dictp.append({
    	   #"url": urlp

    	   #})
#print("link", links)
#for link in soup.find_all('div',  attrs=attrs1):
    
    

    
    #print(link.text)
    
    #dictp[l].update({"name":(link.text)})
    #l+=1
    #names.append(link.text)

#print(dictp)


#REQUESTS add music 
#payload = {'url':"https://music.xn--41a.ws" + dictp[0]["url"]}
#lr = [dictp[0]["url"]]



#lrr = dictp[0]["url"].split("=")

#image_byte = requests.get("https://music.xn--41a.ws" + dictp[0]["url"]).content
#kr = 0

for i in dictp[:5]:

	

    r = requests.post("http://127.0.0.1:8000/json_res_books/"+i["name"],  json = {"url":i["url"]})
"""
#for i in dictp[:5]:

    

    #r = requests.post("http://127.0.0.1:8000/json_res_books/"+i["name"],  json = {"url":i["url"]})