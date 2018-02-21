import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Radio , Card, Divider, Button, Icon, Spin} from 'antd';
import moment from 'moment';

import PrintMenu from '../../../components/Common/Printing/PrintMenu.js';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';

import CalendarSideBar from '../../../components/Store/Attraction/CalendarSideBar';

import BubbleMock from '../../../components/Store/Rent/BubbleMock';

import styles from './index.less';


@connect(state => {

  return {
    purchaseaffluence: state.purchaseaffluence,
    loading : state.loading
  }
})

export default class CrossFilter extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      type : 'Visitor'
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'purchaseaffluence/fetch',
      payload: {'type' : 'Visitor'}
    });
  }

  changeType(type) {

    this.setState({'type' : type});

    const {dispatch} = this.props;

    dispatch({
      type: 'purchaseaffluence/fetch',
      payload: {'type' : type}
    });
  }

  render() {

    const { loading, purchaseaffluence } = this.props.purchaseaffluence;
    const { type } = this.state;
    const data = purchaseaffluence;

    console.log(data);

    const priority_order = ["Alto", "Medio-Alto", "Medio", "Bajo"];

    const groupedByGenderAgeRent = d3.nest()
      .key(d => d.gender)
      .sortKeys(d3.descending)
      .key(d => d.age)
      .sortKeys(d3.ascending)
      .key(d => d.rent)
      .sortKeys(function(a,b) { return priority_order.indexOf(a) - priority_order.indexOf(b); })
      .rollup(d => d[0].count)
      .entries(data.gender_age_rent);

    const largest = d3.max(data.gender_age_rent, x=> x.count);

    const groupedByGender = d3.nest()
      .key(d => d.gender)
      .sortKeys(d3.descending)
      .rollup(d => d[0].percent)
      .entries(data.gender);

    const pageHeaderContent = (
      <div>

        <div style={{'float': 'right'}}>
          <CalendarSideBar range={[moment('2018/03/01'), moment('2018/03/07')]}/>
        </div>

        <div>

          <h1>Cross filter  </h1>
          <small>blah blah</small>

          <div style={{'height' : '60px', 'right' : '83px', top : '142px', 'zIndex' : 999, position: 'absolute'}} >
            <PrintMenu/>
          </div>


        </div>

      </div>
    );

    return (
      <PageHeaderLayout
        top={null}
        content={pageHeaderContent}
        print={true}
        style={{'padding': '0px 0px 0px 0px'}}
      >

              <Button onClick={ ((e) => this.changeType('Resident')).bind(this) }>Resident</Button>
              <Button onClick={ ((e) => this.changeType('Visitor')).bind(this) }>Visitor</Button>
              <Button onClick={ ((e) => this.changeType('Worker')).bind(this) }>Worker</Button>

              <Card>

                <Row gutter={24}>

                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    {
                      groupedByGenderAgeRent.length ? <BubbleMock type={type} largest={largest} gender="m" data={groupedByGenderAgeRent[0]} headline={groupedByGender[0].values} width={400} height={350} ></BubbleMock> : <span>no data</span>
                    }

                  </Col>

                  <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                    {
                      groupedByGenderAgeRent.length ? <BubbleMock type={type} largest={largest} gender="f" data={groupedByGenderAgeRent[1]} headline={groupedByGender[1].values} width={400} height={350} ></BubbleMock> : <span>no data</span>
                    }
                  </Col>
                </Row>

              </Card>

      </PageHeaderLayout>

    );
  }
}
