import React, { PureComponent } from 'react';
import { Map, TileLayer } from 'react-leaflet';
import SiteSelectMarker from './SiteSelectMarker';


const mapOptions = {
  center: [51.545, -0.01],
  zoom: 9,
  maxZoom: 18,
  minZoom: 0,
  zoomControl: true,
  width: 380,
  height: 600,
}

const tileOptions = {}

class SiteSelectMap extends PureComponent {

  render() {
    const { points, sites } = this.props;

    return (
      <div>
        <Map ref="SiteSelectMap" {...mapOptions}>
          <TileLayer options={tileOptions} url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>

          {
            this.props.data.list.map((site, i) =>
              <SiteSelectMarker
                site={site}
                key={site.key}
                selectedRows={this.props.selectedRows}
                onSelectMarker={this.props.onSelectMarker} />
            )
          }

        </Map>
      </div>
    )
  }
}

SiteSelectMap.defaultProps = {
  data: {
    list: [],
  },
}

export default SiteSelectMap;
