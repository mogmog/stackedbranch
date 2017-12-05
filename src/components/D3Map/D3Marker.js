import _ from 'lodash';
import Leaflet from 'leaflet';
import {MapLayer} from 'react-leaflet';
import 'leaflet.markercluster';
import 'leaflet-d3-svg-overlay';
import d3 from 'd3';

// This is an array of source/target pairs.
// Each location array is in the order of longitude and then latitude.
// You often see these as lat/lng but since we need this to be in math format we do them in lng/lat, which is x/y.
// You could also nest this data and change what object you bind your data to save space. There's no single correct way.
// Do what is best for your data and for your deadlines.
var arcdata = [
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-106.503961875, 33.051502817366334]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-97.27544625, 34.29490081496779]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-92.793024375, 34.837711658059135]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-100.3076728125, 41.85852354782116]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-104.6143134375, 43.18636214435451]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-106.152399375, 45.57291634897]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-105.5811103125, 42.3800618087319]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-74.610651328125, 42.160561343227656]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-78.148248984375, 40.20112201100485]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-81.795709921875, 39.89836713516883]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-91.738336875, 42.1320516230261]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-93.902643515625, 39.89836713516886]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-146.68645699218752, 62.84587613514389]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-151.03704292968752, 62.3197734579205]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-150.50969917968752, 68.0575087745829]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-155.58278180000002, 19.896766200000002]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-155.41249371406252, 19.355435189875685]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-156.22204876777346, 20.77817385333129]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-156.08334637519533, 20.781383752662176]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-119.41793240000001, 36.77826099999999]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-111.73848904062501, 34.311442605956636]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-118.62691677500001, 39.80409417718468]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-115.56173122812501, 44.531552843807575]
  },
  {
    sourceLocation: [-99.5606025, 41.068178502813595],
    targetLocation: [-107.13521755625001, 43.90164233696157]
  }
]

