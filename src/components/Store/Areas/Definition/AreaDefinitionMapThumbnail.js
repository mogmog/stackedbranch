import React, { PureComponent } from 'react';
import { Map, TileLayer, GeoJSON  } from 'react-leaflet';


class AreaDefinitionMapThumbnail extends PureComponent {

  render() {
    return (
      <Map zoomControl={false}
           center={[this.props.center_lat, this.props.center_lng]}
           zoom={this.props.zoom}
           style={{width : 340, height: 80}}>
        <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
        {(this.props.geodata  ? <GeoJSON data={this.props.geodata} /> : '<span/>')}
      </Map>
    );
  }
}

export default AreaDefinitionMapThumbnail;
