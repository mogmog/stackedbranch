import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown, Steps } from 'antd';
import numeral from 'numeral';
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart, FunnelChart, Radar
} from '../../components/Charts';
import Trend from '../../components/Trend';
import NumberInfo from '../../components/NumberInfo';
import { getTimeDistance } from '../../utils/utils';
import { FormattedMessage } from 'react-intl';
import styles from './Analysis.less';

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
        render: (text, record) => (
          <Trend flag={record.status === 1 ? 'down' : 'up'}>
            <span style={{ marginRight: 4 }}>{text}%</span>
          </Trend>
        ),
        align: 'right',
      },
    ];

    const activeKey = currentTabKey || (offlineData[0] && offlineData[0].name);

    const CustomTab = ({ data, currentTabKey: currentKey }) => (
      <Row gutter={8} style={{ width: 138, margin: '8px 0' }}>
        <Col span={12}>
          <NumberInfo
            title={data.name}
            subTitle="Custom"
            gap={2}
            total={`${data.cvr * 100}%`}
            theme={(currentKey !== data.name) && 'light'}
          />
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


    return (
      <div>

        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card
              loading={loading}
              bordered={false}
              title="Funnel"
              style={{ marginTop: 14, height: 450 }}
            >

              <FunnelChart
                data={funnel}
                height={250}
                titleMap={{ y1: 'Y1', y2: 'Y2' }}
              />

            </Card>
          </Col>

          <Col xl={12} lg={12} md={12} sm={12} xs={12}>
            <Card
              loading={loading}
              bordered={false}
              title="Radar"
              style={{ marginTop: 14, height: 450 }}
            >

              <Radar
                data={radarData}
                height={400}
                titleMap={{ y1: 'Y1', y2: 'Y2' }}
              />

            </Card>
          </Col>

        </Row>

        <Card
          loading={loading}
          className={styles.offlineCard}
          bordered={false}
          bodyStyle={{ padding: '0 0 32px 0' }}
          style={{ marginTop: 32 }}
        >
          <Tabs
            activeKey={activeKey}
            onChange={this.handleTabChange}
          >
            {
              offlineData.map(shop => (
                <TabPane
                  tab={<CustomTab data={shop} currentTabKey={activeKey} />}
                  key={shop.name}
                >

                  <FormattedMessage id="app.welcome" />

                  <div style={{ padding: '0 24px' }}>
                    <TimelineChart
                      data={offlineChartData}
                      titleMap={{ y1: '客流量', y2: '支付笔数' }}
                    />
                  </div>
                </TabPane>)
              )
            }
          </Tabs>
        </Card>

        <Card bordered={false} style={{ marginTop: 32 }}>
          <Steps progressDot current={3}>
            <Step title={<span style={{ fontSize: 14 }}><FormattedMessage id="app.welcome" /></span>} description={desc1} />
            <Step title={<span style={{ fontSize: 14 }}><FormattedMessage id="app.welcome_2" /></span>} description={desc2} />
            <Step title={<span style={{ fontSize: 14 }}>Dest 3</span>} />
            <Step title={<span style={{ fontSize: 14 }}>Dest 4</span>} />
            <Step title={<span style={{ fontSize: 14 }}>Dest 5</span>} />
          </Steps>
        </Card>

        <Row gutter={24}>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              bordered={false}
              title="Compare"
              extra={iconGroup}
              style={{ marginTop: 24 }}
            >
              <Row gutter={68}>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle={
                      <span>
                        Store A
                      </span>
                    }
                    gap={8}
                    total={numeral(12321).format('0,0')}
                    status="up"
                    subTotal={17.1}
                  />
                  <MiniArea
                    line
                    height={45}
                    data={visitData2}
                  />
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                  <NumberInfo
                    subTitle="Down"
                    total={2.7}
                    status="down"
                    subTotal={26.2}
                    gap={8}
                  />
                  <MiniArea
                    line
                    height={45}
                    data={visitData2}
                  />
                </Col>
              </Row>
              <Table
                rowKey={record => record.index}
                size="small"
                columns={columns}
                dataSource={searchData}
                pagination={{
                  style: { marginBottom: 0 },
                  pageSize: 5,
                }}
              />
            </Card>
          </Col>
          <Col xl={12} lg={24} md={24} sm={24} xs={24}>
            <Card
              loading={loading}
              className={styles.salesCard}
              bordered={false}
              title="Sales"
              bodyStyle={{ padding: 24 }}
              extra={(
                <div className={styles.salesCardExtra}>
                  {iconGroup}
                  <div className={styles.salesTypeRadio}>
                    <Radio.Group value={salesType} onChange={this.handleChangeSalesType}>
                      <Radio.Button value="all">All</Radio.Button>
                      <Radio.Button value="online">Online</Radio.Button>
                      <Radio.Button value="offline">Offline</Radio.Button>
                    </Radio.Group>
                  </div>
                </div>
              )}
              style={{ marginTop: 24, minHeight: 509 }}
            >
              <h4 style={{ marginTop: 8, marginBottom: 32 }}>Thing</h4>
              <Pie
                hasLegend
                subTitle="XXX"
                total={(salesPieData.reduce((pre, now) => now.y + pre, 0))}
                data={salesPieData}
                valueFormat={val => (val)}
                height={248}
                lineWidth={4}
              />
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
