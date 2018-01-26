import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card } from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import TravelOriginDestinationMap from '../../../components/Travel/OriginDestination/TravelOriginDestinationMap';
import styles from './styles.less';

@connect(state => ({
}))
export default class OriginDestination extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {

  }

  render() {

    return (
      <TravelOriginDestinationMap />
    );
  }
}
