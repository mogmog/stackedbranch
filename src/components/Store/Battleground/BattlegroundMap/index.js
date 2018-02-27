import React, { PureComponent } from 'react';
import { Map, TileLayer, Marker, GeoJSON, FeatureGroup  } from 'react-leaflet';
import _ from 'lodash';
import styles from './BattlegroundMap.less';
import StoreIcon from '../../../Common/Mapping/StoreIcon';
import BattlegroundFeatureHighlight from './BattlegroundFeatureHighlight';
import BattlegroundLabel from './BattlegroundLabel';
const districts = require('json!./../../../../assets/mapping/geojson/madrid_districts.geo.json');


class BattlegroundMap extends PureComponent {

  state = {highlightedfeature : null};

  districtHover(feature) {
    this.setState({'highlightedfeature' : feature});
  }

  render() {

    const {data, type, districtClick, colors } = this.props;

    const _districtsToShow = ['Chamartin', 'Chamberi', 'Salamanca'];
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

        <Map className={styles.test} attributionControl={false} doubleClickZoom={false} ref={ (map) => this.map = map } zoomControl={false} center={[40.458527, -3.691853]} zoom={13} style={{'height': '100vh'}} >

          <TileLayer url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png'/>



          <BattlegroundFeatureHighlight ref={ (map) => this.map = map } highlightedfeature={this.state.highlightedfeature}/>

          <FeatureGroup map={this.map}  >
            {
              (districtsToShow).map((feature, idx) =>
                <div>
                  <GeoJSON data={feature} style={getStyle} key={'geo_'+idx} onMouseOver={(() => {this.districtHover(feature)}).bind(this)}/>
                  <BattlegroundLabel key={'label_'+idx} ref={ (map) => this.map = map } feature={feature}/>
                </div>
                  )
            }


          </FeatureGroup>



          <FeatureGroup map={this.map} >
            {
              (districtsToShow).map((feature, idx) =>
                <div>
                  <GeoJSON onClick={districtClick} data={feature} style={{'color' : 'white', 'fillOpacity' : 0}} key={'clicktarget_' + idx}/>
                </div>
              )
            }
          </FeatureGroup>

          <div className={styles.no_pointer} >
            <Marker position={[40.432127, -3.671853]} icon={StoreIcon}></Marker>
          </div>

        </Map>
      </div>
    );
  }
}

export default BattlegroundMap;







