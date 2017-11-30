import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Tabs, Form, Input, Select, Icon, Button, InputNumber, DatePicker, Modal, message } from 'antd';
import SiteTable from './SiteTable';
import SiteSelectMap from "./Map/SiteSelectMap";

import styles from './SiteList.less';

const { TabPane } = Tabs;

const getValue = obj => Object.keys(obj).map(key => obj[key]).join(',');

@connect(state => ({
  rule: state.rule,
}))
@Form.create()
export default class SiteList extends PureComponent {
  state = {
    selectedRows: []
  };

  //rule/fetch - rule api is called
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  }

  handleSelectRows = (rows) => {
    this.setState({
      selectedRows: rows,
    });
  }

  render() {
    const { rule: { loading: ruleLoading, data } } = this.props;
    const { selectedRows } = this.state;

    return (
      <div>

        <Tabs
          defaultActiveKey="List"
        >
          <TabPane tab="List" key="List">

            <SiteTable
              selectedRows={selectedRows}
              loading={ruleLoading}
              data={data}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </TabPane>

          <TabPane tab="Map" key="Map">
            <SiteSelectMap data={data} onSelectMarker={this.handleSelectRows} />
          </TabPane>
        </Tabs>

      </div>
    );
  }
}
