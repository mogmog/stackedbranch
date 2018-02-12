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
    this.width = 320;
    this.scale = d3.scale.linear().domain([0, 100]).range([0, this.width]);
  }

  render() {

    //const items= [{text : 'Friday', value : 31.89, hour_from : 0, hour_to : 22}, {text : 'Saturday', value : 21.89, hour_from : 16, hour_to : 20}, {text : 'Sunday', value : 11.89, hour_from : 21, hour_to : 23}];
    const {days} = this.props.data;

    return (

      <div ref="child" className={styles.hourbar}>
        <h4>
          Day of the week
        </h4>
        <h6>and hour of most frequency</h6>
        {
          days.map((d, i) => {
              if (i <=2) return (<div key={i}>
                  <h4>{d3.format('.1%')(d.percent)}</h4>
                  {<h6>{d.start_dow}</h6>}
                  {/*TODO fix these offset hacks*/}
                  {<svg height={this.barheight} width={this.scale(100) } transform={'translate(-5, 0)'}  >
                <TimeBar hour_from={0} hour_to={d.percent * 100} scale={this.scale} width={this.scale(100)} height={this.barheight}  />
              </svg>}
                </div>)

          }

          )
        }

      </div>
    );
  }

}

export default HourBar;
