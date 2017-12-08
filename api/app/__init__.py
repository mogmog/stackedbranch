# app/__init__.py
import json
from flask_api import FlaskAPI, status
from flask_sqlalchemy import SQLAlchemy

from flask import request, jsonify, abort, make_response

from shapely.geometry import shape, Point

# local import

from instance.config import app_config

# For password hashing
from flask_bcrypt import Bcrypt

# initialize db
db = SQLAlchemy()

def create_app(config_name):

    from app.models import Area, LTESighting

    app = FlaskAPI(__name__, instance_relative_config=True)
    # overriding Werkzeugs built-in password hashing utilities using Bcrypt.
    bcrypt = Bcrypt(app)

    app.config.from_object(app_config[config_name])
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)

    @app.route('/api/areas/create', methods=['POST'])
    def create_areas():
        # get the access token

        name    = request.data.get('name', '')
        geodata  = request.data.get('geodata', '')
        center_lat  = request.data.get('center_lat')
        center_lng  = request.data.get('center_lng')
        zoom  = request.data.get('zoom')

        area = Area(name=name, geodata=geodata, center_lat=center_lat, center_lng=center_lng, zoom=zoom)
        area.save()
        response = jsonify({
            'id': area.id,
            'name': area.name,
            'geodata': area.geodata,
            'center_lat' : area.center_lat,
            'center_lng' : area.center_lng,
            'zoom' : area.zoom,
            'date_created': area.date_created,
            'date_modified': area.date_modified
        })

        return make_response(response), 201

    @app.route('/api/areas', methods=['GET'])
    def get_areas():
        # get all the areas
        areas = Area.get_all()
        results = []

        for area in areas:
            obj = {
                'id': area.id,
                'name': area.name,
                'date_created': area.date_created,
                'date_modified': area.date_modified,
                'center_lat' : area.center_lat,
                'center_lng' : area.center_lng,
                'zoom' : area.zoom,
                'geodata': area.geodata
            }
            results.append(obj)

        return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/sighting/byarea/<areaid>', methods=['GET'])
    def get_sighting(areaid):

        area = Area.query.filter_by(id=areaid).first()
        if area is None : return make_response(jsonify({ 'list' : [] })), 200

        area_polygon = shape(area.geodata['geometry'])

        results = []
        for sighting in LTESighting.get_all():

            obj = {
                'id' : sighting.id,
                'timestamp' : sighting.timestamp,
                'sensor' : {
                    'id' : sighting.sensor.id,
                    'latlng' : [sighting.sensor.lat, sighting.sensor.lng],
                },
                'network': {
                    'country' : sighting.hplmn.country,
                    'network' : sighting.hplmn.network,
                    'id' : sighting.hplmn.id
                }
            }

            if area_polygon.contains(Point(sighting.sensor.lng, sighting.sensor.lat)):
                results.append(obj)

        return make_response(jsonify({ 'list' : results })), 200

    return app
