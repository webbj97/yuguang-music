<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 11:36:37
-->
<!-- 组件说明 -->
<template>
    <div class="discover">
        <Banner />
        <PlayList />
        <NewSongs />
        <PlayMv />
    </div>
</template>

<script>
import Banner from "./banner";
import PlayList from "./play-list";
import NewSongs from "./new-songs";
import PlayMv from "./play-mv";

export default {
    components: { Banner, PlayList, NewSongs, PlayMv },
    data() {
        return {
            mvList: [
                {
                    alg: "featured",
                    artistId: 1094010,
                    artistName: "摩登兄弟刘宇宁",
                    artists: [{ id: 1094010, name: "摩登兄弟刘宇宁" }],
                    canDislike: false,
                    copywriter:
                        "编辑推荐：如果今生无法被彼此成全 那来生一定还要与彼此相见",
                    duration: 121000,
                    id: 10954402,
                    name: "断缘诀",
                    picUrl:
                        "https://p1.music.126.net/mBVLuaPbq2eVTG3pnwUHQQ==/109951165265738325.jpg",
                    playCount: 23960,
                    subed: false,
                    trackNumberUpdateTime: null,
                    type: 5
                },
                {
                    alg: "featured",
                    artistId: 1094010,
                    artistName: "摩登兄弟刘宇宁",
                    artists: [{ id: 1094010, name: "摩登兄弟刘宇宁" }],
                    canDislike: false,
                    copywriter:
                        "编辑推荐：如果今生无法被彼此成全 那来生一定还要与彼此相见",
                    duration: 121000,
                    id: 10954402,
                    name: "断缘诀",
                    picUrl:
                        "https://p1.music.126.net/mBVLuaPbq2eVTG3pnwUHQQ==/109951165265738325.jpg",
                    playCount: 23960,
                    subed: false,
                    trackNumberUpdateTime: null,
                    type: 5
                },
                {
                    alg: "featured",
                    artistId: 1094010,
                    artistName: "摩登兄弟刘宇宁",
                    artists: [{ id: 1094010, name: "摩登兄弟刘宇宁" }],
                    canDislike: false,
                    copywriter:
                        "编辑推荐：如果今生无法被彼此成全 那来生一定还要与彼此相见",
                    duration: 121000,
                    id: 10954402,
                    name: "断缘诀",
                    picUrl:
                        "https://p1.music.126.net/mBVLuaPbq2eVTG3pnwUHQQ==/109951165265738325.jpg",
                    playCount: 23960,
                    subed: false,
                    trackNumberUpdateTime: null,
                    type: 5
                }
            ]
        };
    },
    computed: {},
    methods: {},
    mounted() {}
};
</script>

<style lang='scss' scoped>
.discover {
    padding: 25px 32px;
}
</style>