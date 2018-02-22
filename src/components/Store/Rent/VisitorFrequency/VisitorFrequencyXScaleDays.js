import React, { Component } from 'react';
import * as d3 from 'd3';
import styles from './VisitorFrequency.less';

class VisitorFrequencyXScaleDays extends Component {

  constructor(props) {
    super();
  }

  componentDidUpdate () { this.renderAxis(); }
  componentDidMount () { this.renderAxis(); }

  renderAxis () {
    var node = this.axis;
    d3.select(node).call(d3.svg.axis().scale(this.props.xScale).ticks(0).outerTickSize(0).tickFormat(x=> x.split('_')[0]).tickValues(this.props.xScale.domain().filter((d, i)=> !(i % 3))));
  }

  render() {

    return (
      <g ref={(axis) => this.axis = axis} className={styles.daysaxis} />
    );
  }
}

export default VisitorFrequencyXScaleDays;

//a scale which maps a width to a key of start_dow + start_hour
//a scale which maps a height to the maximum count of all entries


