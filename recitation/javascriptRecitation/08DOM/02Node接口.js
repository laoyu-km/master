// Node 接口
// 所有 DOM 节点对象都继承了 Node 接口，拥有一些共同的属性和方法。这是 DOM 操作的基础。

// 1.属性

// 1.1 Node.prototype.nodeType
// nodeType属性返回一个整数值，表示节点的类型
// Node 对象定义了几个常量，对应节点类型值, 不同节点的nodeType属性值和对应的常量如下
/**
 * 文档节点（document）：9，对应常量Node.DOCUMENT_NODE
 * 元素节点（element）：1，对应常量Node.ELEMENT_NODE
 * 属性节点（attr）：2，对应常量Node.ATTRIBUTE_NODE
 * 文本节点（text）：3，对应常量Node.TEXT_NODE
 * 文档片断节点（DocumentFragment）：11，对应常量Node.DOCUMENT_FRAGMENT_NODE
 * 文档类型节点（DocumentType）：10，对应常量Node.DOCUMENT_TYPE_NODE
 * 注释节点（Comment）：8，对应常量Node.COMMENT_NODE
 */
var docType = document.doctype;
console.log(docType.nodeType === Node.DOCUMENT_TYPE_NODE);
console.log(document.nodeType === Node.DOCUMENT_NODE);

// 1.2 Node.prototype.nodeName
// 属性返回节点的名称
// 不同节点的nodeName属性值如下
/**
 * 文档节点（document）：#document
 * 元素节点（element）：大写的标签名
 * 属性节点（attr）：属性的名称
 * 文本节点（text）：#text
 * 文档片断节点（DocumentFragment）：#document-fragment
 * 文档类型节点（DocumentType）：文档的类型
 * 注释节点（Comment）：#comment
 */
console.log(document.doctype.nodeName);
// 获取属性节点的方法
// 1. elenode.attributes
// 2. elenode.getAttributeNode('属性名')

// // 1.3 Node.prototype.nodeValue
// // nodeValue属性返回一个字符串，表示当前节点本身的文本值，该属性可读写
// // 只有文本节点（text）、注释节点（comment）和属性节点（attr）有文本值，因此这三类节点的nodeValue可以返回结果，其他类型的节点一律返回null。同样的，也只有这三类节点可以设置nodeValue属性的值，其他类型的节点设置无效。
// // HTML 代码如下
// // <div id="d1">hello world</div>
// var div = document.getElementById('d1');
// div.nodeValue; // null
// div.firstChild.nodeValue; // "hello world"

// // 1.4 Node.prototype.textContent
// // textContent属性返回当前节点和它的所有后代节点的文本内容
// // textContent属性自动忽略当前节点内部的 HTML 标签，返回所有文本内容
// // 该属性是可读写的，设置该属性的值，会用一个新的文本节点，替换所有原来的子节点。它还有一个好处，就是自动对 HTML 标签转义。这很适合用于用户提供的内容
// document.getElementById('foo').textContent = '<p>GoodBye!</p>'; // <p>GoodBye!</p> -> 将<p>标签解释为文本，而不会当作标签处理
// // 对于文本节点（text）、注释节点（comment）和属性节点（attr），textContent属性的值与nodeValue属性相同
// // 对于其他类型的节点，该属性会将每个子节点（不包括注释节点）的内容连接在一起返回。
// // 如果一个节点没有子节点，则返回空字符串
// // 文档节点（document）和文档类型节点（doctype）的textContent属性为null
// // 如果要读取整个文档的内容，可以使用document.documentElement.textContent

// 1.5 Node.prototype.baseURI
// baseURI属性返回一个字符串，表示当前网页的绝对路径。
// 浏览器根据这个属性，计算网页上的相对路径的 URL。该属性为只读
// 如果无法读到网页的 URL，baseURI属性返回null
// 该属性的值一般由当前网址的 URL（即window.location属性）决定，但是可以使用 HTML 的<base>标签，改变该属性的值
// <base href="http://www.example.com/page.html"> 设置了以后，baseURI属性就返回<base>标签设置的值

// 1.6 Node.prototype.ownerDocument
// Node.ownerDocument属性返回当前节点所在的顶层文档对象，即document对象
// document对象本身的ownerDocument属性，返回null

// 1.7 Node.prototype.nextSibling
// Node.nextSibling属性返回紧跟在当前节点后面的第一个同级节点
// 如果当前节点后面没有同级节点，则返回null
// 注意，该属性还包括文本节点和注释节点（<!-- comment -->）。因此如果当前节点后面有空格，该属性会返回一个文本节点，内容为空格
// nextSibling属性可以用来遍历所有子节点
var el = document.getElementsByClassName('main')[0].firstChild;
while (el !== null) {
  console.log(el.nodeName);
  el = el.nextSibling;
}

