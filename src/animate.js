'use strict';

var utils = require('./utils.js');

// 简单的动画效果实现，待完善
function Animate(ele) {
    this.init(ele);
}

Animate.prototype.init = function(ele) {
    this.ele = ele;
    return this;
};

/**
 * 缩放渐显效果
 * @return {[type]} [description]
 */
Animate.prototype.scaleIn = function() {
    this.ele.style.display = 'block';
    utils.unbind('animation webkitAnimationEnd', this.ele, utils.hide);
    this.ele.classList.remove('scale-out');
    this.ele.classList.add('scale-in');
    return this;
};
/**
 * 缩放渐隐效果
 * @return {[type]} [description]
 */
Animate.prototype.scaleOut = function() {
    this.ele.classList.remove('scale-in');
    this.ele.classList.add('scale-out');
    utils.bind('animation webkitAnimationEnd', this.ele, utils.hide);
    return this;
};

module.exports = function(ele) {
    return new Animate(ele);
};
