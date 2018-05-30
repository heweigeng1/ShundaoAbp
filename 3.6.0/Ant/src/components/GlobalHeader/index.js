import React, { PureComponent } from "react";
import {
  Menu,
  Icon,
  Spin,
  Tag,
  Dropdown,
  Avatar,
  Divider,
  Tooltip
} from "antd";
import moment from "moment";
import groupBy from "lodash/groupBy";
import Debounce from "lodash-decorators/debounce";
import { Link } from "dva/router";
import styles from "./index.less";

export default class GlobalHeader extends PureComponent {
  constructor() {
    super();
    this.state = {
      openId: ''
    }
  }
  componentWillUnmount() {
    this.triggerResizeEvent.cancel();
  }
  componentDidMount() {
   
    if(localStorage.getItem("user")!==null&&localStorage.getItem("user")!=='null'&&localStorage.getItem("user")!=='')
    {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.OpenId !== '') {
      this.setState({
        openId: user.OpenId
      })
      }
  }
  else
  {
    window.location.href = "/#/user/login"
    window.location.reload();
  }
}
  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      // transform id to item key
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: "",
          processing: "blue",
          urgent: "red",
          doing: "gold"
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, "type");
  }
  toggle = () => {
    const { collapsed, onCollapse } = this.props;
    onCollapse(!collapsed);
    this.triggerResizeEvent();
  };
  /* eslint-disable*/
  @Debounce(600)
  triggerResizeEvent() {
    const event = document.createEvent("HTMLEvents");
    event.initEvent("resize", true, false);
    window.dispatchEvent(event);
  }
  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      isMobile,
      logo,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear
    } = this.props;
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item disabled>
          <Icon type="user" />个人中心
        </Menu.Item>
        <Menu.Item disabled>
          <Icon type="setting" />设置
        </Menu.Item>
        {/* <Menu.Item key="triggerError">
          <Icon type="close-circle" />触发报错
        </Menu.Item> */}
        <Menu.Divider />

        <Menu.Item key="updateUser">
          <Icon type="user" />修改用户信息
        </Menu.Item>
        <Menu.Item key="updatePwd">
          <Icon type="user" />修改密码
        </Menu.Item>
        {
          this.state.openId ? null :
          <Menu.Item key="bindingWeChat">
            <Icon type="user" />绑定微信
          </Menu.Item>
        }
        <Menu.Item key="logout">
          <Icon type="logout" />退出登录
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    if (localStorage.getItem("user")===null||localStorage.getItem("user") === 'null' || localStorage.getItem("user") === "") {
      window.location.href = "/#/user/login"
      return (<div></div>)
    }
    const user = JSON.parse(localStorage.getItem("user"))
    return (
      <div className={styles.header}>
        {isMobile && [
          <Link to="/" className={styles.logo} key="logo">
            <img src={logo} alt="logo" width="32" />
          </Link>,
          <Divider type="vertical" key="line" />
        ]}
        <Icon
          className={styles.trigger}
          type={collapsed ? "menu-unfold" : "menu-fold"}
          onClick={this.toggle}
        />
        <div className={styles.right}>
          {
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar
                  size="default"
                  className={styles.avatar}
                  src={user.ImageKey}
                />

                <span className={styles.name}>{user.NickName}</span>
              </span>
            </Dropdown>
          }
        </div>
      </div>
    );
  }
}