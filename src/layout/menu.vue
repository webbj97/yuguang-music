<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 11:27:55
-->
<!-- 组件说明 -->
<template>
    <div class="menu">
        <div class="menu__user">
            <div class="img-wrap">
                <img src="../assets/user.png" alt="头像" />
            </div>
            <div class="user-nick" @click="handleYg">余光</div>
        </div>
        <div class="menu__wrap">
            <ul class="item" v-for="(item, index) in menuList" :key="index">
                <router-link
                    class="link"
                    active-class="link-active"
                    :to="item.path"
                >
                    <Icon :size="16" :type="item.meta.icon" class="iconfont" />
                    <span class="title">{{ item.meta.title }}</span>
                </router-link>
            </ul>
        </div>
    </div>
</template>

<script>
import { menuList } from "@/router";

export default {
    components: {},
    data() {
        return {
            menuList,
            visible: false,
            input: 1
        };
    },
    computed: {},
    mounted() {},
    methods: {
        handleYg() {
            window.open("https://github.com/webbj97");
        },
        aaaa() {
            this.$notify({
                title: "notice",
            });
        },
    },
};
</script>

<style lang='scss' scoped>
.menu {
    width: 220px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: var(--menu-bgcolor);

    &__user {
        @include clo-center();
        padding: 10px;
        .img-wrap {
            @include img-wrap(50px);
            margin-right: 10px;
            img {
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 50%;
            }
        }
        .user-nick {
            font-size: 18px;
            color: var(--font-color-white);
        }
    }

    &__wrap {
        flex: 1;
        overflow: hidden;
        overflow-y: auto;
    }
    .item {
        @include clo-center();
        width: 100%;
    }
    .link {
        padding-left: 20px;
        width: 100%;
        height: 100%;
        font-size: $font-size-sm;
        color: var(--font-color-grey2);
        line-height: 50px;
        cursor: pointer;
        &:hover {
            background: var(--menu-item-hover-bg);
        }
        &-active {
            background: var(--menu-item-active-bg);
            color: $theme-color;
            i {
                color: $theme-color;
            }
        }
        .iconfont {
            font-size: $font-size-medium-sm;
        }
        .title {
            margin-left: 10px;
            font-size: $font-size-medium-sm;
        }
    }
}
</style>