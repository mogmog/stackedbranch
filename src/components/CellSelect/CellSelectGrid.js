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

  //1  //.on mouse click, set selecting state tyo be true...

  //2   //get distance from clicked on cell to cell that now mouse is over

  //3   //now, you need too highlight all of the cells which are that far away

  //4   //go through every record in data. if distanve between that cell and the centre cell is ~ the distance in 2 then flag that data item

  //5   //add a d3 .attr looking at the flag set in 4)

  componentWillMount() {

    let that = this;

    that.leafletElement = Leaflet.d3SvgOverlay((svg, projection) => {
      if (!this.hasAlreadyRun) {

        this.hasAlreadyRun = true;

        /*create cells by building a grid of lat lon squares*/
        const data = [];
        for (let r = 0; r < 50; r++) {
          for (let c = 0; c < 50; c++) {
            const o = new Leaflet.LatLng(this.startingPoint.lat + (r * this.unit * 4.5), this.startingPoint.lng + (c * this.unit * 7));
            o.highlight = false;
            data.push(o);
          }
        }

        /*we need a box which has a click event to toggle when we are selecting*/
        const touchTarget = svg.append('rect');

        touchTarget
          .attr("x", (i) => {return projection.latLngToLayerPoint(this.startingPoint).x})
          .attr("y", (i) => {return projection.latLngToLayerPoint(this.startingPoint).y})
          .attr('width', 250  )
          .attr('height', 250  )
          .attr('transform', 'translate(0, -250)')
          .attr('opacity', 0)
          .on("click", () => {
            if (that.selecting) that.centreCell = undefined;
            that.selecting = !that.selecting})

        /*bind to svg cells*/
        const cellSelection = svg.selectAll('rect');
        const items = cellSelection.data(data);
        items.enter().append('rect').call(applyCellAttributes);



        function applyCellAttributes(myItems) {
          myItems
            .attr("x", (i) => {return projection.latLngToLayerPoint(i).x})
            .attr("y", (i) => {return projection.latLngToLayerPoint(i).y})
            .attr("height", 5)
            .attr("width", 5)
            .attr("opacity", d => {return d.highlight ? 0.7 : 0.3})
            .on("click", d => {
              that.selecting = !that.selecting;
              that.centreCell = d;
            })
            .on("mouseover", _.debounce((d) => {
                if (that.selecting) {

                  data.forEach((cell) => {
                    cell.highlight = cell.distanceTo(that.centreCell) < d.distanceTo(that.centreCell);
                  });

                  myItems.call(applyCellAttributes);
                }

            }, 1, { leading: true }));
        };

      }
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

export default CellSelectGrid;
