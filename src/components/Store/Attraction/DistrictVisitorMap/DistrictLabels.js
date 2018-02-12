import Leaflet from 'leaflet';
import {MapLayer} from 'react-leaflet';
import 'leaflet-d3-svg-overlay';
import _ from 'lodash';
import polylabel from '@mapbox/polylabel';
import React from 'react';
import ReactDOM from 'react-dom';
import DistrictLabel from './DistrictLabel';

class DistrictLabels extends MapLayer {

  hasRun = false;

  componentWillReceiveProps() {
  }


  componentWillMount() {

    let that = this;

    const {data, districts} = this.props;

    const findDistrict = (name) => {
      return _(districts.features).find(district => district.properties.name === name);
    }


    that.leafletElement = Leaflet.d3SvgOverlay((svg, projection) => {

        that.svg = svg;
        that.projection = projection;

        const elements = [];
        const sum = _(data).sumBy(x => x.visitors);
        data.forEach((thing) => {

          const district = findDistrict(thing.district_name, districts);

          if (district) {
           const center = (polylabel(district.geometry.coordinates[0]));
           elements.push(<DistrictLabel text={d3.format(".01%")(thing.visitors/sum)} latlng={[center[0], center[1]]} projection={projection}/>);
          }
        });




          ReactDOM.render(elements, svg[0][0]);


        this.leafletElement.addTo(this.context.map);
    });


  }


  render() {
    return null;
  }
}

export default DistrictLabels;
