<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-31 09:42:27
-->
!<!-- 组件说明 -->
<template>
    <el-carousel class="banner-carousel" type="card" :interval="4000">
        <el-carousel-item v-for="(item,index) in banners" :key="index">
            <a class="banner-carousel__item" :href="item.url">
                <img :src="getImgUrl(item.imageUrl, 1000, 400)" alt="轮播" />
            </a>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
import { getBanner } from "@/api";
import { getImgUrl } from "@/utils";

export default {
    data() {
        return {
            banners: []
        };
    },
    computed: {},
    mounted() {
        this.init();
    },
    methods: {
        getImgUrl,
        async init() {
            const { banners } = await getBanner();
            this.banners = banners;
        }
    }
};
</script>

<style lang='scss' scoped>
.banner-carousel {
    /deep/.el-carousel__container {
        height: 200px;
    }
    &__item {
        height: 200px;
        img {
            width: 100%;
            height: 100%;
            border-radius: 4px;
        }
    }
}
</style>