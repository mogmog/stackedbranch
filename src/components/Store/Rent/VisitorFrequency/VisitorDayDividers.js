import React, {Component} from 'react';
import * as d3 from 'd3';

class VisitorDayDividers extends Component {

  constructor(props) {
    super();
  }

  componentWillMount() {
    const { xScale, values } = this.props;
  }

  componentDidMount() {
  }

  render() {

    const { xScale, values, height, opacity , color} = this.props;


    return (
      <g transform={`translate(0,${-1 * height})`}>
        {values.map((x, i)=> (<rect key={i} x={xScale(x.start_dow)} y={0} height={height} width={5} opacity={opacity} fill={color}> </rect>))}
      </g>
    )
  }
}

export default VisitorDayDividers;


