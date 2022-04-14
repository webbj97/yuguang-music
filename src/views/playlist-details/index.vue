<template>
    <div class="playlist-details" v-if="playlist.id">
        <DetailsHeader :playlist="playlist" ref="header" />
        <SongTable class="song-table-com" v-if="songs.length" :songs="songs" />
    </div>
</template>

<script>
import { getListDetail, getSongDetail } from "@/api";
import { createSong, scrollInto } from "@utils";
import { MAX_LIST_LENGTH } from "@constants";
import DetailsHeader from "./header";
import SongTable from "@/components/song-table";

export default {
    components: { SongTable, DetailsHeader },
    data() {
        return {
            playlist: {},
            songs: [],
        };
    },
    computed: {
        id() {
            return Number(this.$route.params.id);
        },
    },
    watch: {
        id: {
            handler() {
                this.init();
                this.scrollToHeader();
            },
            immediate: true,
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            const { id } = this;
            const res = await getListDetail({ id });
            console.log('res:', res);
            this.playlist = playlist;
            this.fetchSongs(playlist);
        },
        // 获取歌单内歌曲
        async fetchSongs(playlist) {
            const trackIds = playlist.trackIds
                .slice(0, MAX_LIST_LENGTH)
                .map(({ id }) => +id);

            const { songs } = await getSongDetail(trackIds);

            const newSongs = songs.map(({ id, name, al, ar, mv, dt }) =>
                createSong({
                    id,
                    name,
                    artists: ar,
                    duration: dt,
                    mvId: mv,
                    albumName: al.name,
                    img: al.picUrl,
                })
            );
            this.songs = newSongs;
        },
        scrollToHeader() {
            const { header } = this.$refs;
            if (header) {
                scrollInto(header.$el);
            }
        },
    },
};
</script>

<style lang='scss' scoped>
.playlist-details {
    padding: 20px;
    .song-table-com {
        margin-top: 40px;
    }
}
</style>