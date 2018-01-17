import React from 'react';
import { Map } from 'react-leaflet';

const mapOptions = {
  center: [32, 40],
  zoom: 2,
  maxZoom: 10,
  minZoom: 2,
  zoomControl: true,
}

class WorldMap extends React.Component {
  render () {
    const { points } = this.props

    console.log(points);

    return (
      <Map {...mapOptions}>

      </Map>
    )
  }
}

export default WorldMap;
