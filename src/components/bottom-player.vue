!<!-- 组件说明 -->
<template>
    <div class="bottom-player">
        <!-- 信息 -->
        <div class="bottom-player__info">
            <template v-if="hasCurrentSong">
                <div class="img-wrap">
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

            <div class="icon-box">
                <Icon :type="playIcon" @click="onTogglePlay" />
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

export default {
    components: { },
    data() {
        return {
            songReady: false,
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
            "playListShow"
        ]),
        audio() {
            return this.$refs.audio;
        },
        playIcon() {
            return this.playing ? "zanting" : "bofang";
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
        }
    },
    watch: {
        // 切换|清空|循环-歌曲
        currentSong(newSong, oldSong) {
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
            "setPlayListShow"
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
        togglePlayListShow(){
            this.setPlayListShow(!this.playListShow)
        }
    }
};
</script>

<style lang='scss' scoped>
.bottom-player {
    position: relative;
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
    box-shadow: 1px -1px 1px #ddd;
    &__info {
        display: flex;
        align-items: center;
        min-width: 300px;
        .img-wrap {
            @include img-wrap(40px);
            margin-right: 8px;
            img {
                border-radius: 4px;
            }
        }
        .music-wrap {
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
        }
    }
    &__groups {
        @include flex-center();
        min-width: 300px;
    }
    .icon {
        color: #c4463a;
    }
}
</style>