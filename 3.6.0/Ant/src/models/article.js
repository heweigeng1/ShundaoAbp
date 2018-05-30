import { search, changeDelflag, add, update, getarticle } from '../services/article';
import { routerRedux } from 'dva/router'
import { checkResponse, messagePut } from '../utils/errPut';
export default {
  namespace: 'article',

  state: {
    data: {
      list: [],
      articlelist: [],
      pagination: {},
    },
    loading: false,
    modal: {
      title: "",
      data: {},
      isAdd: true,
      confirmLoading: false,
      modalVisible: false,
    },
  },

  effects: {
    *search({ payload }, { call, put }) {
      const response = yield call(search, payload);
      yield put({
        type: 'loadList',
        payload: response.Value,
      });
    },
    *changearticle({ payload }, { call, put }) {
      yield put(payload.data.key == '' ? routerRedux.push('/admin/ArticleForm') : routerRedux.push('/admin/ArticleForm?id=' + payload.data.key)
      )
    },
    *getarticle({ payload }, { call, put }) {
      const response = yield call(getarticle, payload);
      yield put({
        type: 'changearticleLoad',
        payload: response,
      });
      return response.Value.Content;
    },
    *changeDelflag({ payload }, { call, put }) {
      const { record, formValues } = payload;
      const response = yield call(changeDelflag, record);
      yield call(messagePut, { response, put });
      yield put({
        type: 'changeLoading',
        payload: true,
      });
      const response1 = yield call(search, {
        ...formValues,
        pagination: {},
      });
      yield put({
        type: 'loadList',
        payload: response1.Value,
      });
      yield put({
        type: 'changeLoading',
        payload: false,
      });
    },
    *add({ payload }, { call, put }) {
      const response = yield call(add, payload);
      yield call(messagePut, { response, put });
      if (response.Success) {
        yield put(routerRedux.push('/admin/article'));
      }
    },
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      yield call(messagePut, { response, put });
      if (response.Success) {
        yield put(routerRedux.push('/admin/article'));
      }
    },
    *hideVisible(_, { call, put }) {
      yield put({
        type: 'hideModal',
      });
    },
    *changeModalVisible({ payload }, { call, put }) {
      yield put({
        type: 'changeVisible',
        payload: payload,
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload,
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload
      };
    },
    loadList(state, { payload }) {
      return {
        ...state,
        data: {
          list: payload.Value,
          pagination: {
            total: payload.TotalCount,
            pageSize: payload.PageSize,
            current: payload.PageIndex,
          },
        },
        loading: false,
      };
    },
    hideModal(state, action) {
      return {
        ...state,
        modal: {
          ...state.modal,
          modalVisible: false,
        },
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload,
      };
    },
    changeVisible(state, { payload }) {
      return {
        ...state,
        modal: {
          title: payload.title,
          data: payload.data,
          isAdd: payload.isAdd,
          modalVisible: true,
        },
      };
    },
    changearticleLoad(state, { payload }) {
      return {
        ...state,
        data: {
          articlelist: payload.Value
        },
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload,
        },
      };
    },
  },
};
