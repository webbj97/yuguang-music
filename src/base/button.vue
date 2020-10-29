<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-04 16:56:22
-->
<!-- 组件说明 -->
<template>
    <div class="yuguang-button" @click="onClick()">
        <slot />
    </div>
</template>

<script>
//import x from ''
export default {
    name: "YgButton",
    components: {},
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {
        onClick(e) {
            this.$emit("click", e);
        },
    },
};
</script>

<style lang='scss' scoped>
.yuguang-button {
    display: inline-block;
    padding: 0 10px;
    border: 1px solid var(--button-border-color);
    border-radius: 2px;
    text-align: center;
    cursor: pointer;

    &:hover {
        background: var(--button-hover-bgcolor);
    }
}
</style>