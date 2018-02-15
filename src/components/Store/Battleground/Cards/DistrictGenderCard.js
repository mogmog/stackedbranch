import React, {PureComponent} from 'react';
import {Row, Col, Card } from 'antd';
import _ from 'lodash';
import * as d3 from 'd3';
import ReactSVG from 'react-svg';
import GenderBar from './../Charts/GenderBar';

export default class DistrictGenderCard extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const {district, profile} = this.props;
    const data = profile.getGroupedByGender(district.properties.name);
    console.log(data);

    return (
      <Card >
        <h2>{district.properties.name} {d3.format(".1%")(data.getHighest())} </h2>

        <h4 style={{'marginTop' : '-1em'}}>{data.total}</h4>


        <Row gutter={24} style={{'width': '500px'}}>
          <Col xl={3} lg={3} md={24} sm={24} xs={24}>
              <ReactSVG path={require('../../../../assets/svg/ic-man.svg')} />
          </Col>

          <Col xl={18} lg={16} md={24} sm={24} xs={24}>
            <GenderBar data={data}></GenderBar>
          </Col>

          <Col xl={3} lg={3} md={24} sm={24} xs={24}>
            <ReactSVG path={require('../../../../assets/svg/ic-woman.svg')} />
          </Col>

        </Row>

      </Card>

    );
  }
}
