import React, { PureComponent } from 'react';
import equal from '../equal';

class FunnelChart extends PureComponent {
  componentDidMount() {
    this.renderChart(this.props.data);
  }

  componentWillReceiveProps(nextProps) {
    if (!equal(this.props, nextProps)) {
      this.renderChart(nextProps.data);
    }
  }

  componentWillUnmount() {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  handleRef = (n) => {
    this.node = n;
  }

  renderChart(data) {

    //G2.Global.setTheme('dark');

    const { height = 0, fit = true, color = '#FFFFFF' } = this.props;

    if (!data || (data && data.length < 1)) {
      return;
    }

    // clean
    this.node.innerHTML = '';


    const chart = new G2.Chart({
      container: this.node,
      forceFit: fit,
      height: height + 84,
      plotCfg: {
        margin: [20, 5, 20, 5],
      },
      legend: null,
    });


    chart.source(data);
    chart.axis(false);
    chart.tooltip({
      crosshairs: false,
      showTitle: false,
      itemTpl: '<li data-index={index} style="margin-bottom:4px;">'
      + '<span style="background-color:{color};" class="g2-tooltip-marker"></span>'
      + '{name}<br/>'
      + '<span style="padding-left: 16px">{value}</span>'
      + '</li>'
    });
    chart.legend({
      reversed: true
    });
    chart.facet('mirror', {
      fields: [ 'site' ],
      transpose: true,
      padding: 0,
      eachView(view, facet) {
        view.interval()
          .position('action*visitor')
          .color('action', [ '#BAE7FF', '#69C0FF', '#40A9FF', '#1890FF', '#0050B3' ])
          .shape('funnel')
          .tooltip('site*action*visitor', (site, action, visitor) => {
            return {
              name: site,
              value: action + ': ' + visitor
            };
          })
          .style({
            lineWidth: 1,
            stroke: '#fff'
          });

        data.map(obj => {
          if (obj.site === facet.colValue) {
            view.guide().text({
              top: true,
              position: [obj.action, 'min'],
              content: obj.visitor,
              style: {
                fill: '#fff',
                fontSize: '12',
                textAlign: facet.colIndex ? 'start' : 'end',
                shadowBlur: 2,
                shadowColor: 'rgba(0, 0, 0, .45)'
              },
              offsetX: facet.colIndex ? 10 : -10
            });
          }
        });
      }
    });

    chart.render();

    this.chart = chart;
  }

  render() {
    const { height } = this.props;

    return (
      <div style={{ height }}>
        <div>
          <div ref={this.handleRef} />
        </div>
      </div>
    );
  }
}

export default FunnelChart;
