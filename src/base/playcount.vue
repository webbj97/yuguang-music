!<!-- 组件说明 -->
<template>
    <div class="play-count">
        <Icon class="play-count__icon" type="bofang-line" :size="14" />
        <span class="play-count__count">{{playCount}}</span>
    </div>
</template>

<script>
import {countUnit} from '@/utils';
export default {
    name: "PlayCount",
    props: ["count"],
    data() {
        return {};
    },
    computed: {
        playCount() {
            const { count } = this;
            return countUnit(count);
        }
    },
    mounted() {},
    methods: {}
};
</script>

<style lang='scss' scoped>
.play-count{
    color: #fff;
    &__icon{
        margin-right: 2px;
    }
}
</style>