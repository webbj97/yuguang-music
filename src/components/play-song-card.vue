<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-31 09:42:27
-->
!<!-- 组件说明 -->
<template>
    <div class="new-song-card">
        <div class="new-song-card__img">
            <img v-lazy="data.picUrl" alt="音乐" />
        </div>
        <div class="new-song-card__info">
            <span></span>
            <div>
                <p>{{data.name}}</p>
                <p>{{data.artistsText}}</p>
            </div>
        </div>
    </div>
</template>

<script>
//import x from ''
export default {
    components: {},
    props: {
        data: {
            type: Object
        }
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
};
</script>

<style lang='scss' scoped>
.new-song-card {
    display: flex;
    align-items: center;
    width: 50%;
    &__img {
        @include img-wrap(100px);
    }
    &__info {
        margin-left: 20px;
        display: flex;
        align-items: center;
    }
}
</style>