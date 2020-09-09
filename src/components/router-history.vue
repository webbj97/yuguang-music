!<!-- 组件说明 -->
<template>
    <div class="router-history">
        <div class="btn">
            <Icon :size="12" type="houtui" @click="urlPrev" />
        </div>
        <div class="btn">
            <Icon :size="12" type="qianjin" @click="urlNext" />
        </div>
    </div>
</template>

<script>
//import x from ''
export default {
    name: "RouterHistory",
    components: {},
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {
        urlPrev() {
            this.$router.back();
        },
        urlNext() {
            this.$router.forward();
        }
    }
};
</script>

<style lang='scss' scoped>
.router-history {
    display: flex;
    align-items: center;
    .btn{
        @include flex-center();
        width: 22px;
        height: 22px;
        border-radius: 10px;
        margin-right: 10px;
        &:hover{
            background: rgba(218, 206, 206, 0.3);
        }
    }
}
</style>