import React, { PureComponent } from 'react';
import { Map, TileLayer, GeoJSON, CircleMarker, Marker, Tooltip, Popup} from 'react-leaflet';
import Choropleth from '../../../Common/Mapping/Choropleth';

import StoreIcon from '../../../Common/Mapping/StoreIcon';
import DistrictLabels from './DistrictLabels';
import FeatureHighlight from './FeatureHighlight';
import styles from './DistrictVisitorMap.less';

var districts = require('json!./../../../../assets/mapping/geojson/madrid_districts.geo');


class RegionChooserMap extends PureComponent {

  state = {};

  districtHover(feature) {
    this.setState({'highlightedfeature' : feature});
  }

  render() {

    const {data, type, districtClick, districtHover} = this.props;

    const style = {
      fillColor: 'white',
      weight: 2,
      opacity: 0.7,
      color: 'white',
      fillOpacity: 0.7,
    }

    return (
      <div style={{'width' : '100%'}}>

        <Map attributionControl={false} ref={ (map) => this.map = map } zoomControl={false} center={[40.458527, -3.691853]} zoom={10} style={{ 'height': '280px'}}>

          <TileLayer className={styles.greyscale} opacity={0.3} url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>



            <Choropleth
                        onClick={(feature) => {districtClick(feature)}}
                        onMouseOver={(feature) => this.districtHover(feature)}
                        data={districts}
                        valueProperty={(feature) => { const match =  data[type].list.find((x) => x.district_name === feature.properties.name); return match ? match.visitors : 0}}
                        visible={(feature) => { const match =  data[type].list.find((x) => x.district_name === feature.properties.name); return match  }}

             scale={['#7F387F', '#FF77FF']}
             steps={20}
             style={style}
             mode='e'

             />

          <Marker position={[40.408527, -3.641853]} icon={StoreIcon}/>

          <DistrictLabels districts={districts}  data={data[type].list} map={this.map}/>

          <FeatureHighlight map={this.map} highlightedfeature={this.state.highlightedfeature}/>

        </Map>
      </div>
    );
  }
}

export default RegionChooserMap;







