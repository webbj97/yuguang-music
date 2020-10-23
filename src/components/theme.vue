<!--
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-04 16:25:59
-->
<template>
    <div class="theme">
        <el-popover placement="bottom" trigger="hover" width="200">
            <div class="themes">
                <div
                    v-for="(themeValue, themeKey, index) in themeMap"
                    @click="changeTheme(themeKey)"
                    class="theme-item"
                    :key="index"
                >
                    <div :style="themeValue.style" class="theme-icon"></div>
                    <p>{{ themeValue.title }}</p>
                </div>
            </div>
            <Icon class="pifu" type="pifu" slot="reference" />
        </el-popover>
    </div>
</template>

<script>
import storage from "good-storage";
import variables from "@/style/themes/variables";
import variablesWhite from "@/style/themes/variables-white";
import variablesRed from "@/style/themes/variables-red";

const THEME_KEY = "__theme__";
const themes = {
    white: "white",
    dark: "dark",
    red: "red",
};
export default {
    name: "Theme",
    created() {
        this.themeMap = {
            [themes.dark]: {
                title: "深色",
                file: variables,
                style: {
                    backgroundColor: "#202020",
                },
            },
            [themes.white]: {
                title: "浅色",
                file: variablesWhite,
                style: {
                    backgroundColor: "#F6F6F6",
                    border: "1px solid #EBEAEA",
                },
            },
            [themes.red]: {
                title: "红色",
                file: variablesRed,
                style: {
                    backgroundColor: "#D33A31",
                },
            },
        };
        // 默认浅色
        this.changeTheme(storage.get(THEME_KEY, themes.white));
    },
    data() {
        return {
            visible: false,
        };
    },
    methods: {
        changeTheme(themeKey) {
            storage.set(THEME_KEY, themeKey);
            const theme = this.themeMap[themeKey].file;
            Object.keys(theme).forEach((key) => {
                const value = theme[key];
                document.documentElement.style.setProperty(key, value);
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.theme{
    padding: 0 30px;
    .pifu{
        color: var(--font-color-white);
    }
}
.themes {
    justify-content: space-around;
    display: flex;
    align-items: center;
    width: 200px;
    .theme-item {
        flex-direction: column;
        margin: 0 8px;
        cursor: pointer;

        .theme-icon {
            width: 25px;
            height: 25px;
            border-radius: 50%;
            margin-bottom: 4px;
        }
    }
}
</style>
