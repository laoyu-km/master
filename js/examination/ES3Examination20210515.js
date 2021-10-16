// // 1
// function test(a, b, c) {
//     test.length += c;

//     // 形参是函数内部的临时变量
//     a = 100;
//     b = 200;

//     console.log(test.length); //3

//     delete arguments.length;

//     arguments.push = [].push;
//     arguments.push(4);

//     arguments.length += c;

//     console.log(arguments.length); // 4
//     console.log(arguments); // [4, 200, 3]
// }

// test(1, 2, 3);
// console.log(test.length); // 3

// console.log('==============================')

// // 证明test2.length 是内置属性，不可修改和删除
// function test2(a, b, c) {
//     test2.length += c;

//     console.log('length', test2.length); // 3

//     delete test2.length;
//     console.log('length' in test2); // true
//     console.log('length', test2.length); // 0
//     // 无法删除test2.length属性，系统底层自动归为0，因为其要求必须有length属性，且该属性必须为整数类型

//     console.log(Object.getOwnPropertyDescriptor(Function.prototype, 'length'));
// }

// test2(1, 2, 3);


// console.log('==============================')

// // 映射关系是一定存在的，但是在未传实参前，映射并没有对应
// // 映射是底层在内存上面做的操作，不应定要对应值
// // 对应是逻辑层面上的，值一一对应
// function test3(a = 10) {
//     console.log(a);
//     console.log(test3.length)
//     console.log(arguments[0]);
// }

// test3(); // 10, undefined
// test3(20); // 20, 20


// console.log('==============================')

// // [].push 和 Array.prototype.push 用哪个好 -> 两个是一样的
// // 现代浏览器不会在调用的时候在找自身上是否有某个方法，而是在声明的时候就已经确定了自身是否有方法，还是要在prototype上找,提高了效率
// var arr = [1, 2, 3];
// arr.push = function() {
//     console.log(1);
// }
// arr.push(4);

// console.log('==============================')

// // js中 . 语法的使用其实是比较消耗资源的，所以在写代码时，尽可能将.语法的值传递给一个变量


// ===========================================

// // 关于 Function.length
// function fn(a, b, c) {
//     return a + b + c;
// }

// console.log(Object.getOwnPropertyDescriptor(fn, 'length'));
// console.log(Object.getOwnPropertyDescriptor(Function, 'length'));
// console.log(Object.getOwnPropertyDescriptor(Function.prototype, 'length'));

// // delete Function.prototype.length;

// console.log(fn.length);
// console.log(Function.length);

// delete fn.length;
// console.log(fn.length);

// // delete test.length 删除了test自身的length属性
// console.log('test.length', Object.prototype.hasOwnProperty.call(test, 'length'));

// delete test.length;
// console.log('test.length', Object.prototype.hasOwnProperty.call(test, 'length'));

// ===========================================

// // Object.prototype.__proto__
// obj = { a: 1, b: 2 };
// obj.__proto__ = { c: 3 };
// console.log(obj);

// Array.prototype.__proto__ = { teacher: 'jayden' };
// console.log(Array.prototype);

// // Object.prototype.__proto__ = { skill: 'js' };
// console.log(Object.prototype);

// ===========================================
function TestFn() {
    this.address = 'BJ';
    this.age = 16;
}

TestFn.prototype = {
    name: 'sunday',
    get __test__() {
        return this.age;
    },
    set __test__(value) {
        this.age = value;
    }
}

console.log(TestFn.prototype); // age=={skill: 'js'}

console.log(Object.getOwnPropertyDescriptor(TestFn.prototype, '__test__'));

var testfn = new TestFn();

console.log(testfn.__test__); //16

TestFn.prototype.__test__ = { skill: 'js' };
// testfn.__test__ = { skill: 'js' };

console.log(testfn.__test__); //16

console.log(testfn.age); //16


console.log('=============================');

Object.prototype.myname = 'SL';

Object.defineProperty(Object.prototype, '__ntest__', {
    get() {
        return this.myname;
    },
    set() {
        this.myname = '貂蝉'
    },
    enumerable: false,
})

console.log(Object.prototype);

Object.prototype.__ntest__ = { skill: 'js' };

// Object.prototype.__proto__ = { isMarried: false };

console.log('=============================');

function fn(a, b, c) {
    console.log('fn.length', fn.length);
    delete fn.length;
    console.log('fn.length', fn.length);
    return a + b + c;
}

delete Function.prototype.length;

fn(1, 2, 3);

console.log('=============================');

;
(
    function() {
        function Test() {
            this.name = 'plugin';
        }

        window.Test = Test;
    }
)();

var test1 = new Test();
console.log(test1);

var Test = 123;
console.log(Test);