import React from 'react';
import crossfilter from 'crossfilter2';
import { Spin, Row, Col } from 'antd';
import moment from 'moment';

import request from '../../utils/request';
import PieChart from '../DCChartWrappers/PieChart';

class SiteEventsChartsHolderCombined extends React.Component {
  constructor() {
    super();

    this.state = {
      loading : true,
      sightings: [],
      records : [],
    };
  }

  componentDidMount() {

    return request('/api/sighting/bysite?site_id=&' + this.props.site_ids.map(x=> 'site_id=' + x).join('&'), {
      method: 'GET',
    }).then((res) => {
      this.setState({sightings: res.list, loading : false});
    });
  }

  render() {

    const getGreetingTime = (m) => {
      let g = null;

      if (!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

      const splitAfternoon = 12; //24hr time to split the afternoon
      const splitEvening = 17; //24hr time to split the evening
      const currentHour = parseFloat(m.format("HH"));

      if (currentHour >= splitAfternoon && currentHour <= splitEvening) {
        g = 'afternoon';
      } else if (currentHour >= splitEvening) {
        g = 'evening';
      } else {
        g = 'morning';
      }

      return g;
    };

    const data = crossfilter(this.state.sightings);
    const timeOfDayDimension  = data.dimension(d => getGreetingTime(moment(d.timestamp)) );
    const timeOfDayCount      = timeOfDayDimension.group().reduceCount()

    const networkDimension    = data.dimension(d => (d.network.network));
    const networkCount        = networkDimension.group().reduceCount()

    return (
      <Spin spinning={this.state.loading}>

        <Row>
          <Col>
            {(this.state.sightings.length ? <PieChart dimension={timeOfDayDimension} group={timeOfDayCount} /> : <span>loading</span>)}
          </Col>

          <Col>
            {(this.state.sightings.length ? <PieChart dimension={networkDimension} group={networkCount} /> : <span>loading</span>)}
          </Col>

        </Row>

      </Spin>
    );
  }
}

export default SiteEventsChartsHolderCombined;
