<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-14 17:41:39
-->
<template>
    <div class="page-default">
        <Icon v-if="hasIcon" type="kongbaiye" :size="20" />
        <p class="">{{ msg }}</p>
    </div>
</template>

<script>

export default {
    name: "PageDefault",
    props: {
        type: {
            type: String,
            default: "", // no-network, no-content, no-filter, no-data, no-permission
        },
        message: {
            type: String,
            default: "",
        },
        hasIcon: {
            type: Boolean,
            default: true,
        }
    },
    computed: {
        msg() {
            if (this.message) return this.message;

            return {
                "no-network": "收不到网络信号了",
                "no-content": "当前页面没有内容",
                "no-filter": "没有搜索筛选结果",
                "no-data": "找不到任何数据",
            }[this.type];
        }
    },
    methods: {
        onClick() {
            this.$emit("refresh", this.type);
        }
    }
};
</script>

<style lang="scss" scoped>
.page-default{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>
