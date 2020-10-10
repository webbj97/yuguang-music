!<!-- 组件说明 -->
<template>
    <div class="comments">
        <div class="list" v-if="hasHotComments">
            <p class="title">热门评论</p>
            <Comment
                class="list__comment"
                :comment="comment"
                :key="comment.id"
                v-for="(comment, index) in hotComments"
            />
        </div>
        <div class="list" v-if="hasComments">
            <p class="title" ref="commentTitle">
                最新评论
                <span class="total">({{ total }})</span>
            </p>
            <Comment
                class="list__comment"
                :comment="comment"
                :key="comment.id"
                v-for="(comment, index) in comments"
            />
        </div>
        <Pagination
            :current-page.sync="currentPage"
            :page-size="pageSize"
            :total="total"
            @current-change="onPageChange"
            class="pagination"
        />
        <PageDefault v-if="!hasHotComments && !hotComments" message="暂无评论～" />
    </div>
</template>

<script>
import {
    getMvComment,
    getHotComment,
    getSongComment,
    getPlaylistComment
} from "@/api";
import { getPageOffset, scrollInto } from "@/utils";
import Comment from "@/components/comment";

const SONG_TYPE = "song"; // 歌曲
const PLAYLIST_TYPE = "playlist"; // 专辑
const MV_TYPE = "mv"; // 视频

const PAGE_SIZE = 20;

export default {
    props: ["id", "type"],
    components: { Comment },
    data() {
        return {
            hotComments: [],
            comments: [],
            pageSize: PAGE_SIZE,
            currentPage: 1,
            total: 0
        };
    },
    computed: {
        hasHotComments() {
            const { hotComments, currentPage } = this;
            return hotComments.length > 0 && currentPage === 1;
        },
        hasComments() {
            const { comments } = this;
            return comments.length > 0;
        }
    },
    watch: {
        id: {
            handler(newId) {
                if (newId) {
                    this.currentPage = 1;
                    this.init();
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        async init() {
            const { type, id, pageSize, currentPage } = this;
            const commentRequestMap = {
                [PLAYLIST_TYPE]: getPlaylistComment,
                [SONG_TYPE]: getSongComment,
                [MV_TYPE]: getMvComment
            };
            const commentRequest = commentRequestMap[type];
            const {
                hotComments = [],
                comments = [],
                total
            } = await commentRequest({
                id,
                pageSize,
                offset: getPageOffset(currentPage, pageSize)
            }).finally(() => {
                this.loading = false;
            });

            // 歌单的热评需要单独请求接口获取
            if (this.type === PLAYLIST_TYPE && this.currentPage === 1) {
                const {
                    hotComments: exactHotComments = []
                } = await getHotComment({
                    id,
                    type: 2 // 歌单type
                });
                this.hotComments = exactHotComments;
            } else {
                this.hotComments = hotComments;
            }

            this.comments = comments;
            this.total = total;
            // this.total = 100;
            // this.$emit("update", { comments, hotComments, total });
        },
        async onPageChange(e) {
            await this.init();
            this.$nextTick(() => {
                scrollInto(this.$refs.commentTitle);
            });
        }
    }
};
</script>

<style lang='scss' scoped>
.comments {
    .title {
        font-size: $font-size-lg;
        font-weight: $font-weight-bold;
        margin: 20px 0;

        .total {
            font-size: $font-size;
            color: $gray;
        }
    }
    .list {
        // margin-top: 40px;
        &__comment {
            margin-bottom: 30px;
        }
        &:nth-child(1){
            margin-bottom: 50px;
        }
    }
}
</style>