import React from 'react';
import { Router, Route } from 'dva/router';
import crossfilter from 'crossfilter2/crossfilter';
import { Spin, Row, Col, Card } from 'antd';
import moment from 'moment';
import request from '../../../utils/request';

import HeatmapLayer from 'react-leaflet-heatmap-layer';

import d3 from 'd3';
import dc from 'dc';
import { Map, TileLayer, FeatureGroup, Marker } from 'react-leaflet';

import {
  ChartContainer,
  PieChart,
  RowChart,
  BubbleChart,
  DataTable,
  DataCount,
  BarChart,
  LineChart,
  DetailMap
} from './../../DCReact/components';

class Testing extends React.Component {
  constructor() {
    super();

    this.state = {

    };
  }

  render() {

    console.log(this.props);

    return (
      <span>I am a thing </span>
    );
  }
}

export default Testing;

