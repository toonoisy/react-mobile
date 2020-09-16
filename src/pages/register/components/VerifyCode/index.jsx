import React, { Component } from "react";
import { connect } from "react-redux";
import {
  NavBar,
  Icon,
  InputItem,
  WhiteSpace,
  WingBlank,
  Button,
  Modal,
  Toast,
} from "antd-mobile";
import { Link } from "react-router-dom";
import { reqSendCode } from "@api/login";
import { reqVerifyCode } from "@api/register";
import {createForm} from 'rc-form'
import {CODE_REG} from '@utils/reg'
import "./index.css";

import msg from "./msg.png";

// const CODE_REG = /[0-9]{6}/

class VerifyCode extends Component {
  state = {
    isDisabled: true,
    isSendCode: false,
    timeout: 60,
  };
  sendCode = () => {
    const phone = this.props.location.state || localStorage.getItem("phone");
    reqSendCode(phone)
      .then(() => {
        this.setState({
          isSendCode: true,
        });
        const timer = setInterval(() => {
          const { timeout } = this.state;
          const result = timeout - 1;
          if (result <= 0) {
            this.setState({
              isSendCode: false,
              timeout: 60,
            });
            clearInterval(timer);
            return;
          }
          this.setState({
            timeout: result,
          });
        }, 1000);
      })
      .catch(() => {});
  };
  resend = () => {
    if (this.state.isSendCode) return
    const phone = this.props.location.state || localStorage.getItem('phone')
    Modal.alert(
      '',
      `我们将发送短信/语音验证码至：${phone}`,
      [
        {
          text: '取消'
        },
        {
          text: '确认',
          onPress: () => {
            this.sendCode()
          },
          style: {background: 'red', color: '#fff'}
        },
      ]
    )
  }
  validator = (rule, value, callback) => {
    let isDisabled = true
    if (value && value.length === 6 && CODE_REG.test(value)) {
      isDisabled = false
    }
    this.setState({
      isDisabled
    })
    callback()
  }
  next = () => {
    // const phone = this.props.location.state || localStorage.getItem('phone')
    const phone = this.props.phone
    const code = this.props.form.getFieldValue('code')
    reqVerifyCode(phone, code)
    .then(() => {this.props.history.push('/register/verifypassword', phone)})
    .catch(() => {Toast.info('验证码错误！')})
  }
  componentDidMount() {
    this.sendCode()
  }
  render() {
    const {isDisabled, isSendCode, timeout} = this.state
    const {getFieldProps} = this.props.form
    return (
      <div className="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" className="icon-left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          注册硅谷
        </NavBar>
        <div className="content">
          <img src={msg} alt="" className="msg-img" />
          <p className="msg">
            我们将以短信或电话的形式将验证码发送给您，请注意接听0575/025/0592/010等开头的电话
          </p>
          <WhiteSpace />
          <div className="verify-code">
            <InputItem clear placeholder="请输入手机验证码" {...getFieldProps('code', {
              rules: [
                {
                  validator: this.validator
                }
              ]
            })}></InputItem>
            <button className={isSendCode? 'sending-code' : 'send-code'} onTouchEnd={this.resend}>
              {isSendCode ? <span>
              重新发送<span>({timeout}s)</span>
              </span> : '获取验证码'}
            </button>
          </div>
          <WingBlank size="sm">
            <Button
              type="warning"
              disabled={isDisabled}
              className="warning-btn"
              onClick={this.next}
            >
              下一步
            </Button>
          </WingBlank>
          <WhiteSpace size="xl" />
          <div className="i-have-problem">
            <span>遇到问题？请</span>
            <Link className="ask-for-help" to="/">
              联系客服
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({phone: state.phone})
)(createForm()(VerifyCode))