/**
 * 原型深入
 * 每一个原型都是一个实例
 */

// function Car() {}

// var car = new Car();
// console.log(Car.prototype); // constructor  __proto__
// console.log(car); // __proto__


// // 原型链
// // 沿着__proto__去找原型而形成的前后关系，称为原型链
// Professor.prototype.tSkill = 'Java';

// function Professor() {}

// var professor = new Professor();

// Teacher.prototype = professor;

// function Teacher() {
//     this.mSkill = 'JS/JQ';
// }
// var teacher = new Teacher();

// Student.prototype = teacher;

// function Student() {
//     this.pSkill = 'HTML/CSS';
// }
// var student = new Student();

// console.log(student);
// console.log(student.pSkill); // HTML/CSS
// console.log(student.mSkill); // JS/QS
// console.log(student.tSkill); //Java

// 原型链的顶端是Object.prototype
// Object.prototype 里有一个 toString()的方法


// ==============================================
// // 原型链的产生
// function Professor() {
//     this.name = 'adi';
// }

// // Professor 只是定义并没有执行，为什么已经有prototype属性了
// // 预编译的时候加上去的吗？
// console.log(Professor);
// console.log(Professor.prototype);

// // 下面语句是否说明构造函数的原型其实是个实例；
// // 这个实例是什么时候产生的呢？
// // 如果是实例的话，是否可以抛弃构造函数，实现原型链
// // 是否可以使用__proto__来对原型进行增删改
// console.log(Professor.prototype.prototype); //undefined
// console.log(Professor.prototype.__proto__);


// console.log(Professor.prototype.__proto__.prototype); // undefined

// // 为什么下面语句输出的是null
// console.log(Professor.prototype.__proto__.__proto__); // null

// var professor = new Professor();
// console.log(professor.age); // undefined



// ==============================================
// // 原型链的增删改
// Professor.prototype.tSkill = 'Java';

// function Professor() {
//     this.pnum = 10;
//     this.pbj = {
//         name: 'jack',
//         height: 175
//     }
// }
// var professor = new Professor();

// Teacher.prototype = professor;

// function Teacher() {
//     this.tnum = 20;
//     this.mSkill = 'JS/JQ';
//     this.tbj = {
//         name: 'jay',
//         age: 18
//     }
// }
// var teacher = new Teacher();

// Students.prototype = teacher;

// function Students() {
//     this.snum = 30;
//     this.pSkill = "HTML/CSS";
//     this.sbj = {
//         name: 'jayden',
//         add: 'gz'
//     }
// }
// Students.favrite = 'wuli';

// var student = new Students();

// // 1. 实例无法增删改 原型的属性，无论属性是基本类型还是引用类型
// // 2. 所有实例对原型属性或者方法的增删改其实是自己实例增加了这个属性
// // 3. 实例属性与原型属性同名的话，实例只能访问自身属性 
// student.tnum++; // 相当于 student.tnum = student.tnum + 1;
// console.log(student);

// student["pnum"] += 100;
// console.log(student);

// student.pobj++;
// console.log(student); // NaN

// student["pbj"] = 'wb';
// student.tbj = {
//     like: 'eat',
//     study: 'hard'
// }

// //特例：实例可以增删改查原型 引用属性 的 属性 如下：
// student.pbj.food = 'fish';
// delete student.pbj.height;
// student.pbj.drink = 'cole';

// console.log(student);


// ==============================================
// // 拓展，引用值永远显示最后状态
// var obj = {
//     b: 5,
//     c: 6,
//     d: 7
// };
// console.log(obj.a); // undefined
// console.log(obj); // {5,6,7},点开旁边的三角后变成{3，5，6, 7}

// obj.a = 3;
// console.log(obj.a); // 3
// console.log(obj); // {3,5,6,7}


// // 测试题
// // 1 最终输出的this.brand是谁
// function Car() {
//     this.brand = 'Benz';
// }

// Car.prototype = {
//     brand: 'mazda',
//     intro: function() {
//         console.log('我是' + this.brand + '车');
//     }
// }

// var car = new Car();
// car.intro(); // Benz 调用时，this是指向car这个实例的
// // 想打印出mazda怎么办
// Car.prototype.intro();// Mazda


