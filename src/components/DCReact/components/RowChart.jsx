import React, { Component, PropTypes } from 'react';
import dc from 'dc';
import { Base } from './Base';


class RowChart extends Component {

  loadChart = (container) => {

    if (container) {
      this.chart = dc.rowChart(container);
      const helper = this.props.chartHelper(this, this.chart);
      helper.setProperties('elasticX', 'ordering');

      if (this.props.xAxis) {
        this.props.xAxis(this.chart.xAxis());
      }
      this.chart.render();
    }
  };


  componentDidUpdate (prevProps) {
    this.chart.redraw();
  }

  render() {
    return <div className={this.props.className} ref={ this.loadChart }/>;
  }
}

export default Base(RowChart);
