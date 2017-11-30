import React from 'react'
import ReactDOM from 'react-dom'
import d3 from 'd3'
import dc from 'dc/dc' // Use dc/dc.js instead of dc/index.js for crossfilter2 compatibility
import _ from 'lodash'
import {renderToStaticMarkup} from 'react-dom/server'

class BarChart extends React.Component {
  componentDidMount() {
    const {width, height, dimension, group, xRange, yRange, getChartID, rangeFilter, rangeChartID, children, options} = this.props
    let DOMNode = ReactDOM.findDOMNode(this)

    // Create a dc.js barChart
    const chart = dc.barChart(DOMNode)
    this.chart = this.setChartProperties(chart, width, height, dimension, group, xRange, yRange, rangeFilter, rangeChartID, children, options)
    this.chart.render()

    if (getChartID) {
      getChartID(this.chart.chartID())
    }
  }

  componentDidUpdate(prevProps) {
    const {width, height, dimension, group, xRange, yRange, getChartID, rangeFilter, rangeChartID, children, options} = this.props

    if (!_.isEqual(xRange, prevProps.xRange) || !_.isEqual(yRange, prevProps.yRange)) {
      this.chart = this.setChartProperties(this.chart, width, height, dimension, group, xRange, yRange, rangeChartID, rangeFilter, children, options)
      this.chart.rescale()
    } else {
      this.chart.redraw()
    }

    if (!_.isEqual(rangeChartID, prevProps.rangeChartID)) {
      this.chart = this.setChartProperties(this.chart, width, height, dimension, group, xRange, yRange, rangeChartID, rangeFilter, children, options)
      this.chart.render()
    } else {
      this.chart.redraw()
    }

    if (getChartID) {
      getChartID(this.chart.chartID())
      this.chart.redraw()
    }

    // if (!_.isEqual(rangeFilter, prevProps.rangeFilter)) {
    //     this.chart.filter(null) // Clear filters before applying new ones
    //     if (rangeFilter) {
    //         this.chart.filter(dc.filters.TwoDimensionalFilter(rangeFilter))
    //     } else {
    //         dc.redrawAll()
    //     }
    //     this.chart.redraw()
    // }
  }

  setChartProperties(chart, width, height, dimension, group, xRange, yRange, rangeChartID, rangeFilter, toolTipHtml, options) {
    const {margins, valueAccessor, x, y, xUnits, renderVerticalGridLines, transitionDuration, yAxisTicks, mouseZoomable, brushOn} = options

    let defaultOptions = {
      width: width,
      height: height,
      margins: margins || {
        top: 20,
        right: 20,
        bottom: 30,
        left: 20,
      },
      dimension: dimension,
      group: group,
      valueAccessor: valueAccessor || ((d) => {
        return d.value
      }),
      x: x || d3.time.scale().domain(xRange),
      xUnits: d3.time.days,
      brushOn: brushOn || true,
      elasticY: _.isNil(yRange),
      mouseZoomable: mouseZoomable || false,
      renderVerticalGridLines: false,
      transitionDuration: transitionDuration || 500,
    }

    chart.options(_.extend({}, defaultOptions, options))


    //chart.yAxis().ticks(!_.isNil(yAxisTicks) ? yAxisTicks : 4)


    return chart
  }

  render() {
    const {name} = this.props
    return (
      <div id={ name }/>
    )
  }
}


BarChart.defaultProps = {
  width: 100,
  height: 200,
  yRange: null,
  rangeChartID: null,
  children: null,
  rangeFilter: null,
  options: {
    margins: {
      top: 10,
      right: 20,
      bottom: 30,
      left: 20,
    },
    keyAccessor: (d) => d.key,
    valueAccessor: (d) => d.value,
    brushOn: true,
    centerBar: true,
    mouseZoomable: false,
    renderTitle: false,
    renderHorizontalGridLines: true,
    renderVerticalGridLines: true,
    transitionDuration: 500,
    yAxisTicks: 4,
  },
}

export default BarChart
