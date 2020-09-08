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
                <span class="create">{{createTime}}创建</span>
            </div>
            <div class="details">
                标签：
                <span href="javascript:void(0)" v-for="tag in playlist.tags" :key="tag">{{tag}}</span>
            </div>
            <div class="details">
                <span class="details__title">歌曲数：</span>
                {{playlist.trackCount}}
                <span class="details__title">播放量：</span>
                {{playlist.playCount}}
            </div>
            <div class="details">
                <span>简介：</span>
                <p class="details__desc">{{playlist.description}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { formatDate } from "@/utils";

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
        formatDate
    }
};
</script>

<style lang='scss' scoped>
.data-details-header {
    display: flex;
    justify-content: space-between;
    img {
        width: 100%;
    }
    .img-wrap {
        @include img-wrap(160px);
        margin-right: 20px;
    }
    .info {
        &__name {
            display: flex;
            align-items: center;
            .type {
                padding: 2px 6px;
                border: 1px solid $music-color;
                color: $music-color;
                border-radius: 4px;
                font-size: 14px;
            }
            .name {
                font-size: 24px;
                font-weight: 500;
            }
        }
        &__creator {
            display: flex;
            align-items: center;
            font-size: 18px;
            .avatar {
                width: 32px;
                height: 32px;
                border-radius: 50%;
                margin-right: 5px;
            }
            .nickname{
                color: blue;
            }
            .create{
                color: #ccc;
            }
        }
    }
    .details {
        color: rgb(112, 109, 109);
        font-size: 14px;
        &__title {
            color: #ccc;
        }
        &__desc {
            @include ellipsis-more(2);
        }
    }
}
</style>