import { queryNotices } from "../services/api";
import { getUserById, updatePassword, update, weChatCode } from '../services/user';
import { checkResponse, messagePut } from '../utils/errPut';

export default {
  namespace: "global",

  state: {
    collapsed: false,
    notices: [],
    user: [],
    modalVisible: false,
  }, 

  effects: {
    *fetchNotices(_, { call, put }) {
      const data = yield call(queryNotices);
      yield put({
        type: "saveNotices",
        payload: data
      });
      yield put({
        type: "user/changeNotifyCount",
        payload: data.length
      });
    },
    *updatePassword({ payload }, { call, put }) {
      const response = yield call(updatePassword, payload);
      //提示信息
      yield call(messagePut, { response, put });
    },
    *updateUser({ payload }, { call, put }) {
      const response = yield call(update, payload);
      //提示信息
      yield call(messagePut, { response, put });
      if (response.Success) {
        const response1 = yield call(getUserById, payload);
        if (response1 != null || response1 != '') {
          localStorage.setItem("user", JSON.stringify(response1.Value));
        }
      }
      //刷新页面
      location.reload(true);
    },
    *clearNotices({ payload }, { put, select }) {
      yield put({
        type: "saveClearedNotices",
        payload
      });
      const count = yield select(state => state.global.notices.length);
      yield put({
        type: "user/changeNotifyCount",
        payload: count
      });
    },
    *bindingWeChat({ payload }, { put, select }) {
      
    },
    *getWeChatCode({ payload }, { call, put }) {
      console.log(payload)
      var response = yield call(weChatCode, payload);
      console.log(response)
      // while (true) {
      //   if (response.Value !== null) {
      //     break;
      //   } else {
      //     response = yield call(weChatCode, payload);
      //   }
      // }
      // if (response.Success === true) {
      //   yield put({
      //     type: "changeLoginStatus",
      //     payload: response.Value
      //   });
      //   reloadAuthorized();
      //   localStorage.setItem("user", JSON.stringify(response.Value));
      //   yield put(routerRedux.push("/"));
      // }
      // else {
      //   message.warning(response.Message);
      // }
    },
  },

  reducers: {
    changeLayoutCollapsed(state, { payload }) {
      return {
        ...state,
        collapsed: payload
      };
    },
    saveNotices(state, { payload }) {
      return {
        ...state,
        notices: payload
      };
    },
    loadUser(state, { payload }) {
      return {
        ...state,
        user: payload
      };
    },
    saveClearedNotices(state, { payload }) {
      return {
        ...state,
        notices: state.notices.filter(item => item.type !== payload)
      };
    }
  },

  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        if (typeof window.ga !== "undefined") {
          window.ga("send", "pageview", pathname + search);
        }
      });
    }
  }
};
