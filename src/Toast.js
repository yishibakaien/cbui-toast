'use strict';

var utils = require('./utils.js');
var getDiv = require('./dom.js');
var TYPES = require('./TYPES.js');
var animate = require('./animate.js');

// 打包的时候发现 webpack 压缩不支持 ES6 语法....
var Type = utils.Type;
var getType = utils.getType;
var shift = utils.shift;
var objFilter = utils.objFilter;
var objAssign = utils.objAssign;
var bind = utils.bind;
var unbind = utils.unbind;
var hide = utils.hide;

function Toast() {
    // 获取单例 div 保证全局只有一个 toast
    this.div = getDiv();
    // toast 计时控制器
    this.timer = null;
}

/**
 * 根据 TYPES 的定义类型 在 Toast 原型上挂载相应的方法，
 * 目前有 loading success info error
 * @param  {[type]} key  TYPES 的 key
 * @param  {[type]} val  TYPES[key] 一些定义的属性与默认值
 */
objFilter(TYPES, function(key, val) {
    Toast.prototype[key] = function() {
        this.type = val;
        this._init.apply(this, arguments);
    };
});

// 初始化 toast (根据传入的参数最终生成统一的 options(配置项))
Toast.prototype._init = function() {
    // 设置默认值
    var options = {
            text: this.type.defaultText,
            duration: this.type.defaultDuration
        },
        // 第一个参数
        content = shift(arguments),
        args;
    // 第一个参数类型的判断
    switch (true) {
        case Type.isObject(content):
            options = objAssign(options, content);
            break;
        case Type.isString(content):
            options.text = content;
            break;
        case Type.isNumber(content):
            options.duration = content;
            break;
        case Type.isFunction(content):
            options.complete = content;
            break;
        default:
            break;
    }

    // 此时的 arguments 为弹出了第一项后剩余的内容
    args = shift(arguments);
    if (Type.isFunction(args)) {
        // 第二个参数为方法时
        options.complete = args;
    }
    if (Type.isObject(args)) {
        // 第二个参数是个对象时
        options = objAssign(options, args);
    }
    if (Type.isString(content) && Type.isNumber(args)) {
        // 第一个参数是字符串， 第二个参数是数字
        options.duration = args;
    }
    this._generate(options);
};

/**
 * 根据配置参数生成 toast
 * @param  {[type]} options 配置参数
 */
Toast.prototype._generate = function(options) {  
    // 清除 timer 保证当前 toast 正常显示
    clearTimeout(this.timer);
    // 如果 options 中有 duration 表明这种 toast 是显示一段时间后自动隐藏的类型
    if (options.duration) {
        // 如果有 duration 配置    
        this.timer = setTimeout(function() {
            this.hide();
            // 如果有回调函数
            Type.isFunction(options.complete) && options.complete.call(this);
        }.bind(this), Number(options.duration));
    }
    // 第一个子元素为 icon 小图标
    this.div.childNodes[0].className = this.type.className;
    // 第二个子元素为文本
    this.div.childNodes[1].innerHTML = options.text;
    this._show();
};

/**
 * 内部使用方法 显示 toast
 */
Toast.prototype._show = function() {
    // 这里的 this.div 是一个单例，本质上是内存的引用，
    // 所以始终页面都只有一个插入的 div.
    document.body.appendChild(this.div);
    animate(this.div).scaleIn();
};

/**
 * 显示 toast 
 * @param  {Function} cb 回调函数
 */
Toast.prototype.hide = function(cb) {
    animate(this.div).scaleOut();
    Type.isFunction(cb) && cb.call(this);
};

module.exports = new Toast();
