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

    const {range} =  this.props;

    return (

      <div onClick={this.props.click}>
        <Icon type={'calendar'}/>

        {range.length ? (<span>{range[0].format('MM/DD/YYYY')} - {range[1].format('MM/DD/YYYY')}</span>) : <span></span>}


        <Icon type={'down'}/>
      </div>
    );
  }

}

export default Label;
