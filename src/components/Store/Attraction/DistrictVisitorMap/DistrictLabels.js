import Leaflet from 'leaflet';
import { MapLayer } from 'react-leaflet';
import 'leaflet-d3-svg-overlay';

class DistrictVisitorSlider extends MapLayer {

  componentWillReceiveProps() {
  }

  applyAttributes(selection) {
    this.svg.attr('transform', `translate(${this.props.x}, 0)`);
  }

  componentWillMount() {

    let that = this;

    that.leafletElement = Leaflet.d3SvgOverlay((svg, projection) => {

        that.svg = svg;
        svg.append('rect').attr({x: 0, y: 10, width: 100, height: 800, fill: 'red'});

        this.leafletElement.addTo(this.context.map);
    });


  }


  render() {
    const that = this;
    if (that.svg) that.svg.select('rect').call(() => { that.applyAttributes()});
    return null;
  }
}

export default DistrictVisitorSlider;
