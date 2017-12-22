import React, { Component, PropTypes } from 'react';
import dc from 'dc';
import { Base } from './Base';


class RowChart extends Component {

  loadChart = (container) => {

    if (container) {
      const chart = dc.rowChart(container);
      const helper = this.props.chartHelper(this, chart);
      helper.setProperties('elasticX');

      if (this.props.xAxis) {
        this.props.xAxis(chart.xAxis());
      }
      chart.render();
    }
  };

  render() {
    return <div className={this.props.className} ref={ this.loadChart }/>;
  }
}

export default Base(RowChart);
