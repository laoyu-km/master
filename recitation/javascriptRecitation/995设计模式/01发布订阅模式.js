// 发布订阅

// // 1. 发布订阅简单场景实现 -> 发布者(baozipu)和订阅者(xiaoming)
// const { xiaoming: subscriber, baozipu: publicer } = (function () {
//   const xiaoming = {
//     name: 'xiaoming',
//     getInfo(info) {
//       this.response(info);
//     },
//     response(info) {
//       console.log(this.name + ' get the info ' + info);
//     },
//   };

//   const baozipu = {
//     name: 'baozipu',
//     listenList: [],

//     listen(fn) {
//       this.listenList.push(fn);
//     },

//     trigger() {
//       this.listenList.forEach((item) => {
//         item.apply(this, Array.prototype.slice.call(arguments));
//       });
//     },
//   };

//   return {
//     xiaoming,
//     baozipu,
//   };
// })();

// publicer.listen(function (arg) {
//   subscriber.getInfo(arg);
// });

// publicer.trigger('jayden'); // xiaoming get the info jayden

// // 2. 发布订阅: 订阅分类信息, 发布分类信息
// const { baozipu, Peple } = (function () {
//   const baozipu = {
//     name: 'baozipu',
//     listenList: {},
//     listen(category, fn) {
//       if (!this.listenList[category]) {
//         this.listenList[category] = [];
//       }
//       this.listenList[category].push(fn);
//     },
//     trigger(...args) {
//       this.listenList[args[0]].forEach((item) => {
//         item.apply(this, args);
//       });
//     },
//   };

//   const Peple = class {
//     constructor(name) {
//       this.name = name;
//     }

//     getInfo(...args) {
//       this.response(...args);
//     }

//     response(...args) {
//       const [category, price] = args;
//       console.log(`${this.name} like ${category} it price is ${price}`);
//     }
//   };

//   return {
//     baozipu,
//     Peple,
//   };
// })();

// const xiaoming = new Peple('xiaoming');
// const hanmeimei = new Peple('Hanmeimei');

// baozipu.listen('roubao', (...args) => {
//   xiaoming.getInfo(...args);
// });

// baozipu.listen('caibao', (...args) => {
//   hanmeimei.getInfo(...args);
// });

// baozipu.trigger('caibao', 1.0);
// baozipu.trigger('roubao', 2.0);

// // 3. 发布订阅实现平台角色，将发布者和订阅者连接起来
// const PublicSubscribe = (function () {
//   const listenList = {};

//   const listen = function (category, fn) {
//     if (!listenList[category]) {
//       listenList[category] = [];
//     }
//     listenList[category].push(fn);
//   };

//   const trigger = function (category, price) {
//     console.log(listenList[category]);
//     if (!listenList[category] || listenList[category].length === 0) {
//       return false;
//     }
//     listenList[category].forEach((item) => {
//       item.apply(this, [].slice.call(arguments));
//     });
//   };

//   const remove = function (category, fn) {
//     const fns = listenList[category];
//     if (!fns || fns.length === 0) {
//       return false;
//     }

//     if (!fn) {
//       fns.length = 0;
//       return true;
//     }

//     for (let i = fns.length - 1, _fn; i >= 0; i--) {
//       _fn = fns[i];
//       if (_fn === fn) {
//         fns.splice(i, 1);
//       }
//     }
//   };

//   return {
//     listen,
//     trigger,
//     remove,
//   };
// })();

// class Peple {
//   constructor(name) {
//     this.name = name;
//   }

//   getInfo(...args) {
//     this.response(...args);
//   }

//   response(...args) {
//     const [category, price] = args;
//     console.log(`${this.name} like ${category} it price is ${price}`);
//   }
// }

// const xm = new Peple('xiaoming');
// const zs = new Peple('zhangsan');

// const fn1 = function (...args) {
//   xm.getInfo(...args);
// };
// const fn2 = function (...args) {
//   zs.getInfo(...args);
// };

// PublicSubscribe.listen('roubao', fn1);
// PublicSubscribe.listen('caibao', fn2);

// PublicSubscribe.trigger('roubao', 20);
// PublicSubscribe.remove('caibao', fn2);
// PublicSubscribe.trigger('caibao', 30);

// // 发布订阅模式 作为方法使用
// function publicSubscribe() {
//   const listenList = {};

//   function find(key, fn) {
//     const listenKeyArr = listenList[key];
//     let fnCount = 0;

//     for (let i = 0; i < listenKeyArr.length; i++) {
//       if (listenKeyArr[i] === fn) {
//         fnCount++;
//       }
//     }

//     if (fnCount === 0) {
//       console.log(`${fn.name} 还没有订阅`);
//       return false;
//     }

//     if (fnCount > 0) {
//       console.log(`${fn.name} 已经订阅啦`);
//       return true;
//     }
//   }

//   function listen(key, fn) {
//     if (!listenList[key]) {
//       listenList[key] = [];
//     }

//     if (find(key, fn)) {
//       console.log(`${fn.name} 已经订阅了 ${key}`);
//       return;
//     }

//     listenList[key].push(fn);
//   }

//   function trigger(key, ...args) {
//     if (!listenList[key] || listenList[key].length === 0) {
//       return;
//     }

//     listenList[key].forEach((fn) => {
//       fn.apply(this, args);
//     });
//   }

//   function remove(key, fn) {
//     if (!listenList[key] || listenList[key].length === 0) {
//       return;
//     }

//     if (!fn) {
//       listenList[key] = [];
//       return 'done';
//     }

//     if (!find(key, fn)) {
//       console.log(`没有 ${fn.name} 这个订阅`);
//       return;
//     } else {
//       const index = listenList[key].indexOf(fn);
//       listenList[key].splice(index, 1);
//       console.log(`${fn.name} 删除成功`);
//     }
//   }

//   return { listen, trigger, remove };
// }

// class Person {
//   constructor(name) {
//     this.name = name;
//   }

//   getInfo(...args) {
//     this.response(...args);
//   }

//   response(...args) {
//     console.log(this.name, ...args);
//   }
// }
// const p1 = new Person('zhangsan');
// const p2 = new Person('lisi');
// const baozipu = publicSubscribe();

// const fn1 = function (...args) {
//   p1.getInfo(...args);
// };

// const fn2 = function (...args) {
//   p2.getInfo(...args);
// };

// const fn3 = function (...args) {
//   console.log(args);
// };

// baozipu.listen('roubaozi', fn1);
// baozipu.listen('caibao', fn2);
// baozipu.listen('roubaozi', fn1);

// baozipu.trigger('roubaozi', 2.0);
// baozipu.trigger('caibao', '0.5');

// baozipu.remove('roubaozi', fn3);
// baozipu.remove('roubaozi', fn1);
