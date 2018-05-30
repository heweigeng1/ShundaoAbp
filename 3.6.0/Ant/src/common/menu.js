import React, { PureComponent, Component } from "react";
import { isUrl, host } from "../utils/utils";


var menuDataAdmin = [
  {
    name: '系统设置',
    icon: 'usergroup-add',
    path: 'admin',
    authority: 'admin',
    children: [
      {
        name: '菜单管理',
        path: 'menu',
        authority: 'menu',
      },
      {
        name: '用户管理',
        path: 'user',
        authority: 'user',
      },
      {
        name: '普通用户',
        path: 'userinfo',
        //authority: 'userinfo',
      },
      {
        name: '角色管理',
        path: 'role',
        authority: 'role',
      },
      {
        name: '文章管理',
        path: 'article',
        authority: 'article',
      },
    ],
  },
  {
    name: '商品',
    icon: 'table',
    path: 'productm',
    //authority: 'product',
    children: [
      {
        name: '商品管理',
        path: 'product',
        //authority: 'product',
      },
      {
        name: '商品类型',
        path: 'species',
        //authority: 'species',
      },
      {
        name: '订单管理',
        path: 'order',
        //authority: 'order',
      },
      {
        name: '进货记录',
        path: 'store',
        //authority: 'store',
      },
    ],
  },
  {
    name: '三级分销',
    icon: 'table',
    path: 'distribution',
    //authority: 'distribution',
    children: [
      {
        name: '奖励管理',
        path: 'reward',
        //authority: 'reward',
      },
      {
        name: '奖励明细',
        path: 'advance',
        //authority: 'advance',
      },
    ],
  },
  {
    name: '列表页',
    icon: 'table',
    path: 'list',
    authority: 'list',
    children: [
      {
        name: '百度地图',
        path: 'baidu-map',
        authority: 'baidu-map',
      },
      {
        name: '用户反馈',
        path: 'feedback',
        authority: 'feedback',
      },
      {
        name: '系统消息',
        path: 'systeminfo',
        authority: 'systeminfo',
      },
      {
        name: '退款记录',
        path: 'refund',
        //authority: 'refund',
      },
    ],
  },
  {
    name: '异常页',
    icon: 'warning',
    path: 'exception',
    children: [
      {
        name: '403',
        path: '403',
        authority: '403',
      },
      {
        name: '404',
        path: '404',
        authority: '404',
      },
      {
        name: '500',
        path: '500',
        authority: '500',
      },
      {
        name: '触发异常',
        path: 'trigger',
        hideInMenu: true,
        authority: 'trigger',
      },
    ],
  },
];

function formatter(data, parentPath = "/", parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority,
    };
    if (item.children) {
      result.children = formatter(item.children, `${parentPath}${item.path}/`, item.authority);
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuDataAdmin);
