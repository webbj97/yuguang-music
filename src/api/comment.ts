/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-14 15:07:40
 */
import { get } from "@services/fetch";

interface CommentParams {
    id: number;
    pageSize?: number;
    offset?: number;
    type?: string;
}

export function getSongComment(params: CommentParams) {
    return get(`/comment/music`, { params });
}

// 歌单评论
export function getPlaylistComment(params: CommentParams) {
    return get(`/comment/playlist`, { params });
}

// 热门评论
export function getHotComment(params: CommentParams) {
    return get(`/comment/hot`, { params });
}

// mv评论
export function getMvComment(params: CommentParams) {
    return get("/comment/mv", { params });
}

// 说明 : 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该 mv 的所有评论 ( 不需要 登录 )
// 必选参数 : id: mvid
// 可选参数 : limit: 取出评论数量 , 默认为 20
// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过5000条评论的时候需要用到)
// 接口地址 : /comment/mv
// 调用例子 : /comment/mv?id=5436712
