import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';

class YMiniAxis extends Component {

  componentDidUpdate () { this.renderAxis(); }
  componentDidMount () { this.renderAxis(); }

  renderAxis () {
    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(d3.svg.axis().scale(this.props.yScale).orient("right"));
  }

  render () {

    var translate = "translate(600,"+(0)+")";

    return (
      <g className="axis"  >
      </g>
    );
  }

}

export default YMiniAxis;


