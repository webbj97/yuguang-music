/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-01 10:07:32
 */
import { request, requestLoading } from '@/utils';

// 歌曲详情
export const getSongDetail = ids => requestLoading.get(`/song/detail?ids=${ids}`);

// 歌词
export const getLyric = id => request.get(`/lyric?id=${id}`);

// 相似音乐
export const getSimiSongs = (id, option) => request.get(`/simi/song?id=${id}`, option);

// 最新音乐
export const getTopMusic = ({ type = 0 }) => requestLoading.get(`/top/song?type=${type}`);
