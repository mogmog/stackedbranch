import React, { Component, PropTypes } from 'react';
import { ChartPropertyHelper } from './helpers';

export let Base = DCComponent => class extends Component {

  dcHelper = (dcComponent, dcChart, loadDefault = true) => {
    let helper = new ChartPropertyHelper(dcComponent, dcChart);
    if (loadDefault) {
      helper.setProperties('width', 'height', 'title', 'label',
                           'transitionDuration', 'margins', 'mouseZoomable',
                           'legend')
            .setContextProperties('dimension', 'group');
    }
    if (dcComponent.props.setChart) {
      dcComponent.props.setChart(dcChart);
    }

    return helper;
  };

  render() {
    return <DCComponent {...this.props}
                        crossfilterContext={this.context.crossfilterContext}
                        chartHelper={this.dcHelper} />;
  }
};
