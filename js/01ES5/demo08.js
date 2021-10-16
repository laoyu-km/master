/**
 * 对象
 */

// // 示例
// var teacher = {
//     name: 'jayden',
//     age: 22,
//     sex: 'female',
//     height: 156,
//     weight: 106,
//     teach: function() {
//         console.log('I am teaching JavaScript');
//     },
//     smoke: function() {
//         //teacher.weight--;
//         this.weight--;
//         console.log(this.weight);
//     },
//     eat: function() {
//         //teacher.weight++;
//         this.weight++;
//         console.log(this.weight);
//     }
// }
// console.log(teacher);

// //访问属性和方法
// console.log(teacher.name);
// console.log(teacher.age);
// console.log(teacher.teach); // function(){}

// //增加属性,和方法
// teacher.address = 'beijing';
// teacher.drink = function() {
//     console.log('I am drinking bear');
// }
// console.log(teacher.drink);

// // 修改属性和方法
// teacher.weight = 200;
// teacher.eat = function() {
//     console.log('干饭王');
// }
// console.log(teacher.eat);

// // 删除属性和方法
// delete teacher.address;
// delete teacher.drink;


// // 示例2
// var attendance = {
//     students: [],
//     total: 6,
//     join: function(name) {
//         this.students.push(name)
//         if (this.students.length === this.total) {
//             console.log(name + ' 到课，人已到齐');
//         } else {
//             console.log(name + ' 到课，人未到齐');
//         }
//     },
//     leave: function(name) {
//         var idx = this.students.indexOf(name);
//         if (idx !== -1) {
//             this.students.splice(idx, 1);
//         }
//         console.log(name + ' 早退了');
//         console.log(this.students);
//     },
//     classOver: function() {
//         this.students = [];
//         console.log('已下课');
//     }
// }

// attendance.write = function() {
//     console.log(this.total);
// }

// attendance.join('jay');
// attendance.join('wang')
// attendance.join('zhang')
// attendance.join('zhou')
// attendance.join('jodan');
// attendance.join('mikle');
// attendance.leave('jay');
// attendance.write();
// attendance.classOver();


// // 对象字面量创建对象
// var obj = {
//     name: 'jay',
//     sex: 'female',
//     eat: function() {}
// }
// obj.name = 'tex';

// // 构造函数创建对象
// // 系统自带的构造函数创建对象
// var obj = new Object(); // 与对象字面亮方式完全相等
// obj.name = 'jay';
// obj.sex = 'female'

// 自定义构造函数
// 构造函数不是对象，对象是构造函数的实例化
// 自定义构造函数名要求必须：大驼峰
// // 示例 1
// function Teacher(name, sex, weight, course) {
//     // 构造函数也是函数
//     // 在未执行之前this是不存在的，因为未执行之Teacher创建不了自己的AO
//     this.name = name;
//     this.sex = sex;
//     this.weight = weight;
//     this.course = course;

//     this.smoke = function() {
//         this.weight--;
//         console.log(this.weight);
//     }
//     this.eat = function() {
//         this.weight++;
//         console.log(this.weight);
//     }
// }

// // new的时候Teacher执行，产生自己的AO
// var teacher1 = new Teacher('张三', '男', '130', 'JS');
// var teacher2 = new Teacher('李四', '男', '120', 'HTML');
// // teacher1 修改了name,不影响teacher2
// // teacher1 和 teacher2 独立空间，互不影响
// // 构造函数创建对象复用性高
// teacher1.name = '李四';
// console.log(teacher1, teacher2);
// teacher1.smoke();
// teacher1.smoke();
// console.log(teacher2.weight);

// // 示例2 开发中常用方法
// function Teacher(opt) {
//     this.name = opt.name;
//     this.sex = opt.sex;
//     this.weight = opt.weight;
//     this.course = opt.course;

//     this.smoke = function() {
//         this.weight--;
//         console.log(this.weight);
//     }
//     this.eat = function() {
//         this.weight++;
//         console.log(this.weight);
//     }
// }

// // 开发中建议如下写，有键值对，清晰易懂
// var teacher1 = new Teacher({
//     name: '张三',
//     sex: '男',
//     weight: 130,
//     course: 'Javascript'
// });
// var teacher2 = new Teacher({
//     name: '李四',
//     sex: '男',
//     weight: 160,
//     course: 'HTML'
// });


// ==============================================
//作业
// // 写一个构造函数，接收数字类型的参数，参数数量不定, 完成参数的相加和相乘
// function Test() {
//     this.sum = 0;
//     this.chenji = 1;
//     this.arguments = arguments;
//     this.add = function() {
//         for (var i = 0; i < this.arguments.length; i++) {
//             this.sum += this.arguments[i];
//         }
//         console.log(this.sum);
//     }
//     this.xc = function() {
//         for (var i = 0; i < this.arguments.length; i++) {
//             this.chenji *= this.arguments[i];
//         }
//         console.log(this.chenji);
//     }

// }

// var t1 = new Test(1, 2, 3, 4, 5, 6);
// t1.add();
// t1.xc();

// // 写一个构造车的函数，可设置车的品牌，颜色，排量
// // 在写一个构造消费者的函数，设置用户的名字，年龄，收入，通过一个方法实例化用户喜欢的车，再实例化的时候设置车的属性
// function Car(opt) {
//     this.pinPai = opt.pinPai;
//     this.color = opt.color;
//     this.paiL = opt.paiL;
//     this.xihao = 'hahahahaha';
//     this.drive = function() {
//         console.log('漂移');
//     }
// }

// function Buyer(opt) {
//     this.name = opt.name;
//     this.age = opt.age;
//     this.shouRu = opt.shouRu;
//     this.xihao = {
//         color: 'pink',
//         pinPai: 'aodi',
//         paiL: '12L'
//     }
//     this.loveCar = null;
//     this.setloveCar = function() {
//         this.loveCar = new Car(this.xihao);
//     }
//     this.getloveCar = function() {
//         console.log(this.loveCar);
//     }
// }

// var human = new Buyer({
//     name: 'jayden',
//     age: 30,
//     shouru: '3万'
// });

// human.setloveCar();
// human.getloveCar();
// human.loveCar.drive();