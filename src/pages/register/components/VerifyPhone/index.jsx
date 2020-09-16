import React, { Component } from "react";
import { Link } from "react-router-dom";
import {connect} from 'react-redux'
import { savePhone } from "../../../../store/actions/phone";
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
import { createForm } from "rc-form";
import { reqVerifyPhone } from "@api/register";
import { PHONE_REG } from "@utils/reg";

import "./index.css";

// const PHONE_REG = /(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57]|198)[0-9]{8}$/;

class VerifyPhone extends Component {
  state = {
    isDisabled: true,
  };
  validator = (rule, value, callback) => {
    let isDisabled = true;
    if (value && value.length === 11 && PHONE_REG.test(value)) {
      isDisabled = false;
    }
    this.setState({
      isDisabled,
    });
    callback();
  };
  componentDidMount() {
    if (this.props.location.state) return;
    Modal.alert(
      "注册协议及隐私政策",
      <div>
        <span>
          在您注册成为硅谷用户的过程中，您需要完成我们的注册流程并通过点击同意的形式在线签署以下协议，
          <u>
            请您务必仔细阅读、充分理解协议中的条款内容后再点击同意（尤其是以粗体并下划线标识的条款，因为这些条款可能会明确您应履行的义务或对您的权利有所限制）：
          </u>
        </span>
        <p className="policy-link-tip">《硅谷用户注册协议》</p>
        <p className="policy-link-tip">《硅谷隐私政策》</p>
      </div>,
      [
        {
          text: "不同意",
          onPress: () => this.props.history.push("/login"),
        },
        {
          text: "同意",
          style: { background: "red", color: "#fff" },
        },
      ]
    );
  }
  next = () => {
    const phone = this.props.form.getFieldValue("phone");
    reqVerifyPhone(phone)
      .then((res) => {
        Modal.alert(
          // title
          "",
          // content
          `我们将发送短信/语音验证码至：${phone}`,
          // btns
          [
            {
              text: "取消",
            },
            {
              text: "确认",
              onPress: () => {
                this.props.savePhone(phone)
                localStorage.setItem("phone", phone);
                this.props.history.push("/register/verifycode");
              },
              style: { background: "red", color: "#fff" },
            },
          ]
        );
      })
      .catch((err) => {
        Toast.info(err);
      });
  };
  render() {
    const { isDisabled } = this.state;
    const { getFieldProps } = this.props.form;
    const { state } = this.props.location;
    return (
      <div className="container">
        <NavBar
          mode="light"
          icon={<Icon type="left" className="icon-left" />}
          onLeftClick={() => this.props.history.goBack()}
        >
          注册硅谷
        </NavBar>
        <WhiteSpace size="xl" />
        <WingBlank size="lg">
          <InputItem
            clear
            placeholder="请输入手机号"
            {...getFieldProps(
              // 表单字段
              "phone",
              {
                rules: [
                  // 表单校验规则
                  {
                    // 自定义表单校验规则
                    // 当用户输入数据时，会触发
                    validator: this.validator,
                  },
                ],
              }
            )}
          >
            <Link to="/common/countrypicker" className="phone-prefix">
              <span>{state ? state : "+86"}</span>
              <Icon type="down" />
            </Link>
          </InputItem>
        </WingBlank>
        <WhiteSpace size="xl" />
        <WhiteSpace size="xl" />
        <WingBlank size="lg">
          <Button
            type="warning"
            disabled={isDisabled}
            className="warning-btn"
            onClick={this.next}
          >
            下一步
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default connect(null, {savePhone})(createForm()(VerifyPhone));
