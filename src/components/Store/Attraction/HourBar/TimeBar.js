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

        <defs>
          <linearGradient id="mainGradient">
            <stop offset="0" className={styles["stop-left"]}></stop>
            <stop offset="1" className={styles["stop-right"]}></stop>
          </linearGradient>
        </defs>

        <g>
          <rect className={styles.background} x={0} y={0} width={this.props.scale(100) + 50} height={(this.props.height - 5)}/>
        </g>

        <g >
          <rect style={{'fill': 'url(#mainGradient)'}} x={0} y={0} transform={`translate(${this.props.scale(this.props.hour_from)},0)`} width={(this.props.scale(this.props.hour_to) - this.props.scale(this.props.hour_from))} height={(this.props.height - 5)}/>
        </g>
      </g>
    );
  }
}

export default TimeBar;
