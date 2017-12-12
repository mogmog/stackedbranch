import React, {PureComponent} from 'react';
import {Map, TileLayer, GeoJSON, Marker, Popup, Circle, CircleMarker} from 'react-leaflet';

import SmallCellIcon from './SmallCellIcon';

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
      click: (e) => {
        this.onLayerClick(layer)
      }
    });
  }

  render() {
    return (
      <span>
      <GeoJSON data={this.props.area.geodata} onEachFeature={this.onEachFeature.bind(this)}/>

        {
          this.props.area.smallcells.map((smallcell, i) => <span key={i}>
             <SmallCellIcon smallcell={smallcell} />
          </span>)
        }

      </span>
    );
  }
}

export default AreaHighlightPolygon;


