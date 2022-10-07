// ParentNode 接口，ChildNode 接口

// 1. ParentNode 接口
// 如果当前节点是父节点，就会混入了（mixin）ParentNode接口。由于只有元素节点（element）、文档节点（document）和文档片段节点（documentFragment）拥有子节点，因此只有这三类节点会拥有ParentNode接口

// 1.1 ParentNode.children
// children属性返回一个HTMLCollection实例，成员是当前节点的所有元素子节点。该属性只读。
// children属性只包括元素子节点，不包括其他类型的子节点（比如文本子节点）。如果没有元素类型的子节点，返回值HTMLCollection实例的length属性为0

// 1.2 ParentNode.firstElementChild
// firstElementChild属性返回当前节点的第一个元素子节点。如果没有任何元素子节点，则返回null

// 1.3 ParentNode.lastElementChild
// lastElementChild属性返回当前节点的最后一个元素子节点，如果不存在任何元素子节点，则返回null

// 1.4 ParentNode.childElementCount
// childElementCount属性返回一个整数，表示当前节点的所有元素子节点的数目。如果不包含任何元素子节点，则返回0

// 1.5 ParentNode.append()，ParentNode.prepend()

// a. ParentNode.append()
// append()方法为当前节点追加一个或多个子节点，位置是最后一个元素子节点的后面
// 该方法不仅可以添加元素子节点（参数为元素节点），还可以添加文本子节点（参数为字符串）
// 该方法没有返回值。
// 注意，该方法与Node.prototype.appendChild()方法有三点不同
/**
 * append()允许字符串作为参数，appendChild()只允许子节点作为参数
 * append()没有返回值，而appendChild()返回添加的子节点
 * append()可以添加多个子节点和字符串（即允许多个参数），appendChild()只能添加一个节点（即只允许一个参数）
 */

// b. ParentNode.prepend()
// prepend()方法为当前节点追加一个或多个子节点，位置是第一个元素子节点的前面。它的用法与append()方法完全一致，也是没有返回值

// 如果追加的元素节点已经存在，则更改位置

// 2. ChildNode 接口
// 如果一个节点有父节点，那么该节点就拥有了ChildNode接口

// 2.1 ChildNode.remove()
// // remove()方法用于从父节点移除当前节点
// el.remove()

// 2.2 ChildNode.before()，ChildNode.after()

// a. ChildNode.before()
// before()方法用于在当前节点的前面，插入一个或多个同级节点。两者拥有相同的父节点。
// 注意，该方法不仅可以插入元素节点，还可以插入文本节点。

// b. ChildNode.after()
// after()方法用于在当前节点的后面，插入一个或多个同级节点，两者拥有相同的父节点。用法与before方法完全相同

// 2.3 ChildNode.replaceWith()
// replaceWith()方法使用参数节点，替换当前节点。参数可以是元素节点，也可以是文本节点。
// // span 替换 el
// var span = document.createElement('span');
// el.replaceWith(span);
