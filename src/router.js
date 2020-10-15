/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 11:32:43
 */
import Vue from 'vue'
import Router from 'vue-router'

const Discover = () => import('@/page/descover'); // 发现页面
const PlaylistDetails = () => import('@/page/playlist-details'); // 发现页面
const Mvs = () => import( /* webpackChunkName: "Songs" */ '@/page/mvs'); // 最新视频
const Mv = () => import( /* webpackChunkName: "Songs" */ '@/page/mv'); // 视频详情
const Rank = () => import( /* webpackChunkName: "Songs" */ '@/page/rank'); // 视频详情
const Songs = () => import( /* webpackChunkName: "Songs" */ '@/page/songs'); // 视频详情

export const menuList = [{
        path: '/discover',
        name: 'discover',
        component: Discover,
        meta: {
            title: '发现音乐',
            icon: 'yinle',
        },
    },
    {
        path: '/mvs',
        name: 'mvs',
        component: Mvs,
        meta: {
            title: '最新视频',
            icon: 'ziyuan',
        },
    },
    {
        path: '/rank',
        name: 'rank',
        component: Rank,
        meta: {
            title: '排行榜',
            icon: 'paihangbang',
        },
    },
    {
        path: '/songs',
        name: 'songs',
        component: Songs,
        meta: {
            title: '新歌速递',
            icon: 'new'
        }
    }
]

export const layoutCenterNames = ['discover', 'playlist', 'songs', 'mvs', 'rank', 'mv']

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            redirect: '/discover',
        },
        {
            path: '/playlist/:id',
            name: 'playlist',
            component: PlaylistDetails,
        },
        {
            path: '/mv/:id',
            name: 'mv',
            component: Mv,
            props: (route) => ({ id: +route.params.id }),
        },
        ...menuList,
    ],
})