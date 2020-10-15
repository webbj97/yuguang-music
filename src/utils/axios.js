/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-27 14:33:48
 */
import axios from 'axios';
import { Loading } from 'element-ui';

const BASE_URL = 'https://api.mtnhao.com/';
// 不带全局loading的请求实例
export const request = createBaseInstance();

// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const requestLoading = createBaseInstance();
mixinLoading(requestLoading.interceptors)

// 创建axios可配置实例
function createBaseInstance() {
    const instance = axios.create({ baseURL: BASE_URL, })
    // 实例->响应拦截器
    // handleResponse 处理响应数据
    // handleError 处理响应错误
    instance.interceptors.response.use(handleResponse, handleError);
    return instance;
}

// 错误
function handleError(e) {
    console.log('e:', e);
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
    )

    function loadingRequestInterceptor(config) {
        if (!loading) {
            loading = Loading.service({
                target: 'body',
                background: 'transparent',
                text: '载入中',
            })
        }
        loadingCount++;

        return config;
    }

    function handleResponseLoading() {
        loadingCount--
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