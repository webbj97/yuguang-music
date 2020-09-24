!<!-- 组件说明 -->
<template>
    <div class="simi-card">
        <slot name="img-wrap">
            <div class="img-wrap">
                <img v-lazy="getImgUrl(imgCover, 50)" />
                <slot name="img-mask"></slot>
            </div>
        </slot>
        <div class="content">
            <div class="content__name">{{ name }}</div>
            <div class="content__desc">by {{ desc }}</div>
        </div>
    </div>
</template>

<script>
import { getImgUrl } from "@/utils";

export default {
    name: "SimiCard",
    props: ["imgCover", "name", "desc"],
    components: {},
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {
        getImgUrl
    }
};
</script>

<style lang='scss' scoped>
.simi-card {
    display: flex;
    padding: 0 4px;
    cursor: pointer;
    .img-wrap {
        position: relative;
        @include img-wrap(50px);

        img {
            border-radius: 4px;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        margin-left: 10px;
        overflow: hidden;
        &__name{
            margin-top: 10px;
            height: 40px;
            line-height: 20px;
            font-weight: 500;
            @include ellipsis-more(2);
        }
        &__desc{
            margin-top: 5px;
            color: $gray;
            @include ellipsis();
        }
    }
}
</style>