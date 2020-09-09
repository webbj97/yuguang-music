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
        <div class="playList__content">列表部分</div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
    components: {},
    data() {
        return {};
    },
    computed: {
        ...mapGetters("music", ["playListShow"])
    },
    mounted() {},
    methods: {}
};
</script>

<style lang='scss' scoped>
.playlist {
    position: absolute;
    top: $header-height;
    bottom: 0;
    right: 0;
    width: 300px;
    box-shadow: -1px 0 2px #eee;
    height: 100%;
}
</style>