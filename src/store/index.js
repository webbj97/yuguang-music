/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-02 18:45:04
 */
import Vue from 'vue';
import Vuex from 'vuex';
import descover from './module/descover.js'
import music from './module/music.js'
import mv from './module/mv.js'

export const actions = {};
export const getters = {};
export const mutations = {};

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    actions,
    mutations,
    modules: {
        descover,
        music,
        mv
    },
});