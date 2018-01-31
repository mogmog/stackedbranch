import React, { PureComponent } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import Choropleth from '../../Common/Mapping/Choropleth';
import Leaflet from 'leaflet';
import * as topojson from 'topojson';

import styles from './styles.less';
import { Slider, Switch } from 'antd';

var data = require('json!./topo.json');
var more = require('json!./more.json');

class RegionChooserMap extends PureComponent {

  state = {selectedRegion : null, features : topojson.feature(data, data.objects.areas).features, mapSetup : this.props.mapSetup, data : more};

  selectRegion(feature) {
    console.log(feature.properties.ID);
    this.props.updateMap({zoom :this.map.leafletElement.getZoom(), center : this.map.leafletElement.getCenter()});
  }

  onMouseOver(feature) {
    this.setState({'selectedRegion' : feature});
  }

  originValues(feature) {

    ///if (this.state.selectedRegion && this.state.selectedRegion.properties.ID === feature.properties.ID) return 999;

    if (this.state.selectedRegion && this.state.data[this.state.selectedRegion.properties.ID]) {
     return this.state.data[this.state.selectedRegion.properties.ID][feature.properties.ID] || 0;
    }
  }

  originValuesVisible(feature) {
    return this.state.selectedRegion && this.state.data[this.state.selectedRegion.properties.ID];
  }


  //use redux!
  render() {

    const {data} = this.props

    const style = {
      fillColor: '#000000',
      weight: 2,
      opacity: 0.5,
      color: 'black',
      fillOpacity: 0.5,
    }

    return (
      <div>

        <Map ref={ (map) => this.map = map } zoomControl={false} center={[54.82416, -1.185394]} zoom={6} style={{'height': '750px'}}>

          <TileLayer opacity={0.3} url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>

          <Choropleth
                      data={this.state.features}
                      valueProperty={this.originValues.bind(this)}

           scale={['blue', 'red']}
           steps={100}
           style={style}
           mode='e'
           onMouseOver={this.onMouseOver.bind(this)}
           onClick={this.selectRegion.bind(this)}
           />


        </Map>
      </div>
    );
  }
}

export default RegionChooserMap;







