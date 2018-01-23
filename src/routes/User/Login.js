import React, {Component} from 'react';
import {connect} from 'dva';
import {routerRedux, Link} from 'dva/router';
import {Form, Input, Tabs, Button, Icon, Checkbox, Row, Col, Alert} from 'antd';
import styles from './Login.less';
import {Layout} from "antd/lib/index";

const FormItem = Form.Item;
const {TabPane} = Tabs;
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
    this.setState({count});
    this.interval = setInterval(() => {
      count -= 1;
      this.setState({count});
      if (count === 0) {
        clearInterval(this.interval);
      }
    }, 1000);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const {type} = this.state;
    this.props.form.validateFields({force: true},
      (err, values) => {
        if (!err) {
          this.props.dispatch({
            type: `login/${type}Submit`,
            payload: values,
          });
        }
      }
    );
  }

  renderMessage = (message) => {
    return (
      <Alert
        style={{marginBottom: 24}}
        message={message}
        type="error"
        showIcon
      />
    );
  }

  render() {
    const {form, login} = this.props;
    const {getFieldDecorator} = form;
    const {count, type} = this.state;
    return (

      <Content style={{padding: '324px 24px 0', height: '100%'}}>
        <div style={{}}>
          <div className={styles.main}>

            <Form onSubmit={this.handleSubmit}>

              <FormItem>
                {getFieldDecorator('userName', {
                  rules: [{
                    required: type === 'account', message: 'You must！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="user" className={styles.prefixIcon}/>}
                    placeholder="admin"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: [{
                    required: type === 'account', message: 'Password！',
                  }],
                })(
                  <Input
                    size="large"
                    prefix={<Icon type="lock" className={styles.prefixIcon}/>}
                    type="password"
                    placeholder="888888"
                  />
                )}
              </FormItem>
              <FormItem className={styles.additional}>
                {getFieldDecorator('remember', {
                  valuePropName: 'checked',
                  initialValue: true,
                })(
                  <Checkbox className={styles.autoLogin}>Remember me</Checkbox>
                )}
                <a className={styles.forgot} href="">Forgot password</a>
                <Link to="/store/areas">
                  <Button size="large" className={styles.submit} type="primary" htmlType="submit">
                    Login
                  </Button>
                </Link>
              </FormItem>
            </Form>

          </div>
        </div>
      </Content>
    );
  }
}
