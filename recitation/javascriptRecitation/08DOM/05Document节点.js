// Document 节点

// 1. 概述

// document节点对象代表整个文档，每张网页都有自己的document对象
// window.document属性就指向这个对象。只要浏览器开始载入 HTML 文档，该对象就存在了，可以直接使用
// document对象有不同的办法可以获取
/**
 * 正常的网页，直接使用document或window.document。
 * iframe框架里面的网页，使用iframe节点的contentDocument属性。
 * Ajax 操作返回的文档，使用XMLHttpRequest对象的responseXML属性。
 * 内部节点的ownerDocument属性。
 */
// document对象继承了EventTarget接口和Node接口，并且混入（mixin）了ParentNode接口。这意味着，这些接口的方法都可以在document对象上调用。除此之外，document对象还有很多自己的属性和方法。

// 2. 属性

// 2.1 快捷方式属性
// 快捷方式属性是指向文档内部的某个节点的快捷方式

// （1）document.defaultView
// // document.defaultView属性返回document对象所属的window对象。如果当前文档不属于window对象，该属性返回null
// document.defaultView === window

// （2）document.doctype
// 对于 HTML 文档来说，document对象一般有两个子节点。第一个子节点是document.doctype，指向<DOCTYPE>节点，即文档类型（Document Type Declaration，简写DTD）节点。HTML 的文档类型节点，一般写成<!DOCTYPE html>。如果网页没有声明 DTD，该属性返回null
// document.firstChild通常就返回这个节点

// （3）document.documentElement
// document.documentElement属性返回当前文档的根元素节点（root）。它通常是document节点的第二个子节点，紧跟在document.doctype节点后面。HTML网页的该属性，一般是<html>节点。

// （4）document.body，document.head
// document.body属性指向<body>节点，document.head属性指向<head>节点。
// 这两个属性总是存在的，如果网页源码里面省略了<head>或<body>，浏览器会自动创建。另外，这两个属性是可写的，如果改写它们的值，相当于移除所有子节点。

// （5）document.scrollingElement
// document.scrollingElement属性返回文档的滚动元素。也就是说，当文档整体滚动时，到底是哪个元素在滚动。
// // 标准模式下，这个属性返回的文档的根元素document.documentElement（即<html>）。兼容（quirk）模式下，返回的是<body>元素，如果该元素不存在，返回null。
// quirk: 怪癖， 怪异的性格（或行为）
// standard: 标准
// console.log(document.scrollingElement); // html

//（6）document.activeElement
// // document.activeElement属性返回获得当前焦点（focus）的 DOM 元素。通常，这个属性返回的是<input>、<textarea>、<select>等表单元素，如果当前没有焦点元素，返回<body>元素或null。
// active: 活跃的活动的积极的主动的
// console.log(document.activeElement);
// var input = document.querySelector('input');

// input.addEventListener(
//   'input',
//   function () {
//     console.log(document.activeElement);
//   },
//   false
// );

// （7）document.fullscreenElement
// // document.fullscreenElement属性返回当前以全屏状态展示的 DOM 元素。如果不是全屏状态，该属性返回null
// if (document.fullscreenElement.nodeName === 'VIDEO') {
//   console.log('全屏播放视频');
// }

// 2.2 节点集合属性
// 以下属性返回一个HTMLCollection实例，表示文档内部特定元素的集合。这些集合都是动态的，原节点有任何变化，立刻会反映在集合中。

// （1）document.links
// document.links属性返回当前文档所有设定了href属性的<a>及<area>节点

// （2）document.forms
// document.forms属性返回所有<form>表单节点
// 除了使用位置序号，id属性和name属性也可以用来引用表单

// （3）document.images
// document.images属性返回页面所有<img>图片节点

// （4）document.embeds，document.plugins
// embed: 嵌入， 把……插入
// document.embeds属性和document.plugins属性，都返回所有<embed>节点
// <embed /> -> <embed> 标签定义了一个容器，用来嵌入外部应用或者互动程序（插件）
// <embed type="image/jpg" src="http://www.image.com/images/doudou.jpeg" width="258" height="39">
// <embed type="text/html" src="snippet.html" width="500" height="200">
// <embed type="video/webm" src="video.mp4" width="400" height="300">
// 注意：现在已经不建议使用 <embed> 标签了，可以使用 <img>、<iframe>、<video>、<audio> 等标签代替

