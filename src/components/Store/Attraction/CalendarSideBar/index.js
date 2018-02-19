import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import Drawer from 'react-motion-drawer';

import Label from './Label';

import { DatePicker, Button } from 'antd';
const {RangePicker} = DatePicker;

import styles from './SideBar.less';


class CalendarSideBar extends Component {

  state = {
      open : false,
      show : false,
      range : []
  }

  constructor(props) {
    super();
    this.state.range = props.range;
  }

  componentWillMount () {
  }


  getContainer () {
    return document.getElementById("calendarSidebar");
  }

  onDateSelect(range) {
    this.setState({ open : false});
    this.setState({ range : range});
  }

  click() {
    this.setState({open : !this.state.open});
    console.log(this.state);
  }

  drawerChange(open) {
    if (open) {
      let that = this;
      setTimeout(x => {that.setState({show : true})}, 100);
    }

    this.setState({open : open});
  }

  render() {

    const { open, range } = this.state;

    console.log(range)
    return (
      <div  >

        <Button onClick={this.click.bind(this)}> <Label range={range}></Label></Button>

        <Drawer open={open} width={300} right={true} onChange={this.drawerChange.bind(this)}>
          <div className={styles.sidebar}>
            <span id="test"></span>
            <RangePicker defaultValue={range} onChange={this.onDateSelect.bind(this)} open={this.state.show} getCalendarContainer={() => {return document.getElementById('test')}}/>
          </div>
        </Drawer>
      </div>
    );
  }

}

export default CalendarSideBar;
