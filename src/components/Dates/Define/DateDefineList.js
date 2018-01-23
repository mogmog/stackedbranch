import React, { PureComponent } from 'react';
import { DatePicker, Table } from 'antd';
import { Calendar, Badge } from 'antd';
import Moment from 'moment';

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

    const dates = this.props;

    function getListData(value) {

      return (dates.dates.dates.list.filter( x => {
        return value.year() <= Moment(x.to).year() && value.month() <= Moment(x.to).month() && value.date() <= Moment(x.to).date() && value.month() >= Moment(x.from).month() && value.date() >= Moment(x.from).date() && value.year() >= Moment(x.from).year() } ));
    }

    function dateCellRender(value) {
      if (getListData(value).length) return <span>Booked</span>;
      return null;
    }

    return (
      <Calendar dateCellRender={dateCellRender} />
    );
  }
}

export default DateDefineList;





