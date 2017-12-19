import React, { PureComponent } from 'react';
import { Chart, Axis, Bar, Coord } from 'viser-react';

import _ from 'lodash';

const dataPre = {
  transform: {
    type: 'fold',
    fields: [ 30 ],
    key: 'type',
    value: 'value',
  },
};

class SiteCountryBarChart extends PureComponent {
  render() {

    const data2 = this.props.data;

    return (
      <Chart width={600} height={600} data={data2} dataPre={dataPre}>
        <Coord type="rect" direction="LT" />
        <Axis dataKey="value" position="right" />

        <Bar position="label*value" color="type"  />
      </Chart>
    );
  }
}

export default SiteCountryBarChart;
