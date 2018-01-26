import React, {Component} from 'react';
import * as d3 from 'd3';
import ReactTransitionGroup from "react-addons-transition-group";

const ComparisonStory = ({percent, x, y, width, height}) => {

  console.log(width);

  let translate = `translate(${x}, ${y})`,
    label = percent.toFixed(0) + '%';

  if (percent < 1) {
    label = percent.toFixed(2) + "%";
  }

  if (width < 20) {
    label = label.replace("%", "");
  }

  if (width < 10) {
    label = "";
  }

  return (
    <g  className="bar">
      <rect width={width}
            height={height }
            fill={'#000'}
            transform="translate(0, 1)">
      </rect>
      <text textAnchor="end"
            x={width - 5}
            y={height / 2 + 3}>
        {label}
      </text>
    </g>
  );
}

class Stacked extends Component {

  state = {
   highlight : false
  }

  constructor(props) {
    super();

    let line = d3.svg.line()
      .interpolate(interpolationType)
      .x((d) => { return xScale(d.x); })
      .y((d) => { return yScale(d.y); });

    let lines = data.points.map((series, id) => {
      return (
        <Line
          path={line(series)}
          stroke={colors(id)}
          key={id}
        />
      );
    });
  }

  componentWillReceiveProps(newProps) {
    this.updateD3(newProps);
  }

  updateD3(props) {

  }

  makeBar(d, i) {

    const transition = d3
      .transition()
      .duration(750)
      .ease(d3.easeCubicInOut);

    const highlight = this.state.highlight;

    var x = d3.scaleBand().rangeRound([0, 500]).paddingInner(0.1).align(0.2);

    var y = d3.scaleLinear().range([300, 0]);

    var z = d3.scaleOrdinal().range(["#81F781", "#F78181"]);

    x.domain(this.props.data.map(function(d) { return d.name; }));
    z.domain(["leftHours", "satisfied"]);

    function makeY() {
      this.setState({"highlight" : !this.state.highlight});
    }

    function getY(_x, highlighted) {
      return highlighted ? y(_x[1]) : 0;
    }

    return (<g key={i}>
      {d.map((_x, ii) => {
        return <rect transition={transition} onClick={makeY.bind(this)} fill={z(d.key)} x={x(_x.data.name)} y={getY(_x, this.state.highlight)} height={y(_x[0]) - y(_x[1])} width={40} key={ii}>thing</rect>;
      })}
    </g>);
  }

  render() {

    return (

      <g>
        {this.stack.keys(["leftHours","satisfied"])(this.data).map(this.makeBar.bind(this))}
      </g>

    );
  }

}

export default ComparisonStory;
