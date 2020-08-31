<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-04 16:56:22
-->
<!-- 组件说明 -->
<template>
    <div class="yuguang-button" @click="onClick">
        <slot />
    </div>
</template>

<script>
//import x from ''
export default {
    name: 'YgButton',
    components: {},
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {
        onClick(item){
            this.emit('click', item)
        }
    },
};
</script>

<style lang='scss' scoped>
</style>