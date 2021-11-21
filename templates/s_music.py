import requests
from bs4 import BeautifulSoup

import json
import os
import urllib
import urllib3


import base64
from selenium import webdriver
import selenium
from phantomjs import Phantom


def decrypt_url(data: str, key: str) -> str:
    if data.startswith('#'):
        data = data[1:]

    for x in key[::-1]:
        data = x.join(reversed(data.split(x)))
    
    return base64.b64decode(data).decode('utf-8')


vgm_url_aritsts = 'https://ts-music.com/artists/'
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 Safari/537.36'}
#html_text = requests.get(vgm_url, headers=headers).content
h = {'User-Agent':'Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.104 Safari/537.36'}
browser_artist = webdriver.PhantomJS(executable_path='C:/Users/HP 14 G8/Desktop/Login_v2/phantomjs/bin/phantomjs.exe')
browser_artist.get(vgm_url_aritsts)
html_artist = browser_artist.page_source
soup_artist = BeautifulSoup(html_artist, 'html.parser')
attrs_artist = {
        'class': "li"
    }


data = []
"""
for i in range(5):
    try:
        browser_artist.find_element_by_class_name("load_more").click()
        print("click")
        html_artist = browser_artist.page_source.encode('utf-8')
        soup_artist = BeautifulSoup(html_artist, 'html.parser')
        for link_artist in soup_artist.find_all('div',  attrs=attrs_artist):
            all_data = link_artist.find_all("a")
            for t in all_data:

                data.append(t.get("href"))


            
                print(t.get("href"))
    except:
        print(browser_artist.find_element_by_class_name("load_more"))
        break



a = list(dict.fromkeys(data))
print(a)
"""
a = ['/artist/649-morgenshtern/', '/artist/16-artik-asti/', '/artist/90-gayazov-brother/', '/artist/3155-slava-marlow/', '/artist/4-billie-eilish/', '/artist/551-miyagi-endshpil/', '/artist/6-zivert/', '/artist/9-egor-krid/', '/artist/2140-instasamka/', '/artist/2827-vavan/', '/artist/613-filatov-karas/', '/artist/310-loboda/', '/artist/93-ramil/', '/artist/341-jah-khalib/', '/artist/302-lesha-svik/', '/artist/8-rammstein/', '/artist/10-leningrad/', '/artist/94-eldzhey/', '/artist/91-hammali-navai/', '/artist/432-guf/', '/artist/3131-minelli/', '/artist/342-ganvest/', '/artist/598-little-big/', '/artist/71-armin-van-buuren/', '/artist/305-maruv/', '/artist/1658-emin/', '/artist/630-jony/', '/artist/3139-rakhim/', '/artist/3614-pop-smoke/', '/artist/11-basta/', '/artist/2291-janaga/', '/artist/527-big-baby-tape/', '/artist/3541-galibri-mavik/', '/artist/283-sean-paul/', '/artist/3400-sqwoz-bab/', '/artist/781-niletto/', '/artist/2864-ollane/', '/artist/1805-ego/', '/artist/268-scorpions/', '/artist/3214-karna-val/', '/artist/3001-murat-thagalegov/', '/artist/2047-dzharahov/', '/artist/815-the-limba/', '/artist/57-tiesto/', '/artist/2788-dj-groove/', '/artist/3502-sultan-laguchev/', '/artist/1264-dababy/', '/artist/338-dzhigan/', '/artist/837-verbee/', '/artist/289-dj-smash/', '/artist/3-ruki-vverh/', '/artist/492-polina-gagarina/', '/artist/152-artur-pirozhkov/', '/artist/2054-gone-fludd/', '/artist/2091-t1one/', '/artist/326-boris-brejcha/', '/artist/1619-mia-boyka/', '/artist/785-nyu/', '/artist/3167-moses/', '/artist/3517-kalush/', '/artist/1660-iowa/', '/artist/1198-nyusha/', '/artist/836-nurminskiy/', '/artist/224-eisbrecher/', '/artist/17-artem-kacher/', '/artist/3143-jvla/', '/artist/309-maks-barskih/', '/artist/1039-rauf-faik/', '/artist/1648-fogel/', '/artist/2247-habib/', '/artist/139-alan-walker/', '/artist/462-klava-koka/', '/artist/313-system-of-a-down/', '/artist/2149-dmitriy-malikov/', '/artist/663-thrill-pill/', '/artist/2292-roddy-ricch/', '/artist/31-anivar/', '/artist/364-skriptonit/', '/artist/1810-inna/', '/artist/548-miyagi/', '/artist/2293-why-berry/', '/artist/2123-vitya-ak/', '/artist/1856-kaspiyskiy-gruz/', '/artist/1832-dan-balan/', '/artist/150-ludovico-einaudi/', '/artist/3521-asammuell/', '/artist/110-elena-temnikova/', '/artist/2006-poshlaya-molli/', '/artist/13-rasa/', '/artist/507-sergey-lazarev/', '/artist/2465-faktor-2/', '/artist/669-yung-trappa/', '/artist/1865-bts/', '/artist/1959-rustam-nahushev/', '/artist/334-grivina/', '/artist/1933-dava/', '/artist/225-marshmello/', '/artist/3620-vesna305/', '/artist/434-nazima/', '/artist/14-kavabanga-depo-kolibri/', '/artist/3515-maneskin/', '/artist/809-andro/', '/artist/238-eminem/', '/artist/135-zemfira/', '/artist/2202-dabro/', '/artist/1534-leonid-rudenko/', '/artist/1675-maryana-ro/', '/artist/3637-est-gee/', '/artist/1385-the-prodigy/', '/artist/50-eric-prydz/', '/artist/358-metallica/', '/artist/433-filipp-kirkorov/', '/artist/671-rigos/', '/artist/958-ariana-grande/', '/artist/42-lsp/', '/artist/107-feduk/', '/artist/2275-edx/', '/artist/2713-lizer/', '/artist/3160-asiya/', '/artist/841-2mashi/', '/artist/3162-strelki/', '/artist/892-meybi-beybi/', '/artist/64-guru-josh-project/', '/artist/3153-og-buda/', '/artist/30-yuriy-shatunov/', '/artist/1770-homie/', '/artist/325-marilyn-manson/', '/artist/3136-oleg-kenzov/', '/artist/1945-pink/', '/artist/337-doni/', '/artist/3546-modern-talking/', '/artist/7-stas-mihaylov/', '/artist/2570-dora/', '/artist/201-slipknot/', '/artist/1544-quest-pistols-show/', '/artist/2376-agunda/', '/artist/477-t-fest/', '/artist/1930-isayya/', '/artist/2245-nitti-gritti/', '/artist/3473-dorofeeva/', '/artist/103-imagine-dragons/', '/artist/246-monatik/', '/artist/32-mozgi/', '/artist/706-the-beatles/', '/artist/484-smoki-mo/', '/artist/98-sia/', '/artist/1612-manizha/', '/artist/155-the-weeknd/', '/artist/2630-sharlot/', '/artist/2946-vladimir-zhdamirov/', '/artist/1594-hanna/', '/artist/26-steve-aoki/', '/artist/84-shura/', '/artist/2785-guzel-hasanova/', '/artist/1538-swanky-tunes/', '/artist/5-mihail-krug/', '/artist/1841-elvira-t/', '/artist/164-kino/', '/artist/3269-andrey-derzhavin/', '/artist/2104-anzhelika-varum/', '/artist/2880-raim/', '/artist/176-skrillex/', '/artist/2780-syuzanna/', '/artist/2072-sabbat-cult/', '/artist/753-dima-bilan/', '/artist/3573-yaroslav-sumishevskiy/', '/artist/1275-lp/', '/artist/2274-dallask/', '/artist/896-sub-urban/', '/artist/23-ilkay-sencan/', '/artist/1965-ellai/', '/artist/3434-bad-boys-blue/', '/artist/3170-artur-babich/', '/artist/253-ivan-dorn/', '/artist/41-johnyboy/', '/artist/293-shahzoda/', '/artist/3594-sasha-popova/', '/artist/424-st/', '/artist/604-zomb/', '/artist/3551-osman-navruzov/', '/artist/1711-zippo/', '/artist/76-demo/', '/artist/2887-elena-terleeva/', '/artist/2294-bi-2/', '/artist/2333-elbrus-dzhanmirzoev/', '/artist/2151-ivanushki-international/', '/artist/511-kasta/', '/artist/788-face/', '/artist/3445-islam-itlyashev/', '/artist/406-kristina-si/', '/artist/1559-slame/', '/artist/830-5sta-family/', '/artist/642-alla-pugacheva/', '/artist/284-the-hardkiss/', '/artist/2143-timmy-trumpet/', '/artist/129-kraski/', '/artist/1677-xxxtentacion/', '/artist/804-slem/', '/artist/1001-loc-dog/', '/artist/2153-masha-i-medvedi/', '/artist/1958-mevl/', '/artist/3236-moneyken/', '/artist/2105-na-na/', '/artist/28-dom-dolla/', '/artist/783-cream-soda/', '/artist/3531-wellboy/', '/artist/2141-apashe/', '/artist/1553-elvin-grey/', '/artist/34-chi-li/', '/artist/1584-anet-say/', '/artist/1773-t-killah/', '/artist/3425-joy/', '/artist/686-tina-karol/', '/artist/2627-burak-yeter/', '/artist/442-natan/', '/artist/43-turbotronic/', '/artist/182-blackpink/', '/artist/1644-alena-shvec/', '/artist/869-dj-snake/', '/artist/782-camila-cabello/', '/artist/2273-tchami/', '/artist/1062-zheka/', '/artist/140-lyube/', '/artist/54-darude/', '/artist/2042-martin-garrix/', '/artist/704-kristina-orbakayte/', '/artist/2010-shami/', '/artist/752-clawfinger/', '/artist/36-st1m/', '/artist/3527-kristonko/', '/artist/2476-tsoy/', '/artist/811-becky-hill/', '/artist/803-2-lyama/', '/artist/2721-atb/', '/artist/62-nightcrawlers/', '/artist/3231-lindsey-stirling/', '/artist/2844-tony-igy/', '/artist/3383-egor-ship/', '/artist/816-lil-nas-x/', '/artist/959-miley-cyrus/', '/artist/3430-rick-astley/', '/artist/67-rita-ora/', '/artist/524-markul/', '/artist/3538-olivia-rodrigo/', '/artist/2121-oleg-gazmanov/', '/artist/1696-linda/', '/artist/2037-prosto-lera/', '/artist/3348-xcho/', '/artist/73-lyapis-trubeckoy/', '/artist/1652-syava/', '/artist/1712-vladimir-presnyakov/', '/artist/186-katy-perry/', '/artist/257-anna-sedokova/', '/artist/61-snap/', '/artist/870-j-balvin/', '/artist/2148-murat-nasyrov/', '/artist/75-virus/', '/artist/2318-adler-kocba/', '/artist/2297-glyukoza/', '/artist/2838-edgar/', '/artist/2891-vyacheslav-butusov/', '/artist/392-l-one/', '/artist/3516-masked-wolf/', '/artist/63-corona/', '/artist/137-korn/', '/artist/590-tipsi-tip/', '/artist/3733-aleksey-fokin/', '/artist/2109-vorovayki/', '/artist/889-ava-max/', '/artist/343-gazirovka/', '/artist/3284-dr-alban/', '/artist/1368-r3hab/', '/artist/2493-moya-mishel/', '/artist/2860-shena/', '/artist/3142-macan/', '/artist/1866-olya-polyakova/', '/artist/835-maroon-5/', '/artist/537-igor-nikolaev/', '/artist/2320-mainstream-one/', '/artist/651-pharaoh/', '/artist/3615-polo-g/', '/artist/946-krewella/', '/artist/1678-trippie-redd/', '/artist/1912-antirespekt/', '/artist/1649-mohito/', '/artist/1271-c-bool/', '/artist/3705-gspd/', '/artist/2223-yuliya-beretta/', '/artist/2272-martin-ikin/', '/artist/3712-tereshina/', '/artist/55-atc/', '/artist/2155-mr-credo/', '/artist/3549-vacio/', '/artist/1055-aleksey-bryancev/', '/artist/2106-maksim-leonidov/', '/artist/38-the-underdog-project/', '/artist/3206-joe-cocker/', '/artist/2848-ershov/', '/artist/51-edward-maya/', '/artist/3491-vanya-dmitrienko/', '/artist/1929-verka-serdyuchka/', '/artist/2531-diskoteka-avariya/', '/artist/2345-irina-ortman/', '/artist/2150-valeriy-syutkin/', '/artist/1513-lolita/', '/artist/1671-malbek/', '/artist/498-rem-digga/', '/artist/1545-jason-derulo/', '/artist/3632-lovv66/', '/artist/1733-maluma/', '/artist/2350-sergey-trofimov/', '/artist/1058-viktor-korolev/', '/artist/487-noggano/', '/artist/3175-masha-sheyh/', '/artist/3426-opus/', '/artist/2851-konstantin-tetruev/', '/artist/1818-akon/', '/artist/3542-anastacia/', '/artist/59-robert-miles/', '/artist/2242-troyboi/', '/artist/495-maksim/', '/artist/2122-butyrka/', '/artist/2268-merk-kremont/', '/artist/2214-maxriven/', '/artist/1689-vintazh/', '/artist/2462-enigma/', '/artist/2700-blackbear/', '/artist/66-iggy-azalea/', '/artist/261-antitila/', '/artist/1552-albina-dzhanabaeva/', '/artist/3493-bodiev/', '/artist/1790-mc-zali/', '/artist/2509-ddt/', '/artist/2175-vlad-sokolovskiy/', '/artist/596-via-gra/', '/artist/236-alesso/', '/artist/25-dagny/', '/artist/517-lx24/', '/artist/984-the-chainsmokers/', '/artist/2079-sofiya-rotaru/', '/artist/294-evanescence/', '/artist/1769-te100steron/', '/artist/632-monetochka/', '/artist/2250-axwell/', '/artist/3122-kunteynir/', '/artist/2685-mariah-carey/', '/artist/805-post-malone/', '/artist/278-dj-aligator/', '/artist/871-major-lazer/', '/artist/2313-uma2rman/', '/artist/88-dzharo-hanza/', '/artist/415-kiss/', '/artist/3108-nikita-kiosse/', '/artist/3535-tom-macdonald/', '/artist/2687-dj-khaled/', '/artist/360-the-rasmus/', '/artist/633-noize-mc/', '/artist/19-imany/', '/artist/1695-zhuki/', '/artist/602-queen/', '/artist/2057-dfysaga/', '/artist/58-eiffel-65/', '/artist/730-flo-rida/', '/artist/53-stromae/', '/artist/550-slava/', '/artist/3432-technotronic/', '/artist/3193-maria/', '/artist/2243-delta-heavy/', '/artist/37-zhanna-friske/', '/artist/3188-sergey-nagovicyn/', '/artist/754-deftones/', '/artist/248-ac-dc/', '/artist/3187-korol-i-shut/', '/artist/3664-kirill-moyton/', '/artist/3539-rauw-alejandro/', '/artist/1606-farruko/', '/artist/2344-dzharo/', '/artist/3562-olivia-addams/', '/artist/1966-marina-fedunkiv/', '/artist/3603-leony/', '/artist/2532-anna-trincher/', '/artist/3460-mary-gu/', '/artist/80-natali/', '/artist/244-disturbed/', '/artist/256-papa-roach/', '/artist/218-limp-bizkit/', '/artist/3360-sergey-piskun/', '/artist/49-alice-deejay/', '/artist/3610-timofeew/', '/artist/56-yves-larock/', '/artist/895-drake/', '/artist/846-yulianna-karaulova/', '/artist/230-milky-chance/', '/artist/547-the-rolling-stones/', '/artist/2238-cryjaxx/', '/artist/87-lana-del-rey/', '/artist/2778-will-i-am/', '/artist/529-platina/', '/artist/239-snoop-dogg/', '/artist/1052-abba/', '/artist/363-selena-gomez/', '/artist/2084-slimus/', '/artist/2081-neyromonah-feofan/', '/artist/345-sepultura/', '/artist/3126-artem-kid/', '/artist/3168-radjo/', '/artist/3726-raikaho/', '/artist/463-sveta/']