class D3MarkerCluster extends MapLayer {
  componentWillMount() {



    this.leafletElement = Leaflet.d3SvgOverlay((svg, projection) => {

      var OD_PAIRS = [
        ["NRT", "JFK"],
        ["SFO", "NRT"],
        ["LAX", "HNL"],
        ["HNL", "NRT"],
        ["CDG", "JFK"],
        ["NRT", "SYD"],
        ["FCO", "PEK"],
        ["LHR", "PVG"],
        ["NRT", "ARN"],
        ["LAX", "JFK"],
        ["NRT", "DEL"],
        ["DFW", "GRU"],
        ["MAD", "ATL"],
        ["ORD", "CAI"],
        ["HKG", "CDG"],
        ["LAS", "CDG"],
        ["NRT", "SVO"],
        ["DEN", "HNL"],
        ["ORD", "LAX"],
        ["SIN", "SEA"],
        ["SYD", "PEK"],
        ["CAI", "CPT"],
        ["CUN", "JFK"],
        ["ORD", "JFK"],
        ["LHR", "BOM"],
        ["LAX", "MEX"],
        ["LHR", "CPT"],
        ["PVG", "CGK"],
        ["SYD", "BOM"],
        ["JFK", "CPT"],
        ["MAD", "GRU"],
        ["EZE", "FCO"],
        ["DEL", "DXB"],
        ["DXB", "NRT"],
        ["GRU", "MIA"],
        ["SVO", "PEK"],
        ["YYZ", "ARN"],
        ["LHR", "YYC"],
        ["HNL", "SEA"],
        ["JFK", "EZE"],
        ["EZE", "LAX"],
        ["CAI", "HKG"],
        ["SVO", "SIN"],
        ["IST", "MCO"],
        ["MCO", "LAX"],
        ["FRA", "LAS"],
        ["ORD", "FRA"],
        ["MAD", "JFK"]
      ];

      var currentWidth = 500;
      var width = 938;
      var height = 620;


      var airportMap = {};

      function transition(plane, route) {
        var l = route.node().getTotalLength();
        plane.transition()
          .duration(l * 50)
          .attrTween("transform", delta(plane, route.node()))
          .each("end", function() { route.remove(); })
          .remove();
      }

      function delta(plane, path) {
        var l = path.getTotalLength();
        var plane = plane;
        return function(i) {
          return function(t) {
            var p = path.getPointAtLength(t * l);

            var t2 = Math.min(t + 0.05, 1);
            var p2 = path.getPointAtLength(t2 * l);

            var x = p2.x - p.x;
            var y = p2.y - p.y;
            var r = 90 - Math.atan2(-y, x) * 180 / Math.PI;

            var s = Math.min(Math.sin(Math.PI * t) * 0.7, 0.3);

            return "translate(" + p.x + "," + p.y + ") scale(" + s + ") rotate(" + r + ")";
          }
        }
      }

      function fly(origin, destination) {
        var route = svg.append("path")
          .datum({type: "LineString", coordinates: [airportMap[origin], airportMap[destination]]})
          .attr("class", "route")
          .attr("d", projection.pathFromGeojson);

        var plane = svg.append("path")
          .attr("class", "plane")
          .attr("d", "m25.21488,3.93375c-0.44355,0 -0.84275,0.18332 -1.17933,0.51592c-0.33397,0.33267 -0.61055,0.80884 -0.84275,1.40377c-0.45922,1.18911 -0.74362,2.85964 -0.89755,4.86085c-0.15655,1.99729 -0.18263,4.32223 -0.11741,6.81118c-5.51835,2.26427 -16.7116,6.93857 -17.60916,7.98223c-1.19759,1.38937 -0.81143,2.98095 -0.32874,4.03902l18.39971,-3.74549c0.38616,4.88048 0.94192,9.7138 1.42461,13.50099c-1.80032,0.52703 -5.1609,1.56679 -5.85232,2.21255c-0.95496,0.88711 -0.95496,3.75718 -0.95496,3.75718l7.53,-0.61316c0.17743,1.23545 0.28701,1.95767 0.28701,1.95767l0.01304,0.06557l0.06002,0l0.13829,0l0.0574,0l0.01043,-0.06557c0,0 0.11218,-0.72222 0.28961,-1.95767l7.53164,0.61316c0,0 0,-2.87006 -0.95496,-3.75718c-0.69044,-0.64577 -4.05363,-1.68813 -5.85133,-2.21516c0.48009,-3.77545 1.03061,-8.58921 1.42198,-13.45404l18.18207,3.70115c0.48009,-1.05806 0.86881,-2.64965 -0.32617,-4.03902c-0.88969,-1.03062 -11.81147,-5.60054 -17.39409,-7.89352c0.06524,-2.52287 0.04175,-4.88024 -0.1148,-6.89989l0,-0.00476c-0.15655,-1.99844 -0.44094,-3.6683 -0.90277,-4.8561c-0.22699,-0.59493 -0.50356,-1.07111 -0.83754,-1.40377c-0.33658,-0.3326 -0.73578,-0.51592 -1.18194,-0.51592l0,0l-0.00001,0l0,0z");

        //console.log(plane, route);

        transition(plane, route);
      }

      function loaded(error, countries, airports) {



        svg.append("g")
          .attr("class", "airports")
          .selectAll("path")
          .data(topojson.feature(airports, airports.objects.airports).features)
          .enter()
          .append("path")
          .attr("id", function(d) {return d.id;})
          .attr("d", projection.pathFromGeojson)

        var geos = topojson.feature(airports, airports.objects.airports).features;

        for (i in geos) {
          airportMap[geos[i].id] = [1, 2];//[projection.latLngToLayerPoint(geos[i].geometry.coordinates).x, projection.latLngToLayerPoint(geos[i].geometry.coordinates).y];
        }

        console.log(airportMap);

        var i = 0;
        setInterval(function() {
          if (i > OD_PAIRS.length - 1) {
            i = 0;
          }
          var od = OD_PAIRS[i];
          fly(od[0], od[1]);
          i++;
        }, 150);
      }

      const countries = require("../../assets/countries2.topo.json");
      const airports = require("../../assets/airports2.topo.json");
      loaded(undefined, countries, airports);






    });

    this.leafletElement.addTo(this.context.map);
  }

  componentWillUnmount() {
    super.componentWillMount();
    this.leafletElement.remove();
  }

  render() {
    return null;
  }
}

D3MarkerCluster.defaultProps = {
}

export default D3MarkerCluster;
