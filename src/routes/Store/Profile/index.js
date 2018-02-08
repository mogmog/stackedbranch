import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Divider, Button, Icon, Spin} from 'antd';
import dc from 'dc';

import ProfileHolder from '../../../components/Store/Profile/Profile';

@connect(state => {

  return {
    profile: state.profile,
    loading : state.loading
  }
})

export default class Profile extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'profile/fetch',
      payload: {}
    });

    dc.redrawAll();

  }

  render() {

    const {loading, profile} = this.props.profile;
    console.log(profile);

    const pageHeaderContent = (
      <div>

        <div>

          <h1>Profile</h1>
          <small>Something</small>
        </div>

      </div>
    );

    return (
      <Spin spinning={loading}>
        <ProfileHolder profile={profile}/>
        {profile.data.length}
      </Spin>

    );
  }
}
