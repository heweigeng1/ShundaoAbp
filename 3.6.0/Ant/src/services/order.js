import request from "../utils/request";
import { host } from "../utils/utils";

export async function search(params) {
  return request(host + "/management/order/getlist", {
    method: "POST",
    body: params
  });
}

export async function changeDelflag(params) {
  return request(host + "/management/order/del", {
    method: "POST",
    body: params
  });
}
export async function GetState(params) {
  return request(host + "/management/order/GetState", {
    method: "POST",
    body: params
  });
}
export async function exportexcel(params) {
  return request(host + "/management/order/SaveExcel", {
    method: "POST",
    body: params
  });
}
export async function getTree(params) {
  return request(host + "/management/order/getTree", {
    method: "POST",
    body: params
  });
}