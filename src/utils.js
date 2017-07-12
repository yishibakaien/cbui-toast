/**
 * 给元素添加样式
 * @param  {element} ele    DOM对象
 * @param  {[type]} options CSS样式对象
 */
function css(ele, options) {
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            ele.style[key] = options[key];
        }
    }
}

/**
 * 获取单例
 * @param  {Function} fn [传入的方法]
 */
function getSingle(fn) {
    var ret;
    return function() {
        return ret || (ret = fn.apply(this, arguments));
    };
}

/**
 * 装饰函数，在方法尾部插入执行方法
 * @param  {[type]} targetFn [description]
 * @param  {[type]} afterFn  [description]
 * @return {[type]}          [description]
 */
function after(targetFn, afterFn) {
    return function() {
        var ret = targetFn.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    };
}
/**
 * 弹出操作
 * @param  {args}        类数组(参数数组)
 * @return {[type]}      弹出第一个参数          
 */
function shift(args) {
    return Array.prototype.shift.call(args);
}
/**
 * 对象类型判断，不支持NaN
 * @example
 * Type.isArray([1, 2, 3]) // true 
 * Type.isObject([1, 2, 3]) // false
 */
var Type = (function() {
    var obj = {};
    for (var i = 0, type; type = ['String', 'Object', 'Array', 'Number', 'Function', 'Undefined', 'Null'][i++];) {
        (function(type) {
            obj['is' + type] = function(target) {
                return Object.prototype.toString.call(target) === '[object ' + type + ']';
            }
        })(type);
    }
    return obj;
})();

module.exports = {
    css,
    getSingle,
    after,
    Type,
    shift
};

// var Decoretor = {
//     after: function(targetFn, afterFn) {
//         var _this = this;
//         return function() {
//             var ret = _this.apply(this, arguments);
//             fn.apply(this, arguments);
//             return ret;
//         }
//     }
// };
// export default Decoretor
 
