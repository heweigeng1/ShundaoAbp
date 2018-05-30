import request from '../utils/request';
import { host } from '../utils/utils';

export async function search(params) {
  return request(host + '/management/user/getlist', {
    method: 'POST',
    body: params,
  });
}
export async function getlist(params) {
  return request(host + '/management/user/getRole', {
    method: 'POST',
    body: params,
  });
}
export async function add(params) {
  return request(host + '/management/user/add', {
    method: 'POST',
    body: params,
  });
}
export async function update(params) {
  return request(host + '/management/user/update', {
    method: 'POST',
    body: params,
  });
}
export async function changeDelflag(params) {
  return request(host + '/management/user/del', {
    method: 'POST',
    body: params,
  });
}
export async function WXLogin(params) {
  return request(host + '/management/user/WXLogin', {
    method: 'POST',
    body: params,
  });
}
export async function updatePassword(params) {
  return request(host + '/management/user/updatePassword', {
    method: 'POST',
    body: params,
  });
}
export async function getUserById(params) {
  return request(host + '/management/user/getUserById', {
    method: 'POST',
    body: params,
  });
}
export async function weChatCode(params) {
  return request(host + "/management/user/WXBindCode", {
    method: "POST",
    body: params
  });
}
export async function wxCode(params) {
  return request(host + "/management/user/WXBind", {
    method: "POST",
    body: params
  });
}
