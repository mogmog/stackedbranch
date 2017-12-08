import React, {PureComponent} from 'react';
import moment from 'moment';
import {connect} from 'dva';
import {Link} from 'dva/router';
import {Button, Row, Col, Card, List, Avatar, Divider} from 'antd';
import AnimateHeight from 'react-animate-height';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import CardStoreFactory from './../../stores/CardStoreFactory';
import AreaSelectMap from '../../components/Areas/Comparision/AreaSelectMap';
import ComparisonCard from '../../components/Areas/Comparision/ComparisonCard';

@connect(state => ({
  area: state.area,
}))
export default class Workplace extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      cards: [],        //initialise there to be default one card
      height: 400,
      height2: 600
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'area/fetch',
    });
  }

  onClickArea(area) {
    //alert("on click area " + area.id);
    this.setState({ cards: [...this.state.cards, area.id] });
  }

  render() {

    const {data: {list}, loading} = this.props.area;

    const {
      height,
      height2

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
                    <AreaSelectMap areas={list} onClickArea={this.onClickArea.bind(this)}/>
                </AnimateHeight>

              </Card>
            </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Divider></Divider>
          </Col>
        </Row>

        <Row gutter={24}>
          {this.state.cards.map((areaid, i) => (
            <Col xl={12} lg={12} md={12} sm={24} xs={24} key={i}>
              <Card
                style={{marginBottom: 24}}
                title={ 'Store ' + i}
                bordered={true}
                bodyStyle={{padding: 0}}
              >
                <ComparisonCard area={areaid} key={i} />
              </Card>
            </Col>
          ))}
        </Row>

      </PageHeaderLayout>
    );
  }
}
