// mouseEvent.pageX 和 pageY 的兼容性写法
function mousePagePos(e) {
  var scrollLeft = getScrollOffset().x,
    scrollTop = getScrollOffset().y,
    cLeft = document.documentElement.clientLeft || 0, // 偏移量
    cTop = document.documentElement.clientTop || 0;

  return {
    left: scrollLeft + e.clientX - cLeft,
    top: scrollTop + e.clientY - cTop
  }
}

// window.getComputedStyle() 的兼容性写法
function getStyle(el, prop) {
  if (window.getComputedStyle) {
    if (prop) {
      return window.getComputedStyle(el)[prop];
    }
    return window.getComputedStyle(el);
  } else {
    if (prop) {
      return el.currentStyle[prop];
    }
    return el.currentStyle;
  }
}

// 元素到body边框的offset
function getElementDocumentPosition(el) {
  var parent = el.offsetParent,
    offsetLeft = el.offsetLeft,
    offsetTop = el.offsetTop;

  while (parent) {
    offsetLeft += parent.offsetLeft;
    offsetTop += parent.offsetTop;
    parent = parent.offsetParent;
  }

  return {
    offsetLeft: offsetLeft,
    offsetTop: offsetTop
  };
}

// 整张网页宽度和高度兼容性写法
function getPageSize() {
  if (document.body.scrollHeight) {
    return {
      width: document.body.scrollWidth,
      height: document.body.scrollHeight
    }
  }
  return {
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight
  }
}


// 可视区域兼容性函数
function getViewportSize() {
  if (window.innerWidth) {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } else {
    if (document.compatMode === 'BackCompat') {
      return {
        width: document.body.clientWidth,
        height: document.body.clientHeight
      }
    } else {
      return {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight
      }
    }
  }
}

// 页面滚动距离兼容性写法
function getScrollOffset() {
  if (window.scrollX) {
    return {
      // x: window.pageXOffset, //有别名就使用别名
      // y: window.pageYOffset
      x: window.pageXOffset,
      y: window.pageYOffset
    }
  }

  return {
    x: document.body.scrollLeft + document.documentElement.scrollLeft,
    y: document.body.scrollTop + document.documentElement.scrollTop
  }
}

// 封装元素节点获取函数
function getElementNodes(node) {
  var children = node.childNodes,
    arrElementNodes = [];

  for (var i = 0; i < children.length; i++) {
    if (children[i].nodeType === 1) {
      arrElementNodes.push(children[i]);
    }
  }

  return arrElementNodes;
}

// 递归获取所有子节点
function DOMComb(parent, callback) {
  for (var node = parent.firstChild; node; node = node.nextSibling) {
    if (node.hasChildNodes()) {
      DOMComb(node, callback);
    }
    callback(node);
  }
}

// 递归获取所有叶子节点 -> 会包含没有子节点的元素节点如：<div></div>
function getAllNotElNodes(parent, callback) {
  for (var node = parent.firstChild; node; node = node.nextSibling) {
    if (node.hasChildNodes()) {
      DOMComb(node, callback);
    } else {
      callback(node);
    }
  }
}