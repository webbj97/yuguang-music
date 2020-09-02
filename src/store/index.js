import Vue from 'vue';
import Vuex from 'vuex';
import descover from './module/descover.js'
import music from './module/music.js'

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
        music
    },
});