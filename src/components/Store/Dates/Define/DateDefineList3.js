import React, { PureComponent } from 'react';
import { DatePicker, Table } from 'antd';
const {RangePicker} = DatePicker;

class DateDefineList extends PureComponent {

  columns = [

    {
      title: 'Name',
      defaultSortOrder: 'ascend',
      dataIndex: 'name',
    },
  ];

  render() {
    return (
      <Table
        rowKey={x => x.id}
        loading={false}
        dataSource={[{name : 'M4 closed'}, {name : 'Sale'}]}
        columns={this.columns}
        pagination={false}
      />
    );
  }
}

export default DateDefineList;
