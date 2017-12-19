# app/__init__.py
import json
from flask_api import FlaskAPI, status
import graphene
from graphene import relay
from graphene_sqlalchemy import SQLAlchemyConnectionField, SQLAlchemyObjectType
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func
from flask import request, jsonify, abort, make_response

from flask_graphql import GraphQLView

from shapely.geometry import shape, Point

# local import

from instance.config import app_config

# For password hashing
from flask_bcrypt import Bcrypt

# initialize db
db = SQLAlchemy()

from app.models import Area, LTESighting, SmallCell, Site, SightingsPerHourPerCountry, SightingsNew
from app.models import Department as DepartmentModel

class Department(SQLAlchemyObjectType):

  class Meta:
     model = DepartmentModel
     interfaces = (relay.Node, )

class Query(graphene.ObjectType):
    node = relay.Node.Field()
    all_employees = SQLAlchemyConnectionField(Department)

def create_app(config_name):

    app = FlaskAPI(__name__, instance_relative_config=True)
    # overriding Werkzeugs built-in password hashing utilities using Bcrypt.
    bcrypt = Bcrypt(app)

    schema = graphene.Schema(query=Query)

    app.add_url_rule('/graphql', view_func=GraphQLView.as_view('graphql', schema=schema, graphiql=True))

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

    @app.route('/api/sightingsperhour', methods=['GET'])
    def get_sightingsperhour():
      # get all the areas
      sightings   = SightingsPerHourPerCountry.query.all()
      results = []
      for sighting in sightings:
         results.append({'country' : sighting.country, 'hour' : sighting.hour, 'count' : sighting.count})

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/sightingsnew', methods=['POST'])
    def sightingsnew():

      #remembert to keep the keep the filters in sync
      #TODO is there a better way to do this
      sightings = SightingsNew.query\
                        .filter(SightingsNew.site_id.in_(request.data['selectedRow']))\
                        .filter(SightingsNew.day.between(request.data['selectedDates'][0], request.data['selectedDates'][1]))


      groupedsightings = db.session.query(SightingsNew.country, SightingsNew.site_id, func.count(SightingsNew.country))\
                        .filter(SightingsNew.site_id.in_(request.data['selectedRow']))\
                        .filter(SightingsNew.day.between(request.data['selectedDates'][0], request.data['selectedDates'][1]))\
                        .group_by(SightingsNew.country, SightingsNew.site_id).all()

      groupedresults = []
      for element in groupedsightings:
        obj = {}
        obj['label'] = (element)[0]
        obj[str((element)[1])] = (element)[2]
        groupedresults.append(obj)

      results = []
      for sighting in sightings:
         results.append({'country' : sighting.country, 'network' : sighting.network, 'day' : sighting.day, 'count' : sighting.count, 'site_id' : sighting.site_id})


      return make_response(jsonify({ 'list' : results, 'grouped' : groupedresults })), 200


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

    @app.route('/api/sitescomparison', methods=['POST'])
    def get_sitescomparison():

        sightings = LTESighting.query\
                    .filter(LTESighting.smallcell.has(SmallCell.site_id.in_(request.data['selectedRow'])))\
                    .filter(LTESighting.timestamp.between(request.data['selectedDates'][0], request.data['selectedDates'][1]))

        return make_response(jsonify({ 'list' : [sighting.serialise() for sighting in sightings] })), 200

    @app.route('/api/sighting/bysite', methods=['GET'])
    def get_sightings_by_site():

        site_ids = (request.args.getlist('site_id'))

        results = []
        #should do this better with joins!
        for sighting in LTESighting.query:
            if (str(sighting.smallcell.site_id)) in site_ids : results.append(sighting.serialise())

        return make_response(jsonify({ 'list' : results })), 200

    return app
