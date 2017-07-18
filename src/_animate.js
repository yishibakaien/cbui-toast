
(function() {
    var animate = function(selector) {
        return new animate.fn.init(selector);
    }
    animate.fn = animate.prototype = {
        selector: '',
        length: 0,
        constructor: animate,
        find: function(selector) {
            var ret = [];
            ret.push(document.getElementById(selector));
            ret = this.pushStack(ret);
            ret.selector = selector;
            return ret;
        },
        pushStack: function(eles) {
            var ret = this.constructor();
            for (var i = 0, len = eles.length; i < len; i++) {
                ret[i] = eles[i]
            }
            ret.length = i;
            ret.prevObject = this;
            ret.context = this.context;
            return ret;
        },
        msg: function() {
            console.log(this);
        }
    }
    var init = animate.fn.init = function(selector) {
        if (!selector) {
            return this;
        }
        if (typeof selector === 'string') {
            return rootAnimate.find(selector);
        } else if (selector.nodeType) {
            this.context = this[0] = selector;
            this.length = 1;
            return this;
        }
    }
    init.prototype = animate.fn;
    var rootAnimate = animate(document);

    module.exports = $ = animate;
})();
