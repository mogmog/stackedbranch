import React from 'react';
import { Button, Row, Col, Icon, Steps, Card } from 'antd';
import Result from '../../components/Result';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const { Step } = Steps;

const desc1 = (
  <div style={{ fontSize: 12, color: 'rgba(0, 0, 0, 0.45)', position: 'relative', left: 42 }}>
    <div style={{ margin: '8px 0 4px' }}>
      Thing
    </div>
  </div>
);

const desc2 = (
  <div style={{ fontSize: 12, position: 'relative', left: 42 }}>
    <div style={{ margin: '8px 0 4px' }}>
      Thing2
    </div>
  </div>
);

const extra = (
  <div>
    <div style={{ fontSize: 16, color: 'rgba(0, 0, 0, 0.85)', fontWeight: '500', marginBottom: 20 }}>
      Title
    </div>
    <Row style={{ marginBottom: 16 }}>
      <Col xs={12} sm={12} md={12} lg={12} xl={6}>
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}> ID：</span>
        23421
      </Col>

    </Row>
    <Steps style={{ marginLeft: -12, width: 'calc(100% + 84px)' }} progressDot current={1}>
      <Step title={<span style={{ fontSize: 14 }}>Dest 1</span>} description={desc1} />
      <Step title={<span style={{ fontSize: 14 }}>Dest 2</span>} description={desc2} />
      <Step title={<span style={{ fontSize: 14 }}>Dest 3</span>} />
    </Steps>
  </div>
);

const actions = (
  <div>
    <Button type="primary">返回列表</Button>
    <Button>查看项目</Button>
    <Button>打 印</Button>
  </div>
);

export default () => (
  <PageHeaderLayout>
    <Card bordered={false}>
      <Steps progressDot current={3}>
        <Step title={<span style={{ fontSize: 14 }}>Dest 1</span>} description={desc1} />
        <Step title={<span style={{ fontSize: 14 }}>Dest 2</span>} description={desc2} />
        <Step title={<span style={{ fontSize: 14 }}>Dest 3</span>} />
        <Step title={<span style={{ fontSize: 14 }}>Dest 4</span>} />
        <Step title={<span style={{ fontSize: 14 }}>Dest 5</span>} />
      </Steps>
    </Card>
  </PageHeaderLayout>
);
