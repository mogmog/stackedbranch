import React, {PureComponent} from 'react';
import {Row, Col, Card, Divider, Button, Spin} from 'antd';

import ReactSVG from 'react-svg';
//import SVGMan from 'svg-react-loader?name=SVGMan!../../../../assets/svg/ic-man.svg';
import GenderBar from './../Charts/GenderBar';

//var Icon = require('svg-react-loader?name=Icon!../../../../assets/svg/ic-man.svg');

export default class DistrictCard extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const {district} = this.props;

    return (
      <Card >
        <h2>{district.properties.name}</h2>

        <h4 style={{'marginTop' : '-1em'}}>something</h4>


        <Row gutter={24} style={{'width': '500px'}}>
          <Col xl={3} lg={3} md={24} sm={24} xs={24}>
              <ReactSVG path={require('../../../../assets/svg/ic-man.svg')} />
          </Col>

          <Col xl={18} lg={16} md={24} sm={24} xs={24}>
            <GenderBar></GenderBar>
          </Col>

          <Col xl={3} lg={3} md={24} sm={24} xs={24}>
            <ReactSVG path={require('../../../../assets/svg/ic-woman.svg')} />
          </Col>

        </Row>

      </Card>

    );
  }
}
