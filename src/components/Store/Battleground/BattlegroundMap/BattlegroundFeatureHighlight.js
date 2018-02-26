import Leaflet from 'leaflet';
import {MapLayer} from 'react-leaflet';
import 'leaflet-d3-svg-overlay';
import _ from 'lodash';
import d3 from 'd3';
import polylabel from '@mapbox/polylabel';
import React from 'react';
import ReactDOM from 'react-dom';

class BattlegroundFeatureHighlight extends MapLayer {

  hasRun = false;

  componentWillMount() {

    let that = this;

    that.leafletElement = Leaflet.d3SvgOverlay((svg, projection) => {
      that.svg = svg;
      that.projection = projection;
    });

    if (this.props.map) this.leafletElement.addTo(this.props.map);
  }

  componentWillUnmount() {
    this.leafletElement.remove();
  }

  render() {
    const { highlightedfeature } = this.props;

    if (this.svg && this.projection && highlightedfeature) {

      const center = (polylabel(highlightedfeature.geometry.coordinates[0]));

      this.svg.selectAll('g').remove();

      const g = this.svg.append('g')

      g.append('path').attr('d', this.projection.pathFromGeojson(highlightedfeature)).attr('fill-opacity', 0.0).attr('stroke', 'blue').attr('stroke-width', 3).attr('stroke-opacity', 0.2);

      /*g.append('text').text(highlightedfeature.properties.name)
        .attr('font-family', "telefonica_text" )
        .attr('font-size', 18 )
        .attr('transform', `translate(${highlightedfeature.properties.name.length * -3.2}, 30)`)
        .attr("fill", "#FFF")
        .attr('x', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).x)
        .attr('y', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).y)*/

     /*g.append("rect")
        .attr('x', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).x)
        .attr('y', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).y)
        .attr('width', 20)
        .attr('height', 6)
        .attr('transform', `translate(0, 2)`)*/

      /*
      g.append('text').text(highlightedfeature.properties.name)
        .attr('font-family', "telefonica_text" )
        .attr('font-size', 4 )
        .attr('transform', `translate(${highlightedfeature.properties.name.length /2}, 6)`)
        .attr("fill", "#FFF")
        .attr('x', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).x)
        .attr('y', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).y)*/

    }
    return null;
  }
}

export default BattlegroundFeatureHighlight;
