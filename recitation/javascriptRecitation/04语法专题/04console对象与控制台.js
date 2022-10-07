// console

// console.log console.info console.debug
console.info('jadyen');
console.debug('jadyen');

// console.error console.warn
console.warn('warn');
console.error('error');

// console.table
var obj = {
  jayden: { age: 30, sexual: 'bigass' },
  alexis: { age: 28, sexual: 'bigass' },
};
console.table(obj);
console.log('===============================');

// console.count
console.count(); // default: 1
console.count(); // default: 2
console.log('===============================');

// greet: 欢迎， 迎接
function greet(user) {
  console.count();
  console.log('hi ' + user);
}
greet('jayden'); // default: 3 \n hi jayden
greet('alexis'); // default: 4 \n hi alexis
console.log('===============================');

// 可以接受一个字符串作为参数，作为标签，对执行次数进行分类
function greet(user) {
  console.count(user);
  console.log('hi ' + user);
}
greet('jayden'); // jayden: 2
greet('alexis'); // alexis: 2
greet('jayden'); // jayden: 3
greet('alexis'); // alexis: 3
console.log('===============================');

// console.dir consle.dirxml
// console.dir -> 对一个对象进行检查（inspect），并以易于阅读和打印的格式显示
var obj = {
  name: 'jayden',
  age: 30,
  sex: 'female',
};
console.log(obj);
console.dir(obj);
// 对于输出 DOM 对象非常有用，因为会显示 DOM 对象的所有属性
console.log(document.body);
console.dir(document.body);
// Node 环境之中，还可以指定以代码高亮的形式输出
console.dir(obj, { colors: true });
console.log('===============================');

// console.dirxml -> dirxml方法主要用于以目录树的形式，显示 DOM 节点
console.dirxml(document.body);
console.log('===============================');

// console.assert() -> 主要用于程序运行过程中，进行条件判断，如果不满足条件，就显示一个错误，但不会中断程序执行。这样就相当于提示用户，内部状态不正确
// 接受两个参数，第一个参数是表达式，第二个参数是字符串。只有当第一个参数为false，才会提示有错误，在控制台输出第二个参数，否则不会有任何结果
// assert: 生效，起作用
console.assert(false, '发生错误了'); // index.js:66 Assertion failed: 发生错误了

// 判断子节点个数是否符合要求
// 符合要求什么都不显示, 不符合才显示第二个参数
var list = document.querySelector('.main');
console.assert(list.childNodes.length > 5, '子节点最少5个');
console.log('===============================');

// console.time console.timeEnd
// 这两个方法用于计时，可以算出一个操作所花费的准确时间
// time方法表示计时开始，timeEnd方法表示计时结束
// 它们的参数是计时器的名称
console.time('timer');
var arr = new Array(1000);
for (var i = arr.length - 1; i >= 0; i--) {
  arr[i] = new Object();
}
console.timeEnd('timer');
console.log('===============================');

// console.group() console.groupEnd() console.Collapsed()
// console.group和console.groupEnd这两个方法用于将显示的信息分组。它只在输出大量信息时有用，分在一组的信息，可以用鼠标折叠/展开
// 下面代码表示group2 包含在 group1 内部
console.group('group1');
console.log('group1 information');

console.group('group2');
console.log('group2 information');

console.groupEnd(); // group2 end
console.groupEnd(); // group1 end
console.log('===============================');

// cosole.groupCollapsed()
// console.groupCollapsed方法与console.group方法很类似，唯一的区别是该组的内容，在第一次显示时是收起的（collapsed），而不是展开的
// collapse: 折叠，倒塌
console.groupCollapsed('groupCollapsed1');
console.log('groupCollapsed1 information');

console.groupCollapsed('groupCollapsed2');
console.log('groupCollapsed information');

console.groupEnd(); // groupCollapsed2 end
console.groupEnd(); // groupCollapsed1 end
console.log('===============================');

// console.trace console.clear
// console.trace: 显示当前执行的代码在堆栈中的调用路径
// trace: n && v 追踪，追查, 痕迹， 踪迹
console.trace();
console.log('===============================');
// console.clear: 方法用于清除当前控制台的所有输出，将光标回置到第一行
// console.clear();

// debugger 语句

// debugger语句主要用于除错，作用是设置断点。如果有正在运行的除错工具，程序运行到debugger语句时会自动停下。如果没有除错工具，debugger语句不会产生任何结果，JavaScript 引擎自动跳过这一句
// Chrome 浏览器中，当代码运行到debugger语句时，就会暂停运行，自动打开脚本源码界面。
for (var i = 0; i < 5; i++) {
  console.log(i);
  if (i === 3) debugger;
}
