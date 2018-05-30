import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Layout, Icon, message, Form, Input, Modal } from "antd";
import DocumentTitle from "react-document-title";
import { connect } from "dva";
import { Route, Redirect, Switch, routerRedux } from "dva/router";
import { ContainerQuery } from "react-container-query";
import classNames from "classnames";
import { enquireScreen, unenquireScreen } from "enquire-js";
import GlobalHeader from "../components/GlobalHeader";
import SiderMenu from "../components/SiderMenu";
import NotFound from "../routes/Exception/404";
import { getRoutes } from "../utils/utils";
import Authorized from "../utils/Authorized";
import { getMenuData } from "../common/menu";
import logo from "../assets/logo1.svg";
import { Label } from "bizcharts";
const QRCode = require('qrcode.react');

const { Content, Header, Footer } = Layout;
const { AuthorizedRoute, check } = Authorized;
const FormItem = Form.Item;

/**
 * 根据菜单取得重定向地址.
 */
const redirectData = [];
const getRedirect = item => {
  if (item && item.children) {
    if (item.children[0] && item.children[0].path) {
      redirectData.push({
        from: `${item.path}`,
        to: `${item.children[0].path}`
      });
      item.children.forEach(children => {
        getRedirect(children);
      });
    }
  }
};
getMenuData().forEach(getRedirect);

/**
 * 获取面包屑映射
 * @param {Object} menuData 菜单配置
 * @param {Object} routerData 路由配置
 */
const getBreadcrumbNameMap = (menuData, routerData) => {
  const result = {};
  const childResult = {};
  for (const i of menuData) {
    if (!routerData[i.path]) {
      result[i.path] = i;
    }
    if (i.children) {
      Object.assign(childResult, getBreadcrumbNameMap(i.children, routerData));
    }
  }
  return Object.assign({}, routerData, result, childResult);
};

const query = {
  "screen-xs": {
    maxWidth: 575
  },
  "screen-sm": {
    minWidth: 576,
    maxWidth: 767
  },
  "screen-md": {
    minWidth: 768,
    maxWidth: 991
  },
  "screen-lg": {
    minWidth: 992,
    maxWidth: 1199
  },
  "screen-xl": {
    minWidth: 1200
  }
};

let isMobile;
enquireScreen(b => {
  isMobile = b;
});

