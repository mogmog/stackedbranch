import React, {Component} from 'react';
import * as d3 from 'd3';

import Line from './Line';

class DataSeries extends Component {

  render() {
    let { data, fill, width, height, xScale, yScale, clipid } = this.props;

    let area = d3.svg.area()
      .x((d, i) => xScale(i))
      .y0(height)
      .y1((d) => yScale(d.y))
      .interpolate("basis");

    let clipurl = 'url(#' + clipid + ')'
    return (
      <g>

        {this.props.children}

        <path opacity="0.3" clipPath="url(#hexagonal-mask)" fill={fill} className="area" d={area(data)} mask={clipurl} />
      </g>
    );
  }

}

export default DataSeries;


