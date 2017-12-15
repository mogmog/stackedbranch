import React, { Component } from 'react';
import { Button } from 'antd';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { scaleLinear } from 'd3-scale';
import { transition } from 'd3-transition';
import { easeLinear } from 'd3-ease';
import _ from 'lodash';

class HourlyCountryThing extends Component {

  constructor(props) {
    super(props);
    this.createTimeBar = this.createTimeBar.bind(this);
  }

  componentDidMount() {
    this.createTimeBar();
  }

  componentDidUpdate() {
    this.createTimeBar();
  }

  componentWillReceiveProps(props) {
    if (props.split) {
      this.animateDown(props.index);
    } else {
      this.animateDown(0);
    }
  }

  animateDown(index) {
    select(this.node)
      .selectAll('rect')
      .transition()
      .ease(easeLinear)
      .duration(2000)
      .attr('y', index * 10);
  }

  createTimeBar() {

    const { node } = this;

    const { data, split } = this.props;

    console.log(data);

    const xScale       = scaleLinear().domain([0, 24]).range([0, 850]);
    const opacityScale = scaleLinear()
                         .domain([_(data).minBy(x => x.count).count, 50])
                         .range([0.05, 0.9]);

    select(node)
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect');

    select(node)
      .selectAll('rect')
      .data(data)
      .exit()
      .remove();

    select(node)
      .selectAll('rect')
      .data(data)
      .style('fill', '#fe9922')
      .attr('x', (d, i) => xScale(i))
      .attr("transform", "translate(" + 0 + "," + (split * 0) + ")")
      .attr('y', 0)
      .attr('height', 7)
      .attr('width', 16)
      .style('opacity', d => opacityScale(d.count));
  }

  render() {
    return (
        <g ref={node => this.node = node} />
    );
  };
}

export default HourlyCountryThing;
