import React, {PureComponent} from 'react';
import {Row, Col, Card } from 'antd';
import _ from 'lodash';
import * as d3 from 'd3';
import GenderBar from './../Charts/GenderBar';

export default class DistrictGenderCard extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const {district, profile, colors } = this.props;
    const data = profile.getGroupedByGender(district.properties.name);

    return (
      <Card style={{'height' : '140px'}}>

        <h2>{district.properties.name}  </h2>

        <h5 style={{'marginTop' : '-1.5em'}}>{data.total}</h5>


        <Row gutter={24}>

          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <GenderBar title={district.properties.name} colors={colors} gender={'m'} data={data}></GenderBar>
          </Col>

          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <GenderBar title={district.properties.name} colors={colors} gender={'f'} data={data}></GenderBar>
          </Col>

        </Row>

      </Card>

    );
  }
}

