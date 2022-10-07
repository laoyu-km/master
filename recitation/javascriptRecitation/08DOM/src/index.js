// Element

// 1. 简介
// 元素节点的nodeType属性都是1
// Element对象继承了Node接口，因此Node的属性和方法在Element对象都存在
//

// document

// propertites

// get node
/**
 * 1. document.defaultView
 * 2. document.doctype
 * 3. document.documentElement
 * 4. document.body, document.head
 * 5. document.scrollingElement
 * 6. document.activeElement
 * 7. document.fullscreenElement
 */

// get collection
/**
 * 1. document.links
 * 2. document.forms
 * 3. document.images
 * 4. document.embeds or document.plugins
 * 5. document.scripts
 * 6. document.styleSheets
 */

// document infomation
/**
 * 1. document.documentURI, document.URL
 * 2. document.domain
 * 3. document.location
 * 4. document.lastModified
 * 5. document.CharacterSet
 * 6. document.title
 * 7. document.compatMode
 * 8. document.referrer
 * 9. document.dir
 */

// document state
/**
 * document.hidden
 * document.visibilityState
 * document.readyState
 */

// document.cookie

// document.designMode

// document.currentScript

// document.implementation

// methods
/**
 * 1. document.open(), document.close()
 * 2. document.write(), document.writeln()
 * 3. document.querySelector(), document.querySelectorAll()
 * 4. document.getElementsByTagName()
 * 5. document.getElementsByClassName()
 * 6. document.getElementsByName()
 * 7. document.getElementById()
 * 8. document.elementFromPoint(), document.elementsFromPoint()
 * 9. document.createElement()
 * 10. document.createTextNode()
 * 11. document.createAttribute()
 * 12. document.createComment()
 * 13. document.createDocumentFragment()
 * 14. document.createEvent()
 * 15. document.addEventListener(), document.removeEventListener(), document.dispatchEvent()
 * 16. document.adoptNode(), document.importNode()
 * 17. document.hasFocus()
 * 18. document.createNodeIterator()
 * 19. document.createTreeWalker()
 * 20. document.execCommand(), document.queryCommandSupported(), document.queryCommandEnabled()
 * 21. document.getSelection()
 *
 */

// node

// properties
/**
 * 1. node.nodeType
 * 2. node.nodeName
 * 3. node.nodeValue
 * 4. node.baseURI
 * 5. node.textContent
 * 6. node.parentNode
 * 7. node.parentElement
 * 8. node.nextSibling
 * 9. node.previousSibling
 * 10. node.lastChild, firstChild
 * 11. node.childNodes
 * 12. node.ownerDocument
 * 13. node.isConnected
 */

// methods
/**
 * 1. node.appendChild()
 * 2. node.hasChildNodes()
 * 3. node.cloneChild()
 * 4. node.replaceChild()
 * 5. node.insertBefore()
 * 6. node.removeChild()
 * 7. node.contains()
 * 8. node.compareDocumentPosition()
 * 9. node.getRootNode()
 * 10. node.isEqualNode() -> same nodeType, attribute, ChildNodes, node.isSameNode()
 * 11. node.normalize()
 */

// ParentNode
/**
 * parent.children
 * parent.firstElementChild
 * parent.lastElementChild
 * parent.childElementCount
 * parent.append(),
 * parent.prepend()
 */

// ChildNode
/**
 * child.remove()
 * child.before()
 * child.after()
 * child.replaceWith()
 */

// nodelist
/**
 * node.childNodes, querySelectorAll
 * except childNodes, others are not dynomic collection
 * length
 * forEach()
 * item(index)
 * keys(), values(), entries()
 */

// collection
// document.liks.. document.getElementsByTagNames()
// all dynamic collection
// length
// item(index)
// namedItem()
