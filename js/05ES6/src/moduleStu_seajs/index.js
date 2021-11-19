seajs.use(['./module_a', './module_b', 'module_c'], function(moduleA, moduleB, moduleC) {
    console.log(moduleA.a);
    console.log(moduleB.b);
    console.log(moduleC.c);
});