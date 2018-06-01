# WaterIsWet
Aquastat Data Analysis Summary

![water is wet](../images/wateriswet.jpg)
# Water We Doing?: A Summary

"Water is Wet" is an Exploratory Data Analysis project to see what factors affect the development index of countries around the world. It aims to compare certain parameters related to water resources, agriculture, land and population over a time period against some development indicators for countries like Human Development Indicator (HDI), Gross Domestic Product (GDP), Gender Inequality Index (GII) and Prevelance of Undernourishment.

## Project Team:
* Andrea Karaffa
* David Richter
* Jen Vacanti
* Luke Pharr
* Rupali Mayekar

## Watery We Think About This?: Our hypothesis
We believe the following relationships and dependencies exist, and through our analysis propose to present the relationships by exploring the data provided by [The Food and Agriculture Organization of the United Nations](http://www.fao.org/home/en/) under their [AQUASTAT](http://www.fao.org/nr/water/aquastat/main/index.stm) project. 

* The development of a country depends on its water resources (rainfall, external resources, internal resources)
* The development of a country depends on the rural population and production from agriculture (crops and livestock). 
* The agricultural production of a country is realted to its water resources and also the amount of land cultivated.

## AQUASTAT Data

The data for this Analysis was downloaded from the FAO's [AQUASTAT Database](http://www.fao.org/nr/water/aquastat/data/query/index.html?lang=en). This database provides values of cerain parameters realted to land, population, water, development and agriculture over a few decades. AQUASTAT is FAO's (Food and Agriculture Organization of the United Nations) global water information system, developed by the Land and Water Division. It is the most quoted source on global water statistics..

---
## Questions we set out to answer:

1. Is GDP realted to population? Do more densly populated countries have higher GDP index? Do countries with higher rural population have a higher GDP?

2. Is GDP related to the % of Total Area Cultivated? Do countries with more cultivated area have a higher GDP per capita?

3. Is the HDI directly related to the urban population of the country? Do more "Urbanized" countries have higher HDI? Similarly do more urbanized countries have a lower GII?

4. Do countries with higher GDP have a higher HDI? Similarty do countries with higher GDP have a lower GII?

5. How is the HDI of a country related to its water resources?
    * Do countries with a higher NRI have a higher HDI?
    * Do countries with a lower Dependency Ratio have a higher HDI?
    * Do countries with a higher Water Stress Indicator have a lower HDI?
    * Do countries with a higher Flood Occurrence Indicator have a lower HDI?

6. How is the GDP of a country related to its water resources?
    * Do countries with a higher NRI have a higher GDP?
    * Do countries with a lower Dependency Ration have a higher GDP?
    * Do countries with a higher Water Stress Indicator have a lower GDP?
    * Do countries with a higher Flood Occurrence Indicator have a lower GDP?

7. How is the Prevelance of undernourishment related to the water resources for a country?
    * Do countries with a lower NRI have higher Prevelance of undernourishment?
    * Do countries with a higher Dependency Ratio have higher Prevelance of undernourishment?
    * Do countries with a higher Water Stress Indicator have a higher Prevelance of undernourishment?
    * Do countries with a higher Flood Occurrence Indicator have a higher Prevelance of undernourishment?

## Data Visualizations
The data visualizations are interactive and best experienced online:
    * GDP (link here)
    * Irrigation (link here)
    * Land Use (link here)
    * Resources (link here)

## You can't cross the sear merly by standing and staring at the water: Technical Considerations

The project resulted in a Flask powered website that shows the interative data visualizations. The website was developed using HTML/CSS and Javascript libraries and a responsive Bootstrap framework. 

Data is stored and retrieved in a SQLite database. 




