const MyPromise = require('./MyPromise');

const promise1 = new MyPromise((resolve, reject) => {
  resolve(
    new MyPromise((resolve, reject) => {
      setTimeout(() => {
        resolve('new Promise');
      }, 1000);
    })
  );

  // reject('error');
});

promise1.then((res) => {
  console.log(res);
});

// const promise2 = promise1.then(
//   (value) => {
//     return new MyPromise((resolve, reject) => {
//       setTimeout(() => {
//         resolve(
//           new MyPromise((resolve, reject) => {
//             resolve(value);
//           })
//         );
//       }, 1000);
//     });
//   },
//   (reason) => {
//     return reason;
//   }
// );

// promise2
//   .then()
//   .then()
//   .then()
//   .then()
//   .then(
//     (value) => {
//       console.log(value);
//       // throw new Error('Error');
//     },
//     (reason) => {
//       console.log(reason);
//     }
//   )
//   .catch((error) => {
//     console.log(error);
//   });
