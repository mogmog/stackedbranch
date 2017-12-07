import React, {PureComponent} from 'react';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';

class AreaSelectMap extends PureComponent {

  constructor() {
    super();
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: (e) => layer.setStyle({fillColor: "green", fillOpacity: 0.8, weight: 0.5})
    });
  }

  getGeoJson() {

    const areas =
      {
        "list": [
          {
            "center_lat": 51.5072112155924,
            "center_lng": -0.120342830199516,
            "date_created": "Thu, 07 Dec 2017 14:21:41 GMT",
            "date_modified": "Thu, 07 Dec 2017 14:21:41 GMT",
            "geodata": {
              "geometry": {
                "coordinates": [
                  [
                    [
                      -0.185394,
                      51.522416
                    ],
                    [
                      -0.123596,
                      51.547189
                    ],
                    [
                      -0.057678,
                      51.483949
                    ],
                    [
                      -0.109863,
                      51.469408
                    ],
                    [
                      -0.185394,
                      51.522416
                    ]
                  ]
                ],
                "type": "Polygon"
              },
              "properties": {},
              "type": "Feature"
            },
            "id": 59,
            "name": "kjhjhjhhhh",
            "zoom": 10
          },
          {
            "center_lat": 51.6485960130851,
            "center_lng": -0.0737455540498555,
            "date_created": "Thu, 07 Dec 2017 14:32:18 GMT",
            "date_modified": "Thu, 07 Dec 2017 14:32:18 GMT",
            "geodata": {
              "geometry": {
                "coordinates": [
                  [
                    [
                      -0.105057,
                      51.659779
                    ],
                    [
                      -0.153122,
                      51.646146
                    ],
                    [
                      -0.028152,
                      51.634215
                    ],
                    [
                      -0.019913,
                      51.658075
                    ],
                    [
                      -0.105057,
                      51.659779
                    ]
                  ]
                ],
                "type": "Polygon"
              },
              "properties": {},
              "type": "Feature"
            },
            "id": 60,
            "name": "Enfield",
            "zoom": 10
          }
        ]
      }


    return {
      "type": "FeatureCollection",
      "features": areas.list.map((x) => x.geodata),
    }
  }


  render() {

    return (
      <Map zoomControl={false} center={[10, 10]} zoom={5}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
        <GeoJSON data={this.getGeoJson()} onEachFeature={this.onEachFeature}/>
      </Map>
    );
  }
}

export default AreaSelectMap;
