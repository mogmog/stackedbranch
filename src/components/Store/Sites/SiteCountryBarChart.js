import React, {PureComponent} from 'react';
import { Row, Col, Card, Tabs } from 'antd';

import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';

import _ from 'lodash';

//import styles from './SiteCountryBarChart.less';

const TabPane = Tabs.TabPane;


class SiteCountryBarChart extends PureComponent {
  render() {

    const sitesMap      = _(this.props.sites.list).keyBy('id').value();
    const groupedBySite = _(this.props.data.list).groupBy('site_id').value();

    const { DataView } = window.DataSet;

    const { Html } = Guide;

    const data = [
      { gender: 'Male', count: 40 },
      { gender: 'Female', count: 50 },
      { gender: 'Other', count: 10 },
    ];
    const dv = new DataView();

    const cols = {
      percent: {
        formatter: val => {
          val = (val * 100) + '%';
          return val;
        }
      }
    }


    return (

      <Card
        bordered={false}
        bodyStyle={{padding: 0}}
      >
        <div className={styles.salesCard}>
          <Tabs size="large" tabBarStyle={ {marginBottom: 24} }>
            {Object.keys(groupedBySite).map((site) => {

              dv.source(groupedBySite[site]).transform({
                type: 'percent',
                field: 'count',
                dimension: 'gender',
                as: 'percent',
              });

              return (
                <TabPane tab={ sitesMap[site].name } key={site}>
                  <Row>
                    <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesBar}>
                        <Chart height={500} data={dv} scale={cols} padding={[ 20, 20, 20, 20 ]} forceFit>
                          <Coord type={'theta'} radius={0.75} innerRadius={0.6} />
                          <Axis name="percent" />

                          <Geom
                            type="intervalStack"
                            position="percent"
                            color='gender'
                            tooltip={['gender*percent',(gender, percent) => {
                              percent = percent * 100 + '%';
                              return {
                                name: gender,
                                value: percent
                              };
                            }]}
                            style={{lineWidth: 1,stroke: '#fff'}}
                          >
                            <Label content='percent' formatter={(val, gender) => {
                              return gender.point.gender + ': ' + val;}} />
                          </Geom>
                        </Chart>
                      </div>
                    </Col>
                    <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                      <div className={styles.salesRank}>
                        <h4 className={styles.rankingTitle}>Number of visits</h4>
                        <ul className={styles.rankingList}>

                          {(groupedBySite[site].map((row, i) => {
                            return (
                              <li key={i}><span>{row.count}</span>
                                <span>{row.gender}</span></li>
                            );
                          }))}

                        </ul>
                      </div>
                    </Col>
                  </Row>
                </TabPane>);
            })}

          </Tabs>
        </div>
      </Card>
    );
  }
}

export default SiteCountryBarChart;
