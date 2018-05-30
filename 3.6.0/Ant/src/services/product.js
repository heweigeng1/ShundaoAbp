import request from "../utils/request";
import { host } from "../utils/utils";

export async function search(params) {
  return request(host + "/management/product/getlist", {
    method: "POST",
    body: params
  });
}
export async function getlist(params) {
  return request(host + "/management/product/getspelist", {
    method: "POST",
    body: params
  });
}
export async function get(params) {
    return request(host + "/management/product/GetProduct", {
      method: "POST",
      body: params
    });
  }

export async function add(params) {
  return request(host + "/management/product/add", {
    method: "POST",
    body: params
  });
}
export async function update(params) {
  return request(host + "/management/product/update", {
    method: "POST",
    body: params
  });
}

export async function changeDelflag(params) {
  return request(host + "/management/product/del", {
    method: "POST",
    body: params
  });
}
