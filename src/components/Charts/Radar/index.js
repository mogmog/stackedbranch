import React, { PureComponent } from 'react';
import G2 from 'g2';
import { Row, Col } from 'antd';
import equal from '../equal';
import styles from './index.less';

/* eslint react/no-danger:0 */
class Radar extends PureComponent {
  state = {
    legendData: [],
  }

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

  handleLegendClick = (item, i) => {
    const newItem = item;
    newItem.checked = !newItem.checked;

    const { legendData } = this.state;
    legendData[i] = newItem;

    if (this.chart) {
      const filterItem = legendData.filter(l => l.checked).map(l => l.name);
      this.chart.filter('name', filterItem);
      this.chart.repaint();
    }

    this.setState({
      legendData,
    });
  }

  renderChart() {

    const { DataView } = DataSet;
    const data = [
      { item: 'Design', a: 70, b: 30 },
      { item: 'Development', a: 60, b: 70 },
      { item: 'Marketing', a: 50, b: 60 },
      { item: 'Users', a: 40, b: 50 },
      { item: 'Test', a: 60, b: 70 },
      { item: 'Language', a: 70, b: 50 },
      { item: 'Technology', a: 50, b: 40 },
      { item: 'Support', a: 30, b: 40 },
      { item: 'Sales', a: 60, b: 40 },
      { item: 'UX', a: 50, b: 60 }

    ];
    const dv = new DataView().source(data);
    dv.transform({
      type: 'fold',
      fields: [ 'a', 'b' ], // 展开字段集
      key: 'user', // key字段
      value: 'score', // value字段
    });
    const chart = new G2.Chart({
      container: this.node,
      forceFit: true,
      height: 385,
      padding: [ 20, 20, 20, 20 ]
    });
    chart.source(dv, {
      score: {
        min: 0,
        max: 80
      }
    });
    chart.coord('polar', {
      radius: 0.5
    });
    chart.axis('item', {
      line: null,
      tickLine: null,
      grid: {
        lineStyle: {
          lineDash: null
        },
        hideFirstLine: false
      }
    });
    chart.axis('score', {
      line: null,
      tickLine: null,
      grid: {
        type: 'polygon',
        lineStyle: {
          lineDash: null
        }
      }
    });
    chart.legend('user', {
      marker: 'circle',
      offset: 30
    });
    chart.line().position('item*score').color('user').size(2);
    chart.point().position('item*score').color('user').shape('circle').size(4).style({
      stroke: '#fff',
      lineWidth: 1,
      fillOpacity: 1
    });
    chart.area().position('item*score').color('user');
    chart.render();


  }

  render() {
    const { height, title, hasLegend } = this.props;
    const { legendData } = this.state;

    return (
      <div className={styles.radar} style={{ height }}>
        <div>
          {title && <h4>{title}</h4>}
          <div ref={this.handleRef} />
          {
            hasLegend && (
              <Row className={styles.legend}>
                {
                  legendData.map((item, i) => (
                    <Col
                      span={(24 / legendData.length)}
                      key={item.name}
                      onClick={() => this.handleLegendClick(item, i)}
                    >
                      <div className={styles.legendItem}>
                        <p>
                          <span className={styles.dot} style={{ backgroundColor: !item.checked ? '#aaa' : item.color }} />
                          <span>{item.name}</span>
                        </p>
                        <h6>{item.value}</h6>
                      </div>
                    </Col>
                  ))
                }
              </Row>
            )
          }
        </div>
      </div>
    );
  }
}

export default Radar;
