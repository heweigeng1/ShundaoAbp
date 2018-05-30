import request from "../utils/request";
import { host } from "../utils/utils";

export async function search(params) {
    return request(host + "/management/advance/getlist", {
        method: "POST",
        body: params
    });
}

export async function getadvance(params) {
    return request(host + "/management/advance/getadvance", {
        method: "POST",
        body: params
    });
}
export async function getuser(params) {
    return request(host + "/management/advance/getuser", {
        method: "POST",
        body: params
    });
}
export async function getpro(params) {
    return request(host + "/management/advance/GetProduct", {
        method: "POST",
        body: params
    });
}
export async function gettype(params) {
    return request(host + "/management/advance/gettype", {
        method: "POST",
        body: params
    });
}
export async function add(params) {
    return request(host + "/management/advance/add", {
        method: "POST",
        body: params
    });
}

export async function update(params) {
    return request(host + "/management/advance/update", {
        method: "POST",
        body: params
    });
}

export async function changeDelflag(params) {
    return request(host + "/management/advance/del", {
        method: "POST",
        body: params
    });
}
