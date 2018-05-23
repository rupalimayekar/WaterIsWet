![water is wet](../images/wateriswet.jpg)
# Water is Wet

"Water is Wet" is an Exploratory Data Analysis project to see what factors affect the development index of countries around the world. It aims to compare certain parameters related to water resources, agriculture, land and population over a time period against some development indicators for countries like Human Development Indicator (HDI), Gross Domestic Product (GDP), Gender Inequality Index (GII) and Prevelance of Undernourishment.

## Project Team:
* Andrea Karaffa
* David Richter
* Jen Vacanti
* Luke Pharr
* Rupali Mayekar

## Thesis
We believe the following relationships and dependencies exist and through our analysis propose to present the relationships by exploring the data provided by [The Food and Agriculture Organization of the United Nations](http://www.fao.org/home/en/) under their [AQUASTAT](http://www.fao.org/nr/water/aquastat/main/index.stm) project. 

* The development of a country depends on its water resources (rainfall, external resources, internal resources)
* The development of a country depends on the rural population and production from agriculture (crops and livestock). 
* The agricultural production of a country is realted to its water resources and also the amount of land cultivated.

## AQUASTAT Data

The data for this Analysis has been downloaded from the FAO's [AQUASTAT Database](http://www.fao.org/nr/water/aquastat/data/query/index.html?lang=en). This database provides values of cerain parameters realted to land, population, water, development and agriculture over a few decades. 

---
## Questions:
We propose to answer the following questions for this project. The ability to answer the questions is based on the availability of these values in the data set across a selected time period. For the definition of the terms and indicators, please refer to the ```Glossary``` section provided at the end of this document.

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

## Summary Statistics
1. We also propose to provide a map representation of how various countries compare against each other based on certain development indicators like HDI, GDP, % total area cultivated, population density, total water resources, etc

2. As part of summary statistics it would also be good to provide a tabular representation of certain indicators like HDI, GDP, % total area cultivated, population density, total water resources, etc and a way to easity determine the top 10 and bottom 10 countries for these indicators.

## Technical Considerations

The project would result in a Flask powered website that will show the analysis on various web pages/popups on that site. The Website will be developed using HTML/CSS and Javascript libraries. The website will use the Bootstrap framework to be responsive.

We will use a SQLite database to store and retrieve all the required data for the project. 


---
## Glossary

#### % of Total Area Cultivated (Unit: %)
The percentage of total area of land for a country that is cultivated for permanent and temporary crops. Land cultivated for temporary crops is called Arable land.
[% of total country area cultivated] = 100*[Cultivated area (arable land + permanent crops)]/[Total area of the country]

#### Population Density (Unit: inhab/km2)
Number of inhabitants per square kilometre of total area.

#### Urban Population (Unit: 1000 inhab)
Population residing in urban areas. Usually the urban areas and hence the urban population are defined according to national census definitions.

#### Rural Population (1000 inhab)
Usually the rural population is obtained by subtracting the urban population from the total population. In practice, the criteria adopted for distinguishing between urban and rural areas vary among countries. However, these criteria can be roughly divided into three major groups: classification of localities of a certain size as urban; classification of administrative centres of minor civil divisions as urban; and classification of centres of minor civil divisions on a chosen criterion.

#### Gross Domestic Product (GDP) (Unit: Current UD$)
GDP at purchaser's prices is the sum of gross value added by all resident producers in the economy plus any product taxes and minus any subsidies not included in the value of the products. It is calculated without making deductions for depreciation of fabricated assets or for depletion and degradation of natural resources. 

#### GDP per capita (Unit: Current US$/inhab)
Gross domestic product divided by population.

#### Human Development Index (HDI) (Highest=1)
This is a summary measure of human development. It measures the average achievements in a country in three basic dimensions of human development: 
* (1) a long and healthy life, as measured by life expectancy at birth; 
* (2) knowledge, as measured by the adult literacy rate (with two-thirds weight) and the combined primary, secondary and tertiary gross enrolment ratio (with one-third weight); 
* (3) a decent standard of living, as measured by GDP per capita (Purchasing Power Parity or PPP US$).

#### Gender Inequality Index (GII) (equality=0, inequality=1)
The Gender Inequality Index (GII) is built on the same framework as the Human Development Index (HDI) — to better expose differences in the distribution of achievements between women and men. It measures the human development costs of gender inequality, thus the higher the GII value the more disparities between females and males. 

#### Prevelance of undernourishment (3-year average) (Unit: %)
This indicator expresses the probability that a randomly selected individual from the population consumes an amount of calories that is insufficient to cover her/his energy requirement for an active and healthy life. This is the traditional FAO hunger indicator, adopted as official Millennium Development Goal indicator. 

#### National Rainfall Index (NRI) (Unit: mm/year)
The NRI yearly results take into consideration the precipitation that year, the average precipitation over the period 1986-2000, the seasonality of the main crop-growing season (distinguishing between northern and southern hemispheres), and what areas of the country are wetter. The median of each five year period is provided. Note: due to methodological differences, this variable is not comparable to average precipitation. 

#### Total Renewable Water Resources - TRWR (Unit: 10^9 m3/year)
It corresponds to the maximum theoretical yearly amount of water available for a country at a given moment.

#### Total renewable water resources per capita (Unit: m3/inhab/year)
Total annual actual renewable water resources per inhabitant.

#### Dependency Ratio (Unnt: %)
Indicator expressing the percent of total renewable water resources originating outside the country. This indicator may theoretically vary between 0% and 100%. A country with a dependency ratio equal to 0% does not receive any water from neighbouring countries. A country with a dependency ratio equal to 100% receives all its renewable water from upstream countries, without producing any of its own.

#### Water Stress (Unit %)
This parameter is an indication of the pressure on the renewable water resources. It is based on the Total freshwater withdrawn in a given year, which is expressed in percentage of the total renewable water resources (TRWR).  It is the Millennium Development Goal (MDG) Indicator 7.5 and the Sustainable Development Goal (SDG) indicator 6.4.2.

[SDG 6.4.2. Water Stress] = 100*[Total freshwater withdrawal (primary and secondary)]/([Total renewable water resources]-[Environmental Flow Requirements])

#### Flood Occurrence (WRI) (Value: 0-5)
A normalized indicator of the number of floods recorded from 1985 to 2011, using the total number of floods observed in that period. The indicator was created by the World Resources Institute (WRI) and ranges from 0-5, where 0 is lowest and 5 is highest. 

#### Total Population with access to safe drinking-water (JMP) (Unit: %)
Percentage of the total population using improved water sources. An “improved” source is one that is likely to provide "safe" water, such as a household connection, a borehole, etc. 

