<!-- 组件说明 -->
<template>
    <div class="search-page">
        <p class="header">
            <span class="keywords">{{ keywords }}</span>
            找到 {{  }} 首单曲
        </p>
    </div>
</template>

<script>
//import x from ''
export default {
    props: ["keywords"],
    components: {},
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {},
};
</script>

<style lang='scss' scoped>
.search-page {
    .header {
        padding: 20px 32px;

        .keywords {
            display: inline-block;
            margin-right: 4px;
            font-size: $font-size-title-lg;
            font-weight: $font-weight-bold;
        }
    }
}
</style>