<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-31 09:42:27
-->
!<!-- 组件说明 -->
<template>
    <div class="new-song-card">
        <div class="new-song-card__container">
            <div class="img">
                <img v-lazy="data.picUrl" alt="音乐" />
                <PlayIcon class="play-icon" />
            </div>
            <div class="order">{{order}}</div>
            <div class="info">
                <p class="info__name">{{data.name}}</p>
                <p class="info__author">{{data.artistsText}}</p>
            </div>
        </div>
    </div>
</template>

<script>
//import x from ''
export default {
    name: "PlaySongCard",
    components: {},
    props: {
        data: {
            type: Object
        },
        order: {
            type: String
        }
    },
    data() {
        return {};
    },
    computed: {},
    mounted() {},
    methods: {}
};
</script>

<style lang='scss' scoped>
.new-song-card {
    padding: 15px;
    &__container {
        display: flex;
        align-items: center;
        .img {
            position: relative;
            margin-right: 20px;
            @include img-wrap(90px);
            img {
                border-radius: 4px;
            }
        }
        .play-icon {
            @include abs-center();
        }
        .info {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            color: var(--font-color-white);
            flex: 1;
            overflow: hidden;
            &__name {
                @include ellipsis();
            }
            &__author {
                @include ellipsis();
                font-size: 12px;
                line-height: 20px;
            }
        }
        .order {
            margin-right: 20px;
            color: #515151;
        }
    }
    &:hover {
        background: var(--light-bgcolor);
        cursor: pointer;
    }
}
</style>