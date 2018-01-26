import React, { Component, PropTypes } from 'react';
import dc from 'dc';
import { Base } from './Base';

class BubbleChart extends Component {

  loadChart = (container) => {
    const chart = dc.bubbleChart(container);
    const helper = this.props.chartHelper(this, chart);
    helper.setProperties('colorAccessor', 'keyAccessor',
                         'valueAccessor', 'radiusValueAccessor', 'x', 'y', 'r',
                         'colorDomain');
    chart.render();
  };

  render() {
    return (
      <div className={this.props.className} ref={this.loadChart} />
    );
  }
}

export default Base(BubbleChart);
