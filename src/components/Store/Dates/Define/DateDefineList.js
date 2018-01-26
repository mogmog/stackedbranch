import React, { PureComponent } from 'react';
import { DatePicker, Table } from 'antd';
import { Calendar, Badge } from 'antd';
import Moment from 'moment';

const {RangePicker} = DatePicker;

class DateDefineList extends PureComponent {

  render() {

    const dates = this.props;

    function getListData(value) {

      return (dates.dates.dates.list.filter( x => {
        return value.year() <= Moment(x.to).year() && value.month() <= Moment(x.to).month() && value.date() <= Moment(x.to).date() && value.month() >= Moment(x.from).month() && value.date() >= Moment(x.from).date() && value.year() >= Moment(x.from).year() } ));
    }

    function dateCellRender(value) {
      if (getListData(value).length) {
        console.log(getListData(value));
        return (
          <ul className="events ant-fullcalendar-month-panel-selected-cell">
            {
              getListData(value).map((item, i) => (
                <li key={i}>
                  <Badge status='success'> {item.name}</Badge>
                </li>
              ))
            }
          </ul>
        );
      }
      return null;
    }

    return (
      <Calendar dateCellRender={dateCellRender} />
    );
  }
}

export default DateDefineList;





