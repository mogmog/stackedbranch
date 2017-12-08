from app import db
from flask_bcrypt import Bcrypt
from flask import current_app
import jwt
from datetime import datetime, timedelta
from sqlalchemy.dialects.postgresql import JSON

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

    @staticmethod
    def get_all():
        return Area.query

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Area: {}>".format(self.name)



class Network(db.Model):
    __tablename__ = 'networks'
    id = db.Column(db.Integer, primary_key=True)
    country = db.Column(db.String)
    network = db.Column(db.String)

    def __init__(self, id, country, network):
       self.id = id
       self.country = country
       self.network = network

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Network.query

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Network: {}>".format(self.id)

class Sensor(db.Model):
    __tablename__ = 'sensors'
    id = db.Column(db.String, primary_key=True)
    lat = db.Column(db.Float)
    lng = db.Column(db.Float)

    def __init__(self, id, lat, lng):
       self.id = id
       self.lat = lat
       self.lng = lng

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Sensor.query

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Sensor: {}>".format(self.id)



class Site(db.Model):
    __tablename__ = 'sites'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))

    def __init__(self, name):
       self.name = name

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return Site.query

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Site: {}>".format(self.name)



class LTESighting(db.Model):
    __tablename__ = 'ltesighting'

    id = db.Column(db.Integer, primary_key=True)
    timestamp   = db.Column(db.DateTime)
    sensor_id   = db.Column(db.Text, db.ForeignKey('sensors.id'))
    imsi_hash   = db.Column(db.Text)
    hplmn_id    = db.Column(db.Integer, db.ForeignKey('networks.id'))
    hplmn       = db.relationship(Network, uselist=False)
    sensor      = db.relationship(Sensor, uselist=False)

    def __init__(self, timestamp, sensor_id, site_id, imsi_hash, hplmn_id):
        self.timestamp = timestamp
        self.sensor_id = sensor_id
        self.site_id = site_id
        self.imsi_hash = imsi_hash
        self.hplmn_id = hplmn_id

    def save(self):
        db.session.add(self)
        db.session.commit()

    @staticmethod
    def get_all():
        return LTESighting.query

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<LTESighting: {}>".format(self.id)

