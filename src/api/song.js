import { get } from "@services/fetch";
// 歌词
export function getLyric(id) {
    return get(`/lyric?id=${id}`);
}
// 相似音乐
export function getSimiSongs(id, params) {
    return get(`/simi/song?id=${id}`, params);
}
// 最新音乐
export function fetchLastMusic({ type = 0 }) {
    return get(`/top/song?type=${type}`);
}
// 获取列表详情
export function getListDetail(params) {
    return get("/playlist/detail", { params });
}
// 歌曲详情
export function getSongDetail(ids) {
    return get(`/song/detail?ids=${ids}`);
}
export function getRankList() {
    return get("/toplist");
}
export function fetchSearchHot() {
    return get("/search/hot");
}
// 单曲 , 歌手 , 歌单 ,mv 信息
export function getSearchSuggest(params) {
    return get("/search/suggest", { params });
}
export function getSearch(params) {
    return get("/search", { params });
}
//# sourceMappingURL=song.js.map