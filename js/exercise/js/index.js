import { Tab } from './tab.js';

let tab = new Tab('my-tab', 'data');

const arr = [1, 2, 3];
let res = arr.myReduce((pre, cur, index, arr) => {
    pre += cur;
    return pre;
}, 10);
console.log(res);

const test = function(a, b) {
    return a * b;
}

const testBind = test.myBind(arr);
let sum = testBind(5, 8);
// let sum = test(5, 8);
console.log(sum);

console.log(new testBind);