// // 1
// var value = 1;

// var obj = {
//     value: 2,
//     test: function() {
//         return this.value;
//     }
// }

// console.log((obj.test = obj.test)()); // 1
// console.log((obj.test || obj.test)()); // 1
// console.log((obj.test && obj.test)()); // 1
// console.log((obj.test, obj.test)()); // 1
// console.log((obj.test ? obj.test : obj.test)()); // 1
// // console.log(obj.test());
// // (obj.test=obj.test)();
// // 函数引用

// console.log(obj.test = obj.test);

// var a;
// console.log(a = 3);



// //2
// var value = 1;

// var obj = {
//     value: 2,
//     test: function() {
//         return this.value;
//     },
//     test2() {
//         return (
//             new Function(
//                 this.test.toString().replace(/\n/g, '').match(/\{(.+?)\}/)[1]
//             )
//         ).call(obj);
//     }
// }

// console.log(obj.test2())


// // 3
// var value = 1;

// var obj = {
//     value: 2,
//     test: function() {
//         return this.value;
//     },
//     test2() {
//         return eval('(' + this.test.toString() + '(()');
//     }
// }

// console.log(obj.test2())




//4 a 等于什么可以满足console.log(a + a + a) 打印出abc
// var a = ? ;
// console.log(a + a + a) // abc

// var a = {
//     _arr: ['a', 'b', 'c'],
//     _i: 0,
//     toString: function() {
//         return this._arr[_i++];
//     }
// }

// console.log(a + a + a);

// console.log(a + a.a + a.a.a) // abc


// // 5 函数 -> 完成传入任意多个字符串元素数组
// // 打印 a + a.a + a.a.a + a.a.a.... 打印字符串

// function test(arr) {
//     var a = {};
//     var temp = a;
//     for (var i = 0; i < arr.length; i++) {
//         temp.toString = function() {
//             return arr[i];
//         }
//         temp = temp.a;
//     }

//     return a;
// }

// var b = test(['a', 'b', 'c']);




// // 6
// var count = 0;

// function counterPromise() {
//     return new Promise(function(resolve, reject) {
//         resolve(++count);
//     });
// }

// async function counter() {
//     let count = await counterPromise();
//     console.log('F: ' + count);
//     count = await counterPromise();
//     console.log('S: ' + count);
// }

// counter();
// counter();

var count = 0;

function counterPromise() {
    return new Promise(function(resolve, reject) {
        resolve(++count);
    });
}

async function counter() {
    let count = await counterPromise();
    console.log(count);
}


// 7 根据下式，写出EventEmitter

const ev = new EventEmitter();

function onTest(data) {
    console.log(data);
    console.log('My name is Test');
}

function onTest1(data) {
    console.log(data);
    console.log('My name is Test1');
}

ev.on('test', onTest);

ev.once('test', onTest1);

ev.trigger('test', { a: 1, b: 2 }, window, function() {
    console.log('TEST triggered');
});

ev.trigger('test1', { a: 1, b: 2 }, window, function() {
    console.log('TEST1 is triggered');
});

ev.trigger('test1', { a: 1, b: 2 });

ev.off('test', onTest, function() {
    console.log('I left on this event Test');
})



// 老师的写法
class EventEmitter {
    constructor() {

    }

    handlers = {};

    on(type, handler, once) {
        if (!this.handlers[type]) {
            this.handlers[type] = [];
        }

        if (!this.handlers[type].includes(handler)) {
            handler.once = once;
            this.handlers[type].push(handler);
        }
    }

    once(type, handler) {
        this.on(type, handler, true);
    }

    trigger(type, data, context, callback) {
        if (!this.handlers[type]) {
            return;
        }
        console.log('this.handlers ->', this.handlers)

        this.handlers[type].forEach((h) => {
            h.call(context, data);
            callback && callback();

            if (h.once) {
                this.off(type, h);
            }
        })
    }

    off(type, handler, callback) {
        if (!this.handlers[type]) {
            return;
        }
        this.handlers[type] = this.handlers[type].filter((h) => {
            return h != handler;
        });
        callback && callback();
    }
}