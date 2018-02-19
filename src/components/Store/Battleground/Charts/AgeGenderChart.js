import React, {Component} from 'react';
import * as d3 from 'd3';
import ReactSVG from 'react-svg';

import styles from './AgeGenderChart.less';

class GenderAgeChart extends Component {

  constructor(props) {
    super();
  }

  componentWillMount() {

    const { values } = this.props;

    this.width = 200;
    this.height = 70;
    //this.ages = ["18-29", "40-49"];
    this.scale = d3.scale.linear().domain([0, 1]).range([0, this.width]);

    this.data = values;
    this.x = d3.scale.ordinal().domain(this.data.map((d) => { return d.key })).rangeRoundBands([0, this.width], 0.1);
    this.y = d3.scale.linear().domain([0, d3.max(this.data, (d) => { return d.values.length; })]).range([this.height, 0])

  }

  componentDidMount() {
    // Axis
    var xAxis = d3.svg.axis().scale(this.x).orient("bottom");
    var yAxis = d3.svg.axis().scale(this.y).orient("left").tickFormat(d3.format("d")).ticks(5)

    d3.select(this.xaxis).call(xAxis);
    d3.select(this.yaxis).call(yAxis);
  }

  render() {

    console.log(this.data);
    const { data, gender, colors, title, district } = this.props;

    return (
        <svg className={styles.genderagechart} width={this.width + 20} height={this.height + 70}>

          <g transform="translate(20, 10)">
            {
              this.data.map((d, i) =>
                (<rect key={i}
                       fill={colors(district.properties.name)}
                       x={this.x(d.key)}
                       y={this.y(d.values.length)}
                       width={this.width /14}
                       height={this.height - this.y(d.values.length)}></rect>))
            }
          </g>

          <g className="xaxis" transform={`translate(15, ${this.height + 10} )`}    ref={(axis) => this.xaxis = axis }></g>
          <g className="yaxis" transform={`translate(25,10)`}    ref={(axis) => this.yaxis = axis }></g>

        </svg>
    );
  }
}

export default GenderAgeChart;
