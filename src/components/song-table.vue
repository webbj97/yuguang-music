<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-02 18:45:04
-->
!<!-- 组件说明 -->
<template>
    <div class="song-table">
        <el-table
            :data="songs"
            style="width: 100%"
            :stripe="stripe"
            @row-click="handleRowClick"
            :show-header="hasLabel"
            empty-text="1"
        >
            <el-table-column
                type="index"
                :index="indexMethod"
            ></el-table-column>
            <el-table-column v-if="hasImg" label="封面">
                <template slot-scope="scope">
                    <img
                        style="width: 70px"
                        v-lazy="getImgUrl(scope.row.img, 70)"
                    />
                </template>
            </el-table-column>
            <el-table-column label="标题">
                <template slot-scope="scope">
                    <span class="song-table-name">{{ scope.row.name }}</span>
                </template>
            </el-table-column>
            <el-table-column prop="artistsText" label="作者"></el-table-column>
            <el-table-column prop="albumName" label="专辑"></el-table-column>
            <el-table-column prop="durationStr" label="时长"></el-table-column>
        </el-table>
        <slot slot="empty"></slot>
    </div>
</template>

<script>
import { formatTime, pad, getImgUrl } from "@/utils";
import { mapActions } from "vuex";

export default {
    props: {
        songs: {
            type: Array,
            default: () => [],
        },
        stripe: {
            type: Boolean,
            default: true,
        },
        hasLabel: {
            type: Boolean,
            default: true,
        },
        hasImg: {
            type: Boolean,
            default: false,
        },
    },
    components: {},
    data() {
        return {};
    },
    watch: {},
    mounted() {},
    methods: {
        ...mapActions("music", ["startSong", "setPlayList"]),
        formatTime,
        getImgUrl,
        handleRowClick(row) {
            this.startSong(row);
            this.setPlayList(this.songs);
        },
        //处理index
        indexMethod(index) {
            return pad(index + 1);
        },
    },
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
    .song-table-name{
        color: var(--font-color-white);
    }
}
</style>