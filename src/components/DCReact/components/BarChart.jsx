import React, { Component, PropTypes } from 'react';
import dc from 'dc';
import { Base } from './Base';


class BarChart extends Component {

  loadChart = (container) => {

    if (container) {
      this.chart = dc.barChart(container);
      const helper = this.props.chartHelper(this, this.chart);
      helper.setProperties('elasticY', 'centerBar', 'gap', 'round',
        'alwaysUseRounding', 'x', 'renderHorizontalGridLines',
        'filterPrinter');

      this.chart.render();
    }
  };

  componentDidUpdate (prevProps) {
    //this.chart.filter(this.props.filter);
    this.chart.redraw();
  }

  render() {
    return <div className={this.props.className} ref={ this.loadChart }/>;
  }
}

export default Base(BarChart);
