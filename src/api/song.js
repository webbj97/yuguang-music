/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-01 10:07:32
 */
import { request } from '@/utils'

export const getSongDetail = ids => request.get(`/song/detail?ids=${ids}`)