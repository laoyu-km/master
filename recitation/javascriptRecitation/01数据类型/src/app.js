// // 异步串行
// var items = [1, 2, 3, 4, 5, 6];
// var results = [];

// function async(item, callback) {
//   console.log('get ' + item);
//   setTimeout(function () {
//     callback(item);
//   }, 1000);
// }

// function finaly() {
//   console.log('all done');
//   console.log(results);
// }

// function run(item) {
//   async(item, function (result) {
//     results.push(result);
//     console.log('items.length', items.length);
//     if (items.length) {
//       run(items.shift());
//     } else {
//       finaly();
//     }
//   });
// }

// run(items.shift());

// // 异步并行
// var items = [1, 2, 3, 4, 5, 6];
// var len = items.length;
// var results = [];

// function async(arg, callback) {
//   console.log('arg = ' + arg);
//   setTimeout(function () {
//     callback(2 * arg);
//   }, 1000);
// }

// function final() {
//   console.log('final done');
// }

// items.forEach(function (item) {
//   async(item, function (result) {
//     results.push(result);
//     if (results.length === len) {
//       final();
//     }
//   });
// });

// // 异步 串行和并行同时

// var items = [1, 2, 3, 4, 5, 6];
// var results = [];
// var running = 0;
// var limite = 2;

// function async(arg, callback) {
//   console.log('arg = ' + arg);
//   setTimeout(function () {
//     callback(arg * 2);
//   }, 1000);
// }

// function final(value) {
//   console.log('final ' + value);
// }

// function done() {
//   while (running < limite && items.length > 0) {
//     var result = items.shift();
//     async(result, function (result) {
//       results.push(result);
//       running--;
//       if (items.length > 0) {
//         console.log('running = ' + running);
//         done();
//       } else if (running === 0) {
//         final(results.length);
//         console.log('running final = ' + running);
//         console.log(results);
//       }
//     });

//     running++;
//   }
// }

// done();

function async(time, callback) {
  setTimeout(function () {
    callback();
  }, 1000 / time);
}

var count = 0;
var elid = 1;
var obj = null;
var flag = false;

function test() {
  async(count, function () {
    var oLoop = document.querySelector('.loop' + elid);
    if (obj) {
      obj.className = obj.className.replace(' target', '');
    }
    obj = oLoop;
    obj.className += ' target';

    console.log(elid);

    count = count < 10 ? ++count : 10;
    elid = elid < 8 ? ++elid : 1;
    if (flag) {
      test();
    } else {
      console.log('final elid: ' + elid);
    }
  });
}

function startOrEnd(times) {
  flag = !flag;
  if (flag) test();
}

function debounce(fn, delay) {
  var count = 0;
  var timer = null;
  return function () {
    clearTimeout(timer);
    var that = this;
    // var args = arguments;
    timer = setTimeout(function () {
      fn.call(that, ++count);
    }, delay);
  };
}

var oMain = document.querySelector('.main-btn');
oMain.addEventListener('click', startOrEnd.bind(null), false);

// strict mode

// 显示报错
/**
 * 只读属性赋值 -> writable: false
 * delete 不可配置属性
 *
 */

// 安全增强

// 静态编译

// 预留
