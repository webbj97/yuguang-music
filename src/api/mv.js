/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-11 17:44:48
 */
import { request } from '@/utils'

export const getMvDetail = id => request.get(`/mv/detail?mvid=${id}`)

export const getMvUrl = id => request.get(`/mv/url?id=${id}`)

export const getSimiMv = id => request.get(`/simi/mv?mvid=${id}`)

export const getAllMvs = (params) => request.get(`/mv/all`, {params})