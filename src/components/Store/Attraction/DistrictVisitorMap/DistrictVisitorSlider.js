import Leaflet from 'leaflet';
import { MapLayer } from 'react-leaflet';
import 'leaflet-d3-svg-overlay';

class DistrictVisitorSlider extends MapLayer {

  componentWillReceiveProps() {
  }

  applyAttributes(selection) {
    const that = this;
    selection.attr("x", () => that.props.x);
  }

  componentWillMount() {

    let that = this;

    that.leafletElement = Leaflet.d3SvgOverlay((svg, projection) => {

        that.svg = svg;
        console.log(that.svg.select('rect'));
        if (!that.svg.select('rect')[0][0]) {
          that.svg.append('rect').attr({x: 0, y: 10, width: 100, height: 800, fill: 'red'});
        }

        this.leafletElement.addTo(this.context.map);
    });


  }


  render() {
    const that = this;
    if (that.svg) that.svg.select('rect').call((selection) => { that.applyAttributes(selection)});
    return null;
  }
}

export default DistrictVisitorSlider;
