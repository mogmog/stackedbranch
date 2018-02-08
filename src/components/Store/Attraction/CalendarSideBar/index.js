import React, {Component} from 'react';
import Drawer from 'react-motion-drawer';

import SideBar from './SideBar';
import Label from './Label';

class CalendarSideBar extends Component {

  state = {
      open : false,
      range : []
  }

  constructor(props) {
    super();
  }

  componentWillMount () {
  }

  onDateSelect(range) {
    this.setState({open : false, range : range});
  }

  click() {
    this.setState({open : !this.state.open});
  }

  render() {

    return (

      <div>
        <Label range={this.state.range} click={this.click.bind(this)}/>

        <Drawer open={this.state.open} width={300} right={true} >
          <SideBar onDateSelect={this.onDateSelect.bind(this)}/>
        </Drawer>
      </div>
    );
  }

}

export default CalendarSideBar;
