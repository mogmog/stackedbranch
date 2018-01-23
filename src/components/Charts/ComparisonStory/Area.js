import React, {Component} from 'react';
import * as d3 from 'd3';

import Line from './Line';

class DataSeries extends Component {

  render() {
    let { data, fill, width, height, xScale, yScale, clipid } = this.props;

    let area_above = d3.svg.area()
      .x((d, i) => xScale(i))
      .y1((d) => yScale(d.y))
      .interpolate("basis");

    return (
      <g>

        <clipPath id="cut-off-bottom">
          <rect x="0" y="0" width={width} height={height/2} />
        </clipPath>

        <clipPath id="cut-off-top">
          <rect x="0" y={height/2} width={width} height={height/2} />
        </clipPath>

        <path opacity="0.3" clipPath="url(#cut-off-bottom)" fill={'red'} className="area" d={area_above.y0(height)(data)}  />

        <path opacity="0.3" clipPath="url(#cut-off-top)" fill={'blue'} className="area" d={area_above.y0(0)(data)}  />
      </g>
    );
  }

}

export default DataSeries;


