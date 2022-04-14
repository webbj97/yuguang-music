const path = require("path");
const isProd = process.env.NODE_ENV === "production";

function resolve(targetPath) {
    return path.resolve(__dirname, targetPath);
}

module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                "@": resolve("src"),
                "@utils": resolve("src/utils"),
                "@services": resolve("src/services"),
                "@constants": resolve("src/constants"),
                "@api": resolve("src/api"),
            },
        },
    },
    chainWebpack: (config) => {
        config.module.rule("ts").use("ts-loader");
        config.plugin("fork-ts-checker");

        // config.rule('ts')
        // config.rule('ts').use('ts-loader')
        // config.rule('ts').use('babel-loader') (当配合 @vue/cli-plugin-babel 使用时)
        // config.rule('ts').use('cache-loader')
        // config.plugin('fork-ts-checker')
    },
    css: {
        loaderOptions: {
            sass: {
                data: `
            @import "~@/style/variables.scss";
            @import "~@/style/mixin.scss";
        `,
            },
        },
    },
    publicPath: isProd ? "/yuguang-music/" : "/",
};
