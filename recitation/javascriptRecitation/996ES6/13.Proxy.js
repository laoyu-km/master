// // Proxy 报错 app.js:30 Uncaught TypeError: 'set' on proxy: trap returned falsish for property 'name'
// // 原因 set 函数返回值不能为 false
// function setter() {
//   return function set(target, key, value, reciver) {
//     const isExist = hasOwnProperty(target, key),
//       oldValue = target[key];

//     if (isEqual(oldValue, value)) {
//       return true; // 不报错
//       // return 1; // 不报错
//       // return; // 报错
//       // return false; // 报错
//       // return tur; // 报错
//     }

//     const res = Reflect.set(target, key, value, reciver);

//     if (isExist) {
//       console.log('响应式修改');
//     } else {
//       console.log('响应式新增');
//     }

//     return res;
//   };
// }
