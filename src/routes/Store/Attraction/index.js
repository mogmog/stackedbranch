import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Menu, Row, Col, Card, Divider, Button, Icon } from 'antd';

import SideMenu from '../../../components/Common/SideMenu';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import SummaryBar from '../../../components/Store/Attraction/SummaryCard/SummaryBar';

import PageTitle from '../../../components/Common/PageTitle';
import HourBar from '../../../components/Store/Attraction/HourBar';
import GenderAge from '../../../components/Store/Attraction/GenderAge';
import DistrictVisitorMap from '../../../components/Store/Attraction/DistrictVisitorMap/DistrictVisitorMap';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

@connect((state) => {
  return {
    visitors: state.purchase.visitors,
    workers: state.purchase.workers,
    districtvisitors: state.districtvisitors.visitors,
    attraction_totals: state.districtvisitors.attraction_totals,
  };
})
export default class Attraction extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'districtvisitors/fetch_visitors',
      payload: {},
    });

    dispatch({
      type: 'districtvisitors/fetch_attraction_totals',
      payload: {},
    });
  }

  getGender(feature, type) {
    const { dispatch } = this.props;

    if (type === 'Visitor') {
      dispatch({
        type: 'purchase/fetch',
        payload: {
          home_district_name: feature.properties.name,
          type_visitor: 'Visitor',
        },
      });
    }

    if (type === "Worker") {
      dispatch({
        type: 'purchase/fetch',
        payload: {
          home_district_name: feature.properties.name,
          type_visitor: 'Worker',
        },
      });
    }
  }

  render() {
    const {
      visitors,
      workers,
      districtvisitors,
      attraction_totals,
      match,
    } = this.props;

    const show4Columns = match.path === '/store/attraction';

    const pageTitleInfo = {
      category: 'Overview',
      title: 'Attraction Power',
      description:
        'Know your attraction power from total pedestrians to sales and take a general perspective of target.',
      categoryIcon: 'icFunnel',
    };

    return (
      <div>
        <PageTitle
          category={pageTitleInfo.category}
          title={pageTitleInfo.title}
          description={pageTitleInfo.description}
          categoryIcon={pageTitleInfo.categoryIcon}
        />

        <SideMenu/>

        <PageHeaderLayout
          top={null}
          content={null}
          style={null}
        >


          <SummaryBar attraction_totals={attraction_totals} columns={show4Columns ? 4 : 2} />

          <Divider />
          <Row gutter={24}>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>

              <Card
                bordered
                title="Home District"
              >

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <DistrictVisitorMap type="home" districtClick={(feature => this.getGender(feature, 'Visitor'))} data={districtvisitors} />
                  </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <HourBar data={visitors} width={290} />
                  </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    {(visitors ? <GenderAge data={visitors} /> : <span />)}
                  </Col>
                </Row>

              </Card>

            </Col>


            <Col xl={12} lg={12} md={24} sm={24} xs={24}>

              <Card
                bordered
                title="Work District"
              >

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <DistrictVisitorMap type="work" districtClick={(feature => this.getGender(feature, 'Worker'))} data={districtvisitors} />
                  </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    <HourBar data={workers} width={290} />
                  </Col>
                </Row>

                <Divider />

                <Row gutter={24}>
                  <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                    {(workers ? <GenderAge data={workers} /> : <span />)}
                  </Col>
                </Row>

              </Card>

            </Col>


          </Row>
        </PageHeaderLayout>
      </div>
    );
  }
}
