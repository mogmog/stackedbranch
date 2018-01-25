import React from 'react';
import { Button, Row, Col } from 'antd';
import { routerRedux } from 'dva/router';
import Result from '../../../components/Result';
import styles from './style.less';

export default ({ dispatch, data }) => {
  const onFinish = () => {
    dispatch(routerRedux.push('/analysis'));
  };
  const information = (
    <div className={styles.information}>
      <Row>
        <Col span={8} className={styles.label}>Summary</Col>
        <Col span={16}>{data.payAccount}</Col>
      </Row>
      <Row>
        <Col span={8} className={styles.label}>Summary line 2</Col>
        <Col span={16}>{data.receiverAccount}</Col>
      </Row>
    </div>
  );
  const actions = (
    <div>
      <Button type="primary" onClick={onFinish}>
        View Dwell Report
      </Button>
    </div>
  );
  return (
    <Result
      type="success"
      title="Filters defined"
      extra={information}
      actions={actions}
      className={styles.result}
    />
  );
};
