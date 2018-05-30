import { routerRedux } from "dva/router";
import { message } from "antd";
export function* checkResponse(obj) {
  const { put, response } = obj;
  if (response.status === 401) {
    yield put(routerRedux.push("../user/login"));
  }
  if (response.status === 403) {
    yield put(routerRedux.push("../exception/403"));
  }
  if (response.status === 404) {
    yield put(routerRedux.push("../exception/404"));
  }
  if (response.status >= 500) {
    yield put(routerRedux.push("../exception/500"));
  }
}

export function* checkError(error) {
  console.log(error);
  // if (response.status === 401) {
  //     yield put(routerRedux.push("../user/login"));
  // }
}
export function* errorGotoLogin(error) {
  yield put(routerRedux.push("../user/login"));
}
export function* messagePut(obj) {
  const { put, response } = obj;
  if (response.Success) {
    message.success("操作成功!");
  } else {
    message.warning(response.Message);
  }
}

export function* loginMessage(obj) {
  const { put, response } = obj;
  if (response.Success) {
    message.success("登录成功!");
  } else {
    message.warning(response.Message);
  }
}
