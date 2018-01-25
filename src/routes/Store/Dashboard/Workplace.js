import React, {PureComponent} from 'react';
import moment from 'moment';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Row, Col, Card, List, Avatar} from 'antd';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import EditableLinkGroup from '../../components/EditableLinkGroup';
import {Radar} from '../../../components/Charts/index';

import CardStoreFactory from '../../../stores/CardStoreFactory';

import styles from './Workplace.less';

@connect(state => ({
}))
export default class Workplace extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      cards: [CardStoreFactory(), CardStoreFactory()],        //initialise there to be default one card
      dropdownOpen: false,
    };
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {
    const {
    } = this.props;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.content}>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
      >

        <Row gutter={24}>
          {this.state.cards.map((store, i) => (
            <Col xl={12} lg={12} md={12} sm={24} xs={24} key={i}>
              <Card
                style={{marginBottom: 24}}
                title={ 'Store ' + i}
                bordered={true}
                bodyStyle={{padding: 0}}
              >
              </Card>
            </Col>
          ))}
        </Row>

      </PageHeaderLayout>
    );
  }
}
