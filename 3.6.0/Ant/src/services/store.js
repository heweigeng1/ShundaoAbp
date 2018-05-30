import request from "../utils/request";
import { host } from "../utils/utils";

export async function search(params) {
  return request(host + "/management/store/getlist", {
    method: "POST",
    body: params
  });
}
export async function add(params) {
  return request(host + "/management/store/add", {
    method: "POST",
    body: params
  });
}
export async function update(params) {
  return request(host + "/management/store/update", {
    method: "POST",
    body: params
  });
}

export async function changeDelflag(params) {
  return request(host + "/management/store/del", {
    method: "POST",
    body: params
  });
}
export async function GetProduct(params) {
  return request(host + "/management/store/getproduct", {
    method: "POST",
    body: params
  });
}