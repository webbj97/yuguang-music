/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-27 14:33:48
 */
import axios from 'axios'
// import { Loading } from 'element-ui'
// import { confirm } from '@/base/confirm'
// import store from '@/store'

const BASE_URL = 'https://api.mtnhao.com/'
// 不带全局loading的请求实例
// export const requestWithoutLoading = createBaseInstance();

// 带全局loading的请求实例
// 传入函数是因为需要在处理请求结果handleResponse之前处理loading
// 所以要在内部插入loading拦截器的处理逻辑
export const request = createBaseInstance();

// mixinLoading(request.interceptors)

// 创建axios可配置实例
function createBaseInstance() {
    const instance = axios.create({ baseURL: BASE_URL, })
    // 实例->响应拦截器
    // handleResponse 处理响应数据
    // handleError 处理响应错误
    instance.interceptors.response.use(handleResponse, handleError)
    return instance
}

function handleError(e) {
    console.log('e:', e);
    // confirm(e.message, '出错啦~');
    throw e;
}

function handleResponse(response) {
    console.log('response:', response);
    return response.data;
}

// let loading
// let loadingCount = 0
// const SET_AXIOS_LOADING = 'global/setAxiosLoading'
// function mixinLoading(interceptors) {
//   interceptors.request.use(loadingRequestInterceptor)
//   interceptors.response.use(
//     loadingResponseInterceptor,
//     loadingResponseErrorInterceptor
//   )

//   function loadingRequestInterceptor(config) {
//     if (!loading) {
//       loading = Loading.service({
//         target: 'body',
//         background: 'transparent',
//         text: '载入中',
//       })
//       store.commit(SET_AXIOS_LOADING, true)
//     }
//     loadingCount++

//     return config
//   }

//   function handleResponseLoading() {
//     loadingCount--
//     if (loadingCount === 0) {
//       loading.close()
//       loading = null
//       store.commit(SET_AXIOS_LOADING, false)
//     }
//   }

//   function loadingResponseInterceptor(response) {
//     handleResponseLoading()
//     return response
//   }

//   function loadingResponseErrorInterceptor(e) {
//     handleResponseLoading()
//     throw e
//   }
// }