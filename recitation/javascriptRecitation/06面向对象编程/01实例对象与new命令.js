/**
 * 对象是什么
 *
 * 对象是一个容器，封装了属性（property）和方法（method）
 */

/**
 * JavaScript 语言使用构造函数（constructor）作为对象的模板。所谓”构造函数”，就是专门用来生成实例对象的函数
 *
 * 构造函数的特点有两个。
 * * 函数体内部使用了this关键字，代表了所要生成的对象实例。
 * * 生成对象的时候，必须使用new命令。
 */

/**
 * new 命令
 *
 * 1. new命令的作用，就是执行构造函数，返回一个实例对象
 *
 * 2. new命令本身就可以执行构造函数，所以后面的构造函数可以带括号，也可以不带括号。
 * 为了表示new可以执行函数,推荐使用括号。
 *
 * 3. 如果忘了使用new命令,构造函数就变成了普通函数，并不会生成实例对象。而且由于函数this默认指向全局对象，this这时代表全局对象，将造成一些意想不到的结果。
 */

// // 4. 为了保证构造函数必须与new命令一起使用，一个解决办法是，构造函数内部使用严格模式，即第一行加上use strict
// // 这样的话，一旦忘了使用new命令，直接调用构造函数就会报错。
// function Fubar(foo, bar) {
//   'use strict';
//   this._foo = foo;
//   this._bar = bar;
// }
// Fubar(); // TypeError: Cannot set property '_foo' of undefined

// // 另一个解决办法，构造函数内部判断是否使用new命令，如果发现没有使用，则直接返回一个实例对象。
// function Fubar(foo, bar) {
//   if (!(this instanceof Fubar)) {
//     return new Fubar(foo, bar);
//   }
//   this._foo = foo;
//   this._bar = bar;
// }
// Fubar(1, 2);

// 5. new 命令的原理
/**
 * 使用new命令时，它后面的函数依次执行下面的步骤。
 * * 1. 创建一个空对象，作为将要返回的对象实例。
 * * 2. 将这个空对象的原型，指向构造函数的prototype属性。
 * * 3. 将这个空对象赋值给函数内部的this关键字。
 * * 4. 开始执行构造函数内部的代码。
 */

// 如果构造函数内部有return语句，而且return后面跟着一个对象，new命令会返回return语句指定的对象；否则，就会不管return语句，返回this对象

// 如果对普通函数（内部没有this关键字的函数）使用new命令，则会返回一个空对象。

// new命令总是返回一个对象，要么是实例对象，要么是return语句指定的对象, 函数的return语句返回的是字符串，所以new命令就忽略了该语句, 直接返回空对象。

// // new 命令的简化代码
// function _new(constructor, parameters) {
//   var args = [].slice.call(arguments);
//   var constructor = args.shift();
//   var context = Object.create(constructor.prototype);
//   var result = constructor.apply(context, args);
//   return typeof result === 'object' && result !== null ? result : context;
// }

// // 6. new.target
// // 函数内部可以使用new.target属性。如果当前函数是new命令调用，new.target指向当前函数，否则为undefined。
// // 使用这个属性，可以判断函数调用的时候，是否使用new命令
// function f() {
//   if (!new.target) {
//     throw new Error('请使用new命令调用函数');
//   }
// }
// f();

/**
 * 7. 函数是否由 new 关键字调用的判断方法
 * * 1. 'use strict'
 * * 2. if(this instanceof Constructor)
 * * 3. if(new.target)
 */
