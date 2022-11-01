// 1. 数组的解构赋值
// ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）
// let [a, b, c] = [1, 2, 3];

// // 本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予对应的值
// let [a, [[b], c]] = [1, [[2], 3]];
// let [, , third] = [1, 2, 3]; // third = 3
// let [x, , y] = [1, 2, 3]; // x=1, y=3
// let [head, ...tail] = [1, 2, 3]; // head=1, tail=[2,3]
// let [x1, y1, ...z] = [1]; // x1=1, y1=undefined, z=[]
// console.log(x1, y1, z);

// // 如果解构不成功，变量的值就等于undefined
// let [foo1] = []; // foo=undefined
// let [bar, foo] = [1]; // foo=undefined

// // 不完全解构 -> 即等号左边的模式，只匹配一部分的等号右边的数组
// let [x, y] = [1, 2, 3]; // x=1, y=2
// let [a, [b], d] = [1, [2, 3], 4]; // a=1, b=2, d=4

// // 如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错
// // 注意：字符串是类数组，可遍历解构
// let [foo1] = 1;
// let [foo2] = true;
// let [foo3] = NaN;
// let [foo4] = undefined;
// let [foo5] = null;
// let [foo6] = {};

// // 对于 Set 结构，也可以使用数组的解构赋值
// let [x, y, z] = new Set(['a', 'b', 'c']);
// console.info(x, y, z);

// // 事实上，只要某种数据结构具有 Iterator 接口，都可以采用数组形式的解构赋值
// // Generator 函数返回的就是iterator对象，解构赋值会依次从这个接口获取值
// function* fibs() {
//   let a = 0,
//     b = 1;

//   while (true) {
//     yield a;
//     [a, b] = [b, a + b];
//   }
// }

// let [a1, a2, a3, a4, a5, a6] = fibs();
// console.log(a1, a2, a3, a4, a5, a6);
