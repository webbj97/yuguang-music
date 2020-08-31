!<!-- 组件说明 -->
<template>
    <div class="yg-title">
        <p class="yg-title__content">
            <slot></slot>
        </p>
    </div>
</template>

<script>
//import x from ''
export default {
    name: "YgTitle",
};
</script>

<style lang='scss' scoped>
.yg-title {
    display: flex;
    padding: 12px 0;
    &__content {
        font-size: $font-size-title;
        color: var(--font-color-white);
    }
}
</style>