import React, {PureComponent} from 'react';
import {Row, Col, Card, Radio } from 'antd';
import Stacked from '../../../components/Common/Charts/Stacked/index';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class DemoStackedThing extends PureComponent {
  render() {

    const keys = ["redDelicious", "mcintosh", "oranges", "pears"];

    const data = [
      {year: "2006", redDelicious: "112", mcintosh: "15", oranges: "9", pears: "6"},
      {year: "2007", redDelicious: "12", mcintosh: "18", oranges: "9", pears: "4"},
      {year: "2008", redDelicious: "05", mcintosh: "20", oranges: "8", pears: "2"},
      {year: "2009", redDelicious: "01", mcintosh: "15", oranges: "5", pears: "4"},
      {year: "2010", redDelicious: "02", mcintosh: "10", oranges: "4", pears: "2"},
      {year: "2011", redDelicious: "03", mcintosh: "12", oranges: "6", pears: "3"},
      {year: "2012", redDelicious: "04", mcintosh: "15", oranges: "8", pears: "1"},
      {year: "2013", redDelicious: "06", mcintosh: "11", oranges: "9", pears: "4"},
      {year: "2014", redDelicious: "10", mcintosh: "13", oranges: "9", pears: "5"},
      {year: "2015", redDelicious: "16", mcintosh: "19", oranges: "6", pears: "9"},
      {year: "2016", redDelicious: "19", mcintosh: "17", oranges: "5", pears: "7"},
    ];

    return (

      <div>
      <Row>
        <Col>
          <RadioGroup defaultValue="a" size="large">
            <RadioButton value="as">Monday</RadioButton>
            <RadioButton value="b">Tuesday</RadioButton>
            <RadioButton value="c">Wednesday</RadioButton>
            <RadioButton value="d">Thursday</RadioButton>
            <RadioButton value="e">Friday</RadioButton>
          </RadioGroup>
        </Col>
      </Row>
        <Row>
          <Col>
            &nbsp;
          </Col>
        </Row>

        <Row>
          <Col>
            <Stacked
              data={data}
              keys={keys}
              width={1200}
              height={500}
            />
          </Col>
        </Row>

      </div>


    );
  }
}

export default DemoStackedThing;
