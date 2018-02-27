import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Radio, Card, Divider, Button, Icon, Spin } from 'antd';
import ReactSVG from 'react-svg';

import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import SummaryBar from '../../../components/Store/Attraction/SummaryCard/SummaryBar';
import SideMenu from '../../../components/Common/SideMenu';
import PageTitle from '../../../components/Common/PageTitle';
import BubbleMock from '../../../components/Store/Rent/BubbleMock';
import VisitorFrequency from '../../../components/Store/Rent/VisitorFrequency/VisitorFrequency';
import styles from './index.less';

@connect((state) => {
  return {
    purchaseaffluence: state.purchaseaffluence,
    attraction_totals: state.districtvisitors.attraction_totals,
    loading: state.loading,
  };
})

export default class FullPerspective extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      type: 'Visitor',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'purchaseaffluence/fetch',
      payload: { type: 'Visitor' },
    });

    dispatch({
      type: 'districtvisitors/fetch_attraction_totals',
      payload: {},
    });
  }

  changeType(type) {
    this.setState({ type });

    const { dispatch } = this.props;

    dispatch({
      type: 'purchaseaffluence/fetch',
      payload: { type },
    });
  }

  render() {
    const { loading, purchaseaffluence } = this.props.purchaseaffluence;
    const { attraction_totals } = this.props;
    const { type } = this.state;
    const data = purchaseaffluence;

    const pageTitleInfo = {
      category: 'Profiles',
      title: 'Full perspective',
      description:
        'Full and detailed profiles in each segment catchment area nearby in store and sales. It helps you to know your purchases profile compared to the potential visitors',
      categoryIcon: 'icFullPerspective',
    };


    const priority_order = ['Alto', 'Medio-Alto', 'Medio', 'Bajo'];

    const groupedByGenderAgeRent = d3.nest()
      .key(d => d.gender)
      .sortKeys(d3.descending)
      .key(d => d.age)
      .sortKeys(d3.ascending)
      .key(d => d.rent)
      .sortKeys((a, b) => {
        return priority_order.indexOf(a) - priority_order.indexOf(b);
      })
      .rollup(d => d[0].count)
      .entries(data.gender_age_rent);

    const largest = d3.max(data.gender_age_rent, x => x.count);

    const groupedByGender = d3.nest()
      .key(d => d.gender)
      .sortKeys(d3.descending)
      .rollup(d => d[0].percent)
      .entries(data.gender);

    return (
      <div>

        <PageTitle
          category={pageTitleInfo.category}
          title={pageTitleInfo.title}
          description={pageTitleInfo.description}
          categoryIcon={pageTitleInfo.categoryIcon}
        />

        <SideMenu />

        <PageHeaderLayout
          top={null}
          content={null}
          print
          style={{ padding: '0px 0px 0px 0px' }}
        >

          <SummaryBar attraction_totals={attraction_totals} columns={4} />
          <div className={styles.spacer} />


          <Card title={'Affluence by gender > type > rent > age'} bordered={false}>
            <Button onClick={(e => this.changeType('Resident'))}>Resident</Button>
            <Button onClick={(e => this.changeType('Visitor'))}>Visitor</Button>
            <Button onClick={(e => this.changeType('Worker'))}>Worker</Button>

            <Row gutter={24}>
              <Col xl={24} lg={24} md={24} sm={24} xs={24}>
                &nbsp;
              </Col>
            </Row>

            <Row gutter={24}>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                {
                groupedByGenderAgeRent.length ?
                  <BubbleMock
                    type={type}
                    largest={largest}
                    gender="m"
                    data={groupedByGenderAgeRent[0]}
                    headline={groupedByGender[0].values}
                    width={500}
                    height={450}
                  /> :
                  <span>no data</span>
              }

              </Col>

              <Col xl={12} lg={12} md={12} sm={24} xs={24}>
                {
                groupedByGenderAgeRent.length ?
                  <BubbleMock
                    type={type}
                    largest={largest}
                    gender="f"
                    data={groupedByGenderAgeRent[1]}
                    headline={groupedByGender[1].values}
                    width={500}
                    height={450}
                  /> :
                  <span>no data</span>
              }
              </Col>
            </Row>

          </Card>

          <Card title="Volume of people" bordered={false} >

            <Row gutter={24}>
              <Col span={24}>
                <VisitorFrequency />
              </Col>
            </Row>

          </Card>

        </PageHeaderLayout>
      </div>
    );
  }
}
