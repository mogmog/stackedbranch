import React, {PureComponent} from 'react';
import {Row, Col, Card } from 'antd';
import DistrictCard from './DistrictCard';
import GenderBar from './../Charts/GenderBar';

export default class DistrictGenderCard extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const {district, profile, colors } = this.props;
    const data = profile.getGroupedByGender(district.properties.name);

    return (

      <DistrictCard title={district.properties.name} total={data.total} height={170}>

        <Row gutter={24}>

          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <GenderBar title={district.properties.name} colors={colors} gender={'m'} data={data}></GenderBar>
          </Col>

          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <GenderBar title={district.properties.name} colors={colors} gender={'f'} data={data}></GenderBar>
          </Col>

        </Row>

      </DistrictCard>
    );
  }
}

