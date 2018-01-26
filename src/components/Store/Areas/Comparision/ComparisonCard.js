import React from 'react';
import { Router, Route } from 'dva/router';
import crossfilter from 'crossfilter2/crossfilter';
import { Spin, Row, Col, Card } from 'antd';
import moment from 'moment';
import request from '../../../../utils/request';

import HeatmapLayer from 'react-leaflet-heatmap-layer';

import Testing from './Testing';

import d3 from 'd3';
import dc from 'dc';
import { Map, TileLayer } from 'react-leaflet';

import {
  ChartContainer,
  PieChart,
  RowChart,
  BubbleChart,
  DataTable,
  DataCount,
  BarChart,
  LineChart,
  DetailMap
} from '../../../Common/DCReact/components/index';

class ComparisonCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      sightings: [],
      records: [],
      filter: null,
    };

    this.geoDimension = undefined;
    this.everything = undefined;
    this.run = false;
    this.heatmap = [];
  }

  componentDidMount() {
    return request(`/api/sighting/byarea/${this.props.area.id}`, {
      method: 'GET',
    }).then((res) => {

      const ndx = crossfilter(res.list);

      const genderDimension = ndx.dimension(d => d.gender);
      const genderDimensionCount = genderDimension.group().reduceSum(x => x.count);

      const timestampDimension = ndx.dimension(d => new Date(d.timestamp));
      const timestampDimensionCount = timestampDimension.group().reduceSum(x => x.count);

      const ageRangeDimension = ndx.dimension(d => d.age_range);
      const ageRangeDimensionCount = ageRangeDimension.group().reduceSum(x => x.count);

      const everythingDimension = ndx.dimension((d) => { return d});

      this.setState({ loading: false, genderDimension, genderDimensionCount, everythingDimension, timestampDimension, timestampDimensionCount, ageRangeDimension, ageRangeDimensionCount });
    });
  }

  updateMapFilter() {
    const that = this;

    if (that.map) {
      that.state.everythingDimension.filter(function (d) {
        return that.map.leafletElement.getBounds().contains(d.geos[0]);
      });
    }
    dc.redrawAll();
  }

  onfilter() {
  }

  applymaphandlers(MAP) {

    const that = this;

    this.map = MAP;

    if (this.map) {
      this.map.leafletElement.on('moveend', function () {
        that.updateMapFilter();
      });

      this.map.leafletElement.on('zoomend', function () {
        that.updateMapFilter();
      });
    }
  }

  render() {
    if (this.state.loading) return (<Card style={{ marginBottom: 24, width: '370px' }} title={<Spin />} bordered bodyStyle={{ padding: 0 }} />);
    if (!this.state.genderDimension.top(Infinity).length) return (<Card style={{ marginBottom: 24, width: '370px' }} title="No Results" bordered bodyStyle={{ padding: 0 }} />);

    const mapOptions = {
      center: [51.51451110408478, -0.12620388576521444],
      zoom: 14,
      maxZoom: 18,
      minZoom: 1,
      zoomControl: false,
    }

    return (

      <Card
        style={{ marginBottom: 24, width: '370px' }}
        title={this.props.area.name}
        bordered
        bodyStyle={{ padding: 0 }}
      >

        <div>

          <Row>
            <Col>

              <PieChart
                filter={this.props.filter}
                onfilter={this.onfilter.bind(this)}
                clear={this.props.clear}
                dimension={(e) => {
                  return this.state.genderDimension;
                }}
                group={(e) => {
                  return this.state.genderDimensionCount;
                }}
                width={380}
                height={250}
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
                dimension={(e) => { return this.state.timestampDimension; }}
                group={(e) => { return this.state.timestampDimensionCount; }}
                onfilter={this.onfilter.bind(this)}
                renderArea
                width={370}
                height={200}
                transitionDuration={500}
                margins={{ top: 30, right: 50, bottom: 25, left: 40 }}
                mouseZoomable
                x={d3.time.scale().domain([new Date(2016, 0, 1), new Date(2017, 11, 31)])}
                round={d3.time.month.round}
                xUnits={d3.time.years}
                elasticY
                renderHorizontalGridLines
                brushOn
              />

            </Col>
          </Row>

          <Row>
            <Col>

              <RowChart
                width={370}
                dimension={(e) => {
                  return this.state.ageRangeDimension;
                }}
                group={(e) => {
                  return this.state.ageRangeDimensionCount;
                }}
                ordering={(e) => e.key }

              />
            </Col>
          </Row>

          <Row>
            <Col style={{'width':370, 'height':280}}>

              {/*<Testing thing={this.state.everythingDimension}></Testing>*/}

              {<Map ref={this.applymaphandlers.bind(this)} {...mapOptions} zoom={18}>

                <HeatmapLayer
                  fitBoundsOnLoad
                  points={this.state.everythingDimension.top(Infinity).map(x=> x.geos)}
                  longitudeExtractor={m => m[0].lng}
                  latitudeExtractor={m => m[0].lat}
                  intensityExtractor={m => 50} />

                <TileLayer url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
               </Map>}

            </Col>
          </Row>

        </div>
      </Card>
    );
  }
}

export default ComparisonCard;

