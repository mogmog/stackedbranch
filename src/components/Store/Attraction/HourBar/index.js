import Bar from './Bar';
import Timescale from './Timescale';

import React, {Component} from 'react';
import * as d3 from 'd3';
import styles from './HourBar.less';

class HourBar extends Component {

  state = {

  }

  constructor(props) {
    super();
  }

  componentWillMount () {

    this.barheight = 20;
    this.margin = {left : 10, right : 10, top : 0, bottom : 0};
    this.width = 390;
    this.scale = d3.scale.linear().domain([0, 24]).range([0 + this.margin.left, this.width - this.margin.right]);
  }

  render() {

    const items= [{text : 'Friday'}, {text : 'Saturday'}, {text : 'Sunday'}];

    return (

      <div ref="child" className={styles.hourbar}>
        <h4>
          Day of the week
        </h4>
        <h6>and hour of most frequency</h6>
        {
          items.map((d, i) => (
            <div>
              <h4>31.89%</h4>
              <h6>{d.text}</h6>
              <svg height={this.barheight} width={this.scale(24)} transform={`translate(${-1 * this.margin.left}, 0)`} >
                <Bar value={20} scale={this.scale} width={this.scale(24)} height={this.barheight} label={32.01} text={'Friday'}></Bar>
              </svg>
            </div>
          ))
        }
        <svg height={this.barheight} width={this.scale(24) + this.margin.right }  transform={`translate(${-1 * this.margin.left}, 0)`} >
          <Timescale scale={this.scale} />
        </svg>
      </div>
    );
  }

}

export default HourBar;



