<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-31 09:42:27
-->
<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-30 17:27:34
-->
!<!-- 组件说明 -->
<template>
    <div class="playlist-details" v-if="playlist.id">
        <DetailsHeader :playlist="playlist" ref="header" />
        <SongTable v-if="songs.length" :songs="songs" />
    </div>
</template>

<script>
import { getListDetail, getSongDetail } from "@/api";
import SongTable from "@/components/song-table";
import DetailsHeader from "./header";
import { createSong, scrollInto } from "@/utils";
import { Loading } from "element-ui";

const MAX_LIST_LENGTH = 30;

export default {
    components: { SongTable, DetailsHeader },
    data() {
        return {
            playlist: {
                id: 36283027,
                commentCount: 68,
                coverImgId: 109951165223595800,
                coverImgId_str: "109951165223595808",
                description:
                    "假如不把一个音乐场景的时代背景考虑进去，任何关于场景的讨论都是不中要害的。就像理解Kraftwerk以及酸泡菜运动的时候不得不提科技革新给音乐创作带来的改变；理解the Beatles以及60、70's摇滚乐的时候不得不提越战与美苏冷战等等。↵对于前苏联以及俄联邦、白罗斯、乌克兰、爱沙尼亚等场景，从其中乐队能听到明显的时代痕迹：当代大量乐队保留了70年代末80年代时期的气息：机械、冰冷、科技、未来主义~ 有如前苏联的巨型飞行器与粗野主义的壮观建筑，由内而外散发一种斯拉夫族群的生猛之气。俄联邦、白罗斯等后朋克、自赏场景一直在蓬勃地发展，并且在全球场景中愈发显得独树一帜。↵↵这个独特场景的后朋克与自赏是什么样气质呢？↵从国内乐迷熟知的Motorama到白罗斯的Молчат Дома给这个场景塑造了第一印象，或者说是“整体印象”。前者沿袭80's 著名后朋克乐队Joy Division的风格与主唱Ian的阴郁声线，却又在吉他编写上革新，加入更明亮的jangle pop音色与技巧，忧郁的后朋克也清凉起来。后者在鼓机与合成器里找到了心灵的high点，雀跃的 bassline成为主角；节奏机械，音色复古，器乐氛围带人穿越时空回太空争霸的冷战时代~↵或许由于纬度较高，雪原与针叶林给人的冰凉也影响到俄罗斯的自赏作品。从乌法的 Акульи Слёзы到爱沙尼亚的Picnic，梦幻的氛围元素给人擅用氛围表现的自赏元老slowdive的感官。合成器氛围冰凉、跳跃；吉他噪音轻柔美妙；人声干净，于其中显得空间感十足，像~像西伯利亚上空飞舞的极光~↵在全球音乐场景的漫旅中，独特的泛俄罗斯乐队不断给我的耳域带来新鲜的快感。歌单收录了一些平日听到的乐队代表作品，当然曲目选择有着自己的喜好因素。歌单持续更新，希望你能在泛俄罗斯的乐队中寻找到平日难得的感官，并补充自己的音乐探索。“慢慢走，欣赏啊~”↵↵关键词：斯拉夫丨粗野主义丨野兽派丨建构主义丨前苏联美学↵【Post-Soviet  Underground Scene丨后苏联地下音乐场景】↵收录风格：↵Post-Punk丨后朋克↵Coldwave丨冷潮↵New wave丨新lang潮↵Shoegaze丨自赏/盯鞋↵Dream Pop丨梦幻流行/梦泡↵Indie Pop/Rock丨独立流行/摇滚↵Psychedelic Rock丨迷幻摇滚",
                name: "俄罗斯乐队大赏丨后朋*冷潮*盯鞋*梦泡",
                playCount: 301180,
                privacy: 0,
                shareCount: 151,
                tags: ["另类/独立", "摇滚", "欧美"],
                trackCount: 191,
                userId: 39141174,
                createTime: 1592490688143,
                creator: {
                    avatarUrl:
                        "http://p1.music.126.net/bUeeRJ1kk1I7p5yE3a64EA==/109951165261289393.jpg",
                    experts: { 1: "音乐视频达人", 2: "音乐图文达人" },
                    nickname: "非正常人類研究員",
                    signature:
                        "歌单不接推广，音乐人勿私信。↵分享全球范围内最新上线的Shoegaze|DreamPop| Post Punk | Indie Rock/ Pop | Synthwave|Synthpop等↵↵Blogger and promoter who likes everything from shoegaze to dream pop and jangle pop to twee pop.↵↵Reality is only a term, based on values and well worn principles, whereas the dream goes on forever."
                }
            },
            songs: []
        };
    },
    computed: {
        id() {
            return Number(this.$route.params.id);
        }
    },
    watch: {
        id: {
            handler() {
                this.init();
                this.scrollToHeader();
            },
            immediate: true
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            const { id } = this;
            const { playlist } = await getListDetail({ id });
            this.playlist = playlist;
            this.getSonglist(playlist);
        },
        // 获取歌单内歌曲
        async getSonglist(playlist) {
            const loadingInstance = Loading.service({
                target: ".playlist-details",
                text: "加载中"
            });
            const trackIds = playlist.trackIds.map(({ id }) => id); // 歌曲id数组
            const { songs } = await getSongDetail(
                trackIds.slice(0, MAX_LIST_LENGTH)
            );

            const newSongs = songs.map(({ id, name, al, ar, mv, dt }) =>
                createSong({
                    id,
                    name,
                    artists: ar,
                    duration: dt,
                    mvId: mv,
                    albumName: al.name,
                    img: al.picUrl
                })
            );
            this.songs = newSongs;
            loadingInstance.close();
        },
        scrollToHeader() {
            const { header } = this.$refs;
            if (header) {
                scrollInto(header.$el);
            }
        }
    }
};
</script>

<style lang='scss' scoped>
.playlist-details {
    padding: 20px;
}
</style>