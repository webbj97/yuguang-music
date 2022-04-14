<!-- 组件说明 -->
<template>
    <div class="main-search">
        <el-input
            @click.native="onClickInput"
            @input="onInput"
            @keypress.native.enter="onEnterPress"
            class="main-input"
            v-model.trim="input"
            prefix-icon="el-icon-search"
            placeholder="搜索"
        >
        </el-input>
        <div
            class="search-panel"
            v-show="searchPanelShow"
            @mouseleave="onLeave"
        >
            <template v-if="suggestShow">
                <div class="panel panel--suggest">
                    <div
                        class="group"
                        v-for="(item, index) in normalizedData"
                        :key="index"
                    >
                        <p class="group__title">
                            <Icon :type="item.icon" :size="12" />
                            {{ item.title }}
                        </p>
                        <li
                            class="group__item"
                            v-for="(node, idx) in item.data"
                            :key="idx"
                            @click="item.onClick(node)"
                        >
                            <HighlightText
                                :text="
                                    item.render ? item.render(node) : node.name
                                "
                                :highlightText="input"
                            />
                        </li>
                    </div>
                </div>
            </template>
            <template v-else>
                <div class="panel panel--hot">
                    <p class="title">热门搜索</p>
                    <YgButton
                        v-for="(hot, index) in hotSearchs"
                        :key="index"
                        class="hot-item"
                        @click="hotClick(hot)"
                    >
                        {{ hot.first }}
                    </YgButton>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import storage from "good-storage";
import { getSearchSuggest, fetchSearchHot } from "@/api";
import { debounce, createSong } from "@utils";
import { mapActions } from "vuex";

const SEARCH_HISTORY_KEY = "BASE:SEARCH_HISTORY_LIST";

export default {
    components: {},
    data() {
        return {
            input: "",
            searchPanelShow: false,
            suggest: {
                artists: [],
                songs: [],
            }, // 搜索推荐
            hotSearchs: [], // 热门搜索
            searchHistorys: storage.get(SEARCH_HISTORY_KEY, []),
        };
    },
    computed: {
        suggestShow() {
            const { input, suggest } = this;
            return (
                input.length &&
                ["songs", "playlists"].find((key) => {
                    return suggest[key] && suggest[key].length;
                })
            );
        },
        normalizedData() {
            return [
                {
                    title: "单曲",
                    icon: "yinle",
                    data: this.suggest.songs,
                    onClick: this.onClickSong.bind(this),
                    render: (item) => {
                        const {
                            name,
                            artists: [{ name: newName }],
                        } = item;
                        return `${name} - ${newName}`;
                    },
                },
                {
                    title: "歌单",
                    icon: "ziyuan",
                    data: this.suggest.playlists,
                    onClick: this.onClickPlaylists.bind(this),
                },
                {
                    title: "mv",
                    icon: "mv",
                    data: this.suggest.mvs,
                    render: (item) => {
                        const {
                            name,
                            artists: [{ name: newName }],
                        } = item;
                        return `${name} - ${newName}`;
                    },
                    onClick: this.onClickMv.bind(this),
                },
            ].filter((item) => item.data && item.data.length);
        },
    },
    watch: {
        normalizedData(e) {
            console.log("e:", e);
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions("music", ["startSong"]),
        // 初始化
        async init() {
            const {
                result: { hots },
            } = await fetchSearchHot();
            this.hotSearchs = hots;
            console.log(this.hotSearchs);
        },
        // 点击
        onClickInput() {
            this.searchPanelShow = true;
        },
        onInput: debounce(function (value) {
            if (!value.trim()) return;
            getSearchSuggest({ keywords: value }).then((res) => {
                const { result } = res;
                console.log(result);
                this.suggest = result;
            });
        }, 500),
        async onClickSong(item) {
            console.log("itemitemitemitem", item);
            const {
                id,
                name,
                artists,
                duration,
                mvid,
                album: { id: albumId, name: albumName },
            } = item;
            const song = createSong({
                id,
                name,
                artists,
                duration,
                albumId,
                albumName,
                mvId: mvid,
            });
            this.startSong(song);
        },
        onLeave() {
            this.searchPanelShow = false;
        },
        hotClick(item) {
            const { first } = item;
            this.linkSearch(first);
        },
        linkSearch(keywords) {
            this.searchHistorys.push({ first: keywords });
            storage.set(SEARCH_HISTORY_KEY, this.searchHistorys);
            // this.$router.push(`/search/${keywords}`);
            this.searchPanelShow = false;
        },
        onClickPlaylists({ id }) {
            if (!id) return;

            this.$router.push(`/playlist/${id}`);
            this.searchPanelShow = false;
        },
        onEnterPress() {
            const { input } = this;
            console.log("input:", input);
            this.linkSearch(input);
        },
        onClickMv(e){
            console.log('onClickMv:', e);
        }
    },
};
</script>

<style lang='scss' scoped>
.main-search {
    .main-input {
        font-size: 12px;
    }
    .search-panel {
        position: fixed;
        top: $header-height;
        bottom: $mini-player-height;
        right: 0;
        width: 350px;
        background: var(--search-bgcolor);
        z-index: $search-panel-z-index;
        font-size: $font-size-sm;
        overflow-y: auto;
        @include box-shadow();
    }
    .panel {
        padding: 10px;
        .title {
            color: var(--font-color-grey-shallow);
            margin-bottom: 15px;
        }
        &--hot {
            .hot-item {
                font-size: 12px;
                color: var(--font-color-grey2);
                line-height: 30px;
                height: 30px;
                border-radius: 15px;
                margin-right: 15px;
                margin-bottom: 8px;
            }
        }
        .group {
            &__title {
                line-height: 40px;
                color: var(--font-color-grey2);
            }
            &__item {
                padding-left: 10px;
                line-height: 30px;
                color: var(--font-color-white);
                transition: all 0.2s;
                cursor: pointer;
                &:hover {
                    background: #eee;
                }
            }
        }
    }
}
</style>