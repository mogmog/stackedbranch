import React, {PureComponent} from 'react';
import {Row, Col, Card } from 'antd';
import _ from 'lodash';
import * as d3 from 'd3';
import GenderBar from './../Charts/GenderBar';

export default class DistrictCard extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const { children, title, total } = this.props;

    return (
      <Card style={{'height' : '140px'}}>

        <h2>{title}  </h2>

        <h5 style={{'marginTop' : '-1.5em'}}>{total}</h5>

        {children}

      </Card>

    );
  }
}

