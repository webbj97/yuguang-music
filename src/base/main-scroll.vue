<!-- 组件说明 -->
<template>
    <div class="main-scroll" id="scroll" ref="scroll">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ScrollBar from "@better-scroll/scroll-bar";
import MouseWheel from "@better-scroll/mouse-wheel";
BScroll.use(ScrollBar);
BScroll.use(MouseWheel);

const defaultOptions = {
    mouseWheel: true,
    scrollY: true,
    scrollbar: true,
    probeType: 3
};

export default {
    name: "MainScroll",
    props: {
        data: {
            default: () => []
        }
    },
    components: {},
    data() {
        return {};
    },
    computed: {},
    watch: {
        data: {
            handler() {
                // 拿到数据后初始化scroll滚动模块 || 重新计算scroll
                this.$nextTick(() => {
                    if (!this.scroller) {
                        this.scroller = new BScroll(
                            this.$refs.scroll,
                            Object.assign({}, defaultOptions, this.options)
                        );
                        this.$emit("init", this.scroller);
                    } else {
                        this.scroller && this.scroller.refresh();
                    }
                });
            },
            immediate: true
        }
    },
    mounted() {},
    methods: {
        // 返回scroll实例
        getScroller() {
            return this.scroller;
        },
        // 刷新
        refresh() {
            this.scroller.refresh();
        }
    }
};
</script>

<style lang='scss' scoped>
.main-scroll {
    position: relative;
    overflow: hidden;
    height: 100%;
}
</style>