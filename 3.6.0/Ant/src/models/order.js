import { search, changeDelflag, GetState, exportexcel, getTree } from '../services/order';
import { routerRedux } from 'dva/router'
import { host } from "../utils/utils";
import { checkResponse, messagePut } from '../utils/errPut';
export default {
  namespace: 'order',

  state: {
    data: {
      list: [],
      pagination: {},
    },
    loading: false,
    modal: {
      title: '',
      data: {},
      isAdd: true,
      confirmLoading: false,
      modalVisible: false,
    },
    selectList: [],
    ListTree: []
  },

  effects: {
    *search({ payload }, { call, put }) {
      const response = yield call(search, payload);
      yield put({
        type: 'loadList',
        payload: response.Value,
      });
      console.log(response);
    },
    *ExportExcel({ payload }, { call, put }) {
      const response = yield call(exportexcel, payload);
      if (response.Success) {
        window.location.href = host + response.Value;
      }
      else {
        yield call(messagePut, { response, put });
      }
    },
    *getTree({ payload }, { call, put }) {
      const response = yield call(getTree, payload);
      yield put({
        type: "TreeSelect",
        payload: response.Value.treeList
      });
    },

    *GetState({ payload }, { call, put }) {
      const response = yield call(GetState, payload);
      yield put({
        type: 'loadSelect',
        payload: response.Value,
      });
    },
    *orderdetail({ payload }, { call, put }) {
      yield put(routerRedux.push('/productm/OrderDetailList?OrderId=' + payload.data.key))
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
    *changeModalVisible({ payload }, { call, put }) {
      yield put({
        type: 'changeVisible',
        payload: payload,
      });
    },
  },

  reducers: {
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
        selectList: payload
      };
    },
    TreeSelect(state, { payload }) {
      return {
        ...state,
        ListTree: payload
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
  },
};
