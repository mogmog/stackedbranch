import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown, Steps } from 'antd';
import numeral from 'numeral';

import {Motion, spring} from 'react-motion';

import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart, FunnelChart, Radar
} from '../../components/Charts';
import { getTimeDistance } from '../../utils/utils';
import { FormattedMessage } from 'react-intl';
import styles from './Analysis.less';
import Stacked from '../../components/Charts/Stacked';

import LineChart from '../../components/Charts/ComparisonStory/LineChart';

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

  selectDate = (type) => {
    this.setState({
      rangePickerValue: getTimeDistance(type),
    });

    this.props.dispatch({
      type: 'chart/fetchSalesData',
    });
  }

  isActive(type) {
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return;
    }
    if (rangePickerValue[0].isSame(value[0], 'day') && rangePickerValue[1].isSame(value[1], 'day')) {
      return styles.currentDate;
    }
  }

  handleMouseDown = () => {
    this.setState({open: this.state.open + 60});
  };

  handleTouchStart = (e) => {
    e.preventDefault();
    this.handleMouseDown();
  };


  render() {
    const { rangePickerValue, salesType, currentTabKey, loading } = this.state;
    const { chart } = this.props;
    const {
      visitData,
      visitData2,
      salesData,
      searchData,
      offlineData,
      offlineChartData,
      salesTypeData,
      salesTypeDataOnline,
      salesTypeDataOffline,
    } = chart;

    const salesPieData = salesType === 'all' ?
      salesTypeData
      :
      (salesType === 'online' ? salesTypeDataOnline : salesTypeDataOffline);

    const menu = (
      <Menu>
        <Menu.Item>操作一</Menu.Item>
        <Menu.Item>操作二</Menu.Item>
      </Menu>
    );

    const iconGroup = (
      <span className={styles.iconGroup}>
        <Dropdown overlay={menu} placement="bottomRight">
          <Icon type="ellipsis" />
        </Dropdown>
      </span>
    );



    const columns = [
      {
        title: 'ID',
        dataIndex: 'index',
        key: 'index',
      },
      {
        title: 'Keyword',
        dataIndex: 'keyword',
        key: 'keyword',
        render: text => <a href="/">{text}</a>,
      },
      {
        title: 'Count',
        dataIndex: 'count',
        key: 'count',
        sorter: (a, b) => a.count - b.count,
        className: styles.alignRight,
      },
      {
        title: 'Range',
        dataIndex: 'range',
        key: 'range',
        sorter: (a, b) => a.range - b.range,
        align: 'right',
      },
    ];

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>

        </Col>
        <Col span={12} style={{ paddingTop: 36 }}>
          <Pie
            animate={false}
            color={(currentKey !== data.name) && '#BDE4FF'}
            inner={0.55}
            tooltip={false}
            margin={[0, 0, 0, 0]}
            percent={data.cvr * 100}
            height={64}
          />
        </Col>
      </Row>
    );

    const desc1 = (
      <div style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.45)', position: 'relative', left: 42 }}>
        <div style={{ margin: '8px 0 4px' }}>
          Thing
        </div>
      </div>
    );

    const desc2 = (
      <div style={{ fontSize: 12, position: 'relative', left: 42 }}>
        <div style={{ margin: '8px 0 4px' }}>
          Thing2
        </div>
      </div>
    );

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

    const topColResponsiveProps = {
      xs: 24,
      sm: 12,
      md: 12,
      lg: 12,
      xl: 6,
      style: { marginBottom: 24 },
    };

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

    var data = [
      {"name":"Active", "totalHours":180, "leftHours":25},
      {"name":"Cancel", "totalHours":150, "leftHours":42},
      {"name":"Arrive", "totalHours":250, "leftHours":10},
      {"name":"Contract", "totalHours":300, "leftHours":120}
    ];

    let dataarea = {
      points: [
        [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 } ]
      ],
      xValues: [0,1,2],
      yMin: 0,
      yMax: 30
    };

    return (
      <div>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>

            <Card
              loading={loading}
              bordered={false}
              title="Thing"
              style={{ marginTop: 14, height: 900 }}
            >

              <button
                onMouseDown={this.handleMouseDown.bind(this)}
                onTouchStart={this.handleTouchStart.bind(this)}>
                Toggle
              </button>
              <Motion style={{x: spring(this.state.open, {stiffness: 48, damping: 22})}}>
                {({x}) =>
                  <LineChart
                    data={dataarea}
                    width={1000}
                    height={500}
                    x={x}
                  />
                }
              </Motion>

            </Card>
          </Col>
        </Row>

        {/*<Row gutter={24}>
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

        </Row>*/}

       {/* <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>

            <Card
              loading={loading}
              bordered={false}
              title="Funnel"
              style={{ marginTop: 14, height: 500 }}
            >
             <D3Map></D3Map>
            </Card>
          </Col>

        </Row>*/}

      </div>
    );
  }
}
