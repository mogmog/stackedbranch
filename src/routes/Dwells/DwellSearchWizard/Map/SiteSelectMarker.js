import React from 'react';
import {Map, TileLayer, Marker, Popup} from 'react-leaflet';

// Create your own class, extending from the Marker class.
class ExtendedMarker extends Marker {
  // "Hijack" the component lifecycle.
  componentDidMount() {
    // Call the Marker class componentDidMount (to make sure everything behaves as normal)
    super.componentDidMount();

    // Access the marker element and open the popup.
    //this.leafletElement.openPopup();
  }
}

class SiteMarker extends React.Component {
  constructor() {
    super();
    this.state = {
      selected: false,
      open: true,
    };
  }

  handleOpen() {
    this.setState({ open: true });
  }

  handleAdd(site) {
    this.setState({ open: false, selected: true })
    //console.log(this.props.selectedRows);
    //this.props.selectedRows.push(this.props.site);
    this.props.onSelectMarker(site);
  }

  render() {

    const selectedIcon = L.icon({
      iconUrl: require('../../../../assets/mapping/Icons/siteSelected.png'),
      iconSize: [35, 35],
    });

    const unselectedIcon = L.icon({
      iconUrl: require('../../../../assets/mapping/Icons/siteUnselected.png'),
      iconSize: [35, 35],
    });

    return (
      <ExtendedMarker position={[this.props.site.latitude, this.props.site.longitude]}
                      icon={(this.state.selected) ? selectedIcon : unselectedIcon}>

        { (this.state.open) ? (
          <Popup>
            <div>
              <p>{this.props.site.description}</p>
              <button onClick={() => {this.handleAdd.bind(this)(this.props.site)}}>
                Add to site list
              </button>
            </div>
          </Popup>
        ) : null
        }

      </ExtendedMarker>
    )
  }
}

export default SiteMarker



