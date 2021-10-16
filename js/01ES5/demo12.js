// // 原型 -> 继承
// // 不完美继承，情况 1
// Professor.prototype = {
//     name: 'jay',
//     pSkill: 'Java'
// }

// function Professor() {}

// var professor = new Professor();

// Teacher.prototype = professor;

// function Teacher() {
//     this.name = 'ale',
//         this.tSkill = 'JS/JQ'
// }

// var teacher = new Teacher();
// // 原型链的继承关系，让teacher可以访问到pSkill
// // 所谓对应关系就是实例对象中的__proto__属性存储了原型对象
// // 由于原型都是对象，所以一级套一级就得到了原型的属性
// // 自己写可以显示的实现这个功能，但是系统是隐式实现的
// // 如何隐式实现还不知道？？？
// console.log(teacher.pSkill); // 'Java'


// // 不完美继承，情况 2
// // 原型链的继承是将前辈的所有属性和方法继承，如果只是继承部分属性或者方法应该怎么办？
// // call() 或者 apply()
// // call() 和 apply() 都是属于函数的方法
// function Teacher(name, mSkill) {
//     this.name = name;
//     this.mSkill = mSkill;
// }
// Teacher.prototype.wife = 'ale';

// function Student(name, mSkill, age, major) {
//     // call 和 apply是借用其他对象属性或方法的时候来使用
//     // call 和 apply 不能让新建对象继承Teacher的prototype
//     Teacher.apply(this, [name, mSkill]);
//     this.age = age;
//     this.major = major;
// }

// var student = new Student(
//     'jay', 'JS/JQ', 18, 'Computer'
// );

// console.log(student);
// // student不能访问Teacher.prototype的name属性
// console.log(student.wife);


// // 不完美继承，情况 3
// function Teacher() {
//     this.name = 'jay';
//     this.tSkill = 'JAVA';
// }

// Teacher.prototype = {
//     pSkill: 'JS/JQ'
// }

// var t = new Teacher();
// console.log(t);

// function Student() {
//     this.name = 'adi';
// }
// // 想让student继承teacher
// Student.prototype = Teacher.prototype;
// Student.prototype.age = 18; // 修改了公共原型，让Teacher和Student的prototype都更改了，不合理

// var s = new Student;
// console.log(s);


// // 圣杯模式
// // 完美继承的办法, 企业级的方法
// function Teacher() {
//     this.name = 'jay';
//     this.tSkill = 'JAVA';
// }

// Teacher.prototype = {
//     pSkill: 'JS/JQ'
// }

// var t = new Teacher();
// console.log(t);

// function Student() {
//     this.name = 'fox';
// }

// // 通过新建一个空的构造函数，让构造函数的prototype == Teacher的prtotype
// // 实例化一个buffer，让Student的prototype属性 == buffer
// // 这样操作Student的prototype属性是无法影响到Teacher.prototype的
// // 操作Student.prototype影响的是BUffer的实例buffer
// // 通过这个方法让Student即继承了Teacher.prototype的属性和方法，又避免继承Teacher的属性和方法
// // 实现了完美继承
// function Buffer() {}
// Buffer.prototype = Teacher.prototype;
// var buffer = new Buffer();
// Student.prototype = buffer;

// // 这里修改了Student.prototype的属性，但是对Teacher.prototype是没有影响的
// // 影响的是buffer的属性
// Student.prototype.age = 18;

// var s = new Student();
// console.log(s);


// // 圣杯模式封装
// // 增加构造函数和继承源来完善继承
// function Teacher() {}

// function Student() {}

// inherit(Student, Teacher);

// var s = new Student();
// var t = new Teacher;


// function inherit(Target, Origin) {
//     function Buffer() {}
//     Buffer.prototype = Origin.prototype;
//     Target.prototype = new Buffer();

//     // 上面语句和下面语句的语句顺序不能颠倒
//     // 指定Target的构造器为Target
//     Target.prototype.constructor = Target;
//     // 指定Target的继承源为 Origin
//     Target.prototype.super_class = Origin;
// }



// =================================================
// // 普通闭包
// function test() {
//     // num成为add()的私有变量
//     var num = 0;// 私有变量

//     function add() {
//         num++;
//         console.log(num);
//     }

//     return add;
// }

// var add = test();

// add();
// add();
// add();

// // 对象闭包
// function test() {
//     var num = 0; //私有变量
//     var compute = {
//         add: function() {
//             num++;
//             console.log(num);
//         },

//         minus: function() {
//             num--;
//             console.log(num);
//         }
//     }
//     return compute;
// }

// var compute = test;
// compute.add();
// compute.add();
// compute.add();
// cumpute.minus();


