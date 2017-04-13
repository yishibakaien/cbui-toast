'use strict';

/**
 * 黑色提示
 * @param {[type]} config 配置项
 */
function BlackTip(config) {
    this.defaults = {
        text: '', // 提示的内容
        type: 'default', // default、success、info、loading
        time: 2100, // 提示的延迟时间，单位毫秒，默认：2100
        mask: false, // 是否显示透明蒙层，防止触摸穿透，默认：false
        complete: function() {} // 提示完成后执行的函数
    }
    this._init(config);
}

/**
 * 初始化BlackTip
 * @param  {[type]} config 配置项
 * @return {[type]}        [description]
 */
BlackTip.prototype._init = function(config) {
    if (typeof config !== 'object') {
        return;
    }
    for (var key in config) {
        // 过滤掉原型链上的属性
        if (!config.hasOwnProperty(key)) {
            continue;
        }
        console.log(this.defaults);
        this.defaults[key] = config[key];
    }
    if (!document.getElementById('__blackTip__')) {
        this.blackTip = document.createElement('div');
        this.icon = document.createElement('div');
        this.text = document.createElement('p');
        this.blackTip.id = '__blackTip__';
        this.icon.className = '_icon_';
        this.text.className = '_text_';

        switch (this.defaults.type) {
            case 'default':
                this.icon.style.display = 'none';
                break;
            case 'info':
                this.icon.innerText = '!';
                break;
            case 'success':
                this.icon.innerText = '√';
                break;
            case 'loading':
                this.icon.className += ' loading';
                break;
            default:
                this.icon.style.display = 'none';
                break;
        }

        if (!!this.defaults.text) {
            this.text.innerText = this.defaults.text;
        }
        this.blackTip.appendChild(this.icon);
        this.blackTip.appendChild(this.text);
        document.body.appendChild(this.blackTip);
    }
}

module.exports = function(config) {
    return new BlackTip(config);
}