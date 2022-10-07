// 浏览器环境概述

// 1. 代码嵌入网页的方法
// <script>元素直接嵌入代码。
// <script>标签加载外部脚本
// 事件属性
// URL 协议

// 1.1 <script>元素直接嵌入代码。
// type 属性： text/javascript：这是默认值，也是历史上一贯设定的值。如果你省略type属性，默认就是这个值。对于老式浏览器，设为这个值比较好。 application/javascript：对于较新的浏览器，建议设为这个值
// 由于<script>标签默认就是 JavaScript 代码。所以，嵌入 JavaScript 脚本时，type属性可以省略
// 如果type属性的值，浏览器不认识，那么它不会执行其中的代码。利用这一点，可以在<script>标签之中嵌入任意的文本内容，只要加上一个浏览器不认识的type属性即可
// 可以使用<script>节点的text属性读出它的内容。

// 1.2 <script>标签加载外部脚本
// 如果脚本文件使用了非英语字符，还应该注明字符的编码 <script charset="utf-8" src=".."></script>
// 加载外部脚本和直接添加代码块，这两种方法不能混用
// 为了防止攻击者篡改外部脚本，script标签允许设置一个integrity属性，写入该外部脚本的 Hash 签名，用来验证脚本的一致性
// <script src="/assets/application.js" integrity="sha256-TvVUHzSfftWg1rcfL6TIJ0XKEGrgLyEq6lEpcmrG9qs="></script>
// integrity: 正直，诚实；完整，完全；

// 1.3 事件属性
// 网页元素的事件属性（比如onclick和onmouseover），可以写入 JavaScript 代码
// <button id="btn" onclick="conso.log(this.id); console.log('jadyen')">提交</button>

// 1.4 URL 协议
// URL 支持javascript:协议，即在 URL 的位置写入代码，使用这个 URL 的时候就会执行 JavaScript 代码。
// <a href="javascript:console.log('javascript 嵌入 URL')" />js</a>

//如果 JavaScript 代码返回一个字符串，浏览器就会新建一个文档，展示这个字符串的内容，原有文档的内容都会消失
// <a href="javascript: new Date().toLocaleTimeString()">time</a>

// 如果返回的不是字符串，那么浏览器不会新建文档，也不会跳转
// <a href="javascript: console.log(new Date().toLocaleTimeString())">js</a>

// javascript:协议的常见用途是书签脚本 Bookmarklet。由于浏览器的书签保存的是一个网址，所以javascript:网址也可以保存在里面，用户选择这个书签的时候，就会在当前页面执行这个脚本。为了防止书签替换掉当前文档，可以在脚本前加上void，或者在脚本最后加上void 0
// <a href="javascript: void new Date().toLocaleTimeString();">点击</a>
// <a href="javascript: new Date().toLocaleTimeString();void 0;">点击</a>

// 2. script 元素

// 2.1 工作原理
// 浏览器加载 JavaScript 脚本，主要通过<script>元素完成。正常的网页加载流程是这样的。
/**
 * 1. 浏览器一边下载 HTML 网页，一边开始解析。也就是说，不等到下载完，就开始解析。
 * 2. 解析过程中，浏览器发现<script>元素，就暂停解析，把网页渲染的控制权转交给 JavaScript 引擎。
 * 3. 如果<script>元素引用了外部脚本，就下载该脚本再执行，否则就直接执行代码
 * 4. JavaScript 引擎执行完毕，控制权交还渲染引擎，恢复往下解析 HTML 网页
 */

// 阻塞效应
// 如果外部脚本加载时间很长（一直无法完成下载），那么浏览器就会一直等待脚本下载完成，造成网页长时间失去响应，浏览器就会呈现“假死”状态
// 为了避免这种情况，较好的做法是将<script>标签都放在页面底部，而不是头部
// 如果某些脚本代码非常重要，一定要放在页面头部的话，最好直接将代码写入页面，而不是连接外部脚本文件，这样能缩短加载时间
// 脚本文件都放在网页尾部加载，还有一个好处。因为在 DOM 结构生成之前就调用 DOM 节点，JavaScript 会报错，如果脚本都在网页尾部加载，就不存在这个问题，因为这时 DOM 肯定已经生成了

// 解决DOM 结构生成之前就调用 DOM 节点，JavaScript 会报错的问题
// // a. 设定DOMContentLoaded事件的回调函数
// document.addEventListener(
//   'DOMContentLoaded',
//   function (e) {
//     console.log(document.body.innerHTML);
//   },
//   false
// );

// b. 使用<script>标签的onload属性: 当<script>标签指定的外部脚本文件下载和解析完成，会触发一个load事件，可以把所需执行的代码，放在这个事件的回调函数里面。
//<script src="./src/test.js" onload="console.log(document.body.innerHTML)"></script>

