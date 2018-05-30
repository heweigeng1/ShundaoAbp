import request from '../utils/request';
import { host } from '../utils/utils';

export async function search(params) {
  return request(host + '/management/userinfo/getlist', {
    method: 'POST',
    body: params,
  });
}