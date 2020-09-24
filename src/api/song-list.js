/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-30 17:36:59
 */
import { request } from '@/utils'

export const getListDetail = params => request.get('/playlist/detail', { params })