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

    @staticmethod
    def delete_all():
        db.session.query(Area).delete()
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def __repr__(self):
        return "<Area: {}>".format(self.name)



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


class Site(db.Model):
    __tablename__ = 'sites'
    id          = db.Column(db.Integer, primary_key=True)
    name        = db.Column(db.String(255))
    smallcells  = db.relationship(SmallCell)

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
                 'name': self.name,
                 'smallcells' : [(i.serialise()) for i in self.smallcells ]
              }

class LTESighting(db.Model):
    __tablename__ = 'ltesighting'

    id = db.Column(db.Integer, primary_key=True)
    timestamp   = db.Column(db.DateTime)
    smallcell_id   = db.Column(db.Text, db.ForeignKey('smallcells.id'))
    imsi_hash   = db.Column(db.Text)
    hplmn_id    = db.Column(db.Integer, db.ForeignKey('networks.id'))
    hplmn       = db.relationship(Network, uselist=False)
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
                       'id': self.id,
                       'timestamp' : self.timestamp,
                       'timestamp' : self.timestamp,
                       'smallcell' : self.smallcell.serialise()

                    }

