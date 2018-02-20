import React, {PureComponent} from 'react';
import getRouteData from './../../../router';
import {connect} from 'dva';
import moment from 'moment';
import {Menu, Row, Col, Card, Divider, Button, Icon} from 'antd';
import ReactSVG from 'react-svg';
import MotionMenu from '../../../ext/react-motion-menu/src';

import PrintMenu from '../../../components/Common/Printing/PrintMenu.js';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import SummaryBar from '../../../components/Store/Attraction/SummaryCard/SummaryBar';

import CalendarSideBar from '../../../components/Store/Attraction/CalendarSideBar';
import HourBar from '../../../components/Store/Attraction/HourBar';
import GenderAge from '../../../components/Store/Attraction/GenderAge';
import DistrictVisitorMap from '../../../components/Store/Attraction/DistrictVisitorMap/DistrictVisitorMap';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@connect(state => {

  return {
    visitors: state.purchase.visitors,
    workers: state.purchase.workers,
    districtvisitors: state.districtvisitors.visitors,
    attraction_totals: state.districtvisitors.attraction_totals,
  }
})

export default class Attraction extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'districtvisitors/fetch_visitors',
      payload: {}
    });

    dispatch({
      type: 'districtvisitors/fetch_attraction_totals',
      payload: {}
    });
  }

  getGender(feature, type) {

    const {dispatch} = this.props;

    if (type === 'Visitor') {
      dispatch({
        type: 'purchase/fetch',
        payload: {'home_district_name' : feature.properties.name, 'type_visitor' : 'Visitor'}
      });
    }

    if (type === 'Worker') {
      dispatch({
        type: 'purchase/fetch',
        payload: {'home_district_name' : feature.properties.name, 'type_visitor' : 'Worker'}
      });
    }

  }

  render() {

    const {visitors, workers, districtvisitors, attraction_totals, match } = this.props;

    const show4Columns = match.path === '/store/attraction';

    const pageHeaderContent = (
      <div>

        <div style={{'float': 'right'}}>
          <CalendarSideBar range={[moment('2018/03/01'), moment('2018/03/07')]}/>
        </div>

        <div>

          <h1>Overview: Attraction power</h1>
          <small>Know your attraction power from total pedestrians to sales and take a general perspective of target</small>

          <div style={{'height' : '60px', 'right' : '83px', top : '151px', 'zIndex' : 999, position: 'absolute'}} >
            <PrintMenu/>
          </div>

        </div>

      </div>
    );

    return (
      <PageHeaderLayout
        top={null}
        content={pageHeaderContent}
        style={{'padding': '10px 10px 10px 10px'}}
      >

        <div style={{width : '95%', 'padding' : '20px 20px 20px 20px', 'float' : 'right' }}>

          <SummaryBar attraction_totals={attraction_totals} columns={show4Columns ? 4 : 2}/>

          <Divider />
          <Row gutter={24}>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>

              <Card
                bordered={true}
                title="Home District">

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <DistrictVisitorMap type={'home'} districtClick={ ((feature) => this.getGender(feature, 'Visitor')) } data={districtvisitors}></DistrictVisitorMap>
                  </Col>
                </Row>

                <Divider/>

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <HourBar data={visitors} width={290}/>
                  </Col>
                </Row>

                <Divider/>

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    {(visitors ? <GenderAge data={visitors}/> : <span></span>)}
                  </Col>
                </Row>

              </Card>

            </Col>



            <Col xl={12} lg={12} md={24} sm={24} xs={24}>

              <Card
                bordered={true}
                title="Work District">

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <DistrictVisitorMap type={'work'} districtClick={ ((feature) => this.getGender(feature, 'Worker')) }  data={districtvisitors}></DistrictVisitorMap>
                  </Col>
                </Row>

                <Divider/>

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <HourBar data={workers} width={290}/>
                  </Col>
                </Row>

                <Divider/>

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    {(workers ? <GenderAge data={workers}/> : <span></span>)}
                  </Col>
                </Row>

              </Card>

            </Col>



          </Row>
        </div>
      </PageHeaderLayout>
    );
  }
}
