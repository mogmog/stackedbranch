import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Tabs, Select  } from 'antd';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

import TravelOriginDestinationMap from '../../../components/Travel/OriginDestination/TravelOriginDestinationMap';
import RegionChooserMap from '../../../components/Travel/OriginDestination/RegionChooserMap';

@connect(state => ({
  origindestination: state.origindestination,
}))
export default class OriginDestination extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      mapSetup : {
        zoom : 6,
        center : [1, 52]
      }
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'origindestination/fetch',
    });
  }

  updateMap(mapSetup) {
    this.setState({mapSetup});
  }

  render() {
    return (

      <div>

        <Tabs tabPosition={'1'}>
          <TabPane tab="Select your area" key="1"><RegionChooserMap data={this.props.origindestination} mapSetup={this.state.mapSetup} updateMap={this.updateMap.bind(this)}/> </TabPane>
          <TabPane tab="View OD Matrix" key="2"><TravelOriginDestinationMap mapSetup={this.state.mapSetup} updateMap={this.updateMap.bind(this)} /></TabPane>
        </Tabs>
      </div>


    );
  }
}
