/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-07-31 18:25:25
 */
import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import store from "./store";
import UI from "./components"; // 全局组件

import "@/style/index.scss";

import global from "@utils/global"; // 全局配置

Vue.config.productionTip = false;
Vue.use(global);
Vue.use(UI);

(window as any).UI = UI;

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