class BasicLayout extends React.PureComponent {
  static childContextTypes = {
    location: PropTypes.object,
    breadcrumbNameMap: PropTypes.object
  };
  state = {
    isMobile,
    visable: false,
    uservisable: false,
    wechat: false,
    oldPassWord: '',
    newPassWord: '',
    userName: '',
    userPhone: '',
    userNickName: '',
    userRole: '',
    url: ''
  };
  getChildContext() {
    const { location, routerData } = this.props;
    return {
      location,
      breadcrumbNameMap: getBreadcrumbNameMap(getMenuData(), routerData)
    };
  }
  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      this.setState({
        isMobile: mobile
      });
    });
    this.props.dispatch({
      type: "user/fetchCurrent"
    });
  }
  componentWillUnmount() {
    unenquireScreen(this.enquireHandler);
  }
  getPageTitle() {
    const { routerData, location } = this.props;
    const { pathname } = location;
    let title = "后台管理系统";
    if (routerData[pathname] && routerData[pathname].name) {
      title = `${routerData[pathname].name} -后台管理系统`;
    }
    return title;
  }
  getBashRedirect = () => {
    // According to the url parameter to redirect
    // 这里是重定向的,重定向到 url 的 redirect 参数所示地址
    const urlParams = new URL(window.location.href);

    const redirect = urlParams.searchParams.get("redirect");
    // Remove the parameters in the url
    if (redirect) {
      urlParams.searchParams.delete("redirect");
      window.history.replaceState(null, "redirect", urlParams.href);
    } else {
      const { routerData } = this.props;
      // get the first authorized route path in routerData
      const authorizedPath = Object.keys(routerData).find(
        item => check(routerData[item].authority, item) && item !== "/"
      );
      return authorizedPath;
    }
    return redirect;
  };
  handleMenuCollapse = collapsed => {
    this.props.dispatch({
      type: "global/changeLayoutCollapsed",
      payload: collapsed
    });
  };
  handleNoticeClear = type => {
    message.success(`清空了${type}`);
    this.props.dispatch({
      type: "global/clearNotices",
      payload: type
    });
  };
  handleMenuClick = ({ key }) => {
    if (key === "triggerError") {
      this.props.dispatch(routerRedux.push("/exception/trigger"));
      return;
    }
    if (key === "logout") {
      this.props.dispatch({
        type: "login/logout"
      });
    }
    if (key === "updatePwd") {
      this.setState({
        visable: true,
        oldPassWord:'',
        newPassWord:''
      });
    }
    if (key === "bindingWeChat") {
      this.setState({
        wechat: true
      });
      const host = window.location.host;
      const now = new Date().getTime();
      const users = JSON.parse(localStorage.getItem("user"))
      this.setState({
        url: 'http://' + host + '/#/user/weChatMiddle?random=' + now + '&userId=' + users.key
      })
      this.props.dispatch({
        type: 'global/getWeChatCode',
        payload: {
          RandomCode: now
        },
      });
    }
    if (key === "updateUser") {
      const users = JSON.parse(localStorage.getItem("user"))
      this.setState({
        uservisable: true,
        userName: users.UserName,
        userNickName: users.NickName,
        userPhone: users.PhoneNum,
        userRole:users.RoleName
      });
    }
  };

  isOk = () => {
    if(this.state.oldPassWord==''||this.state.newPassWord==''){
      message.warning('密码不可为空');
      return;
    }
    const users = JSON.parse(localStorage.getItem("user"))
    this.props.dispatch({
      type: "global/updatePassword",
      payload: {
        key: users.key,
        oldPassWord: this.state.oldPassWord,
        newPassWord: this.state.newPassWord
      }
    });
    this.setState({
      visable: false
    });
  }
  onCancel = () => {
    this.setState({
      visable: false
    });
  }



  isUserOk = () => {
    if(this.state.userName==''||this.state.userNickName==''||this.state.userPhone==''){
      message.warning('个人信息不可为空');
      return;
    }
    const users = JSON.parse(localStorage.getItem("user"))
    this.props.dispatch({
      type: "global/updateUser",
      payload: {
        key: users.key,
        userName: this.state.userName,
        NickName: this.state.userNickName,
        PhoneNum: this.state.userPhone
      }
    });
    this.setState({
      uservisable: false
    });
  }
  handleWechatOk = (e) => {
    this.setState({
      wechat: false,
    });
  }
  handleWechatCancel = (e) => {
    this.setState({
      wechat: false,
    });
  }
  onCancel = () => {
    this.setState({
      visable: false
    });
  }
  onUserCancel = () => {
    this.setState({
      uservisable: false
    });
  }

  oldPassWordChange = (e) => {
    this.setState({ oldPassWord: e.target.value })
  }

  newPassWordChange = (e) => {
    this.setState({ newPassWord: e.target.value })
  }

  userNameChange = (e) => {
    this.setState({ userName: e.target.value })
  }

  userNickNameChange = (e) => {
    this.setState({ userNickName: e.target.value })
  }

  userPhoneChange = (e) => {
    this.setState({ userPhone: e.target.value })
  }

  handleNoticeVisibleChange = visible => {
    if (visible) {
      this.props.dispatch({
        type: "global/fetchNotices"
      });
    }
  };
  render() {
    const {
      currentUser,
      collapsed,
      fetchingNotices,
      notices,
      routerData,
      match,
      location
    } = this.props;
    const bashRedirect = this.getBashRedirect();
    const layout = (
      <Layout>
        <SiderMenu
          logo={logo}
          // 不带Authorized参数的情况下如果没有权限,会强制跳到403界面
          // If you do not have the Authorized parameter
          // you will be forced to jump to the 403 interface without permission
          Authorized={Authorized}
          menuData={getMenuData()}
          collapsed={collapsed}
          location={location}
          isMobile={this.state.isMobile}
          onCollapse={this.handleMenuCollapse}
        />
        <Layout>
          <Header style={{ padding: 0 }}>
            <GlobalHeader
              logo={logo}
              currentUser={currentUser}
              fetchingNotices={fetchingNotices}
              notices={notices}
              collapsed={collapsed}
              isMobile={this.state.isMobile}
              onNoticeClear={this.handleNoticeClear}
              onCollapse={this.handleMenuCollapse}
              onMenuClick={this.handleMenuClick}
              onNoticeVisibleChange={this.handleNoticeVisibleChange}
            />
          </Header>
          <Content style={{ margin: "24px 24px 0", height: "100%" }}>
            <Switch>
              {redirectData.map(item => (
                <Redirect key={item.from} exact from={item.from} to={item.to} />
              ))}
              {getRoutes(match.path, routerData).map(item => (
                <AuthorizedRoute
                  key={item.key}
                  path={item.path}
                  component={item.component}
                  exact={item.exact}
                  authority={item.authority}
                  redirectPath="/exception/403"
                />
              ))}
              <Redirect exact from="/" to={bashRedirect} />
              <Route render={NotFound} />
            </Switch>
          </Content>
          <Footer style={{ padding: 0 }} />
        </Layout>
      </Layout>
    );

    return (
      <div>
        <DocumentTitle title={this.getPageTitle()}>
          <ContainerQuery query={query}>
            {params => <div className={classNames(params)}>{layout}</div>}
          </ContainerQuery>
        </DocumentTitle>
        <Modal
          title={"修改密码"}
          visible={this.state.visable}
          onOk={this.isOk}
          onCancel={this.onCancel}
          destroyOnClose={true}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="旧密码"
          >
            <Input placeholder="请输入旧密码" value={this.state.oldPassWord} onChange={this.oldPassWordChange} />
          </FormItem>
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="新密码">
            <Input placeholder="请输入新密码" value={this.state.newPassWord} onChange={this.newPassWordChange} />
          </FormItem>
        </Modal>

        <Modal
          title={"修改个人信息"}
          visible={this.state.uservisable}
          onOk={this.isUserOk}
          onCancel={this.onUserCancel}
          destroyOnClose={true}
        >
          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="用户名"
          >
            <Input placeholder="请输入用户名" value={this.state.userName} onChange={this.userNameChange} />
          </FormItem>

          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="昵称"
          >
            <Input placeholder="请输入昵称" value={this.state.userNickName} onChange={this.userNickNameChange} />
          </FormItem>

          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="手机号"
          >
            <Input placeholder="请输入手机号" value={this.state.userPhone} onChange={this.userPhoneChange} />
          </FormItem>

          <FormItem
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 15 }}
            label="用户角色"
          >
          <Input value={this.state.userRole} disabled={true} />
          </FormItem>
        </Modal>
        <Modal
          title="绑定微信"
          visible={this.state.wechat}
          onOk={this.handleWechatOk}
          onCancel={this.handleWechatCancel}
        >
          <div style={{'textAlign':'center'}}>
            <QRCode value={this.state.url ? this.state.url : null} />,
          </div>
        </Modal>
      </div>
    );
  }
}

export default connect(({ user, global, loading }) => ({
  currentUser: user.currentUser,
  collapsed: global.collapsed,
  fetchingNotices: loading.effects["global/fetchNotices"],
  notices: global.notices
}))(BasicLayout);
