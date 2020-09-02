/*
 * @desc:
 * @Author: 余光
 * @Email: webbj97@163.com
 * @Date: 2020-09-01 11:26:15
 */

export { debounce, throttle } from 'lodash-es'

/**
 * 数字补0
 *
 * @export
 * @param {Number} num 传入的数字
 * @param {Number} n 补0后的长度，默认=2
 * @returns num
 */
export function pad(num, n = 2) {
    let len = num.toString().length; // 获取数字的位数
    while (len++ < n) {
        num = '0' + num;
    }
    return num;
}

export function formatTime(interval) {
    interval = interval | 0;
    const minute = pad((interval / 60) | 0);
    const second = pad(interval % 60);
    return `${minute}:${second}`;
}

export function isDef(v) {
    return v !== undefined && v !== null;
}