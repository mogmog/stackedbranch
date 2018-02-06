import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import * as d3 from 'd3';
import styles from './HourBar.less';

class Timescale extends Component {

  componentDidUpdate () { this.renderAxis(); }
  componentDidMount () { this.renderAxis(); }

  renderAxis () {
    var node = ReactDOM.findDOMNode(this);
    d3.select(node).call(d3.svg.axis().scale(this.props.scale));
  }

  render () {

    return (
          <g transform={'translate(5, 0)'} className={styles.axis} />
    );
  }

}

export default Timescale;


