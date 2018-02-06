import TimeBar from './TimeBar';
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
    this.scale = d3.scale.linear().domain([0, 24]).range([0, this.width]);
  }

  render() {

    const items= [{text : 'Friday', value : 31.89, hour_from : 0, hour_to : 22}, {text : 'Saturday', value : 21.89, hour_from : 16, hour_to : 20}, {text : 'Sunday', value : 11.89, hour_from : 21, hour_to : 23}];

    return (

      <div ref="child" className={styles.hourbar}>
        <h4>
          Day of the week
        </h4>
        <h6>and hour of most frequency</h6>
        {
          items.map((d, i) => (
            <div>
              <h4>{d.value}%</h4>
              <h6>{d.text}</h6>
              {/*TODO fix these offset hacks*/}
              <svg height={this.barheight} width={this.scale(24) + 5} transform={'translate(-5, 0)'}  >
                <TimeBar hour_from={d.hour_from} hour_to={d.hour_to} scale={this.scale} width={this.scale(24)} height={this.barheight} label={32.01} text={'Friday'}/>
              </svg>
            </div>
          ))
        }
        <svg height={this.barheight} width={this.scale(24) + this.margin.right } transform={'translate(-5, 0)'}  >
          <Timescale scale={this.scale} />
        </svg>
      </div>
    );
  }

}

export default HourBar;
