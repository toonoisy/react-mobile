import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { savePhone } from "../../../../store/actions/phone";
import {
  NavBar,
  Icon,
  InputItem,
  WhiteSpace,
  WingBlank,
  Button,
  Toast,
} from "antd-mobile";
import { createForm } from "rc-form";
import { reqSendCode, reqLoginByPhone } from "@api/login";
import { CODE_REG, PHONE_REG } from "@utils/reg";

import "../../index.css";

class Login extends Component {
  state = {
    isDisableSendCode: true,
    isDiableLogin: true,
    isSendingCode: false,
    timeout: 60,
  };
  validator = (rule, value, callback) => {
    const field = rule.field;
    let isDisableSendCode = true;
    let isDiableLogin = true;
    if (field === "phone") {
      if (value.length === 11 && PHONE_REG.test(value)) {
        isDisableSendCode = false;
      }
      this.setState({
        isDisableSendCode,
      });
    } else {
      if (value.length === 6 && CODE_REG.test(value)) {
        isDiableLogin = false;
      }
      this.setState({
        isDiableLogin,
      });
    }
    callback();
  };
  sendCode = () => {
    const { isDisableSendCode, isSendingCode } = this.state;
    if (isDisableSendCode || isSendingCode) return;
    const phone = this.props.form.getFieldValue("phone");

    this.props.savePhone(phone);
    localStorage.setItem("phone", phone);

    reqSendCode(phone)
      .then(() => {
        this.setState({
          isSendingCode: true,
        });
        const timer = setInterval(() => {
          const { timeout } = this.state;
          const result = timeout - 1;
          if (result <= 0) {
            this.setState({
              isSendingCode: false,
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
  login = () => {
    if (!this.state.isSendingCode) {
      Toast.info("请先获取验证码");
      return;
    }
    const { phone, code } = this.props.form.getFieldsValue();
    reqLoginByPhone(phone, code)
      .then((res) => {
        this.props.history.push("/");
      })
      .catch((err) => {
        Toast.info(err);
      });
  };
  loginWithGithub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=b123886343fb8c078430`;
  };
  render() {
    const {
      isDisableSendCode,
      isDiableLogin,
      isSendingCode,
      timeout,
    } = this.state;
    const { getFieldProps } = this.props.form;
    const {phone} = this.props;
    return (
      <div className="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" className="icon-left" />}
          onLeftClick={() => console.log("onLeftClick")}
        >
          硅谷注册登录
        </NavBar>
        <WhiteSpace size="lg" />
        <div className="login-content">
          <InputItem
            clear
            placeholder="请输入手机号"
            {...getFieldProps("phone", {
              rules: [{ validator: this.validator }],
              initialValue: phone,
            })}
          >
            <div className="phone-prefix">
              <span>+86</span>
              <Icon type="down" />
            </div>
          </InputItem>
          <WhiteSpace size="lg" />
          <div className="login-code">
            <InputItem
              clear
              className="input"
              placeholder="请输入手机验证码"
              {...getFieldProps("code", {
                rules: [{ validator: this.validator }],
              })}
            ></InputItem>
            <button
              className="text-btn login-send-code"
              disabled={isDisableSendCode}
              onTouchEnd={this.sendCode}
            >
              {isSendingCode ? `重新发送(${timeout}s)` : "获取验证码"}
            </button>
          </div>
          <WhiteSpace size="lg" />
          <WingBlank>
            <Button
              type="warning"
              disabled={isDiableLogin}
              className="warning-btn"
              onClick={this.login}
            >
              登录
            </Button>
          </WingBlank>
          <WhiteSpace />
          <WingBlank>
            <div className="quick-btn">
              <Link to="/login/pwd" className="text-btn">
                账户密码登录
              </Link>
              <Link to="/register/verifyphone" className="text-btn">
                手机快速注册
              </Link>
            </div>
          </WingBlank>
          <div className="login-third-party">其他登录方式</div>
          <div className="login-icons">
            <span
              className="iconfont icon-github"
              onTouchEnd={this.loginWithGithub}
            ></span>
            <span className="iconfont icon-qq"></span>
            <span className="iconfont icon-wechat"></span>
          </div>
          <WingBlank>
            <div className="login-policy">
              未注册的手机号验证后将自动创建硅谷账号, 登录即代表您已同意
              <Link to="/" className="login-policy-btn">
                硅谷隐私政策
              </Link>
            </div>
          </WingBlank>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ phone: state.phone }), { savePhone })(
  createForm()(Login)
);
