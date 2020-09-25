!<!-- 组件说明 -->
<template>
    <div class="new-songs">
        <YgTitle>最新音乐</YgTitle>
        <div class="new-songs__content">
            <div class="list">
                <PlaySongCard
                    v-for="(item, index) in songLeft"
                    :key="item.id"
                    :data="onInitSong(item)"
                    :order="getOrder(index, type='left')"
                    @click.native="onClickSong(index, type='left')"
                />
            </div>
            <div class="list">
                <PlaySongCard
                    v-for="(item, index) in songRight"
                    :key="item.id"
                    :data="onInitSong(item)"
                    :order="getOrder(index, type='right')"
                    @click.native="onClickSong(index, type='right')"
                />
            </div>
        </div>
    </div>
</template>

<script>
import PlaySongCard from "@/components/play-song-card";
import { mapActions, mapGetters } from "vuex";
import { getNewSongs } from "@/api";
import { pad, createSong } from "@/utils";

export default {
    components: { PlaySongCard },
    data() {
        return {
            newSongs: [
                {
                    alg: "hot_server",
                    canDislike: true,
                    copywriter: null,
                    id: 3473842627,
                    name: "呼吸",
                    picUrl:
                        "http://p1.music.126.net/uSOXG8JxZ3qzYPZUVBTWIg==/109951165268201854.jpg",
                    song: {
                        name: "呼吸",
                        id: 1473842627,
                        position: 0,
                        status: 0,
                        albumSize: 0,
                        artists: [
                            {
                                id: 29785925,
                                img1v1Id: 0,
                                img1v1Url:
                                    "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                                name: "李紫婷"
                            }
                        ]
                    },
                    type: 4
                },
                {
                    alg: "hot_server",
                    canDislike: true,
                    copywriter: null,
                    id: 1473842627,
                    name: "呼吸",
                    picUrl:
                        "http://p1.music.126.net/uSOXG8JxZ3qzYPZUVBTWIg==/109951165268201854.jpg",
                    song: {
                        name: "呼吸",
                        id: 1473842617,
                        position: 0,
                        status: 0,
                        albumSize: 0,
                        artists: [
                            {
                                id: 29785925,
                                img1v1Id: 0,
                                img1v1Url:
                                    "http://p4.music.126.net/6y-UleORITEDbvrOLV0Q8A==/5639395138885805.jpg",
                                name: "李紫婷"
                            }
                        ]
                    },
                    type: 4
                }
            ],
            songLeft: [],
            songRight: []
        };
    },
    computed: {},
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions("music", ["startSong", "setPlayList"]),
        async init() {
            const { result } = await getNewSongs();

            const midIndex = parseInt(result.length / 2);
            this.songLeft = result.slice(0, midIndex);
            this.songRight = result.slice(midIndex);
        },
        onInitSong(item) {
            const {
                id,
                name,
                picUrl,
                song: { artists }
            } = item;

            const artistsText = (artists || [])
                .map(({ name }) => name)
                .join("/");
            return {
                id,
                name,
                picUrl,
                artistsText
            };
        },
        // 添加序号
        getOrder(index, type) {
            const order = type === "right" ? index + 6 : index + 1;
            return String(pad(order));
        },
        nomalizeSong(song) {
            const {
                id,
                name,
                song: {
                    mvid,
                    artists,
                    album: { blurPicUrl },
                    duration
                }
            } = song;
            return createSong({
                id,
                name,
                img: blurPicUrl,
                artists,
                duration,
                mvId: mvid
            });
        },
        // 点击播放音乐
        onClickSong(index, type) {
            const { songLeft, songRight } = this;
            const songList = songLeft
                .concat(songRight)
                .map(item => this.nomalizeSong(item));

            const idx = type === "left" ? index : index + 5;
            const song = songList[idx];

            this.startSong(song);
            this.setPlayList(songList);
        }
    }
};
</script>

<style lang='scss' scoped>
.new-songs {
    margin-top: 30px;
    &__content {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        margin-left: -15px;
        margin-right: -15px;
    }
    .list {
        width: 50%;
        display: flex;
        flex-direction: column;
    }
}
</style>