function css(ele, options) {
    for (var key in options) {
        if (options.hasOwnProperty(key)) {
            ele.style[key] = options[key];
        }
    }
}

module.exports = css;