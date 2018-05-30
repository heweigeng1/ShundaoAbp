import { search, changeDelflag } from '../services/orderdetail';
import { checkResponse, messagePut } from '../utils/errPut';
export default {
  namespace: 'orderdetail',

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
