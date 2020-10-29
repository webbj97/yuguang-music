import { request } from "@/utils";

export const getSearchHot = () => request.get('/search/hot');

// 单曲 , 歌手 , 歌单 ,mv 信息
export const getSearchSuggest = ({ keywords }) => request.get('/search/suggest', { params: { keywords } });

export const getSearch = (params) => request.get(`/search`, { params });