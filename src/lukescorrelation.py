import pandas as pd
import numpy as np
import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import inspect

from sqlalchemy import create_engine, func

engine = create_engine('sqlite:///../data/Aquastat.sqlite')

Base=automap_base()
Base.prepare(engine, reflect = True)
inspector = inspect(engine)
inspector.get_table_names()
session=Session(engine)
conn = engine.connect()

data=conn.execute('SELECT country, dependency_ratio FROM Aquastat').fetchall()

df=pd.DataFrame().from_records(data, columns=[['country','dependency_ratio']])

