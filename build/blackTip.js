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


/**
 * 黑色提示
 * @param {[type]} config 配置项
 */
function BlackTip(config) {
    this.defaults = {
        text: '', // 提示的内容
        type: 'default', // default、success、info、loading
        time: 2100, // 提示的延迟时间，单位毫秒，默认：2100
        mask: false, // 是否显示透明蒙层，防止触摸穿透，默认：false
        complete: function() {} // 提示完成后执行的函数
    }
    this._init(config);
}

/**
 * 初始化BlackTip
 * @param  {[type]} config 配置项
 * @return {[type]}        [description]
 */
BlackTip.prototype._init = function(config) {
    if (typeof config !== 'object') {
        return;
    }
    for (var key in config) {
        // 过滤掉原型链上的属性
        if (!config.hasOwnProperty(key)) {
            continue;
        }
        console.log(this.defaults);
        this.defaults[key] = config[key];
    }
    if (!document.getElementById('__blackTip__')) {
        this.blackTip = document.createElement('div');
        this.icon = document.createElement('div');
        this.text = document.createElement('p');
        this.blackTip.id = '__blackTip__';
        this.icon.className = '_icon_';
        this.text.className = '_text_';

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
        }
        this.blackTip.appendChild(this.icon);
        this.blackTip.appendChild(this.text);
        document.body.appendChild(this.blackTip);


    }

}

module.exports = function(config) {
    return new BlackTip(config);
}

/***/ })
/******/ ]);
});