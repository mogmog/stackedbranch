import React from 'react'
import ReactDOM from 'react-dom'
import dc from 'dc/dc'
import _ from 'lodash'

class DataTableChart extends React.Component {
    componentDidMount () {
        const {width, height, dimension, group, options} = this.props
        let DOMNode = ReactDOM.findDOMNode(this)

        // Create a dc.js rowChart
        let chart = dc.dataTable(DOMNode)

        this.chart = this.setChartProperties(chart, width, height, dimension, group, options)
        this.chart.render()
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
            size : Infinity,
            showGroups : false,
            group: function (d) { return ' '; },
            columns : [
                d => d.ics_score,
                d => d.group_name,
            ]
        }
        chart.options(_.extend({}, defaultOptions, options))

        chart.on('renderlet', (ch) => {
            console.log("inside renderlet");
        });

        return chart
    }

    render () {
        const {name} = this.props
        return (
            <div></div>
        )
    }
}

DataTableChart.defaultProps = {
    height: 300,
    width: 200,
    options: {
        margins: {
            top: 20,
            right: 20,
            bottom: 30,
            left: 20,
        }
    },
}

export default DataTableChart