// （5）document.scripts
// document.scripts属性返回所有<script>节点

// （6）document.styleSheets
// document.styleSheets属性返回网页内嵌或引入的 CSS 样式表集合

// （7）小结
// 除了document.styleSheets属性，以上的其他集合属性返回的都是HTMLCollection实例。document.styleSheets属性返回的是StyleSheetList实例。

// 2.3 文档静态信息属性
// 以下属性返回文档信息。

// （1）document.documentURI，document.URL
// document.documentURI属性和document.URL属性都返回一个字符串，表示当前文档的网址。
// 不同之处是它们继承自不同的接口，documentURI继承自Document接口，可用于所有文档；URL继承自HTMLDocument接口，只能用于 HTML 文档。
// 如果文档的锚点（#anchor）变化，这两个属性都会跟着变化

// （2）document.domain
// document.domain属性返回当前文档的域名，不包含协议和端口
// document.domain基本上是一个只读属性，只有一种情况除外。次级域名的网页，可以把document.domain设为对应的上级域名
//比如，当前域名是a.sub.example.com，则document.domain属性可以设置为sub.example.com，也可以设为example.com
// 修改后，document.domain相同的两个网页，可以读取对方的资源，比如设置的 Cookie

// （3）document.location
// Location对象是浏览器提供的原生对象，提供 URL 相关的信息和操作方法。通过window.location和document.location属性，可以拿到这个对象

// （4）document.lastModified
// // document.lastModified属性返回一个字符串，表示当前文档最后修改的时间。不同浏览器的返回值，日期格式是不一样的
// console.log(document.lastModified);

// // 注意，document.lastModified属性的值是字符串，所以不能直接用来比较。Date.parse方法将其转为Date实例，才能比较两个网页。
// var lastVisitedDate = Date.parse('01/08/2022');
// if (Date.parse(document.lastModified) > lastVisitedDate) {
//   console.log('网页已更改');
// }

// 如果页面上有 JavaScript 生成的内容，document.lastModified属性返回的总是当前时间。

// （5）document.title
// document.title属性返回当前文档的标题。默认情况下，返回<title>节点的值。但是该属性是可写的，一旦被修改，就返回修改后的值

// （6）document.characterSet
// document.characterSet属性返回当前文档的编码，比如UTF-8、ISO-8859-1等等

// （7）document.referrer
// referrer: 推荐人，上线；介绍人; referer: 参照页，引用页
// document.referrer属性返回一个字符串，表示当前文档的访问者来自哪里
// 如果无法获取来源，或者用户直接键入网址而不是从其他网页点击进入，document.referrer返回一个空字符串。
// document.referrer的值，总是与 HTTP 头信息的Referer字段保持一致。但是，document.referrer的拼写有两个r，而头信息的Referer字段只有一个r

// （8）document.dir
// document.dir返回一个字符串，表示文字方向。它只有两个可能的值：rtl表示文字从右到左，阿拉伯文是这种方式；ltr表示文字从左到右，包括英语和汉语在内的大多数文字采用这种方式。
// chrome 下，返回空字符串
// 默认 ltr, 可进行设置，设置值为字符串 ltr 和 rtl

// （9）document.compatMode
// compat: 兼容
// compatMode属性返回浏览器处理文档的模式，可能的值为BackCompat（向后兼容模式）和CSS1Compat（严格模式）。
// 一般来说，如果网页代码的第一行设置了明确的DOCTYPE（比如<!doctype html>），document.compatMode的值都为CSS1Compat。

// 2.4 文档状态属性

// （1）document.hidden
// document.hidden属性返回一个布尔值，表示当前页面是否可见。
// 如果窗口最小化、浏览器切换了 Tab，都会导致导致页面不可见，使得document.hidden返回true
// 这个属性是 Page Visibility API 引入的，一般都是配合这个 API 使用

// （2）document.visibilityState
// document.visibilityState返回文档的可见状态
// 它的值有四种可能
/**
 * visible：页面可见。注意，页面可能是部分可见，即不是焦点窗口，前面被其他窗口部分挡住了。
 * hidden：页面不可见，有可能窗口最小化，或者浏览器切换到了另一个 Tab。
 * prerender：页面处于正在渲染状态，对于用户来说，该页面不可见。
 * unloaded：页面从内存里面卸载了。
 */
