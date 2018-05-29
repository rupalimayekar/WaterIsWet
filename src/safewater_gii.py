import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import inspect

from sqlalchemy import create_engine, func

engine = create_engine('sqlite:///../data/Aquastat.sqlite')

Base = automap_base()
Base.prepare(engine, reflect = True)
inspector = inspect(engine)
inspector.get_table_names()
session = Session(engine)
conn = engine.connect()

data = conn.execute('SELECT country, water_stress, gii FROM Aquastat').fetchall()
df = pd.DataFrame().from_records(data,columns=[['country', 'hdi','nri']])
df2 = df.groupby('country').mean()
safe_water_data = df2.to_dict
