import React, {PureComponent} from 'react';
import { Row, Col, Card, Tabs } from 'antd';

import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';

import GenderAgeRangeChart from './SiteGenderChart';

import _ from 'lodash';

import styles from './SiteCountryBarChart.less';

const TabPane = Tabs.TabPane;


class SiteGenderTabs extends PureComponent {
  render() {

    const sitesMap      = _(this.props.sites.list).keyBy('id').value();
    const groupedBySite = _(this.props.data.list).groupBy('site_id').value();

    return (

      <Card
        bordered={false}
        bodyStyle={{padding: 0}}
      >
        <div className={styles.salesCard}>
          <Tabs size="large" tabBarStyle={ {marginBottom: 24} }>
            {Object.keys(groupedBySite).map((site) => {

              return (
                <TabPane tab={ sitesMap[site].name } key={site}>
                  <Row>
                    <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                      <div className={styles.salesBar}>
                        <GenderAgeRangeChart data={groupedBySite[site]} />
                      </div>
                    </Col>
                    {/*<Col xl={8} lg={12} md={12} sm={24} xs={24}>
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
                    </Col>*/}
                  </Row>
                </TabPane>);
            })}

          </Tabs>
        </div>
      </Card>
    );
  }
}

export default SiteGenderTabs;
