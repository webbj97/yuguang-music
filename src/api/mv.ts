/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-11 17:44:48
 */
import { get } from "@services/fetch";

export function getMvDetail(id: number) {
    return get(`/mv/detail?mvid=${id}`);
}

export function getMvUrl(id: number) {
    return get(`/mv/url?id=${id}`);
}

export function getSimiMv(id: number) {
    return get(`/simi/mv?mvid=${id}`);
}

export function getAllMvs(params: any) {
    return get(`/mv/all`, { params });
}