// 这个属性可以用在页面加载时，防止加载某些资源；或者页面不可见时，停掉一些页面功能。

// （3）document.readyState
// document.readyState属性返回当前文档的状态，共有三种可能的值
/**
 * loading：加载 HTML 代码阶段（尚未完成解析）
 * interactive：加载外部资源阶段
 * complete：加载完成
 */

// 这个属性变化的过程如下
/**
 * 浏览器开始解析 HTML 文档，document.readyState属性等于loading。
 * 浏览器遇到 HTML 文档中的<script>元素，并且没有async或defer属性，就暂停解析，开始执行脚本，这时document.readyState属性还是等于loading。
 * HTML 文档解析完成，document.readyState属性变成interactive。
 * 浏览器等待图片、样式表、字体文件等外部资源加载完成，一旦全部加载完成，document.readyState属性变成complete。
 */

// 下面的代码用来检查网页是否加载成功。
// // 基本检查
// if (document.readyState === 'complete') {
//   consolelog('页面加载完成');
// }

// 轮询检查
// var interval = setInterval(function () {
//   if (document.readyState === 'complete') {
//     console.log('页面加载完成');
//     clearInterval(interval);
//   } else {
//     console.log('正在加载中。。。');
//   }
// }, 100);

// 2.5 document.cookie
// document.cookie属性用来操作浏览器 Cookie，详见《浏览器模型》部分的《Cookie》章节。

// 2.6 document.designMode
// // document.designMode属性控制当前文档是否可编辑。该属性只有两个值on和off，默认值为off。一旦设为on，用户就可以编辑整个文档的内容
// document.querySelector('iframe').contentDocument.designMode = 'on';

// 2.7 document.currentScript
// document.currentScript属性只用在<script>元素的内嵌脚本或加载的外部脚本之中
// 返回当前脚本所在的那个 DOM 节点，即<script>元素的 DOM 节点

// 2.8 document.implementation
// document.implementation属性返回一个DOMImplementation对象。该对象有三个方法，主要用于创建独立于当前文档的新的 Document 对象。
/**
 * DOMImplementation.createDocument()：创建一个 XML 文档。
 * DOMImplementation.createHTMLDocument()：创建一个 HTML 文档。
 * DOMImplementation.createDocumentType()：创建一个 DocumentType 对象。
 */
// var doc = document.implementation.createHTMLDocument('Title');
// var p = doc.createElement('p');
// p.innerHTML = 'hello jayden';
// doc.body.appendChild(p);
// document.replaceChild(doc.documentElement, document.documentElement);

// 3. 方法

// 3.1 document.open()，document.close()
// // document.open方法清除当前文档所有内容，使得文档处于可写状态，供document.write方法写入内容。
// // document.close方法用来关闭document.open()打开的文档
// document.open();
// document.write('jayden james');
// document.close();

// 3.2 document.write()，document.writeln()
// document.write方法用于向当前文档写入内容
// 在网页的首次渲染阶段，只要页面没有关闭写入（即没有执行document.close()），document.write写入的内容就会追加在已有内容的后面。
// document.write会当作 HTML 代码解析，不会转义
// // 如果页面已经解析完成（DOMContentLoaded事件发生之后），再调用write方法，它会先调用open方法，擦除当前文档所有内容，然后再写入
// document.addEventListener('DOMContentLoaded', function (e) {
//   document.write('<h3>jadyen james</h3>');
// });

// 如果在页面渲染过程中调用write方法，并不会自动调用open方法。（可以理解成，open方法已调用，但close方法还未调用。）
// document.write是 JavaScript 语言标准化之前就存在的方法，现在完全有更符合标准的方法向文档写入内容（比如对innerHTML属性赋值）
// 所以，除了某些特殊情况，应该尽量避免使用document.write这个方法。

// document.writeln方法与write方法完全一致，除了会在输出内容的尾部添加换行符
// 注意，writeln方法添加的是 ASCII 码的换行符，渲染成 HTML 网页时不起作用，即在网页上显示不出换行。网页上的换行，必须显式写入<br>

