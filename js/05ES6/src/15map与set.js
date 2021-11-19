// 数据类型
// JavaScript 的数组也是对象 -> js数组的下标是字符串 -> 实时上js的底层在模拟数组 -> 也就是说js没有真正的数组
// 稀疏数组  密集数组

// ======================================

// // Set() -> ES6 新的数据结构 -> 类似数组

// // const set = new Set(); // 成员是唯一的，没有重复的值
// // // 添加数据
// // // 方式1
// // set.add(5);
// // set.add(7);
// // console.log(set);

// // 添加数据 方式2
// // const set = new Set(5, 7);  //TypeError: number 5 is not iterable (cannot read property Symbol(Symbol.iterator))
// // 参数只能是具有iterator接口的数据
// const set = new Set([5, 7]);
// console.log(set); // Set(2) {5, 7}
// // 如果在传5，7, 值不变，因为set中的值是唯一的
// set.add(5);
// set.add(7);
// console.log(set); //Set(2) {5, 7}

// // 值是唯一
// var set = new Set([1, 2, 3, 5, 5, 5, 5]);
// console.log(set); //Set(4) {1, 2, 3, 5}

// 特殊值
// var set = new Set([undefined, undefined, null, null, 5, '5', true, 1, NaN, NaN, {}, {}, [], [], ]);
// ES6 的新增内容中，基本解决了NaN不等于NaN的问题
// console.log(set); // Set(11) {undefined,null,5,'5',true,1,NaN,object,object, Array(0), Array(0)}

// Set.prototype 方法 -》 遍历方法，操作数据结构本身的方法

// // add() -> 添加值，返回的是set结构本身
// set = new Set();
// var x = { id: 1 },
//     y = { id: 2 };
// // console.log(set.add(x)); //Set(1) {{…}} -> 返回的是set,所以可以链式调用
// var setNew = set.add(x).add(y).add(x);
// console.log(set); //Set(2) {{…}, {…}} -> 值不重复，所以最后一个add(x)无用
// // console.log(set === setNew); //true //add()返回的是set本身

// // size -> 相当于数组的length -> 元素的数量
// console.log(set.size); //2

// // delete -> 删除元素 -> 返回boolean值，删除成功 true, 否则false
// // delete()中传入的值要与set中的值全等才能删除
// console.log(set.delete(y)); //true
// console.log(set.delete({ id: 1 })); // false
// // delete set[0]; // delete无效
// console.log(set); //Set(1) {{…}}

// // //clear() -> 清空所有的值  -> 返回undefined
// // set.clear();
// // console.log(set); //Set(0) {}

// // has() -> 判断是否有某值 -> 返回boolean值
// console.log(set.has(x));

// // //delete 在对象的使用
// // var obj = {
// //     a: 'jayden',
// //     b: 'alexis'
// // }
// // // delete obj['a'];
// // delete obj.a
// // console.log(obj); // {b: 'alexis}

// set.prototype 对值得操作都是对本身在操作 -> 后面的操作会影响整个set
// // 示例1
// var set = new Set();
// console.log(set); //0: "jayden" 1: "alexis", size:2

// set.add('jayden');
// set.add('alexis');

// // 示例2
// var set = new Set([{ a: 1, b: 2 }]);
// console.log(set); // No properties, size: 0
// set.clear();

// // 示例3
// var x = { a: 1 },
//     y = { b: 2 };
// var set = new Set([x, y]);
// console.log(set); //[[Entries]] 0: value: {b: 2} size: 1
// set.delete(x);
// // set.delete(),引用值的话必须引用相等才能删除

// delete set['[[Entries]]'][0];

// ======================================
// // Set.protoype 遍历的方法
// // keys() values() entries()  都返回一个迭代器对象
// var set = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);
// console.log(set);
// // console.log(set.keys());
// // console.log(set.values());
// // console.log(set.entries());

// for (let i of set.keys()) {
//     console.log(i); // a b c d e f g h
// }
// for (let i of set.values()) {
//     console.log(i); // a b c d e f g h
// }
// for (let i of set.entries()) {
//     console.log(i); //["a", "a"]["b", "b"]["c", "c"]["d", "d"]["e", "e"]["f", "f"]["g", "g"]["h", "h"]
// }
// // 总结： Set数据结构没有键名, 所以keys() 和 values 的值是一样的

// // Set实例化出来的对象本身也有[Symbol.iterator]接口,也可以用for...of遍历

