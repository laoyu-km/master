console.log('jaydenE');

//No.1 input节点对象的原型链
// input.__proto__ > HTMLInputElement.prototype.__proto__ > HTMLElement.prototype.__proto__ > 
//Element.prototype.__proto__ > 
//Node.prototype.__proto__ >
// EventTarget.prototype.__proto__ >
//Object.prototype

// EventTarget 是通过node 找 element

// // 事件是每个页面自有的，所有的事件源对象都是由EventTarget构造的，所以Node之上是EventTarget
// // 节点和元素是两回事，element是DOM树上的每一个属性值，node是DOM树上的属性名, 举例
// var obj = {
//     a: {
//         b: {}
//     }
// }
// obj.a.b 是 element
// a 和 b 是 node

// 为什么是原型是这样


// // No.2 
// // 1. 自定义一个事件
// // 2. 给一个元素绑定这个自定义事件的处理函数
// // 3. 1000毫秒以后执行这个事件

// // 自写
// var ad = document.querySelector('.even');
// var timer = setTimeout(function() {
//     ad.style.display = 'none'
//     console.log('执行了')
// }, 1000)

// // 正解
// var ev = new Event('test');
// oDiv.addEventListener('test', function() {
//     console.log('Event');
// }, false);

// setTimeout(function() {
//     oDiv.dispatchEvent(ev);
// }, 1000)

// No.3 w3c 标准的阻止冒泡 和 阻止默认行为的方法
// var e = e || window.event; e.stopPropagation() e.preventDefault()


// //No.4 DOM0, DOM1, DOM 3
// DOM0
// DOM1: 没有发布 - > 没有明确
// DOM2: addEventListener(name, function, false / true), addEventRemove DOM2 和 DOM3 的标准是一样的
// DOM3

// // no.5 如何统计HTML有哪些标签和标签使用次数
// // 自写

// // 正解
// function getTagInfo() {
//     var tagPool = {};

//     var allTags = […document.getElementsByTagName('*')];

//     allTags.map(function(item) {
//         const nodeName = item.nodeName.toLowerCase();

//         if (tagPool[nodeName]) {
//             tagPool[nodeName] += 1;
//         } else {
//             tagPool[nodeName] = 1;
//         }
//     })

//     return tagPool;
// }

// No.6 阐述事件代理
// 事件流：事件发生时，会在根节点到自节点之间产生事件传递

// // No.7 用for循环5次，增加5个按钮，每个按钮点击打印循环顺序
// // 自解
// var arr = [];
// for (var i = 0; i < 5; i++) {
//     arr[i] = document.createElement('btn');
//     (function(j) {

//         arr[j].onclick = function() {
//             console.log(j);
//         }
//     })(i);
// }
// document.body.appendChild(arr); //写错

// // 正解
// var oFrag = document.createDocumentFragment()

// for (var i = 0; i < 5; i ++) {
//   var oBtn = document.createElement('button');
//   oBtn.innerText = '按钮' + (i + 1);
//   oFrag.appendChild(oBtn);

//   (function (i) {
//      oBtn.addEventListener('click', function () {
//        console.log(i + 1);
//     }, false);
//   })(i);
// }

// document.body.appendChild(oFrag);


// No.8 getEementBy... 和 querySelector(querySelectorAll) 的区别
// get 系 动态集合，性能稍高，返回的是动态序列
// query 系 基于css名，性能稍差，静态集合, 返回的是一个静态的node list
// 性能上不用纠结

// No.9 获取元素属性的方法有哪些
// 特性和属性： 特性是特有的属性， 属性包含特性， 和一些不是特性的属性
// oDiv.getAttribute("tag")
// oDiv.attributes[0].value 
// oDiv.attributes['tag'].value 
// oDiv.getAttributeNode('tag').value 
// oDiv.dataset.tag 
// data - tag = "div"

// // No.10 innerHtml
// // 1. 会将设置的值解析为一个DOM节点 和 一个文档碎片
// // 2. 将DOM节点放入文档碎片
// // 3. 再将文档碎片放入网页中
// // 导致速度慢

// // 造成脚本注入，HTML5中不能用，但是HTML4中会被注入
// var text = 'test';
// oDiv.innerHTML = text;
// text = `<script>alert('123')</script>`;
// oDiv.innerHTML = text;

// // 脚本注入另一种方法
// text = `<img onerror="alert('error')" />`

// // 如何代替innerHtml -> nodeContent
// oDiv.nodeContent = text;

// // innerHtml 破坏兄弟节点的引用
// var oDiv = document.getElementsById('oDiv');
// document.body.innerHTML += '<span></span>';
// oDiv.style.color = "red"; // 不起作用，因为innerHtml 破坏了oDiv的引用