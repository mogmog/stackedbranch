import React, {Component} from 'react';
import * as d3 from 'd3';
import {Button} from 'antd';
import {Motion, spring} from 'react-motion';
import XAxis from './XAxis';
import YAxis from './YAxis';
import YMiniAxis from './YMiniAxis';

import Key from './Key';

class Stacked extends Component {

  state = {
    clickedon : false,
  }

  margin = {top: 20, right: 30, bottom: 35, left: 30};
  width = 1200 - this.margin.left - this.margin.right;
  height = 600;

  target = undefined;
  rowSelected = undefined;

  keys = ["redDelicious", "mcintosh", "oranges", "pears"];

  dataset = d3.layout.stack()(this.keys.map(function (fruit) {

    let data = [
      {year: "2006", redDelicious: "112", mcintosh: "15", oranges: "9", pears: "6"},
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
  xScale = d3.scale.ordinal().domain(this.dataset[0].map((d) => {return d.x; })).rangeRoundBands([40, this.width - 330], 0.02);
  yScale = d3.scale.linear().domain([0, d3.max(this.dataset, (d) => d3.max(d, (d) => { return d.y0 + d.y; } ))]).range([this.height, 0]);;

  //yOffsetScale = d3.scale.linear().domain([0, d3.max(this.dataset, (d) => d3.max(d, (d) => { return d.y0 } ))]).range([this.height, 0]);;

  constructor(props) {
    super();
  }



  handleMouseDown = (d, row, column) => {
    this.target = d;
    this.rowSelected = row;

    this.howMuchToMove = {};

    for (let i = 0; i < this.dataset[0].length; i++){
      this.howMuchToMove[i] = this.height - this.yScale(this.dataset[row][i].y0 - this.target.y0);
    }

    this.setState({'clickedon': !this.state.clickedon});
  };


  render() {

    const colors = ["#b33040", "#f2b447", "#d25c4d", "#d9d574"];

    const that = this;

    const getAxisX = function (big, tween) {
          if (typeof that.target === 'undefined') return 'translate(0, 0)';
          let offset = -1 * (that.height - that.yScale(that.target.y0));
          return 'translate(0,' + (offset * tween) + ')';
    }

    const getMiniAxisY = function (tween) {
        if (typeof that.target === 'undefined') return 'translate(820, 0)';
        let offset = -1 * (that.height - that.yScale(that.target.y0));
        return 'translate(820,' + (offset * tween) + ')';
    }

    const getRectTransform = function (d, row, column, tween) {
      if (typeof that.target === 'object' ) {
        let offset = that.howMuchToMove[column];
        return 'translate(0,' + (offset * tween) + ')';
      }
    }

    const getRectOpacity = function (d, row, column, opacity) {
      /*if graph unclicked, no opacity*/
      if (typeof that.target === 'undefined') return 1;

      /*if clicked, set opacity to 1 to anything in same row*/
      if (that.target !== 'undefined' && row === that.rowSelected) return 1;

      //everything else, fade out
      return opacity;
    }

    return (

      <div>

        <svg width={that.width} height={that.height + 200}>

          <Motion style={{tween: spring(this.state.clickedon ? 1 : 0)}}>
            {
              ({tween}) => (
                <g>
                  <g transform={getAxisX(true, tween)}>
                    <XAxis height={that.height} xScale={this.xScale}/>
                  </g>
                  <g opacity={1-tween}>
                    <YAxis height={that.height} yScale={this.yScale}/>
                  </g>

                  <g opacity={tween} transform={getMiniAxisY(tween)}>
                    <YMiniAxis height={that.height} yScale={this.yScale} />
                  </g>

                </g>
            )}
          </Motion>

          <Key keys={that.keys} height={that.height} colors={colors} dataset={this.dataset} yScale={this.yScale}></Key>

          {this.dataset.map((x, row) => (

            <Motion key={row} style={{tween: spring(this.state.clickedon ? 1 : 0), opacity: spring(this.state.clickedon ? 0.1 : 1) }}>
              {
                ({tween, opacity}) => (
                  <g>
                    <g key={row} fill={colors[row]} >

                      {
                        x.map((d, ii) => (
                          <rect
                            key={ii}
                            id={ii}
                            style={{'zIndex': '-1'}}
                            opacity={getRectOpacity(d, row, ii, opacity)}
                            transform={getRectTransform(d, row, ii, tween)}
                            onClick={(() => { this.handleMouseDown(d, row, ii)}).bind(this)}
                            width={this.xScale.rangeBand()}
                            height={this.yScale(d.y0) - this.yScale(d.y0 + d.y)}
                            x={this.xScale(d.x)}
                            y={this.yScale(d.y0 + d.y)}/>
                        ))
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

