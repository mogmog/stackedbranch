import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown, Steps } from 'antd';

import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart, FunnelChart, Radar
} from '../../components/Charts';
import { getTimeDistance } from '../../utils/utils';
import { FormattedMessage } from 'react-intl';
import styles from './Analysis.less';
import Stacked from '../../components/Charts/Stacked';

import ComparisonLineChart from '../../components/Charts/ComparisonStory/ComparisonLineChart';

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

    var data = [
      {"name":"Active", "totalHours":180, "leftHours":25},
      {"name":"Cancel", "totalHours":150, "leftHours":42},
      {"name":"Arrive", "totalHours":250, "leftHours":10},
      {"name":"Contract", "totalHours":300, "leftHours":120}
    ];

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
