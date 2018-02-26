import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Radio, Card, Divider, Button, Icon, Spin } from 'antd';
import _ from 'lodash';
import * as d3 from 'd3';
import Transition from 'react-motion-ui-pack';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import SideMenu from '../../../components/Common/SideMenu';
import PageTitle from '../../../components/Common/PageTitle';
import BattlegroundMap from '../../../components/Store/Battleground/BattlegroundMap';
import BattlegroundSideBar from '../../../components/Store/Battleground/BattelgroundSidebar';

import DistrictGenderCard     from '../../../components/Store/Battleground/Cards/DistrictGenderCard';
import DistrictAgeGenderCard  from '../../../components/Store/Battleground/Cards/DistrictAgeGenderCard';
import DistrictDayGenderCard  from '../../../components/Store/Battleground/Cards/DistrictDayGenderCard';

import styles from './index.less';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const whichcards = {
  gender: DistrictGenderCard,
  age: DistrictAgeGenderCard,
  day: DistrictDayGenderCard,
};

@connect((state) => {
  return {
    profile: state.profile,
    loading: state.loading,
  };
})

export default class BattleGround extends PureComponent {
  constructor(props) {
    super(props);

    this.DEFAULT_TYPE = 'gender';

    this.state = {
      sidebaropen: false,
      type: this.DEFAULT_TYPE,
      cards: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'profile/fetch',
      payload: {},
    });
  }

  districtClick(e) {
    const data = e.target.options.data;

    if (!_(this.state.cards).includes(data)) {
      this.setState({ sidebaropen: true, cards: [...this.state.cards, data] });
    }
  }

  closeSidebar() {
    this.setState({ sidebaropen: false, cards: [] });
  }

  settingState(e) {
    this.setState({ type: e.target.value });
  }

  render() {
    const { loading, profile } = this.props.profile;
    const { cards, type, sidebaropen } = this.state;

    const colors = d3.scale.ordinal().domain(['Salamanca', 'Chamartin', 'Chamberi']).range(['#29A5E9', '#7FD6D6', '#83A3AC']);


    const pageTitleInfo = {
      category: 'Battleground',
      title: 'Comparative Zones',
      description:
        'Know the attraction power of different zones compared to your store for a given profile.',
      categoryIcon: 'icBattleground',
    };

    const WhichCard = whichcards[type];

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

          <Row gutter={24} className={styles.battleground}>

            <Col xl={24} lg={24} md={24} sm={24} xs={24}>

              <BattlegroundMap colors={colors} districtClick={this.districtClick.bind(this)} />

              <BattlegroundSideBar open={sidebaropen}>

                <Row gutter={24}>
                  <Col>
                    <a onClick={this.closeSidebar.bind(this)}><Button>x</Button></a>
                  </Col>
                </Row>

                <Row>
                  <Col span={24} >
                    <RadioGroup style={{ float: 'right', marginRight: '0.8em' }} defaultValue={this.DEFAULT_TYPE} onChange={this.settingState.bind(this)}>
                      <RadioButton value="gender">Gender</RadioButton>
                      <RadioButton value="age">Age</RadioButton>
                      <RadioButton value="day">Day</RadioButton>
                    </RadioGroup>
                  </Col>
                </Row>

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
                      (<li key={i}>
                        <Row gutter={24}>
                          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                            <WhichCard colors={colors} profile={profile} district={district} />
                          </Col>

                        </Row>
                       </li>)
                    )
                    }
                </Transition>

              </BattlegroundSideBar>

            </Col>

          </Row>


        </PageHeaderLayout>
      </div>
    );
  }
}
