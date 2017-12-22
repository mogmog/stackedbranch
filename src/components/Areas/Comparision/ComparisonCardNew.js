import React from 'react';
import { Router, Route } from 'dva/router';
import crossfilter from 'crossfilter2/crossfilter';
import { Spin, Row, Col } from 'antd';
import moment from 'moment';
import request from '../../../utils/request';
import { ChartContainer, PieChart, RowChart, BubbleChart, DataTable, DataCount, BarChart, LineChart } from './../../DCReact/components';

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

    console.log(this);
    if (this.state.loading) return (<span> Loading...</span>);
    if (!this.state.sightings.length) return (<span> No Results</span>);

    const getGreetingTime = (m) => {
      var g = null; //return g

      if (!m || !m.isValid()) { return; } //if we can't find a valid or filled moment, we return.

      var split_afternoon = 12 //24hr time to split the afternoon
      var split_evening = 17 //24hr time to split the evening
      var currentHour = parseFloat(m.format("HH"));

      if (currentHour >= split_afternoon && currentHour <= split_evening) {
        g = "Afternoon";
      } else if(currentHour >= split_evening) {
        g = "Evening";
      } else {
        g = "Morning";
      }

      return g;
    };

    const ndx = crossfilter(this.state.sightings);

    const hourDimension  = ndx.dimension(d => getGreetingTime(moment(d.timestamp)));
    const hourDimensionCount = hourDimension.group();

    const countryDimension  = ndx.dimension(d => d.country);
    const countryDimensionCount = countryDimension.group();

    return (
      <div>

        <Row>
          <Col>
            <PieChart
              dimension={e => { return countryDimension }}
              group={e => { return countryDimensionCount }}
              width={300}
              height={300}
              radius={120}
              label={(d) => {
                return d.key;
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <RowChart
              dimension={e => { return hourDimension }}
              group={e => { return hourDimensionCount }}
              width={280}
              height={280}
              elasticX={true}
              margins={{ top: 20, left: 10, right: 10, bottom: 20 }}
              label={d => {return d.key }}
              title={d => d.value}
              xAxis={axis => axis.ticks(4)}
            />
          </Col>
        </Row>

      </div>
    );
  }
}

export default ComparisonCardNew;

