<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-14 15:00:06
-->
!<!-- 组件说明 -->
<template>
    <div class="comment">
        <div class="img-wrap">
            <img v-lazy="imgCover" alt="头像" />
        </div>
        <div class="content">
            <div class="line line-top">
                <span class="name">{{ nickName }}:&nbsp;</span>
                {{ content }}
            </div>
            <div class="line line-bottom">
                <span class="date">{{ formatDate(comment.time) }}</span>
                <div>
                    <Icon :size="10" type="zan" />
                    {{ comment.likedCount }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate } from "@/utils";
//import x from ''
export default {
    name: "Comment",
    props: {
        comment: {
            type: Object,
            default: () => {}
        }
    },
    components: {},
    data() {
        return {};
    },
    computed: {
        imgCover() {
            const { user } = this.comment;
            return user.avatarUrl ? user.avatarUrl : "";
        },
        content() {
            const { content } = this.comment;
            return content;
        },
        nickName() {
            const { user } = this.comment;
            return user.nickname ? user.nickname : "";
        }
    },
    mounted() {},
    methods: {
        formatDate
    }
};
</script>

<style lang='scss' scoped>
.comment {
    display: flex;
    .img-wrap {
        margin-right: 8px;
        @include img-wrap(40px);
        img {
            border-radius: 50%;
        }
    }
    .content {
        display: flex;
        flex-direction: column;
        width: 100%;
        .line {
            line-height: 22px;
        }
        .name {
            color: $blue;
        }
        .line-top{
            color: var(--font-color-white);
        }
        .line-bottom {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 12px;
            color: var(--font-color-grey);
        }
    }
}
</style>