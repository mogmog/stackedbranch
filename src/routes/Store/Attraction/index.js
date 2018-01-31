import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Divider, Button, Icon} from 'antd';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import Thing from '../../../components/Store/Thing';
import SummaryCard from '../../../components/Store/Attraction/SummaryCard/index';

import DistrictVisitorMap from '../../../components/Store/Attraction/DistrictVisitorMap/DistrictVisitorMap';

@connect(state => ({
  districtvisitors: state.districtvisitors.visitors,
}))
export default class Attraction extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'districtvisitors/fetch',
      payload: {'type': 'work'}
    });
  }

  render() {

    const plotOptions = {
      series: {
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b> ({point.y:,.0f})',
          softConnector: true
        },
        center: ['40%', '50%'],
        neckWidth: '30%',
        neckHeight: '25%',
        width: '80%'
      }
    };

    const funnelData = [
      ['Website visits', 15654],
      ['Downloads', 4064],
      ['Requested price list', 1987],
      ['Invoice sent', 976],
      ['Finalized', 846]
    ];



    const pageHeaderContent = (
      <div>
        <div>

        </div>
      </div>
    );

    console.log(this.props.districtvisitors);

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
      >
        <Row gutter={24}>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>
            <SummaryCard
              bordered={true}
              title="Catchment Area"
              total={(126560)}
              contentHeight={46}
            >
              <Icon type="global" style={{color : 'rgb(5, 220, 172)', 'zoom' :'640%', float : 'left'}} />
            </SummaryCard>
          </Col>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>
            <SummaryCard
              bordered={true}
              title="Nearby"
              total={(101608)}
              contentHeight={46}
            >
              <Icon type="bank" style={{color : '#1981c2', 'zoom' :'640%', float : 'left'}} />
            </SummaryCard>
          </Col>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>
            <SummaryCard
              bordered={true}
              title="In store"
              total={(68067)}
              contentHeight={46}
            >
              <Icon type="shop" style={{color : 'rgb(159, 5, 220)', 'zoom' :'640%', float : 'left'}} />
            </SummaryCard>
          </Col>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>
            <SummaryCard
              bordered={true}
              title="Sales"
              total={(11537)}
              contentHeight={46}
            >
              <Icon type="shopping-cart" style={{color : 'rgb(221, 117, 169)', 'zoom' :'640%', float : 'left'}} />
            </SummaryCard>
          </Col>

        </Row>

        <Divider/>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              title={'Attraction funnel'}
              bordered={true}>
              <Thing></Thing>
            </Card>
          </Col>
        </Row>

        <Divider/>

        <Row gutter={24}>

          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Card
              bordered={true}
              title="Home District"
              contentHeight={46}>

              <DistrictVisitorMap type={'home'} data={this.props.districtvisitors.home.list}></DistrictVisitorMap>
            </Card>
          </Col>

          <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Card
              bordered={true}
              title="Work District"
              contentHeight={46}>
              <DistrictVisitorMap type={'work'} data={this.props.districtvisitors.work.list}></DistrictVisitorMap>
            </Card>
          </Col>

        </Row>

      </PageHeaderLayout>
    );
  }
}
