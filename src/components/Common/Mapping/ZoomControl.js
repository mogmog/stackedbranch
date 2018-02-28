import React, { PureComponent } from 'react';
import Control from 'react-leaflet-control';
import ReactSVG from 'react-svg';

class ZoomControl extends PureComponent {

  zoomIn() {if(this.props.map) {
    let currentZoom = this.props.map.leafletElement.getZoom();
    this.props.map.leafletElement.setZoom(++currentZoom);
  }}

  zoomOut() {if(this.props.map) {
    let currentZoom = this.props.map.leafletElement.getZoom();
    this.props.map.leafletElement.setZoom(--currentZoom);
  }}

  render() {

    const { map } = this.props;

    return (
      <Control position="topleft" >
        <div>
          <span onClick={this.zoomIn.bind(this)} >
            <ReactSVG path={require(`./../../../assets/svg/ic-zoom-in.svg`)}  />
          </span>

          <span onClick={this.zoomOut.bind(this)} >
            <ReactSVG path={require(`./../../../assets/svg/ic-zoom-out.svg`)}  />
          </span>

        </div>

      </Control>
    );
  }
}

export default ZoomControl;







