import React, {Component} from 'react';
import * as d3 from 'd3';

class Line extends Component {

  render() {
    let { line, stroke, fill, strokeWidth, x } = this.props;
    return (
      <g>
        <clipPath id="hexagonal-mask">
          <rect x={0} y={0} width={x} height={400}/>
        </clipPath>
      <path
        clipPath="url(#hexagonal-mask)"
        fill={'none'}
        stroke={'blue'}
        strokeWidth={'2'}
        d={line}
      />
      </g>
    );
  }

}

export default Line;