// 3.3 document.querySelector()，document.querySelectorAll()
// document.querySelector方法接受一个 CSS 选择器作为参数，返回匹配该选择器的元素节点。如果有多个节点满足匹配条件，则返回第一个匹配的节点。如果没有发现匹配的节点，则返回null
// document.querySelectorAll方法与querySelector用法类似，区别是返回一个NodeList对象，包含所有匹配给定选择器的节点
// 这两个方法的参数，可以是逗号分隔的多个 CSS 选择器，返回匹配其中一个选择器的元素节点，这与 CSS 选择器的规则是一致的
// 这两个方法都支持复杂的 CSS 选择器

// // 选中 data-foo-bar 属性等于 someval 的元素
// document.querySelectorAll('[data-foo-bar="someval"]');

// // 选中 myForm 表单中所有不通过验证的元素
// document.querySelectorAll('#myForm :invalid');

// // 选中div元素，那些 class 含 ignore 的除外
// document.querySelectorAll('DIV:not(.ignore)');

// // 同时选中 div，a，script 三类元素
// document.querySelectorAll('DIV, A, SCRIPT');

// 它们不支持 CSS 伪元素的选择器（比如:first-line和:first-letter）和伪类的选择器（比如:link和:visited），即无法选中伪元素和伪类。
// 如果querySelectorAll方法的参数是字符串*，则会返回文档中的所有元素节点。另外，querySelectorAll的返回结果不是动态集合，不会实时反映元素节点的变化。
// 这两个方法除了定义在document对象上，还定义在元素节点上，即在元素节点上也可以调用

// 3.4 document.getElementsByTagName()
// document.getElementsByTagName()方法搜索 HTML 标签名，返回符合条件的元素
// 它的返回值是一个类似数组对象（HTMLCollection实例）
// 如果没有任何匹配的元素，就返回一个空集
// HTML 标签名是大小写不敏感的，因此getElementsByTagName()方法的参数也是大小写不敏感的。另外，返回结果中，各个成员的顺序就是它们在文档中出现的顺序
// 如果传入*，就可以返回文档中所有 HTML 元素
// 元素节点本身也定义了getElementsByTagName方法

// 3.5 document.getElementsByClassName()
// 返回一个类似数组的对象（HTMLCollection实例），包括了所有class名字符合指定条件的元素，元素的变化实时反映在返回结果中
// 由于class是保留字，所以 JavaScript 一律使用className表示 CSS 的class
// 参数可以是多个class，它们之间使用空格分隔 -> 返回同时具有多个class的元素, 参数顺序不重要
// 注意，正常模式下，CSS 的class是大小写敏感的。（quirks mode下，大小写不敏感。
// getElementsByClassName()方法不仅可以在document对象上调用，也可以在任何元素节点上调用

// 3.6 document.getElementsByName()
// document.getElementsByName()方法用于选择拥有name属性的 HTML 元素
// 比如<form>、<radio>、<img>、<frame>、<embed>和<object>等
// 返回一个类似数组的的对象（NodeList实例），因为name属性相同的元素可能不止一个

// 3.7 document.getElementById()
// document.getElementById()方法返回匹配指定id属性的元素节点。如果没有发现匹配的节点，则返回null
// 注意，该方法的参数是大小写敏感的
// document.getElementById()方法与document.querySelector()方法都能获取元素节点，不同之处是document.querySelector()方法的参数使用 CSS 选择器语法，document.getElementById()方法的参数是元素的id属性
// 这个方法只能在document对象上使用，不能在其他元素节点上使用

// 3.8 document.elementFromPoint()，document.elementsFromPoint()
// document.elementFromPoint()方法返回位于页面指定位置最上层的元素节点
// elementFromPoint方法的两个参数，依次是相对于当前视口左上角的横坐标和纵坐标，单位是像素。
// 如果位于该位置的 HTML 元素不可返回（比如文本框的滚动条），则返回它的父元素（比如文本框）
// 如果坐标值无意义（比如负值或超过视口大小），则返回null。
// document.elementsFromPoint()返回一个数组，成员是位于指定坐标（相对于视口）的所有元素。

// 3.9 document.createElement()
// 用来生成元素节点，并返回该节点
// 参数为元素的标签名，即元素节点的tagName属性，对于 HTML 网页大小写不敏感，即参数为div或DIV返回的是同一种节点。如果参数里面包含尖括号（即<和>）会报错。
// 注意，document.createElement的参数可以是自定义的标签名

