import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Card, Divider, Modal, Form, Tabs, Button, Switch} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SiteTable from '../../components/Sites/SiteTable';
import SiteEventsChartsHolderCombined from '../../components/Sites/SiteEventsChartsHolderCombined';
import SiteEventsChartsHolderIndividual from '../../components/Sites/SiteEventsChartsHolderIndividual';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class SiteComparison extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {selectedRows: [], modalVisible: true, combinedSites : true};
  }

  componentDidMount() {
    const {dispatch} = this.props;

    /*dispatch the site api call. This will populate the state property of 'sites' with the response via  the store reducer in sites model */
    dispatch({
      type: 'site_namespace/fetch',
    });
  }

  onRowSelect(selectedRows) {
    this.setState({selectedRows});
  }

  toggleSitesCombined(combinedSites) {
    this.setState({ combinedSites :  combinedSites});
  }

  handleOk() {
    this.setState({modalVisible: false});
  }

  render() {

    const {sites} = this.props;
    const {modalVisible, selectedRows, combinedSites } = this.state;
    const modalFooter = [<Button key="submit" disabled={this.state.selectedRows.length === 0} type="primary" onClick={this.handleOk.bind(this)}>Submit</Button>];

    return (
      <PageHeaderLayout>
        <Card bordered>
          <div>

            <Switch checkedChildren="Separate Sites" unCheckedChildren="Combine Sites" defaultChecked={combinedSites} onChange={this.toggleSitesCombined.bind(this)} />


            <Modal
              title="Define your filters"
              visible={modalVisible}
              footer={modalFooter} >

              <Tabs defaultActiveKey="1">
                <TabPane tab="Select Sites" key="1">
                  <SiteTable onRowSelect={this.onRowSelect.bind(this)} data={sites}/>
                </TabPane>
                <TabPane tab="Select Date Range" key="2">
                  <SiteTable onRowSelect={this.onRowSelect.bind(this)} data={sites}/>
                </TabPane>
              </Tabs>

            </Modal>


            {combinedSites ? (selectedRows.map((x) => <span><h1> {x.name} </h1><SiteEventsChartsHolderIndividual site_ids={[x.id] } /></span>)) : <span><SiteEventsChartsHolderIndividual site_ids={selectedRows.map(x=>x.id) } /></span>}

          </div>
        </Card>
      </PageHeaderLayout>
    );
  }
}

/*an inlnie version of 'State to props' that pushes the sites object from the state of the model (dynmically applied by dynamicWrapper in nav,js)
 into the props of the SiteComparision component so that sites is available to the render() method*/
export default connect(state => ({
  sites: state.site_namespace.sites,
}))(SiteComparison);
