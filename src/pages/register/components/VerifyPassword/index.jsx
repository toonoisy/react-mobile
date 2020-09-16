import React, { Component } from "react";
import {connect} from 'react-redux'
import {
  NavBar,
  Icon,
  InputItem,
  WhiteSpace,
  WingBlank,
  Button,
  Toast,
} from "antd-mobile";
import { Link } from "react-router-dom";
import { createForm } from "rc-form";
import { PASSWORD_REG } from "@utils/reg";
import { reqRegister } from "@api/register";
import "./index.css";

import msg from "./msg.png";

class VerifyPassword extends Component {
  state = {
    isDisabled: true,
    isShowPwd: false,
  };
  changeInputType = () => {
    let isShowPwd = !this.state.isShowPwd
    this.setState({
      isShowPwd
    })
  }
  validator = (rule, value, callback) => {
    let isDisabled = true;
    if (
      value &&
      value.length >= 8 &&
      value.length <= 20 &&
      PASSWORD_REG.test(value)
    ) {
      isDisabled = false;
    }
    this.setState({
      isDisabled,
    });
    callback();
  };
  next = () => {
    // const phone = this.props.location.state || localStorage.getItem("phone");
    const phone = this.props.phone
    const password = this.props.form.getFieldValue("password");
    reqRegister(phone, password)
      .then(() => {
        this.props.history.push("/");
      })
      .catch(() => {
        Toast.fail("注册失败，请重试");
      });
  };
  componentDidMount() {}
  render() {
    const { isDisabled, isShowPwd } = this.state;
    const { getFieldProps } = this.props.form;
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
          <p className="msg-title">请设置登录密码 </p>
          <WhiteSpace />
          <div className="verify-password">
            <InputItem
              clear
              placeholder="请设置8-20位登录密码"
              type={isShowPwd? "text" : "password"}
              extra={
                <span
                  onTouchEnd={this.changeInputType}
                  className={isShowPwd? "iconfont icon-eye1" : "iconfont icon-eye"}
                ></span>
              }
              {...getFieldProps("password", {
                rules: [
                  {
                    validator: this.validator,
                  },
                ],
              })}
            ></InputItem>
            <p className="verify-password-tip">
              密码由8-20位字母、数字或半角符号组成，不能是10位以下纯数字/字母/半角符号，字母需区分大小写
            </p>
          </div>
          <WhiteSpace />
          <WingBlank size="sm">
            <Button
              type="warning"
              disabled={isDisabled}
              className="warning-btn"
              onClick={this.next}
            >
              完成
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

export default connect((state) => (
  {phone: state.phone}
))(createForm()(VerifyPassword));
