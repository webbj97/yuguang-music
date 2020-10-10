/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-01 16:14:31
 */
import { PLAY_HISTORY_KEY, getSongImg, playModeMap } from '@/utils'
import {
    SET_CURRENT_SONG,
    SET_PLAY_STATE,
    SET_CURRENT_TIME,
    SET_PLAY_LIST,
    SET_PLAY_MODE,
    SET_PLAY_LIST_SHOW,
    SET_MUSIC_PLAYER_SHOW
} from '../type.js'

function getRandomIndex(playList, currentIndex) {
    // 防止无限循环
    if (playList.length === 1) {
        return currentIndex
    }
    let index = Math.round(Math.random() * (playList.length - 1))
    if (index === currentIndex) {
        index = getRandomIndex(playList, currentIndex)
    }
    return index;
}

const getters = {
    currentSong: ({ currentSong }) => currentSong,
    currentTime: ({ currentTime }) => currentTime,
    playing: ({ playing }) => playing,
    playList: ({ playList }) => playList,
    playMode: ({ playMode }) => playMode,
    playListShow: ({ playListShow }) => playListShow,
    currentIndex: ({ currentSong, playList }) => {
        return playList.findIndex(({ id }) => id === currentSong.id);
    },
    prevSong: (state, getters) => {
        const { playList, playMode } = state
        const prevStratMap = {
            [playModeMap.sequence.code]: genSequencePrevIndex,
            [playModeMap.loop.code]: getLoopPrevIndex,
            [playModeMap.random.code]: getRandomPrevIndex
        }
        const getPrevStrat = prevStratMap[playMode]
        const index = getPrevStrat()

        return playList[index]

        function genSequencePrevIndex() {
            let prevIndex = getters.currentIndex - 1
            if (prevIndex < 0) {
                prevIndex = playList.length - 1
            }
            return prevIndex
        }

        function getLoopPrevIndex() {
            return getters.currentIndex
        }

        function getRandomPrevIndex() {
            return getRandomIndex(playList, getters.currentIndex)
        }
    },
    nextSong: (state, getters) => {
        const { playList, playMode } = state;
        const nextStratMap = {
            [playModeMap.sequence.code]: getSequenceNextIndex,
            [playModeMap.loop.code]: getLoopNextIndex,
            [playModeMap.random.code]: getRandomNextIndex
        }
        const getNextStrat = nextStratMap[playMode];
        const index = getNextStrat();
        return playList[index];

        // 顺序
        function getSequenceNextIndex() {
            let nextIndex = getters.currentIndex + 1
            if (nextIndex > playList.length - 1) {
                nextIndex = 0
            }
            return nextIndex
        }

        // 随机
        function getRandomNextIndex() {
            return getRandomIndex(playList, getters.currentIndex)
        }

        // 单曲
        function getLoopNextIndex() {
            return getters.currentIndex
        }
    },
    musicPlayerShow: ({ musicPlayerShow }) => musicPlayerShow,
};

const actions = {
    // 整合歌曲信息 并且开始播放
    async startSong({ commit }, rawSong) {
        // 浅拷贝一份 改变引用
        // 1.不污染元数据
        // 2.单曲循环为了触发watch
        const song = Object.assign({}, rawSong)
        // if (!song.img) {
        //     if (song.albumId) {
        //         song.img = await getSongImg(song.id, song.albumId)
        //     }
        // }

        // 设置音乐
        commit('SET_CURRENT_SONG', song); // 保存数据
        commit('SET_PLAY_STATE', true); // 打开状态
    },
    // 修改播放状态
    setPlayingState({ commit }, type) {
        commit('SET_PLAY_STATE', type);
    },
    // 设置当前时间
    setCurrentTime({ commit }, time) {
        commit('SET_CURRENT_TIME', time);
    },
    // 存储播放列表
    setPlayList({ commit }, playList) {
        commit('SET_PLAY_LIST', playList);
    },
    // 设置播放模式
    setPlayMode({ commit }, code) {
        commit('SET_PLAY_MODE', code);
    },
    setPlayListShow({ commit }, show) {
        commit('SET_PLAY_LIST_SHOW', show);
    },
    setMusicPlayerShow({ commit }, show) {
        commit('SET_MUSIC_PLAYER_SHOW', show);
    },

}

const mutations = {
    [SET_CURRENT_SONG](state, song) {
        state.currentSong = song;
    },
    [SET_PLAY_STATE](state, playing) {
        state.playing = playing;
    },
    [SET_CURRENT_TIME](state, currentTime) {
        state.currentTime = currentTime;
    },
    [SET_PLAY_LIST](state, playList) {
        state.playList = playList;
    },
    [SET_PLAY_MODE](state, code) {
        state.playMode = code;
    },
    [SET_PLAY_LIST_SHOW](state, show) {
        state.playListShow = show;
    },
    [SET_MUSIC_PLAYER_SHOW](state, show) {
        state.musicPlayerShow = show;
    }
};

export default {
    getters,
    actions,
    mutations,
    namespaced: true,
    state: {
        currentSong: {}, // 当前音乐数据
        playing: false, // 播放状态
        currentTime: 0, // 当前时长
        playMode: playModeMap.sequence.code, // 播放模式
        playList: [], // 播放列表数据
        playListShow: false, // 播放列表
        musicPlayerShow: false, // 音乐播放页
    }
}