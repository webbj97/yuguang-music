!<!-- 组件说明 -->
<template>
    <div class="data-details-header">
        <div class="img-wrap">
            <img v-lazy="playlist.coverImgUrl" alt="歌单" />
        </div>
        <div class="info">
            <div class="info__name">
                <span class="type">歌单</span>
                <span class="name">{{playlist.name}}</span>
            </div>
            <div class="info__creator">
                <img class="avatar" v-lazy="creator.avatarUrl" alt="头像" />
                <span class="nickname">{{creator.nickname}}</span>
                <span>{{createTime}}创建</span>
            </div>
            <div class="details">
                <span class="details__title">标签：</span>
                <span class="details__content" href="javascript:void(0)" v-for="tag in playlist.tags" :key="tag">{{tag}}</span>
            </div>
            <div class="details">
                <span class="details__title">歌曲数：</span>
                <span class="details__content">{{playlist.trackCount}}</span>
                <span class="details__title">播放量：</span>
                <span class="details__content">{{countUnit(playlist.playCount)}}</span>
            </div>
            <div class="details">
                <span class="details__title">简介：</span>
                <p class="details__content">{{playlist.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate, countUnit } from "@/utils";

export default {
    name: "DetailsHeader",
    props: {
        playlist: {
            type: Object,
            default: () => ({})
        }
    },
    components: {},
    data() {
        return {};
    },
    computed: {
        creator() {
            const { creator } = this.playlist;
            return creator;
        },
        createTime() {
            return formatDate(this.playlist.createTime || 0, "yyyy-MM-dd");
        }
    },
    mounted() {},
    methods: {
        formatDate,
        countUnit
    }
};
</script>

<style lang='scss' scoped>
.data-details-header {
    display: flex;
    .img-wrap {
        @include img-wrap(200px);
        margin-right: 20px;
        img {
            border-radius: 4px;
        }
    }
    .info {
        &__name {
            display: flex;
            align-items: center;
            .type {
                margin-right: 10px;
                padding: 2px 6px;
                border: 1px solid $music-color;
                color: $music-color;
                border-radius: 4px;
                font-size: 14px;
            }
            .name {
                font-size: 26px;
                color: var(--font-color-white);
            }
        }
        &__creator {
            display: flex;
            align-items: center;
            margin-top: 15px;
            margin-bottom: 20px;
            .avatar {
                margin-right: 5px;
                width: 28px;
                height: 28px;
                border-radius: 50%;
                color: var(--font-color-white);
            }
            .nickname {
                color: $blue;
                margin-right: 5px;
            }
        }
    }
    .details {
        display: flex;

        font-size: 14px;
        margin-bottom: 10px;
        &__title {
            color: var(--font-color-white);
        }
        &__content {
            margin-right: 15px;
            color: rgb(112, 109, 109);
            @include ellipsis-more(2);
        }
    }
}
</style>