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

    const width = 170,
      height = 170,
      radius = Math.min(width, height) / 2;

    const {data, gender} = this.props;

   // console.log(data);



    var color = d3.scale.ordinal().range(["#FF77FF", "#BC0FE0", "#662188", "yellow", "blue"]);

    var arc = d3.svg.arc()
      .outerRadius(radius - 30)
      .innerRadius(radius - 10);

    var textarc = d3.svg.arc()
      .outerRadius(radius + 40)
      .innerRadius(radius - 10);

    var pie = d3.layout.pie().sort(null).value(function(d) { return d.count; });

    //console.log(pie(data.groupedByGender[gender]));

    return (
      <div>
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <div>
              <h2 style={{'float' : 'left', 'paddingLeft' : '3.2em', 'paddingRight' : '0.35em', 'marginBottom' : '-1.32em'}}>{d3.format(".01%")(data.gender_totals[gender][0].percent)}</h2>
              <ReactSVG path={require(`../../../../assets/svg/${this.props.icon}`)} />
            </div>

          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
              <svg width={width * 1.5} height={height* 1.5} transform="translate(0, 15)">
              <g transform={"translate(" + width / 1.5 + "," + height / 2 + ")"}>
                {
                  pie(data.groupedByGender[gender]).map((d, i) => (

                    <g className="arc" key={i} transform="translate(0, 15)">
                        <path d={arc(d)} style={{'fill' : color(d.data.count)}}></path>

                        <g transform="translate(5, 10)">
                          <text fill='gray' textAnchor='middle' transform={`translate(${textarc.centroid(d)})`}>{d.data.age}</text>
                        </g>
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
