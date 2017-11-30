import React from 'react'
import BarChart from './../DCChartWrappers/BarChart'

const options = {
  height: 200,
  width: 500,
  margins: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 30,
  }

}

class StoreCompareDateChart extends React.Component {
  render () {

    return (
      <BarChart { ...this.props }
        name='date-chart'
        options={ options } />
    )
  }
}

export default StoreCompareDateChart
