<!-- 组件说明 -->
<template>
    <Transition name="fade"  @after-leave="afterLeave">
        <div class="notify" v-show="visible" :style="positionStyle">
            <div class="notify__content">
                <div class="notify-title">
                    {{ title }}
                </div>
                <div class="notify-desc" v-html="desc" />
            </div>
        </div>
    </Transition>
</template>

<script>
//import x from ''
export default {
    name: "Notify",
    components: {},
    props: {},
    data() {
        return {
            visible: false,
            title: "标题",
            desc: "描述",
            verticalOffset: 0,
            duration: 3000, // 默认关闭时间
            onClose: null, // 回调
            onClick: null,
            timer: null, // 定时
            closed: false, // 默认打开
            beforeClose: null,
            position: 'top',
        };
    },
    computed: {
        positionStyle() {
            return {
                top: `${this.verticalOffset}px`,
            };
        },
        verticalProperty() {
            return /^top/.test(this.position) ? 'top' : 'bottom';
        },
    },
    watch: {
        closed(newVal) {
            if (newVal) {
                this.visible = false;
            }
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        destroyElement() {
            this.$el.parentNode.removeChild(this.$el);
        },
        init() {
            this.timer = setTimeout(() => {
                this.close()
            }, this.duration);
        },
        close() {
            if (this.beforeClose && typeof this.beforeClose === 'function') {
                this.beforeClose(() => {
                    this.closed = true;
                    if (typeof this.onClose === 'function') {
                        this.onClose();
                    }
                });
            } else {
                this.closed = true;
                if (typeof this.onClose === 'function') {
                    this.onClose();
                }
            }
        },

        afterLeave() {
            this.$emit('closed');
            this.destroyElement();
        },
    },
};
</script>

<style lang='scss'>
// 进入过度的开始状态
.fade-enter{
    transform: translateX(100%);
}
// 定义进入过渡生效时的状态，可以被用来定义进入过渡的过程时间，延迟和曲线函数。
.fade-enter-active{
    transform: translateX(0);
}

.fade-enter-active,
.fade-leave-active {
    // transform: translateX(-100%);
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-leave {
    opacity: 1;
    transform: translateX(0);
}
.notify {
    position: fixed;
    top: 10px;
    right: 10px;
    padding: 18px;
    width: 300px;
    height: 90px;
    background: #fff;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    opacity: 1;
    transition: all 0.5s;
    &__content {
        .notify-title {
            margin-bottom: 10px;
            line-height: 20px;
            color: #000;
            font-weight: 500;
            font-size: 16px;
        }
    }
}
</style>