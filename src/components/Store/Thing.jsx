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
      softConnector: true
    },
    center: ['40%', '50%'],
    neckWidth: '30%',
    neckHeight: '25%',
    width: '70%',
  }
};

const funnelData = [
  ['Catchment Area', 126560],
  ['Nearby', 101608],
  ['IN Store', 68607],
  ['Sales', 11537]
];


const MyChart = () => (
  <HighchartsChart  >
    <FunnelSeries  data={funnelData} />
  </HighchartsChart>
);

export default withHighcharts(MyChart, Highcharts); // Injecting the Highcharts object



