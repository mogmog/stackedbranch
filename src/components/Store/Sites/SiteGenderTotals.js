import React, { PureComponent } from 'react';
import _ from 'lodash';
import moment from 'moment';

import { Tooltip,  Icon } from 'antd';
import { ChartCard, Field } from '../../Common/Charts/index';

class SiteTotalSightings extends PureComponent {

  render() {

    const dates = this.props.dates;
    const total = _(this.props.data).sumBy('__visits');

    const dateRange = moment(dates[0]).format('MM/DD/YYYY') + ' - ' + moment(dates[1]).format('MM/DD/YYYY');

    return (

      <ChartCard
        bordered={false}
        title="Total number of unique views"
        action={<Tooltip title="This is something"><Icon type="info-circle-o" /></Tooltip>}
        total={(total)}
        footer={<Field label="Date range" value={dateRange} />}
        contentHeight={46}
      >

      </ChartCard>

    );
  }
}

export default SiteTotalSightings;
