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

    from app.models import Area, LTESighting, SmallCell, Site

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

    @app.route('/api/sites', methods=['GET'])
    def get_sites():
      # get all the areas
      sites   = Site.get_all()
      results = []
      for site in sites:
         results.append(site.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/areas', methods=['GET'])
    def get_areas():
        # get all the areas
        areas         = Area.get_all()
        allSmallCells = SmallCell.get_all()

        results = []

        for area in areas:

            smallcellInArea = []
            for smallcell in allSmallCells:
              smallcellInArea.append(smallcell.serialise())

            obj = {
                'id': area.id,
                'name': area.name,
                'date_created': area.date_created,
                'date_modified': area.date_modified,
                'center_lat' : area.center_lat,
                'center_lng' : area.center_lng,
                'zoom' : area.zoom,
                'geodata': area.geodata,
                'smallcells' : smallcellInArea
            }
            results.append(obj)

        return make_response(jsonify({ 'list' : results })), 200



    @app.route('/api/sighting/byarea/<areaid>', methods=['GET'])
    def get_sighting(areaid):

        area = Area.query.filter_by(id=areaid).first()
        if area is None : return make_response(jsonify({ 'list' : [] })), 200

        results = []
        for sighting in LTESighting.get_all():
          if area.contains(sighting.smallcell):
            results.append(sighting.serialise())

        return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/sighting', methods=['GET'])
    def get_sightings():

        results = []
        for sighting in LTESighting.get_all():
            results.append(sighting.serialise())

        return make_response(jsonify({ 'list' : results })), 200

    return app
