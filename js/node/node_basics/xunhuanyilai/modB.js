module.exports.test = 'b';

// 只输出已加载部分，还未执行的部分不会输出
const modA = require('./modA.js');

console.log('modB: ' + modA.test);

module.exports.test = 'bb'