import React, { Component } from 'react';
import * as d3 from 'd3';
import styles from './VisitorFrequency.less';

class VisitorFrequencyScale extends Component {

  constructor(props) {
    super();
  }

  componentDidUpdate () { this.renderAxis(); }
  componentDidMount () { this.renderAxis(); }

  renderAxis () {
    var node = this.axis;
    const parts = {'Morning' : '9am', 'Afternoon' : '12am', 'Evening' : '9pm'}
    const dayPartToHours = x => parts[x.split("_")[1]];
    d3.select(node).call(d3.svg.axis().scale(this.props.xScale).ticks(21).tickFormat(dayPartToHours));
  }

  render() {

    return (
      <g ref={(axis) => this.axis = axis} className={styles.axis} />
    );
  }
}

export default VisitorFrequencyScale;

//a scale which maps a width to a key of start_dow + start_hour
//a scale which maps a height to the maximum count of all entries


