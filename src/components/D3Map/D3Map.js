import React from 'react';
import {Map, TileLayer} from 'react-leaflet';
import D3Marker from './D3Marker';

const mapOptions = {
  center: [51.545, -0.01],
  zoom: 10,
  maxZoom: 18,
  minZoom: 1,
  zoomControl: true,
  width: 100
}

const tileOptions = {
  continuousWorld: false
}

class D3Map extends React.Component {
  render() {

    return (
      <Map {...mapOptions}>
        <D3Marker />
        <TileLayer options={tileOptions} url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
      </Map>
    );
  }
}

export default D3Map
