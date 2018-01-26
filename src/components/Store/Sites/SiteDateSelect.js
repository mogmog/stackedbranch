import React, { PureComponent } from 'react';
import { DatePicker } from 'antd';
const {RangePicker} = DatePicker;
class SiteDateSelect extends PureComponent {

  render() {
    return (
      <div>
        <RangePicker onChange={this.props.onDateSelect.bind(this)} />
      </div>
    );
  }
}

export default SiteDateSelect;
