<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-11 15:40:39
-->
!<!-- 组件说明 -->
<template>
    <div class="mv-details">
        <div class="left">
            <div class="title" @click="onMoveMvs"><Icon :size="12" type="houtui" />返回列表</div>

            <div class="player">
                <VideoPlayer class="video" :url="mvPlayInfo.url" ref="video" />
            </div>

            <div class="avatar-wrap">
                <div class="avatar">
                    <img v-lazy="getImgUrl(artist.picUrl, 120)" />
                </div>
                <p class="author">{{ artist.name }}</p>
            </div>

            <div class="video-info">
                <p class="video-info__name">{{ mvDetail.name }}</p>

                <div class="video-info__desc">
                    <span class="date">发布：{{ pubTime }}</span>
                    <span class="count">播放：{{ mvDetail.playCount }}次</span>
                </div>
            </div>

            <div class="comments">
                <Comments :id="id" type="mv" />
            </div>
        </div>

        <div class="right">
            <div class="title">推荐</div>
            <SimiCard
                class="simi-mv"
                v-for="simi in simiMvs"
                :key="simi.id"
                :desc="simi.artistName"
                :name="simi.name"
            >
                <template #img-wrap>
                    <MvCard
                        :duration="simi.duration"
                        :id="simi.id"
                        :imgCover="simi.cover"
                        :playCount="simi.playCount"
                    />
                </template>
            </SimiCard>
        </div>
    </div>
</template>

<script>
import { getMvDetail, getMvUrl, getSimiMv, getArtists } from "@/api";
import MvCard from "@/components/mv-card";
import Comments from "@/components/comments";
import { getImgUrl, formatDate } from "@utils";

export default {
    components: { MvCard, Comments },
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            mvDetail: {},
            mvPlayInfo: "",
            artist: {},
            simiMvs: [
                {
                    alg: "feature",
                    artistId: 7763,
                    artistName: "G.E.M.邓紫棋",
                    briefDesc: null,
                    cover:
                        "http://p4.music.126.net/_oGaRiqzh0eVdPnaoc20RA==/109951165065518584.jpg",
                    desc: null,
                    duration: 281000,
                    id: 10941779,
                    mark: 0,
                    name: "别勉强",
                    playCount: 1590780
                },
                {
                    alg: "feature",
                    artistId: 7761,
                    artistName: "G.E.M.邓紫棋",
                    briefDesc: null,
                    cover:
                        "http://p4.music.126.net/_oGaRiqzh0eVdPnaoc20RA==/109951165065518584.jpg",
                    desc: null,
                    duration: 281000,
                    id: 1094172,
                    mark: 0,
                    name: "别勉强",
                    playCount: 1590780
                }
            ]
        };
    },
    computed: {
        pubTime() {
            const { publishTime } = this.mvDetail;
            return formatDate(publishTime, "yyyy-MM-dd");
        }
    },
    watch: {
        id() {
            this.init();
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        getImgUrl,
        async init() {
            const { id } = this;
            const [
                { data: mvDetail },
                { data: mvPlayInfo },
                { mvs: simiMvs }
            ] = await Promise.all([
                getMvDetail(id),
                getMvUrl(id),
                getSimiMv(id)
            ]);

            const { artist } = await getArtists(mvDetail.artistId);
            this.mvDetail = mvDetail; // 详细信息
            this.mvPlayInfo = mvPlayInfo; // 信息
            this.simiMvs = simiMvs; // 相似

            this.artist = artist;
        },
        onMoveMvs() {
            this.$router.push("/mvs");
        }
    }
};
</script>

<style lang='scss' src='./index.scss'></style>