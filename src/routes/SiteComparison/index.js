import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Modal, Form, Tabs, Button, Switch, Alert, Tooltip, Icon} from 'antd';

import _ from 'lodash';

import {ChartCard, Field} from '../../components/Charts';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SiteTable from '../../components/Sites/SiteTable';
import HourlyCountryThing from '../../components/Sites/HourlyCountryThing';
import SiteEventsChartsHolderIndividual from '../../components/Sites/SiteEventsChartsHolderIndividual';
import SiteDateSelect from '../../components/Sites/SiteDateSelect';
import SiteTotalSightings from '../../components/Sites/SiteTotalSightings';
import SiteCountryBarChart from '../../components/Sites/SiteCountryBarChart';

import Trend from '../../components/Trend';

import styles from './style.less';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class SiteComparison extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      visible: true,
      combinedSites: true,
      filter: {selectedDates: [], selectedRow: []}
    };

  }

  componentDidMount() {
    const {dispatch} = this.props;

    /*dispatch the site api call. This will populate the state property of 'sites' with the response via  the store reducer in sites.js model */
    dispatch({
      type: 'site_namespace/fetch',
    });
  }

  /*clear the results of the site comparison when the component is unmounted*/
  componentWillUnmount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'sitecomparison_namespace/clear',
    });
  }

  onRowSelect(selectedRow) {
    this.setState({filter: {...this.state.filter, selectedRow: selectedRow}});
  }

  onDateSelect(selectedDates) {
    this.setState({filter: {...this.state.filter, selectedDates: selectedDates}});
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  showFilter = (e) => {
    this.setState({
      visible: true,
    });
  }

  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  doSplit() {
    this.setState({split: true});
  }

  doUnSplit() {
    this.setState({split: false});
  }

  toggleSitesCombined(isCombined) {
    this.setState({combinedSites: isCombined});
  }

  handleFilterSubmit() {
    const {dispatch, loading} = this.props;
    const {filter} = this.state;

    this.setState({visible: false});

    /* The reducer in sitecomparison_namespace will populate the prop property ''*/
    dispatch({
      type: 'sitecomparison_namespace/fetch',
      payload: filter,
    });

    this.setState({visible: false});

  }

  render() {

    const {sites, sitecomparison, loading} = this.props;
    const {combinedSites} = this.state;
    const {selectedRow, selectedDates} = this.state.filter;

    const modalFooter = [<Button key="submit"
                                 disabled={(selectedRow.length === 0 || selectedDates.length === 0)}
                                 type="primary"
                                 onClick={this.handleFilterSubmit.bind(this)}> Submit </Button>];


    const data = _(sites).groupBy(x => x.country).value();

    return (

      <span>

        <Modal
          title="Define your filters"
          visible={this.state.visible}
          footer={modalFooter}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Select Sites" key="1">
              <SiteTable onRowSelect={this.onRowSelect.bind(this)} data={sites}/>
               <Alert message="Remember to select a date range on next tab" type="error"/>
            </TabPane>
            <TabPane tab="Select Date Range" key="2">
              <SiteDateSelect onDateSelect={this.onDateSelect.bind(this)}/>
            </TabPane>
          </Tabs>
        </Modal>

        <PageHeaderLayout>

          <a onClick={this.showFilter}>edit filters</a>

          {(selectedDates.length ? (
            <Row gutter={24}>
              <Col xl={10} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}>
                <SiteTotalSightings data={sitecomparison.list} dates={selectedDates} />
              </Col>

              <Col xl={14} lg={24} md={24} sm={24} xs={24}>
               &nbsp;
              </Col>
            </Row>
          ) :  <Row gutter={24}><Col xl={10} lg={24} md={24} sm={24} xs={24} style={{ marginBottom: 24 }}></Col></Row>)}

          {
            <Row gutter={24}>
              <Col xl={24} style={{ marginBottom: 24 }}>
                <SiteCountryBarChart data={sitecomparison} />
              </Col>
            </Row>
          }

          {/*{<Row gutter={24}>*/}
            {/*<Col xl={24} lg={24} md={24} sm={24} xs={24}>*/}
              {/*<Card bordered loading={this.state.loading}>*/}
                {/*<div>*/}

                  {/*<Switch*/}
                    {/*checkedChildren="Separate Sites"*/}
                    {/*unCheckedChildren="Combine Sites"*/}
                    {/*defaultChecked={combinedSites}*/}
                    {/*onChange={this.toggleSitesCombined.bind(this)}*/}
                  {/*/>*/}
                  {/*<div>*/}
                    {/*<SiteEventsChartsHolderIndividual site_ids={selectedRow.map(x => x.id)}/>*/}
                  {/*</div>*/}
                {/*</div>*/}
              {/*</Card>*/}
            {/*</Col>*/}
          {/*</Row>}*/}

          {/*<Row>*/}
            {/*<Col>*/}
              {/*<Card bordered>*/}

                {/*<Button onClick={this.doSplit.bind(this)}> Down </Button>*/}
                {/*<Button onClick={this.doUnSplit.bind(this)}> Up</Button>*/}


                {/*<svg width={'100%'} height={800}>*/}

                {/*/!*{*!/*/}
                {/*/!*Object.keys(data).map((e, i) => {*!/*/}
                {/*/!*if (e !== 'United Kingdom') {*!/*/}
                {/*/!*return <HourlyCountryThing key={i}  index={i} data={data[e]} />*!/*/}
                {/*/!*}*!/*/}
                {/*/!*return <span>UK</span>;*!/*/}
                {/*/!*}*!/*/}
                {/*/!*)*!/*/}
                {/*/!*}*!/*/}

                {/*</svg>)*/}

              {/*</Card>*/}
            {/*</Col>*/}
          {/*</Row>*/}





        </PageHeaderLayout>
      </span>
    );
  }
}

/*an inlnie version of 'State to props' that pushes the sites object from the state of the model (dynmically applied by dynamicWrapper in nav,js)
 into the props of the SiteComparision component so that sites is available to the render() method*/
export default connect((state) => {

  return {
    loading: state.sitecomparison_namespace.loading,
    sites: state.site_namespace.sites,
    sitecomparison: state.sitecomparison_namespace.sitecomparison
  }
})(SiteComparison);
