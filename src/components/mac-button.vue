<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-09 10:46:59
-->
!<!-- 组件说明 -->
<template>
    <div class="mac-button">
        <div class="btn btn--red" @click="handleHome">
            <Icon :size="9" type="home" />
        </div>
        <div class="btn btn--yellow" @click="handleExitFull">
            <Icon :size="9" type="zuixiaohua" />
        </div>
        <div class="btn btn--green">
            <Icon :size="9" type="quanping" @click="handleFullScreen" />
        </div>
    </div>
</template>

<script>
import { requestFullScreen, exitFullscreen, isFullscreen } from "@/utils";
export default {
    name: "MacButton",
    components: {},
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {
        // 首页
        handleHome() {
            console.log("返回首页");
            this.$router.push("/discovery"); // 返回推荐页
        },
        // 退出全屏
        handleExitFull() {
            console.log("退出全屏:");
            if (isFullscreen()) {
                exitFullscreen();
            }
        },
        // 全屏
        handleFullScreen() {
            requestFullScreen(document.documentElement);
            console.log("全屏:");
        }
    }
};
</script>

<style lang='scss' scoped>
.mac-button {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 60px;
    margin-right: 30px;
    .btn {
        width: 14px;
        height: 14px;
        border-radius: 7px;
        @include flex-center();
        i {
            opacity: 0;
            transition: 0.2s opacity;
            &:hover {
                opacity: 1;
            }
        }
        &--red {
            background: #ff544d;
        }
        &--yellow {
            background: #ffb528;
        }
        &--green {
            background: #26c339;
        }
    }
}
</style>