// No.1
// function Teacher() {
//     this.student = 500;
//     this.skill = ["JS", "JQ"];
// }

// var teacher = new Teacher();

// Student.prototype = teacher;

// function Student() {}

// var student = new Student();

// student.student++;

// student.skill.push("HMTL", "CSS");

// console.log(student); // Student {student: 501}
// console.log(teacher); // skill: (4) ["JS", "JQ", "HMTL", "CSS"]

// // No.2
// function Parent() {
//     this.a = 1;
//     this.b = [1, 2, this.a];
//     this.c = {
//         demo: 5
//     }
//     this.show = function() {
//         console.log(this.a, this.b, this.c.demo);
//     }
// }

// function Child() {
//     this.a = 2;
//     this.change = function() {
//         this.b.push(this.a);
//         this.a = this.b.length;
//         this.c.demo = this.a++;
//     };
// }

// Child.prototype = new Parent();
// var parent = new Parent();
// var child1 = new Child();
// var child2 = new Child();

// child1.a = 11;
// child1.a = 12;

// parent.show(); // 1 [1,2,1] 5
// child1.show(); // 11 [1,2,1] 5
// child2.show(); // 12 [1,2,1] 5

// child1.change(); // 5 [1,2,1,11] 4
// child2.change(); // 6  [1,2,1,11,12] 5
// parent.show(); // 1 [1,2,1] 5  -> 不是一个实例
// child1.show(); // 5 [1,2,1,11,12] 5
// child2.show(); // 6 [1,2,1,11,12] 5

// // No.3
// // prototype  __proto__ constructor
// // JS当中，除了 null 和 undefined 外 都是原型
// function Foo() {}

// var foo = new Foo();

// // 1. 两种访问原型的方式
// console.log(foo.__proto__ === Foo.prototype); //true

// // 2. 通过构造函数实例出的对象是不同的实例

// // 3. 原型上才有constructor
// console.log(foo.constructor === Foo.prototype.constructor); //true
// console.log(Foo.prototype.constructor === Foo); //true

// ======================================

// // new Object();
// function Foo() {}
// var foo = new Foo();
// console.log(Foo.prototype.__proto__ === Object.prototype); //true
// // 尽量避免判断属性是否在对象中时使用.语法，因为除了遍历自身还会遍历到原型，遍历量加大
// // 应该使用 hasOwnProperty 或 instanceof

// ======================================

// // 所以函数的构造函数 -> 函数也是对象
// // new Function();
// // 如何验证所有函数都是 new Function() 构造出来的
// function Foo() {}
// console.log(Foo.__proto__ === Function.prototype); //true
// console.log(Object.__proto__ === Function.prototype); //true
// console.log(Function.__proto__ === Function.prototype); //true
// console.log(Function.__proto__.__proto__ === Object.prototype);

// 练习
function Foo() {
    getName = function() { // 全局变量
        console.log(1);
    };
    return this;
}
Foo.getName = function() {
    console.log(2);
};
Foo.prototype.getName = function() {
    console.log(3);
};
var getName = function() {
    console.log(4);
};

function getName() {
    console.log(5);
}
console.log(Foo()); //window

Foo.getName(); //2

getName(); // 1

Foo().getName(); // 1

getName(); // 1

new Foo.getName(); //2

new Foo().getName(); //3

new new Foo().getName(); //3