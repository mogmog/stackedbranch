import React, {PureComponent} from 'react';
import {Chart, Axis, Bar, Coord} from 'viser-react';
import {Row, Col, Card, Tabs, Tooltip} from 'antd';
import _ from 'lodash';

import styles from './SiteCountryBarChart.less';

const TabPane = Tabs.TabPane;


class SiteCountryBarChart extends PureComponent {
  render() {

    const sitesMap      = _(this.props.sites.list).keyBy('id').value();
    const groupedBySite = _(this.props.data.list).groupBy('site_id').value();

    return (

      <Card
        bordered={false}
        bodyStyle={{padding: 0}}
      >
        <div className={styles.salesCard}>
          <Tabs size="large" tabBarStyle={{marginBottom: 24}}>
            {Object.keys(groupedBySite).map((site) => {

              return (<TabPane tab={ sitesMap[site].name } key={site}>
                <Row>

                  <Col xl={16} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesBar}>
                      <Chart forceFit height={700} data={ groupedBySite[site] }>
                        <Coord type="rect" direction="RB" />
                        <Tooltip/>
                        <Axis dataKey="country" offset={{left: 10}} label={{offset: 10}} />
                        <Bar position="country*count" />
                      </Chart>
                    </div>
                  </Col>

                  <Col xl={8} lg={12} md={12} sm={24} xs={24}>
                    <div className={styles.salesRank}>
                      <h4 className={styles.rankingTitle}>Number of visits</h4>
                      <ul className={styles.rankingList}>

                        {(groupedBySite[site].map((row, i) => {
                          return (<li key={i}><span>{row.count}</span><span>{row.country}</span></li>)
                        }))}

                      </ul>
                    </div>
                  </Col>
                </Row>
              </TabPane>)
            })}


          </Tabs>
        </div>
      </Card>


    );
  }
}

export default SiteCountryBarChart;
