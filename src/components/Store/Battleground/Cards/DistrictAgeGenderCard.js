import React, {PureComponent} from 'react';
import {Row, Col, Card } from 'antd';
import DistrictCard from './DistrictCard';

export default class DistrictAgeGenderCard extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const {district, profile, colors } = this.props;
    const data = profile.getGroupedByGender(district.properties.name);

    return (

      <DistrictCard title={district.properties.name} total={data.total}>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            I show agew and gender
          </Col>
        </Row>

      </DistrictCard>

    );
  }
}

