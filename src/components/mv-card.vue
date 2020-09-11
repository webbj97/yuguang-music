!<!-- 组件说明 -->
<template>
    <div class="mv-card" @click="onMoveMv()">
        <div class="img-wrap">
            <img v-lazy="data.cover" alt="视频" />
            <PlayIcon class="play-icon" />
            <PlayCount class="play-count" :count="data.playCount" />
            <span class="play-time">{{newDuration}}</span>
        </div>
        <p class="name">{{data.name}}</p>
        <p class="artist">by {{data.artistName}}</p>
    </div>
</template>

<script>
import { formatTime } from "@/utils";

export default {
    props: {
        data: {
            type: Object,
            default: () => {}
        }
    },
    components: {},
    data() {
        return {};
    },
    computed: {
        newDuration() {
            const { duration } = this.data;
            return formatTime(duration / 1000);
        }
    },
    mounted() {},
    methods: {
        onMoveMv() {
            const { id } = this.data;
            this.$router.push(`/mv/${id}`);
        }
    }
};
</script>

<style lang='scss' scoped>
.mv-card {
    position: relative;
    margin-bottom: 25px;
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
        top: 2px;
        right: 4px;
    }
    .play-time {
        position: absolute;
        bottom: 2px;
        right: 4px;
        color: #fff;
    }
    &:hover .play-icon {
        opacity: 1;
    }
}
</style>