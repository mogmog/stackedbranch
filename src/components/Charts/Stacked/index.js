import React, {Component} from 'react';
import * as d3 from 'd3';
import {Button} from 'antd';
import {Motion, spring} from 'react-motion';
import XAxis from './XAxis';
import Key from './Key';

class Stacked extends Component {

  state = {
    highlight: false,
    yOffset: 0,
    clickedon : false,
  }

  margin = {top: 20, right: 30, bottom: 35, left: 30};
  width = 1200 - this.margin.left - this.margin.right;
  height = 600;

  target = undefined;
  band = undefined;


  dataset = d3.layout.stack()(["redDelicious", "mcintosh", "oranges", "pears"].map(function (fruit) {

    let data = [
      {year: "2006", redDelicious: "10", mcintosh: "15", oranges: "9", pears: "6"},
      {year: "2007", redDelicious: "12", mcintosh: "18", oranges: "9", pears: "4"},
      {year: "2008", redDelicious: "05", mcintosh: "20", oranges: "8", pears: "2"},
      {year: "2009", redDelicious: "01", mcintosh: "15", oranges: "5", pears: "4"},
      {year: "2010", redDelicious: "02", mcintosh: "10", oranges: "4", pears: "2"},
      {year: "2011", redDelicious: "03", mcintosh: "12", oranges: "6", pears: "3"},
      {year: "2012", redDelicious: "04", mcintosh: "15", oranges: "8", pears: "1"},
      {year: "2013", redDelicious: "06", mcintosh: "11", oranges: "9", pears: "4"},
      {year: "2014", redDelicious: "10", mcintosh: "13", oranges: "9", pears: "5"},
      {year: "2015", redDelicious: "16", mcintosh: "19", oranges: "6", pears: "9"},
      {year: "2016", redDelicious: "19", mcintosh: "17", oranges: "5", pears: "7"},
    ];

    return data.map(function (d) {
      return {x: (d.year), y: +d[fruit]};
    });
  }));

  // Set x, y and colors
  xScale = d3.scale.ordinal().domain(this.dataset[0].map((d) => {return d.x; })).rangeRoundBands([10, this.width - 300], 0.02);
  yScale = d3.scale.linear().domain([0, d3.max(this.dataset, (d) => d3.max(d, (d) => { return d.y0 + d.y; } ))]).range([this.height, 0]);;

  constructor(props) {
    super();
  }

  componentWillReceiveProps(newProps) {
  }

  handleMouseDown = (d, ii) => {
    this.target = d;
    this.band = ii;
    this.setState({'clickedon': !this.state.clickedon});
  };


  render() {

    var colors = ["b33040", "#d25c4d", "#f2b447", "#d9d574"];

    let that = this;

    let getY = function (d, i,ii,  tween) {
       if (typeof that.target !== 'undefined' && i === that.band) {
         return 'translate(0,' + (((((d.y0 - that.target.y0) * 12)) * (tween))) + ')';
       }

       return 'translate(0, 0)';

    }

    let getOpacity = function (row, clickedon) {
      /*if graph unclicked, no clickedon*/
      if (typeof that.target === 'undefined') return 1;

      /*if clicked, do not apply clickedon to anything in same row*/
      if (typeof that.target !== 'undefined' && row === that.band) return 1;

      //everything else, fade out
      return clickedon;
    }

    return (

      <div>

        <svg width={that.width} height={that.height + 200}>

          <XAxis height={that.height} xScale={this.xScale}></XAxis>
          <Key height={that.height} colors={colors} dataset={this.dataset} yScale={this.yScale}></Key>

          {this.dataset.map((x, row) => (

            <Motion key={row} style={{tween: spring(this.state.clickedon ? 1 : 0), opacity: spring(this.state.clickedon ? 0.1 : 1) }}>
              {
                ({tween, opacity}) => (
                  <g>
                    <g key={row} fill={colors[row]} >

                      {
                        x.map((d, ii) => (<rect key={ii} opacity={getOpacity(row, opacity)} transform={getY(d, row, ii, tween)} onClick={(() => { this.handleMouseDown(d, row)}).bind(this)} width={this.xScale.rangeBand()} height={this.yScale(d.y0) - this.yScale(d.y0 + d.y)} x={this.xScale(d.x)} y={this.yScale(d.y0 + d.y)}/>))
                      }

                    </g>

                  </g>

                  )
              }

            </Motion>

          ) )}
        </svg>
      </div>
    );
  }

}

export default Stacked;

