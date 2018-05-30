import request from "../utils/request";
import { host } from "../utils/utils";

export async function search(params) {
  return request(host + "/management/menu/search", {
    method: "POST",
    body: params
  });
}
export async function add(params) {
  return request(host + "/management/menu/add", {
    method: "POST",
    body: params
  });
}
export async function update(params) {
  return request(host + "/management/menu/update", {
    method: "POST",
    body: params
  });
}

export async function changeDelflag(params) {
  return request(host + "/management/menu/changeDelflag", {
    method: "POST",
    body: params
  });
}
export async function GetMenu(params) {
  return request(host + "/management/menu/GetMenu", {
    method: "POST",
    body: params
  });
}