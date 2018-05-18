from numpy import genfromtxt
from time import time
from datetime import datetime
from sqlalchemy import Column, Integer, Float, Date, String, VARCHAR
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import csv
import pandas as pd


#def Load_Data(file_name):
    #data = csv.reader(file_name, delimiter=',')# skiprows=1, converters={0: lambda s: str(s)})
    #return data.tolist()

Base = declarative_base()

class Data(Base):
    #Tell SQLAlchemy what the table name is and if there's any table-specific arguments it should know about
    __tablename__ = 'Data'
    __table_args__ = {'sqlite_autoincrement': True}
    #tell SQLAlchemy the name of column and its attributes:
    id = Column(Integer, primary_key=True, nullable=False) 
    Area_id = Column(VARCHAR)
    Year = Column(INT)
    _4114 = Column(DECIMAL)
    _4115 = Column(DECIMAL)
    _4116 = Column(DECIMAL)
    _4150 = Column(DECIMAL)
    _4151 = Column(DECIMAL)
    _4400 = Column(DECIMAL)
    _4401 = Column(DECIMAL)
    _4403 = Column(DECIMAL)
    _4445 = Column(DECIMAL)
    _4472 = Column(DECIMAL)
    _4543 = Column(DECIMAL)

engine = create_engine('sqlite:///data.sqlite')
Base.metadata.create_all(engine)
file_name = 'data/aquastat_environment.csv'
df = pd.read_csv(file_name)
df.to_sql(con=engine, index_label='id', name=Data.__tablename__, if_exists='replace')