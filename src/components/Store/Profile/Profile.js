import React from 'react';
import { Router, Route } from 'dva/router';
import { Spin, Row, Col, Card } from 'antd';
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
} from '../../Common/DCReact/components/index';

class ProfileHolder extends React.Component {
  constructor() {
    super();

    this.state = {
    };
  }

  render() {

    const {profile} = this.props;

    const mapOptions = {
      center: [51.51451110408478, -0.12620388576521444],
      zoom: 14,
      maxZoom: 18,
      minZoom: 1,
      zoomControl: false,
    }

    return (

          <Row>
            <Col xl={18} lg={18} md={18} sm={24} xs={24}>

              {<Map ref="profilemap" {...mapOptions} zoom={13} style={{'width':'90%', 'height':'80vh'}}>

                <TileLayer url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
               </Map>}

            </Col>

            <Col xl={6} lg={6} md={6} sm={24} xs={24}>
                <Card style={{maxWidth : '280px'}}>
                  <PieChart
                    dimension={(e) => profile.genderDimension }
                    group={(e) => profile.genderDimensionCount }
                    width={180}
                    height={180}
                    radius={100}
                    label={(d) => d.key }
                  />
                </Card>

              <Card>
                <RowChart
                  width={220}
                  dimension={(e) => profile.ageDimension }
                  group={(e) => profile.ageDimensionCount }
                  ordering={(e) => e.key }

                />
              </Card>

              <Card>
                this is card
              </Card>


            </Col>

          </Row>
    );
  }
}

export default ProfileHolder;

