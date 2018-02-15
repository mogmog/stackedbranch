import React, {Component} from 'react';
import * as d3 from 'd3';

import styles from './GenderBar.less';

class GenderBar extends Component {

  constructor(props) {
    super();
  }

  componentWillMount() {
    this.width = 360;
    this.height = 70;
    this.scale = d3.scale.linear().domain([0, 1]).range([0, this.width]);
}

  render() {

    const { data } = this.props;

    return (
        <div className={styles.genderbar}>

              <svg width={this.width} height={this.height} transform="translate(-20, -10)">

                {/*male label*/}
                <g transform="translate(0, 14)">
                  <text x={0} y={0} > {data.m} </text>
                </g>

                {/*female label*/}
                <g transform={`translate(${(data.f).toString().length * -10}, 14)`}>
                  <text x={this.scale(1)} y={0} > {data.f} </text>
                </g>

                <g transform="translate(0, 20)">
                  <rect  fill="#E6E6E6" x={0} y={0} width={this.scale(1)} height={(20)}/>
                  <rect  fill="lightblue" x={0} y={0} width={data.m ? this.scale((data.m/data.total)) : 0} height={(20)}/>
                  <rect  fill="pink" x={data.f ? this.scale(1) - this.scale((data.f/data.total)) : 0} y={0} width={this.scale(1)} height={(20)} />
                </g>

              </svg>

        </div>
    );
  }
}

export default GenderBar;
