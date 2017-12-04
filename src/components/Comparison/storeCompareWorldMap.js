import React from 'react'
import TopoJSON from './../Mapping/TopoJSON';

import {Map, TileLayer} from 'react-leaflet';
import HeatmapLayer from 'react-leaflet-heatmap-layer';
import countries from './world-countries.topo.json';
import {addressPoints} from './realworld.10000.js';

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

class StoreCompareWorldMap extends React.Component {
  render() {
    const {dimension} = this.props

    const points = dimension.top(Infinity).map(x => {

      return {
        value: 400,
        lat: x.lat,
        lng: x.lng,
        data: {
          country: 'v.value.country',
          userName: 'v.value.userName',
          id: 'v.value.id',
        },
      }
    });

    return (
      <Map {...mapOptions}>
        <TopoJSON data={ countries }/>
        <HeatmapLayer
          minOpacity={0.5}
          points={points}
          longitudeExtractor={m => m.lng}
          latitudeExtractor={m => m.lat}
          intensityExtractor={m => m.value}
        />
        <TileLayer options={tileOptions} url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
      </Map>
    );
  }
}

export default StoreCompareWorldMap
