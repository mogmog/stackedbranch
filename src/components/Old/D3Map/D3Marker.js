import _ from 'lodash';
import Leaflet from 'leaflet';
import {MapLayer} from 'react-leaflet';
import 'leaflet.markercluster';
import 'leaflet-d3-svg-overlay';
import d3 from 'd3';


class D3MarkerCluster extends MapLayer {
  componentWillMount() {

    this.leafletElement = Leaflet.d3SvgOverlay((svg, projection) => {

      let startingPoint = new Leaflet.LatLng(40.458527, -3.691853);
      let unit = 0.0001;

      let data = [];
      for (let r = 0; r < 20; r++) {
        for (let c = 0; c < 20; c++) {
          data.push(new Leaflet.LatLng(startingPoint.lat + (r * unit * 4.5), startingPoint.lng + (c * unit * 7)));
        }
      }

      svg
        .selectAll('rect')
        .data(data)
        .enter()
        .append("rect")
        .attr("x", (i) => {
          return projection.latLngToLayerPoint(i).x
        })
        .attr("y", (i) => {
          return projection.latLngToLayerPoint(i).y
        })
        .attr("height", 0.5 * (1 / projection.scale))
        .attr("width", 0.5 * (1 / projection.scale))
        .attr("opacity", 0.2)

    });

    this.leafletElement.addTo(this.context.map);
  }

  componentWillUnmount() {
    super.componentWillMount();
    this.leafletElement.remove();
  }

  render() {
    return null;
  }
}

D3MarkerCluster.defaultProps = {}

export default D3MarkerCluster;
