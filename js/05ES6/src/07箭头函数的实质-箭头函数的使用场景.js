// // 回顾
// // 箭头函数
// () => {}
// let fn = (a, b) => ({ a: 3, b: 4 }); // 返回一个对象

// // rest运算符
// // 不定参数， rest运算符，拓展运算符 -> 展开运算符
// function fn(first, last, ...args) {

// }
// fn(1, 2, 3, 4, 5, 6, 7);


// 箭头函数的实质
// 箭头函数 跟 function 不一样

// // 箭头函数的特点
// // 1. this 是根据外层的函数作用域来决定的;
// function foo() {
//     console.log(this)
//     return (a) => {
//         console.log(this.a);
//     }
// }

// var obj1 = { a: 2 };
// var obj2 = { a: 3 };
// var bar = foo(); // window
// bar.call(obj2); // undefined
// // var bar = foo.call(obj1); //2
// // bar.call(obj2); // 2

// // => this 练习
// const person = {
//     eat() {
//         console.log(this);
//     },
//     drink: () => {
//         console.log(this);
//     }
// }

// person.eat(); // 指向 person
// person.drink(); // 指向window, 因为drink函数开始的外层作用域是window

// // // => this 练习2
// window.onload = function() {
//     (function() {
//         function Button() {
//             this.button = document.getElementById('button');
//         }
//         Button.prototype = {
//             init() {
//                 this.bindEvent();
//             },
//             bindEvent() {
//                 // this.button.addEventListener('click', this.clickBtn.bind(this), false);
//                 //箭头函数
//                 // 箭头函数不需要用bind来制定this指向，这里箭头函数的this就是外层函数 -> bindEvent 的this
//                 this.button.addEventListener('click', (e) => this.clickBtn(e), false);
//             },
//             clickBtn(e) {
//                 console.log(e);
//                 console.log(this);
//             }
//         }

//         new Button().init();
//     })();
// }

// // 箭头函数的嵌套 this 指向
// // this 指向由父级决定并不准确
// // 在箭头函数中，没有this 机制, 箭头函数的内部是没有自己的this, 只能通过父级作用域来获取到this，闭包的this
// // 所以这里的this是固化的, 就是箭头函数外层的this
// function foo() {
//     return () => {
//         return () => {
//             return () => {
//                 console.log('id', this.id);
//             }
//         }
//     }
// }
// var f = foo.call({ id: 1 });
// var f1 = f.call({ id: 2 })()(); // id 1
// var f2 = f().call({ id: 3 })(); // id 1
// var f3 = f()().call({ id: 4 }); // id 1


// // 2. => 不能作为构造函数来使用
// // 3. => 没有arguments对象，-> 用 rest 拓展运算符替代
// 示例1
// var test = () => {
//     console.log(arguments); // ReferenceError: arguments is not defined
// }
// test();

// // 闭包 -> 一个函数的执行导致另一个函数被定义 -> 形成闭包，外层函数是闭包
// function foo() {
//     setTimeout(() => {
//         console.log(arguments); //拿到的是父级的arguments
//     })
// }
// foo(1, 2, 3, 4, 5, 6); // Arguments(6) [1, 2, 3, 4, 5, 6, callee: ƒ, Symbol(Symbol.iterator): ƒ]

// //示例2 将下式用箭头函数表示
// function insert(value) {
//     return {
//         into: function(array) {
//             return {
//                 after: function(afterValue) {
//                     array.splice(array.indexOf(afterValue) + 1, 0, value);
//                     return array;
//                 }
//             }
//         }
//     }
// }
// console.log(insert(5).into([1, 2, 3, 4, 6, 7, 8]).after(4));

// // 箭头函数来写
// // 不建议这样写，只是练习，语义化不明显
// let insert = (value) => ({
//     into: (array) => ({
//         after: (afterValue) => {
//             array.splice(array.indexOf(afterValue) + 1, 0, value);
//             return array;
//         }
//     })
// })
// console.log(insert(5).into([1, 2, 3, 4, 6, 7, 8]).after(4));

// 4. yield 命令不能生效，在 generator 函数中

//=========================================

// => 箭头函数的使用场景

// //1. 简单的函数表达式，得出唯一的return的计算值，函数内部没有this 的引用 , 递归，事件绑定，解绑定，用重构 => 的方式是最好的
// [12, 3, 1234, 1, 4].sort((a, b) => a - b);

// //2. 内层的函数表达式，需要调用this -> var self=this, bind(this),为了确保this指向的时候
// window.onload = function() {
//     (function() {
//         function Button() {
//             this.button = document.getElementById('button');
//         }
//         Button.prototype = {
//             init() {
//                 this.bindEvent();
//             },
//             bindEvent() {
//                 this.button.addEventListener('click', (e) => this.clickBtn(e), false);
//             },
//             clickBtn(e) {
//                 console.log(e);
//                 console.log(this);
//             }
//         }

//         new Button().init();
//     })();
// }

// // 3. 如依赖封装函数 像：var args = Array.prototype.slice.call(arguments);

// // function sortNumber() {
// //     return Array.prototype.slice.call(arguments).sort((a, b) => a - b);
// // }

// // function sortNumber() {
// //     return Array.prototype.slice.call(arguments).sort(function(a, b) {
// //         return a - b;
// //     });
// // }
// // 最佳方法
// const sortNumber = (...numbers) => numbers.sort((a, b) => a - b);
// console.log(sortNumber(1, 22, 333, 555, 678, 8988, 6756));

// 4. 不适合=>的情况：
// 函数声明，执行语句比较多的情况, 还需要用到递归，需要引用函数名，事件绑定，解绑定等情况 -> 不适合用