function foo() {
    console.log(0);
}

function bar() {
    console.log(1);
}

function baz() {
    console.log(3);
}

let a = 2;

const obj = {
    a,
    foo,
    bar,
    baz
}
module.exports.obj = obj;