import React, {Component} from 'react';
import * as d3 from 'd3';

import DataSeries from './DataSeries';
import DateBars from './DateBars';
import Axis from './Axis';
import Area from './Area';

class LineChart extends Component {

  render() {
    let { width, height, data, x } = this.props;

    let n = 21;

    var xScale = d3.scale.linear()
      .domain([0, n-1]) // input
      .range([0, width]); // output

    // 6. Y scale will use the randomly generate number
    var yScale = d3.scale.linear()
      .domain([0, 1]) // input
      .range([height, 0]); // output

    var xAxis = d3.svg.axis().scale(xScale);

    var dataset = d3.range(21).map(function(d) { return {"y":  Math.random() } });

    dataset = [{"y":0.44060746702104625},{"y":0.7114784592805499},{"y":0.6299934830796388},{"y":0.8689470074489289},{"y":0.4733937451980188},{"y":0.6281202496814209},{"y":0.6742948872679133},{"y":0.0861252511803996},{"y":0.16170790749359565},{"y":0.6446700951850746},{"y":0.6398648185624944},{"y":0.7539847166009166},{"y":0.6432874757404179},{"y":0.8519115177364385},{"y":0.586265518652181},{"y":0.821096547933831},{"y":0.7991501744445528},{"y":0.5120610625803386},{"y":0.5806461763063528},{"y":0.9121547822351055},{"y":0.13871289161104094}];

    let dates = [{'text' : 'M4 closed', from : 5.5, to : 6.5}, {'text' : 'Sale', from : 18, to : 19}];

    return (
      <svg width={width} height={height}>

        <DataSeries
          dataset={dataset}
          xScale={xScale}
          yScale={yScale}
          width={width}
          height={height}
          x={x}
        />

        <DateBars xScale={xScale} dates={dates}/>



       {/* <Area fill="white" clipid="ellipse-clip1" data={dataset} width={width} height={height} xScale={xScale} yScale={yScale}>
        </Area>*/}
        <Axis h={height/2} axis={xAxis} axisType="x"/>
        {/*<Area fill="green" clipid="ellipse-clip2" data={dataset} width={width} height={height} xScale={xScale} yScale={yScale}>

          <clipPath id="ellipse-clip2" >
            <rect fill="white" x={0} y={height/2} width={width} height={height/2}/>
          </clipPath>

        </Area>*/}

      </svg>
    );
  }

}

export default LineChart;
