<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-27 11:24:28
-->
<!-- 组件说明 -->
<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="progress-bar__inner">
            <div class="progress-old" ref="progressOld"></div>
            <div class="progress-btn-track" ref="progressBtn">
                <div class="progress-btn" ref="progressBtn"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { prefixStyle, toCurrentRem } from "@utils";

const transform = prefixStyle("transform");

export default {
    name: "progressBar",
    props: {
        disabled: {
            type: Boolean,
            default: false
        },
        percent: {
            type: Number,
            default: 0
        }
    },
    components: {},
    data() {
        return {
            touch: {}
        };
    },
    computed: {},
    watch: {
        percent(val) {
            this.setProgressOffset(val);
        }
    },
    mounted() {
        if (this.percent > 0) {
            this.setProgressOffset(this.percent);
        }
    },
    methods: {
        progressClick(e) {
            const { pageX } = e;
            if (!this.disabled) {
                const rect = this.$refs.progressBar.getBoundingClientRect(); // 元素的大小及其相对于视口的位
                // pageX: e相对于整个文档x水平坐标
                const offsetWidth = Math.max(
                    0,
                    Math.min(
                        pageX - rect.left,
                        this.$refs.progressBar.clientWidth
                    )
                );
                // // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
                this.changeLength(offsetWidth);
                this.emitPercent();
            }
        },
        // 进度条方法
        changeLength(offsetWidth) {
            const offsetRem = toCurrentRem(offsetWidth);
            this.$refs.progressOld.style.width = `${offsetRem}`;
            this.$refs.progressBtn.style[
                transform
            ] = `translate3d(${offsetRem},0,0)`;
        },
        // 触发更新
        emitPercent() {
            this.$emit("percentChange", this.getPercent());
        },
        // 获取百分比
        getPercent() {
            const barWidth = this.$refs.progressBar.clientWidth;
            return this.$refs.progressOld.clientWidth / barWidth;
        },
        // 设置进度条
        setProgressOffset(percent) {
            if (percent >= 0 && !this.touch.initiated) {
                const barWidth = this.$refs.progressBar.clientWidth;
                const offsetWidth = percent * barWidth;
                this.changeLength(offsetWidth);
            }
        }
    }
};
</script>

<style lang='scss' scoped>
.progress-bar {
    height: 30px;
    cursor: pointer;

    &__inner {
        position: relative;
        top: 14px;
        height: 2px;
        background: var(--progress-bgcolor);

        .progress-old {
            position: absolute;
            height: 100%;
            background: $theme-color;
        }

        .progress-btn-track {
            position: absolute;
            left: -15px;
            top: -13px;
            width: 30px;
            height: 30px;

            .progress-btn {
                display: none;
                position: relative;
                top: 8px;
                left: 9px;
                box-sizing: border-box;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                background: $theme-color;

                &.show {
                    display: block;
                }
            }
        }
    }

    &:hover {
        .progress-btn {
            display: block !important;
        }
    }
}
</style>