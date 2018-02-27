import React, { Component } from 'react';
import { connect } from 'dva';
import { routerRedux, Link } from 'dva/router';
import { Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert } from 'antd';
import styles from './Login.less';
import { Layout } from 'antd/lib/index';
import LucaButton from './../../components/LucaUI/Button/LucaButton';

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
        if (this.props.form.getFieldValue('userName') === 'graham.bates@biggroup.co.uk') {
          this.props.dispatch(routerRedux.push('/store/attraction'));
        } else {
          this.props.dispatch(routerRedux.push('/store/attraction'));
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

      <Content style={{ position: 'absolute', top: 0, padding: '150px 0', height: '100%', width: '100%', background: `url(${require('../../assets/img/image-bg.png')})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}>
        <div className="login" >
          <div className={styles.main} >

            <div className={styles.borderthing}>
              <img style={{ width: '100px' }} src={require('../../assets/img/luca.png')} />
            </div>

            <div style={{ textAlign: 'center', paddingTop: '34px' }}>
              <h3>Welcome to</h3>
              <h1 style={{ marginTop: '-24px' }}>Smart Steps</h1>
            </div>
            <Form style={{ padding: '5%' }} onSubmit={this.handleSubmit} hideRequiredMark>

              <FormItem label="Username">
                {getFieldDecorator('userName', {
                  rules: [{
                    required: type === 'account', message: 'You must enter a user name',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className={styles.prefixIcon} />}
                    placeholder="user name is an email"
                  />
                )}
              </FormItem>
              <FormItem label="Password" >
                {getFieldDecorator('password', {
                  rules: [{
                    required: type === 'account', message: 'Enter a password',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className={styles.prefixIcon} />}
                    type="password"
                    placeholder="password here"
                  />
                )}
              </FormItem>

              <FormItem style={{ textAlign: 'center' }} className={styles.additional}>
                <LucaButton size="large" type="primary" htmlType="submit">Sign in</LucaButton>
              </FormItem>

              <FormItem style={{ textAlign: 'center' }}>
                <a className="login-form-forgot" href="">Forgot password</a>
              </FormItem>
            </Form>

          </div>
        </div>
      </Content>
    );
  }
}