// 多个script标签
// 浏览器会同时并行下载a.js和b.js，但是，执行时会保证先执行a.js，然后再执行b.js，即使后者先下载完成，也是如此。也就是说，脚本的执行顺序由它们在页面中的出现顺序决定，这是为了保证脚本之间的依赖关系不受到破坏。
// 解析和执行 CSS，也会产生阻塞。Firefox 浏览器会等到脚本前面的所有样式表，都下载并解析完，再执行脚本；Webkit则是一旦发现脚本引用了样式，就会暂停执行脚本，等到样式表下载并解析完，再恢复执行

// 通常把静态文件放在不同的域名之下, 以加快下载速度
// 对于来自同一个域名的资源，比如脚本文件、样式表文件、图片文件等，浏览器一般有限制，同时最多下载6～20个资源，即最多同时打开的 TCP 连接有限制，这是为了防止对服务器造成太大压力。如果是来自不同域名的资源，就没有这个限制。

// 2.2 defer 属性
// 为了解决脚本文件下载阻塞网页渲染的问题，一个方法是对<script>元素加入defer属性。它的作用是延迟脚本的执行，等到 DOM 加载生成后，再执行脚本
// defer属性的运行流程如下
/**
 * 1. 浏览器开始解析 HTML 网页
 * 2. 解析过程中，发现带有defer属性的<script>元素
 * 3. 浏览器继续往下解析 HTML 网页，同时并行下载<script>元素加载的外部脚本
 * 4. 浏览器完成解析 HTML 网页，此时再回过头执行已经下载完成的脚本
 */
// 有了defer属性，浏览器下载脚本文件的时候，不会阻塞页面渲染。下载的脚本文件在DOMContentLoaded事件触发前执行（即刚刚读取完</html>标签），而且可以保证执行顺序就是它们在页面上出现的顺序
// 对于内置而不是加载外部脚本的script标签，以及动态生成的script标签，defer属性不起作用
// 使用defer加载的外部脚本不应该使用document.write方法

// 2.3 async 属性
// 解决“阻塞效应”的另一个方法是对<script>元素加入async属性
// sync属性的作用是，使用另一个进程下载脚本，下载时不会阻塞渲染
/**
 * 1. 浏览器开始解析 HTML 网页。
 * 2. 解析过程中，发现带有async属性的script标签。
 * 3. 浏览器继续往下解析 HTML 网页，同时并行下载<script>标签中的外部脚本。
 * 4. 脚本下载完成，浏览器暂停解析 HTML 网页，开始执行下载的脚本。
 * 5. 脚本执行完毕，浏览器恢复解析 HTML 网页。
 */

// defer and async
// 一般来说，如果脚本之间没有依赖关系，就使用async属性，如果脚本之间有依赖关系，就使用defer属性
// 如果同时使用async和defer属性，defer不起作用，浏览器行为由async属性决定。

// // 2.4 脚本的动态加载
// // <script>元素还可以动态生成，生成后再插入页面，从而实现脚本的动态加载。
// var btn = document.querySelector('button');
// var main = document.querySelector('main');

// btn.addEventListener(
//   'click',
//   function () {
//     var script = document.createElement('script');
//     script.src = './js/a.js';

//     document.body.appendChild(script);
//   },
//   false
// );

// // 动态生成的script标签不会阻塞页面渲染，也就不会造成浏览器假死。
// ['./js/a.js', './js/b.js'].forEach(function (src) {
//   var script = document.createElement('script');
//   script.src = src;
//   document.body.appendChild(script);
// });

// // 但是问题在于，这种方法无法保证脚本的执行顺序，哪个脚本文件先下载完成，就先执行哪个
// // 如果想避免这个问题，可以设置async属性为false
// ['./js/a.js', './js/b.js'].forEach(function (src) {
//   var script = document.createElement('script');
//   script.src = src;
//   script.async = false;
//   document.body.appendChild(script);
// });

// // 如果想为动态加载的脚本指定回调函数，可以使用下面的写法
// ['./js/a.js', './js/b.js'].forEach(function (src) {
//   var script = document.createElement('script');
//   script.src = src;
//   script.async = false;

//   script.onload = function () {
//     console.log(src + ' 下载并解析完成');
//   };

//   script.onerror = function () {
//     console.log(src + ' 下载或解析失败');
//   };
//   document.body.appendChild(script);
// });

// 2.5 加载使用的协议
// 如果不指定协议，浏览器默认采用 HTTP 协议下载。<script src="example.js"></script>
// 如果要采用 HTTPS 协议下载，必需写明。<script src="https://example.js"></script>
// 但是有时我们会希望，根据页面本身的协议来决定加载协议，这时可以采用下面的写法。
// <script src="//example.js"></script>

// 3. 浏览器的组成
// 浏览器的核心是两部分：渲染引擎和 JavaScript 解释器（又称 JavaScript 引擎）

// 3.1
// 不同的浏览器有不同的渲染引擎。
/**
 * Firefox：Gecko 引擎 -> gecko 壁虎
 * Safari：WebKit 引擎 -> kit: 成套工具，成套设备；配套元件
 * Chrome：Blink 引擎 -> blink: 眨（眼）；（灯）闪烁
 * IE: Trident 引擎 -> trident: 三叉戟
 * Edge: EdgeHTML 引擎 -> edge: 边，边缘；锋，刃；
 */

