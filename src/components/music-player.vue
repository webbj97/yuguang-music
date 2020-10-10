<!-- 组件说明 -->
<template>
    <div class="music-player" :class="{'show': musicPlayerShow}">
        <div class="music-info">
            <div class="music-wrap">
                <div class="img-wrap">
                    <img v-lazy="currentSong.img" :class="{'playing': playing}" alt="音乐" />
                </div>
            </div>
            <div class="lyric-wrap">
                <p class="author-name">
                    <span class="name">{{currentSong.name}}</span>
                    <span class="tag">最高品质</span>
                </p>
                <p class="author-info">
                    <span class="item">
                        专辑：
                        <a class="item__val" href="javascript:void(0);">{{currentSong.albumName}}</a>
                    </span>
                    <span class="item">
                        歌手：
                        <a
                            class="item__val"
                            href="javascript:void(0);"
                        >{{currentSong.artistsText}}</a>
                    </span>
                </p>
                <div class="lyric">
                    <PageDefault v-if="nolyric" message="暂未找到歌词" :hasIcon="false" />
                    <MainScroll
                        class="main-scroll"
                        :data="lyric"
                        @init="initScroller"
                        ref="scroller"
                    >
                        <div>
                            <div
                                v-for="(item, index) in lyricWithTranslation"
                                :key="index"
                                class="item-lyric"
                                :class="{'active': isActiveLyric(index) }"
                                ref="lyric"
                            >
                                <p
                                    v-for="(tItem, idx) in item.contents"
                                    :key="idx"
                                    class="same-lyric"
                                >{{tItem}}</p>
                            </div>
                        </div>
                    </MainScroll>
                </div>
            </div>
        </div>
        <div class="music-bottom">
            <div class="left">
                <Comments v-if="CommentsId" :id="CommentsId" type="song" ref="comments" />
            </div>
            <div class="right" v-if="simiListShow">
                <div class="simi-box">
                    <p class="title">包含这首歌的歌单</p>
                    <div
                        :key="simiPlaylist.id"
                        class="simi-item"
                        v-for="simiPlaylist in simiPlaylists"
                    >
                        <Card
                            :img="simiPlaylist.coverImgUrl"
                            :name="simiPlaylist.name"
                            @click="onClickPlaylist(simiPlaylist)"
                        >
                            <template v-slot:desc>
                                <div class="desc">
                                    <Icon :size="12" color="shallow" type="play" />
                                    <p class="count">{{countUnit(simiPlaylist.playCount)}}</p>
                                </div>
                            </template>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { getLyric, getSimiPlaylists, getSimiSongs } from "@/api";
import { isDef, lyricParser, countUnit } from "@/utils";
import Comments from "@/components/comments";

const WHEEL_TYPE = "wheel";
const SCROLL_TYPE = "scroll";

const AUTO_SCROLL_RECOVER_TIME = 1000;

