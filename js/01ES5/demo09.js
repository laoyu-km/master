// /**
//  * for循环优化性能
//  * 在for循环内声明变量接收需要循环返回的值
//  * 调用新变量来完成后续的操作
//  * 示例如下
//  */
// function myClass() {
//     var students = [];

//     var operations = {
//         join: function(name) {
//             students.push(name);
//             console.log(students);
//         },
//         leave: function(name) {
//             for (var i = 0; i < students.length; i++) {
//                 //** 声明一个变量来接收students[i], 可以优化性能 **
//                 var item = students[i];
//                 if (item === name) {
//                     students.splice(i, 1);
//                 }
//             }
//             console.log(students);
//         }
//     }
//     return operations;
// }

// var st = myClass();
// st.join('jay');
// st.join('alexis');
// st.join('klk');
// st.leave('jay');


// ==============================================
/**
 * 构造函数，实例化原理
 */

// // this 在函数没有实例化时，指向的是上级对象,这里指向的是window
// function Car() {
//     this.brand = 'brand'
//     j;
//     this.color = 'red';
// }

// // this 在构造函数实例化后，指向的是实例化出来的对象，不是指向构造函数本身
// // 函数必须靠new出来，才能实例化
// var car1 = new Car('red', 'Benz');
// var car2 = new Car('black', 'Mazda');

// console.log(car1.color);
// console.log(car2.color);


// // 构造函数实例化原理
// //1. 页面加载时，产生GO，Car 被定义, 
// //2. 当Car被new的时候相当于Car被执行，Car预编译产生了Car的AO
// //3. 创建AO时再AO里面保存里一个空的this对象.
// //4. 创建AO后，往后面步骤执行，就会将this.的内容写入AO里的this对象；
// //5. 在示例化对象时，将new出来的this对象赋值给了一个全局变量
// //6. 赋值后全局变量的类型变为对象，构造函数的this 就保存到了GO中，this就指向了一个全局的对象
// function Car() {
//     this.brand = 'brand';
//     this.color = 'red';

//     // return this; // JS中如果函数没有return 系统默认添加的return this
// }

// var car = new Car();
// console.log(car.color);

// // 根据上面构造函数原理，可自行实现类似方法
// // 1.
// function car1() {
//     var e = {
//         color: 'pink',
//         brand: 'benz'
//     }

//     return e;
// }

// var c = car1();
// console.log(c.color);

// // 2.
// function test(){
//     var obj = {
//         name: 'jayden',
//         color: 'pink'
//     }

//     return obj;
// }

// var obj1 = test()


// // 构造函数 return
// // return 基础类型，不影响构造函数 return this
// // return 引用类型，构造函数返回return的引用类型，影响return this
// function Car() {
//     this.color = 'red';
//     this.brand = 'Benz'

//     return 3; // Car {color: "red", brand: "Benz"}
//     return []; // []
//     return {}; //{}
//     return function() {}; //function(){}
// }

// var car = new Car();
// console.log(car);


/**
 * 包装类
 * 原始数据类型没有自己的方法和属性
 * 将原始数据类型包装成类
 * Number(), String(), Boolean(),
 */

// //示例 1
// var a = 3;
// var c = 2;
// console.log(a + c); // 5 原始值
// //包装类实例化
// var b = new Number(a);
// // 添加属性
// b.len = 10;
// b.add = function() {
//     console.log(1);
// }
// console.log(b); // 对象

// // 包装类对象参与运算后所得到的值是原始类
// var e = new Number(c)
// var d = b + e;
// console.log(d); // 5 原始值
// console.log(e); // Number 对象

// // 示例 2
// var test = new Number(undefined); // Number{NaN}
// var test = new Number(null); // Number {0}
// var test = new String(null); // String {"null"}
// var test = new String(undefined); // String {"undefined"}

// console.log('helo'.length); //4
// console.log((5).name); // undefined
// console.log(true.length); // undefined

// undefined 和 null 不能设置任何方法和属性
// console.log(undefined.length); //Type Error
//console.log(null.length); // Type Error

