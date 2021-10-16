module.exports.test = 'a';

const modB = require('./modB.js');

console.log('modA: ' + modB.test);

module.exports.test = 'aa';