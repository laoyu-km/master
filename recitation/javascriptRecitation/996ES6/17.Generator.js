// Generator 异步的实现

// 传统异步 -> 回调函数， 事件监听， 发布订阅， Promise

// // 方法1， thunk 函数 -> Thunkify模块 -> 回调函数 -> 自写
// const fs = require('fs');

// // thunk 函数
// const thunk = function (fn) {
//   return function (...args) {
//     return function (callback) {
//       fn(...args, callback);
//     };
//   };
// };

// // // thunk 函数的使用
// // const readFileThunk = thunk(fs.readFile);
// // readFileThunk(
// //   './fileTest/file01',
// //   'utf-8'
// // )((err, data) => {
// //   if (err) console.log(err);
// //   console.log(data);
// // });

// const readFileThunk = thunk(fs.readFile);

// function* gen() {
//   const f1 = yield readFileThunk('./fileTest/file01', 'utf-8');
//   const f2 = yield readFileThunk('./fileTest/file02', 'utf-8');
//   const f3 = yield readFileThunk('./fileTest/file03', 'utf-8');

//   console.log(f1, f2, f3);
// }

// thunk方法实现Generator的异步
// function runGen(gen) {
//   const iter = gen();

//   function doNext(err, data) {
//     if (err) return err;

//     let iterObj = iter.next(data);
//     if (!iterObj.done) {
//       iterObj.value(doNext);
//     } else {
//       return;
//     }
//   }

//   doNext();
// }

// runGen(gen);

// // 方法2. promise方法 -> co模块 -> Promise -> 自写
// const fs = require('fs');

// const readFilePromise = function (...args) {
//   return new Promise((resolve, reject) => {
//     fs.readFile(...args, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// const gen = function* () {
//   const f1 = yield readFilePromise('./fileTest/file01', 'utf-8');
//   const f2 = yield readFilePromise('./fileTest/file02', 'utf-8');
//   const f3 = yield readFilePromise('./fileTest/file03', 'utf-8');

//   console.log(f1, f2, f3);
// };

// const runGen = function (gen) {
//   const iter = gen();

//   function runNext(data) {
//     const res = iter.next(data);
//     if (!res.done) {
//       res.value.then((data) => {
//         runNext(data);
//       });
//     } else {
//       return;
//     }
//   }

//   runNext();
// };

// runGen(gen);
