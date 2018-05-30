import { search, changeDelflag, add, update,GetMenu } from "../services/menu";
import { checkResponse, messagePut } from "../utils/errPut";
export default {
  namespace: "menu",

  state: {
    data: {
      list: [],
      pagination: {}
    },
    loading: false,
    modal: {
      title: "",
      data: {},
      isAdd: true,
      confirmLoading: false,
      modalVisible: false
    },
    selectList:[],

  },

  effects: {
    *search({ payload }, { call, put }) {
      const response = yield call(search, payload);
      yield put({
        type: "loadList",
        payload: response.Value
      });
    },
    *changeDelflag({ payload }, { call, put }) {
      const { record, formValues } = payload;
      const response = yield call(changeDelflag, record);
      yield call(messagePut, { response, put });
      yield put({
        type: "changeLoading",
        payload: true
      });
      const response1 = yield call(search, {
        ...formValues,
        pagination: {}
      });
      yield put({
        type: "loadList",
        payload: response1.Value
      });
      yield put({
        type: "changeLoading",
        payload: false
      });
    },

    *add({ payload }, { call, put }) {
      const { entity, headerSearch } = payload;
      //加载
      yield put({ type: "submitload" });
      const response = yield call(add, entity);
      //加载结束
      yield put({ type: "submitload" });
      //提示信息
      yield call(messagePut, { response, put });
      if (response.Success) {
        //隐藏模态框
        yield put({ type: "hideModal" });
        //table 加载
        yield put({
          type: "changeLoading",
          payload: true
        });
        //请求数据
        const rp = yield call(search, headerSearch);
        yield put({
          type: "loadList",
          payload: rp.Value
        });
        //加载结束
        yield put({
          type: "changeLoading",
          payload: false
        });
      }
    },
    *update({ payload }, { call, put }) {
      const { entity, headerSearch } = payload;
      //加载
      yield put({ type: "submitload" });
      const response = yield call(update, entity);
      //加载结束
      yield put({ type: "submitload" });
      //提示信息
      yield call(messagePut, { response, put });
      if (response.Success) {
        //隐藏模态框
        yield put({ type: "hideModal" });
        //table 加载
        yield put({
          type: "changeLoading",
          payload: true
        });
        //请求数据
        const rp = yield call(search, headerSearch);
        yield put({
          type: "loadList",
          payload: rp.Value
        });
        //加载结束
        yield put({
          type: "changeLoading",
          payload: false
        });
      }
    },
    *getmenu({ payload }, { call, put }) {
      const response = yield call(GetMenu, payload);
      yield put({
        type: "loadSelect",
        payload: response.Value.treeList
      });
    },
    
    *hideVisible(_, { call, put }) {
      yield put({
        type: "hideModal"
      });
    },
    *changeModalVisible({ payload }, { call, put }) {
      yield put({
        type: "changeVisible",
        payload: payload
      });
    }
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        list: action.payload
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
            current: payload.PageIndex
          }
        },
        loading: false
      };
    },
    loadSelect(state, { payload }) {
      return {
        ...state,
        selectList:payload
      };
    },
    hideModal(state, action) {
      return {
        ...state,
        modal: {
          ...state.modal,
          modalVisible: false
        }
      };
    },
    changeLoading(state, action) {
      return {
        ...state,
        loading: action.payload
      };
    },
    changeVisible(state, { payload }) {
      return {
        ...state,
        modal: {
          title: payload.title,
          data: payload.data,
          isAdd: payload.isAdd,
          modalVisible: true
        }
      };
    },
    changeNotifyCount(state, action) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload
        }
      };
    }
  }
};
