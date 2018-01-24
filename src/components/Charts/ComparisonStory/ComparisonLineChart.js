import React, {Component} from 'react';
import * as d3 from 'd3';
import { Button } from 'antd';

import DataSeries from './DataSeries';
import DateBars from './DateBars';
import Axis from './Axis';
import Area from './Area';
import {Motion, spring} from 'react-motion';

class ComparisonLineChart extends Component {

  state = {
    open : 0,
  }

  n = 21;

  dataset = d3.range(this.n).map(() => ({'y': Math.random()}));

  handleMouseDown = () => {
    this.setState({open: this.state.open + 60});
  };

  handleTouchStart = (e) => {
    e.preventDefault();
    this.handleMouseDown();
  };

  render() {
    const {width, height, dates } = this.props;

    const xScale = d3.scale.linear().domain([0, this.n - 1]).range([0, width]);
    const xScaleDate = d3.scale.linear().domain([new Date('1 January 2018'), new Date('1 January 2019')]).range([0, width]);
    const yScale = d3.scale.linear().domain([0, 1]).range([height, 0]);

    //dataset = [{"y": 0.44060746702104625}, {"y": 0.7114784592805499}, {"y": 0.6299934830796388}, {"y": 0.8689470074489289}, {"y": 0.4733937451980188}, {"y": 0.6281202496814209}, {"y": 0.6742948872679133}, {"y": 0.0861252511803996}, {"y": 0.16170790749359565}, {"y": 0.6446700951850746}, {"y": 0.6398648185624944}, {"y": 0.7539847166009166}, {"y": 0.6432874757404179}, {"y": 0.8519115177364385}, {"y": 0.586265518652181}, {"y": 0.821096547933831}, {"y": 0.7991501744445528}, {"y": 0.5120610625803386}, {"y": 0.5806461763063528}, {"y": 0.9121547822351055}, {"y": 0.13871289161104094}];

    //let dates = [{'text': 'M4 closed', from: 4, to: 6.5}, {'text': 'Sale', from: 18, to: 19}];

    return (

      <div>

        <Button
          onMouseDown={this.handleMouseDown.bind(this)}
          onTouchStart={this.handleTouchStart.bind(this)}>
          Toggle
        </Button>





        <svg width={width} height={height}>

          <Motion style={{reveal: spring(this.state.open)}}>
            {
              ({reveal}) =>

                <DataSeries
                  dataset={this.dataset}
                  xScale={xScale}
                  yScale={yScale}
                  width={width}
                  height={height}
                  x={reveal}
                />
            }
          </Motion>

          <DateBars xScale={xScaleDate} dates={dates}/>

          <Axis h={height / 2} xScale={xScale} axisType="x"/>

        </svg>
      </div>
    );
  }

}

export default ComparisonLineChart;