// //2 最终打印的是什么
// // 如果不写return，构造函数返回的是this，普通函数返回的是undefined
// function Person() {
//     this.smoke = function() {
//         this.weight--;
//         // 系统自动加上return 返回的是undefined
//     }
// }

// Person.prototype = {
//     weight: 130
// }

// var person = new Person();
// person.smoke(); // undefined
// console.log(person); // person.weight == 129, Person.prototype.weight == 130;


// // 3  
// // 前两种声明方式无区别，公司一般不使用第二种声明方式
// // 前两种声明方式都直接生成对象，他们的原型都是原型链顶端的原型 Object.prototype
// // 尽量使用字面量方式来声明对象；
// // 制作插件时使用构造函数
// var obj1 = {
//     name: 'jay'
// };
// console.log(obj1);

// var obj2 = new Object();
// obj2.name = 'jay';
// console.log(obj2);

// function Obj(){}
// var obj3 = new Obj();
// console.log(obj3);


// // 4 原型的终点一定是系统定义的Object.prototype;
// function Test() {}
// var obj = new Obj();

// console.log(obj.__proto__); //Test.prototype
// console.log(obj.__proto__.__proto__); //Object.prototype



// ==============================================
// //Object.create() 方法 -> 自定义对象的原型
// //参数只能是 对象 或者 null
// var test = {
//     num: 2
// }

// function Obj() {}
// Obj.prototype.num = 1;
// // Object.create(Obj.prototype) 效果与 New Obj() 一样
// var obj1 = Object.create(Obj.prototype);
// var obj2 = new Obj();
// console.log(obj1);
// console.log(obj2);
// console.log(Obj.prototype);


// // new做了什么
// // 1. 实例化obj2
// // 2. 调用构造函数Obj的初始化属性和方法
// // 3. 指定实例对象的原型
// var test = {
//     num: 2
// }

// var obj1 = Object.create(test);

// function Obj() {}
// Obj.prototype.num = 1;
// var obj2 = new Obj();
// console.log(obj1);
// console.log(obj2);


// // Object.create() 做了什么
// // 创建一个空对象，让这个空对象的原型 == 参数
// // 如果参数为null,则是创建一个空对象
// var obj1 = Object.create(null); //创建空对象,创建出的空对象无任何属性，__proto__都没有
// console.log(obj1); //{}, no properties

// obj1.num = 1;
// var obj2 = Object.create(obj1);

// // {
// //     __proto__:
// //         num:1
// // }
// console.log(obj2);

// // 示例
// // obj1 被重新赋值-> 成为__proto__属性=obj2 的新对象
// var obj1 = {
//     name: 'jay'
// }

// var obj2 = {};
// obj2.num = 2;

// obj1 = Object.create(obj2);
// console.log(obj1)


// // 不是所有的对象都继承与Object.prototype.
// var obj = Object.create(null); // 这样创建出的对象就不继承Object.prototype
// console.log(obj.toString()); // 报错，无该方法

// obj.num = 1

// var obj1 = {
//     count: 2
// }
// // 自己定义的__proto__属性不能直接访问，需要系统定义
// obj.__proto__ = obj1;
// console.log(obj.count) // undefined
// console.log(obj.__proto__.count); //undefined


// // undefined 和 null 能不能使用toString 方法
// // 原始值是没有属性的
// // undefined 和 null 没有包装类
// console.log(null.toString); // error
// console.log(undefined.toString); // error

// // 为什么num又可以使用toString 呢？
// // 包装类
// var num = 1;
// console.log(num.toString); // '1'


// var num = 1;
// var obj1 = {};
// var obj2 = Object.create(null); // 没有继承Object.prototype, 没有toString方法
// //document.write() 肯定会把传入的值隐式转换为字符串
// document.write(num);
// document.write(obj1);

// // 不能转换为原始值,因为obj2 没有toString 方法
// document.write(obj2); // TypeError: Cannot convert object to primitive value

