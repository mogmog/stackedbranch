import React, {Component} from 'react';
import * as d3 from 'd3';

class VisitorFrequencyLine extends Component {

  constructor(props) {
    super();
  }

  componentWillMount() {
    const { xScale, yScale, type, types, values } = this.props;

    this.color = d3.scale.category10().domain(types);

    this.line = d3.svg.line()
      .x(d => xScale(d.start_dow + '_' + d.start_hour))
      .y(d => yScale(d[type]));
  }

  componentDidMount() {
  }

  render() {

    const { type, values } = this.props;

    return (
      <path stroke={this.color(type)} fill="none" d={this.line(values)} />
    );
  }
}

export default VisitorFrequencyLine;

//a scale which maps a width to a key of start_dow + start_hour
//a scale which maps a height to the maximum count of all entries


