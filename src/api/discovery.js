/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-27 14:44:35
 */
import { request, requestLoading } from '@utils';

export const getBanner = () => request.get('/banner?type=0'); // 首页轮播

export const getNewSongs = () => request.get('/personalized/newsong'); // 最新音乐

export const getPersonalized = params => requestLoading.get('/personalized', { params }) // 推荐歌单

export const getPersonalizedMv = () => request.get(`/personalized/mv`) // mv