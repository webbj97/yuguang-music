import Vue from 'vue'
import notify from './index.vue';

const instances = [];
let seed = 1;
let zIndex = 100;

const Notification = function(options) {

    const id = `notification_${seed}`;
    const userOnClose = options.onClose;
    options = options || {};
    seed += 1;

    options.onClose = function() {
        Notification.close(id, userOnClose);
    };

    const notifyModel = Vue.extend(notify);
    const instance = new notifyModel({ data: options }); // 创建实例

    // 挂载会在文档之外，所以必须手动Dom操作插入到文档之中
    instance.id = id;
    instance.$mount();
    document.body.appendChild(instance.$el);

    instance.visible = true;
    instance.$el.style.zIndex = zIndex++; // 存在dom渲染问题

    // 计算高度
    let verticalOffset = options.offset || 0;
    instances.forEach(item => {
        verticalOffset += item.$el.offsetHeight + 16
    });
    instance.verticalOffset = verticalOffset;
    // 放入列表，关闭时记得移除
    instances.push(instance);
    return instance;
}

Notification.close = function(id, userOnClose) {
    console.log('被触发了:', );
    let index = -1;
    const len = instances.length;

    // 找到要关闭的实例
    const instance = instances.filter((ins, i) => {
        if (ins.id === id) {
            index = i;
            return true;
        }
        return false;
    })[0];

    if (!instance) return;

    if (typeof userOnClose === 'function') {
        userOnClose.call(instance, instance);
    }
    // 关闭时移除
    instances.splice(index, 1);
    // 仅有一个时，不需要考虑其他组件的位置
    if (len <= 1) return;
    const position = instance.position;
    const removedHeight = instance.$el.offsetHeight;
    for (let i = index; i < len - 1; i += 1) {
        if (instances[i].position === position) {
            // eslint-disable-next-line max-len
            console.log('instances[i]:', instances[i]);
            instances[i].$el.style[instance.verticalProperty] = `${parseInt(instances[i].$el.style[instance.verticalProperty], 10) - removedHeight - 16}px`;
        }
    }
};

export default Notification;