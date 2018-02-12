import React, {Component} from 'react';
import * as d3 from 'd3';

class DistrictLabel extends Component {

  constructor(props) {
    super();
  }

  render() {

    const point = (this.props.projection.latLngToLayerPoint([this.props.latlng[1], this.props.latlng[0]]));
    const fontsize = this.props.projection.scale >=4 ?  16.0/this.props.projection.scale : 6;

    return (
      <g>

          <text fontSize={fontsize}  x={point.x} y={point.y} >
            {this.props.text}
          </text>



      </g>
    );
  }
}

export default DistrictLabel;
