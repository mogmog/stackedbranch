import React from 'react'
import ReactDOM from 'react-dom'
import dc from 'dc/dc' // Use dc/dc.js instead of dc/index.js for crossfilter2 compatibility
import d3 from 'd3'
import _ from 'lodash'

class HeatmapChart extends React.Component {
    componentDidMount () {
        const {width, height, dimension, group, options} = this.props
        let DOMNode = ReactDOM.findDOMNode(this)

        var chart = dc.heatMap(DOMNode);
        chart.ordinalColors(['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4' ]);



        this.chart = this.setChartProperties(chart, width, height, dimension, group, options)
        this.chart.render()
    }

    componentDidUpdate (prevProps) {
        const {width, height, dimension, group, options} = this.props
        this.chart.redraw()
    }

    setChartProperties (chart, width, height, dimension, group, options) {
        const {margins} = options

        let defaultOptions = {
            width: width,
            height: height,
            margins: margins || {
                top: 10,
                right: 10,
                bottom: 10,
                left: 10,
            },
            dimension : dimension,
            group : group
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

HeatmapChart.defaultProps = {
    width: 350,
    height: 100,
    options: {
        margins: {
            top: 10,
            right: 10,
            bottom: 30,
            left: 10,
        }
    },
}

export default HeatmapChart