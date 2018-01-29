import os
import csv
from random import *
from flask_api import FlaskAPI, status
from flask_sqlalchemy import SQLAlchemy
from app import db, create_app
from app.models import Area, Site, SmallCell, LTESighting, Network


create_app(config_name=os.getenv('APP_SETTINGS')).app_context().push()

if True:

  directory = os.fsencode('data/data/market/uk/data/level_1')

  for file in os.listdir(directory):
     filename = os.fsdecode(file)
     print (filename)
