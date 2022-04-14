<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 12:00:33
-->
<!-- 组件说明 -->
<template>
    <div class="songs">
        <div class="songs__nav">
            <span
                v-for="item in nav"
                :key="item.value"
                :class="['nav-item', { 'is-active': item.value === type }]"
                @click="onClickNav(item)"
                >{{ item.name }}</span
            >
        </div>
        <div class="songs__content">
            <SongTable
                :songs="songs"
                :stripe="false"
                :hasLabel="false"
                :hasImg="true"
            />
        </div>
    </div>
</template>

<script>
import { fetchLastMusic } from "@/api";
import SongTable from "@/components/song-table";
import { createSong } from "@utils";
import { MUSIC_NAV } from "@constants";

export default {
    components: { SongTable },
    data() {
        return {
            nav: MUSIC_NAV,
            type: 0,
            songs: [],
        };
    },
    computed: {},
    mounted() {
        this.init();
    },
    methods: {
        onClickNav({ value }) {
            this.type = value;
            this.init();
        },
        async init() {
            const { type } = this;
            const res = await fetchLastMusic({ type });
            const newData = res.map((item) => {
                const {
                    id,
                    name,
                    artists,
                    duration,
                    mvid,
                    album: { picUrl, name: albumName },
                } = item;
                return createSong({
                    id,
                    name,
                    artists,
                    duration,
                    albumName,
                    img: picUrl,
                    mvId: mvid,
                });
            });
            this.songs = newData;
        },
    },
};
</script>

<style lang='scss' scoped>
.songs {
    min-height: 100%;
    &__nav {
        padding: 10px;
        height: 50px;
        line-height: 50px;
    }
    &__content {
        padding-top: 40px;
    }
    .nav-item {
        color: var(--font-color-white);
        padding-right: 30px;
        cursor: pointer;
        &.is-active {
            font-weight: bold;
        }
    }
}
</style>