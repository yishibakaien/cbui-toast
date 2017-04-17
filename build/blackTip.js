(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["blackTip"] = factory();
	else
		root["blackTip"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// create by cloud_cb on 2017/04/14.


// require('./css.css');
var TIP_ID = '_blackTip_';
var STATE_HIDE = 0;
var STATE_SHOW = 1;

var id = 0;

function _getId() {
    return ++id;
}
function BlackTip(config) {
    this.defaults = {
        text: '',
        type: 'default',
        time: 1500,
        mask: false,
        zIndex: 999,
        complete: null
    };
    this.timer = null;
    this._init(config);
}

BlackTip.prototype._init = function(config) {
    this.eleId = _getId();
    
    if (typeof config !== 'object') {
        return;
    }

    for (var key in config) {
        if (!config.hasOwnProperty(key)) {
            continue;
        }
        this.defaults[key] = config[key];
    }

    if (!document.getElementById(TIP_ID + 'style')) {
        // this.
        this._insertStyle();
    }


    this._createDom();

    this.timer = setTimeout(function() {
        this.hide();
        if (typeof this.defaults.complete === 'function') {
            this.defaults.complete();
        }
    }.bind(this), this.defaults.time);
}

BlackTip.prototype.set = function() {

    switch (this.defaults.type) {
        case 'default':
            this.icon.style.display = 'none';
            break;
        case 'info':
            this.icon.innerText = '!';
            break;
        case 'success':
            this.icon.innerText = '√';
            break;
        case 'loading':
            this.icon.className += ' loading';
            break;
        default:
            this.icon.style.display = 'none';
            break;
    }
    if (!!this.defaults.text) {
        this.text.innerText = this.defaults.text;
    } else {
        this.text.display = 'none';
    }
    this.show();
}

BlackTip.prototype.show = function() {
    this.state = STATE_SHOW;
    document.body.appendChild(this.blackTip);
}

BlackTip.prototype.hide = function() {
    this.blackTip.style.display = 'none';
    this.state = STATE_HIDE;
}

BlackTip.prototype.remove = function() {

    document.body.removeChild(this.blackTip);

    console.log(window[TIP_ID + this.eleId])
    try {
        delete window[TIP_ID + this.eleId];
    } catch (e) {

    }
    console.info(window[TIP_ID + this.eleId])
    this.timer = null;
    clearTimeout(this.timer);
}

BlackTip.prototype._createDom = function() {

    this.blackTip = window[TIP_ID + this.eleId] = document.createElement('div', TIP_ID + this.eleId);
    this.state = STATE_SHOW;

    this.blackTip.className = TIP_ID;

    this.icon = document.createElement('div');
    this.icon.className = 'icon';

    this.text = document.createElement('p');
    this.text.className = 'text';

    this.blackTip.appendChild(this.icon);
    this.blackTip.appendChild(this.text);

    this.set();
}

BlackTip.prototype._insertStyle = function() {
    this.style = document.createElement('style');
    this.style.id = TIP_ID + 'style';
    this.style.innerText = '._blackTip_{margin:0;padding:0;line-height:1.6;position:fixed;z-index:5000;width:7.6em;min-height:7.6em;top:180px;left:50%;margin-left:-3.8em;background:rgba(17,17,17,.7);text-align:center;border-radius:5px;color:#fff;word-break:break-all}._blackTip_ .icon{display:inline-block;height:40px;line-height:40px;width:40px;margin-bottom:8px;margin-top:28px;font-size:30px;border-radius:50%;color:rgba(7,17,27,.8);background-color:#fff;background-repeat:no-repeat}._blackTip_ .icon.loading{margin:30px 0 0;width:38px;height:38px;vertical-align:baseline;-webkit-animation:blackTipLoading 1s steps(12,end) infinite;animation:blackTipLoading 1s steps(12,end) infinite;background:transparent url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=);background-repeat:no-repeat;background-size:100%}._blackTip_ .text{margin:0;padding:0}@keyframes blackTipLoading{0%{transform:rotate3d(0,0,1,0deg)}100%{transform:rotate3d(0,0,1,360deg)}}@-webkit-keyframes blackTipLoading{0%{-webkit-transform:rotate3d(0,0,1,0deg)}100%{-webkit-transform:rotate3d(0,0,1,360deg)}}';
    document.head.appendChild(this.style);
}

module.exports = function(obj) {
    return new BlackTip(obj);
}

/***/ })
/******/ ]);
});