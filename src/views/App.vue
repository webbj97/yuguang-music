<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-07-31 18:25:25
-->
<template>
    <div id="app">
        <!-- 主内容 -->
        <Layout />
        <!-- 播放器 -->
        <BottomPlayer />
        <!-- 播放列表 -->
        <PlayList />
        <!-- 音乐播放 -->
        <MusicPlayer/>
    </div>
</template>

<script>
import Layout from "@/layout";
import BottomPlayer from "@/components/bottom-player";
import PlayList from "@/components/playlist";
import MusicPlayer from "@/components/music-player";

export default {
    name: "App",
    components: { Layout, BottomPlayer, PlayList,MusicPlayer  }
};
</script>

<style>
#app {
    height: 100%;
    min-width: 1000px;
    background-color: var(--body-bgcolor);
}
</style>
