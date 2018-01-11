from app import db
from flask_bcrypt import Bcrypt
from flask import current_app
import jwt
from datetime import datetime, timedelta
from sqlalchemy.dialects.postgresql import JSON
from shapely.geometry import shape, Point

class Area(db.Model):
    __tablename__ = 'areas'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())
    geodata = db.Column(JSON)

    center_lat = db.Column(db.Float)
    center_lng = db.Column(db.Float)
    zoom = db.Column(db.Integer)

    def __init__(self, name, geodata, center_lat, center_lng, zoom):
        self.name = name
        self.geodata = geodata
        self.center_lat = center_lat
        self.center_lng = center_lng
        self.zoom = zoom

    def save(self):
        db.session.add(self)
        db.session.commit()

    def contains(self, smallcell):
      area_polygon = shape(self.geodata['geometry'])
      return area_polygon.contains(Point(smallcell.lat, smallcell.lng))

    @staticmethod
    def get_all():
        return Area.query

    @staticmethod
    def delete_all():
        db.session.query(Area).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Area: {}>".format(self.name)





class Site(db.Model):
    __tablename__ = 'sites'
    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(255))

    def __init__(self, name):
       self.name = name

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Site.query

    @staticmethod
    def delete_all():
        db.session.query(Site).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Site: {}>".format(self.name)

    def serialise(self):

      return  {
                 'id': self.id,
                 'name': self.name
              }

class SmallCell(db.Model):
    __tablename__ = 'smallcells'
    id      = db.Column(db.String, primary_key=True)
    lat     = db.Column(db.Float)
    lng     = db.Column(db.Float)
    site_id = db.Column(db.Integer, db.ForeignKey('sites.id'))
    site    = db.relationship(Site)

    def __init__(self, site, id, lat, lng):
       self.id = id
       self.lat = lat
       self.lng = lng
       self.site_id = site.id
       self.site = site

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return SmallCell.query

    @staticmethod
    def delete_all():
        db.session.query(SmallCell).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<SmallCell: id : {} lat : {}, lng : {}>".format(self.id, self.lat, self.lng)

    def serialise(self):

        return  {
                   'id': self.id,
                   'site_id' : self.site_id,
                   'lat' : self.lat,
                   'lng' : self.lng
                }




class Network(db.Model):
    __tablename__ = 'networks'
    id = db.Column(db.Integer, primary_key=True)

    mcc_id = db.Column(db.Integer)
    country = db.Column(db.String)

    mnc_id = db.Column(db.Integer)
    network = db.Column(db.String)

    def __init__(self, mcc_id, country, mnc_id, network):
       print (mcc_id)
       print (mnc_id)
       self.id = int(str(mcc_id) + str(mnc_id))
       self.mcc_id  = mcc_id
       self.country = country
       self.mnc_id  = mnc_id
       self.network = network

    def save(self):
        db.session.merge(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Network.query

    @staticmethod
    def delete_all():
        db.session.query(Network).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Network: {}>".format(self.mcc_id)


    def serialise(self):
        return {
                'country' : self.country,
                'network' : self.network
                }


class LTESighting(db.Model):
    __tablename__ = 'ltesighting'

    id = db.Column(db.Integer, primary_key=True)
    timestamp   = db.Column(db.DateTime)
    smallcell_id   = db.Column(db.Text, db.ForeignKey('smallcells.id'))
    imsi_hash   = db.Column(db.Text)
    hplmn_id    = db.Column(db.Integer, db.ForeignKey('networks.id'))
    network       = db.relationship(Network, uselist=False)
    smallcell   = db.relationship(SmallCell, uselist=False)

    def __init__(self, timestamp, smallcell_id, site_id, imsi_hash, hplmn_id):
        self.timestamp = timestamp
        self.smallcell_id = smallcell_id
        self.site_id = site_id
        self.imsi_hash = imsi_hash
        self.hplmn_id = hplmn_id

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return LTESighting.query

    @staticmethod
    def delete_all():
        db.session.query(LTESighting).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<LTESighting: {}>".format(self.id)

    def serialise(self):

            return  {
                    'id' : self.id,
                    'timestamp' : self.timestamp,
                    'smallcell' : self.smallcell.serialise(),
                    'network': self.network.serialise()
                    }

class WideSighting(db.Model):
    __tablename__ = 'user_day_sighting_wide'

    user_id           = db.Column(db.Integer, primary_key=True)
    first_sighting    = db.Column(db.DateTime, primary_key=True)
    site_id           = db.Column(db.Text, db.ForeignKey('smallcells.id'))
    gender            = db.Column(db.Text)
    age_range         = db.Column(db.Text)
    continent_name    = db.Column(db.Text)
    handset_make_name = db.Column(db.Text)
    contract_type     = db.Column(db.Text)
    home_ps_area_name = db.Column(db.Text)

    def __init__(self, user_id, first_sighting, site_id, gender, age_range):
        self.user_id = user_id
        self.first_sighting = first_sighting
        self.site_id = site_id
        self.gender = gender
        self.age_range = age_range

    def get_age(self):
      return self.age_range

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return WideSighting.query

    @staticmethod
    def delete_all():
        db.session.query(WideSighting).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<WideSighting: {}>".format(self.id)

    def serialise(self):

            return  {
                    'first_sighting'    : self.first_sighting,
                    'gender'            : self.gender,
                    'age_range'         : self.age_range,
                    'continent_name'    : self.continent_name,
                    'handset_make_name' : self.handset_make_name,
                    'contract_type'     : self.contract_type,
                    'home_ps_area_name' : self.home_ps_area_name
                    }

class Department(db.Model):
    __tablename__ = 'department'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

class SightingsPerHourPerCountry(db.Model):
    __table__ = db.Table('sightingsperhourpercountry', db.Model.metadata,
        db.Column('country', db.String, primary_key=True),
        db.Column('hour', db.Integer, primary_key=True),
        db.Column('count', db.Integer, primary_key=False)
        )

class SightingsNew(db.Model):
    __table__ = db.Table('uniquecountryhandsetsightings', db.Model.metadata,
        db.Column('day', db.DateTime, primary_key=True),
        db.Column('network', db.String, primary_key=True),
        db.Column('country', db.String, primary_key=True),
         db.Column('site_id', db.Integer, primary_key=False),
        db.Column('count', db.Integer, primary_key=False)
        )

class SightingsBase(db.Model):
    __table__ = db.Table('basehandsetsightings', db.Model.metadata,
        db.Column('roundedtohour', db.DateTime, primary_key=True),
        db.Column('network', db.String, primary_key=True),
        db.Column('country', db.String, primary_key=True),
        db.Column('roundedtoday', db.DateTime, primary_key=False),
        db.Column('site_id', db.Integer, primary_key=False),
        )




