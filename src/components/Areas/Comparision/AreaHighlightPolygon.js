import React, {PureComponent} from 'react';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';

class AreaHighlightPolygon extends PureComponent {

  constructor() {
    super();
  }

  onLayerClick(layer) {
    layer.setStyle({fillColor: "green", fillOpacity: 0.8, weight: 0.5});
    this.props.onClickArea(this.props.area);
  }

  onEachFeature(feature, layer) {
    layer.on({
      click: (e) => {this.onLayerClick(layer)}
    });
  }

  render() {
    return (
      <GeoJSON data={this.props.area.geodata} onEachFeature={this.onEachFeature.bind(this)} />
    );
  }
}

export default AreaHighlightPolygon;


