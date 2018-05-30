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
db_uri = "sqlite:///../../data/data.sqlite"
db_uri = "sqlite:///../../data/Aquastat.sqlite"
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

@app.route('/gdp')
def gdp():
  return render_template('gdp.html', title='Gross Domestic Product')

@app.route('/irrigation')
def irrigation():
  return render_template('irrigation.html', title='Irrigation')

@app.route('/land')
def land():
  return render_template('land_use.html', title='Land')

@app.route('/resources')
def resources():
  return render_template('resources.html', title='Resources')

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

    query_statement = "SELECT country, `year bucket`, gdp_per_cap, hdi, gii, \
                      round(((urban_pop/total_pop)*100), 2) urbanized \
                      FROM Data \
                      WHERE `mid year` = " + str(year) + "\
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
    hdi_dict["year" + str(year)] = year_dict

  # end for loop

  return jsonify(hdi_dict)

#This route loads the data for the safe water versus gii plot
@app.route('/safe-water-gii-data')
def show_safe_water_gii_plot_data():
  #grabbing data from sql

  conn = engine.connect()

  data = conn.execute('SELECT country, water_stress, gii FROM Aquastat\
    WHERE water_stress IS NOT NULL and gii IS NOT NULL').fetchall()

  df = pd.DataFrame().from_records(data, columns=['country', 'water_stress','gii'])
  df2 = df.groupby('country').mean().reset_index()
  country = df2['country'].tolist()
  water_stress = df2['water_stress'].tolist()
  gii = df2['gii'].tolist()
  safe_water_data = {
    'country' : country,
    'water_stress' : water_stress,
    'gii' : gii
  }
  
  return jsonify(safe_water_data)



if __name__ == "__main__":
    app.run(debug=True)