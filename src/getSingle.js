function getSingle(fn) {
    var ret;
    return function() {
        return ret || (ret = fn.apply(this, arguments));
    }
}
module.exports = getSingle;