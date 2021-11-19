const { a } = require('./export');

setTimeout(() => {
    console.log('来自commonjs', a);
}, 500);