/**
 * Cluster component modified from:
 * https://github.com/troutowicz/geoshare/blob/master/app/components/MarkerCluster.jsx
 */
import {PropTypes} from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom/server';
import Leaflet from 'leaflet';
import {MapLayer} from 'react-leaflet';
import 'leaflet.markercluster';
//import './style.css';

let CircleIcon = Leaflet.DivIcon.extend({
  options: {
    iconSize: [12, 12],
    iconAnchor: [6, 6],
    popupAnchor: [0, -6],
  },
})

let ClusterCircleIcon = Leaflet.DivIcon.extend({
  options: {
    iconSize: [30, 30],
    iconAnchor: [15, 0],
    popupAnchor: [0, 0],
  },
})

class MarkerCluster extends MapLayer {
  componentWillMount() {

    const options = _.extend({}, MarkerCluster.defaultProps.options, this.props.options)
    const {spiderfyOnMaxZoom, showCoverageOnHover, zoomToBoundsOnClick, maxClusterRadius, opacity, chunkedLoading, removeOutsideVisibleBounds} = options

    this.leafletElement = Leaflet.markerClusterGroup(
      {
        spiderfyOnMaxZoom: spiderfyOnMaxZoom,
        showCoverageOnHover: showCoverageOnHover,
        zoomToBoundsOnClick: zoomToBoundsOnClick,
        maxClusterRadius: maxClusterRadius,
        opacity: opacity,
        chunkedLoading: chunkedLoading,
        removeOutsideVisibleBounds: removeOutsideVisibleBounds,
        iconCreateFunction: (markers) => {
          return new ClusterCircleIcon({
            html: markers.getAllChildMarkers().length,
            className: 'marker-cluster-divicon',
          })
        },
      }
    )
    const {data, focusMarker} = this.props;
    this.showMarkersData(this.leafletElement, data, focusMarker);

    console.log(1);
  }

  componentWillUnmount() {
    super.componentWillMount()
    this.leafletElement.remove()
  }

  componentWillReceiveProps(nextProps) {
    const {data, focusMarker} = nextProps
    this.showMarkersData(this.leafletElement, data, focusMarker)
  }

  showMarkersData(leafletElement, data, focusMarker, useGeoCoding, looUpLocationService) {

    leafletElement.clearLayers()

    // Add markers to cluster layer
    if (data.length > 0) {
      const newMarkers = [];

      data.forEach((obj) => {

        const leafletMarker = Leaflet.marker([obj.lat, obj.lng])
          .bindPopup("<h1>" + obj.lat + "</h1>", {
            closeButton: true,
          })
          .setIcon(new CircleIcon({
            className: 'marker-divicon',
          }))

        newMarkers.push(leafletMarker);
      })

      leafletElement.addLayers(newMarkers);
    }
  }


  render() {
    return null
  }
}

MarkerCluster.defaultProps = {
  data: [],
  focusMarker: {},
  options: {
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    maxClusterRadius: 30,
    opacity: 1,
    chunkedLoading: true,
    removeOutsideVisibleBounds: true,
  },
}

export default MarkerCluster;
