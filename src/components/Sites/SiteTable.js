import React, { PureComponent } from 'react';
import moment from 'moment';
import { Table, Alert, Badge, Divider } from 'antd';
import styles from '../../routes/Dwells/DwellSearchWizard/index.less';

class SiteTable extends PureComponent {


  render() {
    const columns = [{
      title: 'Name',
      dataIndex: 'name',
    }, {
      title: 'ID',
      dataIndex: 'id',
    }, ];

    const { data } = this.props;

    // rowSelection object indicates the need for row selection
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.props.onRowSelect(selectedRows);
      },
    };

    return (
      <div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data.list}
          pagination={false}
          rowKey={(x) => x.id}
        />
      </div>
    );
  }
}

export default SiteTable;
