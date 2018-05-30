import { createElement } from 'react';
import dynamic from 'dva/dynamic';
import pathToRegexp from 'path-to-regexp';
import { getMenuData } from './menu';

let routerDataCache;

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
const dynamicWrapper = (app, models, component) => {
  // () => require('module')
  // transformed by babel-plugin-dynamic-import-node-sync
  if (component.toString().indexOf('.then(') < 0) {
    models.forEach(model => {
      if (modelNotExisted(app, model)) {
        // eslint-disable-next-line
        app.model(require(`../models/${model}`).default);
      }
    });
    return props => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return createElement(component().default, {
        ...props,
        routerData: routerDataCache,
      });
    };
  }
  // () => import('module')
  return dynamic({
    app,
    models: () =>
      models.filter(model => modelNotExisted(app, model)).map(m => import(`../models/${m}.js`)),
    // add routerData prop
    component: () => {
      if (!routerDataCache) {
        routerDataCache = getRouterData(app);
      }
      return component().then(raw => {
        const Component = raw.default || raw;
        return props =>
          createElement(Component, {
            ...props,
            routerData: routerDataCache,
          });
      });
    },
  });
};

function getFlatMenuData(menus) {
  let keys = {};
  menus.forEach(item => {
    if (item.children) {
      keys[item.path] = { ...item };
      keys = { ...keys, ...getFlatMenuData(item.children) };
    } else {
      keys[item.path] = { ...item };
    }
  });
  return keys;
}

export const getRouterData = app => {
  const routerConfig = {
    '/': {
      component: dynamicWrapper(app, ['user', 'login'], () => import('../layouts/BasicLayout')),
    },
    '/admin/menu': {
      component: dynamicWrapper(app, ['menu'], () => import('../routes/Menu/MenuList')),
    },
    '/admin/user': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/User/UserList')),
    },
    '/list/baidu-map': {
      component: dynamicWrapper(app, ['rule'], () => import('../routes/List/BaiduMap')),
    },
    '/list/feedback': {
      component: dynamicWrapper(app, ['feedback'], () => import('../routes/List/FeedBackList')),
    },
    '/list/systeminfo': {
      component: dynamicWrapper(app, ['systeminfo'], () => import('../routes/List/SyStemInfoList')),
    },
    '/list/refund': {
      component: dynamicWrapper(app, ['refund'], () => import('../routes/List/RefundList')),
    },
    '/exception/403': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/403')),
    },
    '/exception/404': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/404')),
    },
    '/exception/500': {
      component: dynamicWrapper(app, [], () => import('../routes/Exception/500')),
    },
    '/exception/trigger': {
      component: dynamicWrapper(app, ['error'], () =>
        import('../routes/Exception/triggerException')
      ),
    },
    '/user': {
      component: dynamicWrapper(app, [], () => import('../layouts/UserLayout')),
    },
    '/user/login': {
      component: dynamicWrapper(app, ['login'], () => import('../routes/User/Login')),
    },
  
    '/admin/role': {
      component: dynamicWrapper(app, ['role'], () => import('../routes/Role/RoleList')),
    },
    '/admin/ArticleForm': {
      component: dynamicWrapper(app, ['article'], () => import('../routes/Article/ArticleForm')),
    },
    '/admin/article': {
      component: dynamicWrapper(app, ['article'], () => import('../routes/Article/ArticleList')),
    },
    '/distribution/reward': {
      component: dynamicWrapper(app, ['reward'], () => import('../routes/Reward/RewardList')),
    },
    '/productm/order': {
      component: dynamicWrapper(app, ['order'], () => import('../routes/Order/OrderList')),
    },
    '/productm/OrderDetailList': {
      component: dynamicWrapper(app, ['orderdetail'], () => import('../routes/OrderDetail/OrderDetailList')),
    },
    '/productm/product': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/ProductList')),
    },
    '/productm/ProductForm': {
      component: dynamicWrapper(app, ['product'], () => import('../routes/Product/ProductForm')),
    },
    '/productm/species': {
      component: dynamicWrapper(app, ['species'], () => import('../routes/Product/SpeciesList')),
    },
    '/productm/SpeciesModel': {
      component: dynamicWrapper(app, ['species'], () => import('../routes/Product/SpeciesModel')),
    },
    '/productm/store': {
      component: dynamicWrapper(app, ['store'], () => import('../routes/Product/StoreList')),
    },
    '/distribution/advance': {
      component: dynamicWrapper(app, ['advance'], () => import('../routes/Advance/AdvanceList')),
    },
    '/admin/user': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/User/UserList')),
    },
    '/admin/userinfo': {
      component: dynamicWrapper(app, ['userinfo'], () => import('../routes/User/UserInfoList')),
    },
    '/user/userWeiXin': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/User/WeiXin')),
    },
    '/user/weChatMiddle': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/User/weChatMiddle')),
    },
    '/user/success': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/User/success')),
    },
    '/user/fail': {
      component: dynamicWrapper(app, ['user'], () => import('../routes/User/fail')),
    },
  };
  // Get name from ./menu.js or just set it in the router data.
  const menuData = getFlatMenuData(getMenuData());

  // Route configuration data
  // eg. {name,authority ...routerConfig }
  const routerData = {};
  // The route matches the menu
  Object.keys(routerConfig).forEach(path => {
    // Regular match item name
    // eg.  router /user/:id === /user/chen
    const pathRegexp = pathToRegexp(path);
    const menuKey = Object.keys(menuData).find(key => pathRegexp.test(`${key}`));
    let menuItem = {};
    // If menuKey is not empty
    if (menuKey) {
      menuItem = menuData[menuKey];
    }
    let router = routerConfig[path];
    // If you need to configure complex parameter routing,
    // https://github.com/ant-design/ant-design-pro-site/blob/master/docs/router-and-nav.md#%E5%B8%A6%E5%8F%82%E6%95%B0%E7%9A%84%E8%B7%AF%E7%94%B1%E8%8F%9C%E5%8D%95
    // eg . /list/:type/user/info/:id
    router = {
      ...router,
      name: router.name || menuItem.name,
      authority: router.authority || menuItem.authority,
      hideInBreadcrumb: router.hideInBreadcrumb || menuItem.hideInBreadcrumb,
    };
    routerData[path] = router;
  });
  return routerData;
};
