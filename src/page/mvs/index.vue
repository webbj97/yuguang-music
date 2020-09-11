<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-08 15:47:59
-->
!<!-- 组件说明 -->
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
                <span class="title">地区：</span>
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
        <ul class="mvs__list">
            <li class="mv-item" v-for="mv in mvs" :key="mv.artistId">
                <MvCard :data="mv"/>
            </li>
        </ul>
        <div class="mvs__pags">分页</div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MvCard from "@/components/mv-card";
import { Loading } from "element-ui";

export default {
    components: { MvCard },
    data() {
        return {
            mvs: [
                {
                    artistId: 1074052,
                    artistName: "ROMEO",
                    id: 5469073,
                    artists: [
                        {
                            id: 1074052,
                            name: "ROMEO"
                        }
                    ],
                    transNames: ["로미오"],
                    briefDesc: null,
                    cover:
                        "http://p1.music.126.net/AW31RhAos_SJ_PHJl34Efw==/19212866183795417.jpg",
                    desc: null,
                    duration: 189000,
                    mark: 0,
                    name: "니가 없는데 (WITHOUT U) KBS音乐银行 17/03/24 现场版",
                    playCount: 3311,
                    subed: false
                },
                {
                    artistId: 1074059,
                    artistName: "ROMEO",
                    id: 5469073,
                    artists: [
                        {
                            id: 1074052,
                            name: "ROMEO"
                        }
                    ],
                    transNames: ["로미오"],
                    briefDesc: null,
                    cover:
                        "http://p1.music.126.net/AW31RhAos_SJ_PHJl34Efw==/19212866183795417.jpg",
                    desc: null,
                    duration: 189000,
                    mark: 0,
                    name: "니가 없는데 (WITHOUT U) KBS音乐银行 17/03/24 现场版",
                    playCount: 3311,
                    subed: false
                },
                {
                    artistId: 1074050,
                    artistName: "ROMEO",
                    id: 5469073,
                    artists: [
                        {
                            id: 1074052,
                            name: "ROMEO"
                        }
                    ],
                    transNames: ["로미오"],
                    briefDesc: null,
                    cover:
                        "http://p1.music.126.net/AW31RhAos_SJ_PHJl34Efw==/19212866183795417.jpg",
                    desc: null,
                    duration: 189000,
                    mark: 0,
                    name: "니가 없는데 (WITHOUT U) KBS音乐银行 17/03/24 现场版",
                    playCount: 3311,
                    subed: false
                },
                {
                    artistId: 1074053,
                    artistName: "ROMEO",
                    id: 5469073,
                    artists: [
                        {
                            id: 1074052,
                            name: "ROMEO"
                        }
                    ],
                    transNames: ["로미오"],
                    briefDesc: null,
                    cover:
                        "http://p1.music.126.net/AW31RhAos_SJ_PHJl34Efw==/19212866183795417.jpg",
                    desc: null,
                    duration: 189000,
                    mark: 0,
                    name: "니가 없는데 (WITHOUT U) KBS音乐银行 17/03/24 现场版",
                    playCount: 3311,
                    subed: false
                }
            ],
            areaTabs: [
                { name: "全部", value: "" },
                { name: "内地", value: "内地" },
                { name: "港台", value: "港台" },
                { name: "欧美", value: "欧美" },
                { name: "日本", value: "日本" },
                { name: "韩国", value: "韩国" }
            ],
            typeTabs: [
                { name: "全部", value: "" },
                { name: "官方版", value: "官方版" },
                { name: "原生", value: "原生" },
                { name: "现场版", value: "现场版" },
                { name: "网易出品", value: "网易出品" }
            ],
            orderTabs: [
                { name: "全部", value: "" },
                { name: "上升最快", value: "上升最快" },
                { name: "最热", value: "最热" },
                { name: "最新", value: "最新" }
            ],
            areaCurrent: "",
            typeCurrent: "",
            orderCurrent: ""
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.init();
    },
    methods: {
        ...mapActions("mv", ["getMvs"]),
        async init() {
            const loadingInstance = Loading.service({
                target: ".mvs__list",
                text: "加载中"
            });
            const { areaCurrent, typeCurrent, orderCurrent } = this;
            const params = {
                area: areaCurrent,
                type: typeCurrent,
                order: orderCurrent,
                limit: 1
            };
            const mvs = await this.getMvs(params);
            // this.mvs = mvs;
            console.log("mvs:", mvs[0]);
            loadingInstance.close();
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
    }
};
</script>

<style lang='scss' scoped>
.mvs {
    border: 1px solid red;
    &__tabs {
        padding: 20px;
        font-size: 16px;
        border: 1px solid black;
        .line {
            line-height: 40px;
        }
        .title {
            width: 100px;
            font-weight: 500;
        }
        .tab {
            display: inline-block;
            margin-left: 20px;
            width: 90px;
            height: 36px;
            border: 1px solid #ddd;
            text-align: center;
            line-height: 36px;
            border-radius: 18px;
            cursor: pointer;
            &.current {
                background: $theme-color;
                color: #fff;
                border: 0;
            }
        }
    }
    &__list {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        padding: 20px;
        min-height: 400px;
        .mv-item {
            width: 25%;
            padding: 0 12px;
        }
    }
}
</style>