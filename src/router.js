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
]

export const layoutCenterNames = ['discover', 'playlists', 'songs', 'mvs']

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
            props: (route) =>  ({id: +route.params.id}),
          },
        ...menuList,
    ],
})