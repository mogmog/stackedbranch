import _ from 'lodash';
import Leaflet from 'leaflet';
import { MapLayer } from 'react-leaflet';
import 'leaflet.markercluster';
import 'leaflet-d3-svg-overlay';
//import citiesdata from './../../assets/cities.csv';

class D3MarkerCluster extends MapLayer {
  componentWillMount() {

    const options = _.extend({}, D3MarkerCluster.defaultProps.options, this.props.options);
    const {spiderfyOnMaxZoom, showCoverageOnHover, zoomToBoundsOnClick, maxClusterRadius, opacity, chunkedLoading, removeOutsideVisibleBounds} = options;

    this.leafletElement = Leaflet.markerClusterGroup(
      {
        spiderfyOnMaxZoom: spiderfyOnMaxZoom,
        showCoverageOnHover: showCoverageOnHover,
        zoomToBoundsOnClick: zoomToBoundsOnClick,
        maxClusterRadius: maxClusterRadius,
        opacity: opacity,
        chunkedLoading: chunkedLoading,
        removeOutsideVisibleBounds: removeOutsideVisibleBounds,
      }
    )
    const { data, focusMarker } = this.props;

    const that = this;

    const Esri_WorldTopoMap = L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });
    Esri_WorldTopoMap.addTo(that.context.map);

    let cities = [];

    const citiesOverlay = L.d3SvgOverlay(function(sel,proj){

      var minLogPop = Math.log2(d3.min(cities,function(d){return d.population;}));
      var citiesUpd = sel.selectAll('circle').data(cities);
      citiesUpd.enter()
        .append('circle')
        .attr('r',function(d){return Math.log2(d.population) - minLogPop + 2;})
        .attr('cx',function(d){return proj.latLngToLayerPoint(d.latLng).x;})
        .attr('cy',function(d){return proj.latLngToLayerPoint(d.latLng).y;})
        .attr('stroke','black')
        .attr('stroke-width',1)
        .attr('fill',function(d){return (d.place == 'city') ? "red" : "blue";});
    });

    var citiesdata = [];

    citiesdata.push({place : 'town', name : 'Meyrin', population : 22431, lng : 6.0817791, lat : 46.2345413});
    citiesdata.push({place : 'town', name : 'TEEST', population : 45, lng : 6.0127791, lat : 46.2332413});
    citiesdata.push({place : 'town', name : 'R$TDF', population : 7323, lng : 6.0816491, lat : 46.6728413});
    citiesdata.push({place : 'town', name : 'DFDF', population : 1244, lng : 6.0347791, lat : 46.2328413});
    citiesdata.push({place : 'town', name : 'FDGFDG', population : 5734, lng : 6.1817791, lat : 46.2328413});

    console.log(citiesdata);

      cities = citiesdata.map(function(d){
        d.latLng = [+d.lat,+d.lng];
        d.population = (d.population == '') ? 2000 : +d.population;
        return d;
      });



      citiesOverlay.addTo(that.context.map);
  }

  componentWillUnmount() {
    super.componentWillMount();
    this.leafletElement.remove();
  }

  componentWillReceiveProps(nextProps) {
    const {data, focusMarker} = nextProps;
  }

  render() {
    return null;
  }
}

D3MarkerCluster.defaultProps = {
  data: [],
  focusMarker: {},
  options: {
    spiderfyOnMaxZoom: true,
    showCoverageOnHover: false,
    zoomToBoundsOnClick: true,
    maxClusterRadius: 30,
    opacity: 1,
    chunkedLoading: true,
    removeOutsideVisibleBounds: true,
  },
}

export default D3MarkerCluster;
