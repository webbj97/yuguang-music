<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-11 10:23:49
-->
!<!-- 组件说明 -->
<template>
    <div class="play-icon" :style="style">
        <Icon class="play-icon__icon" :size="iconSize" type="bofang" />
    </div>
</template>

<script>
//import x from ''
export default {
    name: "PlayIcon",
    props: {
        size: {
            type: Number,
            default: 26
        }
    },
    data() {
        return {};
    },
    computed: {
        style() {
            return { width: `${this.size}px`, height: `${this.size}px`, 'border-radius': '50%' };
        },
        iconSize() {
            return this.size * 0.5;
        }
    },
    mounted() {},
    methods: {}
};
</script>

<style lang='scss' scoped>
.play-icon {
    background: rgba(210, 210, 210, 0.5);
    @include flex-center();
    &__icon{
        color: $theme-color;
    }
}
</style>