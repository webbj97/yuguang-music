!<!-- 组件说明 -->
<template>
    <div class="play-mv">
        <YgTitle>内容标题3</YgTitle>
        <div class="play-mv__content">
            <PlayMvCard v-for="item in playMv" :key="item.id" :data="item" />
        </div>
    </div>
</template>

<script>
import PlayMvCard from "@/components/play-mv-card";
import { getPersonalizedMv } from "@/api";
export default {
    name: "PlatMv",
    components: { PlayMvCard },
    data() {
        return {
            playMv: [
                {
                    artistId: 36576587,
                    artistName: "邓婕",
                    artists: [
                        { id: 36576587, name: "邓婕" },
                        { id: 29863806, name: "L+R(王璐)" }
                    ],
                    canDislike: false,
                    copywriter: "编辑推荐：电影《活着唱着》推广曲",
                    id: 11155075,
                    name: "观景",
                    picUrl:
                        "https://p2.music.126.net/qr5UWBPqwtTPBciQ0S6TOA==/109951165274058909.jpg",
                    playCount: 1995,
                    subed: false,
                    trackNumberUpdateTime: null,
                    type: 5
                },
                {
                    alg: "featured",
                    artistId: 8089,
                    artistName: "洪佩瑜",
                    artists: [{ id: 8089, name: "洪佩瑜" }],
                    canDislike: false,
                    copywriter:
                        "编辑推荐：这是一个慎重告别的过程 眼见珍视化为灰",
                    duration: 252000,
                    id: 10955094,
                    name: "千寻未知 (from 王小苗诗集《邪恶的纯真》pp. 86-91.)",
                    picUrl:
                        "https://p2.music.126.net/ja629cUBaea4hXIXP746VQ==/109951165274200732.jpg",
                    playCount: 1744,
                    subed: false,
                    trackNumberUpdateTime: null,
                    type: 5
                },
                {
                    artistId: 36576517,
                    artistName: "邓婕",
                    artists: [
                        { id: 36576587, name: "邓婕" },
                        { id: 29863806, name: "L+R(王璐)" }
                    ],
                    canDislike: false,
                    copywriter: "编辑推荐：电影《活着唱着》推广曲",
                    id: 10955075,
                    name: "观景",
                    picUrl:
                        "https://p2.music.126.net/qr5UWBPqwtTPBciQ0S6TOA==/109951165274058909.jpg",
                    playCount: 1995,
                    subed: false,
                    trackNumberUpdateTime: null,
                    type: 5
                },
                {
                    alg: "featured",
                    artistId: 8089,
                    artistName: "洪佩瑜",
                    artists: [{ id: 8089, name: "洪佩瑜" }],
                    canDislike: false,
                    copywriter:
                        "编辑推荐：这是一个慎重告别的过程 眼见珍视化为灰",
                    duration: 252000,
                    id: 11155094,
                    name: "千寻未知 (from 王小苗诗集《邪恶的纯真》pp. 86-91.)",
                    picUrl:
                        "https://p2.music.126.net/ja629cUBaea4hXIXP746VQ==/109951165274200732.jpg",
                    playCount: 1744,
                    subed: false,
                    trackNumberUpdateTime: null,
                    type: 5
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
            const { result } = await getPersonalizedMv();
            this.playMv = result;
        }
    }
};
</script>

<style lang='scss' scoped>
.play-mv {
    margin-top: 30px;
    &__content {
        display: flex;
        justify-content: space-between;
    }
}
</style>