import request from "../utils/request";
import { host } from "../utils/utils";

export async function search(params) {
  return request(host + "/management/feedback/getlist", {
    method: "POST",
    body: params
  });
}
export async function add(params) {
  return request(host + "/management/feedback/add", {
    method: "POST",
    body: params
  });
}
export async function update(params) {
  return request(host + "/management/feedback/update", {
    method: "POST",
    body: params
  });
}

export async function changeDelflag(params) {
  return request(host + "/management/feedback/del", {
    method: "POST",
    body: params
  });
}
