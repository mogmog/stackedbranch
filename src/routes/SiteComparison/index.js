import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Card, Divider, Modal, Form, Tabs, Button} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import SiteTable from '../../components/Sites/SiteTable';
import SiteEventsChartsHolder from '../../components/Sites/SiteEventChartsHolder';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class SiteComparison extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {selectedRows: [], modalVisible: true, siteIdsToLoad: []};
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

  handleOk() {
    this.setState({modalVisible: false, siteIdsToLoad: this.state.selectedRows.map(x => x.id)});
  }

  render() {

    const {sites} = this.props;
    const {modalVisible, siteIdsToLoad} = this.state;
    const modalFooter = <Button key="submit" disabled={this.state.selectedRows.length === 0} type="primary"
                                onClick={this.handleOk.bind(this)}>Submit</Button>;

    return (
      <PageHeaderLayout>
        <Card bordered>
          <div>

            <Modal
              title="Define your filters"
              visible={modalVisible}
              footer={[modalFooter]}>

              <Tabs defaultActiveKey="1">
                <TabPane tab="Select Sites" key="1">
                  <SiteTable onRowSelect={this.onRowSelect.bind(this)} data={sites}/>
                </TabPane>
                <TabPane tab="Select Date Range" key="2">Lets do some dates
                  <SiteTable onRowSelect={this.onRowSelect.bind(this)} data={sites}/>
                </TabPane>
              </Tabs>

            </Modal>

            {
              (this.state.siteIdsToLoad.length ?
                <SiteEventsChartsHolder site_ids={this.state.siteIdsToLoad} /> : <span>Nothing</span>)
            }

            what is here

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
