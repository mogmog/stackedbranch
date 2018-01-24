import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Key extends Component {

  render () {

    const {yScale, dataset, colors, height} = this.props;

    return (
      <g>
        {dataset.map((x, row) => (
          <rect fill={colors[row]} key={row} x={850} y={( height - 75 * row )} height={50} width={50} ></rect>
        ))}

      </g>
    );
  }

}

export default Key;