links = []
names = []
dictp = []
name_music = []
url_music = []

l = 0
for link_name in a[5:7]:

    vgm_url = 'https://ts-music.com'+link_name
    print(vgm_url)

    browser = webdriver.PhantomJS(executable_path='C:/Users/HP 14 G8/Desktop/Login_v2/phantomjs/bin/phantomjs.exe')
    browser.get(vgm_url)
    html = browser.page_source
    soup = BeautifulSoup(html, 'html.parser')
    attrs = {
            'class': "mp3"
        }

    attrs1 = {
            'class': "artist_name"
        }    
    attrs_l = {
    'class':"content b_list_mp3s"
    }

    
    
    #print(soup)
    for link in soup.find_all('div',  attrs=attrs_l):
        all_data = link.find_all("div", attrs=attrs)
        for t in all_data:


        
            print(link)
            urlp  = "https://dl1.i-tsmusic.com/192/"+t.get("data-mp3_id") +".mp3"
            links.append(urlp)
            dictp.append({
               "url": urlp

               })
            all_data_t = t.find("div", attrs={"class":"title"})
            print(all_data_t.text)
            
            dictp[l].update({"name":str(all_data_t.text)})
            l+=1
    browser.quit()
            #for k  in all_data_t:
                #print(k.text)
            
                #
                #
                #names.append(k.text)


        

    
       
    #for data in data_all:
        #data_url_first = data.get("data-url")
        #data_key = data.get("data-key")
        #urlp = decrypt_url(data_url_first, data_key)
        #print(urlp, "")


        #print(data.get("data-url"), data_key, "")
    
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
#ses = requests.Session()
#r = ses.post("https://soocialfly.com/json_res/"+dictp[0]["name"],  json = {"url":dictp[0]["url"]}, headers= h)
print(dictp)