// // 示例 3
// // JS 自动包装类如何执行
// // 1. JS解析到 a.length时，由于太特殊,解析为包装类 如下
// // 2. new Number(123).length = 3; 由于该语句无法报错
// // 3. 老师的说法是由于上面语句无法保存，系统又将该属性删除：delete ,如果只是删除属性，那么New Number(a)应该还存在
// //    我的理解是new Number(123)出来的对象没有保存的地方，被销毁了，新增的length属性也就消失了；
// // 4. 执行console.log(a.length);时其实是新的一次包装a
// //   console.log(new Number(a).length); 因为Number没有length属性，所以返回undefined
// // 5. 由于length并没有被定义所以返回undefined
// // 6. 通过 var a = new Number(123)就能解决
// var a = 123;
// a.length = 3; // 系统自动包装a,执行了new Number(a).length = 3; 新对象无法保存，销毁
// // Number类没有length属性
// //下面语句实际执行的是 console.log(new Number(a).length);
// // 原始类型值a，被进行了包装、
// console.log(a.length); //undefined

// // Number类有toString方法
// // 在包装a后，就直接调用toString方法输出了a的值
// // 执行完毕后由于new number(a)无法存储，被销毁
// console.log(new Number(a).toString()); // 123
// console.log(a.toString()) //123


// // 为什么字符串能打印
// var str = 'abc';
// // String类有length属性
// // 在包装 str 后，直接输出了length属性
// // 执行完毕后由于new String(str)无法存储，被销毁
// console.log(new String(str).length); // 3
// console.log(str.length); // 3


// // 数组的截断，修改length
// var arr = [1, 2, 3, 4, 5];
// arr.length = 3;
// console.log(arr); // [1, 2, 3]
// arr.length = 6;
// console.log(arr); // [1,2,3,empty,empty,empty]

// // str 修改length 为什么不能截断字符串？
// // 原因：
// // str.length = 1 -> 执行new String(str).length = 1 由于无法存储，new的新对象销毁 
// // console.log(str) -> 其实是又包装了一次str -> console.log(new String(str).length);
// var str = 'abc';
// str.length = 1;
// console.log(str.length); // 3


// // Q1: 下面最后输出什么, 需要正确输出要怎么修改
// var name = 'fox';
// name += 10;
// //修改
// //var type = new String(typeof(name));
// var type = typeof(name);
// if (type.length === 6) {
//     type.text = 'string';
// }
// console.log(type.text); // undefined

// // Q2 car里面的brand 和 color 是什么
// function Car(brand, color) {
//     this.brand = 'Benz';
//     this.color = 'red';
// }

// var car = new Car('Mazda', 'blank')
// console.log(car); // 'Benz' 'red'

// // Q3 下面输出什么
// function Test(a, b, c) {
//     var d = 1;
//     this.a = a;
//     this.b = b;
//     this.c = c;

//     function f() {
//         d++;
//         console.log(d);
//     }

//     this.g = f;
// }

// var test1 = new Test();
// test1.g();
// test1.g();

// // 第二次实例化Test,产生的AO与第一次实例化产生的AO，互不影响，
// // 生成新的Test的AO
// var test2 = new Test();
// test2.g();

// //Q4 ,最后输出什么
// var x = 1,
//     y = z = 0;

// function add(n) {
//     return n = n + 1;
// }
// y = add(x);

// function add(n) {
//     return n = n + 3;
// }
// z = add(x);

// console.log(x, y, z);

// // Q5 下面函数哪个可以输出1,2,3,4,5
// // 1,3
// function foo(x) {
//     console.log(arguemnts);
//     return x;
// }
// foo(1, 2, 3, 4, 5);

// function foo(x) {
//     console.log(arguments);
//     return x
// }(1, 2, 3, 4, 5);

// (function foo(x) {
//     console.log(arguments);
//     return x;
// })(1, 2, 3, 4, 5)

// // Q6 问打印出什么
// function b(x, y, a) {
//     a = 10;
//     console.log(arguemtns[2]);
// }
// // 拓展
// b(1, 2, 3); // 10

// function b(x,y,a){
//     arguments[2] = 10
//     console.log(a);
// }

// b(1,2,3)


// //ASCII码 表1 0-127   表2 128 255 长度都是一个字节 1 byte
// // UNICODE码，涵盖ASCII码，前255位是ASCII, 之后都是2个byte表示一个码

// var str = 'a';

// // charCodeAt(),参数是字符在字符串中的位置
// var pos = str.charCodeAt(0);
// console.log(pos);

// // 作业
// // 写一个函数，接收任意一个字符串，算出这个字符串的总字节数