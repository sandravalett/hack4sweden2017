from munch import Munch, munchify, unmunchify
import json

with open('rawdata/county_codes.json') as data_file:
    datafile = json.load(data_file)
    #print(datafile[2])
    county_codes = Munch(datafile)

print(county_codes)

with open('rawdata/NV1701BO.json') as data_file:
    kapacitetsutnyttjande = Munch(json.load(data_file))

d = Munch()
monthlist = []
for x in xrange(0, 12):
    m = Munch(sweden={}, counties=[])
    m.sweden = Munch(beds=123, cover=0.32, topCountries=[])
    for xx in xrange(0, 3):
        country = Munch(id="", name="", share=0.02)
        m.sweden.topCountries.append(country)
    m.counties = []
    for y in xrange(0, 20):
        county = Munch(id="", name="", weather={}, beds={}, cover={}, topCountries=[], foreginTourism={})

        #county.name = county_codes[y].name
        county.weather = Munch(temp=10, preci=25)
        county.beds = Munch(all=7473, camp=31, hotel=984, hostel=234, cabin=37)
        county.cover = Munch(all=0.7, camp=0.2, hotel=0.1, hostel=0.7, cabin=0.5, ofSweden=0.23)
        for yy in xrange(0, 3):
            country = Munch(id="", name="", share=0.02)
            county.topCountries.append(country)
        county.foreginTourism = Munch(inCounty=0.3, inSweden=0.05)
        m.counties.append(county)
    monthlist.append(m)
d.months = monthlist



#d.importedDataLol = kapacitetsutnyttjande


with open('finalData.json', 'w') as outfile:
    json.dump(d.months, outfile)
