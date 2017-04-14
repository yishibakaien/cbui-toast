// create by cloud_cb on 2017/04/14.

'use strict';
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
    this.style.innerText = '._blackTip_{z-index:100;position:fixed;min-width:25%;max-width:60%;background:rgba(7,17,27,.8);color:#fff;padding:16px;font-size:14px;top:30%;left:50%;border-radius:5px;line-height:18px;text-align:center;word-break:break-all;-moz-transform:translateZ(0) translateX(-50%) translateY(-50%);-webkit-transform:translateZ(0) translateX(-50%) translateY(-50%);transform:translateZ(0) translateX(-50%) translateY(-50%)}._blackTip_ .icon{display:inline-block;height:40px;line-height:40px;width:40px;margin:10px 10px 16px 10px;text-align:center;border-radius:50%;font-size:30px;color:rgba(7,17,27,.8);background-color:#fff;background-repeat:no-repeat;background-position:center;background-size:cover}._blackTip_ .icon.loading{background-color:transparent;-webkit-animation:loading 1s steps(12,end) infinite;animation:loading 1s steps(12,end) infinite;background:transparent url(data:image/svg+xml;base64,PHN2ZyBjbGFzcz0iciIgd2lkdGg9JzEyMHB4JyBoZWlnaHQ9JzEyMHB4JyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMTAwIj4KICAgIDxyZWN0IHg9IjAiIHk9IjAiIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJub25lIiBjbGFzcz0iYmsiPjwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjRTlFOUU5JwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoMCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICA8L3JlY3Q+CiAgICA8cmVjdCB4PSc0Ni41JyB5PSc0MCcgd2lkdGg9JzcnIGhlaWdodD0nMjAnIHJ4PSc1JyByeT0nNScgZmlsbD0nIzk4OTY5NycKICAgICAgICAgIHRyYW5zZm9ybT0ncm90YXRlKDMwIDUwIDUwKSB0cmFuc2xhdGUoMCAtMzApJz4KICAgICAgICAgICAgICAgICByZXBlYXRDb3VudD0naW5kZWZpbml0ZScvPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyM5Qjk5OUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSg2MCA1MCA1MCkgdHJhbnNsYXRlKDAgLTMwKSc+CiAgICAgICAgICAgICAgICAgcmVwZWF0Q291bnQ9J2luZGVmaW5pdGUnLz4KICAgIDwvcmVjdD4KICAgIDxyZWN0IHg9JzQ2LjUnIHk9JzQwJyB3aWR0aD0nNycgaGVpZ2h0PScyMCcgcng9JzUnIHJ5PSc1JyBmaWxsPScjQTNBMUEyJwogICAgICAgICAgdHJhbnNmb3JtPSdyb3RhdGUoOTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNBQkE5QUEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxMjAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCMkIyQjInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxNTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNCQUI4QjknCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgxODAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDMkMwQzEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyMTAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNDQkNCQ0InCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEMkQyRDInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgyNzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNEQURBREEnCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMDAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0PgogICAgPHJlY3QgeD0nNDYuNScgeT0nNDAnIHdpZHRoPSc3JyBoZWlnaHQ9JzIwJyByeD0nNScgcnk9JzUnIGZpbGw9JyNFMkUyRTInCiAgICAgICAgICB0cmFuc2Zvcm09J3JvdGF0ZSgzMzAgNTAgNTApIHRyYW5zbGF0ZSgwIC0zMCknPgogICAgPC9yZWN0Pgo8L3N2Zz4=);background-size:cover;background-position:center;background-repeat:no-repeat}@keyframes loading{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}@-webkit-keyframes loading{0%{-webkit-transform:rotate(0)}100%{-webkit-transform:rotate(360deg)}}';
    document.head.appendChild(this.style);
}

module.exports = function(obj) {
    return new BlackTip(obj);
}