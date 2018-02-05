import React, {Component} from 'react';
import * as d3 from 'd3';
import styles from './HourBar.less';

class Bar extends Component {

  constructor(props) {
    super();
  }

  render() {
    return (
      <g>
        <g fill={'grey'}>
          <rect x={this.props.scale(0)} y={0} width={this.props.scale(24)} height={(this.props.height - 5)}/>
        </g>

        <g fill={'pink'}>
          <rect x={this.props.scale(0)} y={0} width={this.props.scale(12)} height={(this.props.height - 5)}/>
        </g>
      </g>
    );
  }
}

export default Bar;
