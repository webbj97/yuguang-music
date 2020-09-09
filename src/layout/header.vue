<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 11:27:49
-->
<template>
    <div class="header">
        <!-- 按钮组 -->
        <div class="groups">
            <!-- mac btn -->
            <MacButton />
            <!-- 路由记录 -->
            <RouterHistory />
        </div>

        <!-- 换肤 -->
        <el-popover placement="bottom" trigger="hover" width="200">
            <Theme />
            <Icon type="pifu" slot="reference" />
        </el-popover>
    </div>
</template>

<script>
import MacButton from "@/components/mac-button";
import RouterHistory from "@/components/router-history";
import Theme from "@/components/theme";

export default {
    components: { MacButton, RouterHistory, Theme },
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
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
    .groups{
        @include clo-center();
    }
}
</style>