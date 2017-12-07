import React from 'react'
import RowChart from '../../DCChartWrappers/RowChart'
import d3 from 'd3'

const options = {
  height: 100,
  width: 500,
  margins: {
    top: 20,
    right: 20,
    bottom: -10,
    left: 20,

  },
  x: d3.scale.linear().range([0,350]),
  elasticX : false
}

class StoreCompareRowChart extends React.Component {
  render () {

    return (
      <RowChart { ...this.props }
        name='store-compare-row-chart'
        options={ options } />
    )
  }
}

export default StoreCompareRowChart
