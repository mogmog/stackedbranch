import os
from flask_api import FlaskAPI, status
from flask_sqlalchemy import SQLAlchemy
from app import db, create_app
from app.models import Area, Site, Sensor, LTESighting, Network

create_app(config_name=os.getenv('APP_SETTINGS')).app_context().push()

print (Site.get_all().all())

Site('Carnaby Street').save()

Site('Carnaby Street').save()

import csv



with open('data/networks.csv') as csvfile:

    reader = csv.reader(csvfile)
    for row in list(reader):
     network =  (Network(row[1], row[0], row[2]))
     network.save()


with open('data/lteSghtlogs_20171118.0000+0000-20171120.0000+0000_vdc21_4108.csv') as csvfile:

    from random import uniform

    reader = csv.reader(csvfile)
    for row in list(reader):
     sighting =  (LTESighting(row[1], row[2], row[3], row[5], row[6]))
     sighting.save()

     sensor = Sensor.query.filter_by(id=row[2]).first()
     if sensor:
        _s = sensor
     else:
        _s = Sensor(row[2], uniform(-180,180), uniform(-90, 90))
        _s.save()

     print (_s)
