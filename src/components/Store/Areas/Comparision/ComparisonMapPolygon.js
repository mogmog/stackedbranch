import React, {PureComponent} from 'react';
import { GeoJSON } from 'react-leaflet';

class ComparisonMapPolygon extends PureComponent {

  constructor() {
    super();
  }

  onLayerClick(layer) {
    layer.setStyle({ fillColor: "green", fillOpacity: 0.5, weight: 0.5 });
    this.props.onClickArea(this.props.area);
  }

  onEachFeature(feature, layer) {

    const area = this.props.area;

    layer.bindTooltip(area.name, { permanent: true, direction: 'auto' } );

    layer.on({
      click: (e) => {
        this.onLayerClick(layer);
      }
    });
  }

  render() {

    return (
      <GeoJSON data={this.props.area.geodata} onEachFeature={this.onEachFeature.bind(this)}/>
    );
  }
}

export default ComparisonMapPolygon;


