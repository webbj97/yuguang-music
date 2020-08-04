/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 11:32:43
 */
import Vue from 'vue'
import Router from 'vue-router'

const Discover = () => import('@/page/descover'); // 发现页面
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
        path: '/songs',
        name: 'Songs',
        component: Songs,
        meta: {
            title: '路由2',
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
]

Vue.use(Router)

export default new Router({
    mode: 'hash',
    routes: [{
            path: '/',
            redirect: '/discover',
        },
        ...menuList,
    ],
})