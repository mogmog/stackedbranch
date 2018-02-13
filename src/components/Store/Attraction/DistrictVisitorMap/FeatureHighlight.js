import Leaflet from 'leaflet';
import {MapLayer} from 'react-leaflet';
import 'leaflet-d3-svg-overlay';
import _ from 'lodash';
import d3 from 'd3';
import polylabel from '@mapbox/polylabel';
import React from 'react';
import ReactDOM from 'react-dom';

import DistrictLabel from './DistrictLabel';

class FeatureHighlight extends MapLayer {

  hasRun = false;

  componentWillReceiveProps() {
  }


  componentWillMount() {

    let that = this;



    that.leafletElement = Leaflet.d3SvgOverlay((svg, projection) => {
      that.svg = svg;
      that.projection = projection;
    });

    if (this.props.map) this.leafletElement.addTo(this.props.map);

  }


  render() {
    const { highlightedfeature } = this.props;

    if (this.svg && this.projection && highlightedfeature) {

      const center = (polylabel(highlightedfeature.geometry.coordinates[0]));

      const projection = this.projection;

      this.svg.selectAll('g').remove();

      const g = this.svg.append('g')

      g.append('path').attr('class', 'test').attr('d', projection.pathFromGeojson(highlightedfeature)).attr('fill', 'purple').attr('opacity', 0.5);

      g.append("rect")
        .attr('x', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).x)
        .attr('y', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).y)
        .attr('width', highlightedfeature.properties.name.length * 3)
        .attr('height', 6)
        .attr('transform', `translate(0, 2)`)

      g.append('text').text(highlightedfeature.properties.name)
        .attr('font-family', "telefonica_text" )
        .attr('font-size', 4 )
        .attr('transform', `translate(${highlightedfeature.properties.name.length /2}, 6)`)
        .attr("fill", "#FFF")
        .attr('x', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).x)
        .attr('y', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).y)

    }
    return null;
  }
}

export default FeatureHighlight;