// 1.8 Node.prototype.previousSibling
// previousSibling属性返回当前节点前面的、距离最近的一个同级节点。如果当前节点前面没有同级节点，则返回null。
// 注意，该属性还包括文本节点和注释节点。因此如果当前节点前面有空格，该属性会返回一个文本节点，内容为空格

// // 1.9 Node.prototype.parentNode
// // parentNode属性返回当前节点的父节点。
// // 它的父节点只可能是三种类型：元素节点（element）、文档节点（document）和文档片段节点（documentfragment）。
// if (node.parentNode) {
//   node.parentNode.removeChild(node);
// }
// 文档节点（document）和文档片段节点（documentfragment）的父节点都是null
// 对于那些生成后还没插入 DOM 树的节点，父节点也是null

// 1.10 Node.prototype.parentElement
// parentElement属性返回当前节点的父元素节点。如果当前节点没有父节点，或者父节点类型不是元素节点，则返回null

// 1.11 Node.prototype.firstChild，Node.prototype.lastChild
// firstChild属性返回当前节点的第一个子节点，如果当前节点没有子节点，则返回null
// 注意，firstChild返回的除了元素节点，还可能是文本节点或注释节点
// lastChild属性返回当前节点的最后一个子节点，如果当前节点没有子节点，则返回null。用法与firstChild属性相同

// 1.12 Node.prototype.childNodes
// childNodes属性返回一个类似数组的对象（NodeList集合），成员包括当前节点的所有子节点。
// 文档节点（document）就有两个子节点：文档类型节点（docType）和 HTML 根元素节点
// 注意，除了元素节点，childNodes属性的返回值还包括文本节点和注释节点
// 如果当前节点不包括任何子节点，则返回一个空的NodeList集合
// 由于NodeList对象是一个动态集合，一旦子节点发生变化，立刻会反映在返回结果之中。

// 1.13 Node.prototype.isConnected
// isConnected属性返回一个布尔值，表示当前节点是否在文档之中
var test = document.createElement('h3');
test.textContent = 'jayden';
console.log(test.isConnected);

document.body.appendChild(test);
console.log(test.isConnected);

// 2. 方法

// 2.1 Node.prototype.appendChild()
// 接受一个节点对象作为参数，将其作为最后一个子节点，插入当前节点。该方法的返回值就是插入文档的子节点
// 如果参数节点是 DOM 已经存在的节点，appendChild()方法会将其从原来的位置，移动到新位置(尾部)
// 如果appendChild()方法的参数是DocumentFragment节点，那么插入的是DocumentFragment的所有子节点，而不是DocumentFragment节点本身。返回值是一个空的DocumentFragment节点

// 2.2 Node.prototype.hasChildNodes()
// hasChildNodes方法返回一个布尔值，表示当前节点是否有子节点
// 注意，子节点包括所有类型的节点，并不仅仅是元素节点。哪怕节点只包含一个空格，hasChildNodes方法也会返回true
// 判断一个节点有没有子节点，有许多种方法，下面是其中的三种
/**
 * node.hasChildNodes()
 *
 * node.firstChild !== null
 *
 * node.childNodes && node.childNodes.length > 0;
 */
// // hasChildNodes方法结合firstChild属性和nextSibling属性，可以遍历当前节点的所有后代节点。
// // Comb: 梳子；梳理；
// function DOMComb(parent, callback) {
//   if (parent.hasChildNodes()) {
//     for (var node = parent.firstChild; node; node = node.nextSibling) {
//       DOMComb(node, callback);
//     }
//   }
//   callback(parent);
// }
// DOMComb(document.body, console.log);

// 2.3 Node.prototype.cloneNode()
// cloneNode方法用于克隆一个节点。它接受一个布尔值作为参数，表示是否同时克隆子节点。它的返回值是一个克隆出来的新节点
// a. 克隆一个节点，会拷贝该节点的所有属性，但是会丧失addEventListener方法和on-属性（即node.onclick = fn），添加在这个节点上的事件回调函数。
// b. 该方法返回的节点不在文档之中，即没有任何父节点，必须使用诸如Node.appendChild这样的方法添加到文档之中。
// c. 克隆一个节点之后，DOM 有可能出现两个有相同id属性（即id="xxx"）的网页元素，这时应该修改其中一个元素的id属性。如果原节点有name属性，可能也需要修改

