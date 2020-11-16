<!-- 组件说明 -->
<template>
    <div class="rank">
        <div v-if="officialList.length" class="rank-groups">
            <YgTitle>官方榜</YgTitle>
            <div class="rank-wrap">
                <PlayListCard
                    class="play-list-card"
                    v-for="item in officialList"
                    :key="item.id"
                    :data="item"
                />
            </div>
        </div>
        <div v-if="globalList.length" class="rank-groups">
            <YgTitle>全球榜</YgTitle>
            <div class="rank-wrap">
                <PlayListCard
                    class="play-list-card"
                    v-for="item in globalList"
                    :key="item.id"
                    :data="item"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { getRankList } from "@/api";
import PlayListCard from "@/components/play-list-card";
export default {
    components: { PlayListCard },
    data() {
        return {
            officialList: [],
            globalList: [],
        };
    },
    computed: {
        listEmpty() {
            const { officialList, globalList } = this;
            return officialList.length + globalList.length;
        },
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            const { list } = await getRankList();
            const officialList = list.slice(0, 5);
            const globalList = list.slice(5);
            this.officialList = officialList.map((item) =>
                this.createData(item)
            );
            this.globalList = globalList.map((item) => this.createData(item));
        },
        createData(data) {
            const { coverImgUrl, description, name, id } = data;

            return {
                id,
                type: 0,
                name,
                copywriter: description,
                picUrl: coverImgUrl,
            };
        },
    },
};
</script>

<style lang='scss' scoped>
.rank {
    min-height: 100%;
    padding: 0 15px;
    .rank-groups {
        display: flex;
        flex-direction: column;
    }
    .rank-wrap {
        display: flex;
        flex-wrap: wrap;
        .play-list-card{
            margin-right: 10px;
        }
    }
}
</style>