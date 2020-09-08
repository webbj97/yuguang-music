<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-28 15:04:19
-->
!<!-- 组件说明 -->
<template>
    <div class="play-mv-card">
        <div class="img-wrap">
            <img class="img-wrap__img" v-lazy="data.picUrl" alt="推荐歌单" />
            <div class="img-wrap__desc" v-if="data.copywriter">{{ data.copywriter }}</div>
            <Icon type="bofang" />
        </div>
        <p class="play-mv-card__name">{{ data.name }}</p>
    </div>
</template>

<script>
//import x from ''
export default {
    components: {},
    props: {
        data: {
            type: Object
        }
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
};
</script>

<style lang='scss' scoped>
.play-mv-card {
    display: flex;
    flex-direction: column;
    width: calc(25% - 15px); // 宽度
    .img-wrap {
        position: relative;
        width: 100%;
        margin-bottom: 8px;
        border-radius: 4px;
        overflow: hidden;
        &__img {
            width: 100%;
            height: auto;
        }
        &__desc {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            padding: 10px;
            background: rgba(0, 0, 0, 0.1);
            font-size: 14px;
            color: #fff;
            transform: translate(0, -100%);
            transition: all 0.2s;
        }
        &:hover {
            .img-wrap__desc {
                transform: translate(0, 0);
            }
        }
    }
    &__name {
    }
}
</style>