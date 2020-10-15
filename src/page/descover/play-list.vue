<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-27 16:45:27
-->
!<!-- 组件说明 -->
<template>
    <div class="play-list">
        <YgTitle>推荐歌单</YgTitle>
        <div class="play-list__content">
            <PlayListCard v-for="item in playlist" :key="item.id" :data="item" />
        </div>
    </div>
</template>

<script>
import { getPersonalized } from "@/api";
import PlayListCard from "@/components/play-list-card";

export default {
    components: { PlayListCard },
    data() {
        return {
            playlist: []
        };
    },
    computed: {},
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            const { result } = await getPersonalized({ limit: 10 });
            this.playlist = result;
            // console.log("result:", result);
        }
    }
};
</script>

<style lang='scss' scoped>
.play-list{
    margin-top: 30px;
    &__content{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
}
</style>