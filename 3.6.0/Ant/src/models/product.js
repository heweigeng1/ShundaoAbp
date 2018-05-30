import { search, changeDelflag,getlist, add, update, get } from '../services/product';
import { routerRedux } from 'dva/router'
import { checkResponse, messagePut } from '../utils/errPut';
export default {
  namespace: 'product',

  state: {
    data: {
      list: [],
      productlist: [],
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
    filelist: [],
    treedata:[]
  },

  effects: {
    *search({ payload }, { call, put }) {
      const response = yield call(search, payload);
      yield put({
        type: 'loadList',
        payload: response.Value,
      });
    },
    *getlist({ payload }, { call, put }) {
      const response = yield call(getlist, payload);
      yield put({
        type: 'loadSelect',
        payload: response.Value,
      });
      console.log(response)
    },
    *changeproduct({ payload }, { call, put }) {
      yield put(routerRedux.push('/productm/ProductForm?id=' + payload.data.key)
      )
    },
    *showstorepage({ payload }, { call, put }) {
      yield put(routerRedux.push('/productm/store?id=' + payload.data.key)
      )
    },
    *getproduct({ payload }, { call, put }) {
      const response = yield call(get, payload);
      yield put({
        type: 'changeproductLoad',
        payload: response,
      });
      return response.Value.NameDes;
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
        yield put(routerRedux.push('/productm/product'));
      }
    },
    *update({ payload }, { call, put }) {
      const response = yield call(update, payload);
      yield call(messagePut, { response, put });
      if (response.Success) {
        yield put(routerRedux.push('/productm/product'));
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
    loadSelect(state, { payload }) {
      return {
        ...state,
        treedata: payload
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
    changeproductLoad(state, { payload }) {
      return {
        ...state,
        data: {
          productlist: payload.Value
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
