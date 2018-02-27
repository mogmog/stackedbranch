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

    /*hack - assume same number of buckets*/
    const howManyColours = data.groupedByGender["m"].length;

    /*an opacity scale */
    const color = d3.scale.ordinal().range([...Array(howManyColours).keys()].map(i => `rgba(102, 34, 136, ${(i + 1) / howManyColours})`));

    const arc = d3.svg.arc()
      .outerRadius(radius - 30)
      .innerRadius(radius - 10);

    const textarc = d3.svg.arc()
      .outerRadius(radius + 40)
      .innerRadius(radius - 10);

    const pie = d3.layout.pie().sort(d3.ascending).value(function(d) { return d.count; });

    const fixage = x => x.toString().split("").splice(0, 2).join("") + "-" + x.toString().split("").splice(2).join("")

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
                        <path d={arc(d)} style={{'fill' : color(d.data.age)}}></path>

                        <g transform="translate(5, 10)">
                          <text fill='gray' textAnchor='middle' transform={`translate(${textarc.centroid(d)})`}>{fixage(d.data.age)}</text>
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
