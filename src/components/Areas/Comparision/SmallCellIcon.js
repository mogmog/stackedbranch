import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

class ExtendedMarker extends Marker {
  componentDidMount() {
    super.componentDidMount();
  }
}

class SmallCellIcon extends React.Component {
  constructor() {
    super();
    this.state = {
      open: true,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleAdd() {
    this.setState({ open: false });
  }

  render() {

    const selectedIcon = L.icon({
      iconUrl: require('../../../assets/mapping/Icons/smallcell.png'),
      iconSize: [50, 50],
    });

    return (
      <ExtendedMarker
        position={[this.props.smallcell.lng, this.props.smallcell.lat]}
        icon={selectedIcon}>

        {(this.state.open) ? (
          <Popup>
            <div>
              <p>Could put an address here</p>
            </div>
          </Popup>
        ) : null
        }

      </ExtendedMarker>
    );
  }
}

export default SmallCellIcon;
