import request from "../utils/request";
import { host } from "../utils/utils";

export async function search(params) {
  return request(host + "/management/systeminfo/getlist", {
    method: "POST",
    body: params
  });
}
export async function add(params) {
  return request(host + "/management/systeminfo/add", {
    method: "POST",
    body: params
  });
}
export async function update(params) {
  return request(host + "/management/systeminfo/update", {
    method: "POST",
    body: params
  });
}
export async function getlist(params) {
  return request(host + '/management/systeminfo/get', {
    method: 'POST',
    body: params,
  });
}
export async function changeDelflag1(params) {
  return request(host + "/management/systeminfo/del", {
    method: "POST",
    body: params
  });
}
