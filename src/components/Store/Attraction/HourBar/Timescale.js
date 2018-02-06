import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import styles from './HourBar.less';

class Timescale extends Component {

  componentDidUpdate () { this.renderAxis(); }
  componentDidMount () { this.renderAxis(); }

  renderAxis () {
    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(d3.svg.axis().scale(this.props.scale).ticks(12).tickFormat((d, i) => (i % 2 === 0 ? `${d}h` : '')));
  }


  //axis.tickFormat((d) => {console.log(d);return `${d}h`});
 // axis.ticks(d => {console.log(d)})

  render () {

    return (
          <g className={styles.axis} />
    );
  }

}

export default Timescale;


