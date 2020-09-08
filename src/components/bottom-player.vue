!<!-- 组件说明 -->
<template>
    <div class="bottom-player">
        <!-- 信息 -->
        <template v-if="hasCurrentSong">
            <div class="bottom-player__info">
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
            </div>
        </template>

        <!-- 播放 -->
        <div class="bottom-player__control">
            <Icon class="icon" type="shangyiqu" @click="handlePrev" />

            <div class="icon-box">
                <Icon :type="playIcon" @click="onTogglePlay" />
            </div>

            <Icon class="icon" type="xiayiqu" @click="handleNext" />
        </div>
        <!-- 操作 -->
        <div class="bottom-player__groups">
            <div>1</div>
            <div>2</div>
        </div>

        <!-- 模式 -->
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
            "nextSong"
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
            "startSong"
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
            console.log("切换");
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
    // background: var(--body-bgcolor);
    background: rgba(0, 0, 0, 0.1);
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
        transform: translate(-50%, -50%);
        @include flex-center();
        width: 200px;
    }
    &__groups {
        @include flex-center();
        min-width: 300px;
    }
    .icon {
        width: 20px;
        height: 20px;
        color: #c4463a;
    }
}
</style>