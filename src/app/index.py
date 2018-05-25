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
db_uri ="sqlite:///../../data/data.sqlite"
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

@app.route('/hdi-gdp-gii')
def show_hdi_plots():  
  return render_template('pop-hdi-gdp-plots.html', title='Population based HDI')


@app.route('/hdi-gdp-gii-data')
def show_hdi_plot_data():
  years = [2000, 2010, 2015]

  hdi_dict = {}

  for year in years:

    query_statement = "SELECT country, `mid year`, `year bucket`, gdp_per_cap, hdi, gii, \
                      rural_pop, urban_pop, total_pop, round(((urban_pop/total_pop)*100), 2) urbanized \
                      FROM Data \
                      WHERE `mid year` = " + str(year) + "\
                      AND hdi IS NOT NULL AND gdp_per_cap IS NOT NULL AND gii IS NOT NULL \
                      ORDER BY `mid year`"

    results = session.connection().execute(query_statement)
    
    countries = []
    hdi = []
    urbanized = []

    for result in results:
      countries.append(result[0])
      hdi.append(result[4])
      urbanized.append(result[9])
      year_bucket = result[2]

    print("YEAR IS : " + year_bucket)
    year_dict = {
      "country": countries,
      "hdi": hdi,
      "urbanized": urbanized
    }

    hdi_dict["year"+str(year)] = year_dict
  # end for loop

  return jsonify(hdi_dict)

if __name__ == "__main__":
    app.run(debug=True)