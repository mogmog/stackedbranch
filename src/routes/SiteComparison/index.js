import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Card, Modal, Form, Tabs, Button, Switch} from 'antd';
import _ from 'lodash';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SiteTable from '../../components/Sites/SiteTable';
import HourlyCountryThing from '../../components/Sites/HourlyCountryThing';
import SiteEventsChartsHolderIndividual from '../../components/Sites/SiteEventsChartsHolderIndividual';
import SiteDateSelect from '../../components/Sites/SiteDateSelect';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class SiteComparison extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { modalVisible: true, combinedSites: true, split: false, filter: { selectedDates: [], selectedRow: [] } };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    /*dispatch the site api call. This will populate the state property of 'sites' with the response via  the store reducer in sites.js model */
    dispatch({
      type: 'site_namespace/fetch',
    });
  }

  onRowSelect(selectedRow) {
    this.setState({ filter: { ...this.state.filter, selectedRow: selectedRow } });
  }

  onDateSelect(selectedDates) {
    this.setState({ filter: { ...this.state.filter, selectedDates: selectedDates} });
  }

  doSplit() {
    this.setState({ split: true });
  }

  doUnSplit() {
    this.setState({ split: false });
  }

  toggleSitesCombined(isCombined) {
    this.setState({ combinedSites: isCombined });
  }

  handleFilterSubmit() {
    const { dispatch } = this.props;
    const { filter } = this.state;

    this.setState({ modalVisible: false });

    dispatch({
      type: 'sitecomparison_namespace/fetch',
      payload: filter,
    });

  }

  render() {

    const { sites } = this.props;
    const { modalVisible, combinedSites } = this.state;
    const { selectedRow, selectedDates } = this.state.filter;

    const modalFooter = [<Button key="submit"
                                 disabled={(selectedRow.length === 0 || selectedDates.length === 0)}
                                 type="primary"
                                 onClick={this.handleFilterSubmit.bind(this)}
                          >
                          Submit
                        </Button>];

    const data_src = {
      'list': [
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 13
        },
        {
          'count': 2,
          'country': 'Argentina Republic',
          'hour': 14
        },
        {
          'count': 1,
          'country': 'Argentina Republic',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Argentina Republic',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Australia',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Australia',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Australia',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Australia',
          'hour': 3
        },
        {
          'count': 1,
          'country': 'Australia',
          'hour': 4
        },
        {
          'count': 1,
          'country': 'Australia',
          'hour': 5
        },
        {
          'count': 2,
          'country': 'Australia',
          'hour': 6
        },
        {
          'count': 1,
          'country': 'Australia',
          'hour': 7
        },
        {
          'count': 1,
          'country': 'Australia',
          'hour': 8
        },
        {
          'count': 3,
          'country': 'Australia',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Australia',
          'hour': 10
        },
        {
          'count': 1,
          'country': 'Australia',
          'hour': 11
        },
        {
          'count': 1,
          'country': 'Australia',
          'hour': 12
        },
        {
          'count': 1,
          'country': 'Australia',
          'hour': 13
        },
        {
          'count': 3,
          'country': 'Australia',
          'hour': 14
        },
        {
          'count': 2,
          'country': 'Australia',
          'hour': 15
        },
        {
          'count': 2,
          'country': 'Australia',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Australia',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Australia',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Australia',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Australia',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Australia',
          'hour': 21
        },
        {
          'count': 1,
          'country': 'Australia',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Australia',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 11
        },
        {
          'count': 1,
          'country': 'Austria',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Austria',
          'hour': 22
        },
        {
          'count': 1,
          'country': 'Austria',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 8
        },
        {
          'count': 1,
          'country': 'Belgium',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 12
        },
        {
          'count': 2,
          'country': 'Belgium',
          'hour': 13
        },
        {
          'count': 1,
          'country': 'Belgium',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 15
        },
        {
          'count': 2,
          'country': 'Belgium',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 18
        },
        {
          'count': 1,
          'country': 'Belgium',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Belgium',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 17
        },
        {
          'count': 1,
          'country': 'Bulgaria',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Bulgaria',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 7
        },
        {
          'count': 4,
          'country': 'Canada',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 12
        },
        {
          'count': 1,
          'country': 'Canada',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 14
        },
        {
          'count': 1,
          'country': 'Canada',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 17
        },
        {
          'count': 1,
          'country': 'Canada',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Canada',
          'hour': 22
        },
        {
          'count': 1,
          'country': 'Canada',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 7
        },
        {
          'count': 1,
          'country': 'China',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 19
        },
        {
          'count': 1,
          'country': 'China',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'China',
          'hour': 23
        },
        {
          'count': 1,
          'country': 'Czech Rep.',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Czech Rep.',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Czech Rep.',
          'hour': 2
        },
        {
          'count': 1,
          'country': 'Czech Rep.',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Czech Rep.',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Czech Rep.',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Czech Rep.',
          'hour': 6
        },
        {
          'count': 1,
          'country': 'Czech Rep.',
          'hour': 7
        },
        {
          'count': 1,
          'country': 'Czech Rep.',
          'hour': 8
        },
        {
          'count': 2,
          'country': 'Czech Rep.',
          'hour': 9
        },
        {
          'count': 9,
          'country': 'Czech Rep.',
          'hour': 10
        },
        {
          'count': 7,
          'country': 'Czech Rep.',
          'hour': 11
        },
        {
          'count': 4,
          'country': 'Czech Rep.',
          'hour': 12
        },
        {
          'count': 1,
          'country': 'Czech Rep.',
          'hour': 13
        },
        {
          'count': 7,
          'country': 'Czech Rep.',
          'hour': 14
        },
        {
          'count': 7,
          'country': 'Czech Rep.',
          'hour': 15
        },
        {
          'count': 8,
          'country': 'Czech Rep.',
          'hour': 16
        },
        {
          'count': 11,
          'country': 'Czech Rep.',
          'hour': 17
        },
        {
          'count': 14,
          'country': 'Czech Rep.',
          'hour': 18
        },
        {
          'count': 7,
          'country': 'Czech Rep.',
          'hour': 19
        },
        {
          'count': 2,
          'country': 'Czech Rep.',
          'hour': 20
        },
        {
          'count': 3,
          'country': 'Czech Rep.',
          'hour': 21
        },
        {
          'count': 2,
          'country': 'Czech Rep.',
          'hour': 22
        },
        {
          'count': 2,
          'country': 'Czech Rep.',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 7
        },
        {
          'count': 1,
          'country': 'Denmark',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 11
        },
        {
          'count': 5,
          'country': 'Denmark',
          'hour': 12
        },
        {
          'count': 1,
          'country': 'Denmark',
          'hour': 13
        },
        {
          'count': 4,
          'country': 'Denmark',
          'hour': 14
        },
        {
          'count': 1,
          'country': 'Denmark',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 17
        },
        {
          'count': 4,
          'country': 'Denmark',
          'hour': 18
        },
        {
          'count': 1,
          'country': 'Denmark',
          'hour': 19
        },
        {
          'count': 2,
          'country': 'Denmark',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 21
        },
        {
          'count': 1,
          'country': 'Denmark',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Denmark',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 11
        },
        {
          'count': 1,
          'country': 'Estonia',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Estonia',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 14
        },
        {
          'count': 1,
          'country': 'Finland',
          'hour': 15
        },
        {
          'count': 1,
          'country': 'Finland',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 19
        },
        {
          'count': 1,
          'country': 'Finland',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 21
        },
        {
          'count': 1,
          'country': 'Finland',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Finland',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 8
        },
        {
          'count': 2,
          'country': 'France',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 10
        },
        {
          'count': 2,
          'country': 'France',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 12
        },
        {
          'count': 2,
          'country': 'France',
          'hour': 13
        },
        {
          'count': 1,
          'country': 'France',
          'hour': 14
        },
        {
          'count': 3,
          'country': 'France',
          'hour': 15
        },
        {
          'count': 1,
          'country': 'France',
          'hour': 16
        },
        {
          'count': 3,
          'country': 'France',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 19
        },
        {
          'count': 1,
          'country': 'France',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'France',
          'hour': 21
        },
        {
          'count': 1,
          'country': 'France',
          'hour': 22
        },
        {
          'count': 1,
          'country': 'France',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 20
        },
        {
          'count': 1,
          'country': 'Ghana',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Ghana',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 0
        },
        {
          'count': 1,
          'country': 'Greece',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Greece',
          'hour': 22
        },
        {
          'count': 1,
          'country': 'Greece',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 12
        },
        {
          'count': 1,
          'country': 'Hongkong China',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 20
        },
        {
          'count': 1,
          'country': 'Hongkong China',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Hongkong China',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 12
        },
        {
          'count': 1,
          'country': 'Hungary',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 15
        },
        {
          'count': 1,
          'country': 'Hungary',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Hungary',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 7
        },
        {
          'count': 1,
          'country': 'Iceland',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 17
        },
        {
          'count': 1,
          'country': 'Iceland',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 19
        },
        {
          'count': 1,
          'country': 'Iceland',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Iceland',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 7
        },
        {
          'count': 1,
          'country': 'India',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 13
        },
        {
          'count': 2,
          'country': 'India',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 15
        },
        {
          'count': 4,
          'country': 'India',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 17
        },
        {
          'count': 2,
          'country': 'India',
          'hour': 18
        },
        {
          'count': 1,
          'country': 'India',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'India',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 0
        },
        {
          'count': 1,
          'country': 'Ireland',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 6
        },
        {
          'count': 3,
          'country': 'Ireland',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 11
        },
        {
          'count': 2,
          'country': 'Ireland',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 16
        },
        {
          'count': 2,
          'country': 'Ireland',
          'hour': 17
        },
        {
          'count': 1,
          'country': 'Ireland',
          'hour': 18
        },
        {
          'count': 1,
          'country': 'Ireland',
          'hour': 19
        },
        {
          'count': 1,
          'country': 'Ireland',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Ireland',
          'hour': 21
        },
        {
          'count': 1,
          'country': 'Ireland',
          'hour': 22
        },
        {
          'count': 1,
          'country': 'Ireland',
          'hour': 23
        },
        {
          'count': 1,
          'country': 'Italy',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 8
        },
        {
          'count': 1,
          'country': 'Italy',
          'hour': 9
        },
        {
          'count': 1,
          'country': 'Italy',
          'hour': 10
        },
        {
          'count': 2,
          'country': 'Italy',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 13
        },
        {
          'count': 4,
          'country': 'Italy',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 15
        },
        {
          'count': 2,
          'country': 'Italy',
          'hour': 16
        },
        {
          'count': 4,
          'country': 'Italy',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 18
        },
        {
          'count': 2,
          'country': 'Italy',
          'hour': 19
        },
        {
          'count': 4,
          'country': 'Italy',
          'hour': 20
        },
        {
          'count': 2,
          'country': 'Italy',
          'hour': 21
        },
        {
          'count': 1,
          'country': 'Italy',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Italy',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 14
        },
        {
          'count': 2,
          'country': 'Japan',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 16
        },
        {
          'count': 1,
          'country': 'Japan',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 19
        },
        {
          'count': 2,
          'country': 'Japan',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 21
        },
        {
          'count': 2,
          'country': 'Japan',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Japan',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 10
        },
        {
          'count': 1,
          'country': 'Kuwait',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Kuwait',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 12
        },
        {
          'count': 1,
          'country': 'Latvia',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Latvia',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 19
        },
        {
          'count': 2,
          'country': 'Luxembourg',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Luxembourg',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 7
        },
        {
          'count': 1,
          'country': 'Malaysia',
          'hour': 8
        },
        {
          'count': 1,
          'country': 'Malaysia',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 10
        },
        {
          'count': 1,
          'country': 'Malaysia',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Malaysia',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 13
        },
        {
          'count': 1,
          'country': 'Malta',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 20
        },
        {
          'count': 1,
          'country': 'Malta',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Malta',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Netherlands',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Netherlands',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Netherlands',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Netherlands',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Netherlands',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Netherlands',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Netherlands',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Netherlands',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Netherlands',
          'hour': 8
        },
        {
          'count': 4,
          'country': 'Netherlands',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Netherlands',
          'hour': 10
        },
        {
          'count': 3,
          'country': 'Netherlands',
          'hour': 11
        },
        {
          'count': 1,
          'country': 'Netherlands',
          'hour': 12
        },
        {
          'count': 3,
          'country': 'Netherlands',
          'hour': 13
        },
        {
          'count': 3,
          'country': 'Netherlands',
          'hour': 14
        },
        {
          'count': 1,
          'country': 'Netherlands',
          'hour': 15
        },
        {
          'count': 4,
          'country': 'Netherlands',
          'hour': 16
        },
        {
          'count': 12,
          'country': 'Netherlands',
          'hour': 17
        },
        {
          'count': 3,
          'country': 'Netherlands',
          'hour': 18
        },
        {
          'count': 2,
          'country': 'Netherlands',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Netherlands',
          'hour': 20
        },
        {
          'count': 3,
          'country': 'Netherlands',
          'hour': 21
        },
        {
          'count': 2,
          'country': 'Netherlands',
          'hour': 22
        },
        {
          'count': 1,
          'country': 'Netherlands',
          'hour': 23
        },
        {
          'count': 1,
          'country': 'Norway',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 6
        },
        {
          'count': 2,
          'country': 'Norway',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 10
        },
        {
          'count': 2,
          'country': 'Norway',
          'hour': 11
        },
        {
          'count': 1,
          'country': 'Norway',
          'hour': 12
        },
        {
          'count': 2,
          'country': 'Norway',
          'hour': 13
        },
        {
          'count': 1,
          'country': 'Norway',
          'hour': 14
        },
        {
          'count': 3,
          'country': 'Norway',
          'hour': 15
        },
        {
          'count': 3,
          'country': 'Norway',
          'hour': 16
        },
        {
          'count': 1,
          'country': 'Norway',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 18
        },
        {
          'count': 3,
          'country': 'Norway',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 20
        },
        {
          'count': 1,
          'country': 'Norway',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Norway',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 15
        },
        {
          'count': 1,
          'country': 'Philippines',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Philippines',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 3
        },
        {
          'count': 3,
          'country': 'Poland',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 9
        },
        {
          'count': 3,
          'country': 'Poland',
          'hour': 10
        },
        {
          'count': 1,
          'country': 'Poland',
          'hour': 11
        },
        {
          'count': 2,
          'country': 'Poland',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 16
        },
        {
          'count': 3,
          'country': 'Poland',
          'hour': 17
        },
        {
          'count': 4,
          'country': 'Poland',
          'hour': 18
        },
        {
          'count': 1,
          'country': 'Poland',
          'hour': 19
        },
        {
          'count': 2,
          'country': 'Poland',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 21
        },
        {
          'count': 1,
          'country': 'Poland',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Poland',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 8
        },
        {
          'count': 1,
          'country': 'Portugal',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 12
        },
        {
          'count': 1,
          'country': 'Portugal',
          'hour': 13
        },
        {
          'count': 1,
          'country': 'Portugal',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 16
        },
        {
          'count': 1,
          'country': 'Portugal',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 19
        },
        {
          'count': 1,
          'country': 'Portugal',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Portugal',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 18
        },
        {
          'count': 1,
          'country': 'Romania',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 21
        },
        {
          'count': 1,
          'country': 'Romania',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Romania',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 17
        },
        {
          'count': 1,
          'country': 'Russian Federation',
          'hour': 18
        },
        {
          'count': 1,
          'country': 'Russian Federation',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Russian Federation',
          'hour': 23
        },
        {
          'count': 1,
          'country': 'Saudi Arabia',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 15
        },
        {
          'count': 1,
          'country': 'Saudi Arabia',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 17
        },
        {
          'count': 1,
          'country': 'Saudi Arabia',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Saudi Arabia',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 5
        },
        {
          'count': 1,
          'country': 'Singapore',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 10
        },
        {
          'count': 1,
          'country': 'Singapore',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 14
        },
        {
          'count': 1,
          'country': 'Singapore',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 16
        },
        {
          'count': 1,
          'country': 'Singapore',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 19
        },
        {
          'count': 1,
          'country': 'Singapore',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Singapore',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 13
        },
        {
          'count': 1,
          'country': 'South Africa',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'South Africa',
          'hour': 23
        },
        {
          'count': 10,
          'country': 'Spain',
          'hour': 0
        },
        {
          'count': 7,
          'country': 'Spain',
          'hour': 1
        },
        {
          'count': 2,
          'country': 'Spain',
          'hour': 2
        },
        {
          'count': 1,
          'country': 'Spain',
          'hour': 3
        },
        {
          'count': 1,
          'country': 'Spain',
          'hour': 4
        },
        {
          'count': 1,
          'country': 'Spain',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Spain',
          'hour': 6
        },
        {
          'count': 3,
          'country': 'Spain',
          'hour': 7
        },
        {
          'count': 10,
          'country': 'Spain',
          'hour': 8
        },
        {
          'count': 39,
          'country': 'Spain',
          'hour': 9
        },
        {
          'count': 56,
          'country': 'Spain',
          'hour': 10
        },
        {
          'count': 72,
          'country': 'Spain',
          'hour': 11
        },
        {
          'count': 115,
          'country': 'Spain',
          'hour': 12
        },
        {
          'count': 121,
          'country': 'Spain',
          'hour': 13
        },
        {
          'count': 135,
          'country': 'Spain',
          'hour': 14
        },
        {
          'count': 182,
          'country': 'Spain',
          'hour': 15
        },
        {
          'count': 154,
          'country': 'Spain',
          'hour': 16
        },
        {
          'count': 130,
          'country': 'Spain',
          'hour': 17
        },
        {
          'count': 149,
          'country': 'Spain',
          'hour': 18
        },
        {
          'count': 187,
          'country': 'Spain',
          'hour': 19
        },
        {
          'count': 88,
          'country': 'Spain',
          'hour': 20
        },
        {
          'count': 67,
          'country': 'Spain',
          'hour': 21
        },
        {
          'count': 64,
          'country': 'Spain',
          'hour': 22
        },
        {
          'count': 28,
          'country': 'Spain',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Sweden',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Sweden',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Sweden',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Sweden',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Sweden',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Sweden',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Sweden',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Sweden',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Sweden',
          'hour': 8
        },
        {
          'count': 1,
          'country': 'Sweden',
          'hour': 9
        },
        {
          'count': 1,
          'country': 'Sweden',
          'hour': 10
        },
        {
          'count': 1,
          'country': 'Sweden',
          'hour': 11
        },
        {
          'count': 1,
          'country': 'Sweden',
          'hour': 12
        },
        {
          'count': 2,
          'country': 'Sweden',
          'hour': 13
        },
        {
          'count': 2,
          'country': 'Sweden',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Sweden',
          'hour': 15
        },
        {
          'count': 2,
          'country': 'Sweden',
          'hour': 16
        },
        {
          'count': 1,
          'country': 'Sweden',
          'hour': 17
        },
        {
          'count': 1,
          'country': 'Sweden',
          'hour': 18
        },
        {
          'count': 1,
          'country': 'Sweden',
          'hour': 19
        },
        {
          'count': 1,
          'country': 'Sweden',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Sweden',
          'hour': 21
        },
        {
          'count': 1,
          'country': 'Sweden',
          'hour': 22
        },
        {
          'count': 1,
          'country': 'Sweden',
          'hour': 23
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 0
        },
        {
          'count': 3,
          'country': 'Switzerland',
          'hour': 1
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 2
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Switzerland',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Switzerland',
          'hour': 5
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Switzerland',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Switzerland',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Switzerland',
          'hour': 9
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 10
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Switzerland',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Switzerland',
          'hour': 13
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 14
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 15
        },
        {
          'count': 3,
          'country': 'Switzerland',
          'hour': 16
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Switzerland',
          'hour': 18
        },
        {
          'count': 2,
          'country': 'Switzerland',
          'hour': 19
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 20
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 21
        },
        {
          'count': 1,
          'country': 'Switzerland',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Switzerland',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 8
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 10
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 14
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 15
        },
        {
          'count': 1,
          'country': 'Tunisia',
          'hour': 16
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 18
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Tunisia',
          'hour': 23
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 0
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 4
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 8
        },
        {
          'count': 1,
          'country': 'Turkey',
          'hour': 9
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 10
        },
        {
          'count': 1,
          'country': 'Turkey',
          'hour': 11
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 12
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 13
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 14
        },
        {
          'count': 1,
          'country': 'Turkey',
          'hour': 15
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 16
        },
        {
          'count': 2,
          'country': 'Turkey',
          'hour': 17
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 18
        },
        {
          'count': 1,
          'country': 'Turkey',
          'hour': 19
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 20
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 21
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'Turkey',
          'hour': 23
        },
        {
          'count': 1231,
          'country': 'United Kingdom',
          'hour': 0
        },
        {
          'count': 765,
          'country': 'United Kingdom',
          'hour': 1
        },
        {
          'count': 603,
          'country': 'United Kingdom',
          'hour': 2
        },
        {
          'count': 561,
          'country': 'United Kingdom',
          'hour': 3
        },
        {
          'count': 498,
          'country': 'United Kingdom',
          'hour': 4
        },
        {
          'count': 521,
          'country': 'United Kingdom',
          'hour': 5
        },
        {
          'count': 784,
          'country': 'United Kingdom',
          'hour': 6
        },
        {
          'count': 1593,
          'country': 'United Kingdom',
          'hour': 7
        },
        {
          'count': 2959,
          'country': 'United Kingdom',
          'hour': 8
        },
        {
          'count': 4009,
          'country': 'United Kingdom',
          'hour': 9
        },
        {
          'count': 4096,
          'country': 'United Kingdom',
          'hour': 10
        },
        {
          'count': 5192,
          'country': 'United Kingdom',
          'hour': 11
        },
        {
          'count': 7048,
          'country': 'United Kingdom',
          'hour': 12
        },
        {
          'count': 8722,
          'country': 'United Kingdom',
          'hour': 13
        },
        {
          'count': 8136,
          'country': 'United Kingdom',
          'hour': 14
        },
        {
          'count': 7988,
          'country': 'United Kingdom',
          'hour': 15
        },
        {
          'count': 7738,
          'country': 'United Kingdom',
          'hour': 16
        },
        {
          'count': 8045,
          'country': 'United Kingdom',
          'hour': 17
        },
        {
          'count': 8342,
          'country': 'United Kingdom',
          'hour': 18
        },
        {
          'count': 6288,
          'country': 'United Kingdom',
          'hour': 19
        },
        {
          'count': 3905,
          'country': 'United Kingdom',
          'hour': 20
        },
        {
          'count': 3248,
          'country': 'United Kingdom',
          'hour': 21
        },
        {
          'count': 3467,
          'country': 'United Kingdom',
          'hour': 22
        },
        {
          'count': 1888,
          'country': 'United Kingdom',
          'hour': 23
        },
        {
          'count': 2,
          'country': 'United States',
          'hour': 0
        },
        {
          'count': 1,
          'country': 'United States',
          'hour': 1
        },
        {
          'count': 0,
          'country': 'United States',
          'hour': 2
        },
        {
          'count': 0,
          'country': 'United States',
          'hour': 3
        },
        {
          'count': 0,
          'country': 'United States',
          'hour': 4
        },
        {
          'count': 2,
          'country': 'United States',
          'hour': 5
        },
        {
          'count': 0,
          'country': 'United States',
          'hour': 6
        },
        {
          'count': 0,
          'country': 'United States',
          'hour': 7
        },
        {
          'count': 0,
          'country': 'United States',
          'hour': 8
        },
        {
          'count': 32,
          'country': 'United States',
          'hour': 9
        },
        {
          'count': 7,
          'country': 'United States',
          'hour': 10
        },
        {
          'count': 3,
          'country': 'United States',
          'hour': 11
        },
        {
          'count': 4,
          'country': 'United States',
          'hour': 12
        },
        {
          'count': 17,
          'country': 'United States',
          'hour': 13
        },
        {
          'count': 14,
          'country': 'United States',
          'hour': 14
        },
        {
          'count': 11,
          'country': 'United States',
          'hour': 15
        },
        {
          'count': 18,
          'country': 'United States',
          'hour': 16
        },
        {
          'count': 12,
          'country': 'United States',
          'hour': 17
        },
        {
          'count': 16,
          'country': 'United States',
          'hour': 18
        },
        {
          'count': 17,
          'country': 'United States',
          'hour': 19
        },
        {
          'count': 5,
          'country': 'United States',
          'hour': 20
        },
        {
          'count': 8,
          'country': 'United States',
          'hour': 21
        },
        {
          'count': 10,
          'country': 'United States',
          'hour': 22
        },
        {
          'count': 0,
          'country': 'United States',
          'hour': 23
        }
      ]
    };

    const data = _.groupBy(data_src.list, 'country');

    return (

      <span>
        <Modal
          title="Define your filters"
          visible={modalVisible}
          footer={modalFooter}
        >

          <Tabs defaultActiveKey="1">
            <TabPane tab="Select Sites" key="1">
              <SiteTable onRowSelect={this.onRowSelect.bind(this)} data={sites} />
            </TabPane>
            <TabPane tab="Select Date Range" key="2">
              <SiteDateSelect onDateSelect={this.onDateSelect.bind(this)} />
            </TabPane>
          </Tabs>

        </Modal>

        <PageHeaderLayout>
          <Card bordered>
            <div>

              <Switch
                checkedChildren="Separate Sites"
                unCheckedChildren="Combine Sites"
                defaultChecked={combinedSites}
                onChange={this.toggleSitesCombined.bind(this)}
              />
              <div>
                <SiteEventsChartsHolderIndividual site_ids={selectedRow.map(x => x.id)} />
              </div>
            </div>
          </Card>

          <Card bordered >

            <Button onClick={this.doSplit.bind(this)}> Down </Button>
            <Button onClick={this.doUnSplit.bind(this)}> Up</Button>


            {/*<svg width={'100%'} height={800}>*/}

              {/*{*/}
                {/*Object.keys(data).map((e, i) => {*/}
                    {/*if (e !== 'United Kingdom') {*/}
                      {/*return <HourlyCountryThing key={i} split={split} index={i} data={data[e]} />*/}
                    {/*}*/}
                    {/*return <span>UK</span>;*/}
                {/*}*/}
                {/*)*/}
              {/*}*/}

            {/*</svg>)*/}

          </Card>

        </PageHeaderLayout>
      </span>
    );
  }
}

/*an inlnie version of 'State to props' that pushes the sites object from the state of the model (dynmically applied by dynamicWrapper in nav,js)
 into the props of the SiteComparision component so that sites is available to the render() method*/
export default connect((state) => {
  return {
    sites: state.site_namespace.sites
  }
})(SiteComparison);
