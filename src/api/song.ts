import { request, requestLoading, get } from "@services/fetch";
console.log('get', get);

// 歌曲详情
export function getSongDetail(ids: Array<number>) {
    return get(`/song/detail?ids=${ids}`);
}

// 歌词
export function getLyric(id: number | string) {
    return request.get(`/lyric?id=${id}`);
}

// 相似音乐
export function getSimiSongs(id: number, params: object) {
    return request.get(`/simi/song?id=${id}`, params);
}

// 最新音乐
export function fetchLastMusic({ type = 0 }: { type: number }) {
    return requestLoading.get(`/top/song?type=${type}`);
}
