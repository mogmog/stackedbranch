import React, {Component} from 'react';
import * as d3 from 'd3';
import Area from './Area';

class Line extends Component {

  render() {
    let { line, stroke, fill, strokeWidth, x, dataset, width, height, xScale, yScale } = this.props;
    return (
      <g>
        <clipPath id="reveal">
          <rect x={0} y={0} width={x} height={height - 40}/>
        </clipPath>



        <path
          clipPath="url(#reveal)"
          fill={'none'}
          stroke={'blue'}
          strokeWidth={'2'}
          d={line}
        />

        <Area fill="blue"   data={dataset} width={width} height={height} xScale={xScale} yScale={yScale}>
        </Area>

      </g>
    );
  }

}

export default Line;


