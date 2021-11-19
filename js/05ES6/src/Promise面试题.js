// Promise面试题

// // 1
// const first = () =>
//     new Promise((resolve, reject) => {
//         console.log(3); //1
//         let p = new Promise((resolve, reject) => {
//             console.log(7); //2
//             setTimeout(() => {
//                 console.log(5); //6 
//                 resolve(6);
//                 console.log(p); // 7 promise forfilded 1
//             }, 0);
//             resolve(1);
//         });
//         resolve(2);
//         p.then(arg => {
//             console.log(arg); //4 1
//         });
//     });

// first().then(arg => {
//     console.log(arg); //5 2
// })

// console.log(4); //3

//==========================

// let a;
// const b = new Promise((resolve, reject) => {
//         console.log('promise1'); //1
//         resolve();
//     })
//     .then(() => {
//         console.log('promise2'); //4
//     })
//     .then(() => {
//         console.log('promise3'); //5
//     })
//     .then(() => {
//         console.log('promise4'); //6
//     });

// a = new Promise(async(resolve, reject) => {
//     console.log(a); //2 undefined
//     await b;
//     console.log(a); // 7 promise pending
//     console.log('after1'); // 8
//     await a;
//     resolve(truef); // 不会执行
//     console.log('after2'); // 不会执行
// });

// console.log('end'); //3

// // 变形let a;
// let a;
// const b = new Promise((resolve, reject) => {
//         console.log('promise1'); //1
//         resolve();
//     })
//     .then(() => {
//         console.log('promise2'); //4
//     })
//     .then(() => {
//         console.log('promise3'); //5
//     })
//     .then(() => {
//         console.log('promise4'); //6
//     });

// a = new Promise(async(resolve, reject) => {
//     resolve(true);
//     console.log(a); // undefined
//     await b;
//     console.log(a); //7 Promise fulfilled
//     console.log('after1'); // 8

//     await a;
//     console.log('after2'); // 9
// });

// console.log('end'); //3

//==========================

// // 3
// function runAsync(x) {
//     const p = new Promise(resolve =>
//         setTimeout(() => resolve(x, console.log(x)), 1000));
//     return p;
// }

// function runReject(x) {
//     const p = new Promise((res, rej) =>
//         setTimeout(() => rej(`Error: ${x}`, console.log()), 1000 * x)
//     );
//     return p;
// }

// Promise.all([runAsync(1), runReject(4), runAsync(3), runReject(2)])
//     .then(res => console.log(res))
//     .catch(err => console.log(err));

//==========================

// // 4
// function runAsync(x) {
//     const p = new Promise(r => {
//         setTimeout(() => r(x, console.log(x)), 1000);
//     });
//     return p
// }

// Promise.race([runAsync(1), runAsync(2), runAsync(3)])
//     .then(res => console.log('result: ', res))
//     .catch(err => console.log(err));

//==========================

// // 5
// async function async1() {
//     console.log("async1 start"); //1
//     new Promise(resolve => {
//         console.log("promise"); //2
//     })
//     console.log("async1 end"); //3
// }

// async1s();
// console.log("start"); //4

// ===================

// // 6
// async function async1() {
//     console.log("async1 start"); //1
//     await async2();
//     console.log("async1 end"); //4
// }

// async function async2() {
//     setTimeout(() => {
//         console.log("timer"); //5
//     }, 0);
//     console.log("asynce2"); //2
// }
// async1();
// console.log("start"); //3

// ===================

// 7
// async function async1() {
//     console.log("async1s start"); //1
//     await async2();
//     console.log("async1 end"); //4
//     setTimeout(() => {
//         console.log("timer1"); // 7
//     }, 0);
// }

// async function async2() {
//     setTimeout(() => {
//         console.log("timer2"); //5
//     }, 0);
//     console.log('async2'); //2
// }

// async1();
// setTimeout(() => {
//     console.log("timer3"); //6
// }, 0);

// console.log('start'); //3

// ===================

// // 8
// async function async1() {
//     console.log("1"); //2
//     await new Promise(resolve => {
//         console.log("2"); //3
//         // 没有resolve，promise状态为pendding, 后面的代码不执行
//     });
//     console.log("3");
//     return "4";
// }
// console.log('5'); //1
// async1().then(res => console.log(res)); //不执行
// console.log('6'); //4

// ===================
// // 9
// async function async1() {
//     console.log('1'); //2
//     await new Promise(resolve => {
//         console.log("2"); //3
//         resolve('3');
//     }).then(res => console.log(res)); //5 res 3
//     console.log('4'); //6
//     return '5';
// }

// console.log('6'); //1
// async1().then(res => console.log(res)); //7 res 5
// console.log('7'); //4

// ===================
// // 10
// async function async1() {
//     console.log('1'); //2
//     await new Promise(resolve => {
//         console.log('2'); //3
//         resolve('3');
//     });
//     console.log('4'); //5
//     return '5';
// }
// console.log('6'); //1
// async1().then(res => {
//     console.log(res); // 6 res=5
// });
// new Promise(resovle => {
//     console.log('7'); //4
//     setTimeout(() => {
//         console.log('8'); // 7
//     });
// });

// ===================
// // 11
// async function testSomething() {
//     console.log('1'); //2
//     return '2';
// }

// async function testAsync() {
//     console.log('3'); // 6

//     //两种写法返回的结果相同, async 默认返回Promise.resolve('4'),也可显示的写出
//     // return Promise.resolve('4');
//     return '4';
// }

