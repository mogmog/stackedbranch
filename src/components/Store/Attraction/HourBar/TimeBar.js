import React, {Component} from 'react';
import * as d3 from 'd3';
import styles from './HourBar.less';

class TimeBar extends Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <g transform={'translate(5,0)'}>
        <g fill={'grey'}>
          <rect x={0} y={0} width={this.props.scale(24) + 50} height={(this.props.height - 5)}/>
        </g>

        <g fill={'pink'}>
          <rect x={0} y={0} transform={`translate(${this.props.scale(this.props.hour_from)},0)`} width={(this.props.scale(this.props.hour_to) - this.props.scale(this.props.hour_from))} height={(this.props.height - 5)}/>
        </g>
      </g>
    );
  }
}

export default TimeBar;
