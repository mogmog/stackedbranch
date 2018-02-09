from app import db

class ZoneDistrict(db.Model):
    __table__ = db.Table('ng_event_tableau_zone_district', db.Model.metadata,
        db.Column('home_district_code', db.String, primary_key=True),
        db.Column('home_district_name', db.String, primary_key=True),

        db.Column('work_district_code', db.String, primary_key=True),
        db.Column('work_district_name', db.String, primary_key=True),

        db.Column('visitors', db.Integer, primary_key=True),
        )

class PurchDistrict(db.Model):
    __table__ = db.Table('ng_event_tableau_purch_district', db.Model.metadata,
        db.Column('gender', db.String, primary_key=True),
        db.Column('age', db.String, primary_key=True),
        db.Column('type_visitor', db.String, primary_key=True),
        db.Column('home_district_name', db.String, primary_key=True)
        )

class AttractionTotal(db.Model):
    __table__ = db.Table('ng_event_tableau_tot', db.Model.metadata,
        db.Column('zone_visitors', db.String, primary_key=True),
        db.Column('num_visitors', db.Numeric, primary_key=False),
        )


class Profile(db.Model):
    __table__ = db.Table('datos_madriddestino_profile', db.Model.metadata,
        db.Column('country', db.String, primary_key=True),
        db.Column('nationality', db.String, primary_key=True),
        db.Column('name_province', db.String, primary_key=True),
        db.Column('gender', db.String, primary_key=True),
        db.Column('age', db.String, primary_key=True),
        db.Column('rent', db.String, primary_key=True),
        db.Column('type_visitor', db.String, primary_key=True),
        db.Column('date', db.Date, primary_key=True),
        db.Column('period', db.String, primary_key=True),
        db.Column('name_tur_zone', db.String, primary_key=True))






