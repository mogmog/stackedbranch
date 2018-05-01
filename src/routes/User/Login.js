import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import styles from './Login.less';
import { Layout } from 'antd/lib/index';
import LucaButton from './../../components/LucaUI/Button/LucaButton';
import DemoStackedThing from './../../components/Store/Sites/DemoStackedThing';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const { Header, Sider, Content } = Layout;

@connect(state => ({
  login: state.login,
}))
@Form.create()
export default class Login extends Component {
  state = {
    count: 0,
    type: 'account',
  }

  componentWillReceiveProps(nextProps) {
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onSwitch = (key) => {
    this.setState({
      type: key,
    });
  }

  onGetCaptcha = () => {
    let count = 59;
    this.setState({ count });
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { type } = this.state;
    this.props.form.validateFields({ force: true },
      (err, values) => {
        if (this.props.form.getFieldValue('userName') === 'Charlie@telefonica.com') {
          this.props.dispatch(routerRedux.push('/store/home'));
        } else {
          this.props.dispatch(routerRedux.push('/login'));
        }


        if (!err) {

          // this.props.dispatch({
          //   type: `login/${type}Submit`,
          //   payload: values,
          // });
        }
      }
    );
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{ marginBottom: 24 }}
        message={message}
        type="error"
        showIcon
      />
    );
  }

  render() {
    const { form, login } = this.props;
    const { getFieldDecorator } = form;
    const { count, type } = this.state;
    return (

        <DemoStackedThing></DemoStackedThing>
    );
  }
}
