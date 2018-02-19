import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Radio , Card, Divider, Button, Icon, Spin} from 'antd';
import _ from 'lodash';
import * as d3 from 'd3';
import Transition from 'react-motion-ui-pack'

import PrintMenu from '../../../components/Common/Printing/PrintMenu.js';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import BattlegroundMap from '../../../components/Store/Battleground/BattlegroundMap';
import BattlegroundSideBar from '../../../components/Store/Battleground/BattelgroundSidebar';

import CalendarSideBar from '../../../components/Store/Attraction/CalendarSideBar';
import DistrictGenderCard     from '../../../components/Store/Battleground/Cards/DistrictGenderCard';
import DistrictAgeGenderCard  from '../../../components/Store/Battleground/Cards/DistrictAgeGenderCard';
import DistrictDayGenderCard  from '../../../components/Store/Battleground/Cards/DistrictDayGenderCard';

import styles from './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const whichcards = {
  'gender'  : DistrictGenderCard,
  'age'  : DistrictAgeGenderCard,
  'day'  : DistrictDayGenderCard,
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

    this.DEFAULT_TYPE = 'gender';

    this.state = {
      sidebaropen : false,
      type : this.DEFAULT_TYPE,
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
    console.log(e.target.options.data);
    if (!_(this.state.cards).includes(e.target.options.data)) {
      this.setState({sidebaropen : true, cards: [...this.state.cards, e.target.options.data]});
    }
  }

  closeSidebar() {
    this.setState({sidebaropen : false, cards: []});
  }

  settingState(e) {
    this.setState({'type' : e.target.value});
  }

  render() {

    const { loading, profile } = this.props.profile;
    const { cards, type, sidebaropen } = this.state;

    var colors = d3.scale.ordinal().domain(["Salamanca", "Chamartin", "Chamberi" ]).range(["#29A5E9", "#7FD6D6", "#83A3AC"]);

    const pageHeaderContent = (
      <div>

        <div style={{'float': 'right'}}>
          <CalendarSideBar />
        </div>

        <div>

          <h1>Battleground  </h1>
          <small>Know the attraction power of different zones compared to your store for a given proﬁle</small>

          <div style={{'height' : '60px', 'right' : '83px', top : '142px', 'zIndex' : 999, position: 'absolute'}} >
            <PrintMenu/>
          </div>


        </div>

      </div>
    );

    const WhichCard = whichcards[type];

    return (
      <PageHeaderLayout
        top={null}
        content={pageHeaderContent}
        print={true}
        style={{'padding': '0px 0px 0px 0px'}}
      >

        <div className={styles.battleground}>
          <Row gutter={24}>

            <Col xl={24} lg={24} md={24} sm={24} xs={24}>

                <BattlegroundMap colors={colors} districtClick={this.districtClick.bind(this)}></BattlegroundMap>

                <BattlegroundSideBar open={sidebaropen}>

                  <div>

                    <RadioGroup defaultValue={this.DEFAULT_TYPE} onChange={this.settingState.bind(this)}>
                      <RadioButton value="gender">Gender</RadioButton>
                      <RadioButton value="age">Age</RadioButton>
                      <RadioButton value="day">Day</RadioButton>
                    </RadioGroup>

                    <Button onClick={this.closeSidebar.bind(this)}>close</Button>

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
                            <WhichCard colors={colors} profile={profile} district={district}/>
                          </Col>

                        </Row>
                      </li>
                    )
                    }
                  </Transition>

                </BattlegroundSideBar>

            </Col>

          </Row>
        </div>

      </PageHeaderLayout>

    );
  }
}
