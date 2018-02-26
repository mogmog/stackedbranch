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

from app.models import Date, Area, LTESighting, SmallCell, Site, SightingsPerHourPerCountry, SightingsNew, SightingsBase, WideSighting, Journey
from app.models import Department as DepartmentModel
from app.ng_event_models import ZoneDistrict, AttractionTotal, Profile, PurchDistrict, DOWFrequency

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

    @app.route('/api/areas/delete', methods=['POST'])
    def delete_areas():
        # get the access token
        id    = request.data.get('id', 0)
        area = Area.query.filter_by(id=id).first()

        if (area is not None):
          area.delete()

        return make_response(jsonify({'id':id})), 200


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

      sightings = db.session.query(SightingsBase.site_id, SightingsBase.country, func.count(SightingsBase.roundedtoday))\
                        .filter(SightingsBase.site_id.in_(request.data['selectedRow']))\
                        .filter(SightingsBase.roundedtoday.between(request.data['selectedDates'][0], request.data['selectedDates'][1]))\
                        .group_by(SightingsBase.site_id, SightingsBase.country)\
                        .order_by(SightingsBase.site_id, func.count(SightingsBase.roundedtoday).desc())\

      results = []
      for sighting in sightings.all():
         results.append({'country' : sighting.country, 'site_id' : sighting.site_id, 'count' : sighting[2]})

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/widesightingsnew', methods=['POST', 'GET'])
    def widesightingsnew():

      sightings = db.session.query(WideSighting.site_id, WideSighting.gender, func.count(WideSighting.gender))\
                        .filter(WideSighting.site_id.in_([138, 134]))\
                        .group_by(WideSighting.site_id, WideSighting.gender)

      results = []
      for sighting in sightings.all():
         #gender     = sighting.gender if len(sighting.gender) else 'unknown'
         results.append({'site_id' : sighting.site_id, 'gender' : sighting.gender, 'count' : sighting[2]})

      return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/widesightings', methods=['GET'])
    def widesightings():

      sightings = WideSighting.get_all()

      results = []
      for sighting in sightings:
         results.append(sighting.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/sites', methods=['GET'])
    def get_sites():
      # get all the areas
      sites   = Site.get_all()
      results = []
      for site in sites:
         results.append(site.serialise())

      return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/dates', methods=['GET'])
    def get_dates():
      # get all the areas
      dates   = Date.get_all()
      results = []
      for date in dates:
         results.append(date.serialise())

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

    @app.route('/api/smallcells', methods=['GET'])
    def get_smallcells():
        allSmallCells = SmallCell.query.order_by(SmallCell.id).all()

        results = []
        for smallcell in allSmallCells:
          results.append(smallcell.serialise())

        return make_response(jsonify({ 'list' : results })), 200

    @app.route('/api/smallcells/update', methods=['POST'])
    def update_smallcell():
        smallcell_id    = request.data.get('id', '')
        site_id  = request.data.get('site_id', '')

        smallcell = SmallCell.query.filter_by(id=smallcell_id).first()
        smallcell.site_id = site_id
        smallcell.save()

        return make_response(jsonify({ 'smallcell_id' : smallcell.id, 'site_id' : smallcell.site_id })), 200

    @app.route('/api/sighting/byarea/<areaid>', methods=['GET'])
    def get_sighting(areaid):
        import string
        area = Area.query.filter_by(id=areaid).first()
        if area is None : return make_response(jsonify({ 'list' : [] })), 200

        sites = []
        for site in Site.get_all():
            if area.contains(site):
              sites.append(str(site.id))

        def generate_random_data(num_rows):
            import random
            latitude = 51.51451110408478
            longitude = -0.12620388576521444
            result = []
            for _ in range(num_rows):
                dec_lat = random.random()/10
                dec_lon = random.random()/10
                result.append({'lat' : latitude + dec_lat, 'lng' : longitude + dec_lon})
            return result

        results = []
        if (len(sites) > 0):
          for row in db.session.execute('select * from get_gender_crossfilter(ARRAY[' + ','.join(sites) + '])'):

            results.append(({ 'geos': generate_random_data(5), 'gender' : row['__gender'], 'age_range' : row['__age_range'], 'timestamp' : row['__sighting_date'], 'count' : row['__count'] }))

        return make_response(jsonify({ 'list' : results })), 200



    @app.route('/api/sighting/getgender/', methods=['POST'])
    def get_gender():

        site_ids            = str(request.data.get('site_ids', ''))
        from_sighting_date  = request.data.get('selectedDates')[0]
        to_sighting_date    = request.data.get('selectedDates')[1]

        import string

        results = []

        for row in db.session.execute("select * from get_gender(ARRAY[" + site_ids + "]," + "'" + from_sighting_date + "'" + "," + "'" + to_sighting_date + "'" + ")"):
          results.append(({ 'site_id' : row['__site_id'], 'date_month' : row['__date_month'], 'gender' : row['__gender'], 'age_range' : row['__age_range'], 'perc_visits' : row['__perc_visits'], 'scaled_visits' : row['__scaled_visits'] }))

        return make_response(jsonify({ 'list' : results })), 200


    @app.route('/api/sighting/getgendertotals/', methods=['POST'])
    def get_gender_age_totals():

        site_ids            = str(request.data.get('site_ids', ''))
        from_sighting_date  = request.data.get('selectedDates')[0]
        to_sighting_date    = request.data.get('selectedDates')[1]

        import string

        results = []

        for row in db.session.execute("select * from get_gender_age_totals(ARRAY[" + site_ids + "]," + "'" + from_sighting_date + "'" + "," + "'" + to_sighting_date + "'" + ")"):
          results.append(({ 'site_id' : row['__site_id'],  'gender' : row['__gender'], 'age_range' : row['__age_range'], '__visits' : row['__visits'] }))

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

    @app.route('/api/origindestination/all', methods=['GET'])
    def get_all():
       journeys = Journey.query.all()
       thing = {}
       for journey in journeys:
        if (journey.origin_id not in thing) :
          thing[journey.origin_id] = {}
        if (journey.destination_id not in thing[journey.origin_id] and journey.destination_id != journey.origin_id) :
          thing[journey.origin_id][journey.destination_id] = journey.data['total']

       return make_response(jsonify(thing)), 200

    @app.route('/api/origindestination/<origin_id>', methods=['GET'])
    def get_od(origin_id):
       journeys = Journey.query.all()#.filter_by(origin_id=origin_id).all()
       _j = []
       for journey in journeys:
        _j.append({'origin_id' : journey.origin_id, 'destination_id' : journey.destination_id, 'total' : journey.data['total']})
        #_j.append({'origin_id' : journey.origin_id, 'data' : (journey.data)})

       return make_response(jsonify({ 'list' : _j })), 200

    @app.route('/api/ng_event/purchase/<home_district_name>/<type_visitor>', methods=['GET'])
    def purchase(home_district_name, type_visitor):

      days_sql = db.session.query(PurchDistrict.start_dow, func.count(PurchDistrict.start_dow))\
                                     .group_by(PurchDistrict.start_dow)\
                                     .filter(PurchDistrict.home_district_name.in_([home_district_name]))\
                                     .filter(PurchDistrict.type_visitor.in_([type_visitor]))\
                                     .order_by(func.count(PurchDistrict.start_dow).desc())\
                                     .all()

      gender_sql = db.session.query(PurchDistrict.gender, func.count(PurchDistrict.gender))\
                                       .group_by(PurchDistrict.gender)\
                                       .filter(PurchDistrict.home_district_name.in_([home_district_name]))\
                                       .filter(PurchDistrict.type_visitor.in_([type_visitor])).all()

      gender_age_sql = db.session.query(PurchDistrict.gender, PurchDistrict.age, func.count(PurchDistrict.gender))\
                                       .group_by(PurchDistrict.gender, PurchDistrict.age)\
                                       .filter(PurchDistrict.gender.isnot(None))\
                                        .filter(PurchDistrict.age.isnot(None))\
                                       .filter(PurchDistrict.home_district_name.in_([home_district_name]))\
                                       .filter(PurchDistrict.type_visitor.in_([type_visitor])).all()


      gender_age_rent_sql = db.session.query(PurchDistrict.gender, PurchDistrict.age, PurchDistrict.rent, func.count(PurchDistrict.gender))\
                                            .group_by(PurchDistrict.gender, PurchDistrict.age, PurchDistrict.rent)\
                                            .filter(PurchDistrict.gender.isnot(None))\
                                            .filter(PurchDistrict.age.isnot(None))\
                                            .filter(PurchDistrict.type_visitor.in_([type_visitor])).all()

      days_total          = sum(i[1] for i in days_sql)
      gender_total        = sum(i[1] for i in gender_sql)
      gender_age_total    = sum(i[2] for i in gender_age_sql)

      print days_total

      days_results = []
      for result in days_sql:
        days_results.append({ 'start_dow' : result.start_dow, 'count' : result[1], 'percent' : result[1]/days_total, 'total' : days_total})

      gender_results = []
      for result in gender_sql:
        gender_results.append({'gender' : result.gender, 'count' : result[1], 'percent' : result[1]/gender_total})

      gender_age_results = []
      for result in gender_age_sql:
        gender_age_results.append({'gender' : result.gender, 'age' : result.age, 'count' : result[2], 'percent' : result[2]/gender_age_total})

      return make_response(jsonify({'days' : days_results, 'gender' : gender_results, 'gender_age' : gender_age_results})), 200


    @app.route('/api/ng_event/purchase_affluence/<type_visitor>', methods=['GET'])
    def purchase_rent(type_visitor):

      gender_sql = db.session.query(PurchDistrict.gender, func.count(PurchDistrict.gender))\
                                             .group_by(PurchDistrict.gender)\
                                             .filter(PurchDistrict.type_visitor.in_([type_visitor])).all()

      gender_age_rent_sql = db.session.query(PurchDistrict.gender, PurchDistrict.age, PurchDistrict.rent, func.count(PurchDistrict.gender))\
                                            .group_by(PurchDistrict.gender, PurchDistrict.age, PurchDistrict.rent)\
                                            .filter(PurchDistrict.gender.isnot(None))\
                                            .filter(PurchDistrict.age.isnot(None))\
                                            .filter(PurchDistrict.type_visitor.in_([type_visitor])).all()

      gender_total = sum(i[1] for i in gender_sql)

      gender_results = []
      for result in gender_sql:
        gender_results.append({'gender' : result.gender, 'count' : result[1], 'percent' : result[1]/gender_total})

      gender_age_rent_results = []
      for result in gender_age_rent_sql:
       gender_age_rent_results.append({'gender' : result.gender, 'age' : result.age, 'rent' : result.rent, 'count' : result[3]})

      return make_response(jsonify({'gender' : gender_results, 'gender_age_rent' : gender_age_rent_results})), 200


    @app.route('/api/ng_event/districts', methods=['GET'])
    def districts():

      home_results = []
      for result in db.session.query(ZoneDistrict.home_district_code, ZoneDistrict.home_district_name, func.sum(ZoneDistrict.visitors)).group_by(ZoneDistrict.home_district_code, ZoneDistrict.home_district_name).all():
        home_results.append({'district_code' : result.home_district_code, 'district_name' : result.home_district_name, 'visitors' : result[2]})

      work_results = []
      for result in db.session.query(ZoneDistrict.work_district_code, ZoneDistrict.work_district_name, func.sum(ZoneDistrict.visitors)).group_by(ZoneDistrict.work_district_code, ZoneDistrict.work_district_name).all():
        work_results.append({'district_code' : result.work_district_code, 'district_name' : result.work_district_name, 'visitors' : result[2]})

      return make_response(jsonify({'work' : { 'list' : work_results }, 'home' : { 'list' : home_results }})), 200


    @app.route('/api/ng_event/attractiontotals', methods=['GET'])
    def attractiontotals():

      results = []
      for result in db.session.query(AttractionTotal.zone_visitors, AttractionTotal.num_visitors).all():
        results.append({'zone_visitors' : result.zone_visitors, 'num_visitors' : result.num_visitors})

      return make_response(jsonify({'totals' : { 'list' : results }})), 200


    @app.route('/api/ng_event/profiles', methods=['GET'])
    def profiles():

      results = []
      for result in db.session.query(Profile.country, Profile.nationality, Profile.name_province, Profile.gender, Profile.age, Profile.rent, Profile.type_visitor, Profile.date, Profile.day, Profile.period, Profile.name_tur_zone).limit(10000):
        district = ''
        if result.name_tur_zone == 'Zone 1' : district = 'Chamartin'
        if result.name_tur_zone == 'Zone 2' : district = 'Chamberi'
        if result.name_tur_zone == 'Zone 3' : district = 'Salamanca'

        day = ''
        if result.day == 'Monday' : day = 'Mon'
        if result.day == 'Tuesday' : day = 'Tue'
        if result.day == 'Wednesday' : day = 'Wed'
        if result.day == 'Thursday' : day = 'Thu'
        if result.day == 'Friday' : day = 'Fri'
        if result.day == 'Saturday' : day = 'Sat'
        if result.day == 'Sunday' : day = 'Sun'

        results.append({'country' : result.country, 'nationality' : result.nationality, 'name_province' : district, 'gender' : result.gender, 'age' : result.age, 'rent' : result.rent, 'type_visitor' : result.type_visitor, 'date' : result.date, 'day' : day, 'period' : result.period, 'zone' : result.name_tur_zone })

      return make_response(jsonify(results)), 200

    @app.route('/api/ng_event/dowfreq', methods=['GET'])
    def dowfreq():

      results = []
      for result in db.session.query(DOWFrequency.type_visitor, DOWFrequency.start_dow, DOWFrequency.start_hour, DOWFrequency.count).all():
        results.append({'type_visitor' : result.type_visitor, 'start_dow' : result.start_dow, 'start_hour' : result.start_hour, 'count' : result.count })

      return make_response(jsonify(results)), 200

    return app