// 3.10 document.createTextNode()
// 用来生成文本节点（Text实例），并返回该节点, 它的参数是文本节点的内容
// // 这个方法可以确保返回的节点，被浏览器当作文本渲染，而不是当作 HTML 代码渲染。因此，可以用来展示用户的输入，避免 XSS 攻击
// var div = document.createElement('div');
// div.appendChild(document.createTextNode('<span>Foo & bar</span>'));
// console.log(div.innerHTML) // &lt;span&gt;Foo &amp; bar&lt;/span&gt;
// 需要注意的是，该方法不对单引号和双引号转义，所以会被注入代码，慎用

// 3.11 document.createAttribute()
// document.createAttribute方法生成一个新的属性节点（Attr实例），并返回它
// document.createAttribute方法的参数name，是属性的名称
// 添加属性节点的方法
/**
 * 1. node.setAttributeNode(attrnode)
 * 2. node.setAttribute(attrname, attrvalue);
 */

// 3.12 document.createComment()
// document.createComment方法生成一个新的注释节点，并返回该节点
// document.createComment方法的参数是一个字符串，会成为注释节点的内容

// 3.13 document.createDocumentFragment()
// 方法生成一个空的文档片段对象（DocumentFragment实例）
// DocumentFragment是一个存在于内存的 DOM 片段，不属于当前文档，常常用来生成一段较复杂的 DOM 结构，然后再插入当前文档。这样做的好处在于，因为DocumentFragment不属于当前文档，对它的任何改动，都不会引发网页的重新渲染，比直接修改当前文档的 DOM 有更好的性能表现。

// 3.14 document.createEvent(type)
// 生成一个事件对象（Event实例），该对象可以被element.dispatchEvent方法使用，触发指定事件
// document.createEvent方法的参数是事件类型，比如UIEvents、MouseEvents、MutationEvents、HTMLEvents

// 3.15 document.addEventListener()，document.removeEventListener()，document.dispatchEvent()
// dispatch: 派遣；发送；
// 这三个方法用于处理document节点的事件。它们都继承自EventTarget接口，详细介绍参见《EventTarget 接口》一章

// 3.16 document.hasFocus()
// 返回一个布尔值，表示当前文档之中是否有元素被激活或获得焦点。
// 有焦点的文档必定被激活（active），反之不成立，激活的文档未必有焦点

// 3.17 document.adoptNode()，document.importNode()
// adopt: 收养；采取，采纳，接受
// document.adoptNode方法将某个节点及其子节点，从原来所在的文档或DocumentFragment里面移除，归属当前document对象，返回插入后的新节点
// 插入的节点对象的ownerDocument属性，会变成当前的document对象，而parentNode属性是null。
// 注意，document.adoptNode方法只是改变了节点的归属，并没有将这个节点插入新的文档树。所以，还要再用appendChild方法或insertBefore方法，将新节点插入当前文档树

// document.importNode方法则是从原来所在的文档或DocumentFragment里面，拷贝某个节点及其子节点，让它们归属当前document对象
// 拷贝的节点对象的ownerDocument属性，会变成当前的document对象，而parentNode属性是null
// 第一个参数是外部节点，第二个参数是一个布尔值，表示对外部节点是深拷贝还是浅拷贝，默认是浅拷贝（false）。虽然第二个参数是可选的，但是建议总是保留这个参数，并设为true
// 注意，document.importNode方法只是拷贝外部节点，这时该节点的父节点是null。下一步还必须将这个节点插入当前文档树。

// 3.18 document.createNodeIterator()
// document.createNodeIterator方法返回一个子节点遍历器
// document.createNodeIterator方法第一个参数为所要遍历的根节点
// 第二个参数为所要遍历的节点类型
// 几种主要的节点类型写法如下
/**
 * 所有节点：NodeFilter.SHOW_ALL
 * 元素节点：NodeFilter.SHOW_ELEMENT
 * 文本节点：NodeFilter.SHOW_TEXT
 * 评论节点：NodeFilter.SHOW_COMMENT
 */
