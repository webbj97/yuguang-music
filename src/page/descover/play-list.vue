<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-27 16:45:27
-->
!<!-- 组件说明 -->
<template>
    <div class="play-list">
        <YgTitle>推荐歌单</YgTitle>
        <div class="play-list__content">
            <PlayListCard v-for="item in playlist" :key="item.id" :data="item" />
        </div>
    </div>
</template>

<script>
import { getPersonalized } from "@/api";
import PlayListCard from "@/components/play-list-card";

export default {
    components: { PlayListCard },
    data() {
        return {
            playlist: [
                {
                    id: 36283027,
                    name: "俄罗斯乐队大赏丨后朋*冷潮*盯鞋*梦泡",
                    copywriter: "编辑推荐：人声干净~像西伯利亚上空飞舞的极光~",
                    picUrl:
                        "https://p2.music.126.net/ZNHnZpGqNlDOqa-eIuG7Tg==/109951165223595808.jpg"
                },
                {
                    id: 5057787332,
                    type: 0,
                    name: "愿你能站在自己所热爱的世界里闪闪发光",
                    copywriter:
                        "编辑推荐：躲起来的星星也在努力发光 你也要加油。",
                    picUrl:
                        "https://p2.music.126.net/gxtNomeOrRgyGIpr8zylqg==/109951165051986661.jpg"
                },
                {
                    id: 4866322076,
                    type: 0,
                    name: "打野BGM［游戏专用］",
                    copywriter: "热门推荐",
                    picUrl:
                        "https://p2.music.126.net/f5wqbyYyGeimv20LyX9MzA==/109951165267752276.jpg"
                },
                {
                    id: 3238059152,
                    type: 0,
                    name: "“你说我们怎么就这么潦草的结束了呢.”",
                    copywriter: "热门推荐",
                    picUrl:
                        "https://p2.music.126.net/E2H0uEUtCk6xJ_Ff3wlCWA==/109951165185258081.jpg"
                },
                {
                    id: 4958935613,
                    type: 0,
                    name: "把备注改回全名是有多失望",
                    copywriter: "热门推荐",
                    picUrl:
                        "https://p2.music.126.net/IoebTCedSqaRVF9OKlRkUA==/109951165096914476.jpg"
                },
                {
                    id: 2829733864,
                    type: 0,
                    name: "[睡眠伴侣] 送你一颗失眠特效药 ",
                    copywriter: "热门推荐",
                    picUrl:
                        "https://p2.music.126.net/k26JFo1JHVSWVlW6CjYB_g==/109951164884269823.jpg"
                },
                {
                    id: 5070534134,
                    type: 0,
                    name: "【微丧翻唱】可以每天循环好多好多遍的歌.",
                    copywriter: "热门推荐",
                    picUrl:
                        "https://p2.music.126.net/HHjTCH2zpxoNO1bEnfg2Cw==/109951165194061634.jpg"
                },
                {
                    id: 3030750016,
                    type: 0,
                    name: "谁都像你但不是你",
                    copywriter: "热门推荐",
                    picUrl:
                        "https://p2.music.126.net/wprI26RYumxUxPmt7y5gPw==/109951164996019253.jpg"
                },
                {
                    id: 5026471288,
                    type: 0,
                    name: "爱是会消失的对吗？",
                    copywriter: "热门推荐",
                    picUrl:
                        "https://p2.music.126.net/OP3pdko0dp6sh6T2X_5ruw==/109951165090068862.jpg"
                },
                {
                    id: 2891313765,
                    type: 0,
                    name: "丧丧丧//沉默是最大的哭声我希望你能懂",
                    copywriter: "热门推荐",
                    picUrl:
                        "https://p2.music.126.net/0CqmyIQ7-pFoohrSvHWolw==/109951164271725693.jpg"
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
            const { result } = await getPersonalized({ limit: 10 });
            // this.playlist = result;
            console.log("result:", result);
        }
    }
};
</script>

<style lang='scss' scoped>
.play-list{
    margin-top: 30px;
    &__content{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
}
</style>