<template>
    <div @click="onClick" class="horizontal-card">
        <slot name="img-wrap">
            <div class="img-wrap">
                <img v-lazy="getImgUrl(img, 50)" />
                <slot name="img-mask"></slot>
            </div>
        </slot>
        <div class="content">
            <div class="name">{{ name }}</div>
            <div class="desc">
                <slot name="desc">{{ desc }}</slot>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
import { getImgUrl } from "@/utils";

export default {
    name: "Card",
    props: ["img", "name", "desc"],
    methods: {
        getImgUrl,
        onClick(e) {
            this.$emit("click", e);
        }
    }
};
</script>

<style lang="scss" scoped>
.horizontal-card {
    display: flex;
    padding: 0 4px;
    cursor: pointer;

    &:hover {
        background: var(--light-bgcolor);
    }

    .img-wrap {
        position: relative;
        @include img-wrap(50px);

        img {
            border-radius: 4px;
        }
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-left: 8px;
        overflow: hidden;

        .name {
            margin-bottom: 4px;
            font-size: $font-size-medium-sm;
            @include ellipsis();
        }

        .desc {
            font-size: $font-size-sm;
            color: var(--font-color-grey-shallow);
            @include ellipsis();
        }
    }
}
</style>
