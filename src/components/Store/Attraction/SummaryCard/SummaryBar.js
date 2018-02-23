import React from 'react';
import { Row, Col } from 'antd';
import ReactSVG from 'react-svg';
import SummaryCard from './SummaryCard';
import ColorThing from './ColorThing';

const SummaryBar = ({ attraction_totals, columns }) => {

  if (columns === 2) {
    return (
      <Row gutter={24}>

        <Col xl={12} lg={12} md={12} sm={24} xs={24}>

          <SummaryCard
            avatar={ <ReactSVG path={require('../../../../assets/svg/ic_city_store.svg')} /> }
            bordered={false}
            title="Catchment Area (100%)"
            total={attraction_totals.getValue('Influence area')}
            footer={<ColorThing color='#E90C8B' text={'#ffffff'}>Catchment Area (CA)</ColorThing>}/>
        </Col>

        <Col xl={12} lg={12} md={12} sm={24} xs={24}>
          <SummaryCard
            avatar={ <ReactSVG path={require('../../../../assets/svg/ic-basket-sales-store.svg')} /> }
            bordered={false}
            title="Sales"
            subtitle={attraction_totals.getValue('Buy')}
            total={attraction_totals.getPercent('Buy')}
            footer={<ColorThing color={'#BFEAEA'} text={'#4A494A'} >{attraction_totals.getDifference('Buy')} less than CA</ColorThing>}/>
        </Col>

      </Row>

    );
  }

else {
    return (
      <Row gutter={24}>

        <Col xl={6} lg={6} md={8} sm={8} xs={8}>

          <SummaryCard
            avatar={ <ReactSVG path={require('../../../../assets/svg/ic_city_store.svg')} /> }
            bordered={false}
            title="Catchment Area (100%)"
            total={attraction_totals.getValue('Influence area')}
            footer={<ColorThing color='#E90C8B' text={'#ffffff'}>Catchment Area (CA)</ColorThing>}/>
        </Col>

        <Col xl={6} lg={6} md={8} sm={8} xs={8}>
          <SummaryCard
            avatar={ <ReactSVG path={require('../../../../assets/svg/ic-nearby-camera-store.svg')} /> }
            bordered={false}
            title="Nearby"
            subtitle={attraction_totals.getValue('Walk bys')}
            total={attraction_totals.getPercent('Walk bys')}
            footer={<ColorThing color='#477784' text={'#ffffff'}>{attraction_totals.getDifference('Walk bys')} less than CA</ColorThing>}/>
        </Col>

        <Col xl={6} lg={6} md={8} sm={8} xs={8}>
          <SummaryCard
            avatar={ <ReactSVG path={require('../../../../assets/svg/ic-shop-store.svg')} /> }
            bordered={false}
            title="In store"
            subtitle={attraction_totals.getValue('In Store')}
            total={attraction_totals.getPercent('In Store')}
            footer={<ColorThing color='#7ED6D6' text={'#ffffff'}>{attraction_totals.getDifference('In Store')} less than CA</ColorThing>}/>
        </Col>

        <Col xl={6} lg={6} md={8} sm={8} xs={8}>
          <SummaryCard
            avatar={ <ReactSVG path={require('../../../../assets/svg/ic-basket-sales-store.svg')} /> }
            bordered={false}
            title="Sales"
            subtitle={attraction_totals.getValue('Buy')}
            total={attraction_totals.getPercent('Buy')}
            footer={<ColorThing color={'#BFEAEA'} text={'#4A494A'} >{attraction_totals.getDifference('Buy')} less than CA</ColorThing>}/>
        </Col>

      </Row>

    );
  }
};

export default SummaryBar;
