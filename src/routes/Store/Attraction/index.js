import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Divider, Button, Icon} from 'antd';
import SVGInline from "react-svg-inline"
import ReactSVG from 'react-svg';

import domtoimage from 'dom-to-image';
import FileSaver from 'file-saver';


import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import SummaryCard from '../../../components/Store/Attraction/SummaryCard/index';
import ColorThing from '../../../components/Store/Attraction/SummaryCard/ColorThing';

import HourBar from '../../../components/Store/Attraction/HourBar';
import GenderAge from '../../../components/Store/Attraction/GenderAge';
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





  printDocument() {

    domtoimage.toBlob(document.getElementById('root'))
      .then(function (blob) {
        FileSaver.saveAs(blob, 'attraction_power.png');
      });
  }

  render() {


    const work_dow_data = [{value : 32.01, text : 'Friday', hour_from : 20, hour_to : 24}, {value : 31.56, text : 'Saturday', hour_from : 16, hour_to : 24}, {value : 38.43, text : 'Sunday', hour_from : 10, hour_to : 20}];

    const pageHeaderContent = (
      <div>

        <div style={{'float' : 'right'}}>
        <Icon type={'calendar'}/>
          May 13, 2016 - Jul 12, 2017 &nbsp;
          <Icon type={'down'}/>
        </div>

        <div>

          <h1>Overview: Attraction power</h1>
          <small>Know your attraction power from total pedestrians to sales and take a general perspective of target</small>

          <div style={{'zoom' : 0.5, 'float' : 'right'}} onClick={this.printDocument.bind(this)}>
            <ReactSVG path={require('../../../assets/svg/plus-blue-button.svg')} />
          </div>

        </div>

      </div>
    );

    return (
      <PageHeaderLayout
        top={null}
        content={pageHeaderContent}
      >

        <Row gutter={24}>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>

            <SummaryCard
              avatar={ <ReactSVG path={require('../../../assets/svg/ic_city_store.svg')} /> }
              bordered={false}
              title="Catchment Area (100%)"
              total={126560 + '*'}
              footer={<ColorThing color='pink'>Catchment area (ca)</ColorThing>}
            >

            </SummaryCard>
          </Col>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>
            <SummaryCard
              avatar={ <ReactSVG path={require('../../../assets/svg/ic-nearby-camera-store.svg')} /> }
              bordered={false}
              title="Nearby"
              total={(101608)}
              footer={<ColorThing color='orange'>Concern CA = 29K less</ColorThing>}
            >
            </SummaryCard>
          </Col>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>
            <SummaryCard
              avatar={ <ReactSVG path={require('../../../assets/svg/ic-shop-store.svg')} /> }
              bordered={false}
              title="In store"
              total={(68067)}
              footer={<ColorThing color='beige'>Concern CA = 62K less</ColorThing>}
            >
            </SummaryCard>
          </Col>

          <Col xl={6} lg={6} md={8} sm={8} xs={8}>
            <SummaryCard
              avatar={ <ReactSVG path={require('../../../assets/svg/ic-basket-sales-store.svg')} /> }
              bordered={false}
              title="Sales"
              total={(11537)}
              footer={<ColorThing>Concern CA = 122K Less</ColorThing>}
            >
            </SummaryCard>
          </Col>

        </Row>

        <Divider />
        <Row gutter={24}>
          <Col xl={12} lg={12} md={24} sm={24} xs={24}>

            <Card
              bordered={true}
              title="Home District">

              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <DistrictVisitorMap type={'home'} data={this.props.districtvisitors.home.list}></DistrictVisitorMap>
                </Col>
              </Row>

              <Divider/>

              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <HourBar width={290}/>
                </Col>
              </Row>

              <Divider/>

              <Row gutter={24}>
                <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                  <GenderAge/>
                </Col>
              </Row>

            </Card>

          </Col>

         {/* <Col xl={12} lg={12} md={24} sm={24} xs={24}>
            <Card
              bordered={false}
              title="Work districts"
              contentHeight={46}>
              <DistrictVisitorMap type={'work'} data={this.props.districtvisitors.work.list}></DistrictVisitorMap>
            </Card>
          </Col>*/}

        </Row>

      </PageHeaderLayout>
    );
  }
}
