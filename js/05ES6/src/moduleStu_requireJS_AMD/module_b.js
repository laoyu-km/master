define('moduleB', ['moduleA'], function(moduleA) {
    var b = [8, 9, 10, 15];

    return {
        b: moduleA.a.concat(b)
    }
})