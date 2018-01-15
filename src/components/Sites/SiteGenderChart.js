import {AbstractChart} from 'react-highcharts-wrapper';
import _ from 'lodash';

const GenderAgeRangeChart = (props) => {

  let categories = _(props.data).map(x => x.age_range).orderBy(x => x.age_range).uniq().value();

  //the 1/-1 is to make thr graph look right
  let maleTotals    = -1 * _(props.data).filter(x => x.gender === 'Male').sumBy('__visits');
  let femaleTotals  =  1 *_(props.data).filter(x => x.gender === 'Female').sumBy('__visits');

  return (
    <div>
      <AbstractChart config={{

        chart: {
          type: 'bar'
        },

        title: {
          text: ''
        },
        xAxis: [{
          categories: categories,
          reversed: false,
          labels: {
            step: 1
          }
        }, { // mirror axis on right side
          opposite: true,
          reversed: false,
          categories: categories,
          linkedTo: 0,
          labels: {
            step: 1
          }
        }],
        yAxis: {
          title: {
            text: null
          },
          labels: {
            formatter: function () {
              return Math.abs(this.value) + '%';
            }
          }
        },

        plotOptions: {
          series: {
            stacking: 'normal'
          }
        },

        tooltip: {
          formatter: function () {
            return '<b>' + this.series.name + ', age ' + this.point.category + '</b><br/>'
          }
        },

        series: [{
          name: 'Male',
          color: 'rgb(113,192,235)',
          data: _(props.data).filter(x => x.gender === 'Male').map(x => 100 * x.__visits/maleTotals).value(),
        }, {
          name: 'Female',
          color:  'rgb(246,170,203)',
          data: _(props.data).filter(x => x.gender === 'Female').map(x => 100 * x.__visits/femaleTotals).value(),
        }]

      }} />
    </div>
  )
};

export default GenderAgeRangeChart;
