import React from 'react';
import {Router, Route} from 'dva/router';
import crossfilter from 'crossfilter2/crossfilter';
import {Spin, Row, Col, Card} from 'antd';
import moment from 'moment';
import request from '../../../utils/request';
import d3 from 'd3';
import dc from 'dc';
import {
  ChartContainer,
  PieChart,
  RowChart,
  BubbleChart,
  DataTable,
  DataCount,
  BarChart,
  LineChart
} from './../../DCReact/components';

class ComparisonCardNew extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      sightings: [],
      records: []
    };
  }

  componentDidMount() {

    return request('/api/sighting/byarea/' + this.props.area.id, {
      method: 'GET',
    }).then((res) => {
      this.setState({sightings: res.list, loading: false});
    });
  }

  render() {

    if (this.state.loading) return (<Card style={{marginBottom: 24}} title={<Spin/>} bordered={true} bodyStyle={{padding: 0}}> </Card>);
    if (!this.state.sightings.length) return (<Card style={{marginBottom: 24}} title='No Results' bordered={true} bodyStyle={{padding: 0}}> </Card>);

    const getGreetingTime = (m) => {
      var g = null; //return g

      if (!m || !m.isValid()) {
        return;
      } //if we can't find a valid or filled moment, we return.

      var split_afternoon = 12 //24hr time to split the afternoon
      var split_evening = 17 //24hr time to split the evening
      var currentHour = parseFloat(m.format("HH"));

      if (currentHour >= split_afternoon && currentHour <= split_evening) {
        g = "Afternoon";
      } else if (currentHour >= split_evening) {
        g = "Evening";
      } else {
        g = "Morning";
      }

      return g;
    };

    const ndx = crossfilter(this.state.sightings);

    const timestampDimension = ndx.dimension(d => new Date(d.timestamp));
    const timestampDimensionCount = timestampDimension.group().reduceSum(x => x.count);

    const genderDimension = ndx.dimension(d => d.gender);
    const genderDimensionCount = genderDimension.group().reduceSum(x => x.count);

    const ageRangeDimension = ndx.dimension(d => d.age_range);
    const ageRangeDimensionCount = ageRangeDimension.group().reduceSum(x => x.count);


    //const countryDimension = ndx.dimension(d => d.country);
    //const countryDimensionCount = countryDimension.group();

    console.log(d3.time.scale().domain(d3.extent(this.state.sightings, function(d) { return d.timestamp; })));

    return (

      <Card
        style={{marginBottom: 24}}
        title={this.props.area.name}
        bordered={true}
        bodyStyle={{padding: 0}}
      >

        <div>

          <Row>
            <Col>
              <PieChart
                dimension={e => {
                  return genderDimension
                }}
                group={e => {
                  return genderDimensionCount
                }}
                width={350}
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

              <BarChart
                dimension={ e => {return timestampDimension}}
                group={ e => {return timestampDimensionCount}}
                renderArea={true}
                width={350}
                height={200}
                transitionDuration={500}
                margins={{top: 30, right: 50, bottom: 25, left: 40}}
                mouseZoomable={true}
                x={d3.time.scale().domain([new Date(2016, 0, 1), new Date(2017, 11, 31)])}
                round={d3.time.month.round}
                xUnits={d3.time.years}
                elasticY={true}
                renderHorizontalGridLines={true}
                brushOn={true}
              />

            </Col>
          </Row>

          <Row>
            <Col>

              <RowChart
                width={350}
                dimension={e => {
                  return ageRangeDimension;
                }}
                group={e => {
                  return ageRangeDimensionCount;
                }}

              />
            </Col>
          </Row>

        </div>
      </Card>
    );
  }
}

export default ComparisonCardNew;

