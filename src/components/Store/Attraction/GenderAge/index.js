import React, {Component} from 'react';
import { Card, Row, Col } from 'antd';
import * as d3 from 'd3';

import GenderAgeGraphic from './GenderAgeGraphic';

class GenderAge extends Component {

  state = {

  }

  constructor(props) {
    super();
  }

  componentWillMount () {
    this.height = 100;
    this.margin = {left : 10, right : 10, top : 0, bottom : 0};
  }

  render() {

    if (!this.props.data || !this.props.data.days.length) {
      return (<span>no data</span>);
    }

    //console.log(this.props.data);
    return (

      <div>
        <h4>
         Gender
        </h4>
        <h6>and age group</h6>


        <Row gutter={24}>
          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <GenderAgeGraphic gender="m" data={this.props.data} icon={'ic-man.svg'}/>
            </Col>

          <Col xl={12} lg={12} md={12} sm={12} xs={24}>
              <GenderAgeGraphic gender="f" data={this.props.data} icon={'ic-woman.svg'}/>
            </Col>
        </Row>


      </div>
    );
  }

}

export default GenderAge;
