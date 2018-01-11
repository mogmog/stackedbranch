import React from 'react';
import { Map, TileLayer, Circle, FeatureGroup, Polygon } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import D3Marker from './D3Marker';
import Leaflet from "leaflet";

const mapOptions = {
  center: [51.545, -0.01],
  zoom: 10,
  maxZoom: 18,
  minZoom: 1,
  zoomControl: true,
  width: 100
}

const tileOptions = {
  continuousWorld: false
}

Leaflet.VirtualGrid = Leaflet.FeatureGroup.extend({
  include: Leaflet.Mixin.Events,
  options: {
    cellSize: 64,
    delayFactor: 3.5,
    style: {
      stroke: true,
      color: '#3ac1f0',
      dashArray: null,
      lineCap: null,
      lineJoin: null,
      weight: 2,
      opacity: 1,

      fill: true,
      fillColor: null, //same as color by default
      fillOpacity: 0.5,

      clickable: true
    }
  },
  initialize: function(options){
    Leaflet.Util.setOptions(this, options);
    Leaflet.FeatureGroup.prototype.initialize.call(this, [], options);
  },
  onAdd: function(map){
    Leaflet.FeatureGroup.prototype.onAdd.call(this, map);
    this._map = map;
    this._cells = [];
    this._setupGrid(map.getBounds());

    map.on("move", this._moveHandler, this);
    map.on("zoomend", this._zoomHandler, this);
    map.on("resize", this._resizeHandler, this);
  },
  onRemove: function(map){
    Leaflet.FeatureGroup.prototype.onRemove.call(this, map);
    map.off("move", this._moveHandler, this);
    map.off("zoomend", this._zoomHandler, this);
    map.off("resize", this._resizeHandler, this);
  },
  _clearLayer: function(e) {
    this._cells = [];
  },
  _moveHandler: function(e){
    this._renderCells(e.target.getBounds());
  },
  _zoomHandler: function(e){
    this.clearLayers();
    this._renderCells(e.target.getBounds());
  },
  _renderCells: function(bounds) {
    var cells = this._cellsInBounds(bounds);
    this.fire("newcells", cells);
    for (var i = cells.length - 1; i >= 0; i--) {
      var cell = cells[i];
      if(this._loadedCells.indexOf(cell.id) === -1){
        (function(cell, i){
          setTimeout(this.addLayer.bind(this, Leaflet.rectangle(cell.bounds, this.options.style)), this.options.delayFactor*i);
        }.bind(this))(cell, i);
        this._loadedCells.push(cell.id);
      }
    }
  },
  _resizeHandler: function(e) {
    this._setupSize();
  },
  _setupSize: function(){
    this._rows = Math.ceil(this._map.getSize().x / this._cellSize);
    this._cols = Math.ceil(this._map.getSize().y / this._cellSize);
  },
  _setupGrid: function(bounds){
    this._origin = this._map.project(bounds.getNorthWest());
    this._cellSize = this.options.cellSize;
    this._setupSize();
    this._loadedCells = [];
    this.clearLayers();
    this._renderCells(bounds);
  },
  _cellPoint:function(row, col){
    var x = this._origin.x + (row*this._cellSize);
    var y = this._origin.y + (col*this._cellSize);
    return new Leaflet.Point(x, y);
  },
  _cellExtent: function(row, col){
    var swPoint = this._cellPoint(row, col);
    var nePoint = this._cellPoint(row-1, col-1);
    var sw = this._map.unproject(swPoint);
    var ne = this._map.unproject(nePoint);
    return new Leaflet.LatLngBounds(ne, sw);
  },
  _cellsInBounds: function(bounds){
    var offset = this._map.project(bounds.getNorthWest());
    var center = bounds.getCenter();
    var offsetX = this._origin.x - offset.x;
    var offsetY = this._origin.y - offset.y;
    var offsetRows = Math.round(offsetX / this._cellSize);
    var offsetCols = Math.round(offsetY / this._cellSize);
    var cells = [];
    for (var i = 0; i <= this._rows; i++) {
      for (var j = 0; j <= this._cols; j++) {
        var row = i-offsetRows;
        var col = j-offsetCols;
        var cellBounds = this._cellExtent(row, col);
        var cellId = row+":"+col;
        cells.push({
          id: cellId,
          bounds: cellBounds,
          distance:cellBounds.getCenter().distanceTo(center)
        });
      }
    }
    cells.sort(function (a, b) {
      return a.distance - b.distance;
    });
    return cells;
  }
});

Leaflet.virtualGrid = function(url, options){
  return new Leaflet.VirtualGrid(options);
};


class D3Map extends React.Component {

  componentDidMount() {
    //Leaflet.graticule({ interval: 0.01 }).addTo(this.map.leafletElement);



  }

  render() {

    if (this.map) Leaflet.virtualGrid({
      cellSize: 32,
    }).addTo(this.map.leafletElement);


    return (
      <Map ref={Map => this.map = Map} {...mapOptions}>

        {this.props.children}

      {/*  <D3Marker />*/}
        <TileLayer options={tileOptions} url='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
      </Map>
    );
  }
}

export default D3Map;
