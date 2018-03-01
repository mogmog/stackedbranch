import React, {PureComponent} from 'react';
import {Map, TileLayer, GeoJSON, CircleMarker, Marker, Tooltip, Popup} from 'react-leaflet';
import polylabel from '@mapbox/polylabel';
import styles from './DistrictVisitorsPopup.less';

class DistrictVisitorPopup extends PureComponent {

  state = {};

  render() {

    const {highlightedfeature, children} = this.props;

    return (

        <Popup
          className={styles.popup}
          options={{'width': '100px'}}
          key={`popup-${highlightedfeature.properties.cartodb_id}`}
          position={[(polylabel(highlightedfeature.geometry.coordinates[0]))[1], (polylabel(highlightedfeature.geometry.coordinates[0]))[0]]}>
          <div>
            {children}
          </div>

        </Popup>

    );
  }
}

export default DistrictVisitorPopup;
