define(function(require, exports, module) {
    var moduleA = require('./module_a');
    b = [6, 8, 9, 10, 15];

    return {
        b: moduleA.a.concat(b)
    }
})