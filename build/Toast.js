!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.Toast=e():t.Toast=e()}(this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var o=i[n]={i:n,l:!1,exports:{}};return t[n].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=3)}([function(t,e){function i(t,e){for(var i in e)e.hasOwnProperty(i)&&(t.style[i]=e[i])}function n(t){var e;return function(){return e||(e=t.apply(this,arguments))}}function o(t,e){return function(){var i=t.apply(this,arguments);return e.apply(this,arguments),i}}function r(t,e){for(var i in t)t.hasOwnProperty(i)&&e.call(this,i,t[i])}function s(t){if("[object Object]"!==Object.prototype.toString.call(t))throw new TypeError("请传入对象");for(var e=1;e<arguments.length;e++){var i=arguments[e];if(i)for(var n in i)i.hasOwnProperty(n)&&(t[n]=i[n])}return t}function a(t){return Array.prototype.shift.call(t)}function c(t,e,i){t.split(" ").forEach(function(t){e.addEventListener(t,i)})}function u(t,e,i){t.split(" ").forEach(function(t){e.removeEventListener(t,i)})}function l(){this.style.display="none"}function f(t){return Object.prototype.toString.call(t).split(" ")[1].split("]")[0]}var p=function(){for(var t,e={},i=0;t=["String","Object","Array","Number","Function","Undefined","Null"][i++];)!function(t){e["is"+t]=function(e){return Object.prototype.toString.call(e)==="[object "+t+"]"}}(t);return e}();t.exports={css:i,getSingle:n,after:o,objFilter:r,objAssign:s,Type:p,getType:f,shift:a,bind:c,unbind:u,hide:l}},function(t,e){t.exports={loading:{className:"loading",defaultText:"请稍后.."},info:{className:"info",defaultText:"警告",defaultDuration:1500},success:{className:"success",defaultText:"已完成",defaultDuration:800},error:{className:"error",defaultText:"出现错误",defaultDuration:1500}}},function(t,e,i){function n(){var t=document.createElement("div");return t.className="_blackTip_",t.innerHTML="<div></div><p></p>",t}var o=i(0).getSingle,r=o(n);t.exports=r},function(t,e,i){function n(){this.div=r(),this.timer=null}var o=i(0),r=i(2),s=i(1),a=o.Type,c=(o.getType,o.shift),u=o.objFilter,l=o.objAssign,f=o.bind,p=o.unbind,d=o.hide;u(s,function(t,e){n.prototype[t]=function(){this.type=e,this._init.apply(this,arguments)}}),n.prototype._init=function(){var t,e={text:this.type.defaultText,duration:this.type.defaultDuration},i=c(arguments);switch(!0){case a.isObject(i):e=l(e,i);break;case a.isString(i):e.text=i;break;case a.isNumber(i):e.duration=i;break;case a.isFunction(i):e.complete=i}t=c(arguments),a.isFunction(t)&&(e.complete=t),a.isObject(t)&&(e=l(e,t)),this._generate(e)},n.prototype._generate=function(t){clearTimeout(this.timer),t.duration&&(this.timer=setTimeout(function(){this.hide(),a.isFunction(t.complete)&&t.complete.call(this)}.bind(this),Number(t.duration))),this.div.childNodes[0].className=this.type.className,this.div.childNodes[1].innerHTML=t.text,this._show()},n.prototype._show=function(){document.body.appendChild(this.div),this.div.style.display="block",p("animation webkitAnimationEnd",this.div,d),this.div.classList.remove("scale-out"),this.div.classList.add("scale-in")},n.prototype.hide=function(t){this.div.classList.remove("scale-in"),this.div.classList.add("scale-out"),f("animationEnd webkitAnimationEnd",this.div,d),a.isFunction(t)&&t.call(this)},t.exports=new n}])});