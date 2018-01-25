import React, {PureComponent} from 'react';
import {connect} from 'dva';
import {Row, Col, Card, Divider, Input, Button} from 'antd';
import PageHeaderLayout from '../../../../layouts/PageHeaderLayout';
import DateDefineRange from '../../../../components/Dates/Define/DateDefineRange';
import DateDefineList from '../../../../components/Dates/Define/DateDefineList';

@connect(state => ({
  date: state.date
}))
export default class DateDefine extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;

    dispatch({
      type: 'date/fetch',
    });
  }

  render() {

    const {date} = this.props;
    console.log(this.props.date);
    const pageHeaderContent = (
      <div>
      </div>
    );

    return (
      <PageHeaderLayout
        content={pageHeaderContent}
      >
        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card title={'Create dates'} bordered>

              <Row>
                <Col xl={8}>
                    <DateDefineRange autoFocus={true}/>
                </Col>

                <Col xl={8}>
                  <Input placeholder="Enter a name for the event" />
                </Col>

                <Col xl={2}>

                </Col>

                <Col xl={6}>
                  <Button type="primary" icon="download" > Create </Button>
                </Col>

              </Row>
            </Card>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col xl={24} lg={24} md={24} sm={24} xs={24}>
            <Card title={'Defined dates'} bordered>
              <DateDefineList dates={date}/>
            </Card>
          </Col>
        </Row>

      </PageHeaderLayout>
    );
  }
}
