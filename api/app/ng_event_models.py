from app import db

class ZoneDistrict(db.Model):
    __table__ = db.Table('ng_event_tableau_zone_district', db.Model.metadata,
        db.Column('home_district_code', db.String, primary_key=True),
        db.Column('home_district_name', db.String, primary_key=True),

        db.Column('work_district_code', db.String, primary_key=True),
        db.Column('work_district_name', db.String, primary_key=True),

        db.Column('visitors', db.Integer, primary_key=True),
        )




