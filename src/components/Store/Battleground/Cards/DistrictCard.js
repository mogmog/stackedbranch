import React, {PureComponent} from 'react';
import {Row, Col, Card } from 'antd';

export default class DistrictCard extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const { children, title, total, height = 200, className } = this.props;

    return (
      <Card style={{'background' : 'none', 'height' : `${height}px`}} className={className}>

        <h2>{title}  </h2>

        <h5 style={{'marginTop' : '-1.3em'}}>{total}</h5>

        {children}

      </Card>

    );
  }
}

