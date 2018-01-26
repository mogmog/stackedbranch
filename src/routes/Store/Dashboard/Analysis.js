import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown, Steps } from 'antd';

import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart, FunnelChart, Radar
} from '../../../components/Common/Charts/index';
import { getTimeDistance } from '../../../utils/utils';
import { FormattedMessage } from 'react-intl';
import styles from './Analysis.less';
import Stacked from '../../../components/Common/Charts/Stacked/index';

import ComparisonLineChart from '../../../components/Common/Charts/ComparisonStory/ComparisonLineChart';

const { TabPane } = Tabs;
const { RangePicker } = DatePicker;
const { Step } = Steps;

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect(state => ({
  chart: state.chart,
  date: state.date,
}))
export default class Analysis extends Component {
  state = {
    open : 0,
    loading: true,
    salesType: 'all',
    currentTabKey: '',
    rangePickerValue: [],
  }

  componentDidMount() {

    this.props.dispatch({
      type: 'date/fetch',
    })

    this.props.dispatch({
      type: 'chart/fetch',
    }).then(() => this.setState({ loading: false }));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  handleChangeSalesType = (e) => {
    this.setState({
      salesType: e.target.value,
    });
  }

  handleTabChange = (key) => {
    this.setState({
      currentTabKey: key,
    });
  }

  handleRangePickerChange = (rangePickerValue) => {
    this.setState({
      rangePickerValue,
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  }

  render() {

    const { rangePickerValue, salesType, currentTabKey, loading } = this.state;
    const { chart, date } = this.props;

    const funnel = [
      { action: '1m', visitor: 500, site: 'Site 1' },
      { action: '2m', visitor: 400, site: 'Site 1' },
      { action: '3m', visitor: 300, site: 'Site 1' },
      { action: '4m', visitor: 200, site: 'Site 1' },
      { action: '5m', visitor: 100, site: 'Site 1' },
      { action: '1m', visitor: 550, site: 'Site 2' },
      { action: '2m', visitor: 420, site: 'Site 2' },
      { action: '3m', visitor: 280, site: 'Site 2' },
      { action: '4m', visitor: 150, site: 'Site 2' },
      { action: '5m', visitor: 80, site: 'Site 2' }
    ];

    const radarOriginData = [

      {
        name: 'London',
        ref: 3,
        koubei: 9,
        output: 6,
        contribute: 3,
        hot: 1,
      },
      {
        name: 'Cambridge',
        ref: 4,
        koubei: 1,
        output: 6,
        contribute: 5,
        hot: 7,
      },
    ];
//
    const radarData = [];
    const radarTitleMap = {
      ref: 'Food',
      koubei: 'Cooking',
      output: 'Travel',
      contribute: 'Fitness',
      hot: 'Eating Out',
    };
    radarOriginData.forEach((item) => {
      Object.keys(item).forEach((key) => {
        if (key !== 'name') {
          radarData.push({
            name: item.name,
            label: radarTitleMap[key],
            value: item[key],
          });
        }
      });
    });



    const keys = ["redDelicious", "mcintosh", "oranges", "pears"];

    const data = [
      {year: "2006", redDelicious: "112", mcintosh: "15", oranges: "9", pears: "6"},
      {year: "2007", redDelicious: "12", mcintosh: "18", oranges: "9", pears: "4"},
      {year: "2008", redDelicious: "05", mcintosh: "20", oranges: "8", pears: "2"},
      {year: "2009", redDelicious: "01", mcintosh: "15", oranges: "5", pears: "4"},
      {year: "2010", redDelicious: "02", mcintosh: "10", oranges: "4", pears: "2"},
      {year: "2011", redDelicious: "03", mcintosh: "12", oranges: "6", pears: "3"},
      {year: "2012", redDelicious: "04", mcintosh: "15", oranges: "8", pears: "1"},
      {year: "2013", redDelicious: "06", mcintosh: "11", oranges: "9", pears: "4"},
      {year: "2014", redDelicious: "10", mcintosh: "13", oranges: "9", pears: "5"},
      {year: "2015", redDelicious: "16", mcintosh: "19", oranges: "6", pears: "9"},
      {year: "2016", redDelicious: "19", mcintosh: "17", oranges: "5", pears: "7"},
    ];

    return (
      <div>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>

            <Card
              loading={loading}
              bordered={false}
              title="Time stack thing"
              style={{ marginTop: 14, height: 800 }}
            >
              <Stacked
                data={data}
                keys={keys}
                width={1200}
                height={500}
              />

            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>

            <Card
              loading={loading}
              bordered={false}
              title="A B comparison demo"
              style={{ marginTop: 14, height: 600 }}
            >
              <ComparisonLineChart
                dates={date.dates.list}
                width={1000}
                height={500}
              />

            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>

            <Card
              loading={loading}
              bordered={false}
              title="Funnel"
              style={{ marginTop: 14, height: 500 }}
            >
              <FunnelChart

                data={funnel}
                height={300}
                titleMap={{ y1: 'Y1', y2: 'Y2' }}
              />
            </Card>
          </Col>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card
              loading={loading}
              bordered={false}
              title="Radar"
              style={{ marginTop: 14, height: 500 }}
            >
              <Radar  height={400} />
            </Card>
          </Col>

        </Row>
      </div>
    );
  }
}
