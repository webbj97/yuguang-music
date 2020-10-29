<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 11:27:49
-->
<template>
    <div class="header">
        <!-- 按钮组 -->
        <div class="header__left">
            <!-- mac btn -->
            <MacButton />
            <!-- 路由记录 -->
            <RouterHistory />
        </div>

        <div class="header__right">
            <!-- 搜索 -->
            <Search />
            <!-- 换肤 -->
            <Theme />
        </div>
    </div>
</template>

<script>
import MacButton from "@/components/mac-button";
import RouterHistory from "@/components/router-history";
import Theme from "@/components/theme";
import Search from "@/components/search";

export default {
    components: { MacButton, RouterHistory, Theme, Search },
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {},
};
</script>
<style lang="scss" scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;

    height: $header-height;
    background-color: var(--header-bgcolor);
    padding-right: 36px;
    &__left {
        @include clo-center();
    }
    &__right {
        @include clo-center();
    }
}
</style>