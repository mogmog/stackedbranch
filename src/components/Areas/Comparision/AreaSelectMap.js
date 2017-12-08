import React, {PureComponent} from 'react';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';

import AreaHighlightPolygon from './AreaHighlightPolygon';

class AreaSelectMap extends PureComponent {

  render() {
    return (
      <Map zoomControl={false} center={[51.522416, -0.185394]} zoom={10}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>

        {
          this.props.areas.map( (area, i) => <AreaHighlightPolygon key={i} onClickArea={this.props.onClickArea.bind(this)} area={area}/>)
        }

      </Map>
    );
  }
}

export default AreaSelectMap;
