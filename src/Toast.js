// import getSingle from './getSingle.js';
var { Type, shift, objFilter, objAssign, bind, unbind, hide } = require('./utils.js');
var getDiv = require('./dom.js');

// 类型、默认状态、属性定义
var TYPES = {
    loading: {
        className: 'loading',
        defaultText: '请稍后..'
    },
    info: {
        className: 'info',
        defaultText: '警告',
        defaultDuration: 2000
    },
    success: {
        className: 'success',
        defaultText: '已完成',
        defaultDuration: 800
    },
    error: {
        className: 'error',
        defaultText: '出现错误',
        defaultDuration: 2000
    }
};

function Toast() {
    this.div = getDiv();
}

objFilter(TYPES, function(key, val) {
    Toast.prototype[key] = function() {
        this.type = val;
        this._init.apply(this, arguments);
        this._show();
    }
});

// 初始化toast
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
    if (Type.isObject(content)) {
        // 如果第一个参数是对象 options = content
        options = objAssign(options, content);
    }
    if (Type.isString(content)) {
        // 如果第一个参数是字符串或数字
        options.text = content;
    }
    if (Type.isNumber(content)) {
        options.duration = content;
    }

    // 此时的 arguments 为弹出了第一项后剩余的内容
    args = shift(arguments);
    if (Type.isFunction(args)) {
        options.complete = args;
    }
    if (Type.isObject(args)) {
        options = objAssign(options, args);
    }
    // console.log('处理后的参数', options);
    this._generate(options);
};

Toast.prototype._generate = function(options) {
    // console.log('开始执行', options);
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
    console.log(this.div.childNodes);
    this.div.childNodes[1].innerHTML = options.text;
};

Toast.prototype._show = function() {
    document.body.appendChild(this.div);
    this.div.style.display = 'block';
    unbind('animation webkitAnimationEnd', this.div, hide);
    this.div.classList.remove('scale-out');
    this.div.classList.add('scale-in');
};

Toast.prototype.hide = function(cb) {
    this.div.classList.remove('scale-in');
    this.div.classList.add('scale-out');
    bind('animationEnd webkitAnimationEnd', this.div, hide);
    Type.isFunction(cb) && cb.call(this);
};

module.exports = new Toast();