// for (let values of set) {
//     console.log(values); // a b c d e f g h
// }

// // 原型的迭代方法 === 原型的values() 和 keys() 方法
// console.log(Set.prototype[Symbol.iterator] === Set.prototype.values); // true
// console.log(Set.prototype[Symbol.iterator] === Set.prototype.keys); // true
// console.log(Set.prototype[Symbol.iterator] === Set.prototype.entries); // false


// forEach() 
// var set = new Set(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']);

// // ES5写法
// set.forEach(function(value, key, set) {
//     console.log(value, key, set)
// });

// // ES6 写法
// set.forEach((value, key, set) => console.log(value, key, set));
// 结果：
// a a Set(8) {"a", "b", "c", "d", "e", …}
// b b Set(8) {"a", "b", "c", "d", "e", …}
// c c Set(8) {"a", "b", "c", "d", "e", …}
// d d Set(8) {"a", "b", "c", "d", "e", …}
// e e Set(8) {"a", "b", "c", "d", "e", …}
// f f Set(8) {"a", "b", "c", "d", "e", …}
// g g Set(8) {"a", "b", "c", "d", "e", …}
// h h Set(8) {"a", "b", "c", "d", "e", …}

// // 拓展
// // 通过拓展运算符将set转换为array
// console.log([...set]); //(8) ["a", "b", "c", "d", "e", "f", "g", "h"]

// // 与 map 使用
// let set = new Set([1, 2, 3, 5, 6, 7, 8, 9]);

// let set1 = new Set([...set].map(value => value * 2));
// console.log(set1); //Set(8) {2, 4, 6, 10, 12, …}

// // set 的 parseInt
// let set = new Set([1, 2, 3, 5, 6, 7, 8, 9]);
// let set1 = new Set([ // parseInt(2,2)...
//     [...set].map(parseInt)
// ]);
// let set2 = new Set([...set].map(parseInt));

// console.log(set1); //Set(1) {Array(8)} -> [][1, NaN, NaN, NaN, NaN, NaN, NaN, NaN]

// console.log(set2); //Set(2) {1, NaN}

// arr 的parseInt
// var arr = [1, 2, 3, 5];
// var arr1 = arr.map(parseInt);
// console.log(arr1); //(4) [1, NaN, NaN, NaN]
// console.log("==============================")
//     // 为什么是上面的值
// console.log(parseInt(1, 0)); // 1
// console.log(parseInt(2, 1)); // NaN
// console.log(parseInt(3, 2)); // NaN
// console.log(parseInt(4, 3)); // NaN


// // set与arr.filter
// let set = new Set([1, 2, 3, 5, 6, 7, 8, 9]);

// let set2 = new Set([...set].filter(value => (value % 2) == 0));
// console.log(set2); //Set(3) {2, 6, 8}

// ======================================

// // set 的常用情况： 交集，并集，差集

// let a = new Set([1, 2, 5]);
// let b = new Set([5, 3, 2]);

// // 并集
// let union = new Set([...a, ...b]);
// console.log(union); //Set(5) {1, 2, 4, 5, 3}

// // 交集
// let intersect = new Set([...a].filter(x => b.has(x)));
// console.log(intersect); //Set(2) {2, 5}

// // 差集
// let difference = new Set([...a].filter(x => !b.has(x)));
// console.log(difference); // Set(1) {1}

// // 映射出一个新的set解构
// let set = new Set([1, 2, 3]);
// let set1 = new Set(Array.from(set, value => value * 2));
// console.log(set1); //Set(3) {2, 4, 6}

// ======================================

// Map() -> ES6 新的数据机构 -> 类似对象 -> 可以让key是一个对象，实现对象与对象 key => value 的对应

// // 原始的obj作为键名
// var m = {};
// var x = { id: 1 },
//     y = { id: 2 };
// m[x] = 'jayden';
// m[y] = 'alexis';

// console.log(m); // {[object Object]: "alexis"}
// console.log(m[x]); // aleixs
// console.log(m[y]); // aleixs

// // Map() -> 键名可以是对象
// let m = new Map();
// var x = { id: 1 },
//     y = { id: 2 };

// m.set(x, 'jayden');
// m.set(y, 'alexis');

// console.log(m); //Map(2) {{…} => "jayden", {…} => "alexis"}
// console.log(m.get(x)); // jayden
// console.log(m.get(y)); // alexis

// // Map() 参数
// //1. 具备iterator接口的数据结构
// //2. 具有双元的数据结构
// let m = new Map([
//     ['name1', 'jayden'],
//     ['name2', 'alexis']
// ])

