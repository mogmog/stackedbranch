import React, { PureComponent } from 'react';
import { DatePicker, Table } from 'antd';
import { Calendar, Badge } from 'antd';

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

    function getListData(value) {
      if (value.month() === 0 && value.date() > 15 && value.date() < 25) {
        return [{ type: 'success', content: 'M4 closed.' }];
      }
      return [];
    }

    function dateCellRender(value) {
      const listData = getListData(value);
      return (
        <ul className="events">
          {
            listData.map(item => (
              <li key={item.content}>
                <Badge status={item.type} text={item.content} />
              </li>
            ))
          }
        </ul>
      );
    }

    function getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    }

    function monthCellRender(value) {
      const num = getMonthData(value);
      return num ? (
        <div className="notes-month">
          <section>{num}</section>
          <span>Backlog number</span>
        </div>
      ) : null;
    }

    return (
      <Calendar dateCellRender={dateCellRender} monthCellRender={monthCellRender} />
    );
  }
}

export default DateDefineList;





