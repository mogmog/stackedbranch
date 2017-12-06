import React, {PureComponent} from 'react';
import moment from 'moment';
import {Table, Alert, Badge, Divider, Button, Modal, Card, Form, Input} from 'antd';

import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import {Map, TileLayer, Circle, FeatureGroup, Polygon} from 'react-leaflet';
import {EditControl} from 'react-leaflet-draw';

import D3Map from './../../components/D3Map/D3Map';
import {connect} from "dva";

const statusMap = ['default', 'processing', 'success', 'error'];
const FormItem = Form.Item;

@connect(state => ({
  area: state.area,
}))
class AreaDefinitionTable extends PureComponent {

  state = {
    ModalText: 'Content of the modal',
    visible: false,
    confirmLoading: false,
    payload: {}
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'area/fetch',
    });
  }

  handleOk = () => {

    this.setState({
      visible: false,
    });

    const {dispatch} = this.props;

    this.setState({
      confirmLoading: true,
    });

    console.log(this.state);

    dispatch({
      type: 'area/saveandfetch',
      payload: this.state.payload,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  onAreaDefine = (layer) => {
    this.setState({payload: { ...this.state.payload, coords: layer.layer.getLatLngs() } });
  }

  onNameChange = (event) => {
    this.setState({payload: {...this.state.payload, name: event.target.value } });
  }

  render() {

    const {data: {list}, loading} = this.props.area;
    const {visible, confirmLoading} = this.state;

    const columns = [

      {
        title: 'Name',
        dataIndex: 'name',
      }

    ];

    return (
      <div>

        <PageHeaderLayout>
          <Card bordered={false}>
            <div>

              <div style={{marginBottom: '16px'}}>
                <Button type="primary" onClick={this.showModal}>Create New Area</Button>
              </div>

              <Table
                rowKey={x => x.id}
                loading={loading}
                dataSource={list}
                columns={columns}
                pagination={false}
              />
            </div>
          </Card>

          <Modal title="Create new Area by drawing a shape"
                 visible={visible}
                 onOk={this.handleOk.bind(this)}
                 confirmLoading={confirmLoading}
                 onCancel={this.handleCancel}
          >

            <FormItem
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 24 }}
              label="Name"
            >
              <Input placeholder="Area Name" onChange={this.onNameChange.bind(this)} value={this.state.payload.name} />
            </FormItem>

            <D3Map>

              <FeatureGroup>
                <EditControl
                  onCreated={this.onAreaDefine.bind(this)}
                  position='topleft'
                  draw={{
                    rectangle: false
                  }}
                />

              </FeatureGroup>

            </D3Map>
          </Modal>

        </PageHeaderLayout>
      </div>

    );
  }
}

export default AreaDefinitionTable;
