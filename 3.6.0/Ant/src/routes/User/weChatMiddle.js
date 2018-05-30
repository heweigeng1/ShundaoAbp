import React, { PureComponent } from "react";
import axios from 'axios'
import { connect } from 'dva';
@connect(state => ({
  user: state.user,
}))
export default class MenuList extends PureComponent {
  constructor() {
    super()
    this.state = {
      code: ''
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    var url = document.location.toString();
    var arrObj = url.split("?");
    if (arrObj.length > 2) {
      var arrPara = arrObj[1].split("&");
      var arr,random,code
      for (var i = 0; i < arrPara.length; i++) {
        arr = arrPara[i].split("=");
        if (arr != null && arr[0] == 'code') {
          code = arr[1]
        }
      }
      var arrPara1 = arrObj[2].split("&");
      var userId = arrPara1[1].split("=")[1];
      random = arrPara1[0].split("=")[1]
      const { dispatch } = this.props;
      dispatch({
        type: "user/wxCode",
        payload: {
          Code: code,
          RandomCode: random,
          UserId: userId
        },
      });
      return "";
    }
    else {
      window.location.href = 'https://yg.shundaonetwork.com/WX.html?appid=wx292f2a03126d7115&scope=snsapi_userinfo&state=123&redirect_uri=' + encodeURIComponent(location.href);
    }
  }

  render() {
    return (
      <div></div>
    )
  }
}