<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-07-31 18:25:25
-->
<template>
    <div id="app">
        <Layout />
        <BottomPlayer />
    </div>
</template>

<script>
import Layout from "@/layout";
import BottomPlayer from "@/components/bottom-player";

export default {
    name: "App",
    components: { Layout, BottomPlayer }
};
</script>

<style>
#app {
    height: 100%;
    min-width: 1000px;
    background-color: var(--body-bgcolor);
}
</style>
