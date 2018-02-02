import React, { PureComponent } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import Choropleth from '../../../Common/Mapping/Choropleth';
import Leaflet from 'leaflet';
import * as topojson from 'topojson';
import { Slider, Switch, Radio } from 'antd';
import {Motion, spring} from 'react-motion';

import DistrictVisitorSlider from './DistrictVisitorSlider';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

var districts = require('json!./madrid_districts.geo.json');

class DistrictVisitorMapLayers extends PureComponent {

  state = {showWork : false};

  onChange(e) {
    this.setState({showWork : !this.state.showWork});
  }

  render() {

    const {data} = this.props

    let data2 = {
      "home": {
        "list": [ {"district_code": 7, "district_name": "Chamberí",  "visitors": 12 },
          {"district_code": 14, "district_name": "Moratalaz", "visitors": 70}, {
            "district_code": 21, "district_name": "Barajas", "visitors": 40 },
          {"district_code": 9, "district_name": "Moncloa - Aravaca", "visitors": 9},
          { "district_code": 17,  "district_name": "Villaverde", "visitors": 21 }]
      },
      "work": {
        "list": [ {"district_code": 7, "district_name": "Chamberí",  "visitors": 12 },
    {"district_code": 14, "district_name": "Moratalaz", "visitors": 20}, {
      "district_code": 21, "district_name": "Barajas", "visitors": 45 },
    {"district_code": 9, "district_name": "Moncloa - Aravaca", "visitors": 98},
    { "district_code": 17,  "district_name": "Villaverde", "visitors": 21 }]
      }
    };

    const style = {
      fillColor: 'white',
      weight: 2,
      opacity: 0.5,
      color: 'white',
      fillOpacity: 0.5,
    }

    return (
      <div>

        <RadioGroup onChange={this.onChange.bind(this)} defaultValue="work">
          <RadioButton value="work">Work</RadioButton>
          <RadioButton value="home">Home</RadioButton>
        </RadioGroup>


        <Map ref={ (map) => this.map = map } zoomControl={false} center={[40.458527, -3.691853]} zoom={10} style={{'height': '300px'}}>

          <TileLayer opacity={0.8} url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>

          <Motion style={{tween: spring(this.state.showWork ? 0 : 700)}}>
            {
              ({tween}) => (
                  <DistrictVisitorSlider x={tween}/>
              )}
          </Motion>
        </Map>

      </div>
    );
  }
}

export default DistrictVisitorMapLayers;