// 渲染引擎处理网页，通常分成四个阶段
/**
 * 1. 解析代码：HTML 代码解析为 DOM，CSS 代码解析为 CSSOM（CSS Object Model）。
 * 2. 对象合成：将 DOM 和 CSSOM 合成一棵渲染树（render tree）。
 * 3. 布局：计算出渲染树的布局（layout）。
 * 4. 绘制：将渲染树绘制到屏幕。
 *
 * 以上四步并非严格按顺序执行，往往第一步还没完成，第二步和第三步就已经开始了。所以，会看到这种情况：网页的 HTML 代码还没下载完，但浏览器已经显示出内容了
 */

// 3.2 重流和重绘
// “布局流”（flow）: 渲染树转换为网页布局
// “绘制”（paint）: 布局显示到页面的这个过程
// “重流”（reflow）和“重绘”（repaint）:页面生成以后，脚本操作和样式表操作, 用户的互动也会触发重流和重绘，比如设置了鼠标悬停（a:hover）效果、页面滚动、在输入框中输入文本、改变窗口大小等等
// 重流和重绘并不一定一起发生，重流必然导致重绘，重绘不一定需要重流。比如改变元素颜色，只会导致重绘，而不会导致重流；改变元素的布局，则会导致重绘和重流
// 大多数情况下，浏览器会智能判断，将重流和重绘只限制到相关的子树上面，最小化所耗费的代价，而不会全局重新生成网页
// 作为开发者，应该尽量设法降低重绘的次数和成本。比如，尽量不要变动高层的 DOM 元素，而以底层 DOM 元素的变动代替；再比如，重绘table布局和flex布局，开销都会比较大

// 一些优化技巧
/**
 * 读取 DOM 或者写入 DOM，尽量写在一起，不要混杂。不要读取一个 DOM 节点，然后立刻写入，接着再读取一个 DOM 节点。
 * 缓存 DOM 信息。
 * 不要一项一项地改变样式，而是使用 CSS class 一次性改变样式。
 * 使用documentFragment操作 DOM
 * 动画使用absolute定位或fixed定位，这样可以减少对其他元素的影响。
 * 只在必要时才显示隐藏元素。
 * 使用window.requestAnimationFrame()，因为它可以把代码推迟到下一次重绘之前执行，而不是立即要求页面重绘。
 * 使用虚拟 DOM（virtual DOM）库。
 */

// 3.3 JavaScript 引擎
// JavaScript 引擎的主要作用是，读取网页中的 JavaScript 代码，对其处理后运行
// JavaScript 是一种解释型语言，也就是说，它不需要编译，由解释器实时运行。这样的好处是运行和修改都比较方便，刷新页面就可以重新解释；缺点是每次运行都要调用解释器，系统开销较大，运行速度慢于编译型语言。
// 为了提高运行速度，目前的浏览器都将 JavaScript 进行一定程度的编译，生成类似字节码（bytecode）的中间代码，以提高运行速度。
// 早期，浏览器内部对 JavaScript 的处理过程如下：
/**
 * 1. 读取代码，进行词法分析（Lexical analysis），将代码分解成词元（token）。
 * 2. 对词元进行语法分析（parsing），将代码整理成“语法树”（syntax tree）。
 * 3. 使用“翻译器”（translator），将代码转为字节码（bytecode）。
 * 4. 使用“字节码解释器”（bytecode interpreter），将字节码转为机器码。
 *
 * Lexical: 词汇的
 * analysis: 分析
 * token: 令牌
 * parse: 解析
 * syntax: 语法
 * translator: 翻译家，翻译器
 * bytecode: 字节码
 * interpreter: 解释程序
 */

// 逐行解释将字节码转为机器码，是很低效的。为了提高运行速度，现代浏览器改为采用“即时编译”（Just In Time compiler，缩写 JIT）
// 即字节码只在运行时编译，用到哪一行就编译哪一行，并且把编译结果缓存（inline cache）。通常，一个程序被经常用到的，只是其中一小部分代码，有了缓存的编译结果，整个程序的运行速度就会显著提升
// 字节码不能直接运行，而是运行在一个虚拟机（Virtual Machine）之上，一般也把虚拟机称为 JavaScript 引擎。并非所有的 JavaScript 虚拟机运行时都有字节码，有的 JavaScript 虚拟机基于源码，即只要有可能，就通过 JIT（just in time）编译器直接把源码编译成机器码运行，省略字节码步骤。这一点与其他采用虚拟机（比如 Java）的语言不尽相同。这样做的目的，是为了尽可能地优化代码、提高性能。下面是目前最常见的一些 JavaScript
// 下面是目前最常见的一些 JavaScript 虚拟机：
/**
 * Chakra (Microsoft Internet Explorer)
 * Nitro/JavaScript Core (Safari)
 * Carakan (Opera)
 * SpiderMonkey (Firefox)
 * V8 (Chrome, Chromium)
 */
