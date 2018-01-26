import React, { PureComponent } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import styles from './styles.less';

var data = require('json!./lad.json');

class TravelOriginDestinationMap extends PureComponent {


  render() {
    return (
      <div>

        <Map zoomControl={false} center={[51.522416, -0.185394]} zoom={6} style={{'height': '750px'}}>
          <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>
          <GeoJSON data={data} />
        </Map>
      </div>
    );
  }
}

export default TravelOriginDestinationMap;
