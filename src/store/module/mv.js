import { request } from '@/utils';
import { GET_MVS } from '../type.js'

const getters = {
    mvsList: ({ mvsList }) => mvsList
}

const actions = {
    async getMvs({ commit }, params) {
        const res = await request.get('/mv/all', { params })
        commit('GET_MVS', res.data);
        return res;
    }
}

const mutations = {
    [GET_MVS](state, mvsList) {
        state.mvsList = mvsList
    }
}

export default {
    getters,
    actions,
    mutations,
    namespaced: true,
    state: {
        mvsList: []
    }
}