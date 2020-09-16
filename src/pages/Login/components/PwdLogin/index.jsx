import React, { useState, useCallback } from "react";
import { Link } from "react-router-dom";
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
import { reqPwdLogin } from "@api/login";
import { PASSWORD_REG, PHONE_REG } from "@utils/reg";
import "../../index.css";

function PwdLogin({ form: { getFieldProps, getFieldsValue }, history }) {
  const [invalidPhone, setInvalidPhone] = useState(true);
  const [invalidPwd, setInvalidPwd] = useState(true);
  const [showPwd, setShowPwd] = useState(false);
  const changeInputType = useCallback(() => {
    setShowPwd(!showPwd);
  }, [showPwd]);

  const validator = useCallback((rule, value, callback) => {
    const field = rule.field;
    if (field === "phone") {
      if (value.length === 11 && PHONE_REG.test(value)) {
        setInvalidPhone(false);
      } else {
        setInvalidPhone(true);
      }
    } else {
      if (value.length >= 8 && value.length <= 20 && PASSWORD_REG.test(value)) {
        setInvalidPwd(false);
      } else {
        setInvalidPwd(true);
      }
    }
    callback();
  }, []);

  const login = useCallback(() => {
    const { phone, pwd } = getFieldsValue();
    reqPwdLogin(phone, pwd)
      .then((res) => {
        history.push("/");
      })
      .catch((err) => {
        Toast.fail(err);
      });
      // eslint-disable-next-line
  }, []);

  const loginWithGithub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=b123886343fb8c078430`;
  };

  return (
    <div className="container">
      <NavBar
        mode="light"
        icon={<Icon type="left" className="icon-left" />}
        onLeftClick={() => history.goBack()}
      >
        硅谷注册登录
      </NavBar>
      <WhiteSpace size="lg" />
      <div className="login-content">
        <InputItem
          clear
          placeholder="用户名/邮箱/手机号"
          {...getFieldProps("phone", {
            rules: [{ validator }],
          })}
        ></InputItem>
        <WhiteSpace size="lg" />
        <div className="login-code">
          <InputItem
            clear
            className="input"
            type={showPwd ? "text" : "password"}
            placeholder="请输入密码"
            extra={
              <span
                onTouchEnd={changeInputType}
                className={showPwd ? "iconfont icon-eye1" : "iconfont icon-eye"}
              ></span>
            }
            {...getFieldProps("pwd", {
              rules: [{ validator }],
            })}
          ></InputItem>
          <button className="text-btn login-send-code">忘记密码</button>
        </div>
        <WhiteSpace size="lg" />
        <WingBlank>
          <Button
            type="warning"
            disabled={invalidPhone || invalidPwd}
            className="warning-btn"
            onClick={login}
          >
            登录
          </Button>
        </WingBlank>
        <WhiteSpace />
        <WingBlank>
          <div className="quick-btn">
            <Link to="/login" className="text-btn">
              短信验证码登录
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
            onTouchEnd={loginWithGithub}
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

export default createForm()(PwdLogin);
