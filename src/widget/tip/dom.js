var types = require('js/types').tip;
var getSingle = require('js/utils').getSingle;

function createDOM() {
    var div = document.createElement('div');
    var style = document.createElement('style');
    style.innerHTML = '._blackTip_tip_{position:fixed;margin:auto; top:40%;left:50%;min-width:30%;max-width:90%;line-height:1.6;transform: translate3d(-50%, 0, 0);-webkit-transform: translate3d(-50%, 0, 0);z-index:5000;padding:1em;background:rgba(17,17,17,.7);text-align:center;border-radius:5px;color:#fff;word-break:break-all}';
    div.className = types.tip.className;
    document.head.appendChild(style);
    return div;
}
/**
 * 获取单例，关键性操作，保证全局只有一个 Toast div 与 style 实例
 * 
 * @type {[type]}
 */
var tipDOM = getSingle(createDOM);

module.exports = tipDOM;
// "z-index:121;position:fixed;width:50%;background:#000;color:#fff;padding:1rem;opacity:0.75;font-size:16px;top:50%;left:50%;border-radius:0.5rem;text-align:center;word-break:break-all;-moz-transform:translateZ(0) translateX(-50%) translateY(-50%);-webkit-transform:translateZ(0) translateX(-50%) translateY(-50%);transform:translateZ(0) translateX(-50%) translateY(-50%);";
// 
//  style.innerHTML = '._blackTip_tip_{margin:0;padding:0;transform: translateZ(0) translateX(-50%);-webkit-transform: translateZ(0) translateX(-50%);line-height:1.6;position:fixed;z-index:5000;max-width:80%;min-width:40%;padding:1em;top:180px;left:50%;background:rgba(17,17,17,.7);text-align:center;border-radius:5px;color:#fff;word-break:break-all}@-webkit-keyframes scaleIn{0%{-webkit-transform:scale(.8);opacity:0}100%{-webkit-transform:scale(1);opacity:1}}@-webkit-keyframes scaleOut{0%{-webkit-transform:scale(1);opacity:1}100%{-webkit-transform:scale(.8);opacity:0}}.scale-in{animation:scaleIn .2s forwards;-webkit-animation:scaleIn .2s forwards}.scale-out{animation:scaleOut .2s forwards;-webkit-animation:scaleOut .2s forwards}';