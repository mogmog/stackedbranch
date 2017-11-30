import React from 'react';
import { Form, Input, Button, Select, Divider, Tabs } from 'antd';
import { routerRedux } from 'dva/router';
import SiteList from './SiteList';

export default ({ formItemLayout, form, rule, dispatch, data }) => {

  const onValidateForm = () => {
    dispatch(routerRedux.push('/dwell/date'));
  };

  return (
    <div>

      <SiteList />

      <Button type="primary" onClick={onValidateForm}>
        Next
      </Button>
    </div>
  );
};
