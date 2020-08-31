<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-30 17:27:34
-->
!<!-- 组件说明 -->
<template>
    <div class="playlist-details">歌单详情</div>
</template>

<script>
import { getListDetail } from "@/api";

export default {
    components: {},
    data() {
        return {};
    },
    computed: {
        id() {
            return Number(this.$route.params.id);
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            const { id } = this;
            const res = await getListDetail({ id });
            console.log("red:", res);
        }
    }
};
</script>

<style lang='scss' scoped>
</style>