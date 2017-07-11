// import getSingle from './getSingle.js';

var getDiv = require('./dom.js');

var TYPES = {
    loading: {
        className: 'loading',
        defaultText: '请稍后..'
    },
    info: {
        className: 'info',
        defaultText: '警告'
    },
    success: {
        className: 'success',
        defaultText: '已完成'
    },
    error: {
        className: 'error',
        defaultText: '出现错误'
    }
};

function Toast() {
    this.div = getDiv();
}

for (var key in TYPES) {
    if (!TYPES.hasOwnProperty(key)) {
        continue;
    }
    Toast.prototype[key] = function() {
        this.type = TYPES[key];
        this._init.apply(this, arguments);
        this._show();
    }
}

Toast.prototype._init = function() {                             
    var text = Array.prototype.shift.call(arguments);
    this.div.className = this.type.className;
    this.div.innerHTML = text || this.type.defaultText;
};

Toast.prototype._show = function() {
    document.body.appendChild(this.div);
    this.div.style.display = 'block';
};

function after(targets, fn) {
    var _this = this;
    return function() {
        var ret = _this.apply(this, arguments);
        fn.apply(this, arguments);
        return ret;
    }
}

Toast.prototype.hide = function() {
    this.div.style.display = 'none';
};

module.exports = new Toast();