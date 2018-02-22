import React, {Component} from 'react';
import * as d3 from 'd3';
import VisitorFrequencyLine from './VisitorFrequencyLine';
import VisitorFrequencyXScale from './VisitorFrequencyXScale';
import VisitorFrequencyYScale from './VisitorFrequencyYScale';

import styles from './VisitorFrequency.less';

class VisitorFrequency extends Component {

  constructor(props) {
    super();
    this.width = 1000;
    this.height = 400;
    this.axisOffset = 40;

    this.types = ["total_influence_area", "total_door_area", "total_in_store", "total_purcharsers"];

    this.data = [
      {"start_dow":"Monday","start_hour":"Morning","total_influence_area":19325,"total_door_area":8692,"total_in_store":3655,"total_purcharsers":431,"dow_order":1,"start_hour_order":1},
      {"start_dow":"Monday","start_hour":"Afternoon","total_influence_area":25748,"total_door_area":11565,"total_in_store":4786,"total_purcharsers":577,"dow_order":1,"start_hour_order":2},
      {"start_dow":"Monday","start_hour":"Evening","total_influence_area":35581,"total_door_area":15900,"total_in_store":6639,"total_purcharsers":805,"dow_order":1,"start_hour_order":3},
      {"start_dow":"Tuesday","start_hour":"Morning","total_influence_area":12106,"total_door_area":5615,"total_in_store":2167,"total_purcharsers":214,"dow_order":2,"start_hour_order":1},
      {"start_dow":"Tuesday","start_hour":"Afternoon","total_influence_area":13837,"total_door_area":6476,"total_in_store":2499,"total_purcharsers":272,"dow_order":2,"start_hour_order":2},
      {"start_dow":"Tuesday","start_hour":"Evening","total_influence_area":21935,"total_door_area":10165,"total_in_store":3962,"total_purcharsers":447,"dow_order":2,"start_hour_order":3},
      {"start_dow":"Wednesday","start_hour":"Morning","total_influence_area":12615,"total_door_area":5757,"total_in_store":2327,"total_purcharsers":275,"dow_order":3,"start_hour_order":1},
      {"start_dow":"Wednesday","start_hour":"Afternoon","total_influence_area":14493,"total_door_area":6541,"total_in_store":2680,"total_purcharsers":282,"dow_order":3,"start_hour_order":2},
      {"start_dow":"Wednesday","start_hour":"Evening","total_influence_area":16341,"total_door_area":7414,"total_in_store":3057,"total_purcharsers":346,"dow_order":3,"start_hour_order":3},
      {"start_dow":"Thursday","start_hour":"Morning","total_influence_area":12266,"total_door_area":5682,"total_in_store":2101,"total_purcharsers":249,"dow_order":4,"start_hour_order":1},
      {"start_dow":"Thursday","start_hour":"Afternoon","total_influence_area":13757,"total_door_area":6388,"total_in_store":2466,"total_purcharsers":291,"dow_order":4,"start_hour_order":2},
      {"start_dow":"Thursday","start_hour":"Evening","total_influence_area":21196,"total_door_area":9888,"total_in_store":3811,"total_purcharsers":477,"dow_order":4,"start_hour_order":3},
      {"start_dow":"Friday","start_hour":"Morning","total_influence_area":28402,"total_door_area":12182,"total_in_store":5547,"total_purcharsers":739,"dow_order":5,"start_hour_order":1},
      {"start_dow":"Friday","start_hour":"Afternoon","total_influence_area":28183,"total_door_area":12004,"total_in_store":5421,"total_purcharsers":691,"dow_order":5,"start_hour_order":2},
      {"start_dow":"Friday","start_hour":"Evening","total_influence_area":22305,"total_door_area":18835,"total_in_store":8449,"total_purcharsers":1095,"dow_order":5,"start_hour_order":3},
      {"start_dow":"Saturday","start_hour":"Morning","total_influence_area":26135,"total_door_area":11249,"total_in_store":4915,"total_purcharsers":644,"dow_order":6,"start_hour_order":1},
      {"start_dow":"Saturday","start_hour":"Afternoon","total_influence_area":29843,"total_door_area":15209,"total_in_store":6594,"total_purcharsers":792,"dow_order":6,"start_hour_order":2},
      {"start_dow":"Saturday","start_hour":"Evening","total_influence_area":24931,"total_door_area":18816,"total_in_store":8195,"total_purcharsers":1059,"dow_order":6,"start_hour_order":3},
      {"start_dow":"Sunday","start_hour":"Morning","total_influence_area":18418,"total_door_area":8024,"total_in_store":3475,"total_purcharsers":432,"dow_order":7,"start_hour_order":1},
      {"start_dow":"Sunday","start_hour":"Afternoon","total_influence_area":25546,"total_door_area":21905,"total_in_store":9280,"total_purcharsers":1184,"dow_order":7,"start_hour_order":2},
      {"start_dow":"Sunday","start_hour":"Evening","total_influence_area":29981,"total_door_area":18095,"total_in_store":7806,"total_purcharsers":999,"dow_order":7,"start_hour_order":3}

    ];

    this.x = d3.scale.ordinal().domain(this.data.map(x=> `${x.start_dow}_${x.start_hour}`)).rangeRoundBands([0, 1000], 0.1);
    this.y = d3.scale.linear().domain([0, d3.max(this.data, (d) => d.total_influence_area)]).range([400, 0]);
  }

  componentWillMount() {




  }

  componentDidMount() {
  }

  render() {

    const { } = this.props;

    return (
      <svg height={this.height + this.axisOffset + this.axisOffset + this.axisOffset} width={this.width} viewBox="0 0 1000 400">

        <g transform={`translate(0, ${0})`}>
          <VisitorFrequencyLine xScale={this.x} yScale={this.y} type="total_influence_area" types={this.types} values={this.data} />
          <VisitorFrequencyLine xScale={this.x} yScale={this.y} type="total_door_area"      types={this.types} values={this.data} />
          <VisitorFrequencyLine xScale={this.x} yScale={this.y} type="total_in_store"       types={this.types} values={this.data} />
          <VisitorFrequencyLine xScale={this.x} yScale={this.y} type="total_purcharsers"    types={this.types} values={this.data} />
        </g>

        {/*<VisitorFrequencyYScale yScale={this.x} values={this.data} />*/}

        <g transform={`translate(0, ${this.height + 20 })`}>
          <VisitorFrequencyXScale xScale={this.x} values={this.data} />
        </g>

      </svg>
    );
  }
}

export default VisitorFrequency;
