<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-11 18:04:07
-->
<template>
    <div class="video-player" ref="player"></div>
</template>

<script type="text/ecmascript-6">
import Player from "xgplayer";
import { toRem } from "@/utils";

export default {
    name: "VideoPlayer",
    props: ["url"],
    data() {
        return {
            player: ""
        };
    },
    watch: {
        url(url, oldUrl) {
            if (url && url !== oldUrl) {
                if (!this.player) {
                    this.initPlayer();
                } else {
                    this.player.src = url;
                    this.player.reload();
                }
            }
        }
    },
    mounted() {
        // this.initPlayer();
        // this.transferRem();
    },
    methods: {
        initPlayer() {
            console.log('this.url:', this.url);
            if (!this.url) return;
            this.player = new Player({
                el: this.$refs.player,
                url: this.url,
                videoInit: true, // 显示配置项首帧
                lang: "zh-cn",
                width: "100%",
            });
        },
        transferRem() {
            this.player.on("ready", () => {
                const videoWrapper = this.$refs.player;
                const height = videoWrapper.style.height;
                const remHeight = toRem(Number(height.replace("px", "")));
                videoWrapper.style.height = remHeight;
            });
        }
    }
};
</script>

<style>
.xgplayer-error {
    display: none;
}
</style>