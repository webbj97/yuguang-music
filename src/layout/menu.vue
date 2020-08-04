<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 11:27:55
-->
<!-- 组件说明 -->
<template>
    <div class="menu">
        <div class="menu__wrap">
            <div class="item" v-for="(item, index) in menuList" :key="index">
                <router-link class="link" active-class="link-active" :to="item.path">
                    <!-- <Icon :size="16" :type="item.meta.icon" class="iconfont" /> -->
                    <span class="menu-title">{{ item.meta.title }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { menuList } from "@/router.js";
//import x from ''
export default {
    components: {},
    data() {
        return {
            menuList
        };
    },
    computed: {},
    methods: {},
    mounted() {}
};
</script>

<style lang='scss' scoped>
.menu {
    width: 220px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--menu-bgcolor);

    &__wrap {
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
        padding: 20px;
    }
    .item {
        display: flex;
        align-items: center;
        width: 100%;
        height: 44px;
    }
    .link {
        width: 100%;
        height: 100%;
        text-align: center;
        line-height: 44px;
        &-active {
            background: #ccc;
        }
    }
}
</style>