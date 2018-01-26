import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Divider, Button} from 'antd';
import AnimateHeight from 'react-animate-height';
import PageHeaderLayout from '../../../layouts/PageHeaderLayout';
import AreaSelectMap from '../../../components/Store/Areas/Comparision/ComparisonMap';
import ComparisonCard from '../../../components/Store/Areas/Comparision/ComparisonCard';

@connect(state => ({
  area: state.area,
}))
export default class Workplace extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      height: 400,
      cards: [],
      filter: null,
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'area/fetch',
    });
  }

  onClickArea(area) {
    this.setState({cards: [...this.state.cards, area]});
  }

  setfilter() {
    this.setState({'filter': 'Male'});
  }

  render() {
    const areas = this.props.area.areas;

    const {area: {areas: list}} = this.props;
    const {cards, height} = this.state;

    const pageHeaderContent = (
      <div>
        <div>
          <Button onClick={() => this.setState({height: 100})}>
            Hide
          </Button>
          <Button onClick={() => this.setState({height: 500})}>
            Increase
          </Button>
        </div>
      </div>
    );

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
      >
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card
              title={'Select the areas you wish to compare'}
              bordered>

              <AnimateHeight height={height}>
                <AreaSelectMap areas={list} onClickArea={this.onClickArea.bind(this)}/>
              </AnimateHeight>

            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Divider/>
            <Button onClick={x => {
              this.setState({filter: 'Male'})
            }}>set filter to Male
            </Button>
            <Button onClick={x => {
              this.setState({filter: 'Female'})
            }}>set filter to Female
            </Button>
          </Col>
        </Row>

        <Row gutter={24}>
          {cards.map((area, i) => (
            <Col xl={8} lg={8} md={24} sm={24} xs={24} key={i}>
              <ComparisonCard
                area={area}
                filter={this.state.filter}
                clear={x => {
                  this.setState({filter: null})
                }}/>
            </Col>
          ))}
        </Row>

      </PageHeaderLayout>
    );
  }
}
