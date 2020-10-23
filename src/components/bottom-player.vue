!<!-- 组件说明 -->
<template>
    <div class="bottom-player">
        <!-- 信息 -->
        <div class="bottom-player__info">
            <template v-if="hasCurrentSong">
                <div class="img-wrap" @click="onShowPlayer">
                    <div class="mask">
                        <Icon :size="12" class="icon" type="houtui" />
                        <Icon :size="12" class="icon" type="qianjin" />
                    </div>
                    <img v-lazy="currentSong.img" alt="音乐图片" />
                </div>
                <div class="music-wrap">
                    <div>
                        <span>{{currentSong.name}}</span>
                        <span>- {{currentSong.artistsText}}</span>
                    </div>
                    <div>{{formatTime(currentTime)}} / {{currentSong.durationStr}}</div>
                </div>
            </template>
        </div>

        <!-- 操作 -->
        <div class="bottom-player__control">
            <Icon class="icon" :size="22" type="shangyiqu" @click="handlePrev" />

            <div class="icon-box" @click="onTogglePlay">
                <Icon :type="playIcon" />
            </div>

            <Icon class="icon" :size="22" type="xiayiqu" @click="handleNext" />
        </div>

        <!-- 操作 -->
        <div class="bottom-player__groups">
            <!-- <Icon :size="20" type="playlist" @click="togglePlayListShow" /> -->

            <el-popover placement="top" trigger="hover" width="160">
                <p>{{ playModeText }}</p>
                <Icon
                    :size="20"
                    :type="modeIcon"
                    @click="onChangePlayMode"
                    class="mode-item"
                    slot="reference"
                />
            </el-popover>
        </div>

        <div class="progress-wrap">
            <progressBar
                :disabled="!hasCurrentSong"
                :percent="playedPercent"
                @percentChange="percentChange"
            />
        </div>

        <audio
            :src="currentSong.url"
            @canplay="onReady"
            @ended="onEnd"
            @timeupdate="onUpdete"
            ref="audio"
        ></audio>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatTime, isDef, playModeMap } from "@/utils";

const ICON_ZANTING = "zanting";
const ICON_BOFANG = "bofang";

