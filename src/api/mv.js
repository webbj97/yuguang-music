/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-11 17:44:48
 */
import { get } from "@services/fetch";
export function getMvDetail(id) {
    return get(`/mv/detail?mvid=${id}`);
}
export function getMvUrl(id) {
    return get(`/mv/url?id=${id}`);
}
export function getSimiMv(id) {
    return get(`/simi/mv?mvid=${id}`);
}
export function getAllMvs(params) {
    return get(`/mv/all`, { params });
}
//# sourceMappingURL=mv.js.map