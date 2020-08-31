/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-08-04 16:38:35
 */
import {
    Popover,
    Carousel,
    CarouselItem
} from "element-ui"
import VueLazyload from 'vue-lazyload'
const LOAD_IMG = 'https://hlgcdn.oss-cn-hangzhou.aliyuncs.com/hlg-ui/1574069829136/9727212.png'; // 加载中的图片
export default {
    install(Vue) {
        // 全局引入base文件 文件地址、是否遍历文件的子目录、匹配文件的正则
        const requireBaseComponents = require.context(
            '@/base',
            true,
            /[a-z0-9]+\.(jsx?|vue)$/i,
        )
        /**
         * requireBaseComponents 是一个函数
         * keys { Function } - 返回匹配成功模块的名字组成的数组
         */
        requireBaseComponents.keys().forEach(item => {
            const componentConfig = requireBaseComponents(item);
            const name = componentConfig.default.name;
            if (name) {
                Vue.component(name, componentConfig.default || componentConfig);
            }
        });

        Vue.use(Popover)
        Vue.use(Carousel)
        Vue.use(CarouselItem)

        Vue.use(VueLazyload, {
            loading: LOAD_IMG, //加载中图片，一定要有，不然会一直重复加载占位图
            error: LOAD_IMG //加载失败图片
        })
    },
}