import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Checkbox, Alert, Icon, message } from 'antd';
import Login from 'components/Login';
import styles from './Login.less';
import { repeat } from 'rxjs/operators';
import Background from './image/bg.png';
import User from './image/user.png';
import PassWord from './image/password.png';
import CodeShadow from './image/codeShadow.png';
import PwdShadow from './image/pwdShadow.png';
const QRCode = require('qrcode.react');

const { Tab, UserName, Password, Mobile, Captcha, Submit } = Login;

@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
export default class LoginPage extends Component {
  constructor() {
    super();
    this.state = {
      type: 'account',
      autoLogin: true,
      pwd: 'active',
      scan: '',
      userName: '',
      password: '',
      url: ''
    }
  }

  componentDidMount() {
    const host = window.location.host;
    console.log(host)
    const now = new Date().getTime();
    this.setState({
      url: 'http://' + host + '/#/user/userWeiXin?random=' + now
    })
    this.props.dispatch({
      type: 'login/getCode',
      payload: {
        RandomCode: now
      },
    });
  }
  keypress = (e) => {
    if (e.which !== 13) return
    this.handleSubmit()
  }
  onTabChange = type => {
    this.setState({ type });
    console.log(type)
  };

  handleSubmit = () => {
    console.log(this.state.url)
    if (this.state.userName === '' || this.state.password === '') {
      message.warning('账号或密码不可为空');
      return;
    }

    this.props.dispatch({
      type: 'login/login',
      payload: {
        UserName: this.state.userName,
        Password: this.state.password,
      },
    });

  };

  changeAutoLogin = e => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  renderMessage = content => {
    return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
  };

  ScavengingLogin = () => {
    this.setState({
      scan: 'active',
      pwd: ''
    })
  }
  PasswordSignIn = () => {
    this.setState({
      pwd: 'active',
      scan: ''
    })
  }
  userNameChange = (e) => {
    this.setState({ userName: e.target.value })
  }
  passWordChange = (e) => {
    this.setState({ password: e.target.value })
  }
  render() {
    const { login, submitting } = this.props;
    const { type } = this.state;
    return (
      <div style={{ backgroundColor: '#E5E9EC', height: '100%' }} onKeyPress={this.keypress}>
        <div className={styles.bgColor} style={{ backgroundImage: `url(${Background})` }}>
          <div className={styles.title}>
            <h1>后台管理系统</h1>
            <p>BACKSTAGE MANAGEMENT SYSTEM</p>
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.chooseSubmit}>
            <span className={this.state.scan ? styles.active : null} onClick={this.ScavengingLogin}>扫码登录</span>
            <span className={this.state.pwd ? styles.active : null} onClick={this.PasswordSignIn}>密码登录</span>
          </div>
          {
            this.state.pwd ?
              <div>
                <input className={styles.UserName} value={this.state.userName} onChange={this.userNameChange} style={{ backgroundImage: `url(${User})` }} placeholder="请输入用户名" />
                <input className={styles.PassWord} value={this.state.password} onChange={this.passWordChange} type='password' style={{ backgroundImage: `url(${PassWord})` }} placeholder="请输入密码" />
              </div>
              : null
          }
          {
            this.state.scan ?
              <div className={styles.codeImg}>
                <p>打开微信扫一扫&nbsp;&nbsp;扫描二维码登录</p>
                {/* <img src={require('./image/code.png')} /> */}
                <QRCode value={this.state.url ? this.state.url : null} />,
              </div>
              : null
          }
          {
            this.state.pwd ?
              <button className={styles.submitButton} onClick={this.handleSubmit}>登录</button>
              : null
          }
        </div>
        <div className={styles.bgShadow}>
          {
            this.state.pwd ?
              <img src={require('./image/pwdShadow.png')} />
              : null
          }
          {
            this.state.scan ?
              <img src={require('./image/codeShadow.png')} />
              : null
          }
        </div>
      </div>

    );
  }
}
