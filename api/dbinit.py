import os
import csv
from flask_api import FlaskAPI, status
from flask_sqlalchemy import SQLAlchemy
from app import db, create_app
from app.models import Area, Site, SmallCell, LTESighting, Network

create_app(config_name=os.getenv('APP_SETTINGS')).app_context().push()

#delete everything.
LTESighting.delete_all()
SmallCell.delete_all()
Site.delete_all()
Area.delete_all()
Network.delete_all()


site1 = Site('Tesco Oxford Street')
site1.save()
site2 = Site('Tesco Regent Street')
site2.save()


if True:
  with open('data/networks.csv', 'r') as csvfile:

      reader = csv.reader(csvfile)
      for row in list(reader):
        network =  (Network(row[0], row[5], row[2], row[7]))
        network.save()

with open('data/lteSghtlogs_20171118.0000+0000-20171120.0000+0000_vdc21_4108.csv') as csvfile:

    from random import uniform

    reader = csv.reader(csvfile)
    for row in list(reader):

     smallcell = SmallCell.query.filter_by(id=row[2]).first()
     if smallcell:
        _s = smallcell
     else:
        _s = SmallCell(site1, row[2], uniform(-0.132132,-0.123463), uniform(51.511453, 51.515460))
        _s.save()

     print row[6]
     network = Network.query.filter_by(id=row[6]).first()

     if network:
      sighting =  (LTESighting(row[1], row[2], row[3], row[5], row[6]))
      sighting.save()

    #try :
    #  sighting =  (LTESighting(row[1], row[2], row[3], row[5], row[6]))
    #  sighting.save()
    #except:
    #  pass