// 2.4 Node.prototype.insertBefore()
// insertBefore方法用于将某个节点插入父节点内部的指定位置
// insertBefore方法接受两个参数，第一个参数是所要插入的节点newNode，第二个参数是父节点parentNode内部的一个子节点referenceNode
// newNode将插在referenceNode这个子节点的前面。返回值是插入的新节点newNode
// 如果insertBefore方法的第二个参数为null，则新节点将插在当前节点内部的最后位置，即变成最后一个子节点
// 注意，如果所要插入的节点是当前 DOM 现有的节点，则该节点将从原有的位置移除，插入新的位置。
// // 由于不存在insertAfter方法，如果新节点要插在父节点的某个子节点后面，可以用insertBefore方法结合nextSibling属性模拟
// parent.insertBefore(newNode, referenceNode.nextSibling);
// 如果要插入的节点是DocumentFragment类型，那么插入的将是DocumentFragment的所有子节点，而不是DocumentFragment节点本身。返回值将是一个空的DocumentFragment节点。

// 2.5 Node.prototype.removeChild()
// removeChild方法接受一个子节点作为参数，用于从当前节点移除该子节点。返回值是移除的子节点。
// 注意，这个方法是在父节点上调用的
// // 下面是如何移除当前节点的所有子节点。
// var parent = document.getElementsByClassName('html-main')[0];
// while (parent.firstChild) {
//   parent.removeChild(parent.firstChild);
// }
// 如果参数节点不是当前节点的子节点，removeChild方法将报错

// 2.6 Node.prototype.replaceChild(newNode, oldNode)
// 用于将一个新的节点，替换当前节点的某一个子节点
// // replaceChild方法接受两个参数，第一个参数newChild是用来替换的新节点，第二个参数oldChild是将要替换走的子节点。返回值是替换走的那个节点oldChild。
// var oldnode = document.querySelector('.node-test');
// var newnode = document.createElement('p');
// newnode.textContent = 'jayden james';
// oldnode.parentElement.replaceChild(newnode, oldnode);

// 2.7 Node.prototype.contains()
// contain: 包含，容纳；
// contains方法返回一个布尔值，表示参数节点是否满足以下三个条件之一。
/**
 * 参数节点为当前节点。
 * 参数节点为当前节点的子节点。
 * 参数节点为当前节点的后代节点
 */
// document.body.contain(node);
// 注意，当前节点传入contains方法，返回true

// 2.8 Node.prototype.compareDocumentPosition()
// compareDocumentPosition方法的用法，与contains方法完全一致，返回一个六个比特位的二进制值，表示参数节点与当前节点的关系
/**
 * 二进制值	十进制值	含义
 * 000000	0	  两个节点相同
 * 000001	1	  两个节点不在同一个文档（即有一个节点不在当前文档）
 * 000010	2	  参数节点在当前节点的前面
 * 000100	4	  参数节点在当前节点的后面
 * 001000	8	  参数节点包含当前节点
 * 010000	16	当前节点包含参数节点
 * 100000	32	浏览器内部使用
 */

// var div = document.getElementById('form-div');
// var input = document.getElementById('input-test');
// div.compareDocumentPosition(input); // 20
// input.compareDocumentPosition(div); // 10
// // 上面代码中，节点div包含节点input（二进制010000），而且节点input在节点div的后面（二进制000100），所以第一个compareDocumentPosition方法返回20（二进制010100，即010000 + 000100），第二个compareDocumentPosition方法返回10（二进制001010）。
// // 由于compareDocumentPosition返回值的含义，定义在每一个比特位上，所以如果要检查某一种特定的含义，就需要使用比特位运算符。
// var head = document.head;
// var body = document.body;
// if (head.compareDocumentPosition(body) & 4) {
//   console.log('文档结构正确');
// } else {
//   console.log('body 不能再 head 前面');
// }

// 2.9 Node.prototype.isEqualNode()，Node.prototype.isSameNode()
// isEqualNode方法返回一个布尔值，用于检查两个节点是否相等。所谓相等的节点，指的是两个节点的类型相同、属性相同、子节点相同
// isSameNode方法返回一个布尔值，表示两个节点是否为同一个节点

// 2.10 Node.prototype.normalize()
// normalize: 正常化，正规化；
// normalize方法用于清理当前节点内部的所有文本节点（text）。它会去除空的文本节点，并且将毗邻的文本节点合并成一个，也就是说不存在空的文本节点，以及毗邻的文本节点。
// 该方法是Text.splitText的逆方法

// 2.11 Node.prototype.getRootNode()
// getRootNode()方法返回当前节点所在文档的根节点document，与ownerDocument属性的作用相同。
// 该方法可用于document节点自身返回document，这一点与document.ownerDocument不同
