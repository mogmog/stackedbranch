import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class Axis extends Component {

  componentDidUpdate () { this.renderAxis(); }
  componentDidMount () { this.renderAxis(); }

  renderAxis () {
    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(d3.svg.axis().scale(this.props.xScale));
  }

  render () {

    var translate = "translate(0,"+(this.props.h)+")";

    return (
      <g className="axis" transform={this.props.axisType=='x'?translate:""} >
      </g>
    );
  }

}

export default Axis;


