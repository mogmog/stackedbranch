import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { DatePicker } from 'antd';
const {RangePicker} = DatePicker;

import styles from './SideBar.less';

class SideBar extends Component {

  state = {

  }

  constructor(props) {
    super();
  }

  componentDidMount() {
    this.node = ReactDOM.findDOMNode(this);
  }

  render() {


    console.log(this.node);
    const {onDateSelect} = this.props;

    return (

      <div className={styles.sidebar}>
        <RangePicker onChange={onDateSelect.bind(this)} getCalendarContainer={x=> this.node} autoFocus />
      </div>
    );
  }

}

export default SideBar;
