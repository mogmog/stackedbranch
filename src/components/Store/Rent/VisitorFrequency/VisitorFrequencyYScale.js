import React, { Component } from 'react';
import * as d3 from 'd3';
import styles from './VisitorFrequency.less';

class VisitorFrequencyYScale extends Component {

  constructor(props) {
    super();
  }

  componentDidUpdate () { this.renderAxis(); }
  componentDidMount () { this.renderAxis(); }

  renderAxis () {
    var node = this.axis;
    d3.select(node).call(d3.svg.axis().scale(this.props.yScale).orient("left").ticks(10).outerTickSize(0).tickFormat(d3.format("s")));
  }

  render() {

    return (
      <g ref={(axis) => this.axis = axis} className={styles.freqaxis} />
    );
  }
}

export default VisitorFrequencyYScale;

//a scale which maps a width to a key of start_dow + start_hour
//a scale which maps a height to the maximum count of all entries