// async function test() {
//     console.log('5'); //1
//     const v1 = await testSomething();
//     console.log(v1); // 5 v1=2
//     const v2 = await testAsync();
//     console.log(v2); // 8 v2=4
//     console.log(v1, v2); //9 v1=2  v2=4
// }
// test();

// var promise = new Promise(resolve => {
//     console.log('6'); //3
//     resolve('7');
// })
// promise.then(val => console.log(val)); //7 val=7

// console.log('8'); //4

// ===================

// // 12
// async function async1() {
//     await async2();
//     console.log('1');
//     return '2';
// }

// async function async2() {
//     return new Promise((resovle, reject) => {
//         console.log('3'); // 只打印3， 后面跟reject('4')的报错
//         reject('4');
//     });
// }

// async1().then(res => console.log(res));

// ===================

// // 13
// async function async1() {
//     try {
//         await Promise.reject('error!!!');
//     } catch (e) {
//         console.log(e); //2 使用try...catch来捕获错误，捕获并不会组织代码的运行, 错误会中断，错误被捕获了就不会中断
//     }
//     console.log('async1'); //3
//     return Promise.resolve('async1 success');
// }

// async1().then(res => console.log(res)); //4 res=async1 success
// console.log('script start'); //1

// ===================
// // 14
// async function async1() {
//     await Promise.reject('error!!!').catch(e => console.log(e)); //2
//     console.log("async1"); //3
//     return Promise.resolve('async1 success');
// }
// async1().then(res => console.log(res)); //4
// console.log('script start'); //1

// ===================

// // 15
// const first = () =>
//     new Promise((resolve, reject) => {
//         console.log(3); //1
//         let p = new Promise((resolve, reject) => {
//             console.log(7); //2
//             setTimeout(() => {
//                 console.log(5); //6
//                 resolve(6); // 为什么没作用
//                 console.log(p); //7 promise 1
//             }, 0);
//             resolve(1);
//         });
//         resolve(2);
//         p.then(arg => {
//             console.log(arg); //4
//         });
//     });

// first().then(arg => console.log(arg)); //5
// console.log(4); //3

// ===================

// // 16
// const async1 = async() => {
//     console.log('1'); //2
//     setTimeout(() => {
//         console.log('2'); //9
//     }, 2000);
//     await new Promise(resolve => {
//         console.log('3'); //3
//         // 无resovle, reject, promise状态为pendding
//     })
//     console.log('4');
//     return '5';
// }
// console.log('6'); //1
// async1().then(res => console.log(res));
// console.log('7'); //4
// Promise.resolve(1)
//     .then(2) // .then(参数必须为callback函数，如果不是就不会执行，干扰项，可以删除掉)
//     .then(Promise.resolve(3))
//     .catch(4)
//     .then(res => console.log(res)); //7 res = 1

// setTimeout(() => {
//     console.log('8'); //8
// }, 1000)

// ===================

// // 17
// const p1 = new Promise(resolve => {
//         setTimeout(() => {
//             resolve('1');
//             console.log('2'); //3
//         }, 0);
//         resolve('3'); //promise固化，promise一旦状态发生变化，下一个resolve或者reject就无效
//         resolve('4');
//     })
//     .then(res => {
//         console.log(res); //1 res = 3
//         setTimeout(() => {
//             console.log(p1); //4 promise
//         }, 1000);
//     })
//     .finally(res => { //finally 不管成功或者失败都会执行
//         console.log('finally', res); //2 res = undefined
//     })


// ===================

// // 练习
// // 1. 使用Promise实现每隔1秒输出1, 2, 3, 用promise来做
// for (var i = 1; i < 4; i++) {
//     (function(k) {
//         setTimeout(() => {
//             console.log(k);
//         }, 1000 * k);
//     })(i);
// }
// var k = 1;
// setTimeout(() => {
//     setTimeout(() => {
//         console.log(k);
//         k++;
//         setTimeout(() => {
//             console.log(k);
//             k++;
//             setTimeout(() => {
//                 console.log(k);
//             }, 1000 * k);
//         }, 1000 * k);
//     }, 1000 * k)
// });

// var k = 1;
// promise = new Promise((resolve, reject) => {
//     resolve(k);
// });

// promise
//     .then((k) => {
//         setTimeout(() => {
//             console.log(k);
//         }, 1000 * k);
//         return k;
//     })
//     .then(k => {
//         k++;
//         setTimeout(() => {
//             console.log(k);
//         }, 1000 * k);
//         return k;
//     })
//     .then(k => {
//         k++;
//         setTimeout(() => {
//             console.log(k);
//         }, 1000 * k);
//     })
// });

// // 3.实现mergePromise函数，把传进去的数组按顺序先后执行，并且把返回的数据先后放到数组data中
// const time = (timer) => {
//     setTimeout(() => {
//         resovle();

// ;
// cltime(2000).then(() => {
//     return 3;
// });

// function mergePromise() {
//     // 在这里写代码
// }

// mergePromise([ajax1, ajax2, ajax3]).then(data => {
//     console.log('done');
//     console.log(data); // data 为[1,2,3]
// });

// // 要分别输出
// // 1
// // 2
// // 3
// // done
// // [1,2,3]


// // 4. 手写一个promise

function myPromise(callback) {
    this.statu = 'pendding';
    this.value;
    this.then = function() {}

    function resolve(value) {
        this.statu = 'fulfilled';
        this.value = value;

    }

    function reject(err) {
        this.statu = 'foofilled';
        this.value = err
    }


    callback(resolve, reject);
}

var p = myPromise((resolve, reject) => {
    resolve(1);
});