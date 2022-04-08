import Vue from 'vue';
import Notification from './notify';

const install = function() {
    Vue.prototype.$notify = Notification;
}

if (typeof window !== 'undefined' && window.Vue) {
    console.log('哈哈哈:', );
    install(window.Vue);
}

export default {
    install
}