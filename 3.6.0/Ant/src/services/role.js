import request from "../utils/request";
import { host } from "../utils/utils";

export async function search(params) {
  return request(host + "/management/role/getlist", {
    method: "POST",
    body: params
  });
}
export async function add(params) {
  return request(host + "/management/role/add", {
    method: "POST",
    body: params
  });
}
export async function update(params) {
  return request(host + "/management/role/update", {
    method: "POST",
    body: params
  });
}

export async function changeDelflag(params) {
  return request(host + "/management/role/del", {
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
export async function SaveMenu(params) {
  return request(host + "/management/role/UpdateRole", {
    method: "POST",
    body: params
  });
}