// document.createNodeIterator方法返回一个“遍历器”对象（NodeFilter实例）。
// 该实例的nextNode()方法和previousNode()方法，可以用来遍历所有子节点
// nextNode方法先返回遍历器的内部指针所在的节点，然后会将指针移向下一个节点。所有成员遍历完成后，返回null。previousNode方法则是先将指针移向上一个节点，然后返回该节点
// 注意，遍历器返回的第一个节点，总是根节点

// 3.19 document.createTreeWalker()
// 返回一个 DOM 的子树遍历器
// 它与document.createNodeIterator方法基本是类似的，区别在于它返回的是TreeWalker实例，后者返回的是NodeIterator实例。另外，它的第一个节点不是根节点
// document.createTreeWalker方法的第一个参数是所要遍历的根节点，第二个参数指定所要遍历的节点类型（与document.createNodeIterator方法的第二个参数相同）
// // 实例同样有 nextNode()方法和previousNode()
// var treeWalker = document.createTreeWalker(
//   document.body,
//   NodeFilter.SHOW_ELEMENT
// );

// var nodeList = [];

// while(treeWalker.nextNode()) {
//   nodeList.push(treeWalker.currentNode);
// }

// 3.20 document.execCommand()，document.queryCommandSupported()，document.queryCommandEnabled()

// document.execCommand()
// 如果document.designMode属性设为on，那么整个文档用户可编辑；如果元素的contenteditable属性设为true，那么该元素可编辑。这两种情况下，可以使用document.execCommand()方法，改变内容的样式，比如document.execCommand('bold')会使得字体加粗。
// document.execCommand(command, showDefaultUI, input)
// 该方法接受三个参数
/**
 * command：字符串，表示所要实施的样式。
 * showDefaultUI：布尔值，表示是否要使用默认的用户界面，建议总是设为false。
 * input：字符串，表示该样式的辅助内容，比如生成超级链接时，这个参数就是所要链接的网址。如果第二个参数设为true，那么浏览器会弹出提示框，要求用户在提示框输入该参数。但是，不是所有浏览器都支持这样做，为了兼容性，还是需要自己部署获取这个参数的方式
 */
// var url = window.prompt('请输入网址');
// if (url) {
//   document.execCommand('createlink', false, url);
// }

// document.execCommand()的返回值是一个布尔值。如果为false，表示这个方法无法生效。
// 这个方法大部分情况下，只对选中的内容生效。如果有多个内容可编辑区域，那么只对当前焦点所在的元素生效
// document.execCommand()方法可以执行的样式改变有很多种，下面是其中的一些：bold、insertLineBreak、selectAll、createLink、insertOrderedList、subscript、delete、insertUnorderedList、superscript、formatBlock、insertParagraph、undo、forwardDelete、insertText、unlink、insertImage、italic、unselect、insertHTML、redo。这些值都可以用作第一个参数

// // （2）document.queryCommandSupported()
// // document.queryCommandSupported()方法返回一个布尔值，表示浏览器是否支持document.execCommand()的某个命令
// if (document.queryCommandSupported('SelectAll')) {
//   console.log('浏览器支持选中可编辑区域的所有内容');
// }

// （3）document.queryCommandEnabled()
// document.queryCommandEnabled()方法返回一个布尔值，表示当前是否可用document.execCommand()的某个命令。
// 比如，bold（加粗）命令只有存在文本选中时才可用，如果没有选中文本，就不可用

// // HTML 代码为
// // <input type="button" value="Copy" onclick="doCopy()">
// function doCopy(){
//   // 浏览器是否支持 copy 命令（选中内容复制到剪贴板）
//   if (document.queryCommandSupported('copy')) {
//     copyText('你好');
//   }else{
//     console.log('浏览器不支持');
//   }
// }

// function copyText(text) {
//   var input = document.createElement('textarea');
//   document.body.appendChild(input);
//   input.value = text;
//   input.focus();
//   input.select();

//   // 当前是否有选中文字
//   if (document.queryCommandEnabled('copy')) {
//     var success = document.execCommand('copy');
//     input.remove();
//     console.log('Copy Ok');
//   } else {
//     console.log('queryCommandEnabled is false');
//   }
// }

// document.getSelection()
// selection: 选择，挑选；被挑选的人（或物）
// 这个方法指向window.getSelection()，参见window对象一节的介绍
