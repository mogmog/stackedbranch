import React, { PureComponent } from 'react';
import { Map, TileLayer, GeoJSON, CircleMarker, Marker, Tooltip, Popup} from 'react-leaflet';
import polylabel from '@mapbox/polylabel';
import * as d3 from 'd3';

import ZoomControl from '../../../Common/Mapping/ZoomControl';
import Choropleth from '../../../Common/Mapping/Choropleth';
import StoreIcon from '../../../Common/Mapping/StoreIcon';

import DistrictVisitorsPopup from './DistrictVisitorsPopup';
import DistrictLabels from './DistrictLabels';
import FeatureHighlight from './FeatureHighlight';
import styles from './DistrictVisitorMap.less';

var districts = require('json!./../../../../assets/mapping/geojson/madrid_districts.geo');


class RegionChooserMap extends PureComponent {

  state = {zoom : 10};

  districtHover(feature) {
    this.setState({'highlightedfeature' : feature});
  }

  onZoomEvent(e) {
    this.setState({zoom : e.target.getZoom()});
  }

  render() {

    const {data, type, districtClick, districtHover} = this.props;

    const style = (x) => {

      const v = getMatch(x.properties.name);

     return {
       fillColor: 'white',
       weight: 2,
       opacity: 0.5,
       color: 'white',
       fillOpacity: v.percentage * 10,
     };
    }

    const getMatch = function(name) {

      const sum = _(data[type].list).sumBy(x => x.visitors);
      let obj = {found : false, name : '', visitors : 0, percentage : 0};
      const found = data[type].list.find((x) => x.district_name === name);
      if (found) {
        obj.found = true;
        obj.name =  found.name;
        obj.visitors = found.visitors;
        obj.percentage = ((found.visitors/sum)) ? (found.visitors/sum) : 0;
      }

      return obj;
    }

    return (
      <div style={{'width' : '100%'}} className={`zoom_${this.state.zoom}`}>
        <Map  onZoomend={this.onZoomEvent.bind(this)} attributionControl={false} ref={ (map) => this.map = map } zoomControl={false} center={[40.458527, -3.691853]} zoom={10} style={{ 'height': '280px'}}>

            <ZoomControl map={this.map}/>

            <TileLayer url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png'/>

            <Choropleth
                        onClick={(feature) => {districtClick(feature)}}
                        onMouseOver={(feature) => this.districtHover(feature)}
                        data={districts}
                        valueProperty={(feature) => { return getMatch(feature.properties.name).visitors; }}
                        visible={(feature) => { return getMatch(feature.properties.name).found;  }}

             scale={['#FF77FF', '#7F387F' ]}
             steps={20}
             style={style}
             mode='e'

             />

          <Marker position={[40.408527, -3.641853]} icon={StoreIcon}/>

          <div className={styles.no_pointer} >
            <DistrictLabels zoom={ this.state.zoom } districts={districts}  data={data[type].list} map={this.map}/>
          </div>

          <FeatureHighlight map={this.map} highlightedfeature={this.state.highlightedfeature}/>

          {this.state.highlightedfeature &&

          <DistrictVisitorsPopup highlightedfeature={this.state.highlightedfeature}>
            <ul>
              <li> <strong>Zone: </strong> {this.state.highlightedfeature.properties.name}</li>

              {getMatch(this.state.highlightedfeature.properties.name).visitors &&

              <span>
                <li><strong>Total Percentage: </strong>{d3.format('.1%')(getMatch(this.state.highlightedfeature.properties.name).percentage)} </li>
                <li> <strong>Visitors: </strong> {getMatch(this.state.highlightedfeature.properties.name).visitors} </li>
              </span>
              }


            </ul>
          </DistrictVisitorsPopup>
          }

        </Map>
      </div>
    );
  }
}

export default RegionChooserMap;







