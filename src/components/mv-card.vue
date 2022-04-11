<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-11 15:40:39
-->
!<!-- 组件说明 -->
<template>
    <div class="mv-card" @click="onMoveMv()">
        <div class="img-wrap">
            <img v-lazy="imgCover" alt="视频" />
            <PlayIcon class="play-icon" />
            <PlayCount class="play-count" :count="playCount" />
            <span class="play-time" v-if="duration">{{newDuration}}</span>
        </div>
        <p class="name" v-if="name">{{ name }}</p>
        <p class="artist" v-if="author">by {{ author }}</p>
    </div>
</template>

<script>
import { formatTime } from "@utils";

export default {
    props: ["imgCover", "duration", "id", "name", "author", "playCount"],
    components: {},
    data() {
        return {};
    },
    computed: {
        newDuration() {
            const { duration } = this;
            return formatTime(duration / 1000);
        }
    },
    mounted() {},
    methods: {
        onMoveMv() {
            const { id } = this;
            this.$router.push(`/mv/${id}`);
        }
    }
};
</script>

<style lang='scss' scoped>
.mv-card {
    position: relative;
    min-width: 140px;
    cursor: pointer;
    .img-wrap {
        position: relative;
        padding-top: 56%;
        img {
            @include abs-stretch();
            width: 100%;
            height: 100%;
            border-radius: 4px;
        }
    }
    .name {
        margin-top: 5px;
        line-height: 22px;
        color: var(--font-color-white);
        @include ellipsis();
    }
    .artist {
        font-size: 12px;
        color: $gray;
        @include ellipsis();
    }
    .play-icon {
        @include abs-center();
        opacity: 0;
        transition: opacity 0.3s;
    }
    .play-count {
        position: absolute;
        top: 3px;
        right: 5px;
    }
    .play-time {
        position: absolute;
        bottom: 2px;
        right: 5px;
        color: #fff;
    }
    &:hover .play-icon {
        opacity: 1;
    }
}
</style>