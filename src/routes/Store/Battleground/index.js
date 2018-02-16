import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Radio , Card, Divider, Button, Icon, Spin} from 'antd';
import _ from 'lodash';
import * as d3 from 'd3';
import Transition from 'react-motion-ui-pack'

import PrintMenu from '../../../components/Common/Printing/PrintMenu.js';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import BattlegroundMap from '../../../components/Store/Battleground/BattlegroundMap';
import DistrictGenderCard from '../../../components/Store/Battleground/Cards/DistrictGenderCard';
import CalendarSideBar from '../../../components/Store/Attraction/CalendarSideBar';

import styles from './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const whichcards = {
  'gender'  : DistrictGenderCard,
  'age'     : ()=> (<span>age</span>)
}

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
      type : 'gender',
      cards: []
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'profile/fetch',
      payload: {}
    });
  }

  districtClick(e) {
    console.log(e.target.options.data.properties.name);
    if (!_(this.state.cards).includes(e.target.options.data)) {
      this.setState({cards: [...this.state.cards, e.target.options.data]});
    }
  }

  settingState(e) {
    this.setState({'type' : e.target.value, cards : []});
  }

  render() {

    const { loading, profile } = this.props.profile;
    const { cards, type } = this.state;

    var colors = d3.scale.ordinal().domain(["Salamanca", "Chamartin", "Chamberi" ]).range(["#29A5E9", "#7FD6D6", "#83A3AC"]);

    const pageHeaderContent = (
      <div>

        <div style={{'float': 'right'}}>
          <CalendarSideBar />
        </div>

        <div>

          <h1>Battleground {type} </h1>
          <small>Know the attraction power of different zones compared to your store for a given proﬁle</small>

          {/*<div style={{'height' : '60px', 'right' : '83px', top : '142px', 'zIndex' : 999, position: 'absolute'}} >
            <PrintMenu/>
          </div>*/}


        </div>

      </div>
    );

    const Element = whichcards[type];

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
                <BattlegroundMap colors={colors} districtClick={this.districtClick.bind(this)}></BattlegroundMap>
            </Col>

            <Col xl={12} lg={12} md={24} sm={24} xs={24} style={{'padding' : 0}}>

              <div>

                <RadioGroup defaultValue="gender" onChange={this.settingState.bind(this)}>
                  <RadioButton value="gender">Gender</RadioButton>
                  <RadioButton value="age">Age</RadioButton>
                </RadioGroup>

              </div>

              <Transition
                component="ul"

                enter={{
                  opacity: 1,
                }}
                leave={{
                  opacity: 0,
                }}
              >
                { cards.map((district, i) =>
                  <li key={i}>
                    <Row gutter={24}>
                      <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                         <Element colors={colors} profile={profile} district={district}/>
                      </Col>

                    </Row>
                  </li>
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