export default {
    name: "musicPlayer",
    props: {
        isShow: {
            type: Boolean,
            default: false
        }
    },
    components: { Comments },
    data() {
        return {
            lyric: [],
            tlyric: [],
            nolyric: false,
            lyricScrolling: {
                [WHEEL_TYPE]: false,
                [SCROLL_TYPE]: false
            },
            lyricTimer: {
                [WHEEL_TYPE]: null,
                [SCROLL_TYPE]: null
            },
            simiPlaylists: [],
            simiSongs: []
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
        CommentsId() {
            return this.currentSong ? this.currentSong.id : "";
        },
        lyricWithTranslation() {
            let result = [];
            // 空内容的去除
            const lyricFiltered = this.lyric.filter(({ content }) =>
                Boolean(content)
            );
            // content统一转换数组形式，双词组合在一起
            if (lyricFiltered.length) {
                lyricFiltered.forEach(({ time, content }) => {
                    // 当前歌词
                    const lyricLine = {
                        time,
                        content,
                        contents: [content]
                    };
                    // 相同时间的歌词，过滤作词和作曲
                    const sameTimeTLyric = this.tlyric.find(
                        ({ time: tLyricTime }) =>
                            tLyricTime === time && !/(作词|作曲)/.test(content)
                    );

                    if (sameTimeTLyric) {
                        const { content: tLyricContent } = sameTimeTLyric;
                        if (content) {
                            lyricLine.contents.push(tLyricContent);
                        }
                    }
                    result.push(lyricLine);
                });
            } else {
                result = lyricFiltered.map(({ time, content }) => ({
                    time,
                    content,
                    contents: [content]
                }));
            }
            return result;
        },
        activeLyricIndex() {
            return this.lyricWithTranslation
                ? this.lyricWithTranslation.findIndex((l, index) => {
                      const nextLyric = this.lyricWithTranslation[index + 1];
                      return (
                          this.currentTime >= l.time &&
                          (nextLyric ? this.currentTime < nextLyric.time : true)
                      );
                  })
                : -1;
        },
        simiListShow() {
            const { simiPlaylists, simiSongs } = this;
            return simiPlaylists.concat(simiSongs).length > 0;
        }
    },
    watch: {
        currentSong(newSong, oldSong) {
            if (!newSong.id) {
                this.setMusicPlayerShow(false);
                return;
            }
            if (newSong.id === oldSong.id) return; // 同一首歌
            console.log("切歌？");
            console.log("this.isPlayerShow:", this.isPlayerShow);
            // 如果歌曲详情显示状态切歌 需要拉取歌曲相关信息
            if (this.musicPlayerShow) {
                this.updateSong();
            } else {
                // 否则只是更新歌词
                this.initlyric();
            }
        },
        // 滚动至当前歌词
        activeLyricIndex(newIndex, oldIndex) {
            if (
                newIndex !== oldIndex &&
                !this.lyricScrolling[WHEEL_TYPE] &&
                !this.lyricScrolling[SCROLL_TYPE]
            ) {
                this.scrollToActiveLyric();
            }
        },
        $route() {
            this.setMusicPlayerShow(false);
        }
    },
    mounted() {
        // this.initlyric();
    },
    methods: {
        countUnit,
        ...mapActions("music", ["setMusicPlayerShow"]),
        updateSong() {
            console.log("出发了更新相关信息方法:");
            this.initlyric();
            this.initSimiList();
        },
        async initlyric() {
            console.log('加载歌词:');
            const { id } = this.currentSong;
            const result = await getLyric(id);
            this.nolyric = !isDef(result.lrc) || !result.lrc.lyric;

            if (!this.nolyric) {
                const { lyric, tlyric } = lyricParser(result);
                this.lyric = lyric;
                this.tlyric = tlyric;
            }
        },
        // 初始化滚动模块
        initScroller(scoller) {
            const onScrollStart = type => {
                this.clearTimer(type);
                this.lyricScrolling[type] = true;
            };
            const onScrollEnd = type => {
                // 滚动结束后两秒 歌词开始自动滚动
                this.clearTimer(type);
                this.lyricTimer[type] = setTimeout(() => {
                    this.lyricScrolling[type] = false;
                }, AUTO_SCROLL_RECOVER_TIME);
            };
            scoller.on("scrollStart", onScrollStart.bind(null, SCROLL_TYPE));
            scoller.on("mousewheelStart", onScrollStart.bind(null, WHEEL_TYPE));

            scoller.on("scrollEnd", onScrollEnd.bind(null, SCROLL_TYPE));
            scoller.on("mousewheelEnd", onScrollEnd.bind(null, WHEEL_TYPE));
        },
        // 清除自动滚动
        clearTimer(type) {
            this.lyricTimer[type] && clearTimeout(this.lyricTimer[type]);
        },
        // 当前歌词
        isActiveLyric(index) {
            const { activeLyricIndex } = this;
            return activeLyricIndex === index;
        },
        // 滚动歌词
        scrollToActiveLyric() {
            if (this.activeLyricIndex !== -1) {
                const { scroller, lyric } = this.$refs;
                // 歌词存在 && 当前的词存在
                if (!lyric) return;
                const activeLyrc = lyric[this.activeLyricIndex]; // 当前歌词dom节点
                if (activeLyrc) {
                    scroller
                        .getScroller()
                        .scrollToElement(activeLyrc, 200, 0, true);
                }
            }
        },
        // 初始化相似列表
        async initSimiList() {
            const { currentSong } = this;
            const [dataSonglists, dataSongs] = await Promise.all([
                getSimiPlaylists(currentSong.id),
                getSimiSongs(currentSong.id)
            ]);
            this.simiPlaylists = dataSonglists.playlists;
            this.simiSongs = dataSongs.songs;
            console.log("this.simiPlaylists:", this.simiPlaylists);
            console.log("this.simiSongs:", this.simiSongs);
        },
        // 点击相似歌单
        onClickPlaylist({ id }) {
            // 点击的歌单和当前打开的个单页是同一个 直接关闭player
            if (id === Number(this.$route.params.id)) {
                this.setMusicPlayerShow(false);
            } else {
                this.$router.push(`/playlist/${id}`);
            }
        }
    }
};
</script>

<style lang='scss' scoped>
.music-player {
    position: fixed;
    top: $header-height;
    bottom: $mini-player-height;
    left: 0;
    right: 0;
    z-index: 1000;
    overflow-x: hidden;
    overflow-y: scroll;
    padding: 0 60px;
    background: var(--player-bgcolor);
    transform: translateY(110%);
    transition: all 0.3s;
    &.show {
        transform: none;
    }
    .music-info {
        display: flex;
        justify-content: space-between;
        .music-wrap {
            display: flex;
            height: 600px;
            width: 50%;
            .img-wrap {
                position: relative;
                @include flex-center();
                margin: 0 auto;
                margin-top: 100px;
                width: 320px;
                height: 320px;
                border-radius: 50%;
                background: #0f1013;
                img {
                    width: 220px;
                    height: 220px;
                    border-radius: 50%;
                    animation-name: rota;
                    animation-duration: 20s;
                    animation-fill-mode: forwards;
                    animation-timing-function: linear;
                    animation-iteration-count: infinite;
                    animation-play-state: paused;
                    &.playing {
                        animation-play-state: running;
                    }
                }
            }
        }
        .lyric-wrap {
            display: flex;
            flex-direction: column;
            padding: 0 20px;
            width: 50%;
            .author-name {
                @include clo-center();
                margin-bottom: 30px;
                .name {
                    font-size: $font-size-title-lg;
                }
                .tag {
                    margin-left: 5px;
                    padding: 3px 5px;
                    border: 1px solid $theme-color;
                    min-width: 70px;
                    text-align: center;
                    border-radius: 4px;
                    color: $theme-color;
                }
            }
            .author-info {
                margin-bottom: 30px;
                @include clo-center();
                .item {
                    padding-right: 10px;
                    width: 200px;
                    @include ellipsis();
                    &__val {
                        color: $blue;
                    }
                }
            }
            .lyric {
                height: 400px;
                .item-lyric {
                    margin-bottom: 18px;
                    &.active {
                        font-weight: 600;
                    }
                }
                .same-lyric {
                    margin-bottom: 5px;
                }
            }
            .main-scroll {
                position: relative;
                width: 100%;
                height: 400px;
                &::after {
                    content: "";
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 40px;
                    background: linear-gradient(
                        rgba(255, 255, 255, 0.001),
                        var(--player-bgcolor)
                    );
                }
            }
        }
    }
    .music-bottom {
        display: flex;
        margin-top: 48px;
        margin-bottom: 36px;
        .left {
            flex: 1;
        }
        .right {
            padding-left: 36px;
            width: 28%;
            overflow: hidden;
        }
        .simi-box {
        }
        .title {
            font-size: $font-size-lg;
            font-weight: $font-weight-bold;
            margin-bottom: 12px;
        }
    }
    @keyframes rota {
        from {
            transform: rotate(0);
        }
        to {
            transform: rotate(360deg);
        }
    }
}
</style>