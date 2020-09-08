<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 11:20:15
-->
<!-- 组件说明 -->
<template>
    <div class="layout">
        <LayoutHeader />
        <div class="layout-body">
            <div class="layout-menu">
                <LayoutMenu />
            </div>
            <div class="content" id="page-content">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script>
import LayoutHeader from "./header";
import LayoutMenu from "./menu";

export default {
    components: { LayoutHeader, LayoutMenu },
    data() {
        return {};
    },
    computed: {},
    methods: {},
    mounted() {}
};
</script>

<style lang='scss' scoped>
.layout {
    height: 100%;

    .layout-body {
        display: flex;
        height: calc(100% - #{$header-height});

        .layout-menu {
            // 这个100%是继承了父级高度
            height: calc(100% - #{$mini-player-height});
        }

        .content {
            // 自由占满剩下高度
            flex: 1;
            overflow-y: auto;
            min-width: $layout-content-min-width;
            margin-bottom: $mini-player-height;

            .router-view-center {
                max-width: $center-content-max-width;
                margin: auto;
            }
        }
    }
}
</style>