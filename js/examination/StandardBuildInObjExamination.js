// // 1 下式打印出什么
// var arr = [].copyWithin.call(
//     new String([0, 1]),
//     1, 0, 1
// )

// console.log(arr); // 报错


// 2 打印的是什么
var obj = Object.create(null, {
    0: {
        value: 1,
    },
    1: {
        value: 2
    },
    2: {
        value: 3
    },
    length: {
        value: 3
    }
})
const it = [].values.call(obj);
console.log(it.next());
// console.log(it.next());
// console.log(it.next());
// console.log(it.next()); // {value: undefined, done: true} 因为没有length属性
// // 迭代器需要length属性


// //3 下式如何得到 [0:2, 1:2, 2: 2, 3:2, length: 4]
// const arr = [].fill.call({
//     0: 1,
// }, );
// console.log(arr);

// // 答案：
// const arr = [].fill.call({
//         0: 1,
//         length: 4
//     },
//     2, 0
// );
// console.log(arr);

// //4 写一个deepFlat (深度扁平化)
// // 使用stack + pop + push
// var arr = [1, 2, [3, [4, 5], 6], 7, [8, [9, 0]]];

// Array.prototype.deepFlat = function() {
//     var arr = this,
//         stack = [...arr],
//         res = [];
//     while (stack.length) {
//         const popItem = stack.pop();

//         if (Array.isArray(popItem)) {
//             stack.push(...popItem);
//         } else {
//             res.push(popItem);
//         }
//     }

//     return res.reverse;
// }

// console.log(arr.deepFlat());


// // 5 实现Object.is
// Object.isMy = function(x, y) {
//     if (x === y) {
//         return x !== 0 || y !== 0 || 1 / x === 1 / y;
//     }

//     return x !== x && y !== y;
// }


// // 6 下式打印什么
// var arr = Array.from(
//     new String([1, 2, 3]),
//     function(item) {
//         return Number(item) ? item : '0';
//     }
// )
// console.log(arr); // ['1','0','2','0','3']


// 7 写一个函数
// 这个函数可以依照age 或者score排序
// 可以设置倒序和正序
// var users = [
//     { name: '张三', age: 26, score: 100 },
//     { name: '李四', age: '17', score: 87 },
//     { name: '王五', age: 100, score: '77' },
//     { name: '赵六', age: '67', score: 60 },
//     { name: '小明', age: 30, score: '92' },
// ];

// // 我的解法1
// function mySort(field, isDesc, arr) {
//     return isDesc ?
//         arr.sort(function(a, b) { return b[field] - a[field] }) :
//         arr.sort(function(a, b) { return a[field] - b[field] });
// }
// console.log(mySort('score', false, users));

// Array.prototype.sortByField = function(field, isDesc) {
//     return isDesc ?
//         this.sort(function(a, b) { return b[field] - a[field] }) :
//         this.sort(function(a, b) { return a[field] - b[field] });
// }
// console.log(users.sortByField('age', true));

// // 老师的解法
// function sortByField(field) {
//     // 典型柯里化函数
//     return function(isDesc) {
//         return function(a, b) {
//             return isDesc ?
//                 b[field] - a[field] :
//                 a[field] - b[field];
//         }
//     }
// }

// const ageSort = sortByField('age');
// const scoreSort = sortByField('score');

// var arr1 = user.sort(ageSort(true));
// console.log(user);
// // var arr2 = user.sort(ageSort(false));
// // var arr3 = user.sort(scoreSort(true));
// // var arr4 = user.sort(scoreSort(false));


//8 手写一个[].isArray
Array.prototype.myIsArray = function(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}