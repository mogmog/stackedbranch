import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { ChartContainer, PieChart, RowChart, BubbleChart,
  DataTable, DataCount, BarChart, LineChart } from './../../DCReact/components';
import crossfilter from 'crossfilter2';
import d3 from 'd3';
import dc from 'dc';
import request from "../../../utils/request";
import { Spin, Row, Col } from 'antd';

const dateFormat = d3.time.format('%m/%d/%Y');
const numberFormat = d3.format('.2f');
const weekdayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

class CrossfilterContext {
  constructor(data) {
    this.data = data;
    this.crossfilter = crossfilter(data);
    this.groupAll = this.crossfilter.groupAll();
    this.dateDimension = this.crossfilter.dimension(d => d.dd);
    this.yearlyDimension = this.crossfilter.dimension(d => d3.time.year(d.dd).getFullYear());
    this.dayOfWeekDimension = this.crossfilter.dimension((d) => {
      var day = d.dd.getDay();
      return `${day}.${weekdayLabels[day]}`;
    });
    this.dayOfWeekGroup = this.dayOfWeekDimension.group();
    this.gainOrLossDimension = this.crossfilter.dimension(d => d.open > d.close ? 'Loss' : 'Gain' );
    this.gainOrLossGroup = this.gainOrLossDimension.group();

    this.quarterDimension = this.crossfilter.dimension((d) => {
      let quarter = Math.floor(d.dd.getMonth() / 3) + 1;
      return `Q${quarter}`;
    });
    this.quarterGroup = this.quarterDimension.group().reduceSum(d => d.volume);

    this.fluctuationDimension = this.crossfilter.dimension(d => Math.round((d.close - d.open) / d.open * 100));
    this.fluctuationGroup = this.fluctuationDimension.group();

    this.moveMonthsDimension = this.crossfilter.dimension(d => d.month);
    this.moveMonthsGroup = this.moveMonthsDimension.group().reduceSum(d => Math.abs(d.close - d.open));
  }

  get indexAvgByMonthGroup() {
    if (this._indexAvgByMonthGroup) {
      return this._indexAvgByMonthGroup;
    }

    this._indexAvgByMonthGroup = this.moveMonthsDimension.group().reduce(
      (p, v) => {
        ++p.days;
        p.total += (v.open + v.close) / 2;
        p.avg = Math.round(p.total / p.days);
        return p;
      },
      (p, v) => {
        --p.days;
        p.total -= (v.open + v.close) / 2;
        p.avg = p.days ? Math.round(p.total / p.days) : 0;
        return p;
      },
      () => {
        return {days: 0, total: 0, avg: 0};
      }
    );

    return this._indexAvgByMonthGroup;
  }

  get yearlyPerformanceGroup() {
    if (this._yearlyPerformanceGroup) {
      return this._yearlyPerformanceGroup;
    }

    this._yearlyPerformanceGroup = this.yearlyDimension.group().reduce(
      (p, v) => {
        ++p.count;
        p.absGain += v.close - v.open;
        p.fluctuation += Math.abs(v.close - v.open);
        p.sumIndex += (v.open + v.close) / 2;
        p.avgIndex = p.sumIndex / p.count;
        p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
        p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
        return p;
      },
      (p, v) => {
        --p.count;
        p.absGain -= v.close - v.open;
        p.fluctuation -= Math.abs(v.close - v.open);
        p.sumIndex -= (v.open + v.close) / 2;
        p.avgIndex = p.count ? p.sumIndex / p.count : 0;
        p.percentageGain = p.avgIndex ? (p.absGain / p.avgIndex) * 100 : 0;
        p.fluctuationPercentage = p.avgIndex ? (p.fluctuation / p.avgIndex) * 100 : 0;
        return p;
      },
      () => {
        return {
          count: 0,
          absGain: 0,
          fluctuation: 0,
          fluctuationPercentage: 0,
          sumIndex: 0,
          avgIndex: 0,
          percentageGain: 0
        };
      }
    );

    return this._yearlyPerformanceGroup;
  }
}

class DCThing extends Component {
  constructor(props) {
    super(props);
    this.state = {loaded : false, data : [], context : {}};
  }

  componentDidMount() {

    d3.csv(require('../../../assets/ndx.csv'), (data) => {


      for (let d of data) {
        d.dd = dateFormat.parse(d.date);
        d.month = d3.time.month(d.dd);
        d.close = +d.close;
        d.open = +d.open;
      }
      this.setState({loaded : true, 'context' : new CrossfilterContext(data), data : data});

    });
  }



  render() {

    const { loaded, context, data } = this.state;
    if (loaded && !data.length) return (<span>NO DATA FOR THIS AREA</span>);
    console.log(loaded && !data.length);
    if (loaded && data.length) return (
          <div>
            <PieChart
              dimension={e => { return context.countryDimension }}
              group={e => { return context.countryGroup }}
              width={180}
              height={180}
              radius={80}
              label={(d) => {
                let percent = numberFormat(d.value / context.groupAll.value() * 100);
                return percent + '%';
              }}
            />

            <RowChart
              dimension={e => { return context.dayOfWeekDimension}}
              group={e => { return context.dayOfWeekGroup}}
              width={180}
              height={180}
              elasticX={true}
              margins={{top: 20, left: 10, right: 10, bottom: 20}}
              label={d => d.key.split('.')[1]}
              title={d => d.value}
              xAxis={axis => axis.ticks(4)}
            />
          </div>

      );

      return (<Spin></Spin>);

    ;
  }
}

export default DCThing;