export default {
    components: {},
    data() {
        return {
            songReady: false
        };
    },
    computed: {
        ...mapGetters("music", [
            "currentSong",
            "currentTime",
            "playing",
            "playMode",
            "prevSong",
            "nextSong",
            "playListShow",
            "musicPlayerShow"
        ]),
        audio() {
            return this.$refs.audio;
        },
        playIcon() {
            return this.playing ? ICON_ZANTING : ICON_BOFANG;
        },
        hasCurrentSong() {
            return isDef(this.currentSong.id);
        },
        currentMode() {
            return playModeMap[this.playMode];
        },
        playModeText() {
            return this.currentMode.name;
        },
        modeIcon() {
            return this.currentMode.icon;
        },
        playedPercent() {
            const { durationSecond } = this.currentSong;
            return Math.min(this.currentTime / durationSecond, 1) || 0;
        }
    },
    watch: {
        // 切换|清空|循环-歌曲
        currentSong(newSong, oldSong) {
            console.log("oldSong:", oldSong.url);
            // 清空了歌曲
            if (!newSong.id) {
                this.audio.pause();
                this.audio.currentTime = 0;
                return;
            }
            // 单曲循环
            if (oldSong && newSong.id === oldSong.id) {
                this.setCurrentTime(0);
                this.audio.currentTime = 0;
                this.onPlay();
                return;
            }
            this.songReady = false;
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                this.onPlay();
            }, 1000);
        },
        playing(newPlaying) {
            console.log("play改变");
            this.$nextTick(() => {
                newPlaying ? this.onPlay() : this.pause();
            });
        }
    },
    mounted() {},
    methods: {
        ...mapActions("music", [
            "setPlayingState",
            "setCurrentTime",
            "setPlayMode",
            "startSong",
            "setPlayListShow",
            "setMusicPlayerShow"
        ]),
        formatTime,
        // 加载回调
        onReady() {
            console.log("加载好了:");
            this.songReady = true;
        },
        // 结束回调
        onEnd() {
            this.handleNext();
        },
        onUpdete(e) {
            const time = e.target.currentTime;
            this.setCurrentTime(time);
        },
        // 切换状态
        onTogglePlay() {
            if (!this.currentSong.id) return;
            this.setPlayingState(!this.playing);
        },
        // 播放
        async onPlay() {
            console.log("this.songReady:", this.songReady);
            if (this.songReady) {
                try {
                    await this.audio.play();
                    // if (this.isPlayErrorPromptShow) {
                    //     this.isPlayErrorPromptShow = false;
                    // }
                } catch (error) {
                    // 提示用户手动播放
                    this.isPlayErrorPromptShow = true;
                    this.setPlayingState(false);
                }
            }
        },
        // 暂停
        pause() {
            this.audio.pause();
        },
        // 上一曲
        handlePrev() {
            this.startSong(this.prevSong);
        },
        // 下一曲
        handleNext() {
            this.startSong(this.nextSong);
        },
        // 切换
        onChangePlayMode() {
            const keyMaps = Object.keys(playModeMap);
            const currentIndex = keyMaps.findIndex(
                item => item === this.playMode
            );
            const nextIndex = (currentIndex + 1) % keyMaps.length; // 下一个下标
            const nextModeKey = keyMaps[nextIndex]; // 属性
            const nextMode = playModeMap[nextModeKey]; // 值

            this.setPlayMode(nextMode.code);
        },
        // 播放列表
        togglePlayListShow() {
            this.setPlayListShow(!this.playListShow);
        },
        // 音乐进度改变
        percentChange(percent) {
            const { durationSecond } = this.currentSong;
            console.log("this.currentSong:", this.currentSong);
            this.audio.currentTime = durationSecond * percent;
            this.setPlayingState(true);
        },
        // 打开音乐播放
        onShowPlayer() {
            this.setMusicPlayerShow(!this.musicPlayerShow);
        }
    }
};
</script>

<style lang='scss' scoped>
.bottom-player {
    position: fixed;
    z-index: $mini-player-z-index;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: $mini-player-height;
    padding: 8px 16px;
    padding-right: 24px;
    background: var(--body-bgcolor);
    &__info {
        display: flex;
        align-items: center;
        min-width: 300px;
        color: var(--font-color-white);
        .img-wrap {
            position: relative;
            @include img-wrap(40px);
            margin-right: 8px;
            img {
                border-radius: 4px;
            }
            .mask {
                position: absolute;
                top: 0;
                right: 0;
                bottom: 0;
                left: 0;
                display: flex;
                justify-content: space-around;
                align-items: center;
                border-radius: 4px;
                background: rgba(0, 0, 0, 0.3);
                transform: rotate(90deg);
                transition: all 0.2s;
                .icon {
                    color: #fff;
                }
                &:hover {
                    background: rgba(0, 0, 0, 0.6);
                    cursor: pointer;
                }
            }
        }
        .music-wrap {
            max-width: 500px;
            overflow: hidden;
            line-height: 20px;
        }
    }
    &__control {
        position: absolute;
        left: 50%;
        top: 50%;
        @include flex-center();
        transform: translate(-50%, -50%);
        width: 200px;
        .icon-box {
            @include flex-center();
            margin: 0 15px;
            width: 46px;
            height: 46px;
            border-radius: 23px;
            color: $white;
            background: $theme-color;
            cursor: pointer;
        }
    }
    &__groups {
        @include flex-center();
        min-width: 300px;
    }
    .progress-wrap {
        position: absolute;
        left: 0;
        right: 0;
        top: -14px;
    }
    .icon {
        color: #c4463a;
    }
}
</style>