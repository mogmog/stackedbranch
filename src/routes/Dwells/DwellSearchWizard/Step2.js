import React from 'react';
import { Form, Input, Button, Alert, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';

export default ({ formItemLayout, form, data, dispatch, submitting }) => {
  const { getFieldDecorator, validateFields } = form;

  const onPrev = () => {
    dispatch(routerRedux.push('/dwell'));
  };

  const onNext = () => {
    dispatch(routerRedux.push('/dwell/summary'));
  };

  const onValidateForm = (e) => {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {
        dispatch({
          type: 'form/submitStepForm',
          payload: {
            ...data,
            ...values,
          },
        });
      }
    });
  };
  return (
    <Form layout="horizontal" className={styles.stepForm}>

      <Form.Item
        {...formItemLayout}
        label="From date"
        required={true}
      >     <Input type="date" autoComplete="off" style={{ width: '80%' }} />
      </Form.Item>

      <Form.Item
        {...formItemLayout}
        label="To date"
        required={true}
      >     <Input type="date" autoComplete="off" style={{ width: '80%' }} />
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
