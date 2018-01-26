import React, { Component, PropTypes } from 'react';
import dc from 'dc';
import { Base } from './Base';


class LineChart extends Component {

  loadChart = (container) => {
    this.chart = dc.lineChart(container);
    const helper = this.props.chartHelper(this, this.chart);
    helper.setProperties('renderArea', 'xAxis', 'x', 'round', 'xUnits',
                         'elasticY', 'renderHorizontalGridLines', 'brushOn',
                         'valueAccessor')
          .setContextProperties('stack');

    this.chart.render();
  };


  componentDidUpdate (prevProps) {
    this.chart.redraw();
  }

  render() {
    return <div className={this.props.className} ref={ this.loadChart }/>;
  }
}

export default Base(LineChart);
