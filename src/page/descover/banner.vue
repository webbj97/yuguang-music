!<!-- 组件说明 -->
<template>
    <el-carousel class="banner-carousel" type="card" :interval="4000" height="200px">
        <el-carousel-item v-for="item in banners" :key="item.targetId">
            <a class="banner-carousel__item" :href="item.url">
                <img :src="item.imageUrl" alt="轮播" />
            </a>
        </el-carousel-item>
    </el-carousel>
</template>

<script>
import { getBanner } from "@/api";

export default {
    components: {},
    data() {
        return {
            banners: [
                {
                    imageUrl:
                        "http://p1.music.126.net/sFKQL3mBS746WXORGksW5w==/109951165272555133.jpg",
                    targetId: 1,
                    targetType: 3000,
                    titleColor: "blue",
                    typeTitle: "数字专辑",
                    url:
                        "https://music.163.com/store/newalbum/detail?id=93262839"
                },
                {
                    imageUrl:
                        "http://p1.music.126.net/Vx5E1mynvP9l2msVqf7cLQ==/109951165272597730.jpg",
                    targetId: 2,
                    targetType: 3000,
                    titleColor: "blue",
                    typeTitle: "数字专辑",
                    url:
                        "https://music.163.com/store/newalbum/detail?id=93262839"
                },
                {
                    imageUrl:
                        "http://p1.music.126.net/DBtj1eYmMC3k0MZrJcndsg==/109951165272566925.jpg",
                    targetId: 3,
                    targetType: 3000,
                    titleColor: "blue",
                    typeTitle: "数字专辑",
                    url:
                        "https://music.163.com/store/newalbum/detail?id=93262839"
                }
            ]
        };
    },
    computed: {},
    mounted() {
        // this.init();
    },
    methods: {
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