/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 11:14:43
 */
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
            },
        },
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
