import React, {Component} from 'react';
import { Card, Row, Col } from 'antd';
import * as d3 from 'd3';
import ReactSVG from 'react-svg';

class GenderAgeGraphic extends Component {

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

    const width = 125,
      height = 125,
      radius = Math.min(width, height) / 2;

    const data = [{age : 5, population : 33}, {age : '6 - 10', population : 50}, {age : '11-14', population : 17}];

    var color = d3.scale.ordinal().range(["#FF77FF", "#BC0FE0", "#662188"]);

    var arc = d3.svg.arc()
      .outerRadius(radius - 10)
      .innerRadius(radius - 30);

    var pie = d3.layout.pie().sort(null).value(function(d) { return d.population; });

    return (
      <div>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <div>
              <h2 style={{'float' : 'left', 'marginBottom' : '-1.32em'}}>{this.props.value}%</h2>

              <ReactSVG path={require(`../../../../assets/svg/${this.props.icon}`)} />
            </div>

          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <svg width={width} height={height} transform="translate(-8, 0)">
              <g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
                {
                  pie(data).map((d, i) => (
                    <g className="arc" key={i}>
                        <path d={arc(d)} style={{'fill' : color(d.data.age)}}></path>
                    </g>
                  ))
                }
              </g>
              </svg>
          </Col>
        </Row>

      </div>
    );
  }

}

GenderAgeGraphic.defaultProps = {icon : 'ic-man.svg'};

export default GenderAgeGraphic;
