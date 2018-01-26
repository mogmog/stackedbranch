import React, { PureComponent } from 'react';
import { Map, TileLayer, GeoJSON } from 'react-leaflet';
import Choropleth from 'react-leaflet-choropleth';
import Leaflet from 'leaflet';

import styles from './styles.less';

var data = require('json!./lad.json');

class TravelOriginDestinationMap extends PureComponent {

  state = {countiesToShow: [], distance : 1 };

  changeCounty(item) {
    this.setState({distance : this.state.distance + 1 })
      this.setState({ countiesToShow: [...this.state.countiesToShow, item] });
      //this.setState({county : 'South Cambridgeshire'});
  }

  //Islington, Hackney, Westminster, Tower Hamlets, Lambeth, Greenwich

  render() {

    const style = {
      fillColor: '#F28F3B',
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.5
    }

    return (
      <div>

        <button onClick={(x => {this.changeCounty('Islington')}).bind(this) }> Islington </button>
        <button onClick={(x => {this.changeCounty('Hackney')}).bind(this) }> Hackney </button>
        <button onClick={(x => {this.changeCounty('Westminster')}).bind(this) }> Westminster </button>
        {this.state.distance}
        <Map zoomControl={false} center={[51.522416, -0.185394]} zoom={6} style={{'height': '750px'}}>

          <Choropleth
            data={{type: 'FeatureCollection', features: data.features}}
            valueProperty={(feature, i) => {
              try {
                //console.log((new Leaflet.Polygon(feature.geometry.coordinates).getBounds().getNorthEast().distanceTo([0, 51.8]) ));
                //console.log((new Leaflet.Polygon(feature.geometry.coordinates).getBounds().getNorthEast().distanceTo([0, 51.8]) * this.state.distance));
                return this.state.distance * Math.random();
                //return (new Leaflet.Polygon(feature.geometry.coordinates).getBounds().getNorthEast().distanceTo([0, 0]) * this.state.distance);
              } catch(e) {

              }
              //return Leaflet.Polygon(feature.geometry)
              //return this.state.countiesToShow.indexOf(feature.properties.LAD13NM) > -1;
               }}
            scale={['#b3cde0', '#ff1f4b']}
            steps={10}
            mode='e'
            style={style}
            onEachFeature={(feature, layer) => layer.bindPopup(feature.properties.LAD13NM)}
          />
        </Map>
      </div>
    );
  }
}

export default TravelOriginDestinationMap;
