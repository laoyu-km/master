// 手写Promise

// // 实现 then();
// function doSomething() {

//     return {
//         then: function(callback) {
//             var value = 66;
//             callback(value);
//         }
//     }
// }

// doSomething().then(function(data) {
//     console.log('Got a value ' + data);
// })

// // 实现Promise
// function MyPromise(fn) {
//     var state = 'pending'; // pending -> resolve
//     var value;
//     var callback = null;

//     this.then = function(onResolved, onRejected) { //on + 时间 = 在什么的时候
//         // handle(onResolved);

//         // then() 需要返回一个MyPromise对象
//         return new MyPromise(function(resolve, reject) {
//             handle({
//                 onResolved: onResolved,
//                 onRejected: onRejected,
//                 resolve: resolve,
//                 reject: reject
//             });
//         });
//     }

//     // 通过pending来实现callback的执行
//     function resolve(newValue) {
//         // 处理resolve 可能出现的异常, 使用try...catch
//         try {
//             // 处理传入的值是一个MyPromise对象
//             if (newValue && typeof(newValue.then) === 'function') {
//                 // newValue.then(resovle);
//                 newValue.then(resolve);
//                 return;
//             }

//             value = newValue;
//             state = 'resolve';
//         } catch (e) {
//             reject(e);
//         }
//     }

//     function reject(reason) {
//         value = reason;
//         state = 'reject';
//     }

//     function handle(handler) {
//         setTimeout(function() {
//             let handlerCallback = null,
//                 returnValue = null;

//             if (state === 'resolve') {
//                 handlerCallback = handler.onResolved;
//             } else {
//                 handlerCallback = handler.onRejected;
//             }

//             if (!handlerCallback) {
//                 if (state === 'resolve') {
//                     handler.resolve(value);
//                 } else {
//                     handler.reject(value);
//                 }
//                 return;
//             }

//             try {
//                 returnValue = handlerCallback(value);
//             } catch (e) {
//                 reject(e);
//                 return;
//             }
//             handler.resolve(returnValue);

//             // if (state === 'resolve') {
//             //     handler.resolve(returnValue);
//             // } else {
//             //     handler.reject(returnValue);
//             // }

//         }, 1)
//     }



//     // // 使用setTimeout 实现cb定义后在执行callback
//     // function resolve(value) {
//     //     setTimeout(function() { // setTimeout 让callback延时，使其在cb定义后在执行
//     //         callback(value);
//     //     }, 1);
//     // }

//     fn(resolve, reject);
// }

// let fs = require('fs');
// let mp = new MyPromise(function(resolve, reject) {
//     fs.readFile('./num.txt', 'utf-8', function(err, data) {
//         if (err) {
//             reject(err);
//         } else {
//             resolve(data);
//         }
//     })
// });

// mp.then(
//     data => console.log('mp' + data),
//     err => console.log('mp' + err)
// );

// let promise = new Promise((resolve, reject) => {
//     fs.readFile('./num.txt', 'utf-8', (err, data) => {
//         if (err) {
//             reject('promise' + err);
//         } else {
//             resolve('promise' + data);
//         }
//     })
// })
// promise.then(
//     data => console.log(data),
//     err => console.log(err)
// );

// function doSomething() {
//     return new MyPromise(function(resolve, reject) {
//         // var result = somehowGetTheValue();
//         // if (result.error) {
//         //     reject(result.error);
//         // } else {
//         //     resolve(result.value)
//         // }
//         var reason = ('fail');
//         reject(reason);
//     })
// }


// // resolve 和 reject 都有
// console.log(1)
// doSomething()
//     .then(function(data) {
//             console.log('success ' + data);
//         },
//         function(err) {
//             console.log('fail: ' + err);
//         }
//     ).then(
//         data => console.log(data),
//         err => console.log(err)
//     );

// console.log(2);



// // // 只有resolve的情况
// // doSomething()
// //     .then() // 什么都不填就无效
// //     .then(function(data) {
// //         console.log('promise2 ' + data);
// //         // return 'alexis';
// //         // 如果传入的是一个promise对象
// //         return funcp();
// //     }).then(function(data) {
// //         console.log('promise3 ' + data);
// //     })

// // funcp = () => {
// //     return new MyPromise(function(resolve) {
// //         let value = 'elle';
// //         resolve(value);
// //     })
// // }

// // data nomalization 数据标准化 -> 将列表或数据，转换为对象，可以做到通过键名找键值，比起用数组方式来说书读快


// 练习
function MyPromise(fn) {
    let value = null,
        state = 'pending';

    this.then = function(onResolved, onRejected) {
        return new MyPromise(
            function(resolve, reject) {
                let newValue = onResolved(value);
                resolve(newValue);
                // handle({
                //     onResolved: onResolved,
                //     onRejected: onRejected,
                //     resolve: resolve,
                //     reject: reject
                // })
            }
        );
    }

    function handle(handler) {
        let callback = null;
        if (state === 'resolve') {
            callback = handler.onResolved;
        } else {
            callback = handler.onRejected;
        }

        if (!callback) {
            // handler.resolve(value);
            resolve(value);
            return;
        }

        let newValue = callback(value);
        if (state === 'resolve') {
            // 必须调用handler.resolve, 才能作用到then return 的myPromise 对象 , 为什么？
            // handler.resolve(newValue);
            resolve(newValue);
        } else {
            handler.reject(newValue);
            // reject(newValue);
        }
    }

    function resolve(newValue) {
        if (newValue && typeof(newValue.then) === 'function') {
            newValue.then(resolve);
            return;
        }

        value = newValue;
        state = 'resolve';
    }

    function reject(reason) {
        value = reason;
        state = 'reject';
    }

    fn(resolve, reject);
    console.log('do ' + value);
}

function doSomething() {
    return new MyPromise((resolve, reject) => {
        let value = Math.random() * 100;
        value >= 60 ?
            resolve(value) :
            reject('不及格');
    });
}

let mp = doSomething();
mp.then(data => {
    console.log('mp ' + data)
    return 'foxxx';
}).then(data => { console.log('mp2 ' + data); return 'elle' });
// mp.then(data => console.log('mp2 ' + data));
// let mpThen = mp.then(
//         data => {
//             console.log('mp ' + data);
//             return 'jayden';
//         },
//         err => {
//             console.log('mp ' + err);
//             return 'alexis';
//         }
//     )
// .then()
// .then(function(data) {
//     console.log('mpThen ' + data);
// }, function(err) {
//     console.log('mpThen ' + err);
// });