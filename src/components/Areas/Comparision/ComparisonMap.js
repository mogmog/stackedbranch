import React, {PureComponent} from 'react';
import {Map, TileLayer, GeoJSON} from 'react-leaflet';

import AreaHighlightPolygon from './ComparisonPolygonHighlight';

class AreaSelectMap extends PureComponent {

  render() {

    const { areas } = this.props;

    return (
      <Map zoomControl={false} center={[51.522416, -0.185394]} zoom={12}>
        <TileLayer opacity={0.3} url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'/>

        {
          areas.list.map((area, i) =>
            <AreaHighlightPolygon key={i} onClickArea={this.props.onClickArea.bind(this)} area={area}/>
          )
        }

      </Map>
    );
  }
}

export default AreaSelectMap;
