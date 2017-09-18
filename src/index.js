
var Toast = require('widget/toast/toast');
var Tip = require('widget/tip/Tip');

var tip = new Tip();
var toast = new Toast();

function cb() {}

cb.prototype.toast = toast;
cb.prototype.tip = tip;
module.exports = new cb();