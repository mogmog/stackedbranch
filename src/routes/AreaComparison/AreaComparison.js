import React, {PureComponent} from 'react';
import moment from 'moment';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Button, Row, Col, Card, List, Avatar} from 'antd';
import AnimateHeight from 'react-animate-height';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import CardStoreFactory from './../../stores/CardStoreFactory';
import AreaSelectMap from '../../components/Areas/Comparision/AreaSelectMap';
import ComparisonCard from '../../components/Areas/Comparision/ComparisonCard';

@connect(state => ({
}))
export default class Workplace extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      cards: [CardStoreFactory(), CardStoreFactory()],        //initialise there to be default one card
      dropdownOpen: false,
      height: 400,
      height2: 600,
    };
  }

  render() {

    const {
      height,
      height2,
    } = this.state;

    const pageHeaderContent = (
      <div>
        <div>
          <button className='btn btn-sm' onClick={ () => this.setState({ height: 100 }) }>
            Hide
          </button>
          <button className='btn btn-sm' onClick={ () => this.setState({ height: 500 }) }>
            Increase
          </button>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
      >
        <Row gutter={24}>
            <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <Card
                title={'Select multiple areas'}
                bordered={true} >

                <AnimateHeight height={ height } >
                    <AreaSelectMap/>
                </AnimateHeight>

              </Card>
            </Col>
        </Row>
        <Row gutter={24}>
          {this.state.cards.map((store, i) => (
            <Col xl={12} lg={12} md={12} sm={24} xs={24} key={i}>
              <Card
                style={{marginBottom: 24}}
                title={ 'Store ' + i}
                bordered={true}
                bodyStyle={{padding: 0}}
              >
                <ComparisonCard store={store} key={i} />
              </Card>
            </Col>
          ))}
        </Row>

      </PageHeaderLayout>
    );
  }
}
