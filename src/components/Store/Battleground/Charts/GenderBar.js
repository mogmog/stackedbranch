import React, {Component} from 'react';
import * as d3 from 'd3';

class GenderBar extends Component {

  constructor(props) {
    super();
  }

  render() {
    return (
        <div>

              <svg width={'400'} transform="translate(-35, 10)">

                <g>
                  <rect  x={0} y={0} width={'400'} height={(20)}/>
                </g>

              </svg>

        </div>
    );
  }
}

export default GenderBar;
