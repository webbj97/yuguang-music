<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-08 17:33:43
-->
!<!-- 组件说明 -->
<template>
    <div class="playlist" v-show="playListShow">
        <div class="playlist__header">头部</div>
        <div class="playlist__content">
            <SongTable :songs="playList" />
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import SongTable from "./song-table";

export default {
    components: { SongTable },
    data() {
        return {};
    },
    computed: {
        ...mapGetters("music", ["playListShow", "playList"]),
    },
    watch: {
        playList(e) {
            console.log("playList:", e);
        },
    },
    mounted() {},
    methods: {},
};
</script>

<style lang='scss' scoped>
.playlist {
    position: absolute;
    z-index: 10;
    top: $header-height;
    bottom: 0;
    right: 0;
    width: 450px;
    box-shadow: -1px 0 2px #eee;
    height: 100%;
    overflow-y: scroll;
    background: var(--body-bgcolor);
    &__header{
        height: 60px;
        border: 1px solid red;
    }
    &__content{
        overflow-y: auto;
        border: 1px solid green;
        height: calc(100% - 60px);
    }
}
</style>