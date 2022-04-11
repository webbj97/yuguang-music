import { get } from "@services/fetch";

// 歌词
export function getLyric(id: number | string) {
    return get(`/lyric?id=${id}`);
}

// 相似音乐
export function getSimiSongs(id: number, params: object) {
    return get(`/simi/song?id=${id}`, params);
}

// 最新音乐
export function fetchLastMusic({ type = 0 }: { type: number }) {
    return get(`/top/song?type=${type}`);
}

// 获取列表详情
export function getListDetail(params: {id: number}){
    return get('/playlist/detail', { params })
}

// 歌曲详情
export function getSongDetail(ids: Array<number>) {
    return get(`/song/detail?ids=${ids}`);
}
