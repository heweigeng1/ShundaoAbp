import { stringify } from "qs";
import request from "../utils/request";
import { host } from "../utils/utils";
export async function queryRule(params) {
  return request(`https://pm.shundaonetwork.com/management/user/index`, {
    method: "POST"
  });
  // return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request("https://pm.shundaonetwork.com/management/user/index", {
    method: "POST",
    body: {
      ...params,
      method: "delete"
    }
  });
}

export async function addRule(params) {
  return request("https://pm.shundaonetwork.com/management/user/index", {
    method: "POST",
    body: {
      ...params,
      method: "post"
    }
  });
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  // return request("/api/login/account", {
  //   method: "POST",
  //   body: params
  // });
  return request(host + "/management/user/Login", {
    method: "POST",
    body: params
  });
}

export async function queryNotices() {
  return request("/api/notices");
}

export async function getCode1(params) {
  return request(host + "/management/user/WXCode", {
    method: "POST",
    body: params
  });
}


