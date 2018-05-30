import request from "../utils/request";
import { host } from "../utils/utils";

export async function search(params) {
  return request(host + "/management/article/getlist", {
    method: "POST",
    body: params
  });
}

export async function getarticle(params) {
    return request(host + "/management/article/getarticle", {
      method: "POST",
      body: params
    });
  }

export async function add(params) {
  return request(host + "/management/article/add", {
    method: "POST",
    body: params
  });
}

export async function update(params) {
  return request(host + "/management/article/update", {
    method: "POST",
    body: params
  });
}

export async function changeDelflag(params) {
  return request(host + "/management/article/del", {
    method: "POST",
    body: params
  });
}
