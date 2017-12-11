import React from 'react';
import ReactDOM from 'react-dom';
import dc from 'dc/dc';
import _ from 'lodash';

class PieChart extends React.Component {
  componentDidMount() {
    const { width, height, dimension, group, options } = this.props;
    const DOMNode = ReactDOM.findDOMNode(this);

    // Create a dc.js rowChart
    let chart = dc.pieChart(DOMNode)
    chart.ordinalColors(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628']);

    this.chart = this.setChartProperties(chart, width, height, dimension, group, options)
    this.chart.render();
  }

  componentDidUpdate () {
    this.chart.redraw()
  }

  setChartProperties (chart, width, height, dimension, group, options) {
    const {margins, label, elasticX} = options

    let defaultOptions = {
      height: height,
      width: width,
      margins: margins || {
        top: 20,
        right: 20,
        bottom: 30,
        left: 20,
      },
      dimension: dimension,
      group: group,
      slicesCap : 4,
      innerRadius : 100,
      elasticX: elasticX || true,
      label: label || (d => d.key)
    }
    chart.options(_.extend({}, defaultOptions, options))

    return chart
  }

  render () {
    const {name} = this.props
    return (
      <div id={ name } />
    )
  }
}



PieChart.defaultProps = {
  height: 300,
  width: 400,
  options: {
    margins: {
      top: 20,
      right: 20,
      bottom: 30,
      left: 20,
    },
    elasticX: true,
    label: (d) => d.key,
  },
}

export default PieChart;
