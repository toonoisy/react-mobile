import React, { Component } from "react";
import { reqCountryData } from "@api/common";
import { NavBar, Icon, List } from "antd-mobile";
import "@assets/css/common.css";
import './index.css'
const Item = List.Item;

export default class CountryPicker extends Component {
  state = {
    countryData: {},
  };
  async componentDidMount() {
    const result = await reqCountryData();
    this.setState({
      countryData: result,
    });
  }
  jumpToCountries = (ev) => {
    // scrollTo() 可把内容滚动到指定的坐标
    // offsetTop 到开启定位父元素的top距离
    window.scrollTo(0, document.getElementById(ev.target.textContent).offsetTop)
  }
  selectCountry = (value) => {
    return () => {
      this.props.history.push('/register/verifyphone', value)
    }
  }
  render() {
    const { countryData } = this.state;
    const keys = Object.keys(countryData);
    return (
      <div className="country-container">
        <div className="country-nav">
          {keys.map((key, index) => {
            // const href = '#' + key
            // eslint-disable-next-line
            return (<a key={index} onTouchEnd={this.jumpToCountries}>{key}</a>)
          })}
        </div>
        <NavBar
          mode="light"
          icon={<Icon type="left" className="icon-left" />}
          onLeftClick={() => console.log("onLeftClick")}
          className="country-navbar"
        >
          选择国家或者地区
        </NavBar>
        <div className="country-list">
          {keys.map((key, index) => {
            const items = countryData[key];
            return (
              <List renderHeader={() => key} className="my-list" key={index} id={key}>
                {items.map((item, index) => {
                  const key = Object.keys(item)[0];
                  const value = "+" + item[key];
                  return (
                    <Item extra={value} key={index} className="country-item" onClick={this.selectCountry(value)}>
                      {key}
                    </Item>
                  );
                })}
              </List>
            );
          })}
        </div>
      </div>
    );
  }
}
