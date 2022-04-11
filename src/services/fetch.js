/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-27 14:33:48
 */
import axios from "axios";
import { Loading } from "element-ui";

const BASE_URL = "https://yuguang-netease-cloud-music-api.vercel.app/";
// 不带全局loading的请求实例
const request = createBaseInstance();

const defaults = {
    baseURL: BASE_URL,
    timeout: 30000,
};
Object.keys(defaults).forEach((key) => {
    axios.defaults[key] = axios.defaults[key] || defaults[key];
});

// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const requestLoading = createBaseInstance();
mixinLoading(requestLoading.interceptors);

// 创建axios可配置实例
function createBaseInstance() {
    const instance = axios.create({ baseURL: BASE_URL });
    // 实例->响应拦截器
    // handleResponse 处理响应数据
    // handleError 处理响应错误
    instance.interceptors.response.use(handleResponse, handleError);
    return instance;
}

// 错误
function handleError(e) {
    console.log("e:", e);
    throw e;
}
// 响应
function handleResponse(response) {
    return response.data;
}

let loading;
let loadingCount = 0;

function mixinLoading(interceptors) {
    interceptors.request.use(loadingRequestInterceptor);
    interceptors.response.use(
        loadingResponseInterceptor,
        loadingResponseErrorInterceptor
    );

    function loadingRequestInterceptor(config) {
        if (!loading) {
            loading = Loading.service({
                target: "body",
                background: "transparent",
                text: "载入中",
            });
        }
        loadingCount++;

        return config;
    }

    function handleResponseLoading() {
        loadingCount--;
        if (loadingCount === 0) {
            loading.close();
            loading = null;
        }
    }

    function loadingResponseInterceptor(response) {
        handleResponseLoading();
        return response;
    }

    function loadingResponseErrorInterceptor(e) {
        handleResponseLoading();
        throw e;
    }
}

const auths = {};
export function fetch(query = {}) {
    const params = { ...query };

    if (params.method === "get") {
        params.params = params.data;
        delete params.data;
    }

    params.headers = Object.assign(params.headers || {}, auths);
    params.validateStatus = (status) => status >= 200 && status < 400;

    return axios(params)
        .then((res) => {
            if (res.isAxiosError) {
                throw new Error(res);
            }
            const { data } = res;
            if (typeof data === "string" && /error/gm.test(data)) {
                throw new Error({ message: `${params.method}: ${params.url}` });
            }
            return data.data || data;
        })
        .catch((e) => {
            const response = e.response || (e.message && e.message.response);
            if (e.message && e.message.businessError) {
                // 业务码 错误
                return Promise.reject(e.message.data);
            }

            if (response && response.data) {
                const { data } = response;
                const { error, message } = data;

                console.log("FETCH PARAMS1:", params);
                console.log("FETCH ERRORS1:", error ? error.message : message);

                // if (message && !message.preventDefault) {
                //     setTimeout(() => {
                //         Vue.prototype.$notify({
                //             showClose: true,
                //             title: "接口请求错误",
                //             type: "error",
                //             duration: 5000,
                //             message: error
                //                 ? error.message
                //                 : JSON.stringify(message),
                //             isHTML: true,
                //         });
                //     }, 0);

                //     throw new Error(
                //         error ? error.message : message,
                //         "XMLHttpRequest Error"
                //     );
                // }
            }

            // const { message } = e;
            // console.log("FETCH PARAMS2:", params);
            // console.log("FETCH ERRORS2:", message, message.data);

            // setTimeout(() => {
            //     if (message && !message.preventDefault) {
            //         Vue.prototype.$notify({
            //             showClose: true,
            //             title: "接口请求错误",
            //             type: "error",
            //             duration: 5000,
            //             message: message.data
            //                 ? message.data.message
            //                 : message.data,
            //             isHTML: true,
            //         });
            //     }
            // }, 0);
            throw new Error(message, "XMLHttpRequest Error");
        });
}

/**
 * http get 请求简单封装
 * @export
 * @param {String} url 请求的URL
 * @param {Object} [data={}] 请求参数
 * @param {Object} [data={}] 请求头
 * @returns Promise
 */
export function get(url, data = {}, headers = {}) {
    return fetch({
        url,
        data,
        method: "get",
        headers,
    });
}

export default {
    request,
    fetch,
    get,
};
