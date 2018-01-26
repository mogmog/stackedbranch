import React, { PureComponent } from 'react';
import { Map, TileLayer, FeatureGroup } from 'react-leaflet';
import {EditControl} from 'react-leaflet-draw';
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

class CellSelectMap extends PureComponent {

  state = {
    layer: undefined,
  };

  onAreaDefine(area) {
    this.setState({layer : area.layer});
  }

  render() {

    return (
      <Map ref={Map => this.map = Map} {...mapOptions}>

        {this.props.children}

        <CellSelectGrid selectedshapelayer={this.state.layer} />

        <FeatureGroup>
          <EditControl
            onCreated={this.onAreaDefine.bind(this)}
            ref={_EditControl => this.editcontrol = _EditControl}
            position='topleft'
            draw={{
              circle : true,
              polygon : false,
              polyline : false,
              rectangle: false,
              circlemarker : false,
              marker : false,
            }}
          />
        </FeatureGroup>

        <TileLayer options={tileOptions} url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
      </Map>
    );
  }
}

export default CellSelectMap;
