var moduleB = require('./module_b');

var c = (function() {
    return moduleB.b.join('-');
})();

module.exports = {
    c
}