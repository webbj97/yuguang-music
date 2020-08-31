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
const Songs = () => import( /* webpackChunkName: "Songs" */ '@/page/songs'); // 音乐

export const menuList = [{
        path: '/discover',
        name: 'Discover',
        component: Discover,
        meta: {
            title: '路由1',
            icon: 'music',
        },
    },
    {
        title: '测试',
        path: '/songs',
        name: 'Songs',
        component: Songs,
        meta: {
            title: '路由2',
        },
    },
    {
        title: '测试',
        path: '/songs1',
        name: 'Songs1',
        component: Songs,
        meta: {
            title: '路由3',
        },
    },
    {
        title: '测试',
        path: '/songs2',
        name: 'Songs2',
        component: Songs,
        meta: {
            title: '路由4',
        },
    },
]

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
        ...menuList,
    ],
})