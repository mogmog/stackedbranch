import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Key extends Component {

  render () {

    const {yScale, dataset, keys, colors, height} = this.props;
    return (
      <g transform="translate(0, -45)" className="key">
        {dataset.map((x, row) => (
          <g key={`g_${row}`}>
            <rect fill={colors[row]} key={`rect_${row}`} x={850} y={( height - 75 * row )} height={50} width={50} ></rect>
            <text transform="translate(55, 27.5)" fill={'black'} key={`text_${row}`} x={850} y={( height - 75 * row )} height={50} width={50} >{keys[row]}</text>
          </g>
        ))}

      </g>
    );
  }

}

export default Key;