// // 构造函数闭包
// function Compute() {
//     var num = 0;

//     this.add = function() {
//         num++;
//         console.log(num);
//     }
//     this.minus = function() {
//         num--;
//         console.log(num);
//     }

//     // 构造函数return： 最好不写
//     // 1. 系统默认为构造函数添加 return this;
//     // 2. renturn 基本类型，不影响 return this，原因未知
//     // 3. return 引用类型，结果为return的这个应用类型，不return this 

//     // return 基本类型
//     // return 123;//不影响
//     // return unknow; // 为定义变量 结果为：Uncaught ReferenceError: defined is not defined 
//     // return defined; //Uncaught ReferenceError: defined is not defined 
//     // return null; //不影响
//     // return true;//不影响

//     // return 引用类型
//     // return {} //console.log(compute) == {}
//     // return [] //console.log(compute) == {}
//     // return function() {} //console.log(compute) == {}
// }
// var compute = new compute();
// compute.add();
// compute.add();
// compute.add();
// compute.minus();


// // 圣杯模式闭包 企业级写法,模块化开发
// var inherit = (function test() {
//     var Buffer = function() {}

//     return function(Target, Origin) {
//         Buffer.prototype = Origin.prototype;
//         Target.prototype = new Buffer();
//         Target.prototype.constructor = Target;
//         Target.prototype.super_class = Origin;
//         Buffer = 123;
//         console.log(Buffer);
//     }
// })();

// Teacher.prototype.name = 'wang';

// function Teacher() {};

// function Student() {};

// inherit(Student, Teacher);
// var s = new Student();
// var t = new Teacher();
// console.log(s);
// console.log(t);

// // Buffer成为了inherit的私有变量，改变Buffer，程序报错，如下：
// function Aleixs() {
//     this.name = 'Alexis';
// }

// function Jayden() {
//     this.name = 'Jayden';
// }

// // 报错中断：Uncaught TypeError: Buffer is not a constructor
// inherit(Jayden, Aleixs);
// var jayden = new Jayden();
// var aleixs = new Aleixs();
// console.log(jayden);
// console.log(aleixs);



// // 实例1， 模块化开发
// // 创建自有作用域，防止全局变量污染
// var inherit = (function() {
//     var Buffer = function() {}

//     return function(Target, Origin) {
//         Buffer.prototype = Origin.prototype;
//         Target.prototype = new Buffer();
//         Target.prototype.constructor = Target;
//         Target.prototype.super_class = Origin;
//     }
// })();

// var initProgrammer = (function() {
//     var Programmer = function() {}
//     Programmer.prototype = {
//         name: '程序员',
//         tool: '计算机',
//         work: '编写应用程序',
//         duration: '10个小时',
//         say: function() {
//             console.log('我是一名' + this.myName + this.name + ', 我的工作是用' + this.tool + this.work + ', 我每天工作' + this.duration + ', 我的工作需要用到' + this.lang.toString() + '。')
//         }
//     }

//     function FrontEnd() {}

//     function BackEnd() {}

//     inherit(FrontEnd, Programmer);
//     inherit(BackEnd, Programmer);

//     FrontEnd.prototype.lang = ['HTML', 'CSS', 'JavaScript'];
//     FrontEnd.prototype.myName = '前端';
//     BackEnd.prototype.lang = ['Node', 'Java', 'SQL'];
//     BackEnd.prototype.myName = '后端';

//     return {
//         FrontEnd: FrontEnd,
//         BackEnd: BackEnd
//     };
// })();

// var front = new initProgrammer.FrontEnd();
// var back = new initProgrammer.BackEnd();
// front.say();
// back.say();



// =================================================
// // 企业级协同开发 : 按需开发 和 插件化

// // 按需开发
// // 1.通过立即执行函数初始化私有空间，空间中的声明的变量和函数就私有化
// // 2. 用一个全局变量来接收立即执行函数的返回值

// window.onload = function() {
//     init();
// }

// function init() {
//     initCompute();
//     initBorad();
//     initCpu();
// }

// var initCompute = (function() {
//     // 内容
//     // return ...
// })();

// var initBorad = (function() {
//     // 内容
//     // return ...
// })();

// var initCpu = (function() {
//     // 内容
//     // return ...
// })();


// // 插件化开发
// ;
// (function() {
//     var Slider = function(opt) {}
//     Slider.prototype = {
//         //内容
//     }

//     window.Slider = Slider;
// })();

// var slider = new Slider({
//     // opt
// })



// =================================================
// 作业
// 打印给定一个数，打印从0到这个数中能被3或5或7整除的数
// 打印斐波那契数列的第n为
// 打印从0到n的累加值