import os
import pandas as pd

from flask import Flask
from flask import render_template, jsonify

from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, inspect

app = Flask(__name__)

#################################################
# Database Setup
#################################################
# db_uri = os.getenv("DATABASE_URI", "///../../data/data.sqlite")
db_uri ="sqlite:///../../data/Aquastat.sqlite"
engine = create_engine(db_uri)

# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# # Assign each table class to a variable
# data = Base.classes.Data

# Create a session
session = Session(engine)


@app.route('/')
def home():
  return render_template('index.html', title='Home')

@app.route('/glossary')
def glossary():
  return render_template('glossary.html', title='Glossary')


@app.route('/thesis')
def thesis():
  return render_template('thesis.html', title='Thesis')

@app.route('/gdp')
def gdp():
  return render_template('gdp.html', title='Gross Domestic Product (GDP)')

@app.route('/hdi')
def irrigation():
  return render_template('hdi.html', title='Human Development Index (HDI)')

@app.route('/gii')
def land():
  return render_template('gii.html', title='Gender Inequality Index (GII)')

@app.route('/data')
def resources():
  return render_template('data.html', title='Data for 2013-2017')

# This route displays the page with the three scatter plots of hdi, gii and gdp vs %Urbanized
# and the bubbl eplot of hdi, gii and gdp
@app.route('/hdi-gdp-gii')
def show_hdi_plots():  
  return render_template('pop-hdi-gdp-plots.html', title='Population based HDI')


# This route gets the data for the hdi, gii and gdp vs % urbanized scatter plots
# and the bubble plot comparing hdi,gii and gdp
@app.route('/hdi-gdp-gii-data')
def show_hdi_plot_data():
  # The years by which the data is categorized. I know from my initial analyis that there
  # is non null values for only these year buckets. That is why I query only these
  years = [2000, 2010, 2015]

  # This is the dictionary object that is finally returned
  hdi_dict = {}

  # query the data for each year bucket
  for year in years:

    query_statement = "SELECT country, year_bucket, gdp_per_cap, hdi, gii, \
                      round(((urban_pop/total_pop)*100), 2) urbanized \
                      FROM Aquastat \
                      WHERE mid_year = " + str(year) + "\
                      AND hdi IS NOT NULL AND gdp_per_cap IS NOT NULL AND gii IS NOT NULL \
                      ORDER BY country"

    results = session.connection().execute(query_statement)
    
    countries = []
    hdi = []
    urbanized = []
    gii = []
    gdp = []

    # Loop through the results and create a dict of arrays for this year bucket
    for result in results:
      countries.append(result[0])
      hdi.append(result[3])
      gii.append(result[4])
      gdp.append(result[2])
      urbanized.append(result[5])

    # Create a dictionary of values for each year
    year_dict = {
      "country": countries,
      "hdi": hdi,
      "gii": gii,
      "gdp": gdp,
      "urbanized": urbanized
    }

    # Add each year dict into the main dict
    hdi_dict["year"+str(year)] = year_dict

  # end for loop

  return jsonify(hdi_dict)

#This route loads the data for the safe water versus gii plot
@app.route('/safe-water-gii-data')
def show_safe_water_gii_plot_data():
  #grabbing data from sql

  conn = engine.connect()

  data = conn.execute('SELECT country, perc_safe_water, gii FROM Aquastat\
    WHERE perc_safe_water IS NOT NULL and gii IS NOT NULL').fetchall()
  df = pd.DataFrame().from_records(data,columns=['country', 'perc_safe_water','gii'])
  df2 = df.groupby('country').mean().reset_index()
  country = df2['country'].tolist()
  perc_safe_water = df2['perc_safe_water'].tolist()
  gii = df2['gii'].tolist()
  safe_water_data = {
    'country': country,
    'perc_safe_water' : perc_safe_water,
    'gii' : gii
  }
  return jsonify(safe_water_data)

@app.route('/hdi-gii-data')
def show_hdi_gii_plot_data():
  #grabbing data from sql

  conn = engine.connect()

  data = conn.execute('SELECT country, hdi, gii FROM Aquastat\
    WHERE hdi IS NOT NULL and gii IS NOT NULL').fetchall()
  df = pd.DataFrame().from_records(data,columns=['country', 'hdi','gii'])
  df2 = df.groupby('country').mean().reset_index()
  country = df2['country'].tolist()
  water_stress = df2['hdi'].tolist()
  gii = df2['gii'].tolist()
  hdi_data = {
    'country': country,
    'hdi' : water_stress,
    'gii' : gii
  }
  return jsonify(hdi_data)

@app.route('/safe-water-gii-plot')
def safe_water_gii_plot():  
  return render_template('safe-water-gii-plot.html', title='GII versus percent availability of safe water')

@app.route('/hdi-gii-plot')
def hdi_gii_plot():  
  return render_template('hdi-gii-plot.html', title='GII versus HDI')  


# This route gets the data for the summary table
@app.route('/summary-table-data')
def show_summary_table():
    query_statement = "SELECT country, year_bucket, total_pop, gdp_per_cap, hdi, gii, \
                    round(((urban_pop/total_pop)*100), 2) urbanized \
                    FROM Aquastat \
                    WHERE mid_year = 2015 \
                    ORDER BY urbanized desc"

    results = session.connection().execute(query_statement)
    
    summary_data = []

    # Loop through the results and create a dict of arrays for this year bucket
    for result in results:
      rowdict = {
        "country": result[0],
        "year_bucket": result[1],
        "total_pop": result[2],
        "gdp": result[3],
        "hdi": result[4],
        "gii": result[5],
        "urbanized": result[6]
      }
      summary_data.append(rowdict)

    return jsonify(summary_data)

@app.route("/map")
def displaymap():
    return render_template("summary_map.html",title='Summary Map')

@app.route("/summarymap/<defaultTopic>")
def map(defaultTopic):
    years = [2000, 2005, 2010, 2015]
    
    map_dict={}

    for year in years:

        query_statement = "SELECT country,cn_code, `year bucket`," + defaultTopic + " \
                        FROM Data \
                        WHERE `mid year` = " + str(year) + "\
                        AND cn_code IS NOT NULL AND "+ defaultTopic + " IS NOT NULL\
                        ORDER BY country"

        results = session.connection().execute(query_statement)
        
        
        countries = []
        country_code =[]
        year_bucket =[]
        value = []
        
        for result in results:
            countries.append(result[0])
            country_code.append(result[1])
            year_bucket.append(result[2])
            value.append(result[3])
            
        year_dict={
            "country":countries,
            "country_code":country_code,
            "year_bucket":year_bucket,
            "value":value,
            
            
        }
        map_dict["year"+str(year)] = year_dict
    return jsonify(map_dict)


if __name__ == "__main__":
    app.run(debug=True)

