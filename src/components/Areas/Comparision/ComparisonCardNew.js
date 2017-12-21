import React from 'react';
import { Router, Route } from 'dva/router';
import crossfilter from 'crossfilter2';
import { Spin, Row, Col } from 'antd';
import moment from 'moment';

import request from '../../../utils/request';
import PieChart from '../../DCChartWrappers/PieChart';

class ComparisonCardNew extends React.Component {
  constructor() {
    super();

    this.state = {
      loading : true,
      sightings: [],
      records : []
    };
  }

  componentDidMount() {

    return request('/api/sighting/byarea/' + this.props.area, {
      method: 'GET',
    }).then((res) => {
      this.setState({sightings: res.list, loading : false});
    });
  }

  render() {

    const getGreetingTime = (m) => {
      var g = null; //return g

      if (!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

      var split_afternoon = 12 //24hr time to split the afternoon
      var split_evening = 17 //24hr time to split the evening
      var currentHour = parseFloat(m.format("HH"));

      if (currentHour >= split_afternoon && currentHour <= split_evening) {
        g = "afternoon";
      } else if(currentHour >= split_evening) {
        g = "evening";
      } else {
        g = "morning";
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
            {( data.length ? <PieChart dimension={timeOfDayDimension} group={timeOfDayCount} /> : <span></span>)}
          </Col>
        </Row>

        <Row>
          <Col>
            {(data.length ? <PieChart dimension={networkDimension} group={networkCount} /> : <span></span>)}
          </Col>
        </Row>

      </Spin>
    );
  }
}

export default ComparisonCardNew;

//React.PropTypes

//define prop type3s
