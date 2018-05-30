import request from "../utils/request";
import { host } from "../utils/utils";

export async function search(params) {
  return request(host + "/management/refund/getlist", {
    method: "POST",
    body: params
  });
}
