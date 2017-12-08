import React from 'react'

import d3 from 'd3'
import styles from './index.less';
import {Row, Col, Card, List, Avatar} from 'antd';

import SunburstChart from '../../DCChartWrappers/SunburstChart';
import StoreCompareRowChart from './storeCompareRowChart';

import StoreCompareDateChart from './storeCompareDateChart';
import StoreCompareWorldMap from './storeCompareWorldMap';

import { onDCUpdate } from '../../../stores/dcListener';

import CardStoreFactory from '../../../stores/CardStoreFactory';

class ComparisonCard extends React.Component {


  render() {
    const store = CardStoreFactory();


    console.log(this.props);

    // go and get the data from data.json
    store.trigger('fetchData:all');

    // store.on('update', () => {
    //   this.forceUpdate();
    // })

    onDCUpdate(store);

    const {dh} = store.get().toJS()

    const interestGrpDimension = dh.ndx.dimension((d) => d.group_name.split("/"));
    const interestGrpDimensionGroup = interestGrpDimension.group();

    const storeDimension = dh.ndx.dimension((d) => d.name);
    const storeDimensionGroup = storeDimension.group();

    const hourDimension = dh.ndx.dimension((d) => {
      return (new Date(d.date).getHours());
    })
    //const hourDimensionGroup = hourDimension.group()

    const dateDimension = dh.ndx.dimension((d) => new Date(d.date));
    const dateDimensionGroup = dateDimension.group();

    const mapDimension =  dh.ndx.dimension((d) => d);

    // const listDimension = dh.ndx.dimension((d) => {
    //   return d
    // })

    const dateRange = [new Date('1 January 2016'), new Date('10 January 2016')]

    //const geoData = dh.getGeoData()

    return (
      <div className={styles.comparisonCard}>

        <Row type="flex" justify="center">
          <Col>
            <SunburstChart width={350}
                           height={350}
                           dimension={interestGrpDimension}
                           group={ interestGrpDimensionGroup } />
          </Col>
        </Row>

        <Row>
          <Col>
            <StoreCompareRowChart dimension={ storeDimension }  group={ storeDimensionGroup } />
          </Col>
        </Row>

        <Row>
          <Col>
            <StoreCompareDateChart dimension={ dateDimension } group={ dateDimensionGroup } xRange={ dateRange } rangeChartID="123" />
          </Col>
        </Row>

        <Row>
          <Col>
            <StoreCompareWorldMap dimension = {mapDimension} />
          </Col>
        </Row>

      </div>
    );
  }
}

export default ComparisonCard;
