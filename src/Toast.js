// import getSingle from './getSingle.js';

var utils = require('./utils.js');
var getDiv = require('./dom.js');
var TYPES = require('./TYPES.js');

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
    this.div = getDiv();
}

/**
 * 根据 TYPES 的定义类型 在 Toast 原型上挂载相应的方法
 * @param  {[type]} key  TYPES 的 key 值
 * @param  {[type]} val  TYPES[key]
 */
objFilter(TYPES, function(key, val) {
    Toast.prototype[key] = function() {
        this.type = val;
        this._init.apply(this, arguments);
    }
});

// 初始化 toast 
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
        options.complete = args;
    }
    if (Type.isObject(args)) {
        options = objAssign(options, args);
    }
    this._generate(options);
};

/**
 * 根据配置参数生成 toast
 * @param  {[type]} options 配置参数
 */
Toast.prototype._generate = function(options) {
    // 如果有持续时长
    if (options.duration) {
        clearTimeout(this.timer);
        this.timer = setTimeout(function() {
            this.hide();
            // 如果有回调函数
            Type.isFunction(options.complete) && options.complete.call(this);
        }.bind(this), Number(options.duration));
    }
    this.div.childNodes[0].className = this.type.className;
    // console.log(this.div.childNodes);
    this.div.childNodes[1].innerHTML = options.text;
    this._show();
};

/**
 * 内部使用方法 显示 toast
 */
Toast.prototype._show = function() {
    document.body.appendChild(this.div);
    this.div.style.display = 'block';
    unbind('animation webkitAnimationEnd', this.div, hide);
    this.div.classList.remove('scale-out');
    this.div.classList.add('scale-in');
};

/**
 * 显示 toast 
 * @param  {Function} cb 回调函数
 */
Toast.prototype.hide = function(cb) {
    this.div.classList.remove('scale-in');
    this.div.classList.add('scale-out');
    bind('animationEnd webkitAnimationEnd', this.div, hide);
    Type.isFunction(cb) && cb.call(this);
};

module.exports = new Toast();
