// Set() 和 Map 的实际应用

// // Map 转换为数组
// const myMap = new Map();

// myMap.set(true, 8)
//     .set({ foo: 3 }, ['abc']);

// console.log(myMap);
// console.log([...myMap]);

// // 数组转换为Map
// const map = new Map([
//     [true, 7],
//     [{ foo: 3 },
//         ['abc']
//     ]
// ]);
// console.log(map);

// // Map 转换为对象 (条件：当前键名为字符串，如果键名不是字符串，会被隐式转换为字符串:{} -> [object Object], [1,2,3] -> 1,2,3)
// const myMap = new Map();
// myMap.set(true, 8)
//     .set({ foo: 3 }, ['abc']);
// // .set([1, 2, 3], ['abc']);

// function strMapToObj(map) {
//     // let obj = {};
//     let obj = Object.create(null);
//     for (let [key, value] of map.entries()) {
//         obj[key] = value;
//     }
//     return obj;

// }
// console.log(strMapToObj(myMap)); //{true: 8, [object Object]: Array(1)}

// // 对象 转换为 Map
// function objToStrMap(obj) {
//     let map = new Map();
//     for (let key of Object.keys(obj)) {
//         map.set(key, obj[key]);
//     }
//     return map;
// }

// console.log(objToStrMap({ true: 7, no: ['abc'] }));

// ======================================

// // map PK array
// let map = new Map();
// let arr = new Array();

// // // 增
// map.set('t', 1);
// arr.push({ 't': 1 });
// arr.push({ 'b': 'jayden' });
// // console.log(map, arr);

// // 查
// let map_exist = map.has('t');
// let arr_exist = arr.find(item => item.t);

// // console.log(map_exist, arr_exist);

// // 改
// map.set('t', 2);
// arr.forEach(item => item.t ? item.t = 2 : "");

// // console.log(map, arr);

// // 删
// map.delete('t');

// let index = arr.findIndex(item => item.t);
// arr.splice(index, 1);

// console.log(map, arr);

// ======================================

// // Set PK arr
// let set = new Set();
// let arr = new Array();

// // add
// let obj = { t: 1 }
// set.add(obj);
// arr.push({ t: 1 });

// // search
// let set_exist = set.has(obj);
// let arr_exist = arr.find(item => item.t);

// console.log(set_exist, arr_exist);

// // modify
// set.forEach(item => item.t ? item.t = 2 : '');
// arr.forEach(item => item.t ? item.t = 2 : '')

// console.log(set, arr);

// // delete
// set.forEach(item => item.t ? set.delete(item) : '')

// let index = arr.findIndex(item => item.t);
// arr.splice(index, 1);

// console.log(set, arr);

// ======================================

// // map set obj

// let item = { t: 1 };
// let set = new Set();
// let map = new Map();
// let obj = {};

// // add
// map.set('t', 1);
// set.add(item);
// obj['t'] = 1;

// // console.log(map, set, obj);

// // search
// console.log({
//     map_exist: map.has('t'),
//     set_exist: set.has(item),
//     // obj_exist: 't' in obj
//     obj_exist: obj.hasOwnProperty('t')
// })

// // modify
// map.set('t', 2);
// // set.forEach(item => item.t ? item.t = 2 : '');
// item.t = 2; // 直接对item动手
// obj['t'] = 2;

// console.log(map, set, obj);

// // delete
// map.delete('t');
// set.delete(item);
// delete obj['t'];

// 总结
// 1. 能用map就不要用数据
// 2. 如果对数据唯一性有要求， 用set

// ======================================

// // WeakMap  WeakSet
// // 没有遍历方法
// console.log(new WeakMap());
// console.log(new WeakSet());

// // WeakSet 成员只能是对象
// let wset = new WeakSet();
// wset.add(1); //TypeError: Invalid value used in weak set

// // WeakMap 成员键名一定要是对象
// let wmap = new WeakMap();
// wmap.set('1', 'jayden'); // TypeError: Invalid value used as weak map key

// WeakSet WeakMap 的回收机制不同
// 
// 内存使用
// 1. 分配内存: c & c++手动分配内存， 更高级的语言自动分配内存
// 2. 使用内存： 就是数据读写的过程
// 3. 回收内存: c & c++手动释放， 更高级的语言自动释放， js使用的方式是垃圾回收机制

// 垃圾回收机制主要依赖的是引用关系, 引用关系的主要表现在于引用计数
// 引用计数不为0，引用不会释放，也就回收不了
// 引用计数为0， 则会被垃圾回收机制回收

// WeakSet 和 WeakMap 是弱引用 不计引用计数，也就是说其引用的状态可能随时被垃圾回收机制回收掉，随时消失，非常不确定，所以其没有遍历方法
// 不建议使用

// // 垃圾回收机制举例
// var o1 = {
//     o2: {
//         x: 1
//     }
// }

// var o3 = o1;
// o1 = 1

// var o4 = o3.o2;

// o3 = '123';

// o4 = null;

// ======================================

// // proxy -> 代理
// // 代理 -> 在目标之间设置一个拦截层

// let star = {
//     name: 'jayden',
//     age: 25,
//     phone: '13888888888',
// }

// // new Proxy(target, handle);
// // 示例1，为star代理，不提供电话，自主报价，提供name和age
// // 拦截方法: get:   set:
// let agent = new Proxy(star, {
//     get: function(target, key) {
//         if (key === 'phone') {
//             // return target[key];
//             return 'agent: 1383838338';
//         }
//         if (key === 'price') {
//             return 120000;
//         }

