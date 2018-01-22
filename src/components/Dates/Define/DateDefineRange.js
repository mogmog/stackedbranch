import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
const {RangePicker} = DatePicker;

class DateDefineRange extends PureComponent {

  render() {
    return (
      <div>
        <RangePicker />
      </div>
    );
  }
}

export default DateDefineRange;
