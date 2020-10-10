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

/**
 * 切换时间展示方式
 *
 * @export:
 * @param {number} interval 传入秒
 * @return {type} 返回 xx:xx 格式
 */
export function formatTime(interval) {
    interval = interval | 0;
    const minute = pad((interval / 60) | 0);
    const second = pad(interval % 60);
    return `${minute}:${second}`;
}

export function isDef(v) {
    return v !== undefined && v !== null;
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}
/**
 * 时间格式化处理
 * @export:
 * @param {String} date
 * @return {type}
 */
export function formatDate(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
    date = date instanceof Date ? date : new Date(date)
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(
            RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length)
        )
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(
                RegExp.$1,
                RegExp.$1.length === 1 ? str : padLeftZero(str)
            )
        }
    }
    return fmt
}

export function requestFullScreen(element) {
    const docElm = element;
    if (docElm.requestFullscreen) {
      docElm.requestFullscreen();
    } else if (docElm.msRequestFullscreen) {
      docElm.msRequestFullscreen();
    } else if (docElm.mozRequestFullScreen) {
      docElm.mozRequestFullScreen();
    } else if (docElm.webkitRequestFullScreen) {
      docElm.webkitRequestFullScreen();
    }
  }

export function exitFullscreen() {
    const de = window.parent.document;

    if (de.exitFullscreen) {
        de.exitFullscreen();
    } else if (de.mozCancelFullScreen) {
        de.mozCancelFullScreen();
    } else if (de.webkitCancelFullScreen) {
        de.webkitCancelFullScreen();
    } else if (de.msExitFullscreen) {
        de.msExitFullscreen()
    }
}

export function isFullscreen() {
    return document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen
}

/**
 * 单位处理
 * @export:
 * @param {Number} count
 * @return {string} 单位处理
 */
export function countUnit(count) {
    const countStr = count.toString();
    const len = countStr.length;
    return len > 5 ? countStr.slice(0, len - 5) + '万' : countStr;
}

export function getImgUrl(url, w, h) {
    h = h ? h : w;
    url = url += `?param=${w}y${h}`;
    return url;
}

export function getPageOffset(page, limit) {
    return (page - 1) * limit
}