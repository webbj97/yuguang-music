<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-11 15:40:39
-->
<template>
    <div class="mvs">
        <div class="mvs__tabs">
            <p class="line">
                <span class="title">地区：</span>
                <span
                    v-for="(tab,index) in areaTabs"
                    :key="index"
                    class="tab"
                    :class="{'current': tab.value === areaCurrent}"
                    @click="handleTab('area', tab.value)"
                >{{tab.name}}</span>
            </p>
            <p class="line">
                <span class="title">版本：</span>
                <span
                    v-for="(tab,index) in typeTabs"
                    :key="index"
                    class="tab"
                    :class="{'current': tab.value === typeCurrent}"
                    @click="handleTab('type', tab.value)"
                >{{tab.name}}</span>
            </p>
            <p class="line">
                <span class="title">排序：</span>
                <span
                    v-for="(tab,index) in orderTabs"
                    :key="index"
                    class="tab"
                    :class="{'current': tab.value === orderCurrent}"
                    @click="handleTab('order', tab.value)"
                >{{tab.name}}</span>
            </p>
        </div>
        <ul class="mvs__list" ref="mvlist">
            <li class="mv-item" v-for="mv in mvs" :key="mv.id">
                <MvCard
                    :author="mv.artistName"
                    :duration="mv.duration"
                    :id="mv.id"
                    :imgCover="mv.cover"
                    :name="mv.name"
                    :playCount="mv.playCount"
                />
            </li>
        </ul>
        <div class="mvs__pags">
            <Pagination
                :current-page.sync="currentPage"
                :page-size="pageSize"
                :total="total"
                @current-change="onPageChange"
                class="pagination"
            />
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MvCard from "@/components/mv-card";
import { scrollInto } from "@/utils";

const PAGE_SIZE = 24;

export default {
    components: { MvCard },
    data() {
        return {
            mvs: [],
            areaTabs: [
                { name: "全部", value: "全部" },
                { name: "内地", value: "内地" },
                { name: "港台", value: "港台" },
                { name: "欧美", value: "欧美" },
                { name: "日本", value: "日本" },
                { name: "韩国", value: "韩国" }
            ],
            typeTabs: [
                { name: "全部", value: "全部" },
                { name: "官方版", value: "官方版" },
                { name: "原生", value: "原生" },
                { name: "现场版", value: "现场版" },
                { name: "网易出品", value: "网易出品" }
            ],
            orderTabs: [
                { name: "全部", value: "全部" },
                { name: "上升最快", value: "上升最快" },
                { name: "最热", value: "最热" },
                { name: "最新", value: "最新" }
            ],
            areaCurrent: "全部",
            typeCurrent: "全部",
            orderCurrent: "全部",
            pageSize: PAGE_SIZE,
            currentPage: 1,
            total: 0
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions("mv", ["getMvs"]),
        async init() {
            const {
                areaCurrent,
                typeCurrent,
                orderCurrent,
                pageSize,
                currentPage
            } = this;
            const params = {
                area: areaCurrent,
                type: typeCurrent,
                order: orderCurrent,
                limit: pageSize || 12,
                offset: (currentPage - 1) * pageSize
            };
            const { data, count } = await this.getMvs(params);

            this.mvs = data;
            this.total = count || this.total;
        },
        // 分类
        handleTab(type, value) {
            console.log("type:", type, value);
            switch (type) {
                case "area":
                    this.areaCurrent = value;
                    this.init();
                    break;
                case "type":
                    this.typeCurrent = value;
                    this.init();
                    break;
                case "order":
                    this.orderCurrent = value;
                    this.init();
                    break;
                default:
                    return;
            }
        },
        // 分页
        async onPageChange() {
            await this.init();
            this.$nextTick(() => {
                scrollInto(this.$refs.mvlist);
            });
        }
    }
};
</script>

<style lang='scss' scoped>
.mvs {
    height: 100%;
    &__tabs {
        padding: 20px;
        font-size: 14px;
        .line {
            color: var(--font-color-white);
            line-height: 40px;
        }
        .title {
            width: 100px;
            font-weight: 500;
        }
        .tab {
            display: inline-block;
            margin-left: 10px;
            width: 84px;
            height: 34px;
            text-align: center;
            line-height: 34px;
            border-radius: 18px;
            cursor: pointer;
            &.current {
                color: $music-color;
            }
        }
    }
    &__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 20px;
        min-height: 400px;
        margin: 0 -12px;
        .mv-item {
            margin-bottom: 35px;
            width: 25%;
            padding: 0 12px;
        }
    }
    &__pags{
        line-height: 40px;
    }
}
</style>