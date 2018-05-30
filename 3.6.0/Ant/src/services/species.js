import request from "../utils/request";
import { host } from "../utils/utils";

export async function search(params) {
    return request(host + "/management/species/getlist", {
        method: "POST",
        body: params
    });
}
export async function getlist(params) {
    return request(host + "/management/species/getspelist", {
        method: "POST",
        body: params
    });
}
export async function getselect(params) {
    return request(host + "/management/species/getselect", {
        method: "POST",
        body: params
    });
}
export async function getspecies(params) {
    return request(host + "/management/species/getspecies", {
        method: "POST",
        body: params
    });
}
export async function add(params) {
    return request(host + "/management/species/add", {
        method: "POST",
        body: params
    });
}

export async function update(params) {
    return request(host + "/management/species/update", {
        method: "POST",
        body: params
    });
}

export async function changeDelflag(params) {
    return request(host + "/management/species/del", {
        method: "POST",
        body: params
    });
}
