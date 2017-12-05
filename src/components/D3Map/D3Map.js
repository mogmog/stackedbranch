import React from 'react';
import { Map, TileLayer, Circle, FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import D3Marker from './D3Marker';

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

class D3Map extends React.Component {

  _onEditPath(e) {
    console.log('Path edited !');
  }

  _onCreate(e) {
    const polyline = e.layer;
    // To edit this polyline call : polyline.handler.enable()
    console.log('Path created !');
    console.log(e.layer);
  }

  _onDeleted(e) {
    console.log('Path deleted !');
  }

  _mounted(drawControl) {
    console.log('Component mounted !');
  }

  _onEditStart() {
    console.log('Edit is starting !');
  }

  _onEditStop() {
    console.log('Edit is stopping !');
  }

  _onDeleteStart() {
    console.log('Delete is starting !');
  }

  _onDeleteStop() {
    console.log('Delete is stopping !');
  }

  render() {

    const latlangs = [[{"lat":51.52616326077225,"lng":-0.08830239755483361},{"lat":51.52359997992331,"lng":-0.09911706430288049},{"lat":51.52060930322446,"lng":-0.09705712777944298},{"lat":51.51740478880791,"lng":-0.08898904306264611},{"lat":51.517938890201805,"lng":-0.08521249276967735}]]

    return (
      <Map {...mapOptions}>

        <Polygon color="purple" positions={latlangs} />

        <FeatureGroup>
          <EditControl
            position='topleft'
            onEdited={this._onEditPath}
            onCreated={this._onCreate}
            onDeleted={this._onDeleted}
            onMounted={this._mounted}
            onEditStart={this._onEditStart}
            onEditStop={this._onEditStop}
            onDeleteStart={this._onDeleteStart}
            onDeleteStop={this._onDeleteStop}
            draw={{
              rectangle: true
            }}
          />

        </FeatureGroup>

        <D3Marker />
        <TileLayer options={tileOptions} url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
      </Map>
    );
  }
}

export default D3Map
