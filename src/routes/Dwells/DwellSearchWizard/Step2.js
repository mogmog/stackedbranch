import React from 'react';
import { Form, Input, Button, Alert, Divider } from 'antd';
import { routerRedux } from 'dva/router';
import { digitUppercase } from '../../../utils/utils';
import styles from './style.less';
import { DatePicker } from 'antd';

export default ({ formItemLayout, form, data, dispatch, submitting }) => {
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
        required={true}
      >
        <RangePicker
          dateRender={(current) => {

            const style = {};
            if (current.month() === 11 && (current.date() === 25 || current.date() === 26)) {
              style.border = '1px solid #1890ff';
              style.borderRadius = '50%';
            }
            return (
              <div className="ant-calendar-date" style={style}>
                {current.date()}
              </div>
            );
          }}
        />

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
