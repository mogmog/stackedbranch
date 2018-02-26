import Leaflet from 'leaflet';
import { MapLayer } from 'react-leaflet';
import 'leaflet-d3-svg-overlay';
import polylabel from '@mapbox/polylabel';
import React from 'react';
import styles from './BattlegroundLabel.less';

class BattlegroundLabel extends MapLayer {

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
    const { feature } = this.props;

    if (this.svg && this.projection && feature) {

      const center = (polylabel(feature.geometry.coordinates[0]));

      this.svg.selectAll('g').remove();

      const g = this.svg.append('g')

      g.append('text').text(feature.properties.name)
        .attr('font-family', "telefonica_text" )
        .attr('font-size', 24 )
        .attr('transform', `translate(50, 30)`)
        .attr("fill", "#FFF")
        .attr("class", styles.battlegroundlabel)
        .attr('x', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).x)
        .attr('y', (d) => this.projection.latLngToLayerPoint([center[1], center[0]]).y)
    }

    return null;
  }
}

export default BattlegroundLabel;
