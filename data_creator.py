# coding=utf-8
from munch import Munch, munchify, unmunchify
import json

with open('rawdata/county_codes.json') as data_file:
    county_codes = json.load(data_file)

with open('rawdata/NV1701BO_reverse.json') as data_file:
    kapacitetsutnyttjande = json.load(data_file)

with open('rawdata/temp.json') as data_file:
    temperatures = json.load(data_file)

with open('rawdata/preci.json') as data_file:
    preci = json.load(data_file)

with open('rawdata/hotelnights.json') as data_file:
    nights = json.load(data_file)

with open('rawdata/foregin.json') as data_file:
    foreginPercentage = json.load(data_file)



def getOverallCoverForCounty(month, name):
    county_list = kapacitetsutnyttjande["dataset"]["dimension"]["Region"]["category"]["index"]
    i = county_list[name]
    return kapacitetsutnyttjande["dataset"]["value"][month][i]

def getTemperature(month, name):
    return temperatures["temp"][month][name]

def getPreci(month, name):
    return preci[name][month]

def getTotalNights(month, name):
    county_list =  nights["dataset"]["dimension"]["Region"]["category"]["index"]
    i = county_list[name]
    return nights["dataset"]["value"][month][i]
    #print(nights["dataset"]["value"][month][i])





d = Munch()
monthlist = []
for month in range(0, 12):
    m = Munch(sweden={}, counties=[])
    m.sweden = Munch(beds="", nights="", cover="", topCountries=[])
    m.sweden.nights = nights["dataset"]["value"][month][21]
    m.sweden.foreginPercentage = foreginPercentage[month]
    for xx in range(0, 3):
        country = Munch(id="", name="", share="")
        m.sweden.topCountries.append(country)
    m.counties = []
    for y in range(0, 21):
        countyName = county_codes[y]["name"]
        county = Munch(id="", name="", weather={}, beds={}, nights={}, cover={}, topCountries=[], foreginTourism={})
        county.id = county_codes[y]["id"]
        county.name = countyName
        county.weather = Munch()
        county.weather.temp = getTemperature(month, countyName)
        county.weather.preci = getPreci(month, countyName)
        county.beds = Munch(all="", camp="", hotel="", hostel="", cabin="")
        county.nights = Munch()
        county.nights.all = getTotalNights(month, countyName)
        county.nights.percentage = round(county.nights.all / m.sweden.nights * 100, 2)
        county.cover = Munch(all="", camp="", hotel="", hostel="", cabin="", ofSweden="")
        county.cover.all = getOverallCoverForCounty(month, countyName)
        for yy in range(0, 3):
            country = Munch(id="", name="", share="")
            county.topCountries.append(country)
        county.foreginTourism = Munch(inCounty="", inSweden="")
        m.counties.append(county)
    monthlist.append(m)
d.months = monthlist



#d.importedDataLol = kapacitetsutnyttjande


with open('finalData.json', 'w') as outfile:
    json.dump(d.months, outfile)
