import React, {Component} from 'react';
import {Icon} from 'antd';

class Label extends Component {

  state = {

  }

  constructor(props) {
    super();
  }

  componentWillMount () {
  }

  render() {

    const {range, click} =  this.props;

    return (

      <div  >
        <span onClick={this.props.click} style={{ "width" : "30px", "height" : "20px"}}> <Icon  type={'calendar'} /> </span>

        <span style={{"width" : "230px"}}> {range.length ? (<span>{range[0].format('MM/DD/YYYY')} - {range[1].format('MM/DD/YYYY')}</span>) : <span></span>} </span>

      </div>
    );
  }

}

export default Label;
