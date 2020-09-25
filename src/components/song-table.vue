<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-02 18:45:04
-->
!<!-- 组件说明 -->
<template>
    <div class="song-table">
        <el-table :data="songs" style="width: 100%" @row-click="handleRowClick">
            <el-table-column type="index" :index="indexMethod" width="50"></el-table-column>
            <el-table-column prop="name" label="标题" width="300"></el-table-column>
            <el-table-column prop="artistsText" label="作者"></el-table-column>
            <el-table-column prop="albumName" label="专辑"></el-table-column>
            <el-table-column prop="durationStr" label="时长"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import { formatTime, pad } from "@/utils";
import { mapActions } from "vuex";

export default {
    props: {
        songs: {
            type: Array,
            default: () => []
        }
    },
    components: {},
    data() {
        return {};
    },
    watch: {},
    mounted() {

    },
    methods: {
        ...mapActions("music", ["startSong", "setPlayList", "getLyric"]),
        formatTime,
        handleRowClick(row) {
            this.startSong(row);
            this.setPlayList(this.songs);
            this.getLyric(row.id);
        },
        //处理index
        indexMethod(index) {
            return pad(index + 1);
        }
    }
};
</script>

<style lang='scss' scoped>
.song-table {
    margin-top: 40px;
    cursor: default;
    .song-data {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 5px;
    }
}
</style>