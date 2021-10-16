Array.prototype.myReduce = function(callback, iniValue) {
    if (typeof(callback) !== 'function') {
        throw new Error('must a function');
    }

    let _this = this,
        _len = _this.length,
        item;

    for (var i = 0; i < _len; i++) {
        item = _this[i];
        iniValue = callback(iniValue, item, i, _this);
    }

    return iniValue;
}

Function.prototype.myBind = function(tarObj) {
    if (typeof(this) !== 'function') {
        throw new Error('this not a function');
    }

    let _this = this,
        _args = Array.prototype.slice(arguments, 1),
        _newFun = function() {},
        fBound = function() {
            return _this.apply(this instanceof _newFun ? this : tarObj, _args.concat(Array.prototype.slice.call(arguments)));
        }

    if (this.prototype) {
        _newFun.prototype = this.prototype;
    }

    fBound.prototype = new _newFun();

    return fBound;
}

const tabRepalce = function(tpl, replaceObj) {
    return tpl.replace(/\{\{(.*?)\}\}/g, (node, index) => {
        return replaceObj[index.trim()];
    });

}

export default { tabRepalce };