//         return target[key];
//     },
//     set: function(target, key, value) {
//         if (value < 100000) {
//             throw new Error('价格太低')
//         } else {
//             target[key] = value;
//             return true;
//         }
//     },

//     // has
//     has: function(target, key) {
//         if (key === 'customPrice') {
//             return target[key];
//         } else {
//             return false;
//         }
//     },

//     // deleteProperty
//     deleteProperty: function(target, key) {
//         if (key.indexOf('_') === 0) {
//             delete target[key];
//         }
//     }

// });

// // console.log(agent.phone);
// // console.log(agent.price);
// // console.log(agent.name);
// // console.log(agent.age);

// agent.customPrice = 150000;
// // console.log(agent);
// // console.log(agent.customPrice);
// // console.log('customPrice' in agent); // true

// // // has没办法拦截for...in
// // for (let key in agent) {
// //     console.log(key, agent[key]);
// // }

// // // 自行学习 Reflect里的方法, 里面有所有拦击操作，因为很少用到,所以自己学习
// // Reflect: 映射 属性是一系列操作方法，
// // console.log(new Reflect()); //TypeError: Reflect is not a constructor
// var obj = {
//     a: 1,
//     b: 2,
//     c: 3
// }

// console.log(obj.a) // 1
// console.log(Reflect.get(obj, 'a')); // 1

// Reflect.set(obj, 'b', '10'); // === obj.b='10'
// console.log(obj);

// // Reflect 让原来用 in, . 等等标识符的操作函数化，让语义更明确, 这是Reflect 的由来
// console.log(Reflect.has(obj, 'a')); // true === 'a' in obj

// //将Object.constructor的一些方法挪到了Reflect中，让其更加优化
// //示例 Object.defineProperty(target, property, attributes),使用时可能会报错，只能用try...catch来抛出错误
// // 而使用defineProperty, 则可以使用if...else来解决
// console.log(Reflect);

// try {
//     Object.defineProperty(target, property, atrributes);
// } catch (e) {

// }

// if (Reflect.defineProperty(target, property, atrributes)) {

// } else {

// }

let star = {
    name: 'jayden',
    tel: '13888888888'
}

let proxyS = new Proxy(star, {
    get: function(target, key) {
        if (key === 'tel') {
            return 'agentTel: 13666666666'
        }
        if (key === 'price') {
            return '150000';
        }
        return target[key];
    },
    set: function(target, key, value) {
        if (!isNaN(parseInt(value))) {
            if (value > 100000) {
                target[key] = value;
                return '出价以接收';
            } else {
                throw new Error('出价太低');
            }
        } else {
            target[key] = value;
        }
    },
    has: function(target, key) {
        // return '拒绝回答';
        console.log('拒绝回答')
        return false;
    },
    deleteProperty: function(target, key) {
        if (key.indexOf('_') === 0) {
            delete target[key];
        }
    }
});

// get()
console.log(proxyS['tel']);
console.log(proxyS.name);
console.log(proxyS.price);

// set()
proxyS.customPrice = 200000;
console.log(proxyS.customPrice);
console.log(star);

// has()
console.log('customPrice' in proxyS); //false
proxyS._test = 'alexis';

// deleteProperty()
delete proxyS.customPrice;
console.log(proxyS.customPrice);
console.log(star._test);
delete proxyS._test
console.log(star._test);

// new Proxy(target, handle) -> handle的方法
// get(target, propKey, receiver): 拦截对象属性的读取，比如 proxy.foo 和 proxy['foo]

// set(target, propKey, value, receiver): 拦截对象属性的设置，比如 proxy.foo = v 或者 proxy['foo'] = v, 返回一个布尔值

// has(target, propKey): 拦截propKey in proxy 的操作， 返回一个布尔值

// deleteProperty(target, propKey): 拦截 delete proxy[propKey]的操作，返回一个布尔值

// ownKeys(target): 拦截 Object.getOwnPropertyNames(proxy); Object.getOwnPropertySymbols(proxy); Object.keys(proxy) : 返回一个数组，该方法返回目标对象所有自身的属性的属性名，而Object.keys()的返回结果仅包括目标对象自身的可遍历属性

// getOwnPropertyDescriptor(target, propKey): 拦截Object.getOwnPropertyDescriptor(proxy, propKey): 返回属性描述对象

// defineProperty(target, propKey, propDesc): 拦截Object.defineProperty(proxy, propKey, propDesc); Object.defineProperties(proxy, propDescs), 返回一个布尔值

// preventExtensions(target): 拦截 Object.preventExtensions(proxy), 返回一个布尔值

// getPrototypeOf(target): 拦截 Object.getPrototypeOf(proxy), 返回一个对象

// isExtensible(target): 拦截 Object.isExtensible(proxy), 返回一个布尔值

// setPortorypeOf(target, proto): 拦截 Object.setPrototypeOf(proxy, proto), 返回一个布尔值，如果目标对象是函数，还有两种额外操作可拦截，

// apply(target, object, args) : 拦截 Proxy 实例作为函数调用操作，比如 proxy(...args), proxy.call(object, ...args), proxy.apply(...)

// construct(target, args): 拦截Proxy 实例作为构造函数调用的操作，比如 new proxy(...args)