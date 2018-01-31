import Highcharts from 'highcharts';
import * as funnel from 'highcharts-funnel';
Highcharts.Funnel = funnel.default(Highcharts);

Highcharts.setOptions({
  chart: {
    style: {
      fontFamily: 'telefonica_text',
      fontSize: '38px',

    }
  }
});

import React, {Component} from 'react';
import { withHighcharts, HighchartsChart, FunnelSeries } from 'react-jsx-highcharts';

const plotOptions = {
  style: {
    fontFamily: 'telefonica_text',
    fontSize: '38px',

  },
  series: {
    dataLabels: {
      enabled: true,
      format: '<b>{point.name}</b> ({point.y:,.0f})',
      softConnector: false
    },
    center: ['40%', '50%'],
    neckWidth: '30%',
    neckHeight: '25%',
    width: '100%',
  }
};

const funnelData = [
  ['Catchment Area', 100],
  ['Nearby', 100],
  ['In Store', 100],
  ['Sales', 100]
];


const MyChart = () => (
  <HighchartsChart  >
    <FunnelSeries width={800}   data={funnelData} />
  </HighchartsChart>
);

export default withHighcharts(MyChart, Highcharts); // Injecting the Highcharts object



