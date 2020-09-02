/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-03 11:14:43
 */

module.exports = {
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
}
