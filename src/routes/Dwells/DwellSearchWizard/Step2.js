import React from 'react';
import { Form, Input, Button, Alert, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';
import { DatePicker } from 'antd';

export default ({ formItemLayout, form, data, dispatch, submitting }) => {
  const { getFieldDecorator, validateFields } = form;
  const { MonthPicker, RangePicker } = DatePicker;

  const onPrev = () => {
    dispatch(routerRedux.push('/dwell'));
  };

  const onNext = () => {
    dispatch(routerRedux.push('/dwell/summary'));
  };

  function onChange(date, dateString) {
    console.log(date, dateString);
  }

  return (
    <Form layout="horizontal" className={styles.stepForm}>

      <Form.Item
        {...formItemLayout}
        label="From date"
        required={true}
      >     <DatePicker onChange={onChange} />
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        label="To date"
        required={true}
      >    <DatePicker onChange={onChange} />
      </Form.Item>

      <Form.Item
        style={{ marginBottom: 8 }}
        wrapperCol={{
          xs: { span: 24, offset: 0 },
          sm: { span: formItemLayout.wrapperCol.span, offset: formItemLayout.labelCol.span },
        }}
        label=""
      >
        <Button type="primary" onClick={onPrev} loading={submitting}>
          Previous
        </Button>
        <Button onClick={onNext} style={{ marginLeft: 8 }}>
          Next
        </Button>
      </Form.Item>
    </Form>
  );
};
