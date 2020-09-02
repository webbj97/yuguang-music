/*
 * @desc: 歌曲播放配置
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-02 10:48:48
 */
export const playModeMap = {
    sequence: {
        code: 'sequence',
        icon: 'sequence',
        name: '顺序播放'
    },
    loop: {
        code: 'loop',
        icon: 'loop',
        name: '单曲循环'
    },
    random: {
        code: 'random',
        icon: 'random',
        name: '随机播放'
    }
}

// 存储播放记录
export const PLAY_HISTORY_KEY = '__play_history__'

// 用户id
export const UID_KEY = '__uid__'

// 音量
export const VOLUME_KEY = '__volume__'