import React, { PureComponent } from "react";
import axios from 'axios'
import { connect } from 'dva';
import style from '../User/success.less';
import 'weui';


@connect(state => ({
  user: state.user,
}))
export default class MenuList extends PureComponent {
  constructor() {
    super()
    this.state = {
    }
  }

componentDidMount() {
}

render() {
  return (
    <div className={style.successContainer}>
      <i className="weui-icon-success weui-icon_msg" />
      <p>登录成功</p>
      <div>这是一段文字。。。。。。。。</div>
    </div>
  )
}
}