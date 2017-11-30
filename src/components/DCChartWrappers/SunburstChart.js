import React from 'react'
import ReactDOM from 'react-dom'
import dc from 'dc/dc'
import _ from 'lodash'

class SunburstChart extends React.Component {
  componentDidMount() {
    const {width, height, dimension, group, options} = this.props
    let DOMNode = ReactDOM.findDOMNode(this)

    var chart = dc.sunburstChart(DOMNode);
    chart.ordinalColors(['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']);

    this.chart = this.setChartProperties(chart, width, height, dimension, group, options)
    this.chart.render()
  }

  componentDidUpdate(prevProps) {
    const {width, height, dimension, group, options} = this.props
    this.chart.redraw()
  }

  setChartProperties(chart, width, height, dimension, group, options) {
    const {margins} = options

    let defaultOptions = {
      width: width,
      height: height,
      innerRadius: 50,
      margins: margins || {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
      dimension: dimension,
      group: group
    }

    chart.options(_.extend({}, defaultOptions, options))

    return chart
  }

  render() {
    const {name} = this.props
    return (
      <div id={ name }/>
    )
  }
}


SunburstChart.defaultProps = {
  width: 350,
  height: 350,
  options: {
    margins: {
      top: 50,
      right: 50,
      bottom: 50,
      left: 50,
    }
  },
}

export default SunburstChart
