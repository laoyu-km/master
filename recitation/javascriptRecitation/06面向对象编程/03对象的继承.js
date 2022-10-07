// 对象的继承

/**
 * prototype 属性
 *
 * 1. 每个函数都有一个prototype属性，指向一个对象
 * 2. 对于普通函数来说，该属性基本无用。但是，对于构造函数来说，生成实例的时候，该属性会自动成为实例对象的原型
 * 3. 原型对象的属性不是实例对象自身的属性。只要修改原型对象，变动就立刻会体现在所有实例对象上
 * 4. 如果实例对象自身就有某个属性或方法，它就不会再去原型对象寻找这个属性或方法。
 * 5. 原型对象的作用，就是定义所有实例对象共享的属性和方法
 */

/**
 * 原型链
 *
 * 1. 所有对象都有自己的原型对象（prototype）。一方面，任何一个对象，都可以充当其他对象的原型；另一方面，由于原型对象也是对象，所以它也有自己的原型。因此，就会形成一个“原型链”
 * 2. 所有对象的原型最终都可以上溯到Object.prototype，即Object构造函数的prototype属性
 * 3. Object.prototype的原型是null。null没有任何属性和方法，也没有自己的原型。因此，原型链的尽头就是null
 * 4. 一级级向上，在整个原型链上寻找某个属性，对性能是有影响的。所寻找的属性在越上层的原型对象，对性能的影响越大。如果寻找某个不存在的属性，将会遍历整个原型链
 */

/**
 * constructor
 *
 * 1. prototype对象有一个constructor属性，默认指向prototype对象所在的构造函数
 * 2. 由于constructor属性定义在prototype对象上面，意味着可以被所有实例对象继承
 * 3. constructor属性的作用是，可以得知某个实例对象，到底是哪一个构造函数产生的
 * 4. 有了constructor属性，就可以从一个实例对象新建另一个实例
 * 5. constructor属性表示原型对象与构造函数之间的关联关系，如果修改了原型对象，一般会同时修改constructor属性，防止引用的时候出错
 * 6. 修改原型对象时，一般要同时修改constructor属性的指向
 * 7. 如果不能确定constructor属性是什么函数，还有一个办法：通过name属性，从实例得到构造函数的名称
 */

/**
 * instanceof 运算符
 *
 * 1. instanceof运算符返回一个布尔值，表示对象是否为某个构造函数的实例
 * 2. arr instanceof Array === Array.prototype.isPrototypeOf(arr);
 * 3. 由于instanceof检查整个原型链，因此同一个实例对象，可能会对多个构造函数都返回true
 * 4. 由于任意对象（除了null）都是Object的实例，所以instanceof运算符可以判断一个值是否为非null的对象
 * 5. instanceof的原理是检查右边构造函数的prototype属性，是否在左边对象的原型链上
 * 6. instanceof 失真 -> var obj = Object.create(null); obj instanceof Object // fasle -> 唯一会失真
 * 7. instanceof 判断值类型 -> x instanceof Array || x instancof Date
 * 8. instanceof运算符只能用于对象，不适用原始类型的值
 * 9. 用instanceof运算符，还可以巧妙地解决，调用构造函数时，忘了加new命令的问题
 */

// // 调用构造函数时，忘了加new命令的问题
// function Fun(foo, bar) {
//   if (this instanceof Fun) {
//     this._foo = foo;
//     this._bar = bar;
//   } else {
//     return new Fun(foo, bar);
//   }
// }

/**
 * 构造函数的继承
 */

// // 方法1.
// function Father() {
//   this.name = 'jayden';
// }

// // // 第一步是在子类的构造函数中，调用父类的构造函数
// function Son() {
//   // 方式 1
//   Father.call(this);

//   // // 方式 2  -> 不建议，子类中多出一个属性 fa
//   // this.fa = Father;
//   // this.fa();
//   // this.sex = 'female';
// }
// // 第二步，是让子类的原型指向父类的原型，这样子类就可以继承父类原型
// Son.prototype = Object.create(Father.prototype);
// Son.prototype.constructor = Son;
// Son.prototype.method = function () {};

// var son = new Son();
// console.log(son);
// console.log(son instanceof Son);

// // // 方法二 不推荐
// // // 子类的prototype 等于一个父类的实例
// // function Father() {
// //   this.name = 'jayden';
// // }

// // function Son() {
// //   this.sex = 'female';
// // }

// // Son.prototype = new Father();

// // 子类是整体继承父类。有时只需要单个方法的继承，这时可以采用下面的写法。
// function classA() {
//   this.name = 'jadyen';
// }
// classA.prototype.print = function () {
//   console.log('a: ', this.name);
// };

// function classB() {
//   this.name = 'alexis';
// }
// classB.prototype.print = function () {
//   classA.prototype.print.call(this);
//   console.log('do other things');
// };

// var b = new classB();
// console.log(b.print());

/**
 * 多重继承
 */

// // JavaScript 不提供多重继承功能，即不允许一个对象同时继承多个对象。但是，可以通过变通方法，实现这个功能。
// function F1() {
//   this.hello = 'hello';
// }
// F1.prototype.fnF1 = function () {
//   console.log(this.hello);
// };

// function F2() {
//   this.world = 'world';
// }

// F2.prototype.fnF2 = function () {
//   console.log(this.world);
// };

// function S() {
//   F1.call(this);
//   F2.call(this);
// }

// S.prototype = Object.create(F1.prototype);
// // // 方法1, 不推荐
// // for (k in F2.prototype) {
// //   S.prototype[k] = F2.prototype[k];
// // }

// // 方法2 推荐
// Object.assign(S.prototype, F2.prototype);

// var s = new S();

// console.log(s.fnF2());

/**
 * 模块化
 */

// 1. 简单的做法是把模块写成一个对象,所有的模块成员都放到这个对象里面。
// 这样的写法会暴露所有模块成员，内部状态可以被外部改写

// 2. 封装私有变量：构造函数的写法
// 这意味着，构造函数有双重作用，既用来塑造实例对象，又用来保存实例对象的数据，违背了构造函数与实例对象在数据上相分离的原则（即实例对象的数据，不应该保存在实例对象以外）。同时，非常耗费内存

// 3. 封装私有变量：立即执行函数的写法 -> Immediately-Invoked Function Expression，IIFE
// 推荐

// // 模块的放大模式
// // 如果一个模块很大，必须分成几个部分，或者一个模块需要继承另一个模块，这时就有必要采用“放大模式”
// var module1 = (function (mod) {
//   mod.m3 = function () {
//     //...
//   };
//   return mod;
// })(module1);

// // 模块宽放大模式
// // 在浏览器环境中，模块的各个部分通常都是从网上获取的，有时无法知道哪个部分会先加载。如果采用上面的写法，第一个执行的部分有可能加载一个不存在空对象，这时就要采用"宽放大模式"（Loose augmentation）
// var module1 = (function (mod) {
//   //...
//   return mod;
// })(module1 || {});

// // 输入全局变量
// var module1 = (function ($, window) {
//   //...
// })(jQuery, window);

// // 立即执行函数还可以起到命名空间的作用
// // 下面代码中，finalCarousel对象输出到全局，对外暴露init和destroy接口，内部方法go、handleEvents、initialize、dieCarouselDie都是外部无法调用的
// (function ($, window, document) {
//   function go() {}
//   function handleEvents() {}
//   function initialize() {}
//   function render() {}
//   function dieCarouselDie() {}

//   // 返回给全局
//   window.finalCarousel = {
//     init: initialize,
//     destroy: dieCarouselDie,
//   };
// })(jQuery, window, document);
