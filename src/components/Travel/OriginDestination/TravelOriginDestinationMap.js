import React, { PureComponent } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import Choropleth from '../../Common/Mapping/Choropleth';
import Leaflet from 'leaflet';
import * as topojson from 'topojson';

import styles from './styles.less';
import { Slider, Switch } from 'antd';

var data = require('json!./topo.json');

//console.log(data);


var topology = topojson.feature(data, data.objects.areas).features;
//debugger;

console.log(topology);

class TravelOriginDestinationMap extends PureComponent {

  state = {features : [], countiesToShow: [], distance : 1 };

  onChange(value) {
    this.setState({distance : value });
   // this.forceUpdate();
  }
  changeCounty(item) {

    this.setState({ features: {type : 'FeatureCollection', features : topology } });
  }//.slice(0, this.state.distance)

  render() {

    const style = {
      fillColor: '#ffffff',
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 1
    }

    let test = 0;

    return (
      <div>

        <Slider min={0} max={400} defaultValue={0} onChange={this.onChange.bind(this)}  />


        <button onClick={(x => {this.changeCounty('Islington')}).bind(this) }> Islington </button>
        <button onClick={(x => {this.changeCounty('Hackney')}).bind(this) }> Hackney </button>
        <button onClick={(x => {this.changeCounty('Westminster')}).bind(this) }> Westminster </button>
        {this.props.mapSetup.zoom}
        <Map zoomControl={false} center={this.props.mapSetup.center} zoom={this.props.mapSetup.zoom} style={{'height': '750px'}}>

          <TileLayer opacity={0.3} url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>

          <Choropleth
                      data={this.state.features}
                      valueProperty={(feature, idx) => {return new Leaflet.Polygon(feature.geometry.coordinates).getBounds().getCenter().distanceTo(new Leaflet.latLng([0, 54]))}}
                      visible={(feature, idx) => {return true  }}

            scale={['#ffffff', '#000000']}
           steps={100}
           style={style}
            mode='q'
             onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.NAME)}
           />


        </Map>
      </div>
    );
  }
}

//valueProperty={(feature, idx) => {return new Leaflet.Polygon(feature.geometry.coordinates).getBounds().getCenter().distanceTo(new Leaflet.latLng([0, 54]))}}
//((feature, x) => {return x * new Leaflet.Polygon(feature.geometry.coordinates).getBounds().getCenter().distanceTo(new Leaflet.latLng([0, 54]))})(feature, this.state.distance)
export default TravelOriginDestinationMap;

// {/*<Choropleth
//             data={{type: 'FeatureCollection', features: data.features}}
//             valueProperty={(feature) => {test = test + 0.5; return test}}
//             /*visible={(feature) => feature.id !== 123}*/
// //return Leaflet.Polygon(feature.geometry)
// //return this.state.countiesToShow.indexOf(feature.properties.LAD13NM) > -1;
// /*  scale={['#000000', '#ffffff']}
//   steps={100}
//   mode='q'
//   style={style}
//   onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.LAD13NM)}
// />*!/}*/
