import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Divider, Button, Icon, Spin} from 'antd';
import dc from 'dc';
import Transition from 'react-motion-ui-pack'

import BattlegroundMap from '../../../components/Store/Battleground/BattlegroundMap';
import DistrictCard from '../../../components/Store/Battleground/Cards/DistrictCard';

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
      selecteddistricts: []
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'profile/fetch',
      payload: {}
    });
  }

  districtClick(district) {
    this.setState({selecteddistricts: [...this.state.selecteddistricts, district]});
  }

  render() {

    const {loading, profile} = this.props.profile;
    const { selecteddistricts } = this.state;

    return (
      <Spin spinning={loading}>
        <div className={styles.battleground}>
          <Row gutter={24}>

            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
                <BattlegroundMap districtClick={this.districtClick.bind(this)}></BattlegroundMap>
            </Col>

            <Col xl={12} lg={12} md={24} sm={24} xs={24}>

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
                  <li key={i}><DistrictCard district={district}/></li>
                )
                }
              </Transition>

            </Col>
          </Row>
        </div>
      </Spin>

    );
  }
}
