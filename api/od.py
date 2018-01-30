import os
import csv
from random import *
from flask_api import FlaskAPI, status
from flask_sqlalchemy import SQLAlchemy
from app import db, create_app
from app.models import Journey


create_app(config_name=os.getenv('APP_SETTINGS')).app_context().push()

if True:

  Journey.delete_all()

  directory = os.fsencode('data/data/market/uk/data/level_1')

  for file in os.listdir(directory):
     filename = os.fsdecode(file)

     if filename != '.DS_Store' and filename != '0':

      #go to directory

      with open('data/data/market/uk/data/level_1/' + filename + '/D/file.csv' , 'r') as csvfile:

       reader = csv.reader(csvfile)
       reader = csv.DictReader(csvfile, delimiter=',')

       for row in list(reader):
        journey = Journey(filename, row['area_id'], row)
        journey.save()


