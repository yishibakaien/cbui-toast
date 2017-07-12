// import getSingle from './getSingle.js';
var { Type, shift } = require('./utils.js');
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
        defaultDuration: 600
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

for (var key in TYPES) {
    // 过滤掉继承属性
    if (TYPES.hasOwnProperty(key)) {
        Toast.prototype[key] = function() {
            this.type = TYPES[key];
            this._init.apply(this, arguments);
            this._show();
        };
    }
}

// 初始化toast
Toast.prototype._init = function() {
    // console.log('参数', arguments[0],arguments[1]);
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
        options = content;
    }
    if (Type.isString(content) || Type.isNumber(content)) {
        // 如果第一个参数是字符串
        options.text = content;
    }

    // 此时的 arguments 为弹出了第一项后剩余的内容
    args = shift(arguments);
    if (Type.isFunction(args)) {
        options.complete = args;
    }
    if (Type.isObject(args)) {
        console.log('正确判断对象', args);
        for (var key in args) {
            if (args.hasOwnProperty(key)) {
                options[key] = args[key];
            }
        }
        console.log('组装完后的options', options);
    }
    this._generate(options);
};

Toast.prototype._generate = function(options) {
    console.log('开始执行', options);
    if (options.duration && Type.isFunction(options.complete)) {

        options.timer = setTimeout(function() {
            options.complete();
        }, Number(options.duration));
    }
    this.div.className = this.type.className;
    this.div.innerHTML = options.text;
}

Toast.prototype._show = function() {
    document.body.appendChild(this.div);
    this.div.style.display = 'block';
};

Toast.prototype.hide = function() {
    this.div.style.display = 'none';
};

module.exports = new Toast();