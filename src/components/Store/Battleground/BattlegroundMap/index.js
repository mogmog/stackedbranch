import React, { PureComponent } from 'react';
import { Map, TileLayer, Marker, GeoJSON, FeatureGroup  } from 'react-leaflet';
import _ from 'lodash';

import StoreIcon from '../../../Common/Mapping/StoreIcon';

const districts = require('json!./../../../../assets/mapping/geojson/madrid_districts.geo.json');

class BattlegroundMap extends PureComponent {

  state = {};

  render() {

    const {data, type, districtClick, colors } = this.props;

    const _districtsToShow = ['Chamartin', 'Chamberi', 'Salamanca'];
    console.log(districts.features);
    const districtsToShow = _(districts.features).filter(x=> _(_districtsToShow).includes(x.properties.name)).value();

    const getStyle = (feature, layer) => {
      return {
        weight: 3,
        'fillOpacity': 0.65,
        'opacity': 0.65,
        'color' : colors(feature.properties.name)
      }
    }

    return (
      <div style={{'width' : '100%'}}>

        <Map attributionControl={false} doubleClickZoom={false} ref={ (map) => this.map = map } zoomControl={false} center={[40.458527, -3.691853]} zoom={13} style={{'height': '100vh'}} >

          <TileLayer opacity={0.3} url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>

          <FeatureGroup map={this.map}  >
            {
              (districtsToShow).map((feature, idx) =>
                <GeoJSON onClick={districtClick} data={feature} style={getStyle} key={idx}/>)
            }
          </FeatureGroup>

          <Marker position={[40.432127, -3.671853]} icon={StoreIcon}></Marker>

        </Map>
      </div>
    );
  }
}

export default BattlegroundMap;







