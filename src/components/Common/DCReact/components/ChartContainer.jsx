import React, { Component } from 'react';


export default class ChartContainer extends Component {


  state = {
    crossfilterContext: null
  };

  componentDidMount() {
    //this.props.crossfilterContext(crossfilterContext => this.setState({ crossfilterContext }));
  }

  getChildContext() {
    return { crossfilterContext: this.state.crossfilterContext };
  }

  render() {

    return (
      <div className={this.props.className}>
        {this.props.children}
      </div>
    );
  }
}
