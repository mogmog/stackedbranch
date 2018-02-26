import ReactDOM from 'react-dom';
import _ from 'lodash';
import Leaflet from 'leaflet';
import {MapLayer} from 'react-leaflet';
import 'leaflet.markercluster';
import 'leaflet-d3-svg-overlay';
import d3 from 'd3';
import polylabel from '@mapbox/polylabel';

class DistrictLabels extends MapLayer {

  zoom = undefined;
  elements = [];

  applyAttributes(selection) {
      selection
      .data(this.elements)
      .enter()
      .append("text")
      .attr('font-family', "telefonica_text" )
      .style({'alignment-baseline': 'middle'})
      .attr('font-size', 5 )
      .attr("x", (d, i) => {
        return this.projection.latLngToLayerPoint(d.latlng).x
      })
      .attr("y", (d, i) => {
        return this.projection.latLngToLayerPoint(d.latlng).y
      })
      .text((x) => x.text)
      .attr('transform', 'translate(-5, 0)')
      .attr("opacity", this.zoom /10);
  }

  componentWillMount() {

    let {data, districts, zoom} = this.props;
    const that = this;
    this.zoom = zoom;

    this.leafletElement = Leaflet.d3SvgOverlay((svg, projection) => {
      this.svg = svg;
      this.projection = projection;
    });

    if (this.props.map) this.leafletElement.addTo(this.props.map);
  }

  componentWillUnmount() {
    this.leafletElement.remove();
  }

  render() {
    const that = this;

    let {data, districts} = this.props;

    const findDistrict = (name) => {
      return _(districts.features).find(district => district.properties.name === name);
    }

    this.elements = [];

    data.forEach((thing) => {

      const district = _(districts.features).find((_district) => _district.properties.name === thing.district_name);

      if (district) {
        const center = (polylabel(district.geometry.coordinates[0]));
        const sum = _(data).sumBy(x => x.visitors);
        this.elements.push({text: d3.format(".01%")(thing.visitors/sum), latlng: [ center[1], center[0]] });
      }
    });

    if (that.svg && that.projection && that.elements.length) that.svg.selectAll('text').call((selection) => { that.applyAttributes(selection)});
    return null;
  }
}

DistrictLabels.defaultProps = {}

export default DistrictLabels;
