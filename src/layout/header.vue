<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 11:27:49
-->
<template>
    <div class="header">
        <div>前进后退</div>
        <div>搜索</div>
        <div>换肤</div>
        <Theme />
    </div>
</template>

<script>
import Theme from "@/components/theme";
//import x from ''

export default {
    components: { Theme },
    data() {
        return {};
    },
    computed: {},
    mounted() {
    },
    methods: {

    }
};
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: $header-height;
    background-color: var(--header-bgcolor);
    padding-right: 36px;
}
</style>