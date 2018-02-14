import React, {PureComponent} from 'react';
import {Row, Col, Card, Divider, Button, Icon, Spin} from 'antd';

export default class DistrictCard extends PureComponent {

  constructor(props) {
    super(props);
  }

  render() {

    const {district} = this.props;

    return (
      <Card>
        {district.properties.name}
      </Card>

    );
  }
}
