import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Divider, Button, Icon, Spin} from 'antd';
import moment from 'moment';
import ReactSVG from 'react-svg';
import Transition from 'react-motion-ui-pack'

import { DatePicker } from 'antd';
const {RangePicker} = DatePicker;

import Label from './../../../components/Store/Attraction/CalendarSideBar/Label';
import PrintMenu from '../../../components/Common/Printing/PrintMenu.js';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import BattlegroundMap from '../../../components/Store/Battleground/BattlegroundMap';
import DistrictGenderCard from '../../../components/Store/Battleground/Cards/DistrictGenderCard';
import CalendarSideBar from '../../../components/Store/Attraction/CalendarSideBar';

import MyRangePicker from './MyRangePicker';

import styles from './index.less';

@connect(state => {

  return {
    profile: state.profile,
    loading : state.loading
  }
})

export default class BattleGround extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      open : false,
      selecteddistricts: []
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

   /* dispatch({
      type: 'profile/fetch',
      payload: {}
    });*/
  }

  districtClick(district) {
    this.setState({selecteddistricts: [...this.state.selecteddistricts, district]});
  }

  click() {
    let that = this;
    console.log(12);
    that.setState({open : !that.state.open});

  }

  getContainer(trigger) {
    console.log(trigger);
    return trigger;
    return document.getElementById('test');
  }

  render() {

    const { loading, profile } = this.props.profile;
    const { selecteddistricts } = this.state;
    const dateFormat = 'YYYY/MM/DD';

    const pageHeaderContent = (
      <div>

        <div style={{'float': 'right'}}>
          <CalendarSideBar />
        </div>

        <div>

          <h1>Battleground</h1>
          <small>Know the attraction power of different zones compared to your store for a given proﬁle</small>

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

        <div className={styles.battleground}>
          <Row gutter={24}>

            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <BattlegroundMap districtClick={this.districtClick.bind(this)}></BattlegroundMap>
            </Col>

            <Col xl={12} lg={12} md={24} sm={24} xs={24} style={{'padding' : 0}}>

              <Transition
                component="ul"

                enter={{
                  opacity: 1,
                }}
                leave={{
                  opacity: 0,
                }}
              >
                { selecteddistricts.map((district, i) =>
                  <li key={i}><DistrictGenderCard profile={profile} district={district}/></li>
                )
                }
              </Transition>

            </Col>
          </Row>
        </div>

      </PageHeaderLayout>

    );
  }
}