// // 下面方法可以让obj2进行输出，但是还做不到隐式转换
// // 下面的语句只能插入到html的最后面, 因为一步加载的js是不允许使用document.write()方法的
// obj2.toString = function() {
//     return '你好';
// }
// console.log(obj2.toString());
// document.write(obj2.toString());



// ==============================================
// // 方法的重写
// // 系统内部的构造函数都有toString方法

// // 系统内部重写
// // Number.prototype的toString 重写了Object.prototype的toString
// console.log(Object.prototype.toString.call(1)); // [Object Number]
// console.log(Number.prototype.toString.call(1)); // 1

// // Array.prototype的toString 重写了Object.prototype的toString
// console.log(Object.prototype.toString.call([1, 2, 3])); // [Object Number]
// console.log(Array.prototype.toString.call([1, 2, 3])); // 1,2,3


// ==============================================
// // // call() 和 apply()  必考内容
// // // call() 和 apply() 就是更改this的指向，让其指向第一个参数
// // function test() {
// //     console.log('a');
// // }

// // test(); // a ,系统隐式的添加了.call(); test() == test.call();
// // test.call(); // a

// function Car(brand, color) {
//     this.brand = brand;
//     this.color = color;
//     this.run = function() {
//         console.log('running')
//     }
// }
// var newCar = {};
// // call 更改了this的指向，指向了newCar, 让newCar获得了Car的属性和方法
// Car.call(newCar, 'Benz', 'red');
// console.log(newCar);

// var newCar2 = {};
// // apply() 与 call()的用法相同，只是参数写法不同；
// Car.apply(newCar2, ['Benz', 'red']);
// console.log(newCar2);


// //案例 1 让Fullcompute 获得 加 减 法
// function Computer() {
//     this.plus = function(a, b) {
//         console.log(a + b);
//     }
//     this.minus = function(a, b) {
//         console.log(a - b);
//     }
// }

// function FullCompute() {
//     Computer.apply(this)
//     this.mul = function(a, b) {
//         console.log(a * b);
//     }

//     this.div = function(a, b) {
//         console.log(a / b);
//     }
// }

// var compute = new FullCompute();
// compute.plus(1, 2);
// compute.minus(1, 2);
// compute.mul(1, 2);
// compute.div(1, 2);


// // ==============================================
// // constructor():
// function Test() {
//     this.furit = 'apple';
// }

// var test = new Test();
// // 1. 如果构造函数的prototype属性是默认情况，创建对象时，对象__proto__属性中会有constructor()方法
// console.log(test);

// function Tes() {
//     this.food = 'beef';
// }
// // 2. 若果构造函数的prototype属性= 某个实例， 创建对象时，对象的__proto__属性没有constructor()方法
// //    被继承的最上级的实例才有constructor()方法
// Tes.prototype = test;
// var tes = new Tes();
// console.log(tes);

// // 3. 构造函数的prototype可以= 任何引用值
// function Test2() {
//     this.game = 'doudizhu'
// }

// // Test2.prototype = [1, 2, 3, 4, 5];
// var test2 = new Test2();
// console.log(test2);


// // 4. 让构造函数的prototype属性 = 基本数据类型
// //    实例的原型 = Object.prototype
// function Test3() {
//     this.machine = 'PS5'
// }
// Test3.prototype = 3;
// console.log(Test3.prototype); // 3
// var test3 = new Test3();
// console.log(test3); //{} 原型是Object.prototype


// // 5. 让构造函数的原型 = 空对象，不影响实例的原型链关系
// var base = Object.create(null);

// function Test4() {
//     this.color = 'pink';
// }
// Test4.prototype = base;
// var test4 = new Test4();
// console.log(test4); // 原型是Object.prototype


// //6. 每个函数(不限于构造函数)都有一个constructor()构造器，和__proto__ 属性
// //   构造器中都有prototype属性
// function test5() {
//     var a = 2;
//     return a * 2 + 3;
// }
// console.log(test5.prototype);

// console.log('==========================================================')

// var test6 = function() {
//     var b = 3;
//     return b++;
// }
// console.log(test6.prototype);


// ==============================================
// 作业
// 年龄未多少岁姓名为XX 买了一辆排量为XX的什么颜色的什么牌子的车
// 要求用两个构造函数来完成