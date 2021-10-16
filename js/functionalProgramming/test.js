Function.prototype.myBind = function(tarObj) {
    var _this = this;
    var paremeter = Array.prototype.slice.call(arguments, 1);
    var newFn = function() {};
    var bound = function() {
        var newParemeters = paremeter.concat(Array.prototype.slice.call(arguments));
        return _this.apply(this instanceof newFn ? this : tarObj, newParemeters);
    };

    if (this.prototype) {
        newFn.prototype = this.prototype;
    }

    bound.prototype = new newFn();

    return bound;
};


function test(a, b, c) {
    console.log(this);
    return a + b + c;
}

obj = { name: 'jayden', age: 30 };

var resFun = test.myBind(obj);

var t = new resFun('a', 'b');

console.log(t);