import React, { PureComponent } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';

const mapOptions = {
  center: [51.51451110408478, -0.12620388576521444],
  zoom: 14,
  maxZoom: 18,
  minZoom: 1,
  zoomControl: false,
}

const tileOptions = {
  continuousWorld: false
}

class DetailMap extends PureComponent {

  render() {

    const { points } = this.props
    console.log(points);

    return (
      <Map ref={(_Map) => { this.map = _Map; }} {...mapOptions} zoom={18}>

        {this.props.children}

        <TileLayer options={tileOptions} url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
      </Map>
    );
  }
}

export default DetailMap;
