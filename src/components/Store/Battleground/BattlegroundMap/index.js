import React, { PureComponent } from 'react';
import { Map, TileLayer, Marker } from 'react-leaflet';
import _ from 'lodash';

import Choropleth from '../../../Common/Mapping/Choropleth';

const districts = require('json!./../../../../assets/mapping/geojson/madrid_districts.geo.json');

class BattlegroundMap extends PureComponent {

  state = {};

  render() {

    const {data, type, districtClick, districtHover} = this.props;

    const districtsToShow = ['Chamartin', 'Chamberi', 'Salamanca'];

    const style = {
      fillColor: 'lightblue',
      weight: 2,
      opacity: 0.5,
      color: 'blue',
      fillOpacity: 0.5,
    }

    return (
      <div style={{'width' : '100%'}}>

        <Map ref={ (map) => this.map = map } zoomControl={false} center={[40.458527, -3.691853]} zoom={14} style={{'height': '100vh'}} >

          <TileLayer opacity={0.8} url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>

          <Choropleth
            onClick={districtClick}
            data={{'type' : 'featureCollection', 'features' : _(districts.features).filter(x=> _(districtsToShow).includes(x.properties.name)).value()}}
            valueProperty={(feature, i) =>  {console.log(i)}}
            visible={(feature) => { return true }}

            scale={['#7F387F', '#FF77FF']}
            steps={20}
            style={style}
            mode='e'

          />

          <Marker position={[40.432127, -3.671853]} ></Marker>

        </Map>
      </div>
    );
  }
}

export default BattlegroundMap;







