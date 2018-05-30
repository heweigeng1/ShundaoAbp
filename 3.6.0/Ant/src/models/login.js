import { routerRedux } from "dva/router";
import { fakeAccountLogin, getCode1, weChatCode } from "../services/api";
import { setAuthority } from "../utils/authority";
import { reloadAuthorized } from "../utils/Authorized";
import {message } from 'antd';
export default {
  namespace: "login",

  state: {
    status: undefined
  },

  effects: {
    *login({ payload }, { call, put }) {
      localStorage.setItem("user","");
      const response = yield call(fakeAccountLogin, payload);
      
      // Login successfully
      if (response.Success === true) {
        yield put({
          type: "changeLoginStatus",
          payload: response.Value
        });
        reloadAuthorized();
        localStorage.setItem("user", JSON.stringify(response.Value));
        yield put(routerRedux.push("/"));
      }
      else
      {
        message.warning(response.Message);
      }
    },
    *getCode({ payload }, { call, put }) {
      var  response = yield call(getCode1, payload);
      while (true) {
        if (response.Value !== null) {
          break;
        } else {
            response = yield call(getCode1, payload);
        }
      } 
      if (response.Success === true) {
        yield put({
          type: "changeLoginStatus",
          payload: response.Value
        });
        reloadAuthorized();
        localStorage.setItem("user", JSON.stringify(response.Value));
        console.log('55555555555')
        yield put(routerRedux.push("/"));
      }
      else
      {
        message.warning(response.Message);
      }
    },
    *logout(_, { put, select }) {
      try {
        localStorage.setItem("user",null);
        console.log( localStorage.getItem("user"))
        // get location pathname
        const urlParams = new URL(window.location.href);
        const pathname = yield select(state => state.routing.location.pathname);
        // add the parameters in the url
        urlParams.searchParams.set("redirect", pathname);
        window.history.replaceState(null, "login", urlParams.href);
        localStorage.setItem("user",null);
      } finally {
        yield put({
          type: "changeLoginStatus",
          payload: {
            status: false,
            currentAuthority: "guest"
          }
        });
        reloadAuthorized();
        yield put(routerRedux.push("/user/login"));
      }
    }
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      //setAuthority(payload.currentAuthority);
      setAuthority(payload.Menulist)
      //setAuthority(['user', 'role'])
      return {
        ...state,
        status: 'ok',
        type:'account'
      };
    }
  }
};
