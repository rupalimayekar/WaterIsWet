from flask import Flask
from flask import render_template

app = Flask(__name__)

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

if __name__ == "__main__":
    app.run(debug=True)