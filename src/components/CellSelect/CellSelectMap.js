import React from 'react';
import { Map, TileLayer } from 'react-leaflet';
import CellSelectGrid from './CellSelectGrid';

const mapOptions = {
  center: [51.51451110408478, -0.12620388576521444],
  zoom: 14,
  maxZoom: 18,
  minZoom: 1,
  zoomControl: true,
  width: 100
}

const tileOptions = {
  continuousWorld: false
}



class CellSelectMap extends React.Component {

  componentDidMount() {
  }

  render() {

    return (
      <Map ref={Map => this.map = Map} {...mapOptions}>

        {this.props.children}

        <CellSelectGrid />
        <TileLayer options={tileOptions} url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
      </Map>
    );
  }
}

export default CellSelectMap;
