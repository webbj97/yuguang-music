<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-27 16:48:09
-->
!<!-- 组件说明 -->
<template>
    <div class="play-list-card" @click="onMoveList(data)">
        <div class="img-wrap">
            <img class="img-wrap__img" v-lazy="data.picUrl" alt="推荐歌单" />
            <div class="img-wrap__icon">
                <Icon type="bofang" />
            </div>
            <div class="img-wrap__desc" v-if="data.copywriter">{{ data.copywriter }}</div>
            <!-- <PlayIcon :size="36" class="play-icon" /> -->
        </div>
        <p class="play-list-card__name">{{data.name}}</p>
    </div>
</template>

<script>
export default {
    components: {},
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    watch: {
        data(v) {
            console.log("v:", v);
        }
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {
        // 歌单详情
        onMoveList({ id }) {
            this.$router.push(`/playlist/${id}`);
        }
    }
};
</script>

<style lang='scss'>
.play-list-card {
    display: flex;
    flex-direction: column;
    width: calc(20% - 16px); // 宽度
    margin-bottom: 30px;
    cursor: pointer;
    .img-wrap {
        position: relative;
        width: 100%;
        padding-top: 100%;
        margin-bottom: 8px;
        border-radius: 4px;
        overflow: hidden;
        &__img {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        &__desc {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 4px 10px;
            background: rgba(0, 0, 0, 0.1);
            color: $white;
            font-size: $font-size-sm;
            transform: translate(0, -100%);
            transition: all 0.2s;
        }
        &__icon {
            position: absolute;
            right: 10px;
            bottom: 10px;
            @include flex-center();
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            opacity: 0;
            transition: 0.2s opacity;
            i {
                font-style: 12px;
                color: $music-color;
            }
        }
        &:hover {
            .img-wrap__icon {
                opacity: 1;
            }
            .img-wrap__desc {
                transform: translate(0, 0);
            }
        }
    }
    &__name {
        line-height: 18px;
        color: var(--font-color-white);
        @include ellipsis-more(2);
    }
}
</style>