// // 和set一样，都是在m上作用，所以后面的执行影响到前面输出
// console.log(m); //Map(2) {"name1" => "foxxx", "name2" => "white"}

// m.set('name1', 'foxxx');
// m.set('name2', 'white');

// console.log(m); //Map(2) {"name1" => "foxxx", "name2" => "white"}

// // 模拟Map给参数的方式
// var items = [
//     ['name1', 'jayden'],
//     ['name2', 'alexis']
// ];
// let m = new Map();
// // items.forEach((key, value) => m.set(key, value)); // 错误
// // items.forEach((value) => m.set(value[0], value[1])); //方法1
// items.forEach(([key, value]) => m.set(key, value)); //方法2
// console.log(m); // Map(2) {"name1" => "jayden", "name2" => "alexis"}

// // 键名相同会覆盖
// const map = new Map();
// map.set(1, 'jayden');
// map.set(1, 'alexis');
// console.log(map); // Map(1) {1 => "alexis"}

// // get() 通过键名获取值
// const map = new Map();
// map.set(1, 'jayden');
// map.set(1, 'alexis');
// console.log(map.get(1)); //alexis

// map.set([5], 555);
// console.log(map.get([5])); //undefined 两个[5] 的地址映射不一样(指针不一样)
// // 如何能有用，将地址映射存入一个变量中
// var add = [5];
// map.set(add, 555);
// console.log(map.get(add)); //555

// // 一些特殊值
// const map = new Map();
// map.set(-0, 123);
// console.log(map.get(0)); // 123 -> +0 === -0

// console.log(+0 === -0); // true
// console.log(Object.is(+0, -0)); //false

// map.set(true, 666);
// map.set('true', 333);
// console.log(map.get(true)); // 666
// console.log(map.get('true')); // 333

// map.set(undefined, 1);
// map.set(null, 2);
// console.log(map.get(undefined)); // 1
// console.log(map.get(null)); // 2 undefined !== null

// map.set(NaN, 888);
// console.log(map.get(NaN)); // 888

// console.log(NaN === NaN); // false
// console.log(Object.is(NaN, NaN)); // true

// ======================================

// // Map.prototype 的方法 就比Set 多了 set() 和 get()
// // console.log(Map.prototype);
// // 操作值得方法
// const m = new Map();
// var x = { id: 1 },
//     y = { id: 2 }

// m.set(x, 'jayden');
// m.set(y, 'aleixs');

// console.log(m.delete(x)); //true

// console.log(m.clear(x)); //undefined

// m.set(x, 'jayden').set(y, 'alexis');

// console.log(m.has(x)); // true

// console.log(m.set('hi', 'foxxx')); // m -> 可以链式调用

// // Map.prototype 的 遍历方法
// // keys(), values(), entries()

// const m = new Map();
// let x = { id: 1 },
//     y = { id: 2 },
//     z = { id: 3 };

// m.set(x, 'jayden').set(y, 'alexis').set(z, 'foxxx');

// // console.log(m.keys()); // keys() values() entries() 返回一个有迭代接口的对象
// for (let key of m.keys()) {
//     console.log(key) // {id: 1} {id: 2} {id: 3}
// }

// for (let value of m.values()) {
//     console.log(value); // jayden, alexis, foxxx
// }

// for (let i of m.entries()) {
//     console.log(i); //(2) [{…}, "jayden"] (2) [{…}, "alexis"] (2) [{…}, "foxxx"]
// }

// for (let i of m) {
//     console.log(i); ////(2) [{…}, "jayden"] (2) [{…}, "alexis"] (2) [{…}, "foxxx"]
// }

// console.log(Map.prototype[Symbol.iterator] === Map.prototype.entries); //true

// // Map.protoype.forEach()
// m.forEach((value, key) => console.log(key + ' => ' + value)); //[object Object] => jayden, [object Object] => alexis, [object Object] => foxxx

// ======================================

// 兼容情况
// // 以下四种是ES6新增的构造器，也是新增的API，这4个语法无法通过balbel实现降级
// // node 都可以支持
// // 浏览器也大部分可以支持，如果需要则查看支持情况
// // 如果遇到一定要降级为ES5或者之前的版本，则需要安装魄力菲尔插件
// const map = new Map();
// const set = new Set();
// const p = new Promise();
// const px = new Proxy();

// ======================================
// 数组方法 reduce foreach filter map