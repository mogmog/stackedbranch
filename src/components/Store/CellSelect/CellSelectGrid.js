import _ from 'lodash';
import Leaflet from 'leaflet';
import {MapLayer} from 'react-leaflet';
import 'leaflet.markercluster';
import 'leaflet-d3-svg-overlay';

class CellSelectGrid extends MapLayer {

  centreCell = undefined;
  hasAlreadyRun = false;
  selecting = false;
  startingPoint = new Leaflet.LatLng(51.51451110408478, -0.12620388576521444);
  unit = 0.00005;
  cellSelection = undefined;
  items = undefined;
  data = [];


  //1  //.on mouse click, set selecting state tyo be true...

  //2   //get distance from clicked on cell to cell that now mouse is over

  //3   //now, you need too highlight all of the cells which are that far away

  //4   //go through every record in data. if distanve between that cell and the centre cell is ~ the distance in 2 then flag that data item

  //5   //add a d3 .attr looking at the flag set in 4)

  applyCellAttributes(myItems, projection) {

    let that = this;

    if (this.props.selectedshapelayer) {
      that.data.forEach((cell) => {
        cell.highlight = this.props.selectedshapelayer._latlng.distanceTo(cell) < this.props.selectedshapelayer._mRadius;
      });
    }

    myItems
      .attr("x", (i) => {
        return projection ? projection.latLngToLayerPoint(i).x : 0;
      })
      .attr("y", (i) => {
        return projection ? projection.latLngToLayerPoint(i).y : 0;
      })
      .attr("height", Math.floor(Math.random() * 30))
      .attr("width", Math.floor(Math.random() * 30))
      .attr("opacity", d => {
        return d.highlight ? 0.4 : 0.0
      })


  };

  componentWillMount() {

    let that = this;

    that.leafletElement = Leaflet.d3SvgOverlay((svg, projection) => {

      console.log(svg);

      if (!this.hasAlreadyRun) {
        that.svg = svg;
        that.projection = projection;

        this.hasAlreadyRun = true;

        /*create cells by building a grid of lat lon squares*/

        for (let r = 0; r < 50; r++) {
          for (let c = 0; c < 50; c++) {
            const o = new Leaflet.LatLng(this.startingPoint.lat + (r * this.unit * 4.5) + Math.floor(Math.random() * 2), this.startingPoint.lng + (c * this.unit * 7) + Math.floor(Math.random() * 2));
            o.highlight = false;
            that.data.push(o);
          }
        }

        /*bind to svg cells*/
        this.cellSelection = svg.selectAll('rect');
        this.items = this.cellSelection.data(that.data);

        this.items.enter().append('rect').call((selection) => {
          that.applyCellAttributes(selection, projection)
        });
        this.leafletElement.addTo(this.context.map);
      }


    });


  }


  render() {
    const that = this;
    if (this.items) this.items.enter().append('rect').call((selection) => { that.applyCellAttributes(selection, that.projection)});
    return null;
  }
}

export default CellSelectGrid;
