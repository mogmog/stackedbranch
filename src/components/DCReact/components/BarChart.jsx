import React, { Component, PropTypes } from 'react';
import dc from 'dc';
import { Base } from './Base';


class BarChart extends Component {

  loadChart = (container) => {

    if (container) {
      const chart = dc.barChart(container);
      const helper = this.props.chartHelper(this, chart);
      helper.setProperties('elasticY', 'centerBar', 'gap', 'round',
        'alwaysUseR ounding', 'x', 'renderHorizontalGridLines',
        'filterPrinter');

      chart.render();
    }
  };

  render() {
    return <div className={this.props.className} ref={ this.loadChart }/>;
  }
}

export default Base(BarChart);
