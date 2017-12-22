import React, { Component } from 'react';
import dc from 'dc';
import { Base } from './Base';

class PieChart extends Component {

  loadChart = (container) => {

    if (container) {

      this.chart = dc.pieChart(container);
      const helper = this.props.chartHelper(this, this.chart);
      helper.setProperties('radius', 'innerRadius');

      this.chart.render();

    }

  };

  render() {
    return <div className={this.props.className} ref={this.loadChart} />;
  }
}

export default Base(PieChart);
