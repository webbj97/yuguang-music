<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-31 09:42:27
-->
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
    padding: 18px 0;
    &__content {
        font-size: $font-size-title;
        color: var(--font-color-white);
        font-weight: 500;
    }
}
</style>