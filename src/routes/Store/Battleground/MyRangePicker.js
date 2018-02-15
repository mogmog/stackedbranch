import React, {Component} from 'react';

import { DatePicker } from 'antd';
const {RangePicker} = DatePicker;


class MyRangePicker extends RangePicker {

  constructor(props) {
    super(props);
  }

  componentWillMount () {
    console.log(this);
  }

  componentDidMount () {

  }

  render() {

    return (

      <div>
        test
        {super.render()}
      </div>
    );
  }

}

export default MyRangePicker;
